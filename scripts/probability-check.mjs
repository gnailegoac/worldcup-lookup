import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appPath = path.resolve(__dirname, "../app.js");
const source = fs.readFileSync(appPath, "utf8");

const requiredBlocks = [
  matchRequired(/const MAX_EXACT_GOALS = \d+;/, "MAX_EXACT_GOALS"),
  matchRequired(/const MAX_WDL_GOALS = \d+;/, "MAX_WDL_GOALS"),
  matchRequired(/const TEAM_STRENGTH_RATINGS = \{[\s\S]*?\n\};/, "TEAM_STRENGTH_RATINGS"),
  matchRequired(/const TEAM_GOAL_PROFILES = \{[\s\S]*?\n\};/, "TEAM_GOAL_PROFILES"),
];

const probabilityStart = source.indexOf("function computeProbability(match)");
const probabilityEnd = source.indexOf("function loadMatches()");
if (probabilityStart < 0 || probabilityEnd < probabilityStart) {
  throw new Error("Could not locate probability functions in app.js.");
}

const context = { console };
vm.createContext(context);
vm.runInContext(
  `
${requiredBlocks.join("\n")}
function cleanText(value) {
  return String(value ?? "").trim();
}
${source.slice(probabilityStart, probabilityEnd)}
globalThis.probabilityApi = {
  computeProbability,
  outcomeFromLambdas,
  getNoVigProbabilities,
  estimateLambdasFromOdds,
  scoreProbability,
  estimateLambdasFromTeamStrength,
  poisson,
};
`,
  context,
  { filename: "probability-check.vm.js" },
);

const {
  computeProbability,
  outcomeFromLambdas,
  getNoVigProbabilities,
  estimateLambdasFromOdds,
  scoreProbability,
  estimateLambdasFromTeamStrength,
  poisson,
} = context.probabilityApi;

const checks = [];

check("poisson base probabilities match closed form", () => {
  const lambda = 1.2;
  close(poisson(lambda, 0), Math.exp(-lambda), 1e-12);
  close(poisson(lambda, 1), lambda * Math.exp(-lambda), 1e-12);
  close(poisson(lambda, 2), (lambda ** 2 * Math.exp(-lambda)) / 2, 1e-12);
});

[
  [1.25, 1.05],
  [1.55, 0.99],
  [0.98, 1.55],
  [2.9, 0.35],
  [0.35, 2.9],
].forEach(([lambdaHome, lambdaAway]) => {
  check(`wdl sums to 1 for ${lambdaHome}-${lambdaAway}`, () => {
    const outcome = outcomeFromLambdas(lambdaHome, lambdaAway);
    close(outcome.homeWin + outcome.draw + outcome.awayWin, 1, 1e-12);
    withinProbability(outcome.homeWin);
    withinProbability(outcome.draw);
    withinProbability(outcome.awayWin);
  });
});

check("equal lambdas produce symmetric win probabilities", () => {
  const outcome = outcomeFromLambdas(1.35, 1.35);
  close(outcome.homeWin, outcome.awayWin, 1e-12);
});

check("stronger expected goals favor that side", () => {
  const homeFavored = outcomeFromLambdas(1.8, 0.7);
  const awayFavored = outcomeFromLambdas(0.7, 1.8);
  assert(homeFavored.homeWin > homeFavored.awayWin, "home favorite should have higher home win chance");
  assert(awayFavored.awayWin > awayFavored.homeWin, "away favorite should have higher away win chance");
  close(homeFavored.homeWin, awayFavored.awayWin, 1e-12);
  close(homeFavored.awayWin, awayFavored.homeWin, 1e-12);
});

check("exact score matrix and other score mass are consistent", () => {
  const match = { lambdaHome: 1.55, lambdaAway: 0.99 };
  const probability = computeProbability(match);
  withinProbability(probability.gridMass);
  withinProbability(probability.otherScore);
  close(probability.gridMass + probability.otherScore, 1, 1e-12);
  close(probability.matrix[2][1].probability, scoreProbability(match, 2, 1), 1e-12);
  assert(probability.topScores.length === 6, "expected six top score rows");
  assert(isDescending(probability.topScores.map((item) => item.probability)), "top scores should be sorted");
});

check("polymarket prices override listed markets and distribute other scores", () => {
  const match = {
    lambdaHome: 1.45,
    lambdaAway: 0.95,
    polymarket: {
      wdl: { homeWin: 0.52, draw: 0.27, awayWin: 0.21 },
      exactScore: {
        scores: [
          { home: 1, away: 0, probability: 0.18 },
          { home: 1, away: 1, probability: 0.13 },
        ],
        otherProbability: 0.69,
      },
    },
  };
  const probability = computeProbability(match);
  close(probability.homeWin, 0.52, 1e-12);
  close(probability.draw, 0.27, 1e-12);
  close(probability.awayWin, 0.21, 1e-12);
  close(probability.matrix[1][0].probability, 0.18, 1e-12);
  close(probability.matrix[1][1].probability, 0.13, 1e-12);
  close(probability.matrix[2][0].probability, scoreProbability(match, 2, 0), 1e-12);
  close(probability.gridMass + probability.otherScore, 1, 1e-12);
});

check("odds are normalized without bookmaker margin", () => {
  const noVig = getNoVigProbabilities(2.1, 3.4, 3.8);
  assert(noVig, "valid odds should produce no-vig probabilities");
  close(noVig.homeWin + noVig.draw + noVig.awayWin, 1, 1e-12);
  assert(noVig.overround > 1, "sample odds should include overround");
});

check("odds-derived lambdas reproduce target 1x2 probabilities closely", () => {
  const noVig = getNoVigProbabilities(1.7, 3.9, 5.2);
  const estimate = estimateLambdasFromOdds(1.7, 3.9, 5.2);
  const outcome = outcomeFromLambdas(estimate.lambdaHome, estimate.lambdaAway);
  const totalError =
    Math.abs(outcome.homeWin - noVig.homeWin) +
    Math.abs(outcome.draw - noVig.draw) +
    Math.abs(outcome.awayWin - noVig.awayWin);
  assert(totalError < 0.035, `odds fitting error too high: ${totalError}`);
});

check("team strength model reacts to team order", () => {
  const brazilHome = estimateLambdasFromTeamStrength("Brazil", "Haiti");
  const haitiHome = estimateLambdasFromTeamStrength("Haiti", "Brazil");
  assert(brazilHome.lambdaHome > brazilHome.lambdaAway, "Brazil vs Haiti should favor Brazil");
  assert(haitiHome.lambdaAway > haitiHome.lambdaHome, "Haiti vs Brazil should favor Brazil as away team");
  assert(brazilHome.lambdaHome > haitiHome.lambdaHome, "stronger home side should receive higher lambda");
});

check("team style profile changes the goal environment", () => {
  const conservativeMatch = estimateLambdasFromTeamStrength("Morocco", "Iran");
  const openMatch = estimateLambdasFromTeamStrength("Canada", "Ghana");
  const conservativeTotal = conservativeMatch.lambdaHome + conservativeMatch.lambdaAway;
  const openTotal = openMatch.lambdaHome + openMatch.lambdaAway;
  assert(openTotal > conservativeTotal, "open teams should produce a higher total-goals environment");
  assert(conservativeTotal < 2.35, `conservative total should be suppressed, got ${conservativeTotal}`);
});

for (const checkItem of checks) {
  checkItem.run();
  console.log(`ok - ${checkItem.name}`);
}

console.log(`Probability checks passed: ${checks.length}`);

function matchRequired(pattern, label) {
  const match = source.match(pattern);
  if (!match) throw new Error(`Could not locate ${label} in app.js.`);
  return match[0];
}

function check(name, run) {
  checks.push({ name, run });
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function close(actual, expected, tolerance) {
  if (Math.abs(actual - expected) > tolerance) {
    throw new Error(`Expected ${actual} to be within ${tolerance} of ${expected}.`);
  }
}

function withinProbability(value) {
  assert(Number.isFinite(value), `Expected finite probability, got ${value}.`);
  assert(value >= 0 && value <= 1, `Expected probability in [0, 1], got ${value}.`);
}

function isDescending(values) {
  return values.every((value, index) => index === 0 || values[index - 1] >= value);
}
