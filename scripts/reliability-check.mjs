import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const resultSyncScript = path.join(root, "scripts", "sync-match-results.mjs");
const oddsSyncScript = path.join(root, "scripts", "sync-polymarket-odds.mjs");
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "worldcup-lookup-reliability-"));
const {
  buildSettledResult,
  findScheduleMatch,
  getSettledEventCutoffMs,
  teamKey,
} = await import(pathToFileURL(oddsSyncScript).href);

function runResultFixture(game, settledResults = []) {
  const scheduleFile = path.join(tempDir, "schedule.json");
  const marketFile = path.join(tempDir, "markets.json");
  fs.writeFileSync(scheduleFile, JSON.stringify({ games: [game] }));
  fs.writeFileSync(marketFile, JSON.stringify({ settledResults }));
  return execFileSync(
    process.execPath,
    [resultSyncScript, scheduleFile, marketFile, "--dry-run"],
    { cwd: root, encoding: "utf8" },
  );
}

const baseGame = {
  id: "test",
  home_team_name_en: "Alpha",
  away_team_name_en: "Beta",
  local_date: "07/02/2026 12:00",
  stadium_id: "1",
  type: "group",
  finished: "TRUE",
  time_elapsed: "finished",
};

try {
  const emptyScoreOutput = runResultFixture({ ...baseGame, home_score: null, away_score: "" });
  assert.match(emptyScoreOutput, /Prepared 0 settled match result/);

  const prematureKnockoutOutput = runResultFixture({
    ...baseGame,
    id: "knockout-ft",
    type: "r16",
    finished: "FALSE",
    time_elapsed: "FT",
    home_score: "1",
    away_score: "1",
  });
  assert.match(prematureKnockoutOutput, /Prepared 0 settled match result/);

  const unverifiedKnockoutOutput = runResultFixture(
    { ...baseGame, id: "unverified", type: "r16", home_score: "2", away_score: "1" },
    [{ matchId: "worldcup26-unverified", homeScore: 1, awayScore: 1 }],
  );
  assert.match(unverifiedKnockoutOutput, /Prepared 0 settled match result/);

  const marketOverrideOutput = runResultFixture(
    { ...baseGame, id: "extra-time", type: "r16", home_score: "3", away_score: "2" },
    [{ matchId: "worldcup26-extra-time", homeScore: 2, awayScore: 2, resolutionVerified: true }],
  );
  assert.match(marketOverrideOutput, /First result: worldcup26-extra-time 2-2/);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

const scheduleMatch = { finished: true };
const exactScore = {
  scores: [{ home: 2, away: 1, rawProbability: 1 }],
  eventSlug: "fixture-exact-score",
  updatedAt: "",
};
assert.equal(
  buildSettledResult({ matchId: "fixture", kickoffUtc: baseGame.local_date, exactScore, wdl: null }, scheduleMatch),
  null,
);
const verifiedResult = buildSettledResult(
  {
    matchId: "fixture",
    kickoffUtc: "2026-07-02T18:00:00Z",
    exactScore,
    wdl: { raw: { homeWin: 1, draw: 0, awayWin: 0 }, updatedAt: "2026-07-02T20:00:00Z" },
  },
  scheduleMatch,
);
assert.deepEqual(
  { homeScore: verifiedResult?.homeScore, awayScore: verifiedResult?.awayScore, verified: verifiedResult?.resolutionVerified },
  { homeScore: 2, awayScore: 1, verified: true },
);

const kickoffUtc = "2026-07-03T01:00:00Z";
const aliasMatch = findScheduleMatch(
  [{
    id: "worldcup26-alias",
    kickoffMs: new Date(kickoffUtc).getTime(),
    homeKey: teamKey("Argentina"),
    awayKey: teamKey("Cape Verde"),
    placeholder: false,
  }],
  { kickoffUtc, homeAlt: "Argentina", awayAlt: "Cabo Verde" },
);
assert.equal(aliasMatch?.id, "worldcup26-alias");

const unverifiedCutoff = getSettledEventCutoffMs(
  [{ id: "worldcup26-old", finished: true, stage: "r16", kickoffMs: new Date(kickoffUtc).getTime() }],
  { settledResults: [{ matchId: "worldcup26-old" }] },
);
assert.ok(unverifiedCutoff < new Date(kickoffUtc).getTime());

const workflow = fs.readFileSync(path.join(root, ".github", "workflows", "sync-worldcup-schedule.yml"), "utf8");
assert.match(workflow, /concurrency:\s+group: worldcup-schedule-sync\s+cancel-in-progress: false/);
assert.ok(workflow.indexOf("Sync settled match results") < workflow.indexOf("Commit schedule cache"));
assert.ok(workflow.indexOf("Run reliability checks") < workflow.indexOf("Fetch schedule cache"));
assert.match(workflow, /name: Sync settled match results[^\r\n]*\s+continue-on-error: true/);

const schema = fs.readFileSync(path.join(root, "supabase", "schema.sql"), "utf8");
assert.match(schema, /select predictions\.\* into locked_prediction[\s\S]*?where predictions\.id = assessed\.id\s+for update;/);
assert.match(schema, /desired_payout - coalesce\(locked_prediction\.payout_points, 0\)/);
assert.match(schema, /order by predictions\.match_kickoff_utc, predictions\.created_at, predictions\.id/);
assert.match(schema, /left join lateral \([\s\S]*?unique_result[\s\S]*?\) results on true/);
assert.match(schema, /cumulative_return_multiplier >= 20 then 'century_return'/);
assert.match(schema, /correct_predictions::numeric \/ nullif\(stats\.settled_predictions, 0\) >= 0\.4/);
assert.match(schema, /create table if not exists public\.champion_picks/);
assert.match(schema, /create or replace function public\.select_champion_pick\(team_code_value text\)/);
assert.equal((schema.match(/raise exception 'champion pick required'/g) || []).length, 2);
assert.match(schema, /champion_team_code text,\s+achievements jsonb,\s+achievement_count integer/);

const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
assert.match(app, /url: pageConfig\.url \|\| localStorage\.getItem\(SUPABASE_URL_STORAGE\)/);
assert.match(app, /async signUp\(\{ email, password, data \}\)[\s\S]*?JSON\.stringify\(\{ email, password, data \}\)/);
assert.match(app, /data-action="select-champion-team"/);
assert.match(app, /class="leaderboard-champion/);
assert.match(app, /if \(state\.isSubmittingCombo\) return;/);
assert.match(app, /submitButton\.disabled = state\.isSubmittingCombo \|\| !valid/);
assert.match(app, /state\.comboDraft = \{\s+stakePoints:/);

const achievementBlock = app.slice(
  app.indexOf("const ACHIEVEMENT_DEFINITIONS ="),
  app.indexOf("const ACHIEVEMENT_IDS ="),
);
const achievementIds = [...achievementBlock.matchAll(/id: "([a-z_]+)"/g)].map((match) => match[1]);
assert.equal(achievementIds.length, 10);
assert.equal(new Set(achievementIds).size, 10);
for (const achievementId of achievementIds) {
  assert.ok(schema.includes(`'${achievementId}'`), `Missing SQL achievement rule: ${achievementId}`);
}

console.log("Reliability checks passed.");
