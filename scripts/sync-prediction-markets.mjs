import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const DEFAULT_SCHEDULE_FILE = "data/worldcup26-games.json";
const DEFAULT_POLYMARKET_FILE = "data/polymarket-odds.json";
const DEFAULT_SUPABASE_URL = "https://bzcynwyopkhvqlwrrqrk.supabase.co";
const WORLDCUP26_STADIUM_OFFSETS = {
  1: -360,
  2: -360,
  3: -360,
  4: -300,
  5: -300,
  6: -300,
  7: -240,
  8: -240,
  9: -240,
  10: -240,
  11: -240,
  12: -240,
  13: -420,
  14: -420,
  15: -420,
  16: -420,
};

const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const files = args.filter((arg) => !arg.startsWith("--"));
const scheduleFile = files[0] || DEFAULT_SCHEDULE_FILE;
const polymarketFile = files[1] || DEFAULT_POLYMARKET_FILE;

const probabilityApi = loadProbabilityApi();
const schedulePayload = readJson(scheduleFile);
const polymarketPayload = readOptionalJson(polymarketFile, { matches: [] });
const markets = buildPredictionMarkets(schedulePayload, polymarketPayload, probabilityApi);

console.log(`Prepared ${markets.length} authoritative prediction market(s).`);
if (isDryRun) {
  if (markets.length) {
    console.log(`First market: ${markets[0].match_id} ${markets[0].match_label}`);
    console.log(`Last market: ${markets.at(-1).match_id} ${markets.at(-1).match_label}`);
  }
  process.exit(0);
}

const serviceRoleKey = cleanText(
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE,
);
if (!serviceRoleKey) {
  console.log("SUPABASE_SERVICE_ROLE_KEY is not configured; skipping prediction market sync.");
  process.exit(0);
}

const syncedCount = await syncPredictionMarkets(getSupabaseUrl(), serviceRoleKey, markets);
console.log(`Synced ${syncedCount} authoritative prediction market(s) to Supabase.`);

function loadProbabilityApi() {
  const currentFile = fileURLToPath(import.meta.url);
  const appPath = path.resolve(path.dirname(currentFile), "../app.js");
  const source = fs.readFileSync(appPath, "utf8");
  const requiredBlocks = [
    matchRequired(source, /const MAX_EXACT_GOALS = \d+;/, "MAX_EXACT_GOALS"),
    matchRequired(source, /const MAX_WDL_GOALS = \d+;/, "MAX_WDL_GOALS"),
    matchRequired(source, /const TEAM_NAME_ZH = \{[\s\S]*?\n\};/, "TEAM_NAME_ZH"),
    matchRequired(source, /const TEAM_STRENGTH_RATINGS = \{[\s\S]*?\n\};/, "TEAM_STRENGTH_RATINGS"),
    matchRequired(source, /const TEAM_GOAL_PROFILES = \{[\s\S]*?\n\};/, "TEAM_GOAL_PROFILES"),
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
globalThis.predictionMarketApi = {
  computeProbability,
  estimateLambdasFromTeamStrength,
  estimateLambdasFromProbabilities,
  teamNames: TEAM_NAME_ZH,
};
`,
    context,
    { filename: "prediction-market-sync.vm.js" },
  );
  return context.predictionMarketApi;
}

function matchRequired(source, pattern, label) {
  const match = source.match(pattern);
  if (!match) throw new Error(`Could not locate ${label} in app.js.`);
  return match[0];
}

function buildPredictionMarkets(schedulePayload, polymarketPayload, api) {
  const games = Array.isArray(schedulePayload)
    ? schedulePayload
    : schedulePayload?.games || schedulePayload?.data;
  if (!Array.isArray(games)) {
    throw new Error("Schedule payload must be an array or contain a games/data array.");
  }

  const oddsByMatchId = new Map(
    (Array.isArray(polymarketPayload?.matches) ? polymarketPayload.matches : [])
      .filter((item) => cleanText(item?.matchId))
      .map((item) => [cleanText(item.matchId), item]),
  );
  const snapshotAt = new Date().toISOString();

  return games
    .map((game) => normalizeGameMarket(game, oddsByMatchId, api, snapshotAt))
    .filter(Boolean)
    .sort((a, b) => new Date(a.match_kickoff_utc) - new Date(b.match_kickoff_utc));
}

function normalizeGameMarket(game, oddsByMatchId, api, snapshotAt) {
  if (!game || typeof game !== "object") return null;
  const homeAlt = cleanText(game.home_team_name_en || game.home_team_label || game.homeTeam || game.home);
  const awayAlt = cleanText(game.away_team_name_en || game.away_team_label || game.awayTeam || game.away);
  const kickoff = parseWorldCup26Date(game.local_date, game.stadium_id);
  if (!homeAlt || !awayAlt || !kickoff) return null;

  const matchId = `worldcup26-${cleanText(game.id) || `${normalizeTeamKey(homeAlt)}-${normalizeTeamKey(awayAlt)}-${kickoff.toISOString()}`}`;
  const polymarket = oddsByMatchId.get(matchId);
  let model = api.estimateLambdasFromTeamStrength(homeAlt, awayAlt);
  if (polymarket?.wdl) {
    model = api.estimateLambdasFromProbabilities(
      Number(polymarket.wdl.homeWin),
      Number(polymarket.wdl.draw),
      Number(polymarket.wdl.awayWin),
    );
  }

  const match = {
    lambdaHome: model.lambdaHome,
    lambdaAway: model.lambdaAway,
    polymarket: polymarket
      ? {
          wdl: polymarket.wdl,
          exactScore: polymarket.exactScore,
        }
      : undefined,
  };
  const probability = api.computeProbability(match);
  const exactScores = normalizeExactScores(polymarket?.exactScore?.scores);
  const exactOtherProbability = readProbability(polymarket?.exactScore?.otherProbability);
  const homeTeam = api.teamNames[homeAlt] || homeAlt;
  const awayTeam = api.teamNames[awayAlt] || awayAlt;

  return {
    match_id: matchId,
    match_label: `${homeTeam} vs ${awayTeam}`,
    match_kickoff_utc: kickoff.toISOString(),
    home_team: homeTeam,
    away_team: awayTeam,
    lambda_home: model.lambdaHome,
    lambda_away: model.lambdaAway,
    home_win_probability: probability.homeWin,
    draw_probability: probability.draw,
    away_win_probability: probability.awayWin,
    exact_scores: exactScores,
    exact_other_probability: exactOtherProbability,
    source: polymarket ? "Polymarket + team strength/style model" : "Team strength/style model",
    snapshot_at: snapshotAt,
  };
}

function normalizeExactScores(scores) {
  if (!Array.isArray(scores)) return [];
  return scores
    .map((score) => ({
      home: Number(score?.home),
      away: Number(score?.away),
      probability: readProbability(score?.probability),
    }))
    .filter(
      (score) =>
        Number.isInteger(score.home) &&
        score.home >= 0 &&
        Number.isInteger(score.away) &&
        score.away >= 0 &&
        score.probability !== null &&
        score.probability > 0,
    );
}

function readProbability(value) {
  if (value === null || value === undefined || value === "") return null;
  const probability = Number(value);
  if (!Number.isFinite(probability) || probability < 0 || probability > 1) return null;
  return probability;
}

function parseWorldCup26Date(value, stadiumId) {
  const text = cleanText(value);
  const match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})$/);
  if (!match) {
    const date = new Date(text);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const [, month, day, year, hour, minute] = match.map(Number);
  const offsetMinutes = WORLDCUP26_STADIUM_OFFSETS[Number(stadiumId)];
  if (!Number.isFinite(offsetMinutes)) return new Date(Date.UTC(year, month - 1, day, hour, minute));
  return new Date(Date.UTC(year, month - 1, day, hour, minute) - offsetMinutes * 60 * 1000);
}

async function syncPredictionMarkets(supabaseUrl, serviceRoleKey, markets) {
  const response = await fetch(`${stripTrailingSlash(supabaseUrl)}/rest/v1/rpc/admin_upsert_prediction_markets`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ markets }),
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Supabase prediction market RPC failed (${response.status}): ${text}`);
  }
  return Number(text ? JSON.parse(text) : 0);
}

function getSupabaseUrl() {
  const envUrl = cleanText(process.env.SUPABASE_URL || process.env.SUPABASE_PROJECT_URL);
  if (envUrl) return stripTrailingSlash(envUrl);

  try {
    const config = fs.readFileSync("supabase-config.js", "utf8");
    const match = config.match(/url:\s*["']([^"']+)["']/);
    if (match?.[1]) return stripTrailingSlash(match[1]);
  } catch {
    // Fall through to the project default.
  }
  return DEFAULT_SUPABASE_URL;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readOptionalJson(filePath, fallback) {
  try {
    return readJson(filePath);
  } catch {
    return fallback;
  }
}

function normalizeTeamKey(value) {
  return cleanText(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cleanText(value) {
  return String(value ?? "").trim();
}

function stripTrailingSlash(value) {
  return cleanText(value).replace(/\/+$/, "");
}
