import fs from "node:fs";
import path from "node:path";

const DEFAULT_SCHEDULE_FILE = "data/worldcup26-games.json";
const DEFAULT_OUTPUT_FILE = "data/polymarket-odds.json";
const GAMMA_API_BASE = "https://gamma-api.polymarket.com";
const WORLD_CUP_TAG_ID = "102232";
const MAX_EVENT_AGE_MS = 12 * 60 * 60 * 1000;

const STADIUM_OFFSETS = {
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

const TEAM_CODE_OVERRIDES = {
  "Bosnia and Herzegovina": "BIH",
  "Cape Verde": "CPV",
  "Cabo Verde": "CPV",
  "Cote d'Ivoire": "CIV",
  "Cote dIvoire": "CIV",
  "Côte d'Ivoire": "CIV",
  "Côte dIvoire": "CIV",
  "Czech Republic": "CZE",
  "Democratic Republic of the Congo": "COD",
  "DR Congo": "COD",
  "Ivory Coast": "CIV",
  "New Zealand": "NZL",
  "Saudi Arabia": "KSA",
  "South Africa": "RSA",
  "South Korea": "KOR",
  "United States": "USA",
  "United States of America": "USA",
};

const [scheduleArg = DEFAULT_SCHEDULE_FILE, outputArg = DEFAULT_OUTPUT_FILE] = process.argv.slice(2);
const schedulePath = path.resolve(scheduleArg);
const outputPath = path.resolve(outputArg);

main().catch((error) => {
  console.error(`Polymarket odds sync failed: ${error.message}`);
  process.exitCode = 1;
});

async function main() {
  const schedule = readSchedule(schedulePath);
  const events = await fetchWorldCupEvents();
  const groups = groupPolymarketEvents(events);
  const matches = [];
  const unmatchedEvents = [];

  for (const group of groups) {
    const wdl = extractWdl(group.main, group.homeAlt, group.awayAlt);
    const exactScore = extractExactScore(group.exact);
    if (!wdl && !exactScore) continue;

    const scheduleMatch = findScheduleMatch(schedule, group);
    const item = {
      matchId: scheduleMatch?.id || "",
      matchedBy: scheduleMatch?.matchedBy || "unmatched",
      kickoffUtc: group.kickoffUtc,
      homeAlt: group.homeAlt,
      awayAlt: group.awayAlt,
      homeCode: group.homeCode || codeFromName(group.homeAlt),
      awayCode: group.awayCode || codeFromName(group.awayAlt),
      wdl,
      exactScore,
    };

    matches.push(item);
    if (!scheduleMatch) {
      unmatchedEvents.push({
        slug: group.baseSlug,
        kickoffUtc: group.kickoffUtc,
        homeAlt: group.homeAlt,
        awayAlt: group.awayAlt,
      });
    }
  }

  matches.sort((a, b) => new Date(a.kickoffUtc) - new Date(b.kickoffUtc));

  const payload = {
    source: "Polymarket Gamma API",
    sourceUrl: GAMMA_API_BASE,
    generatedAt: new Date().toISOString(),
    matches,
    unmatchedEvents,
  };

  const previous = readJsonIfExists(outputPath);
  if (
    previous &&
    stableJson(previous.matches || []) === stableJson(payload.matches) &&
    stableJson(previous.unmatchedEvents || []) === stableJson(payload.unmatchedEvents)
  ) {
    console.log(`Polymarket odds unchanged: ${matches.length} rows`);
    return;
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(`Wrote ${matches.length} Polymarket odds rows to ${path.relative(process.cwd(), outputPath)}`);
}

function readJsonIfExists(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}

function stableJson(value) {
  return JSON.stringify(value);
}

function readSchedule(filePath) {
  const payload = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const games = Array.isArray(payload) ? payload : payload.games || payload.data || [];
  if (!Array.isArray(games)) throw new Error("Schedule payload does not contain a games array.");
  return games.map(normalizeScheduleGame).filter(Boolean);
}

function normalizeScheduleGame(game) {
  const kickoff = parseWorldCup26Date(game.local_date, game.stadium_id);
  if (!kickoff) return null;
  const homeAlt = cleanText(game.home_team_name_en || game.home_team_label || game.homeTeam || game.home);
  const awayAlt = cleanText(game.away_team_name_en || game.away_team_label || game.awayTeam || game.away);
  if (!homeAlt || !awayAlt) return null;
  return {
    id: `worldcup26-${game.id || `${teamKey(homeAlt)}-${teamKey(awayAlt)}-${kickoff.toISOString()}`}`,
    kickoffUtc: kickoff.toISOString(),
    kickoffMs: kickoff.getTime(),
    homeAlt,
    awayAlt,
    homeKey: teamKey(homeAlt),
    awayKey: teamKey(awayAlt),
    placeholder: isPlaceholder(homeAlt) || isPlaceholder(awayAlt),
  };
}

async function fetchWorldCupEvents() {
  const params = new URLSearchParams({
    tag_id: WORLD_CUP_TAG_ID,
    active: "true",
    closed: "false",
    limit: "500",
    order: "startTime",
    ascending: "true",
  });
  const events = await fetchJson(`${GAMMA_API_BASE}/events?${params.toString()}`);
  if (!Array.isArray(events)) throw new Error("Polymarket events response was not an array.");
  const cutoff = Date.now() - MAX_EVENT_AGE_MS;
  return events.filter((event) => {
    const start = new Date(event.startTime || event.startDate || event.endDate || 0).getTime();
    return Number.isFinite(start) && start >= cutoff;
  });
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  return response.json();
}

function groupPolymarketEvents(events) {
  const byBaseSlug = new Map();
  for (const event of events) {
    const normalized = normalizePolymarketEvent(event);
    if (!normalized) continue;
    const existing = byBaseSlug.get(normalized.baseSlug) || {};
    if (normalized.kind === "exact") existing.exact = normalized.raw;
    else existing.main = normalized.raw;
    existing.baseSlug = normalized.baseSlug;
    existing.kickoffUtc = existing.kickoffUtc || normalized.kickoffUtc;
    existing.homeAlt = existing.homeAlt || normalized.homeAlt;
    existing.awayAlt = existing.awayAlt || normalized.awayAlt;
    existing.homeCode = existing.homeCode || normalized.homeCode;
    existing.awayCode = existing.awayCode || normalized.awayCode;
    byBaseSlug.set(normalized.baseSlug, existing);
  }

  return [...byBaseSlug.values()].filter((group) => group.homeAlt && group.awayAlt && group.kickoffUtc);
}

function normalizePolymarketEvent(event) {
  const slug = cleanText(event.slug);
  const exact = slug.match(/^(fifwc-[a-z0-9]+-[a-z0-9]+-\d{4}-\d{2}-\d{2})-exact-score$/);
  const main = slug.match(/^(fifwc-[a-z0-9]+-[a-z0-9]+-\d{4}-\d{2}-\d{2})$/);
  if (!exact && !main) return null;

  const teams = extractTeams(event);
  if (!teams) return null;
  const kickoff = new Date(event.startTime || event.endDate || event.startDate || "");
  if (Number.isNaN(kickoff.getTime())) return null;
  return {
    raw: event,
    baseSlug: exact ? exact[1] : main[1],
    kind: exact ? "exact" : "main",
    kickoffUtc: kickoff.toISOString(),
    homeAlt: teams.home,
    awayAlt: teams.away,
    homeCode: teams.homeCode,
    awayCode: teams.awayCode,
  };
}

function extractTeams(event) {
  const teams = Array.isArray(event.teams) ? event.teams : [];
  const home = teams.find((team) => cleanText(team.ordering).toLowerCase() === "home");
  const away = teams.find((team) => cleanText(team.ordering).toLowerCase() === "away");
  if (home?.name && away?.name) {
    return {
      home: cleanText(home.name),
      away: cleanText(away.name),
      homeCode: cleanText(home.abbreviation).toUpperCase(),
      awayCode: cleanText(away.abbreviation).toUpperCase(),
    };
  }

  const title = cleanText(event.title).replace(/\s+-\s+Exact Score$/i, "");
  const titleMatch = title.match(/^(.+?)\s+vs\.?\s+(.+?)$/i);
  if (!titleMatch) return null;
  return {
    home: cleanText(titleMatch[1]),
    away: cleanText(titleMatch[2]),
    homeCode: codeFromName(titleMatch[1]),
    awayCode: codeFromName(titleMatch[2]),
  };
}

function extractWdl(event, homeAlt, awayAlt) {
  if (!event || !Array.isArray(event.markets)) return null;
  const raw = { homeWin: null, draw: null, awayWin: null };
  const marketIds = {};

  for (const market of event.markets) {
    const price = yesPrice(market);
    if (!Number.isFinite(price) || price <= 0) continue;
    const line = selectionLine(market, homeAlt, awayAlt);
    if (line === "home") {
      raw.homeWin = price;
      marketIds.homeWin = cleanText(market.id);
    } else if (line === "draw") {
      raw.draw = price;
      marketIds.draw = cleanText(market.id);
    } else if (line === "away") {
      raw.awayWin = price;
      marketIds.awayWin = cleanText(market.id);
    }
  }

  const total = raw.homeWin + raw.draw + raw.awayWin;
  if (![raw.homeWin, raw.draw, raw.awayWin, total].every(Number.isFinite) || total <= 0) return null;
  return {
    homeWin: raw.homeWin / total,
    draw: raw.draw / total,
    awayWin: raw.awayWin / total,
    raw,
    marketIds,
    eventSlug: cleanText(event.slug),
    updatedAt: cleanText(event.updatedAt),
  };
}

function selectionLine(market, homeAlt, awayAlt) {
  const metadataLine = cleanText(market.marketMetadata?.opticOddsSelectionLine).toLowerCase();
  if (["home", "draw", "away"].includes(metadataLine)) return metadataLine;
  const selection = teamKey(market.marketMetadata?.opticOddsSelection || market.groupItemTitle || "");
  if (selection === "draw") return "draw";
  if (selection && selection === teamKey(homeAlt)) return "home";
  if (selection && selection === teamKey(awayAlt)) return "away";
  const question = cleanText(market.question).toLowerCase();
  if (question.includes("end in a draw")) return "draw";
  if (question.includes(`${homeAlt.toLowerCase()} win`)) return "home";
  if (question.includes(`${awayAlt.toLowerCase()} win`)) return "away";
  return "";
}

function extractExactScore(event) {
  if (!event || !Array.isArray(event.markets)) return null;
  const scores = [];
  let otherRaw = 0;

  for (const market of event.markets) {
    if (!isExactScoreMarket(market)) continue;
    const price = yesPrice(market);
    if (!Number.isFinite(price) || price <= 0) continue;
    if (isAnyOtherScore(market)) {
      otherRaw += price;
      continue;
    }
    const score = parseScoreMarket(market);
    if (!score) continue;
    scores.push({
      ...score,
      probability: price,
      rawProbability: price,
      marketSlug: cleanText(market.slug),
    });
  }

  const total = scores.reduce((sum, score) => sum + score.probability, 0) + otherRaw;
  if (!scores.length || !Number.isFinite(total) || total <= 0) return null;
  return {
    scores: scores.map((score) => ({ ...score, probability: score.probability / total })),
    otherProbability: otherRaw / total,
    rawTotal: total,
    eventSlug: cleanText(event.slug),
    updatedAt: cleanText(event.updatedAt),
  };
}

function isExactScoreMarket(market) {
  const type = cleanText(market.sportsMarketType).toLowerCase();
  const metadata = cleanText(market.marketMetadata?.opticOddsMarketId).toLowerCase();
  return type === "soccer_exact_score" || metadata === "correct_score" || /^exact score:/i.test(cleanText(market.question));
}

function isAnyOtherScore(market) {
  const text = `${market.question || ""} ${market.groupItemTitle || ""}`.toLowerCase();
  return text.includes("any other score");
}

function parseScoreMarket(market) {
  const line = cleanText(market.marketMetadata?.opticOddsSelectionLine || market.marketMetadata?.opticOddsSelection);
  const fromLine = line.match(/(\d+)\s*[:\-]\s*(\d+)/);
  if (fromLine) return { home: Number(fromLine[1]), away: Number(fromLine[2]) };

  const title = cleanText(market.groupItemTitle || market.question);
  const fromTitle = title.match(/(\d+)\s*[-:]\s*(\d+)/);
  if (fromTitle) return { home: Number(fromTitle[1]), away: Number(fromTitle[2]) };
  return null;
}

function yesPrice(market) {
  const outcomes = parseJsonArray(market.outcomes);
  const prices = parseJsonArray(market.outcomePrices).map(Number);
  const yesIndex = outcomes.findIndex((item) => cleanText(item).toLowerCase() === "yes");
  const price = prices[yesIndex >= 0 ? yesIndex : 0];
  return Number.isFinite(price) ? price : null;
}

function parseJsonArray(value) {
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(String(value || "[]"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function findScheduleMatch(schedule, group) {
  const kickoffMs = new Date(group.kickoffUtc).getTime();
  const homeKey = teamKey(group.homeAlt);
  const awayKey = teamKey(group.awayAlt);
  const teamMatches = schedule.filter(
    (match) =>
      match.homeKey === homeKey &&
      match.awayKey === awayKey &&
      Number.isFinite(kickoffMs) &&
      Math.abs(match.kickoffMs - kickoffMs) <= 18 * 60 * 60 * 1000,
  );
  if (teamMatches.length === 1) return { ...teamMatches[0], matchedBy: "teams" };

  const timeMatches = schedule.filter(
    (match) => match.placeholder && Number.isFinite(kickoffMs) && Math.abs(match.kickoffMs - kickoffMs) <= 15 * 60 * 1000,
  );
  if (timeMatches.length === 1) return { ...timeMatches[0], matchedBy: "kickoff" };
  return null;
}

function parseWorldCup26Date(value, stadiumId) {
  const text = cleanText(value);
  const match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})$/);
  if (!match) {
    const date = new Date(text);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  const [, month, day, year, hour, minute] = match.map(Number);
  const offset = STADIUM_OFFSETS[Number(stadiumId)];
  if (!Number.isFinite(offset)) return new Date(year, month - 1, day, hour, minute);
  return new Date(Date.UTC(year, month - 1, day, hour, minute) - offset * 60 * 1000);
}

function isPlaceholder(value) {
  return /winner|runner-up|3rd group|loser|match \d+|tbd|to be decided/i.test(cleanText(value));
}

function codeFromName(name) {
  const cleanName = cleanText(name);
  if (TEAM_CODE_OVERRIDES[cleanName]) return TEAM_CODE_OVERRIDES[cleanName];
  return cleanName.replace(/[^a-z]/gi, "").slice(0, 3).toUpperCase() || "TBD";
}

function teamKey(value) {
  return cleanText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/gi, "")
    .toLowerCase();
}

function cleanText(value) {
  return String(value ?? "").trim();
}
