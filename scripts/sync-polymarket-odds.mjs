import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const DEFAULT_SCHEDULE_FILE = "data/worldcup26-games.json";
const DEFAULT_OUTPUT_FILE = "data/polymarket-odds.json";
const GAMMA_API_BASE = "https://gamma-api.polymarket.com";
const WORLD_CUP_TAG_ID = "102232";
const MAX_EVENT_AGE_MS = 12 * 60 * 60 * 1000;
const DEFAULT_SETTLED_EVENT_LOOKBACK_MS = 48 * 60 * 60 * 1000;
const SETTLED_EVENT_CUTOFF_PADDING_MS = 24 * 60 * 60 * 1000;
const CLOSED_EVENT_PAGE_SIZE = 100;
const MAX_CLOSED_EVENT_PAGES = 20;

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

const TEAM_KEY_ALIASES = {
  caboverde: "capeverde",
  czechrepublic: "czechia",
  cotedivoire: "ivorycoast",
  democraticrepublicofthecongo: "drcongo",
  congdr: "drcongo",
  korearepublic: "southkorea",
  republicofkorea: "southkorea",
  iran: "iriran",
  turkey: "turkiye",
  usa: "unitedstates",
  unitedstatesofamerica: "unitedstates",
};

const [scheduleArg = DEFAULT_SCHEDULE_FILE, outputArg = DEFAULT_OUTPUT_FILE] = process.argv.slice(2);
const schedulePath = path.resolve(scheduleArg);
const outputPath = path.resolve(outputArg);

const isMain = process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isMain) {
  main().catch((error) => {
    console.error(`Polymarket odds sync failed: ${error.message}`);
    process.exitCode = 1;
  });
}

async function main() {
  const schedule = readSchedule(schedulePath);
  const previous = readJsonIfExists(outputPath);
  const { openEvents, closedEvents } = await fetchWorldCupEvents(schedule, previous);
  const groups = groupPolymarketEvents(openEvents);
  const matches = [];
  const unmatchedEvents = [];
  const newlySettledResults = [];

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
    const settledResult = buildSettledResult(item, scheduleMatch);
    if (settledResult) newlySettledResults.push(settledResult);
    if (!scheduleMatch) {
      unmatchedEvents.push({
        slug: group.baseSlug,
        kickoffUtc: group.kickoffUtc,
        homeAlt: group.homeAlt,
        awayAlt: group.awayAlt,
      });
    }
  }

  for (const group of groupPolymarketEvents(closedEvents)) {
    const wdl = extractWdl(group.main, group.homeAlt, group.awayAlt);
    const exactScore = extractExactScore(group.exact);
    if (!wdl || !exactScore) continue;
    const scheduleMatch = findScheduleMatch(schedule, group);
    const settledResult = buildSettledResult(
      {
        matchId: scheduleMatch?.id || "",
        kickoffUtc: group.kickoffUtc,
        wdl,
        exactScore,
      },
      scheduleMatch,
    );
    if (settledResult) newlySettledResults.push(settledResult);
  }

  matches.sort((a, b) => new Date(a.kickoffUtc) - new Date(b.kickoffUtc));
  const settledResults = mergeSettledResults(previous?.settledResults, newlySettledResults);

  const payload = {
    source: "Polymarket Gamma API",
    sourceUrl: GAMMA_API_BASE,
    generatedAt: new Date().toISOString(),
    matches,
    unmatchedEvents,
    settledResults,
  };

  if (
    previous &&
    stableJson(previous.matches || []) === stableJson(payload.matches) &&
    stableJson(previous.unmatchedEvents || []) === stableJson(payload.unmatchedEvents) &&
    stableJson(previous.settledResults || []) === stableJson(payload.settledResults)
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

function buildSettledResult(match, scheduleMatch) {
  if (!scheduleMatch?.finished || !match?.matchId) return null;
  const exactScores = Array.isArray(match.exactScore?.scores) ? match.exactScore.scores : [];
  const resolvedScore = exactScores
    .filter((score) => Number(score?.rawProbability) >= 0.99)
    .sort((a, b) => Number(b.rawProbability) - Number(a.rawProbability))[0];
  if (!resolvedScore || !Number.isInteger(resolvedScore.home) || !Number.isInteger(resolvedScore.away)) return null;

  const rawWdl = match.wdl?.raw || {};
  const resolvedOutcome = [
    ["home", Number(rawWdl.homeWin)],
    ["draw", Number(rawWdl.draw)],
    ["away", Number(rawWdl.awayWin)],
  ].sort((a, b) => b[1] - a[1])[0];
  const scoreOutcome = resolvedScore.home > resolvedScore.away
    ? "home"
    : resolvedScore.home < resolvedScore.away
      ? "away"
      : "draw";
  if (!resolvedOutcome || !(resolvedOutcome[1] >= 0.99) || resolvedOutcome[0] !== scoreOutcome) return null;

  return {
    matchId: match.matchId,
    kickoffUtc: match.kickoffUtc,
    homeScore: resolvedScore.home,
    awayScore: resolvedScore.away,
    eventSlug: cleanText(match.exactScore?.eventSlug),
    resolvedAt: cleanText(match.exactScore?.updatedAt) || cleanText(match.wdl?.updatedAt) || new Date().toISOString(),
    resolutionVerified: true,
  };
}

function mergeSettledResults(previousResults, newResults) {
  const byMatchId = new Map();
  for (const result of Array.isArray(previousResults) ? previousResults : []) {
    if (cleanText(result?.matchId)) byMatchId.set(cleanText(result.matchId), result);
  }
  for (const result of newResults) byMatchId.set(result.matchId, result);
  return [...byMatchId.values()].sort((a, b) => new Date(a.kickoffUtc) - new Date(b.kickoffUtc));
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
    finished: ["true", "1", "yes"].includes(cleanText(game.finished).toLowerCase()),
    stage: cleanText(game.type).toLowerCase(),
  };
}

async function fetchWorldCupEvents(schedule, previous) {
  const openParams = new URLSearchParams({
    tag_id: WORLD_CUP_TAG_ID,
    active: "true",
    closed: "false",
    limit: "500",
    order: "startTime",
    ascending: "true",
  });
  const settledCutoffMs = getSettledEventCutoffMs(schedule, previous);
  const [openEvents, closedEvents] = await Promise.all([
    fetchJson(`${GAMMA_API_BASE}/events?${openParams.toString()}`),
    fetchClosedWorldCupEvents(settledCutoffMs),
  ]);
  if (!Array.isArray(openEvents) || !Array.isArray(closedEvents)) {
    throw new Error("Polymarket events response was not an array.");
  }
  const filterByAge = (events, maxAgeMs) => events.filter((event) => {
    const start = new Date(event.startTime || event.startDate || event.endDate || 0).getTime();
    return Number.isFinite(start) && start >= Date.now() - maxAgeMs;
  });
  return {
    openEvents: filterByAge(openEvents, MAX_EVENT_AGE_MS),
    closedEvents: closedEvents.filter((event) => {
      const start = new Date(event.startTime || event.startDate || event.endDate || 0).getTime();
      return Number.isFinite(start) && start >= settledCutoffMs;
    }),
  };
}

function getSettledEventCutoffMs(schedule, previous) {
  const verifiedMatchIds = new Set(
    (Array.isArray(previous?.settledResults) ? previous.settledResults : [])
      .filter((result) => result?.resolutionVerified === true)
      .map((result) => cleanText(result.matchId))
      .filter(Boolean),
  );
  const unresolvedKickoffs = schedule
    .filter(
      (match) =>
        match.finished &&
        match.stage !== "group" &&
        !verifiedMatchIds.has(match.id) &&
        Number.isFinite(match.kickoffMs),
    )
    .map((match) => match.kickoffMs);
  if (unresolvedKickoffs.length) {
    return Math.min(...unresolvedKickoffs) - SETTLED_EVENT_CUTOFF_PADDING_MS;
  }
  return Date.now() - DEFAULT_SETTLED_EVENT_LOOKBACK_MS;
}

async function fetchClosedWorldCupEvents(cutoffMs) {
  const events = [];
  const seenIds = new Set();
  for (let page = 0; page < MAX_CLOSED_EVENT_PAGES; page += 1) {
    const params = new URLSearchParams({
      tag_id: WORLD_CUP_TAG_ID,
      closed: "true",
      limit: String(CLOSED_EVENT_PAGE_SIZE),
      offset: String(page * CLOSED_EVENT_PAGE_SIZE),
      order: "startTime",
      ascending: "false",
    });
    const rows = await fetchJson(`${GAMMA_API_BASE}/events?${params.toString()}`);
    if (!Array.isArray(rows)) throw new Error("Polymarket closed events response was not an array.");

    for (const event of rows) {
      const key = cleanText(event.id || event.slug);
      if (!key || seenIds.has(key)) continue;
      seenIds.add(key);
      events.push(event);
    }

    const startTimes = rows
      .map((event) => new Date(event.startTime || event.startDate || event.endDate || 0).getTime())
      .filter(Number.isFinite);
    const oldestStartMs = startTimes.length ? Math.min(...startTimes) : Number.NaN;
    if (rows.length < CLOSED_EVENT_PAGE_SIZE || (Number.isFinite(oldestStartMs) && oldestStartMs < cutoffMs)) break;
  }
  return events;
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
    if (!Number.isFinite(price) || price < 0) continue;
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
  if (!Number.isFinite(offset)) return new Date(Date.UTC(year, month - 1, day, hour, minute));
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
  const normalized = cleanText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/gi, "")
    .toLowerCase();
  return TEAM_KEY_ALIASES[normalized] || normalized;
}

function cleanText(value) {
  return String(value ?? "").trim();
}

export {
  buildSettledResult,
  findScheduleMatch,
  getSettledEventCutoffMs,
  teamKey,
};
