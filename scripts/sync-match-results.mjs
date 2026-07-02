import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const DEFAULT_SCHEDULE_FILE = "data/worldcup26-games.json";
const DEFAULT_POLYMARKET_FILE = "data/polymarket-odds.json";
const DEFAULT_SUPABASE_URL = "https://bzcynwyopkhvqlwrrqrk.supabase.co";
const WORLDCUP26_STADIUMS = {
  1: { offsetMinutes: -360 },
  2: { offsetMinutes: -360 },
  3: { offsetMinutes: -360 },
  4: { offsetMinutes: -300 },
  5: { offsetMinutes: -300 },
  6: { offsetMinutes: -300 },
  7: { offsetMinutes: -240 },
  8: { offsetMinutes: -240 },
  9: { offsetMinutes: -240 },
  10: { offsetMinutes: -240 },
  11: { offsetMinutes: -240 },
  12: { offsetMinutes: -240 },
  13: { offsetMinutes: -420 },
  14: { offsetMinutes: -420 },
  15: { offsetMinutes: -420 },
  16: { offsetMinutes: -420 },
};

const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const files = args.filter((arg) => !arg.startsWith("--"));
const scheduleFile = files[0] || DEFAULT_SCHEDULE_FILE;
const polymarketFile = files[1] || DEFAULT_POLYMARKET_FILE;

const payload = readJson(scheduleFile);
const polymarketPayload = readOptionalJson(polymarketFile, { settledResults: [] });
const results = buildSettledMatchResultsPayload(payload, polymarketPayload);
console.log(`Prepared ${results.length} settled match result(s) from ${path.normalize(scheduleFile)}.`);

if (isDryRun) {
  if (results.length) {
    console.log(`First result: ${results[0].match_id} ${results[0].home_score}-${results[0].away_score}`);
    console.log(`Last result: ${results.at(-1).match_id} ${results.at(-1).home_score}-${results.at(-1).away_score}`);
  }
  process.exit(0);
}

if (!results.length) {
  console.log("No finished matches found. Nothing to sync.");
  process.exit(0);
}

const supabaseUrl = getSupabaseUrl();
const serviceRoleKey = cleanText(
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE,
);

if (!serviceRoleKey) {
  console.log("SUPABASE_SERVICE_ROLE_KEY is not configured; skipping Supabase result sync.");
  process.exit(0);
}

const upsertedCount = await syncMatchResults(supabaseUrl, serviceRoleKey, results);
console.log(`Synced ${upsertedCount} match result row(s) to Supabase.`);

function readJson(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  return JSON.parse(content);
}

function readOptionalJson(filePath, fallback) {
  try {
    return readJson(filePath);
  } catch {
    return fallback;
  }
}

function buildSettledMatchResultsPayload(rawPayload, polymarketPayload) {
  const games = Array.isArray(rawPayload) ? rawPayload : rawPayload?.games || rawPayload?.data;
  if (!Array.isArray(games)) {
    throw new Error("Schedule payload must be an array or contain a games/data array.");
  }
  const settledByMatchId = new Map(
    (Array.isArray(polymarketPayload?.settledResults) ? polymarketPayload.settledResults : [])
      .filter((result) => result?.resolutionVerified === true && cleanText(result?.matchId))
      .map((result) => [cleanText(result.matchId), result]),
  );

  const byId = new Map();
  for (const game of games) {
    const result = normalizeWorldCup26GameResult(game, settledByMatchId);
    if (result) byId.set(result.match_id, result);
  }
  return [...byId.values()].sort((a, b) => new Date(a.match_kickoff_utc) - new Date(b.match_kickoff_utc));
}

function normalizeWorldCup26GameResult(game, settledByMatchId) {
  if (!game || typeof game !== "object") return null;
  if (!isFinishedGame(game)) return null;

  const homeTeam = cleanText(game.home_team_name_en || game.home_team_label || game.homeTeam || game.home);
  const awayTeam = cleanText(game.away_team_name_en || game.away_team_label || game.awayTeam || game.away);
  if (!homeTeam || !awayTeam) return null;

  const kickoff = parseWorldCup26Date(game.local_date, game.stadium_id);
  const fallbackId = `${normalizeTeamKey(homeTeam)}-${normalizeTeamKey(awayTeam)}-${kickoff?.toISOString() || "unknown"}`;
  const matchId = `worldcup26-${cleanText(game.id) || fallbackId}`;
  const settledMarketResult = settledByMatchId.get(matchId);
  const marketHomeScore = readScore(settledMarketResult?.homeScore);
  const marketAwayScore = readScore(settledMarketResult?.awayScore);
  const hasMarketResult = marketHomeScore !== null && marketAwayScore !== null;
  const sourceHomeScore = readScore(game.home_score);
  const sourceAwayScore = readScore(game.away_score);
  const stage = cleanText(game.type).toLowerCase();
  if (stage !== "group" && !hasMarketResult) return null;
  if (!hasMarketResult && (sourceHomeScore === null || sourceAwayScore === null)) return null;
  const homeScore = hasMarketResult ? marketHomeScore : sourceHomeScore;
  const awayScore = hasMarketResult ? marketAwayScore : sourceAwayScore;

  return {
    match_id: matchId,
    match_label: `${homeTeam} vs ${awayTeam}`,
    match_kickoff_utc: kickoff ? kickoff.toISOString() : null,
    home_team: homeTeam,
    away_team: awayTeam,
    home_score: homeScore,
    away_score: awayScore,
    status: "finished",
    source: hasMarketResult
      ? "Polymarket 90-minute exact-score resolution"
      : "GitHub Actions schedule result sync",
  };
}

function readScore(value) {
  if (value === null || value === undefined || cleanText(value) === "") return null;
  const score = Number(value);
  return Number.isInteger(score) && score >= 0 ? score : null;
}

function isFinishedGame(game) {
  const finished = cleanText(game.finished).toLowerCase();
  if (finished === "true" || finished === "1" || finished === "yes") return true;
  const stage = cleanText(game.type).toLowerCase();
  if (stage && stage !== "group") return false;
  const elapsed = cleanText(game.time_elapsed).toLowerCase().replace(/\s+/g, "");
  return ["finished", "fulltime", "ft"].includes(elapsed);
}

function parseWorldCup26Date(value, stadiumId) {
  const text = cleanText(value);
  const match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})$/);
  if (!match) {
    const date = new Date(text);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const [, month, day, year, hour, minute] = match.map(Number);
  const stadium = WORLDCUP26_STADIUMS[Number(stadiumId)];
  if (!stadium) return new Date(Date.UTC(year, month - 1, day, hour, minute));
  return new Date(Date.UTC(year, month - 1, day, hour, minute) - stadium.offsetMinutes * 60 * 1000);
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

async function syncMatchResults(supabaseUrl, serviceRoleKey, settledResults) {
  const response = await fetch(`${stripTrailingSlash(supabaseUrl)}/rest/v1/rpc/admin_upsert_match_results`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ results: settledResults }),
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Supabase RPC failed (${response.status}): ${text}`);
  }

  const parsed = text ? JSON.parse(text) : null;
  return Number(parsed ?? 0);
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
