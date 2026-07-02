const STORAGE_KEY = "worldcup_probability_matches_v1";
const LIVE_META_KEY = "worldcup_probability_live_meta_v1";
const ODDS_API_KEY_STORAGE = "worldcup_probability_odds_api_key_v1";
const ODDS_SPORT_KEY_STORAGE = "worldcup_probability_odds_sport_key_v1";
const ODDS_REGION_STORAGE = "worldcup_probability_odds_region_v1";
const SUPABASE_URL_STORAGE = "worldcup_probability_supabase_url_v1";
const SUPABASE_ANON_KEY_STORAGE = "worldcup_probability_supabase_anon_key_v1";
const SUPABASE_SESSION_STORAGE = "worldcup_probability_supabase_session_v1";
const USERNAME_STORAGE = "worldcup_probability_username_v1";
const INTERNAL_AUTH_EMAIL_DOMAIN = "@users.worldcup-lookup.app";
const WORLDCUP26_GAMES_URL = "https://worldcup26.ir/get/games";
const SCHEDULE_CACHE_URL = "data/worldcup26-games.json";
const POLYMARKET_ODDS_CACHE_URL = "data/polymarket-odds.json";
const THE_ODDS_API_BASE = "https://api.the-odds-api.com/v4";
const DEMO_REFERENCE_AT = "2026-06-22T16:00:00Z";
const MAX_EXACT_GOALS = 6;
const MAX_WDL_GOALS = 12;
const SHOW_ADMIN_TOOLS = false;
const AUTH_REFRESH_MARGIN_MS = 2 * 60 * 1000;
const LEADERBOARD_MIN_SETTLED_PREDICTIONS = 0;
const AUTO_SCHEDULE_SYNC_MAX_AGE_MS = 15 * 60 * 1000;
const PENDING_RESULT_RETRY_MS = 60 * 1000;
const MIN_LIVE_SCHEDULE_MATCHES = 60;
const LIVE_SCHEDULE_FORMAT_VERSION = "official-full-schedule-cache-fallback-awards-20260624";
const AWARD_PROBABILITY_CANDIDATE_LIMIT = 8;
const AWARD_PREDICTION_OPTION_LIMIT = 16;
const COMBO_MIN_LEGS = 2;
const COMBO_MAX_LEGS = 8;
const COMBO_MATCH_OPTION_LIMIT = 16;
const BEIJING_TIME_ZONE = "Asia/Shanghai";
const BEIJING_OFFSET_MINUTES = 8 * 60;
const AWARD_TYPES = ["golden_ball", "golden_boot", "golden_glove"];
const AWARD_LABELS = {
  golden_ball: "金球奖",
  golden_boot: "金靴奖",
  golden_glove: "金手套奖",
};
const AWARD_DESCRIPTIONS = {
  golden_ball: "综合进球贡献、球队走势和后续赛程的最佳球员概率。",
  golden_boot: "根据已进球数、球队剩余赛程和预期进球环境滚动估算。",
  golden_glove: "按球队失球、零封、晋级走势和剩余赛程估算门将获奖概率。",
};
const WORLDCUP26_STADIUMS = {
  1: { name: "Mexico City Stadium", city: "Mexico City", offsetMinutes: -360 },
  2: { name: "Estadio Guadalajara", city: "Guadalajara", offsetMinutes: -360 },
  3: { name: "Estadio Monterrey", city: "Monterrey", offsetMinutes: -360 },
  4: { name: "Dallas Stadium", city: "Dallas", offsetMinutes: -300 },
  5: { name: "Houston Stadium", city: "Houston", offsetMinutes: -300 },
  6: { name: "Kansas City Stadium", city: "Kansas City", offsetMinutes: -300 },
  7: { name: "Atlanta Stadium", city: "Atlanta", offsetMinutes: -240 },
  8: { name: "Miami Stadium", city: "Miami", offsetMinutes: -240 },
  9: { name: "Boston Stadium", city: "Boston", offsetMinutes: -240 },
  10: { name: "Philadelphia Stadium", city: "Philadelphia", offsetMinutes: -240 },
  11: { name: "New York/New Jersey Stadium", city: "New York/New Jersey", offsetMinutes: -240 },
  12: { name: "Toronto Stadium", city: "Toronto", offsetMinutes: -240 },
  13: { name: "BC Place Vancouver", city: "Vancouver", offsetMinutes: -420 },
  14: { name: "Seattle Stadium", city: "Seattle", offsetMinutes: -420 },
  15: { name: "San Francisco Bay Area Stadium", city: "San Francisco Bay Area", offsetMinutes: -420 },
  16: { name: "Los Angeles Stadium", city: "Los Angeles", offsetMinutes: -420 },
};
const TEAM_NAME_ZH = {
  Algeria: "阿尔及利亚",
  Argentina: "阿根廷",
  Australia: "澳大利亚",
  Austria: "奥地利",
  Belgium: "比利时",
  "Bosnia and Herzegovina": "波黑",
  Brazil: "巴西",
  Canada: "加拿大",
  "Cabo Verde": "佛得角",
  "Cape Verde": "佛得角",
  Colombia: "哥伦比亚",
  Croatia: "克罗地亚",
  Curaçao: "库拉索",
  Curacao: "库拉索",
  "Czech Republic": "捷克",
  "Democratic Republic of the Congo": "刚果民主共和国",
  "DR Congo": "刚果民主共和国",
  Ecuador: "厄瓜多尔",
  Egypt: "埃及",
  England: "英格兰",
  France: "法国",
  Germany: "德国",
  Ghana: "加纳",
  Haiti: "海地",
  Iran: "伊朗",
  Iraq: "伊拉克",
  "Ivory Coast": "科特迪瓦",
  "Cote d'Ivoire": "科特迪瓦",
  "Côte d'Ivoire": "科特迪瓦",
  Japan: "日本",
  Jordan: "约旦",
  Mexico: "墨西哥",
  Morocco: "摩洛哥",
  Netherlands: "荷兰",
  "New Zealand": "新西兰",
  Norway: "挪威",
  Panama: "巴拿马",
  Paraguay: "巴拉圭",
  Portugal: "葡萄牙",
  Qatar: "卡塔尔",
  "Saudi Arabia": "沙特阿拉伯",
  Scotland: "苏格兰",
  Senegal: "塞内加尔",
  "South Africa": "南非",
  "South Korea": "韩国",
  Spain: "西班牙",
  Sweden: "瑞典",
  Switzerland: "瑞士",
  Tunisia: "突尼斯",
  Turkey: "土耳其",
  Turkiye: "土耳其",
  "United States": "美国",
  "United States of America": "美国",
  Uruguay: "乌拉圭",
  Uzbekistan: "乌兹别克斯坦",
};
const TEAM_CODE_OVERRIDES = {
  Algeria: "ALG",
  Argentina: "ARG",
  Australia: "AUS",
  Austria: "AUT",
  Belgium: "BEL",
  "Bosnia and Herzegovina": "BIH",
  Brazil: "BRA",
  Canada: "CAN",
  "Cabo Verde": "CPV",
  "Cape Verde": "CPV",
  Colombia: "COL",
  Croatia: "CRO",
  Curaçao: "CUW",
  Curacao: "CUW",
  "Czech Republic": "CZE",
  "Democratic Republic of the Congo": "COD",
  "DR Congo": "COD",
  Ecuador: "ECU",
  Egypt: "EGY",
  England: "ENG",
  France: "FRA",
  Germany: "GER",
  Ghana: "GHA",
  Haiti: "HAI",
  Iran: "IRN",
  Iraq: "IRQ",
  "Ivory Coast": "CIV",
  "Cote d'Ivoire": "CIV",
  "Côte d'Ivoire": "CIV",
  Japan: "JPN",
  Jordan: "JOR",
  Mexico: "MEX",
  Morocco: "MAR",
  Netherlands: "NED",
  "New Zealand": "NZL",
  Norway: "NOR",
  Panama: "PAN",
  Paraguay: "PAR",
  Portugal: "POR",
  Qatar: "QAT",
  "Saudi Arabia": "KSA",
  Scotland: "SCO",
  Senegal: "SEN",
  "South Africa": "RSA",
  "South Korea": "KOR",
  Spain: "ESP",
  Sweden: "SWE",
  Switzerland: "SUI",
  Tunisia: "TUN",
  Turkey: "TUR",
  Turkiye: "TUR",
  "United States": "USA",
  "United States of America": "USA",
  Uruguay: "URU",
  Uzbekistan: "UZB",
};
const CHAMPION_TEAMS = [...new Map(
  Object.entries(TEAM_CODE_OVERRIDES).map(([teamName, teamCode]) => [
    teamCode,
    { code: teamCode, name: TEAM_NAME_ZH[teamName] || teamName },
  ]),
).values()].sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
const ACHIEVEMENT_DEFINITIONS = [
  { id: "first_prediction", name: "初次登场", mark: "01", description: "提交首个比赛预测" },
  { id: "triple_hit", name: "三次命中", mark: "03", description: "累计命中 3 次预测" },
  { id: "ten_hits", name: "十胜记录", mark: "10", description: "累计命中 10 次预测" },
  { id: "score_oracle", name: "比分先知", mark: "2:1", description: "命中 1 次具体比分" },
  { id: "combo_master", name: "组合大师", mark: "×", description: "命中 1 次组合预测" },
  { id: "underdog_hunter", name: "冷门猎手", mark: "25", description: "命中概率不高于 25% 的单场胜负平" },
  { id: "century_return", name: "二十倍回响", mark: "20×", description: "命中预测的返还倍数累计达到 20 倍" },
  { id: "precision_player", name: "稳定输出", mark: "40", description: "至少结算 5 次且命中率达到 40%" },
  { id: "all_rounder", name: "全能玩家", mark: "3型", description: "提交过胜平负、比分和组合预测" },
  { id: "hot_streak", name: "三连红", mark: "W3", description: "连续命中 3 次已结算预测" },
];
const ACHIEVEMENT_IDS = new Set(ACHIEVEMENT_DEFINITIONS.map((achievement) => achievement.id));
const TEAM_STRENGTH_RATINGS = {
  Argentina: 1980,
  France: 1970,
  Spain: 1940,
  England: 1925,
  Brazil: 1910,
  Portugal: 1890,
  Netherlands: 1870,
  Belgium: 1845,
  Germany: 1835,
  Uruguay: 1815,
  Colombia: 1800,
  Croatia: 1790,
  Morocco: 1760,
  "United States": 1750,
  "United States of America": 1750,
  Mexico: 1740,
  Japan: 1730,
  "Czech Republic": 1725,
  Switzerland: 1720,
  Austria: 1710,
  Senegal: 1705,
  Ecuador: 1700,
  Sweden: 1690,
  Turkey: 1685,
  Turkiye: 1685,
  Iran: 1670,
  "South Korea": 1665,
  Australia: 1655,
  "Ivory Coast": 1650,
  Norway: 1645,
  Paraguay: 1640,
  Ghana: 1635,
  Tunisia: 1620,
  Scotland: 1610,
  Algeria: 1605,
  Canada: 1600,
  "Bosnia and Herzegovina": 1595,
  "Saudi Arabia": 1585,
  Qatar: 1570,
  "South Africa": 1560,
  Egypt: 1555,
  Panama: 1540,
  "Democratic Republic of the Congo": 1530,
  Jordan: 1510,
  Iraq: 1505,
  Uzbekistan: 1500,
  Haiti: 1480,
  "Cape Verde": 1470,
  "New Zealand": 1450,
  Curaçao: 1420,
  Curacao: 1420,
};
const TEAM_GOAL_PROFILES = {
  Argentina: { attack: 1.16, concede: 0.84, tempo: 0.98 },
  France: { attack: 1.18, concede: 0.88, tempo: 1.02 },
  Spain: { attack: 1.12, concede: 0.9, tempo: 0.96 },
  England: { attack: 1.08, concede: 0.88, tempo: 0.92 },
  Brazil: { attack: 1.15, concede: 0.9, tempo: 1.06 },
  Portugal: { attack: 1.12, concede: 0.92, tempo: 1.02 },
  Netherlands: { attack: 1.1, concede: 0.95, tempo: 1.04 },
  Belgium: { attack: 1.08, concede: 0.96, tempo: 1.02 },
  Germany: { attack: 1.1, concede: 1, tempo: 1.08 },
  Uruguay: { attack: 1.06, concede: 0.9, tempo: 0.95 },
  Colombia: { attack: 1.07, concede: 0.94, tempo: 1 },
  Croatia: { attack: 1.02, concede: 0.88, tempo: 0.9 },
  Morocco: { attack: 0.98, concede: 0.86, tempo: 0.88 },
  "United States": { attack: 1.04, concede: 1, tempo: 1.08 },
  "United States of America": { attack: 1.04, concede: 1, tempo: 1.08 },
  Mexico: { attack: 1, concede: 0.94, tempo: 0.96 },
  Japan: { attack: 1.07, concede: 0.96, tempo: 1.08 },
  "Czech Republic": { attack: 0.98, concede: 0.92, tempo: 0.94 },
  Switzerland: { attack: 1, concede: 0.9, tempo: 0.92 },
  Austria: { attack: 1.03, concede: 0.95, tempo: 1.02 },
  Senegal: { attack: 1, concede: 0.9, tempo: 0.94 },
  Ecuador: { attack: 0.98, concede: 0.88, tempo: 0.92 },
  Sweden: { attack: 0.98, concede: 0.9, tempo: 0.9 },
  Turkey: { attack: 1.03, concede: 1.04, tempo: 1.08 },
  Turkiye: { attack: 1.03, concede: 1.04, tempo: 1.08 },
  Iran: { attack: 0.95, concede: 0.88, tempo: 0.86 },
  "South Korea": { attack: 1.02, concede: 0.98, tempo: 1.04 },
  Australia: { attack: 0.97, concede: 0.96, tempo: 0.96 },
  "Ivory Coast": { attack: 1.02, concede: 0.98, tempo: 1.04 },
  Norway: { attack: 1.05, concede: 1, tempo: 1.04 },
  Paraguay: { attack: 0.94, concede: 0.9, tempo: 0.88 },
  Ghana: { attack: 1, concede: 1.04, tempo: 1.08 },
  Tunisia: { attack: 0.92, concede: 0.88, tempo: 0.84 },
  Scotland: { attack: 0.96, concede: 0.96, tempo: 0.94 },
  Algeria: { attack: 0.98, concede: 0.94, tempo: 0.96 },
  Canada: { attack: 1.02, concede: 1.06, tempo: 1.1 },
  "Bosnia and Herzegovina": { attack: 0.98, concede: 1.02, tempo: 1 },
  "Saudi Arabia": { attack: 0.96, concede: 1.06, tempo: 1.06 },
  Qatar: { attack: 0.94, concede: 1.08, tempo: 1.04 },
  "South Africa": { attack: 0.94, concede: 1.02, tempo: 0.98 },
  Egypt: { attack: 0.96, concede: 0.9, tempo: 0.88 },
  Panama: { attack: 0.92, concede: 1.08, tempo: 1.04 },
  "Democratic Republic of the Congo": { attack: 0.96, concede: 1.04, tempo: 1.06 },
  Jordan: { attack: 0.9, concede: 1.06, tempo: 0.96 },
  Iraq: { attack: 0.92, concede: 1.02, tempo: 0.94 },
  Uzbekistan: { attack: 0.94, concede: 0.96, tempo: 0.92 },
  Haiti: { attack: 0.88, concede: 1.12, tempo: 1.08 },
  "Cape Verde": { attack: 0.9, concede: 1.02, tempo: 0.96 },
  "New Zealand": { attack: 0.88, concede: 1.1, tempo: 1.02 },
  "CuraÃ§ao": { attack: 0.86, concede: 1.14, tempo: 1.08 },
  Curacao: { attack: 0.86, concede: 1.14, tempo: 1.08 },
};

const seedMatches = [
  {
    id: "mexico-south-africa-2026-06-11",
    kickoffUtc: "2026-06-11T19:00:00Z",
    stage: "First Stage",
    group: "Group A",
    venue: "Mexico City Stadium",
    home: "墨西哥",
    homeAlt: "Mexico",
    homeCode: "MEX",
    away: "南非",
    awayAlt: "South Africa",
    awayCode: "RSA",
    lambdaHome: 1.55,
    lambdaAway: 0.88,
    result: { home: 2, away: 1 },
    generatedAt: "2026-06-11T12:00:00Z",
    source: "示例赛前模型",
  },
  {
    id: "germany-curacao-2026-06-14",
    kickoffUtc: "2026-06-14T20:00:00Z",
    stage: "First Stage",
    group: "Group E",
    venue: "Houston Stadium",
    home: "德国",
    homeAlt: "Germany",
    homeCode: "GER",
    away: "库拉索",
    awayAlt: "Curacao",
    awayCode: "CUW",
    lambdaHome: 2.72,
    lambdaAway: 0.38,
    result: { home: 7, away: 1 },
    generatedAt: "2026-06-14T12:00:00Z",
    source: "示例赛前模型",
  },
  {
    id: "usa-paraguay-2026-06-15",
    kickoffUtc: "2026-06-15T00:00:00Z",
    stage: "First Stage",
    group: "Group D",
    venue: "Seattle Stadium",
    home: "美国",
    homeAlt: "United States",
    homeCode: "USA",
    away: "巴拉圭",
    awayAlt: "Paraguay",
    awayCode: "PAR",
    lambdaHome: 1.75,
    lambdaAway: 0.98,
    result: { home: 4, away: 1 },
    generatedAt: "2026-06-14T16:00:00Z",
    source: "示例赛前模型",
  },
  {
    id: "canada-qatar-2026-06-16",
    kickoffUtc: "2026-06-16T02:00:00Z",
    stage: "First Stage",
    group: "Group B",
    venue: "Toronto Stadium",
    home: "加拿大",
    homeAlt: "Canada",
    homeCode: "CAN",
    away: "卡塔尔",
    awayAlt: "Qatar",
    awayCode: "QAT",
    lambdaHome: 1.68,
    lambdaAway: 0.72,
    result: { home: 6, away: 0 },
    generatedAt: "2026-06-15T14:00:00Z",
    source: "示例赛前模型",
  },
  {
    id: "argentina-algeria-2026-06-18",
    kickoffUtc: "2026-06-18T22:00:00Z",
    stage: "First Stage",
    group: "Group J",
    venue: "Los Angeles Stadium",
    home: "阿根廷",
    homeAlt: "Argentina",
    homeCode: "ARG",
    away: "阿尔及利亚",
    awayAlt: "Algeria",
    awayCode: "ALG",
    lambdaHome: 2.1,
    lambdaAway: 0.62,
    result: { home: 3, away: 0 },
    generatedAt: "2026-06-18T12:00:00Z",
    source: "示例赛前模型",
  },
  {
    id: "england-croatia-2026-06-20",
    kickoffUtc: "2026-06-20T20:00:00Z",
    stage: "First Stage",
    group: "Group K",
    venue: "Dallas Stadium",
    home: "英格兰",
    homeAlt: "England",
    homeCode: "ENG",
    away: "克罗地亚",
    awayAlt: "Croatia",
    awayCode: "CRO",
    lambdaHome: 1.58,
    lambdaAway: 1.05,
    result: { home: 4, away: 2 },
    generatedAt: "2026-06-20T10:00:00Z",
    source: "示例赛前模型",
  },
  {
    id: "belgium-iran-2026-06-21",
    kickoffUtc: "2026-06-21T19:00:00Z",
    stage: "First Stage",
    group: "Group F",
    venue: "Los Angeles Stadium",
    home: "比利时",
    homeAlt: "Belgium",
    homeCode: "BEL",
    away: "伊朗",
    awayAlt: "Iran",
    awayCode: "IRN",
    lambdaHome: 1.82,
    lambdaAway: 0.82,
    result: { home: 2, away: 0 },
    generatedAt: "2026-06-21T10:00:00Z",
    source: "示例赛前模型",
  },
  {
    id: "new-zealand-egypt-2026-06-22",
    kickoffUtc: "2026-06-22T01:00:00Z",
    stage: "First Stage",
    group: "Group G",
    venue: "Vancouver Stadium",
    home: "新西兰",
    homeAlt: "New Zealand",
    homeCode: "NZL",
    away: "埃及",
    awayAlt: "Egypt",
    awayCode: "EGY",
    lambdaHome: 0.82,
    lambdaAway: 1.56,
    result: { home: 1, away: 1 },
    generatedAt: "2026-06-21T16:00:00Z",
    source: "示例赛前模型",
  },
  {
    id: "argentina-austria-2026-06-22",
    kickoffUtc: "2026-06-22T17:00:00Z",
    stage: "First Stage",
    group: "Group J",
    venue: "Dallas Stadium",
    home: "阿根廷",
    homeAlt: "Argentina",
    homeCode: "ARG",
    away: "奥地利",
    awayAlt: "Austria",
    awayCode: "AUT",
    lambdaHome: 1.92,
    lambdaAway: 0.94,
    generatedAt: "2026-06-22T10:00:00Z",
    source: "示例赛前模型",
  },
  {
    id: "france-iraq-2026-06-22",
    kickoffUtc: "2026-06-22T21:00:00Z",
    stage: "First Stage",
    group: "Group H",
    venue: "Philadelphia Stadium",
    home: "法国",
    homeAlt: "France",
    homeCode: "FRA",
    away: "伊拉克",
    awayAlt: "Iraq",
    awayCode: "IRQ",
    lambdaHome: 2.24,
    lambdaAway: 0.54,
    generatedAt: "2026-06-22T10:00:00Z",
    source: "示例赛前模型",
  },
  {
    id: "norway-senegal-2026-06-23",
    kickoffUtc: "2026-06-23T00:00:00Z",
    stage: "First Stage",
    group: "Group H",
    venue: "New York New Jersey Stadium",
    home: "挪威",
    homeAlt: "Norway",
    homeCode: "NOR",
    away: "塞内加尔",
    awayAlt: "Senegal",
    awayCode: "SEN",
    lambdaHome: 1.34,
    lambdaAway: 1.12,
    generatedAt: "2026-06-22T10:00:00Z",
    source: "示例赛前模型",
  },
  {
    id: "morocco-haiti-2026-06-24",
    kickoffUtc: "2026-06-24T22:00:00Z",
    stage: "First Stage",
    group: "Group C",
    venue: "Atlanta Stadium",
    home: "摩洛哥",
    homeAlt: "Morocco",
    homeCode: "MAR",
    away: "海地",
    awayAlt: "Haiti",
    awayCode: "HAI",
    lambdaHome: 1.78,
    lambdaAway: 0.78,
    generatedAt: "2026-06-22T10:00:00Z",
    source: "示例赛前模型",
  },
  {
    id: "ecuador-germany-2026-06-25",
    kickoffUtc: "2026-06-25T20:00:00Z",
    stage: "First Stage",
    group: "Group E",
    venue: "New York New Jersey Stadium",
    home: "厄瓜多尔",
    homeAlt: "Ecuador",
    homeCode: "ECU",
    away: "德国",
    awayAlt: "Germany",
    awayCode: "GER",
    lambdaHome: 0.92,
    lambdaAway: 1.86,
    generatedAt: "2026-06-22T10:00:00Z",
    source: "示例赛前模型",
  },
  {
    id: "tunisia-netherlands-2026-06-25",
    kickoffUtc: "2026-06-25T23:00:00Z",
    stage: "First Stage",
    group: "Group I",
    venue: "Kansas City Stadium",
    home: "突尼斯",
    homeAlt: "Tunisia",
    homeCode: "TUN",
    away: "荷兰",
    awayAlt: "Netherlands",
    awayCode: "NED",
    lambdaHome: 0.7,
    lambdaAway: 1.82,
    generatedAt: "2026-06-22T10:00:00Z",
    source: "示例赛前模型",
  },
  {
    id: "croatia-ghana-2026-06-27",
    kickoffUtc: "2026-06-27T21:00:00Z",
    stage: "First Stage",
    group: "Group K",
    venue: "Philadelphia Stadium",
    home: "克罗地亚",
    homeAlt: "Croatia",
    homeCode: "CRO",
    away: "加纳",
    awayAlt: "Ghana",
    awayCode: "GHA",
    lambdaHome: 1.36,
    lambdaAway: 1.08,
    generatedAt: "2026-06-22T10:00:00Z",
    source: "示例赛前模型",
  },
  {
    id: "colombia-portugal-2026-06-27",
    kickoffUtc: "2026-06-27T23:30:00Z",
    stage: "First Stage",
    group: "Group L",
    venue: "Miami Stadium",
    home: "哥伦比亚",
    homeAlt: "Colombia",
    homeCode: "COL",
    away: "葡萄牙",
    awayAlt: "Portugal",
    awayCode: "POR",
    lambdaHome: 1.02,
    lambdaAway: 1.5,
    generatedAt: "2026-06-22T10:00:00Z",
    source: "示例赛前模型",
  },
];
const SEED_MATCH_IDS = new Set(seedMatches.map((match) => match.id));
const OFFICIAL_UPCOMING_SNAPSHOT = [
  { id: "1", local_date: "06/11/2026 13:00", stadium_id: "1", home_team_name_en: "Mexico", away_team_name_en: "South Africa", home_score: "2", away_score: "0", group: "A", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "2", local_date: "06/11/2026 20:00", stadium_id: "2", home_team_name_en: "South Korea", away_team_name_en: "Czech Republic", home_score: "2", away_score: "1", group: "A", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "3", local_date: "06/12/2026 15:00", stadium_id: "12", home_team_name_en: "Canada", away_team_name_en: "Bosnia and Herzegovina", home_score: "1", away_score: "1", group: "B", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "4", local_date: "06/12/2026 18:00", stadium_id: "16", home_team_name_en: "United States", away_team_name_en: "Paraguay", home_score: "4", away_score: "1", group: "D", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "5", local_date: "06/13/2026 21:00", stadium_id: "9", home_team_name_en: "Haiti", away_team_name_en: "Scotland", home_score: "0", away_score: "1", group: "C", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "6", local_date: "06/13/2026 21:00", stadium_id: "13", home_team_name_en: "Australia", away_team_name_en: "Turkey", home_score: "2", away_score: "0", group: "D", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "7", local_date: "06/13/2026 18:00", stadium_id: "11", home_team_name_en: "Brazil", away_team_name_en: "Morocco", home_score: "1", away_score: "1", group: "C", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "8", local_date: "06/13/2026 12:00", stadium_id: "15", home_team_name_en: "Qatar", away_team_name_en: "Switzerland", home_score: "1", away_score: "1", group: "B", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "9", local_date: "06/14/2026 19:00", stadium_id: "10", home_team_name_en: "Ivory Coast", away_team_name_en: "Ecuador", home_score: "1", away_score: "0", group: "E", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "10", local_date: "06/14/2026 12:00", stadium_id: "5", home_team_name_en: "Germany", away_team_name_en: "Curaçao", home_score: "7", away_score: "1", group: "E", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "11", local_date: "06/14/2026 15:00", stadium_id: "4", home_team_name_en: "Netherlands", away_team_name_en: "Japan", home_score: "2", away_score: "2", group: "F", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "12", local_date: "06/14/2026 20:00", stadium_id: "3", home_team_name_en: "Sweden", away_team_name_en: "Tunisia", home_score: "5", away_score: "1", group: "F", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "13", local_date: "06/15/2026 18:00", stadium_id: "16", home_team_name_en: "Iran", away_team_name_en: "New Zealand", home_score: "2", away_score: "2", group: "G", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "14", local_date: "06/15/2026 12:00", stadium_id: "7", home_team_name_en: "Spain", away_team_name_en: "Cape Verde", home_score: "0", away_score: "0", group: "H", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "15", local_date: "06/15/2026 12:00", stadium_id: "14", home_team_name_en: "Belgium", away_team_name_en: "Egypt", home_score: "1", away_score: "1", group: "G", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "16", local_date: "06/15/2026 18:00", stadium_id: "8", home_team_name_en: "Saudi Arabia", away_team_name_en: "Uruguay", home_score: "1", away_score: "1", group: "H", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "17", local_date: "06/16/2026 15:00", stadium_id: "11", home_team_name_en: "France", away_team_name_en: "Senegal", home_score: "3", away_score: "1", group: "I", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "18", local_date: "06/16/2026 18:00", stadium_id: "9", home_team_name_en: "Iraq", away_team_name_en: "Norway", home_score: "1", away_score: "4", group: "I", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "19", local_date: "06/16/2026 20:00", stadium_id: "6", home_team_name_en: "Argentina", away_team_name_en: "Algeria", home_score: "3", away_score: "0", group: "J", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "20", local_date: "06/16/2026 21:00", stadium_id: "15", home_team_name_en: "Austria", away_team_name_en: "Jordan", home_score: "3", away_score: "1", group: "J", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "21", local_date: "06/17/2026 12:00", stadium_id: "5", home_team_name_en: "Portugal", away_team_name_en: "Democratic Republic of the Congo", home_score: "1", away_score: "1", group: "K", finished: "TRUE", time_elapsed: "Finished", type: "group" },
  { id: "22", local_date: "06/17/2026 15:00", stadium_id: "4", home_team_name_en: "England", away_team_name_en: "Croatia", home_score: "4", away_score: "2", group: "L", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "23", local_date: "06/17/2026 20:00", stadium_id: "1", home_team_name_en: "Uzbekistan", away_team_name_en: "Colombia", home_score: "1", away_score: "3", group: "K", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "24", local_date: "06/17/2026 19:00", stadium_id: "12", home_team_name_en: "Ghana", away_team_name_en: "Panama", home_score: "1", away_score: "0", group: "L", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "25", local_date: "06/18/2026 19:00", stadium_id: "2", home_team_name_en: "Mexico", away_team_name_en: "South Korea", home_score: "1", away_score: "0", group: "A", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "26", local_date: "06/18/2026 12:00", stadium_id: "16", home_team_name_en: "Switzerland", away_team_name_en: "Bosnia and Herzegovina", home_score: "4", away_score: "1", group: "B", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "27", local_date: "06/18/2026 15:00", stadium_id: "13", home_team_name_en: "Canada", away_team_name_en: "Qatar", home_score: "6", away_score: "0", group: "B", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "28", local_date: "06/18/2026 12:00", stadium_id: "7", home_team_name_en: "Czech Republic", away_team_name_en: "South Africa", home_score: "1", away_score: "1", group: "A", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "29", local_date: "06/19/2026 21:00", stadium_id: "10", home_team_name_en: "Brazil", away_team_name_en: "Haiti", home_score: "3", away_score: "0", group: "C", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "30", local_date: "06/19/2026 18:00", stadium_id: "9", home_team_name_en: "Scotland", away_team_name_en: "Morocco", home_score: "0", away_score: "1", group: "C", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "31", local_date: "06/19/2026 12:00", stadium_id: "14", home_team_name_en: "United States", away_team_name_en: "Australia", home_score: "2", away_score: "0", group: "D", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "32", local_date: "06/19/2026 20:00", stadium_id: "15", home_team_name_en: "Turkey", away_team_name_en: "Paraguay", home_score: "0", away_score: "1", group: "D", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "33", local_date: "06/20/2026 16:00", stadium_id: "12", home_team_name_en: "Germany", away_team_name_en: "Ivory Coast", home_score: "2", away_score: "1", group: "E", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "34", local_date: "06/20/2026 19:00", stadium_id: "6", home_team_name_en: "Ecuador", away_team_name_en: "Curaçao", home_score: "0", away_score: "0", group: "E", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "35", local_date: "06/20/2026 12:00", stadium_id: "5", home_team_name_en: "Netherlands", away_team_name_en: "Sweden", home_score: "5", away_score: "1", group: "F", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "36", local_date: "06/20/2026 22:00", stadium_id: "3", home_team_name_en: "Tunisia", away_team_name_en: "Japan", home_score: "0", away_score: "4", group: "F", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "37", local_date: "06/21/2026 12:00", stadium_id: "16", home_team_name_en: "Belgium", away_team_name_en: "Iran", home_score: "0", away_score: "0", group: "G", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "38", local_date: "06/21/2026 18:00", stadium_id: "13", home_team_name_en: "New Zealand", away_team_name_en: "Egypt", home_score: "1", away_score: "3", group: "G", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "39", local_date: "06/21/2026 12:00", stadium_id: "7", home_team_name_en: "Spain", away_team_name_en: "Saudi Arabia", home_score: "4", away_score: "0", group: "H", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "40", local_date: "06/21/2026 18:00", stadium_id: "8", home_team_name_en: "Uruguay", away_team_name_en: "Cape Verde", home_score: "2", away_score: "2", group: "H", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "41", local_date: "06/22/2026 17:00", stadium_id: "10", home_team_name_en: "France", away_team_name_en: "Iraq", home_score: "3", away_score: "0", group: "I", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "42", local_date: "06/22/2026 20:00", stadium_id: "11", home_team_name_en: "Norway", away_team_name_en: "Senegal", home_score: "3", away_score: "2", group: "I", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "43", local_date: "06/22/2026 12:00", stadium_id: "4", home_team_name_en: "Argentina", away_team_name_en: "Austria", home_score: "2", away_score: "0", group: "J", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "44", local_date: "06/22/2026 20:00", stadium_id: "15", home_team_name_en: "Jordan", away_team_name_en: "Algeria", home_score: "1", away_score: "2", group: "J", finished: "TRUE", time_elapsed: "finished", type: "group" },
  { id: "45", local_date: "06/23/2026 12:00", stadium_id: "5", home_team_name_en: "Portugal", away_team_name_en: "Uzbekistan", group: "K", finished: "FALSE", type: "group" },
  { id: "46", local_date: "06/23/2026 19:00", stadium_id: "12", home_team_name_en: "Panama", away_team_name_en: "Croatia", group: "L", finished: "FALSE", type: "group" },
  { id: "47", local_date: "06/23/2026 20:00", stadium_id: "2", home_team_name_en: "Colombia", away_team_name_en: "Democratic Republic of the Congo", group: "K", finished: "FALSE", type: "group" },
  { id: "48", local_date: "06/23/2026 16:00", stadium_id: "9", home_team_name_en: "England", away_team_name_en: "Ghana", group: "L", finished: "FALSE", type: "group" },
  { id: "49", local_date: "06/24/2026 18:00", stadium_id: "8", home_team_name_en: "Scotland", away_team_name_en: "Brazil", group: "C", finished: "FALSE", type: "group" },
  { id: "50", local_date: "06/24/2026 18:00", stadium_id: "7", home_team_name_en: "Morocco", away_team_name_en: "Haiti", group: "C", finished: "FALSE", type: "group" },
  { id: "51", local_date: "06/24/2026 19:00", stadium_id: "3", home_team_name_en: "South Africa", away_team_name_en: "South Korea", group: "A", finished: "FALSE", type: "group" },
  { id: "52", local_date: "06/24/2026 19:00", stadium_id: "1", home_team_name_en: "Czech Republic", away_team_name_en: "Mexico", group: "A", finished: "FALSE", type: "group" },
  { id: "53", local_date: "06/24/2026 12:00", stadium_id: "14", home_team_name_en: "Bosnia and Herzegovina", away_team_name_en: "Qatar", group: "B", finished: "FALSE", type: "group" },
  { id: "54", local_date: "06/24/2026 12:00", stadium_id: "13", home_team_name_en: "Switzerland", away_team_name_en: "Canada", group: "B", finished: "FALSE", type: "group" },
  { id: "55", local_date: "06/25/2026 16:00", stadium_id: "10", home_team_name_en: "Curaçao", away_team_name_en: "Ivory Coast", group: "E", finished: "FALSE", type: "group" },
  { id: "56", local_date: "06/25/2026 16:00", stadium_id: "11", home_team_name_en: "Ecuador", away_team_name_en: "Germany", group: "E", finished: "FALSE", type: "group" },
  { id: "57", local_date: "06/25/2026 19:00", stadium_id: "15", home_team_name_en: "Paraguay", away_team_name_en: "Australia", group: "D", finished: "FALSE", type: "group" },
  { id: "58", local_date: "06/25/2026 19:00", stadium_id: "16", home_team_name_en: "Turkey", away_team_name_en: "United States", group: "D", finished: "FALSE", type: "group" },
  { id: "59", local_date: "06/25/2026 18:00", stadium_id: "4", home_team_name_en: "Japan", away_team_name_en: "Sweden", group: "F", finished: "FALSE", type: "group" },
  { id: "60", local_date: "06/25/2026 18:00", stadium_id: "6", home_team_name_en: "Tunisia", away_team_name_en: "Netherlands", group: "F", finished: "FALSE", type: "group" },
  { id: "61", local_date: "06/26/2026 15:00", stadium_id: "12", home_team_name_en: "Senegal", away_team_name_en: "Iraq", group: "I", finished: "FALSE", type: "group" },
  { id: "62", local_date: "06/26/2026 15:00", stadium_id: "9", home_team_name_en: "Norway", away_team_name_en: "France", group: "I", finished: "FALSE", type: "group" },
  { id: "63", local_date: "06/26/2026 20:00", stadium_id: "14", home_team_name_en: "Egypt", away_team_name_en: "Iran", group: "G", finished: "FALSE", type: "group" },
  { id: "64", local_date: "06/26/2026 20:00", stadium_id: "13", home_team_name_en: "New Zealand", away_team_name_en: "Belgium", group: "G", finished: "FALSE", type: "group" },
  { id: "65", local_date: "06/26/2026 19:00", stadium_id: "5", home_team_name_en: "Cape Verde", away_team_name_en: "Saudi Arabia", group: "H", finished: "FALSE", type: "group" },
  { id: "66", local_date: "06/26/2026 18:00", stadium_id: "2", home_team_name_en: "Uruguay", away_team_name_en: "Spain", group: "H", finished: "FALSE", type: "group" },
  { id: "67", local_date: "06/27/2026 17:00", stadium_id: "11", home_team_name_en: "Panama", away_team_name_en: "England", group: "L", finished: "FALSE", type: "group" },
  { id: "68", local_date: "06/27/2026 17:00", stadium_id: "10", home_team_name_en: "Croatia", away_team_name_en: "Ghana", group: "L", finished: "FALSE", type: "group" },
  { id: "69", local_date: "06/27/2026 21:00", stadium_id: "6", home_team_name_en: "Algeria", away_team_name_en: "Austria", group: "J", finished: "FALSE", type: "group" },
  { id: "70", local_date: "06/27/2026 21:00", stadium_id: "4", home_team_name_en: "Jordan", away_team_name_en: "Argentina", group: "J", finished: "FALSE", type: "group" },
  { id: "71", local_date: "06/27/2026 19:30", stadium_id: "8", home_team_name_en: "Colombia", away_team_name_en: "Portugal", group: "K", finished: "FALSE", type: "group" },
  { id: "72", local_date: "06/27/2026 19:30", stadium_id: "7", home_team_name_en: "Democratic Republic of the Congo", away_team_name_en: "Uzbekistan", group: "K", finished: "FALSE", type: "group" },
];

const state = {
  matches: loadMatches(),
  view: "upcoming",
  query: "",
  group: "all",
  limit: "8",
  selectedId: null,
  referenceAt: getInitialReference(),
  scoreHome: 1,
  scoreAway: 1,
  notice: "",
  liveMeta: loadLiveMeta(),
  isSyncingSchedule: false,
  isSyncingOdds: false,
  supabase: null,
  authSession: null,
  authExpiryTimer: null,
  authRefreshPromise: null,
  scheduleRetryTimer: null,
  authStatus: "未连接 Supabase",
  authNotice: "",
  predictionNotice: "",
  comboPredictionNotice: "",
  comboSchemaMissing: false,
  comboDraft: { stakePoints: null, selections: {} },
  isSubmittingCombo: false,
  predictionProfile: { championTeamCode: "", achievements: [] },
  predictionProfileNotice: "",
  predictionProfileSchemaMissing: false,
  championDraftTeamCode: "",
  isSavingChampionPick: false,
  polymarketSettledResults: new Map(),
  pointBalance: null,
  pointSchemaMissing: false,
  awardPredictionNotice: "",
  myPredictions: [],
  publicPredictions: [],
  myAwardPredictions: [],
  awardPredictions: [],
  awardSchemaMissing: false,
  leaderboardRows: [],
  leaderboardNotice: "",
  isLoadingLeaderboard: false,
  isLoadingPredictions: false,
  isAuthBusy: false,
  isAdmin: false,
  isLoadingAdmin: false,
  adminUsers: [],
  adminPredictions: [],
  selectedAdminUserId: "",
  adminNotice: "",
};

const els = {
  searchInput: document.getElementById("searchInput"),
  referenceInput: document.getElementById("referenceInput"),
  groupFilter: document.getElementById("groupFilter"),
  limitSelect: document.getElementById("limitSelect"),
  matchList: document.getElementById("matchList"),
  matchDetail: document.getElementById("matchDetail"),
  upcomingCount: document.getElementById("upcomingCount"),
  historyCount: document.getElementById("historyCount"),
  strongestLean: document.getElementById("strongestLean"),
  liveStatus: document.getElementById("liveStatus"),
  syncScheduleButton: document.getElementById("syncScheduleButton"),
  syncOddsButton: document.getElementById("syncOddsButton"),
  oddsApiKeyInput: document.getElementById("oddsApiKeyInput"),
  oddsSportKeyInput: document.getElementById("oddsSportKeyInput"),
  oddsRegionSelect: document.getElementById("oddsRegionSelect"),
  authStatus: document.getElementById("authStatus"),
  pointBalance: document.getElementById("pointBalance"),
  usernameInput: document.getElementById("usernameInput"),
  passwordInput: document.getElementById("passwordInput"),
  loginButton: document.getElementById("loginButton"),
  registerButton: document.getElementById("registerButton"),
  signOutButton: document.getElementById("signOutButton"),
  predictionProfilePanel: document.getElementById("predictionProfilePanel"),
  refreshPredictionsButton: document.getElementById("refreshPredictionsButton"),
  comboPredictionPanel: document.getElementById("comboPredictionPanel"),
  awardsPanel: document.getElementById("awardsPanel"),
  leaderboardList: document.getElementById("leaderboardList"),
  myPredictionsList: document.getElementById("myPredictionsList"),
  publicPredictionsList: document.getElementById("publicPredictionsList"),
  adminPanel: document.getElementById("adminPanel"),
  adminUsersList: document.getElementById("adminUsersList"),
  adminPredictionsList: document.getElementById("adminPredictionsList"),
  adminNotice: document.getElementById("adminNotice"),
  refreshAdminButton: document.getElementById("refreshAdminButton"),
  addMatchButton: document.getElementById("addMatchButton"),
  importButton: document.getElementById("importButton"),
  exportButton: document.getElementById("exportButton"),
  resetButton: document.getElementById("resetButton"),
  importFile: document.getElementById("importFile"),
  tabs: document.querySelectorAll(".tab"),
};

init();

function init() {
  if (els.referenceInput) els.referenceInput.value = toBeijingDatetimeLocal(state.referenceAt);
  if (els.limitSelect) els.limitSelect.value = state.limit;
  if (SHOW_ADMIN_TOOLS && els.oddsApiKeyInput && els.oddsSportKeyInput && els.oddsRegionSelect) {
    els.oddsApiKeyInput.value = localStorage.getItem(ODDS_API_KEY_STORAGE) || "";
    els.oddsSportKeyInput.value = localStorage.getItem(ODDS_SPORT_KEY_STORAGE) || "soccer_fifa_world_cup";
    els.oddsRegionSelect.value = localStorage.getItem(ODDS_REGION_STORAGE) || "us";
  }
  const supabaseConfig = getSupabaseConfig();
  els.usernameInput.value = localStorage.getItem(USERNAME_STORAGE) || "";
  applyOfficialScheduleSnapshotIfNeeded();
  renderGroupOptions();
  bindEvents();
  render();
  if (supabaseConfig.url && supabaseConfig.anonKey) {
    connectSupabase();
  }
  loadPolymarketOddsCache({ silent: true });
  maybeAutoSyncSchedule();
}

function bindEvents() {
  if (els.searchInput) {
    els.searchInput.addEventListener("input", (event) => {
      state.query = event.target.value.trim();
      state.selectedId = null;
      render();
    });
  }

  if (els.referenceInput) {
    els.referenceInput.addEventListener("change", (event) => {
      const nextDate = parseBeijingDatetimeLocal(event.target.value);
      if (Number.isNaN(nextDate.getTime())) return;
      state.referenceAt = nextDate;
      state.selectedId = null;
      render();
    });
  }

  if (els.groupFilter) {
    els.groupFilter.addEventListener("change", (event) => {
      state.group = event.target.value;
      state.selectedId = null;
      render();
    });
  }

  if (els.limitSelect) {
    els.limitSelect.addEventListener("change", (event) => {
      state.limit = event.target.value;
      render();
    });
  }

  els.tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      state.view = tab.dataset.view;
      state.selectedId = null;
      render();
    });
  });

  els.matchList.addEventListener("click", (event) => {
    const card = event.target.closest("[data-match-id]");
    if (!card) return;
    state.selectedId = card.dataset.matchId;
    state.predictionNotice = "";
    render();
  });

  els.matchDetail.addEventListener("input", (event) => {
    if (event.target.matches("[data-score-input]")) {
      const value = Number(event.target.value);
      if (!Number.isFinite(value)) return;
      const clipped = Math.max(0, Math.min(12, Math.trunc(value)));
      if (event.target.dataset.scoreInput === "home") state.scoreHome = clipped;
      if (event.target.dataset.scoreInput === "away") state.scoreAway = clipped;
      renderDetail(getSelectedMatch());
      return;
    }

    const predictionForm = event.target.closest("[data-prediction-form]");
    if (predictionForm) updatePredictionPayoutPreview(getSelectedMatch(), predictionForm);
  });

  els.matchDetail.addEventListener("change", (event) => {
    const form = event.target.closest("[data-prediction-form]");
    if (!form) return;
    if (event.target.matches("[name='predictionType']")) {
      form.dataset.predictionType = event.target.value;
    }
    updatePredictionPayoutPreview(getSelectedMatch(), form);
  });

  els.matchDetail.addEventListener("click", handleDetailAction);
  if (els.comboPredictionPanel) {
    els.comboPredictionPanel.addEventListener("change", handleComboPredictionChange);
    els.comboPredictionPanel.addEventListener("input", handleComboPredictionInput);
    els.comboPredictionPanel.addEventListener("click", (event) => {
      if (event.target.closest("[data-action='submit-combo-prediction']")) submitComboPrediction();
    });
  }
  if (els.awardsPanel) {
    els.awardsPanel.addEventListener("click", handleAwardAction);
  }
  if (SHOW_ADMIN_TOOLS) {
    els.syncScheduleButton.addEventListener("click", syncWorldCupSchedule);
    els.syncOddsButton.addEventListener("click", syncOdds);
    els.oddsApiKeyInput.addEventListener("change", () => {
      localStorage.setItem(ODDS_API_KEY_STORAGE, els.oddsApiKeyInput.value.trim());
    });
    els.oddsSportKeyInput.addEventListener("change", () => {
      localStorage.setItem(ODDS_SPORT_KEY_STORAGE, els.oddsSportKeyInput.value.trim());
    });
    els.oddsRegionSelect.addEventListener("change", () => {
      localStorage.setItem(ODDS_REGION_STORAGE, els.oddsRegionSelect.value);
    });
  }
  els.loginButton.addEventListener("click", loginWithUsername);
  els.registerButton.addEventListener("click", registerWithUsername);
  els.usernameInput.addEventListener("change", () => {
    localStorage.setItem(USERNAME_STORAGE, cleanText(els.usernameInput.value));
  });
  els.passwordInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") loginWithUsername();
  });
  els.signOutButton.addEventListener("click", signOut);
  if (els.predictionProfilePanel) {
    els.predictionProfilePanel.addEventListener("change", (event) => {
      if (event.target.matches("#championTeamSelect")) {
        state.championDraftTeamCode = normalizeChampionTeamCode(event.target.value);
      }
    });
    els.predictionProfilePanel.addEventListener("click", (event) => {
      if (event.target.closest("[data-action='select-champion-team']")) selectChampionTeam();
    });
  }
  els.refreshPredictionsButton.addEventListener("click", loadPredictions);
  if (els.refreshAdminButton) els.refreshAdminButton.addEventListener("click", () => loadAdminData({ force: true }));
  if (els.adminPanel) els.adminPanel.addEventListener("click", handleAdminAction);
  if (SHOW_ADMIN_TOOLS) {
    els.addMatchButton.addEventListener("click", addMatch);
    els.importButton.addEventListener("click", () => els.importFile.click());
    els.importFile.addEventListener("change", importData);
    els.exportButton.addEventListener("click", exportData);
    els.resetButton.addEventListener("click", () => {
      state.matches = seedMatches.map((match) => ({ ...match }));
      state.selectedId = null;
      localStorage.removeItem(STORAGE_KEY);
      renderGroupOptions();
      render();
    });
  }
}

function render() {
  renderTabs();
  renderLiveStatus();
  renderAuthStatus();
  renderPredictionProfilePanel();
  renderSummary();
  renderList();
  renderDetail(getSelectedMatch());
  renderComboPredictionPanel();
  renderAwards();
  renderPredictionLists();
  renderAdminPanel();
}

function renderTabs() {
  els.tabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.view === state.view);
  });
}

function renderLiveStatus() {
  if (!SHOW_ADMIN_TOOLS) return;
  const parts = [];
  if (state.liveMeta.scheduleSyncedAt) {
    parts.push(`赛程 ${formatDateFull(state.liveMeta.scheduleSyncedAt)}`);
  }
  if (state.liveMeta.oddsSyncedAt) {
    parts.push(`赔率 ${formatDateFull(state.liveMeta.oddsSyncedAt)}`);
  }
  if (state.liveMeta.lastError) {
    parts.push(`错误：${state.liveMeta.lastError}`);
  }
  els.liveStatus.textContent = parts.length ? parts.join("；") : "未同步";
  els.syncScheduleButton.disabled = state.isSyncingSchedule;
  els.syncScheduleButton.textContent = state.isSyncingSchedule ? "同步中..." : "同步赛程/比分";
  els.syncOddsButton.disabled = state.isSyncingOdds;
  els.syncOddsButton.textContent = state.isSyncingOdds ? "同步中..." : "同步赔率";
}

function renderAuthStatus() {
  const user = state.authSession?.user;
  const name = getCurrentDisplayName();
  els.authStatus.textContent = state.authNotice || (user ? `已进入：${name}` : state.authStatus);
  if (els.pointBalance) {
    els.pointBalance.hidden = !user;
    els.pointBalance.textContent = state.pointSchemaMissing
      ? "点数功能待启用"
      : state.pointBalance === null
        ? "点数加载中..."
        : `可用点数 ${formatPointAmount(state.pointBalance)}`;
  }
  els.usernameInput.hidden = Boolean(user);
  els.passwordInput.hidden = Boolean(user);
  els.loginButton.hidden = Boolean(user);
  els.registerButton.hidden = Boolean(user);
  els.signOutButton.hidden = !user;
  els.signOutButton.disabled = !user || state.isAuthBusy;
  els.loginButton.disabled = Boolean(user) || state.isAuthBusy || !state.supabase;
  els.registerButton.disabled = Boolean(user) || state.isAuthBusy || !state.supabase;
  els.refreshPredictionsButton.disabled = !state.supabase || state.isLoadingPredictions;
  if (els.refreshAdminButton) els.refreshAdminButton.disabled = !state.isAdmin || state.isLoadingAdmin;
  els.loginButton.textContent = state.isAuthBusy ? "处理中..." : "登录";
  els.registerButton.textContent = state.isAuthBusy ? "处理中..." : "注册";
}

function renderPredictionProfilePanel() {
  if (!els.predictionProfilePanel) return;
  const user = state.authSession?.user;
  els.predictionProfilePanel.hidden = !user;
  if (!user) {
    els.predictionProfilePanel.innerHTML = "";
    els.predictionProfilePanel.classList.remove("is-legendary");
    return;
  }

  const championTeam = getChampionTeam(state.predictionProfile.championTeamCode);
  const achievements = state.predictionProfile.achievements;
  const isLegendary = achievements.length === ACHIEVEMENT_DEFINITIONS.length;
  const profileBusy = state.isLoadingPredictions || state.isSavingChampionPick;
  els.predictionProfilePanel.classList.toggle("is-legendary", isLegendary);

  const championMarkup = championTeam
    ? `
      <div class="champion-locked">
        <span class="champion-code">${escapeHtml(championTeam.code)}</span>
        <div>
          <span>我的冠军球队</span>
          <strong>${escapeHtml(championTeam.name)}</strong>
        </div>
        <span class="champion-lock-state">已锁定</span>
      </div>
    `
    : `
      <div class="champion-picker">
        <label for="championTeamSelect">冠军球队</label>
        <select id="championTeamSelect" ${state.predictionProfileSchemaMissing || profileBusy ? "disabled" : ""}>
          <option value="">选择球队</option>
          ${CHAMPION_TEAMS.map((team) => `
            <option value="${escapeHtml(team.code)}" ${team.code === state.championDraftTeamCode ? "selected" : ""}>${escapeHtml(team.name)} · ${escapeHtml(team.code)}</option>
          `).join("")}
        </select>
        <button
          type="button"
          class="action-button primary"
          data-action="select-champion-team"
          ${state.predictionProfileSchemaMissing || profileBusy ? "disabled" : ""}
        >${state.isSavingChampionPick ? "确认中..." : "确认冠军"}</button>
        <span class="champion-warning">确认后不可更改</span>
      </div>
    `;

  els.predictionProfilePanel.innerHTML = `
    <div class="prediction-profile-main">
      ${championMarkup}
      ${state.predictionProfileNotice ? `<div class="prediction-profile-notice">${escapeHtml(state.predictionProfileNotice)}</div>` : ""}
    </div>
    <section class="achievement-profile" aria-label="我的成就">
      <div class="achievement-profile-head">
        <div>
          <span>我的成就</span>
          <strong>${achievements.length}/${ACHIEVEMENT_DEFINITIONS.length}</strong>
        </div>
        <div class="achievement-progress" aria-hidden="true">
          <span style="width:${(achievements.length / ACHIEVEMENT_DEFINITIONS.length) * 100}%"></span>
        </div>
      </div>
      <div class="achievement-catalog">
        ${renderAchievementBadges(achievements, { showLocked: true, showDescription: true })}
      </div>
      ${isLegendary ? `
        <div class="legendary-achievement-banner">
          <span>ALL 10</span>
          <strong>世界杯预言家</strong>
          <span>全成就达成</span>
        </div>
      ` : ""}
    </section>
  `;
}

function renderAchievementBadges(earnedAchievementIds, options = {}) {
  const earned = new Set(normalizeAchievementIds(earnedAchievementIds));
  return ACHIEVEMENT_DEFINITIONS
    .filter((achievement) => options.showLocked || earned.has(achievement.id))
    .map((achievement) => {
      const isEarned = earned.has(achievement.id);
      return `
        <span
          class="achievement-badge achievement-${escapeHtml(achievement.id)} ${isEarned ? "is-earned" : "is-locked"} ${options.showDescription ? "has-description" : ""}"
          title="${escapeHtml(`${achievement.name}：${achievement.description}`)}"
          aria-label="${escapeHtml(`${achievement.name}：${achievement.description}${isEarned ? "，已达成" : "，未达成"}`)}"
        >
          <span class="achievement-mark" aria-hidden="true">${escapeHtml(achievement.mark)}</span>
          <span class="achievement-copy">
            <strong>${escapeHtml(achievement.name)}</strong>
            ${options.showDescription ? `<small>${escapeHtml(achievement.description)}</small>` : ""}
          </span>
        </span>
      `;
    })
    .join("");
}

async function selectChampionTeam() {
  if (!state.supabase || !state.authSession?.user || hasChampionPick() || state.isSavingChampionPick) return;
  if (state.predictionProfileSchemaMissing) {
    state.predictionProfileNotice = "请先重新运行 supabase/schema.sql。";
    renderPredictionProfilePanel();
    return;
  }

  const select = els.predictionProfilePanel?.querySelector("#championTeamSelect");
  const teamCode = normalizeChampionTeamCode(select?.value || state.championDraftTeamCode);
  const team = getChampionTeam(teamCode);
  if (!team) {
    state.predictionProfileNotice = "请选择冠军球队。";
    renderPredictionProfilePanel();
    return;
  }
  if (!window.confirm(`确认选择 ${team.name}（${team.code}）为冠军球队？确认后不能更改。`)) return;

  state.isSavingChampionPick = true;
  state.predictionProfileNotice = "正在锁定冠军球队...";
  renderPredictionProfilePanel();
  const result = await state.supabase.rpc("select_champion_pick", { team_code_value: team.code });
  state.isSavingChampionPick = false;

  if (isAuthExpiredError(result.error)) {
    await expireAuthSession();
    return;
  }
  if (result.error) {
    state.predictionProfileSchemaMissing = isMissingPredictionProfileSchemaError(result.error);
    state.predictionProfileNotice = state.predictionProfileSchemaMissing
      ? "请先重新运行 supabase/schema.sql。"
      : formatPointError(result.error);
    if (/champion pick already locked/i.test(result.error.message || "")) {
      await loadPredictions();
      return;
    }
    renderPredictionProfilePanel();
    return;
  }

  state.predictionProfile.championTeamCode = normalizeChampionTeamCode(result.data) || team.code;
  state.championDraftTeamCode = "";
  state.predictionProfileNotice = `冠军球队已锁定：${team.name}`;
  await loadPredictions();
}

function addMatch() {
  const kickoff = new Date(state.referenceAt.getTime() + 24 * 60 * 60 * 1000);
  const match = {
    id: `manual-${Date.now()}`,
    kickoffUtc: kickoff.toISOString(),
    stage: "First Stage",
    group: "未分组",
    venue: "",
    home: "主队",
    homeAlt: "",
    homeCode: "HOME",
    away: "客队",
    awayAlt: "",
    awayCode: "AWAY",
    lambdaHome: 1.25,
    lambdaAway: 1.05,
    generatedAt: new Date().toISOString(),
    source: "手工录入",
  };
  state.matches = [...state.matches, match];
  state.view = "all";
  state.group = "all";
  state.selectedId = match.id;
  state.notice = "已新增一场比赛，可在下方编辑后保存。";
  persistMatches();
  renderGroupOptions();
  render();
}

function handleDetailAction(event) {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  const match = getSelectedMatch();
  if (!match) return;

  if (action === "save-match") {
    saveSelectedMatch();
  } else if (action === "estimate-odds") {
    estimateSelectedMatchFromOdds();
  } else if (action === "clear-result") {
    clearSelectedResult(match);
  } else if (action === "delete-match") {
    deleteSelectedMatch(match);
  } else if (action === "submit-prediction") {
    submitPrediction(match);
  }
}

function handleAwardAction(event) {
  const button = event.target.closest("[data-action='submit-award-prediction']");
  if (!button) return;
  submitAwardPrediction(button.dataset.awardType);
}

function saveSelectedMatch(overrides = {}) {
  const match = getSelectedMatch();
  const form = els.matchDetail.querySelector("[data-match-editor]");
  if (!match || !form) return false;

  const next = readMatchFromEditor(match, form, overrides);
  if (!next) return false;

  const index = state.matches.findIndex((item) => item.id === match.id);
  if (index < 0) return false;
  state.matches = state.matches.map((item, itemIndex) => (itemIndex === index ? next : item));
  state.selectedId = next.id;
  state.notice = overrides.notice || "比赛数据已保存。";
  persistMatches();
  renderGroupOptions();
  render();
  return true;
}

function estimateSelectedMatchFromOdds() {
  const match = getSelectedMatch();
  const form = els.matchDetail.querySelector("[data-match-editor]");
  if (!match || !form) return;
  const formData = new FormData(form);
  const odds = readOdds(formData);
  if (!odds) {
    state.notice = "请输入有效的十进制主胜、平局、客胜赔率。";
    renderDetail(match);
    return;
  }

  const estimate = estimateLambdasFromOdds(odds.home, odds.draw, odds.away);
  saveSelectedMatch({
    lambdaHome: estimate.lambdaHome,
    lambdaAway: estimate.lambdaAway,
    odds,
    generatedAt: new Date().toISOString(),
    source: "赔率反推模型",
    notice: `已按去水概率估算 xG：${formatNumber(estimate.lambdaHome)} / ${formatNumber(estimate.lambdaAway)}。`,
  });
}

function clearSelectedResult(match) {
  const index = state.matches.findIndex((item) => item.id === match.id);
  if (index < 0) return;
  state.matches = state.matches.map((item, itemIndex) =>
    itemIndex === index ? { ...item, result: undefined } : item,
  );
  state.notice = "赛果已清除。";
  persistMatches();
  render();
}

function deleteSelectedMatch(match) {
  const confirmed = window.confirm(`删除 ${match.home} vs ${match.away}？`);
  if (!confirmed) return;
  state.matches = state.matches.filter((item) => item.id !== match.id);
  state.selectedId = null;
  state.notice = "比赛已删除。";
  persistMatches();
  renderGroupOptions();
  render();
}

async function syncWorldCupSchedule(options = {}) {
  const silent = options?.silent === true;
  const preserveView = options?.preserveView === true;
  state.isSyncingSchedule = true;
  if (!silent) state.notice = "";
  state.liveMeta.lastError = "";
  if (!silent) renderLiveStatus();

  try {
    const scheduleData = await fetchScheduleData();
    const liveMatches = scheduleData.matches;

    const summary = replaceScheduleMatches(liveMatches, { preserveModel: true });
    const syncedAt = new Date().toISOString();
    state.liveMeta = {
      ...state.liveMeta,
      scheduleSyncedAt: syncedAt,
      scheduleSource: scheduleData.source,
      scheduleFormatVersion: LIVE_SCHEDULE_FORMAT_VERSION,
      lastError: "",
      lastScheduleCount: liveMatches.length,
    };
    if (!silent) state.notice = `赛程/比分同步完成：新增 ${summary.added} 场，更新 ${summary.updated} 场。`;
    if (!preserveView) state.view = "all";
    persistLiveMeta();
    persistMatches();
    renderGroupOptions();
    await loadPolymarketOddsCache({ silent: true });
  } catch (error) {
    const message = getErrorMessage(error);
    state.liveMeta = { ...state.liveMeta, lastError: `赛程同步失败：${message}` };
    if (!silent) state.notice = `赛程同步失败：${message}`;
    persistLiveMeta();
  } finally {
    state.isSyncingSchedule = false;
    render();
    schedulePendingResultRetry();
  }
}

async function fetchScheduleData() {
  const sources = [
    { url: SCHEDULE_CACHE_URL, label: "published schedule cache" },
    { url: WORLDCUP26_GAMES_URL, label: WORLDCUP26_GAMES_URL },
  ];
  const errors = [];
  let fallback = null;

  for (const source of sources) {
    try {
      const payload = await fetchJson(source.url, { cacheBust: true });
      const matches = normalizeWorldCup26Payload(payload);
      if (!matches.length) throw new Error("没有返回可识别的比赛数据");
      const data = { matches, source: source.label };
      if (!matches.some(isPastUnresolvedMatch) || source.url === WORLDCUP26_GAMES_URL) return data;
      fallback = fallback || data;
    } catch (error) {
      errors.push(`${source.label}: ${getErrorMessage(error)}`);
    }
  }

  if (fallback) return fallback;
  throw new Error(errors.join("；") || "没有可用的赛程数据源");
}

async function loadPolymarketOddsCache(options = {}) {
  const silent = options?.silent === true;
  try {
    const payload = await fetchJson(POLYMARKET_ODDS_CACHE_URL, { cacheBust: true });
    const summary = mergePolymarketOddsCache(payload);
    if (!summary.updated) return summary;

    state.liveMeta = {
      ...state.liveMeta,
      polymarketOddsSyncedAt: payload.generatedAt || new Date().toISOString(),
      polymarketOddsCount: summary.updated,
    };
    persistLiveMeta();
    persistMatches();
    renderGroupOptions();
    render();
    return summary;
  } catch (error) {
    if (!silent) {
      state.notice = `Polymarket odds sync failed: ${getErrorMessage(error)}`;
      render();
    }
    return { total: 0, updated: 0, error };
  }
}

function mergePolymarketOddsCache(payload) {
  const items = (Array.isArray(payload?.matches) ? payload.matches : [])
    .map(normalizePolymarketCacheMatch)
    .filter(Boolean);
  state.polymarketSettledResults = new Map(
    (Array.isArray(payload?.settledResults) ? payload.settledResults : [])
      .map(normalizePolymarketSettledResult)
      .filter(Boolean)
      .map((result) => [result.matchId, result]),
  );
  let updated = 0;

  items.forEach((item) => {
    const index = findPolymarketMatchIndex(item);
    if (index < 0) return;
    state.matches[index] = applyPolymarketOdds(state.matches[index], item);
    updated += 1;
  });

  if (updated) state.matches = state.matches.sort(sortAscending);
  return { total: items.length, updated };
}

function normalizePolymarketSettledResult(raw) {
  if (!raw || raw.resolutionVerified !== true) return null;
  const matchId = cleanText(raw.matchId || raw.match_id);
  const homeScore = Number(raw.homeScore ?? raw.home_score);
  const awayScore = Number(raw.awayScore ?? raw.away_score);
  if (!matchId || !Number.isInteger(homeScore) || homeScore < 0 || !Number.isInteger(awayScore) || awayScore < 0) {
    return null;
  }
  return { matchId, homeScore, awayScore };
}

function normalizePolymarketCacheMatch(raw) {
  if (!raw || typeof raw !== "object") return null;
  const kickoff = new Date(raw.kickoffUtc || raw.startTime || raw.start_time || "");
  const wdl = normalizePolymarketWdl(raw.wdl);
  const exactScore = normalizePolymarketExactScore(raw.exactScore || raw.exact_score);
  if (!wdl && !exactScore) return null;
  return {
    matchId: cleanText(raw.matchId || raw.match_id),
    kickoffUtc: Number.isNaN(kickoff.getTime()) ? "" : kickoff.toISOString(),
    homeAlt: cleanText(raw.homeAlt || raw.home || raw.homeTeam),
    awayAlt: cleanText(raw.awayAlt || raw.away || raw.awayTeam),
    homeCode: cleanText(raw.homeCode || raw.home_code),
    awayCode: cleanText(raw.awayCode || raw.away_code),
    matchedBy: cleanText(raw.matchedBy),
    wdl,
    exactScore,
  };
}

function normalizePolymarketWdl(raw) {
  if (!raw || typeof raw !== "object") return null;
  const homeWin = Number(raw.homeWin ?? raw.home);
  const draw = Number(raw.draw);
  const awayWin = Number(raw.awayWin ?? raw.away);
  const total = homeWin + draw + awayWin;
  if (![homeWin, draw, awayWin, total].every(Number.isFinite) || total <= 0) return null;
  return {
    homeWin: clampProbability(homeWin / total),
    draw: clampProbability(draw / total),
    awayWin: clampProbability(awayWin / total),
    raw: raw.raw || null,
    eventSlug: cleanText(raw.eventSlug || raw.event_slug),
    updatedAt: cleanText(raw.updatedAt || raw.updated_at),
  };
}

function normalizePolymarketExactScore(raw) {
  if (!raw || typeof raw !== "object") return null;
  const scores = (Array.isArray(raw.scores) ? raw.scores : [])
    .map((item) => ({
      home: Number(item.home),
      away: Number(item.away),
      probability: Number(item.probability),
      rawProbability: Number(item.rawProbability ?? item.raw_probability ?? item.probability),
      marketSlug: cleanText(item.marketSlug || item.market_slug),
    }))
    .filter(
      (item) =>
        Number.isInteger(item.home) &&
        Number.isInteger(item.away) &&
        item.home >= 0 &&
        item.away >= 0 &&
        Number.isFinite(item.probability) &&
        item.probability > 0,
    );
  const otherProbability = Number(raw.otherProbability ?? raw.other_probability ?? 0);
  const other = Number.isFinite(otherProbability) ? otherProbability : 0;
  const total = scores.reduce((sum, item) => sum + item.probability, 0) + other;
  if (!scores.length || !Number.isFinite(total) || total <= 0) return null;
  return {
    scores: scores.map((item) => ({
      ...item,
      probability: clampProbability(item.probability / total),
    })),
    otherProbability: clampProbability(other / total),
    eventSlug: cleanText(raw.eventSlug || raw.event_slug),
    updatedAt: cleanText(raw.updatedAt || raw.updated_at),
  };
}

function findPolymarketMatchIndex(item) {
  if (item.matchId) {
    const byId = state.matches.findIndex((match) => match.id === item.matchId);
    if (byId >= 0) return byId;
  }

  const homeKey = normalizeTeamKey(item.homeAlt, item.homeAlt, item.homeCode);
  const awayKey = normalizeTeamKey(item.awayAlt, item.awayAlt, item.awayCode);
  const kickoffMs = new Date(item.kickoffUtc || 0).getTime();
  if (homeKey && awayKey) {
    const byTeams = state.matches.findIndex((match) => {
      const sameTeams =
        normalizeTeamKey(match.home, match.homeAlt, match.homeCode) === homeKey &&
        normalizeTeamKey(match.away, match.awayAlt, match.awayCode) === awayKey;
      if (!sameTeams) return false;
      const matchMs = new Date(match.kickoffUtc).getTime();
      return !Number.isFinite(kickoffMs) || !Number.isFinite(matchMs) || Math.abs(matchMs - kickoffMs) <= 18 * 60 * 60 * 1000;
    });
    if (byTeams >= 0) return byTeams;
  }

  if (!Number.isFinite(kickoffMs)) return -1;
  const timeMatches = state.matches
    .map((match, index) => ({ match, index, delta: Math.abs(new Date(match.kickoffUtc).getTime() - kickoffMs) }))
    .filter((item) => Number.isFinite(item.delta) && item.delta <= 15 * 60 * 1000);
  if (timeMatches.length === 1 && hasPlaceholderTeam(timeMatches[0].match)) return timeMatches[0].index;
  return -1;
}

function applyPolymarketOdds(match, item) {
  const next = {
    ...match,
    polymarket: {
      wdl: item.wdl,
      exactScore: item.exactScore,
      matchedBy: item.matchedBy,
      kickoffUtc: item.kickoffUtc,
    },
    source: joinSources(match.source, "Polymarket"),
  };

  if (hasPlaceholderTeam(match) && item.homeAlt && item.awayAlt) {
    next.home = localizeTeamName(item.homeAlt);
    next.homeAlt = item.homeAlt;
    next.homeCode = item.homeCode || codeFromName(item.homeAlt);
    next.away = localizeTeamName(item.awayAlt);
    next.awayAlt = item.awayAlt;
    next.awayCode = item.awayCode || codeFromName(item.awayAlt);
  }

  if (item.wdl) {
    const estimate = estimateLambdasFromProbabilities(item.wdl.homeWin, item.wdl.draw, item.wdl.awayWin);
    next.lambdaHome = estimate.lambdaHome;
    next.lambdaAway = estimate.lambdaAway;
  }

  return next;
}

function hasPlaceholderTeam(match) {
  const text = `${match.home} ${match.away} ${match.homeAlt} ${match.awayAlt}`.toLowerCase();
  return /winner|runner-up|3rd group|loser|match \d+|tbd|to be decided/.test(text);
}

async function maybeAutoSyncSchedule() {
  if (state.isSyncingSchedule) return;
  const lastSync = new Date(state.liveMeta.scheduleSyncedAt || 0).getTime();
  const hasRecentSync = Number.isFinite(lastSync) && Date.now() - lastSync <= AUTO_SCHEDULE_SYNC_MAX_AGE_MS;
  const hasLikelyFullSchedule = state.matches.length >= MIN_LIVE_SCHEDULE_MATCHES;
  const hasLiveFinishedMatches = state.matches.some(isFinishedMatch);
  const hasCurrentFormat = state.liveMeta.scheduleFormatVersion === LIVE_SCHEDULE_FORMAT_VERSION;
  const hasPastUnresolvedMatches = state.matches.some(isPastUnresolvedMatch);
  if (hasRecentSync && hasLikelyFullSchedule && hasLiveFinishedMatches && hasCurrentFormat && !hasPastUnresolvedMatches) return;
  await syncWorldCupSchedule({ silent: true, preserveView: true });
}

function schedulePendingResultRetry() {
  if (state.scheduleRetryTimer) {
    window.clearTimeout(state.scheduleRetryTimer);
    state.scheduleRetryTimer = null;
  }
  if (!state.matches.some(isPastUnresolvedMatch)) return;
  state.scheduleRetryTimer = window.setTimeout(() => {
    state.scheduleRetryTimer = null;
    maybeAutoSyncSchedule();
  }, PENDING_RESULT_RETRY_MS);
}

function applyOfficialScheduleSnapshotIfNeeded() {
  const hasCurrentFormat = state.liveMeta.scheduleFormatVersion === LIVE_SCHEDULE_FORMAT_VERSION;
  const hasOfficialSchedule = state.matches.some((match) => String(match.id || "").startsWith("worldcup26-"));
  const hasOldSeedSchedule = state.matches.some((match) => SEED_MATCH_IDS.has(String(match.id || "")));
  const hasAwardScorerData = state.matches.some(
    (match) => normalizeStoredScorers(match.homeScorers).length || normalizeStoredScorers(match.awayScorers).length,
  );
  if (hasCurrentFormat && hasOfficialSchedule && !hasOldSeedSchedule && hasAwardScorerData) return;
  if (hasOfficialSchedule && !hasOldSeedSchedule) {
    if (!hasAwardScorerData) return;
    state.liveMeta = {
      ...state.liveMeta,
      scheduleFormatVersion: LIVE_SCHEDULE_FORMAT_VERSION,
    };
    persistLiveMeta();
    return;
  }

  const snapshotMatches = normalizeWorldCup26Payload(OFFICIAL_UPCOMING_SNAPSHOT);
  if (!snapshotMatches.length) return;
  replaceScheduleMatches(snapshotMatches, { preserveModel: true });
  state.liveMeta = {
    ...state.liveMeta,
    scheduleFormatVersion: "bundled WorldCup26 schedule snapshot",
    scheduleSource: "bundled WorldCup26 schedule snapshot",
    lastScheduleCount: snapshotMatches.length,
  };
  persistLiveMeta();
  persistMatches();
}

async function syncOdds() {
  const apiKey = els.oddsApiKeyInput.value.trim();
  const sportKey = els.oddsSportKeyInput.value.trim() || "soccer_fifa_world_cup";
  const region = els.oddsRegionSelect.value || "us";
  if (!apiKey) {
    state.notice = "请先输入 The Odds API key。";
    render();
    return;
  }

  localStorage.setItem(ODDS_API_KEY_STORAGE, apiKey);
  localStorage.setItem(ODDS_SPORT_KEY_STORAGE, sportKey);
  localStorage.setItem(ODDS_REGION_STORAGE, region);

  state.isSyncingOdds = true;
  state.notice = "";
  state.liveMeta.lastError = "";
  renderLiveStatus();

  try {
    const url = buildOddsUrl(apiKey, sportKey, region);
    const events = await fetchJson(url);
    if (!Array.isArray(events)) throw new Error("赔率接口返回格式不是数组");

    const oddsMatches = events.map(normalizeOddsEvent).filter(Boolean);
    if (!oddsMatches.length) throw new Error("没有找到带 1X2 赔率的世界杯比赛");

    const summary = mergeMatches(oddsMatches, { preserveModel: false });
    const syncedAt = new Date().toISOString();
    state.liveMeta = {
      ...state.liveMeta,
      oddsSyncedAt: syncedAt,
      oddsSource: `${THE_ODDS_API_BASE}/sports/${sportKey}/odds`,
      lastError: "",
      lastOddsCount: oddsMatches.length,
    };
    state.notice = `赔率同步完成：新增 ${summary.added} 场，更新 ${summary.updated} 场。`;
    persistLiveMeta();
    persistMatches();
    renderGroupOptions();
  } catch (error) {
    const message = getErrorMessage(error);
    state.liveMeta = { ...state.liveMeta, lastError: `赔率同步失败：${message}` };
    state.notice = `赔率同步失败：${message}`;
    persistLiveMeta();
  } finally {
    state.isSyncingOdds = false;
    render();
  }
}

async function connectSupabase() {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey) {
    state.authStatus = "未连接 Supabase";
    state.authNotice = "站点缺少 Supabase 配置。";
    render();
    return;
  }

  try {
    state.isAuthBusy = true;
    state.authNotice = "正在连接 Supabase...";
    renderAuthStatus();
    state.supabase = createSupabaseRestClient(url, anonKey);
    localStorage.setItem(SUPABASE_URL_STORAGE, url);
    localStorage.setItem(SUPABASE_ANON_KEY_STORAGE, anonKey);

    const { data, error } = await state.supabase.auth.getSession();
    if (error) throw error;
    const hasActiveSession = setAuthSession(data.session);
    if (hasActiveSession) await saveUserProfile();
    state.authStatus = hasActiveSession ? `已进入：${getCurrentDisplayName()}` : "Supabase 已连接";
    state.authNotice = data.expired ? "登录已过期，请重新登录。" : "";

    if (state.authSubscription) state.authSubscription.unsubscribe();
    const { data: listener } = state.supabase.auth.onAuthStateChange((event, session) => {
      const active = setAuthSession(session);
      state.authStatus = active ? `已进入：${getCurrentDisplayName()}` : "Supabase 已连接";
      state.authNotice = event === "TOKEN_EXPIRED" ? "登录已过期，请重新登录。" : "";
      if (!active) {
        state.myPredictions = [];
        state.publicPredictions = [];
        state.myAwardPredictions = [];
        state.awardPredictions = [];
        resetPredictionProfile();
        resetAdminState();
      }
      loadPredictions();
    });
    state.authSubscription = listener.subscription;
    await loadPredictions();
  } catch (error) {
    state.supabase = null;
    state.authSession = null;
    state.authStatus = "Supabase 连接失败";
    state.authNotice = getErrorMessage(error);
    render();
  } finally {
    state.isAuthBusy = false;
    render();
  }
}

async function registerWithUsername() {
  if (!state.supabase) await connectSupabase();
  if (!state.supabase) return;
  const credentials = readUsernamePassword();
  if (!credentials) {
    render();
    return;
  }
  localStorage.setItem(USERNAME_STORAGE, credentials.username);
  state.isAuthBusy = true;
  state.authNotice = "正在注册...";
  renderAuthStatus();
  const { data, error } = await state.supabase.auth.signUp({
    email: usernameToInternalEmail(credentials.username),
    password: credentials.password,
    data: { display_name: credentials.username, username: credentials.username },
  });
  state.isAuthBusy = false;
  if (error) {
    state.authNotice = error.message;
  } else {
    const active = setAuthSession(data.session);
    if (active) await saveUserProfile(credentials.username);
    state.authNotice = active
      ? `注册成功：${credentials.username}`
      : "注册成功，但 Supabase 仍要求确认账号。请在 Auth 设置里关闭邮箱确认。";
  }
  await loadPredictions();
}

async function loginWithUsername() {
  if (!state.supabase) await connectSupabase();
  if (!state.supabase) return;
  const credentials = readUsernamePassword();
  if (!credentials) {
    render();
    return;
  }
  localStorage.setItem(USERNAME_STORAGE, credentials.username);
  state.isAuthBusy = true;
  state.authNotice = "正在登录...";
  renderAuthStatus();
  const { data, error } = await state.supabase.auth.signInWithPassword({
    email: usernameToInternalEmail(credentials.username),
    password: credentials.password,
  });
  state.isAuthBusy = false;
  if (error) {
    state.authNotice = error.message;
  } else {
    const active = setAuthSession(data.session);
    if (active) await saveUserProfile(credentials.username);
    state.authNotice = `登录成功：${getCurrentDisplayName()}`;
  }
  await loadPredictions();
}

async function signOut() {
  if (!state.supabase) return;
  state.isAuthBusy = true;
  state.authNotice = "正在退出...";
  renderAuthStatus();
  const { error } = await state.supabase.auth.signOut();
  state.isAuthBusy = false;
  if (error) state.authNotice = error.message;
  setAuthSession(null);
  state.myPredictions = [];
  state.publicPredictions = [];
  state.myAwardPredictions = [];
  state.awardPredictions = [];
  resetPredictionProfile();
  resetAdminState();
  state.authNotice = error ? state.authNotice : "已退出。";
  await loadPredictions();
}

function setAuthSession(session) {
  clearAuthExpiryTimer();
  if (session && isSessionExpired(session)) {
    state.authSession = null;
    state.pointBalance = null;
    return false;
  }
  state.authSession = session || null;
  if (!state.authSession) {
    state.pointBalance = null;
    state.pointSchemaMissing = false;
    state.comboPredictionNotice = "";
    state.comboSchemaMissing = false;
    resetPredictionProfile();
  }
  if (state.authSession) scheduleAuthExpiry(state.authSession);
  return Boolean(state.authSession);
}

function scheduleAuthExpiry(session) {
  const expiresAt = Number(session?.expires_at);
  if (!Number.isFinite(expiresAt) || expiresAt <= 0) return;
  const expireDelayMs = expiresAt * 1000 - Date.now();
  if (expireDelayMs <= 0) {
    refreshAuthSession();
    return;
  }
  const shouldRefresh = Boolean(session.refresh_token);
  const delayMs = shouldRefresh ? Math.max(0, expireDelayMs - AUTH_REFRESH_MARGIN_MS) : expireDelayMs;
  state.authExpiryTimer = setTimeout(() => {
    if (shouldRefresh) refreshAuthSession();
    else expireAuthSession();
  }, Math.min(delayMs, 2147483647));
}

function clearAuthExpiryTimer() {
  if (!state.authExpiryTimer) return;
  clearTimeout(state.authExpiryTimer);
  state.authExpiryTimer = null;
}

async function expireAuthSession(message = "登录已过期，请重新登录。") {
  clearAuthExpiryTimer();
  if (state.supabase?.auth?.clearSession) {
    await state.supabase.auth.clearSession("TOKEN_EXPIRED");
  }
  state.authSession = null;
  state.pointBalance = null;
  state.pointSchemaMissing = false;
  state.comboSchemaMissing = false;
  state.myPredictions = [];
  state.publicPredictions = [];
  state.myAwardPredictions = [];
  state.awardPredictions = [];
  resetPredictionProfile();
  resetAdminState();
  state.isAuthBusy = false;
  state.authStatus = state.supabase ? "Supabase 已连接" : state.authStatus;
  state.authNotice = message;
  state.predictionNotice = "";
  state.comboPredictionNotice = "";
  render();
}

async function refreshAuthSession() {
  if (!state.supabase?.auth?.refreshSession) {
    await expireAuthSession();
    return false;
  }
  if (!state.authSession?.refresh_token) {
    await expireAuthSession();
    return false;
  }
  if (state.authRefreshPromise) return state.authRefreshPromise;

  clearAuthExpiryTimer();
  state.authRefreshPromise = (async () => {
    const { data, error } = await state.supabase.auth.refreshSession(state.authSession);
    if (error || !data?.session) {
      await expireAuthSession(error?.message || "登录已过期，请重新登录。");
      return false;
    }
    setAuthSession(data.session);
    state.authStatus = `已进入：${getCurrentDisplayName()}`;
    state.authNotice = "";
    renderAuthStatus();
    return true;
  })();

  try {
    return await state.authRefreshPromise;
  } finally {
    state.authRefreshPromise = null;
  }
}

function isSessionExpired(session) {
  const expiresAt = Number(session?.expires_at);
  return Number.isFinite(expiresAt) && expiresAt > 0 && expiresAt * 1000 <= Date.now();
}

function isAuthExpiredError(error) {
  return /jwt.*expired|expired.*jwt|invalid.*jwt|token.*expired|session.*expired|PGRST301/i.test(
    `${error?.message || ""} ${error?.details || ""} ${error?.hint || ""}`,
  );
}

async function submitPrediction(match) {
  if (!state.supabase || !state.authSession?.user) {
    state.predictionNotice = "请先登录后再提交预测。";
    render();
    return;
  }
  if (isSessionExpired(state.authSession)) {
    const refreshed = await refreshAuthSession();
    if (!refreshed) return;
  }
  if (!hasChampionPick()) {
    state.predictionNotice = "请先确认冠军球队。";
    render();
    return;
  }
  if (!isMatchPredictable(match)) {
    state.predictionNotice = "只能预测未开赛的比赛。";
    render();
    return;
  }

  const form = els.matchDetail.querySelector("[data-prediction-form]");
  if (!form) return;
  const payload = buildPredictionPayload(match, new FormData(form));
  if (!payload) {
    render();
    return;
  }

  state.predictionNotice = "正在保存预测...";
  renderDetail(match);
  await saveUserProfile(payload.display_name);
  const result = await state.supabase.rpc("submit_prediction", { prediction_payload: payload });
  const { error } = result;

  if (isAuthExpiredError(error)) {
    await expireAuthSession();
    return;
  }
  if (error) {
    state.pointSchemaMissing = isMissingPointSchemaError(error);
    state.predictionNotice = state.pointSchemaMissing
      ? "请先重新运行 supabase/schema.sql，启用点数功能后再提交预测。"
      : `预测提交失败：${formatPointError(error)}`;
    render();
    return;
  }
  const saved = result.data?.prediction || {};
  state.pointBalance = Number(result.data?.balance ?? state.pointBalance);
  state.pointSchemaMissing = false;
  const payout = Number(saved.payout_points) || payload.stake_points / Number(saved.model_probability || payload.model_probability);
  state.predictionNotice = `预测已保存，投入 ${formatPointAmount(payload.stake_points)}；命中返还 ${formatPointAmount(payout)}。`;
  await loadPredictions();
}

async function submitComboPrediction() {
  if (state.isSubmittingCombo) return;
  if (!state.supabase || !state.authSession?.user) {
    setComboPredictionNotice("请先登录后再提交组合预测。");
    return;
  }
  if (isSessionExpired(state.authSession)) {
    const refreshed = await refreshAuthSession();
    if (!refreshed) return;
  }
  if (!hasChampionPick()) {
    setComboPredictionNotice("请先确认冠军球队。");
    return;
  }

  const form = els.comboPredictionPanel?.querySelector("[data-combo-form]");
  if (!form) return;
  syncComboPredictionDraft(form);
  const selections = readComboSelections(form);
  if (selections.length < COMBO_MIN_LEGS || selections.length > COMBO_MAX_LEGS) {
    setComboPredictionNotice(`请选择 ${COMBO_MIN_LEGS}-${COMBO_MAX_LEGS} 场比赛。`);
    return;
  }

  const stakePoints = roundPointAmount(new FormData(form).get("comboStakePoints"));
  if (!Number.isFinite(stakePoints) || stakePoints < 1) {
    setComboPredictionNotice("本次投入点数至少为 1。");
    return;
  }
  if (!Number.isFinite(state.pointBalance) || stakePoints > state.pointBalance) {
    setComboPredictionNotice("可用点数不足，请减少本次投入或联系管理员分配点数。");
    return;
  }

  const payload = {
    display_name: getCurrentDisplayName(),
    stake_points: stakePoints,
    legs: selections.map((selection) => ({
      match_id: selection.match.id,
      outcome: selection.outcome,
    })),
  };
  state.isSubmittingCombo = true;
  const submitButton = form.querySelector("[data-action='submit-combo-prediction']");
  if (submitButton) submitButton.disabled = true;
  setComboPredictionNotice("正在保存组合预测...");
  try {
    await saveUserProfile(payload.display_name);

    const result = await state.supabase.rpc("submit_combo_prediction", { combo_payload: payload });
    if (isAuthExpiredError(result.error)) {
      await expireAuthSession();
      return;
    }
    if (result.error) {
      state.comboSchemaMissing = isMissingComboPredictionSchemaError(result.error);
      state.comboPredictionNotice = state.comboSchemaMissing
        ? "请先重新运行 supabase/schema.sql，启用组合预测后再提交。"
        : `组合预测提交失败：${formatPointError(result.error)}`;
      return;
    }

    const saved = result.data?.prediction || {};
    const probability = Number(saved.model_probability);
    state.pointBalance = Number(result.data?.balance ?? state.pointBalance);
    state.pointSchemaMissing = false;
    state.comboSchemaMissing = false;
    state.comboPredictionNotice = `组合预测已保存，投入 ${formatPointAmount(stakePoints)}；全中返还 ${formatPointAmount(stakePoints / probability)}。`;
    resetComboPredictionDraft();
    state.isSubmittingCombo = false;
    await loadPredictions();
  } catch (error) {
    state.comboPredictionNotice = `组合预测提交失败：${getErrorMessage(error)}`;
  } finally {
    state.isSubmittingCombo = false;
    if (state.authSession?.user) {
      if (state.comboSchemaMissing) renderComboPredictionPanel();
      else updateComboPredictionPreview();
    }
  }
}

function readComboSelections(form) {
  if (!form) return [];
  return [...form.querySelectorAll("[data-combo-row]")]
    .filter((row) => row.querySelector("[data-combo-match]")?.checked)
    .map((row) => ({
      match: state.matches.find((match) => match.id === row.dataset.comboMatchId),
      outcome: cleanText(row.querySelector("[data-combo-outcome]")?.value),
    }))
    .filter((selection) => selection.match && ["home", "draw", "away"].includes(selection.outcome));
}

function handleComboPredictionChange(event) {
  const form = event.target.closest("[data-combo-form]");
  if (!form) return;
  let notice = "";
  if (event.target.matches("[data-combo-match]")) {
    const selectedCount = form.querySelectorAll("[data-combo-match]:checked").length;
    if (selectedCount > COMBO_MAX_LEGS) {
      event.target.checked = false;
      notice = `最多选择 ${COMBO_MAX_LEGS} 场比赛。`;
    }
    const row = event.target.closest("[data-combo-row]");
    const outcomeSelect = row?.querySelector("[data-combo-outcome]");
    if (outcomeSelect) outcomeSelect.disabled = !event.target.checked;
  }
  syncComboPredictionDraft(form);
  setComboPredictionNotice(notice);
  updateComboPredictionPreview();
}

function handleComboPredictionInput(event) {
  const form = event.target.closest("[data-combo-form]");
  if (!form) return;
  syncComboPredictionDraft(form);
  updateComboPredictionPreview();
}

function syncComboPredictionDraft(form) {
  const stakeInput = form?.elements?.comboStakePoints;
  const selections = {};
  for (const row of form?.querySelectorAll("[data-combo-row]") || []) {
    if (!row.querySelector("[data-combo-match]")?.checked) continue;
    const matchId = cleanText(row.dataset.comboMatchId);
    const outcome = cleanText(row.querySelector("[data-combo-outcome]")?.value);
    if (matchId && ["home", "draw", "away"].includes(outcome)) selections[matchId] = outcome;
  }
  state.comboDraft = {
    stakePoints: stakeInput ? stakeInput.value : state.comboDraft.stakePoints,
    selections,
  };
}

function resetComboPredictionDraft() {
  state.comboDraft = { stakePoints: null, selections: {} };
}

function updateComboPredictionPreview() {
  const form = els.comboPredictionPanel?.querySelector("[data-combo-form]");
  const preview = form?.querySelector("[data-combo-preview]");
  const submitButton = form?.querySelector("[data-action='submit-combo-prediction']");
  if (!form || !preview || !submitButton) return;

  const selections = readComboSelections(form);
  const stakePoints = roundPointAmount(new FormData(form).get("comboStakePoints"));
  const combinedProbability = selections.reduce((product, selection) => {
    const probability = getOutcomeProbabilitySnapshot(selection.match, selection.outcome).model_probability;
    return product * Number(probability || 0);
  }, 1);
  const baseDisabled = form.dataset.comboDisabled === "true";
  const valid =
    !baseDisabled &&
    selections.length >= COMBO_MIN_LEGS &&
    selections.length <= COMBO_MAX_LEGS &&
    Number.isFinite(stakePoints) &&
    stakePoints >= 1 &&
    stakePoints <= Number(state.pointBalance) &&
    combinedProbability > 0;

  submitButton.disabled = state.isSubmittingCombo || !valid;
  if (selections.length < COMBO_MIN_LEGS) {
    preview.textContent = `已选择 ${selections.length} 场`;
    return;
  }
  if (!Number.isFinite(stakePoints) || stakePoints < 1) {
    preview.textContent = "本次投入点数至少为 1";
    return;
  }
  if (stakePoints > Number(state.pointBalance)) {
    preview.textContent = "可用点数不足";
    return;
  }
  const multiplier = 1 / combinedProbability;
  preview.textContent = `组合概率 ${formatPercent(combinedProbability)} · ${formatComboMultiplier(multiplier)} 倍 · 全中预计返还 ${formatPointAmount(stakePoints * multiplier)}`;
}

function setComboPredictionNotice(message) {
  state.comboPredictionNotice = message;
  const notice = els.comboPredictionPanel?.querySelector("[data-combo-notice]");
  if (notice) {
    notice.hidden = !message;
    notice.textContent = message;
  }
}

function formatComboMultiplier(value) {
  const multiplier = Number(value);
  if (!Number.isFinite(multiplier)) return "0";
  if (multiplier >= 100) return multiplier.toFixed(0);
  if (multiplier >= 10) return multiplier.toFixed(1);
  return multiplier.toFixed(2);
}

async function submitAwardPrediction(awardType) {
  if (!state.supabase || !state.authSession?.user) {
    state.awardPredictionNotice = "请先登录后再提交奖项预测。";
    renderAwards();
    return;
  }
  if (!AWARD_TYPES.includes(awardType)) return;

  const form = els.awardsPanel?.querySelector(`[data-award-form="${awardType}"]`);
  if (!form) return;

  const formData = new FormData(form);
  const candidateName = cleanText(formData.get("candidateName"));
  if (!candidateName) {
    state.awardPredictionNotice = "请选择有效的奖项候选人。";
    renderAwards();
    return;
  }

  const awards = computeAwardProbabilities();
  const award = awards.find((item) => item.type === awardType);
  const candidate = award?.candidates.find((item) => item.name === candidateName);
  const payload = {
    user_id: state.authSession.user.id,
    award_type: awardType,
    display_name: getCurrentDisplayName(),
    candidate_name: candidateName,
    candidate_team: candidate?.team || "",
    model_probability: candidate ? normalizeStoredProbability(candidate.probability) : null,
    model_snapshot_at: new Date().toISOString(),
    is_public: true,
  };

  state.awardPredictionNotice = `正在保存${AWARD_LABELS[awardType]}预测...`;
  renderAwards();
  await saveUserProfile(payload.display_name);

  const { error } = await state.supabase
    .from("award_predictions")
    .upsert(payload, { onConflict: "user_id,award_type" });

  if (isAuthExpiredError(error)) {
    await expireAuthSession();
    return;
  }
  if (error) {
    state.awardSchemaMissing = isMissingAwardPredictionSchemaError(error);
    state.awardPredictionNotice = state.awardSchemaMissing
      ? "请重新运行 supabase/schema.sql 后启用奖项预测。"
      : `奖项预测提交失败：${error.message}`;
    renderAwards();
    return;
  }

  state.awardSchemaMissing = false;
  state.awardPredictionNotice = `${AWARD_LABELS[awardType]}预测已保存。`;
  await loadPredictions();
}

function buildPredictionPayload(match, formData) {
  const predictionType = cleanText(formData.get("predictionType"));
  const stakePoints = roundPointAmount(formData.get("stakePoints"));
  if (!Number.isFinite(stakePoints) || stakePoints < 1) {
    state.predictionNotice = "本次投入点数至少为 1。";
    return null;
  }
  const existing = state.myPredictions.find((prediction) => prediction.match_id === match.id);
  const existingStake = existing?.settled_at ? 0 : Number(existing?.stake_points || 0);
  const allocatablePoints = Number(state.pointBalance || 0) + existingStake;
  if (!Number.isFinite(state.pointBalance) || stakePoints > allocatablePoints) {
    state.predictionNotice = "可用点数不足，请减少本次投入或联系管理员分配点数。";
    return null;
  }
  const base = {
    user_id: state.authSession.user.id,
    match_id: match.id,
    match_kickoff_utc: new Date(match.kickoffUtc).toISOString(),
    match_label: `${match.home} vs ${match.away}`,
    home_team: match.home,
    away_team: match.away,
    display_name: getCurrentDisplayName(),
    prediction_type: predictionType,
    stake_points: stakePoints,
    is_public: true,
    model_snapshot_at: new Date().toISOString(),
  };

  if (predictionType === "outcome") {
    const outcome = cleanText(formData.get("outcome"));
    if (!["home", "draw", "away"].includes(outcome)) {
      state.predictionNotice = "请选择有效的胜平负预测。";
      return null;
    }
    return {
      ...base,
      outcome,
      home_score: null,
      away_score: null,
      ...getOutcomeProbabilitySnapshot(match, outcome),
    };
  }

  if (predictionType === "score") {
    const homeScore = Number(formData.get("predictedHomeScore"));
    const awayScore = Number(formData.get("predictedAwayScore"));
    if (!Number.isInteger(homeScore) || !Number.isInteger(awayScore) || homeScore < 0 || awayScore < 0) {
      state.predictionNotice = "请输入有效的比分预测。";
      return null;
    }
    return {
      ...base,
      outcome: null,
      home_score: homeScore,
      away_score: awayScore,
      model_probability: normalizeStoredProbability(scoreProbability(match, homeScore, awayScore)),
      model_probability_label: `${homeScore}-${awayScore}`,
    };
  }

  state.predictionNotice = "请选择预测类型。";
  return null;
}

function getOutcomeProbabilitySnapshot(match, outcome) {
  const probability = computeProbability(match);
  const outcomeMap = {
    home: {
      model_probability: probability.homeWin,
      model_probability_label: `${match.home} 胜`,
    },
    draw: {
      model_probability: probability.draw,
      model_probability_label: "平局",
    },
    away: {
      model_probability: probability.awayWin,
      model_probability_label: `${match.away} 胜`,
    },
  };
  const snapshot = outcomeMap[outcome] || {};
  return {
    model_probability: normalizeStoredProbability(snapshot.model_probability),
    model_probability_label: snapshot.model_probability_label || "",
  };
}

function normalizeStoredProbability(value) {
  if (value === null || value === undefined || value === "") return null;
  const probability = Number(value);
  if (!Number.isFinite(probability)) return null;
  return Math.min(1, Math.max(0, probability));
}

function stripPredictionProbabilitySnapshot(payload) {
  const { model_probability, model_probability_label, model_snapshot_at, ...legacyPayload } = payload;
  return legacyPayload;
}

function isPredictionProbabilitySchemaError(error) {
  const text = `${error?.message || ""} ${error?.details || ""} ${error?.hint || ""}`;
  return /model_probability|model_probability_label|model_snapshot_at/i.test(text);
}

async function saveUserProfile(username = getCurrentDisplayName()) {
  if (!state.supabase || !state.authSession?.user) return;
  const cleanUsername = cleanText(username);
  if (!cleanUsername || isInternalAuthEmail(cleanUsername)) return;

  const { error } = await state.supabase
    .from("user_profiles")
    .upsert(
      {
        user_id: state.authSession.user.id,
        username: cleanUsername,
      },
      { onConflict: "user_id" },
    );

  if (isAuthExpiredError(error)) {
    await expireAuthSession();
    return;
  }
  if (error && !/user_profiles|schema cache|relation/i.test(error.message || "")) {
    state.authNotice = `用户名保存失败：${error.message}`;
  }
}

function readUsernamePassword() {
  const username = cleanText(els.usernameInput.value);
  const password = String(els.passwordInput.value || "");
  if (!/^[\p{L}\p{N}_-]{2,24}$/u.test(username)) {
    state.authNotice = "用户名需为 2-24 位，可包含中文、英文、数字、下划线或短横线。";
    return null;
  }
  if (password.length < 6) {
    state.authNotice = "密码至少需要 6 位。";
    return null;
  }
  return { username, password };
}

function usernameToInternalEmail(username) {
  return `u_${hashString(username.toLowerCase())}${INTERNAL_AUTH_EMAIL_DOMAIN}`;
}

function hashString(value) {
  let hash = 2166136261;
  for (const char of value) {
    hash ^= char.codePointAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

function resetPredictionProfile() {
  state.predictionProfile = { championTeamCode: "", achievements: [] };
  state.predictionProfileNotice = "";
  state.predictionProfileSchemaMissing = false;
  state.championDraftTeamCode = "";
  state.isSavingChampionPick = false;
  state.isSubmittingCombo = false;
  resetComboPredictionDraft();
}

async function loadPredictions() {
  if (!state.supabase) {
    state.myPredictions = [];
    state.publicPredictions = [];
    state.myAwardPredictions = [];
    state.awardPredictions = [];
    state.awardSchemaMissing = false;
    state.pointBalance = null;
    state.pointSchemaMissing = false;
    state.comboSchemaMissing = false;
    resetPredictionProfile();
    state.leaderboardRows = [];
    state.leaderboardNotice = "";
    resetAdminState();
    render();
    return;
  }
  if (state.authSession && isSessionExpired(state.authSession)) {
    const refreshed = await refreshAuthSession();
    if (!refreshed) return;
  }
  state.isLoadingPredictions = true;
  renderAuthStatus();
  renderPredictionProfilePanel();
  const user = state.authSession?.user;

  const publicQuery = user
    ? state.supabase
        .from("predictions")
        .select("*")
        .eq("is_public", true)
        .order("created_at", { ascending: false })
        .limit(500)
    : Promise.resolve({ data: [], error: null });

  const myQuery = user
    ? state.supabase
        .from("predictions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(500)
    : Promise.resolve({ data: [], error: null });

  const awardQuery = user
    ? state.supabase
        .from("award_predictions")
        .select("*")
        .eq("is_public", true)
        .order("created_at", { ascending: false })
        .limit(500)
    : Promise.resolve({ data: [], error: null });

  const myAwardQuery = user
    ? state.supabase
        .from("award_predictions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50)
    : Promise.resolve({ data: [], error: null });

  const predictionProfileQuery = user
    ? state.supabase.rpc("get_my_prediction_profile")
    : Promise.resolve({ data: null, error: null });

  const [publicResult, myResult, awardResult, myAwardResult, predictionProfileResult] = await Promise.all([
    publicQuery,
    myQuery,
    awardQuery,
    myAwardQuery,
    predictionProfileQuery,
  ]);
  state.isLoadingPredictions = false;

  if (
    isAuthExpiredError(publicResult.error) ||
    isAuthExpiredError(myResult.error) ||
    isAuthExpiredError(awardResult.error) ||
    isAuthExpiredError(myAwardResult.error) ||
    isAuthExpiredError(predictionProfileResult.error)
  ) {
    await expireAuthSession();
    return;
  }

  if (publicResult.error || myResult.error) {
    state.authNotice = `读取预测失败：${publicResult.error?.message || myResult.error?.message}`;
  } else {
    state.publicPredictions = publicResult.data || [];
    state.myPredictions = myResult.data || [];
  }

  if (awardResult.error || myAwardResult.error) {
    state.awardPredictions = [];
    state.myAwardPredictions = [];
    state.awardSchemaMissing = isMissingAwardPredictionSchemaError(awardResult.error || myAwardResult.error);
    if (!state.awardSchemaMissing) {
      state.awardPredictionNotice = `读取奖项预测失败：${awardResult.error?.message || myAwardResult.error?.message}`;
    }
  } else {
    state.awardPredictions = awardResult.data || [];
    state.myAwardPredictions = myAwardResult.data || [];
    state.awardSchemaMissing = false;
    if (/奖项预测/.test(state.awardPredictionNotice)) state.awardPredictionNotice = "";
  }

  if (predictionProfileResult.error) {
    const schemaMissing = isMissingPredictionProfileSchemaError(predictionProfileResult.error);
    state.predictionProfileSchemaMissing = schemaMissing;
    if (schemaMissing) state.predictionProfile = { championTeamCode: "", achievements: [] };
    state.predictionProfileNotice = state.predictionProfileSchemaMissing
      ? "请先更新数据库后选择冠军球队。"
      : `读取冠军和成就失败：${predictionProfileResult.error.message}`;
  } else {
    state.predictionProfile = normalizePredictionProfile(predictionProfileResult.data);
    state.predictionProfileSchemaMissing = false;
    if (/读取冠军和成就失败|请先更新数据库/.test(state.predictionProfileNotice)) {
      state.predictionProfileNotice = "";
    }
  }
  await loadPointBalance();
  await loadAdminData();
  await loadLeaderboardData();
  render();
}

async function loadPointBalance() {
  if (!state.supabase?.rpc || !state.authSession?.user) {
    state.pointBalance = null;
    state.pointSchemaMissing = false;
    return;
  }

  const result = await state.supabase.rpc("get_my_point_balance");
  if (isAuthExpiredError(result.error)) {
    await expireAuthSession();
    return;
  }
  if (result.error) {
    state.pointBalance = null;
    state.pointSchemaMissing = isMissingPointSchemaError(result.error);
    if (!state.pointSchemaMissing) state.authNotice = `读取点数失败：${result.error.message}`;
    return;
  }

  const balance = Number(result.data);
  state.pointBalance = Number.isFinite(balance) ? balance : 0;
  state.pointSchemaMissing = false;
}

async function loadLeaderboardData() {
  if (!state.supabase?.rpc || !state.authSession?.user) {
    state.leaderboardRows = [];
    state.leaderboardNotice = "";
    state.isLoadingLeaderboard = false;
    return;
  }

  state.isLoadingLeaderboard = true;
  renderPredictionLists();
  const result = await state.supabase.rpc("get_public_leaderboard", {
    min_predictions: LEADERBOARD_MIN_SETTLED_PREDICTIONS,
  });
  state.isLoadingLeaderboard = false;

  if (isAuthExpiredError(result.error)) {
    await expireAuthSession();
    return;
  }

  if (result.error) {
    state.leaderboardRows = [];
    state.leaderboardNotice = isMissingSettlementSchemaError(result.error)
      ? "请重新运行 supabase/schema.sql 后查看服务端排行榜。"
      : `读取排行榜失败：${result.error.message}`;
    return;
  }

  state.leaderboardRows = normalizeLeaderboardRows(result.data || []);
  state.leaderboardNotice = "";
}

function normalizeLeaderboardRows(rows) {
  return rows
    .map((row) => {
      const achievements = normalizeAchievementIds(row.achievements);
      return {
        userId: row.user_id || row.userId || "",
        displayName: cleanText(row.display_name || row.displayName) || `用户 ${shortUserId(row.user_id || row.userId)}`,
        score: Number(row.cumulative_return_points ?? row.payout_points ?? 0),
        latestAt: row.latest_return_at || row.latest_prediction_at || row.latestAt || "",
        championTeamCode: normalizeChampionTeamCode(row.champion_team_code || row.championTeamCode),
        achievements,
        achievementCount: achievements.length,
      };
    })
    .filter((row) => Number.isFinite(row.score) && row.score > 0)
    .sort((a, b) => b.score - a.score || new Date(a.latestAt || 0) - new Date(b.latestAt || 0));
}

function normalizePredictionProfile(payload) {
  return {
    championTeamCode: normalizeChampionTeamCode(payload?.champion_team_code || payload?.championTeamCode),
    achievements: normalizeAchievementIds(payload?.achievements),
  };
}

function normalizeChampionTeamCode(value) {
  const teamCode = cleanText(value).toUpperCase();
  return CHAMPION_TEAMS.some((team) => team.code === teamCode) ? teamCode : "";
}

function normalizeAchievementIds(value) {
  let items = value;
  if (typeof items === "string") {
    try {
      items = JSON.parse(items);
    } catch {
      items = [];
    }
  }
  if (!Array.isArray(items)) return [];
  return [...new Set(items.map(cleanText).filter((id) => ACHIEVEMENT_IDS.has(id)))];
}

function getChampionTeam(teamCode) {
  return CHAMPION_TEAMS.find((team) => team.code === teamCode) || null;
}

function hasChampionPick() {
  return Boolean(state.predictionProfile.championTeamCode);
}

function isMissingSettlementSchemaError(error) {
  return /get_public_leaderboard|admin_upsert_match_results|match_results|schema cache|function .* not found|could not find/i.test(
    `${error?.message || ""} ${error?.details || ""} ${error?.hint || ""}`,
  );
}

function isMissingPointSchemaError(error) {
  return /submit_prediction|get_my_point_balance|admin_adjust_user_points|admin_upsert_prediction_markets|point_accounts|prediction_markets|stake_points|schema cache|function .* not found|could not find/i.test(
    `${error?.message || ""} ${error?.details || ""} ${error?.hint || ""}`,
  );
}

function isMissingComboPredictionSchemaError(error) {
  return /submit_combo_prediction|combo_legs|schema cache|function .* not found|could not find/i.test(
    `${error?.message || ""} ${error?.details || ""} ${error?.hint || ""}`,
  );
}

function isMissingPredictionProfileSchemaError(error) {
  return /get_my_prediction_profile|select_champion_pick|champion_picks|schema cache|function .* not found|could not find/i.test(
    `${error?.message || ""} ${error?.details || ""} ${error?.hint || ""}`,
  );
}

function formatPointError(error) {
  const message = cleanText(error?.message);
  if (/insufficient points/i.test(message)) return "可用点数不足。";
  if (/champion pick required/i.test(message)) return "请先确认冠军球队。";
  if (/champion pick already locked/i.test(message)) return "冠军球队已经锁定，不能更改。";
  if (/invalid champion team/i.test(message)) return "冠军球队无效，请刷新页面后重试。";
  if (/prediction market unavailable/i.test(message)) return "比赛概率尚未同步，请稍后再试。";
  if (/combo match already started/i.test(message)) return "组合中有比赛已经开始，不能提交。";
  if (/match already started|can no longer be changed/i.test(message)) return "比赛已经开始，不能再提交或修改预测。";
  if (/combo requires/i.test(message)) return `请选择 ${COMBO_MIN_LEGS}-${COMBO_MAX_LEGS} 场比赛。`;
  if (/duplicate combo match/i.test(message)) return "同一场比赛不能在组合中重复选择。";
  if (/invalid combo/i.test(message)) return "组合预测选项无效，请刷新页面后重试。";
  if (/stake must be at least/i.test(message)) return "本次投入点数至少为 1。";
  if (/invalid prediction/i.test(message)) return "预测选项无效，请刷新页面后重试。";
  return message || "未知错误";
}

function isMissingAwardPredictionSchemaError(error) {
  return /award_predictions|schema cache|relation .* does not exist|could not find/i.test(
    `${error?.message || ""} ${error?.details || ""} ${error?.hint || ""}`,
  );
}

async function loadAdminData(options = {}) {
  if (!state.supabase?.rpc || !state.authSession?.user) {
    resetAdminState();
    return;
  }

  state.isLoadingAdmin = true;
  if (options.force) renderAdminPanel();

  const adminResult = await state.supabase.rpc("is_admin");
  if (isAuthExpiredError(adminResult.error)) {
    await expireAuthSession();
    return;
  }
  if (adminResult.error || !adminResult.data) {
    resetAdminState();
    return;
  }

  state.isAdmin = true;
  await syncAuthoritativePredictionMarkets();
  await syncSettledMatchResults();
  const usersResult = await state.supabase.rpc("admin_list_users");
  if (isAuthExpiredError(usersResult.error)) {
    await expireAuthSession();
    return;
  }
  if (usersResult.error) {
    state.adminNotice = `读取用户失败：${usersResult.error.message}`;
    state.adminUsers = [];
    state.adminPredictions = [];
    state.isLoadingAdmin = false;
    renderAdminPanel();
    return;
  }

  state.adminUsers = usersResult.data || [];
  if (!state.adminUsers.some((user) => user.user_id === state.selectedAdminUserId)) {
    state.selectedAdminUserId = state.adminUsers[0]?.user_id || "";
  }

  if (state.selectedAdminUserId) {
    await loadAdminUserPredictions(state.selectedAdminUserId);
  } else {
    state.adminPredictions = [];
  }

  state.isLoadingAdmin = false;
  renderAdminPanel();
}

async function syncAuthoritativePredictionMarkets() {
  if (!state.supabase?.rpc || !state.isAdmin) return;
  await loadPolymarketOddsCache({ silent: true });
  const markets = buildAuthoritativePredictionMarketsPayload();
  if (!markets.length) return;

  const result = await state.supabase.rpc("admin_upsert_prediction_markets", { markets });
  if (isAuthExpiredError(result.error)) {
    await expireAuthSession();
    return;
  }
  if (result.error) {
    state.adminNotice = isMissingPointSchemaError(result.error)
      ? "请重新运行 supabase/schema.sql 后启用点数和服务端概率。"
      : `同步预测概率失败：${result.error.message}`;
  } else if (/同步预测概率失败|点数和服务端概率/.test(state.adminNotice)) {
    state.adminNotice = "";
  }
}

function buildAuthoritativePredictionMarketsPayload() {
  return state.matches
    .map((match) => {
      const kickoff = new Date(match.kickoffUtc);
      if (!cleanText(match.id) || Number.isNaN(kickoff.getTime())) return null;
      const probability = computeProbability(match);
      const exactScore = getPolymarketExactScore(match);
      return {
        match_id: match.id,
        match_label: `${match.home} vs ${match.away}`,
        match_kickoff_utc: kickoff.toISOString(),
        home_team: match.home,
        away_team: match.away,
        lambda_home: safeLambda(match.lambdaHome, 1.25),
        lambda_away: safeLambda(match.lambdaAway, 1.05),
        home_win_probability: probability.homeWin,
        draw_probability: probability.draw,
        away_win_probability: probability.awayWin,
        exact_scores: (exactScore?.scores || []).map((score) => ({
          home: score.home,
          away: score.away,
          probability: score.probability,
        })),
        exact_other_probability: exactScore?.otherProbability ?? null,
        source: match.source || "WorldCupLookup probability model",
        snapshot_at: exactScore?.updatedAt || match.polymarket?.wdl?.updatedAt || match.generatedAt || new Date().toISOString(),
      };
    })
    .filter(Boolean);
}

async function syncSettledMatchResults() {
  if (!state.supabase?.rpc || !state.isAdmin) return;
  const results = buildSettledMatchResultsPayload();
  if (!results.length) return;

  const result = await state.supabase.rpc("admin_upsert_match_results", { results });
  if (isAuthExpiredError(result.error)) {
    await expireAuthSession();
    return;
  }
  if (result.error) {
    if (isMissingSettlementSchemaError(result.error)) {
      state.adminNotice = "请重新运行 supabase/schema.sql 后启用服务端排行榜结算。";
    } else {
      state.adminNotice = `同步赛果失败：${result.error.message}`;
    }
  } else if (/服务端排行榜|同步赛果失败/.test(state.adminNotice)) {
    state.adminNotice = "";
  }
}

function buildSettledMatchResultsPayload() {
  return state.matches
    .filter(isFinishedMatch)
    .map((match) => {
      const marketResult = state.polymarketSettledResults.get(match.id);
      const isGroupStage = cleanText(match.stage).toLowerCase() === "group";
      if (!isGroupStage && !marketResult) return null;
      return {
        match_id: match.id,
        match_label: `${match.home} vs ${match.away}`,
        match_kickoff_utc: match.kickoffUtc,
        home_team: match.home,
        away_team: match.away,
        home_score: marketResult ? marketResult.homeScore : Number(match.result.home),
        away_score: marketResult ? marketResult.awayScore : Number(match.result.away),
        status: "finished",
        source: marketResult ? "Polymarket verified 90-minute result" : match.source || "WorldCupLookup schedule sync",
      };
    })
    .filter(
      (result) =>
        result &&
        cleanText(result.match_id) &&
        Number.isFinite(result.home_score) &&
        Number.isFinite(result.away_score) &&
        result.home_score >= 0 &&
        result.away_score >= 0,
    );
}

async function loadAdminUserPredictions(userId) {
  if (!state.supabase?.rpc || !state.isAdmin || !userId) {
    state.adminPredictions = [];
    return;
  }
  const result = await state.supabase.rpc("admin_list_user_predictions", { target_user_id: userId });
  if (isAuthExpiredError(result.error)) {
    await expireAuthSession();
    return;
  }
  if (result.error) {
    state.adminNotice = `读取预测记录失败：${result.error.message}`;
    state.adminPredictions = [];
    return;
  }
  state.adminPredictions = result.data || [];
}

function resetAdminState() {
  state.isAdmin = false;
  state.isLoadingAdmin = false;
  state.adminUsers = [];
  state.adminPredictions = [];
  state.selectedAdminUserId = "";
  state.adminNotice = "";
}

async function handleAdminAction(event) {
  const pointButton = event.target.closest("[data-action='admin-add-points'], [data-action='admin-subtract-points']");
  if (pointButton) {
    await adjustAdminUserPoints(
      pointButton.dataset.adminUserId,
      pointButton.dataset.action === "admin-subtract-points" ? -1 : 1,
    );
    return;
  }

  const deleteUserButton = event.target.closest("[data-action='admin-delete-user']");
  if (deleteUserButton) {
    await deleteAdminUser(deleteUserButton.dataset.adminUserId);
    return;
  }

  const actionButton = event.target.closest("[data-action='admin-delete-user-predictions']");
  if (actionButton) {
    await deleteAdminUserPredictions(actionButton.dataset.adminUserId);
    return;
  }

  const userButton = event.target.closest("[data-admin-user-id]");
  if (userButton) {
    state.selectedAdminUserId = userButton.dataset.adminUserId;
    state.isLoadingAdmin = true;
    renderAdminPanel();
    await loadAdminUserPredictions(state.selectedAdminUserId);
    state.isLoadingAdmin = false;
    renderAdminPanel();
    return;
  }
}

async function adjustAdminUserPoints(userId, direction) {
  if (!state.supabase?.rpc || !state.isAdmin || !userId) return;
  const input = els.adminPredictionsList?.querySelector(`[data-admin-point-input="${userId}"]`);
  const amount = roundPointAmount(input?.value);
  if (!Number.isFinite(amount) || amount <= 0) {
    state.adminNotice = "请输入大于 0 的点数。";
    renderAdminPanel();
    return;
  }

  const user = state.adminUsers.find((item) => item.user_id === userId);
  const name = user?.username || `用户 ${shortUserId(userId)}`;
  const adjustment = direction < 0 ? -amount : amount;
  state.isLoadingAdmin = true;
  state.adminNotice = `正在为 ${name}${direction < 0 ? "扣除" : "增加"} ${formatPointAmount(amount)}...`;
  renderAdminPanel();

  const result = await state.supabase.rpc("admin_adjust_user_points", {
    target_user_id: userId,
    adjustment,
    note: `管理员${direction < 0 ? "扣除" : "增加"}点数`,
  });
  if (isAuthExpiredError(result.error)) {
    await expireAuthSession();
    return;
  }
  if (result.error) {
    state.adminNotice = isMissingPointSchemaError(result.error)
      ? "请重新运行 supabase/schema.sql 后再分配点数。"
      : `点数调整失败：${formatPointError(result.error)}`;
    state.isLoadingAdmin = false;
    renderAdminPanel();
    return;
  }

  const balance = Number(result.data);
  if (user && Number.isFinite(balance)) user.point_balance = balance;
  if (userId === state.authSession?.user?.id && Number.isFinite(balance)) state.pointBalance = balance;
  state.adminNotice = `已为 ${name}${direction < 0 ? "扣除" : "增加"} ${formatPointAmount(amount)}，当前 ${formatPointAmount(balance)}。`;
  state.isLoadingAdmin = false;
  await loadLeaderboardData();
  render();
}

async function deleteAdminUserPredictions(userId) {
  if (!state.supabase?.rpc || !state.isAdmin || !userId) return;
  const user = state.adminUsers.find((item) => item.user_id === userId);
  const name = user?.username || `用户 ${shortUserId(userId)}`;
  const confirmed = window.confirm(`确认清空 ${name} 的所有预测记录？这个操作不能撤销。`);
  if (!confirmed) return;

  state.isLoadingAdmin = true;
  state.adminNotice = `正在清空 ${name} 的预测记录...`;
  renderAdminPanel();

  const result = await state.supabase.rpc("admin_delete_user_predictions", { target_user_id: userId });
  if (isAuthExpiredError(result.error)) {
    await expireAuthSession();
    return;
  }
  if (result.error) {
    state.adminNotice = `清空失败：${result.error.message}`;
    state.isLoadingAdmin = false;
    renderAdminPanel();
    return;
  }

  state.adminNotice = `已清空 ${name} 的 ${Number(result.data || 0)} 条预测记录。`;
  await loadPredictions();
}

async function deleteAdminUser(userId) {
  if (!state.supabase?.rpc || !state.isAdmin || !userId) return;
  if (userId === state.authSession?.user?.id) {
    state.adminNotice = "不能删除当前登录的管理员账号。";
    renderAdminPanel();
    return;
  }

  const user = state.adminUsers.find((item) => item.user_id === userId);
  const name = user?.username || `用户 ${shortUserId(userId)}`;
  const confirmed = window.confirm(`确认永久删除 ${name}？这个操作会同时删除他的预测记录，不能撤销。`);
  if (!confirmed) return;

  state.isLoadingAdmin = true;
  state.adminNotice = `正在删除 ${name}...`;
  renderAdminPanel();

  const result = await state.supabase.rpc("admin_delete_user", { target_user_id: userId });
  if (isAuthExpiredError(result.error)) {
    await expireAuthSession();
    return;
  }
  if (result.error) {
    state.adminNotice = `删除用户失败：${result.error.message}`;
    state.isLoadingAdmin = false;
    renderAdminPanel();
    return;
  }

  const deletedCount = Number(result.data || 0);
  state.selectedAdminUserId = "";
  state.adminNotice = deletedCount ? `已删除用户 ${name}。` : `没有找到可删除的用户 ${name}。`;
  await loadPredictions();
}

function parseResponsePayload(text) {
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function getResponseErrorMessage(payload, status) {
  if (typeof payload === "string") {
    const summary = payload.replace(/\s+/g, " ").trim().slice(0, 160);
    return summary ? `HTTP ${status}: ${summary}` : `HTTP ${status}`;
  }
  return payload?.error_description || payload?.error || payload?.msg || payload?.message || `HTTP ${status}`;
}

function createSupabaseRestClient(projectUrl, apiKey) {
  const baseUrl = projectUrl.replace(/\/+$/, "");
  const sessionKey = `${SUPABASE_SESSION_STORAGE}:${baseUrl}`;
  const listeners = new Set();
  let expiredSessionDetected = false;

  const readStoredSession = () => {
    try {
      const stored = localStorage.getItem(sessionKey);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };

  const getStoredSession = () => {
    const session = readStoredSession();
    if (isSessionExpired(session)) {
      expiredSessionDetected = true;
      return null;
    }
    return session;
  };

  const notify = (event, session) => {
    listeners.forEach((listener) => listener(event, session));
  };

  const saveSession = (session, event = "SIGNED_IN") => {
    if (session) localStorage.setItem(sessionKey, JSON.stringify(session));
    else localStorage.removeItem(sessionKey);
    notify(event, session);
  };

  const refreshStoredSession = async (session = readStoredSession()) => {
    const refreshToken = session?.refresh_token;
    if (!refreshToken) throw new Error("Missing refresh token");
    const payload = await request("/auth/v1/token?grant_type=refresh_token", {
      method: "POST",
      body: JSON.stringify({ refresh_token: refreshToken }),
      useSession: false,
    });
    const refreshed = normalizeSupabaseSession(payload, session);
    if (!refreshed) throw new Error("Refresh did not return a session");
    saveSession(refreshed, "TOKEN_REFRESHED");
    return refreshed;
  };

  const request = async (path, options = {}) => {
    const { useSession = true, ...fetchOptions } = options;
    const session = useSession ? getStoredSession() : null;
    const response = await fetch(`${baseUrl}${path}`, {
      ...fetchOptions,
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${session?.access_token || apiKey}`,
        "Content-Type": "application/json",
        ...(fetchOptions.headers || {}),
      },
    });
    const text = await response.text();
    const payload = parseResponsePayload(text);
    if (!response.ok) {
      throw new Error(getResponseErrorMessage(payload, response.status));
    }
    return payload;
  };

  return {
    auth: {
      async getSession() {
        const session = readStoredSession();
        if (isSessionExpired(session)) {
          expiredSessionDetected = true;
          try {
            const refreshed = await refreshStoredSession(session);
            expiredSessionDetected = false;
            return { data: { session: refreshed, expired: false }, error: null };
          } catch {
            saveSession(null, "TOKEN_EXPIRED");
            return { data: { session: null, expired: true }, error: null };
          }
        }
        const expired = expiredSessionDetected;
        expiredSessionDetected = false;
        return { data: { session, expired }, error: null };
      },
      onAuthStateChange(callback) {
        listeners.add(callback);
        return {
          data: {
            subscription: {
              unsubscribe: () => listeners.delete(callback),
            },
          },
        };
      },
      async signUp({ email, password, data }) {
        try {
          const payload = await request("/auth/v1/signup", {
            method: "POST",
            body: JSON.stringify({ email, password, data }),
          });
          const session = normalizeSupabaseSession(payload);
          if (session) saveSession(session, "SIGNED_IN");
          return { data: { session, user: payload.user || session?.user || null }, error: null };
        } catch (error) {
          return { data: { session: null, user: null }, error };
        }
      },
      async signInWithPassword({ email, password }) {
        try {
          const payload = await request("/auth/v1/token?grant_type=password", {
            method: "POST",
            body: JSON.stringify({ email, password }),
          });
          const session = normalizeSupabaseSession(payload);
          if (session) saveSession(session, "SIGNED_IN");
          return { data: { session, user: session?.user || null }, error: null };
        } catch (error) {
          return { data: { session: null, user: null }, error };
        }
      },
      async refreshSession(session) {
        try {
          const refreshed = await refreshStoredSession(session);
          return { data: { session: refreshed, user: refreshed.user || null }, error: null };
        } catch (error) {
          saveSession(null, "TOKEN_EXPIRED");
          return { data: { session: null, user: null }, error };
        }
      },
      async signOut() {
        try {
          await request("/auth/v1/logout", { method: "POST" });
        } catch {
          // A local sign-out is still valid when the remote token is already expired.
        }
        saveSession(null, "SIGNED_OUT");
        return { error: null };
      },
      async clearSession(event = "SIGNED_OUT") {
        saveSession(null, event);
        return { error: null };
      },
    },
    async rpc(functionName, params = {}) {
      try {
        const payload = await request(`/rest/v1/rpc/${encodeURIComponent(functionName)}`, {
          method: "POST",
          body: JSON.stringify(params || {}),
        });
        return { data: payload, error: null };
      } catch (error) {
        return { data: null, error };
      }
    },
    from(table) {
      return new SupabaseRestQuery(baseUrl, apiKey, table, getStoredSession);
    },
  };
}

class SupabaseRestQuery {
  constructor(baseUrl, apiKey, table, getStoredSession) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.table = table;
    this.getStoredSession = getStoredSession;
    this.params = new URLSearchParams();
  }

  select(columns) {
    this.params.set("select", columns);
    return this;
  }

  eq(column, value) {
    this.params.set(column, `eq.${value}`);
    return this;
  }

  order(column, options = {}) {
    this.params.set("order", `${column}.${options.ascending ? "asc" : "desc"}`);
    return this;
  }

  limit(value) {
    this.params.set("limit", String(value));
    return this;
  }

  async upsert(payload, options = {}) {
    const params = new URLSearchParams();
    if (options.onConflict) params.set("on_conflict", options.onConflict);
    return this.execute("POST", params, payload, {
      Prefer: "resolution=merge-duplicates,return=representation",
    });
  }

  then(resolve, reject) {
    return this.execute("GET", this.params).then(resolve, reject);
  }

  async execute(method, params, body, extraHeaders = {}) {
    const session = this.getStoredSession();
    const url = `${this.baseUrl}/rest/v1/${encodeURIComponent(this.table)}?${params.toString()}`;
    try {
      const response = await fetch(url, {
        method,
        headers: {
          apikey: this.apiKey,
          Authorization: `Bearer ${session?.access_token || this.apiKey}`,
          "Content-Type": "application/json",
          ...extraHeaders,
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      const text = await response.text();
      const data = parseResponsePayload(text);
      if (!response.ok) {
        throw new Error(getResponseErrorMessage(data, response.status));
      }
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
}

function normalizeSupabaseSession(payload, previousSession = null) {
  if (!payload?.access_token) return null;
  const expiresAt =
    payload.expires_at ||
    (payload.expires_in ? Math.floor(Date.now() / 1000) + Number(payload.expires_in) : null);
  return {
    access_token: payload.access_token,
    refresh_token: payload.refresh_token || previousSession?.refresh_token || "",
    token_type: payload.token_type || "bearer",
    expires_in: payload.expires_in || null,
    expires_at: expiresAt,
    user: payload.user || previousSession?.user || decodeJwtUser(payload.access_token),
  };
}

function decodeJwtUser(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    return {
      id: payload.sub,
      email: payload.email,
    };
  } catch {
    return null;
  }
}

async function fetchJson(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 18000);
  const requestUrl = options.cacheBust ? withCacheBust(url) : url;
  try {
    const response = await fetch(requestUrl, {
      cache: options.cacheBust ? "no-store" : "default",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function withCacheBust(url) {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}_=${Date.now()}`;
}

function buildOddsUrl(apiKey, sportKey, region) {
  const params = new URLSearchParams({
    apiKey,
    regions: region,
    markets: "h2h",
    oddsFormat: "decimal",
    dateFormat: "iso",
  });
  return `${THE_ODDS_API_BASE}/sports/${encodeURIComponent(sportKey)}/odds?${params.toString()}`;
}

function mergeMatches(incomingMatches, options = {}) {
  const preserveModel = options.preserveModel ?? true;
  let added = 0;
  let updated = 0;
  const nextMatches = [...state.matches];

  incomingMatches.forEach((incoming) => {
    const index = nextMatches.findIndex((existing) => isSameMatch(existing, incoming));
    if (index === -1) {
      nextMatches.push(incoming);
      added += 1;
      return;
    }

    nextMatches[index] = mergeMatch(nextMatches[index], incoming, preserveModel);
    updated += 1;
  });

  state.matches = nextMatches.sort(sortAscending);
  return { added, updated };
}

function replaceScheduleMatches(incomingMatches, options = {}) {
  const before = state.matches.length;
  state.matches = state.matches.filter((match) => !isManagedScheduleMatch(match));
  const removed = before - state.matches.length;
  const summary = mergeMatches(incomingMatches, options);
  return { ...summary, removed };
}

function isManagedScheduleMatch(match) {
  const id = String(match.id || "");
  if (id.startsWith("worldcup26-")) return true;
  if (SEED_MATCH_IDS.has(id)) return true;
  return cleanText(match.source).toLocaleLowerCase().includes("worldcup26 live api");
}

function mergeMatch(existing, incoming, preserveModel) {
  const keepExistingModel = preserveModel && !incoming.odds;
  return {
    ...existing,
    ...incoming,
    id: existing.id || incoming.id,
    lambdaHome: keepExistingModel ? existing.lambdaHome : incoming.lambdaHome,
    lambdaAway: keepExistingModel ? existing.lambdaAway : incoming.lambdaAway,
    odds: incoming.odds || existing.odds,
    polymarket: incoming.polymarket || existing.polymarket,
    result: incoming.result || existing.result,
    generatedAt: incoming.generatedAt || existing.generatedAt,
    source: joinSources(existing.source, incoming.source),
  };
}

function isSameMatch(a, b) {
  if (a.id && b.id && a.id === b.id) return true;
  const sameTeams =
    normalizeTeamKey(a.home, a.homeAlt, a.homeCode) === normalizeTeamKey(b.home, b.homeAlt, b.homeCode) &&
    normalizeTeamKey(a.away, a.awayAlt, a.awayCode) === normalizeTeamKey(b.away, b.awayAlt, b.awayCode);
  if (!sameTeams) return false;
  const aTime = new Date(a.kickoffUtc).getTime();
  const bTime = new Date(b.kickoffUtc).getTime();
  if (!Number.isFinite(aTime) || !Number.isFinite(bTime)) return true;
  return Math.abs(aTime - bTime) <= 18 * 60 * 60 * 1000;
}

function normalizeTeamKey(name, alt, code) {
  return String(alt || name || code || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/gi, "")
    .toLowerCase();
}

function joinSources(existingSource, incomingSource) {
  const sources = [existingSource, incomingSource]
    .flatMap((source) => String(source || "").split(" + "))
    .map((source) => source.trim())
    .filter(Boolean);
  return [...new Set(sources)].join(" + ") || "实时数据";
}

function readMatchFromEditor(existing, form, overrides = {}) {
  const formData = new FormData(form);
  const home = cleanText(formData.get("home"));
  const away = cleanText(formData.get("away"));
  const kickoff = parseBeijingDatetimeLocal(formData.get("kickoffUtc"));
  const generatedAt = parseBeijingDatetimeLocal(formData.get("generatedAt")) || new Date();
  const lambdaHome = readPositiveNumber(formData.get("lambdaHome"), 1.25);
  const lambdaAway = readPositiveNumber(formData.get("lambdaAway"), 1.05);

  if (!home || !away || !kickoff) {
    state.notice = "主队、客队和开赛时间不能为空。";
    renderDetail(existing);
    return null;
  }

  const odds = overrides.odds || readOdds(formData);
  const result = readResult(formData);

  return {
    ...existing,
    id: existing.id || `manual-${Date.now()}`,
    kickoffUtc: kickoff.toISOString(),
    stage: cleanText(formData.get("stage")),
    group: cleanText(formData.get("group")) || "未分组",
    venue: cleanText(formData.get("venue")),
    home,
    homeAlt: cleanText(formData.get("homeAlt")),
    homeCode: cleanText(formData.get("homeCode")),
    away,
    awayAlt: cleanText(formData.get("awayAlt")),
    awayCode: cleanText(formData.get("awayCode")),
    lambdaHome: safeLambda(overrides.lambdaHome ?? lambdaHome, 1.25),
    lambdaAway: safeLambda(overrides.lambdaAway ?? lambdaAway, 1.05),
    result,
    odds,
    generatedAt: (overrides.generatedAt ? new Date(overrides.generatedAt) : generatedAt).toISOString(),
    source: cleanText(overrides.source || formData.get("source")) || "本地数据",
  };
}

function readOdds(formData) {
  const home = Number(formData.get("homeOdds"));
  const draw = Number(formData.get("drawOdds"));
  const away = Number(formData.get("awayOdds"));
  if ([home, draw, away].every((value) => Number.isFinite(value) && value > 1)) {
    return { home, draw, away };
  }
  return undefined;
}

function readResult(formData) {
  const homeRaw = String(formData.get("resultHome") ?? "").trim();
  const awayRaw = String(formData.get("resultAway") ?? "").trim();
  if (!homeRaw && !awayRaw) return undefined;
  const home = Number(homeRaw);
  const away = Number(awayRaw);
  if (!Number.isInteger(home) || !Number.isInteger(away) || home < 0 || away < 0) return undefined;
  return { home, away };
}

function persistMatches() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ matches: state.matches }, null, 2));
}

function persistLiveMeta() {
  localStorage.setItem(LIVE_META_KEY, JSON.stringify(state.liveMeta, null, 2));
}

function renderGroupOptions() {
  if (!els.groupFilter) {
    state.group = "all";
    return;
  }
  const groups = [...new Set(state.matches.map((match) => match.group).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, "zh-CN"),
  );
  const current = groups.includes(state.group) ? state.group : "all";
  state.group = current;
  els.groupFilter.innerHTML = [
    `<option value="all">全部</option>`,
    ...groups.map((group) => `<option value="${escapeHtml(group)}">${escapeHtml(group)}</option>`),
  ].join("");
  els.groupFilter.value = current;
}

function renderSummary() {
  if (!els.upcomingCount || !els.historyCount || !els.strongestLean) return;
  const searchable = getSearchFilteredMatches();
  const ref = state.referenceAt.getTime();
  const upcoming = searchable.filter((match) => isUpcomingMatch(match, ref));
  const history = searchable.filter((match) => isHistoryMatch(match, ref));
  els.upcomingCount.textContent = upcoming.length;
  els.historyCount.textContent = history.length;

  const strongest = upcoming
    .map((match) => ({ match, lean: getStrongestLean(match) }))
    .sort((a, b) => b.lean.value - a.lean.value)[0];

  if (!strongest) {
    els.strongestLean.textContent = "-";
    return;
  }

  els.strongestLean.textContent = `${teamPair(strongest.match)}：${strongest.lean.label} ${formatPercent(strongest.lean.value)}`;
}

function renderList() {
  const matches = getVisibleMatches();
  if (!matches.length) {
    els.matchList.innerHTML = `<div class="empty-list">没有匹配的比赛</div>`;
    state.selectedId = null;
    return;
  }

  if (!state.selectedId || !matches.some((match) => match.id === state.selectedId)) {
    state.selectedId = matches[0].id;
  }

  els.matchList.innerHTML = matches.map(renderMatchCard).join("");
}

function renderMatchCard(match) {
  const probability = computeProbability(match);
  const timeline = getTimelineStatus(match);
  const resultText = getVisibleResult(match);
  const lean = getStrongestLean(match);
  const isSelected = match.id === state.selectedId;
  const statusClass = getStatusClass(timeline.key);

  return `
    <button class="match-card ${isSelected ? "is-selected" : ""}" type="button" data-match-id="${escapeHtml(match.id)}">
      <div class="match-card-header">
        <span class="match-time">${escapeHtml(formatDate(match.kickoffUtc))}</span>
        <span class="status-badge ${statusClass}">${escapeHtml(timeline.label)}</span>
      </div>
      <div class="teams">
        ${renderTeamLine(match.home, match.homeCode, resultText?.home)}
        ${renderTeamLine(match.away, match.awayCode, resultText?.away)}
      </div>
      <div class="prob-strip">
        ${renderProbChip("A胜", probability.homeWin)}
        ${renderProbChip("平", probability.draw)}
        ${renderProbChip("B胜", probability.awayWin)}
      </div>
      <div class="match-card-footer">
        <span>${escapeHtml(match.group || match.stage || "未分组")}</span>
        <span>${escapeHtml(lean.label)} ${formatPercent(lean.value)}</span>
      </div>
    </button>
  `;
}

function renderTeamLine(name, code, score) {
  const scoreMarkup = Number.isFinite(score) ? `<strong>${score}</strong>` : `<span class="team-code">${escapeHtml(code || "-")}</span>`;
  return `
    <div class="team-row">
      <span class="team-name">${escapeHtml(name)}</span>
      ${scoreMarkup}
    </div>
  `;
}

function renderProbChip(label, value) {
  return `
    <div class="prob-chip">
      <span>${escapeHtml(label)}</span>
      <strong>${formatPercent(value)}</strong>
    </div>
  `;
}

function renderDetail(match) {
  if (!match) {
    els.matchDetail.innerHTML = `<div class="detail-empty">选择一场比赛</div>`;
    return;
  }

  const probability = computeProbability(match);
  const timeline = getTimelineStatus(match);
  const result = getVisibleResult(match);
  const customProbability = scoreProbability(match, state.scoreHome, state.scoreAway);
  const statusClass = getStatusClass(timeline.key);
  const resultMarkup = result
    ? `<span class="result-pill">实际比分 ${result.home}-${result.away}</span>`
    : timeline.key === "pending-result"
      ? `<span class="result-pill">等待比分同步</span>`
    : `<span class="result-pill">赛前概率</span>`;

  els.matchDetail.innerHTML = `
    <div class="detail-head">
      <div class="detail-kicker">
        <span>${escapeHtml(match.stage || "World Cup")} · ${escapeHtml(match.group || "未分组")}</span>
        <span class="status-badge ${statusClass}">${escapeHtml(timeline.label)}</span>
      </div>
      <div class="detail-title">
        <div class="detail-team">
          <span class="team-code">${escapeHtml(match.homeCode || "A")}</span>
          <span class="team-name">${escapeHtml(match.home)}</span>
        </div>
        <span class="versus">VS</span>
        <div class="detail-team right">
          <span class="team-code">${escapeHtml(match.awayCode || "B")}</span>
          <span class="team-name">${escapeHtml(match.away)}</span>
        </div>
      </div>
      <div class="result-line">
        ${resultMarkup}
        ${match.liveStatus ? `<span class="result-pill">实时状态 ${escapeHtml(match.liveStatus)}</span>` : ""}
        <span class="result-pill">${escapeHtml(formatDateFull(match.kickoffUtc))}</span>
        <span class="result-pill">${escapeHtml(match.venue || "未设置场地")}</span>
      </div>
    </div>

    <div class="detail-body">
      <section>
        <h2 class="section-title">90分钟胜平负概率</h2>
        <div class="prob-bars">
          ${renderProbabilityBar(`${match.homeCode || "A"} 胜`, probability.homeWin, "home")}
          ${renderProbabilityBar("平局", probability.draw, "draw")}
          ${renderProbabilityBar(`${match.awayCode || "B"} 胜`, probability.awayWin, "away")}
        </div>

        <div class="top-scores">
          <h2 class="section-title">90分钟最可能比分</h2>
          ${probability.topScores.map(renderScorePill).join("")}
        </div>

        <div class="score-query">
          <label>
            A队进球
            <input type="number" min="0" max="12" step="1" value="${state.scoreHome}" data-score-input="home" />
          </label>
          <label>
            B队进球
            <input type="number" min="0" max="12" step="1" value="${state.scoreAway}" data-score-input="away" />
          </label>
          <span class="custom-probability">${state.scoreHome}-${state.scoreAway}：${formatPercent(customProbability)}</span>
        </div>

        ${renderPredictionForm(match)}

        ${SHOW_ADMIN_TOOLS ? renderEditor(match) : ""}
      </section>

      <section class="score-grid-wrap">
        <h2 class="section-title">具体比分矩阵</h2>
        ${renderScoreGrid(probability)}
      </section>
    </div>
  `;
}

function renderEditor(match) {
  const odds = match.odds || {};
  const noVig = getNoVigProbabilities(odds.home, odds.draw, odds.away);
  const oddsSummary = noVig
    ? `${formatPercent(noVig.homeWin)} / ${formatPercent(noVig.draw)} / ${formatPercent(noVig.awayWin)}`
    : "输入十进制赔率后可反推 xG";

  return `
    <form class="editor-panel" data-match-editor>
      ${state.notice ? `<div class="editor-notice">${escapeHtml(state.notice)}</div>` : ""}
      <div class="editor-head">
        <h2 class="section-title">比赛数据维护</h2>
        <div class="editor-actions">
          <button type="button" class="action-button primary" data-action="save-match">保存</button>
          <button type="button" class="action-button" data-action="estimate-odds">赔率估算</button>
        </div>
      </div>

      <div class="editor-grid">
        ${renderInput("主队", "home", match.home)}
        ${renderInput("客队", "away", match.away)}
        ${renderInput("主队代码", "homeCode", match.homeCode)}
        ${renderInput("客队代码", "awayCode", match.awayCode)}
        ${renderInput("主队英文", "homeAlt", match.homeAlt)}
        ${renderInput("客队英文", "awayAlt", match.awayAlt)}
        ${renderInput("开赛时间", "kickoffUtc", toBeijingDatetimeLocal(new Date(match.kickoffUtc)), "datetime-local")}
        ${renderInput("概率快照", "generatedAt", toBeijingDatetimeLocal(new Date(match.generatedAt || match.kickoffUtc)), "datetime-local")}
        ${renderInput("阶段", "stage", match.stage)}
        ${renderInput("小组", "group", match.group)}
        ${renderInput("场地", "venue", match.venue, "text", "wide")}
        ${renderInput("数据标签", "source", match.source, "text", "wide")}
      </div>

      <div class="editor-grid compact-grid">
        ${renderInput("主队 xG", "lambdaHome", match.lambdaHome, "number", "", "0.01", "0.05")}
        ${renderInput("客队 xG", "lambdaAway", match.lambdaAway, "number", "", "0.01", "0.05")}
        ${renderInput("主胜赔率", "homeOdds", odds.home, "number", "", "0.01", "1.01")}
        ${renderInput("平局赔率", "drawOdds", odds.draw, "number", "", "0.01", "1.01")}
        ${renderInput("客胜赔率", "awayOdds", odds.away, "number", "", "0.01", "1.01")}
        <div class="editor-readout">
          <span>去水概率</span>
          <strong>${escapeHtml(oddsSummary)}</strong>
        </div>
      </div>

      <div class="editor-grid compact-grid">
        ${renderInput("主队赛果", "resultHome", match.result?.home ?? "", "number", "", "1", "0")}
        ${renderInput("客队赛果", "resultAway", match.result?.away ?? "", "number", "", "1", "0")}
        <div class="editor-actions danger-zone">
          <button type="button" class="action-button" data-action="clear-result">清除赛果</button>
          <button type="button" class="action-button danger" data-action="delete-match">删除比赛</button>
        </div>
      </div>
    </form>
  `;
}

function renderPredictionForm(match) {
  const user = state.authSession?.user;
  const canPredict = isMatchPredictable(match);
  const existing = state.myPredictions.find((prediction) => prediction.match_id === match.id);
  const existingStake = existing?.settled_at ? 0 : Number(existing?.stake_points || 0);
  const allocatablePoints = Math.max(0, Number(state.pointBalance || 0) + existingStake);
  const hasPoints = allocatablePoints >= 1;
  const championReady = hasChampionPick();
  const disabled = !user || !state.supabase || !championReady || state.predictionProfileSchemaMissing || !canPredict || state.pointSchemaMissing || !hasPoints;
  const disabledAttr = disabled ? "disabled" : "";
  const status = !state.supabase
    ? "未连接 Supabase"
    : !user
      ? "登录后可提交预测"
      : state.predictionProfileSchemaMissing
        ? "冠军选择功能待启用"
        : !championReady
          ? "请先确认冠军球队"
          : !canPredict
            ? "比赛已开始或已完赛"
            : state.pointSchemaMissing
              ? "点数功能待启用"
              : !hasPoints
                ? "点数不足，请联系管理员"
                : `可分配 ${formatPointAmount(allocatablePoints)}`;
  const predictionType = isScorePrediction(existing || {}) ? "score" : "outcome";
  const outcome = ["home", "draw", "away"].includes(existing?.outcome) ? existing.outcome : "home";
  const predictedHomeScore = hasStoredScore(existing?.home_score) ? Number(existing.home_score) : 1;
  const predictedAwayScore = hasStoredScore(existing?.away_score) ? Number(existing.away_score) : 1;
  const defaultStake = existingStake >= 1 ? existingStake : Math.min(10, allocatablePoints);
  const initialProbability = predictionType === "score"
    ? scoreProbability(match, predictedHomeScore, predictedAwayScore)
    : getOutcomeProbabilitySnapshot(match, outcome).model_probability;
  const initialPayout = defaultStake >= 1 && initialProbability > 0 ? defaultStake / initialProbability : 0;

  return `
    <form class="prediction-form" data-prediction-form data-prediction-type="${predictionType}">
      <div class="prediction-form-head">
        <h2 class="section-title">提交预测</h2>
        <span>${escapeHtml(status)}</span>
      </div>
      ${state.predictionNotice ? `<div class="prediction-notice">${escapeHtml(state.predictionNotice)}</div>` : ""}
      <div class="prediction-controls">
        <label>
          类型
          <select name="predictionType" ${disabledAttr}>
            <option value="outcome" ${predictionType === "outcome" ? "selected" : ""}>90分钟胜平负</option>
            <option value="score" ${predictionType === "score" ? "selected" : ""}>90分钟比分</option>
          </select>
        </label>
        <label data-outcome-prediction-field>
          90分钟胜平负
          <select name="outcome" ${disabledAttr}>
            <option value="home" ${outcome === "home" ? "selected" : ""}>${escapeHtml(match.homeCode || "A")} 胜</option>
            <option value="draw" ${outcome === "draw" ? "selected" : ""}>平局</option>
            <option value="away" ${outcome === "away" ? "selected" : ""}>${escapeHtml(match.awayCode || "B")} 胜</option>
          </select>
        </label>
        <label data-score-prediction-field>
          A队进球
          <input name="predictedHomeScore" type="number" min="0" max="20" step="1" value="${predictedHomeScore}" ${disabledAttr} />
        </label>
        <label data-score-prediction-field>
          B队进球
          <input name="predictedAwayScore" type="number" min="0" max="20" step="1" value="${predictedAwayScore}" ${disabledAttr} />
        </label>
        <label>
          本次投入
          <input name="stakePoints" type="number" min="1" max="${allocatablePoints}" step="0.01" value="${defaultStake >= 1 ? defaultStake : 1}" ${disabledAttr} />
        </label>
        <button type="button" class="action-button primary prediction-submit" data-action="submit-prediction" ${disabledAttr}>${existing ? "更新" : "提交"}</button>
      </div>
      <div class="prediction-payout-preview" data-payout-preview>${initialPayout > 0 ? `命中预计返还 ${escapeHtml(formatPointAmount(initialPayout))} · 当前概率 ${escapeHtml(formatPercent(initialProbability))}` : ""}</div>
    </form>
  `;
}

function updatePredictionPayoutPreview(match, form) {
  const preview = form?.querySelector("[data-payout-preview]");
  if (!match || !preview) return;
  const formData = new FormData(form);
  const stake = roundPointAmount(formData.get("stakePoints"));
  const predictionType = cleanText(formData.get("predictionType"));
  let probability = null;
  if (predictionType === "outcome") {
    probability = getOutcomeProbabilitySnapshot(match, cleanText(formData.get("outcome"))).model_probability;
  } else if (predictionType === "score") {
    const homeScore = Number(formData.get("predictedHomeScore"));
    const awayScore = Number(formData.get("predictedAwayScore"));
    if (Number.isInteger(homeScore) && Number.isInteger(awayScore) && homeScore >= 0 && awayScore >= 0) {
      probability = scoreProbability(match, homeScore, awayScore);
    }
  }
  preview.textContent = Number.isFinite(stake) && stake >= 1 && Number(probability) > 0
    ? `命中预计返还 ${formatPointAmount(stake / probability)} · 当前概率 ${formatPercent(probability)}`
    : "";
}

function renderComboPredictionPanel() {
  if (!els.comboPredictionPanel) return;
  const user = state.authSession?.user;
  const matches = state.matches
    .filter(isMatchPredictable)
    .sort(sortAscending)
    .slice(0, COMBO_MATCH_OPTION_LIMIT);
  const balance = Number(state.pointBalance || 0);
  const championReady = hasChampionPick();
  const enabled = Boolean(
    state.supabase &&
    user &&
    championReady &&
    !state.predictionProfileSchemaMissing &&
    !state.pointSchemaMissing &&
    !state.comboSchemaMissing &&
    !state.isSubmittingCombo &&
    balance >= 1 &&
    matches.length >= COMBO_MIN_LEGS
  );
  const status = !state.supabase
    ? "未连接 Supabase"
    : !user
      ? "登录后可提交"
      : state.predictionProfileSchemaMissing
        ? "冠军选择功能待启用"
        : !championReady
          ? "请先确认冠军球队"
          : state.isSubmittingCombo
            ? "正在提交..."
            : state.comboSchemaMissing
              ? "组合预测待启用"
              : state.pointSchemaMissing
                ? "组合预测待启用"
                : balance < 1
                  ? "点数不足，请联系管理员"
                  : matches.length < COMBO_MIN_LEGS
                    ? "暂无足够的未开赛比赛"
                    : `可用 ${formatPointAmount(balance)}`;
  const defaultStake = Math.max(1, Math.min(10, balance));
  const draftStake = state.comboDraft.stakePoints === null ? defaultStake : state.comboDraft.stakePoints;

  els.comboPredictionPanel.innerHTML = `
    <div class="prediction-list-head">
      <div>
        <h2 class="section-title">组合预测</h2>
        <span class="combo-subtitle">90分钟胜平负 · ${COMBO_MIN_LEGS}-${COMBO_MAX_LEGS} 场</span>
      </div>
      <span class="combo-status">${escapeHtml(status)}</span>
    </div>
    <div class="prediction-notice combo-notice" data-combo-notice ${state.comboPredictionNotice ? "" : "hidden"}>${escapeHtml(state.comboPredictionNotice)}</div>
    ${matches.length >= COMBO_MIN_LEGS ? `
      <form class="combo-form" data-combo-form data-combo-disabled="${enabled ? "false" : "true"}">
        <div class="combo-match-list">
          ${matches.map((match) => renderComboMatchRow(match, enabled)).join("")}
        </div>
        <div class="combo-controls">
          <label>
            本次投入
            <input name="comboStakePoints" type="number" min="1" max="${balance}" step="0.01" value="${escapeHtml(draftStake)}" ${enabled ? "" : "disabled"} />
          </label>
          <div class="combo-preview" data-combo-preview>已选择 0 场</div>
          <button type="button" class="action-button primary" data-action="submit-combo-prediction" disabled>提交组合</button>
        </div>
      </form>
    ` : `<div class="empty-list compact-empty">暂无可组合的未开赛比赛</div>`}
  `;
  updateComboPredictionPreview();
}

function renderComboMatchRow(match, enabled) {
  const probability = computeProbability(match);
  const selectedOutcome = cleanText(state.comboDraft.selections[match.id]);
  const selected = ["home", "draw", "away"].includes(selectedOutcome);
  const outcome = selected ? selectedOutcome : "home";
  return `
    <div class="combo-match-row" data-combo-row data-combo-match-id="${escapeHtml(match.id)}">
      <input
        type="checkbox"
        data-combo-match
        aria-label="选择 ${escapeHtml(match.home)} 对 ${escapeHtml(match.away)}"
        ${selected ? "checked" : ""}
        ${enabled ? "" : "disabled"}
      />
      <div class="combo-match-info">
        <strong>${escapeHtml(match.home)} vs ${escapeHtml(match.away)}</strong>
        <span>${escapeHtml(formatDate(match.kickoffUtc))}</span>
      </div>
      <select data-combo-outcome aria-label="${escapeHtml(match.home)} 对 ${escapeHtml(match.away)}的预测" ${enabled && selected ? "" : "disabled"}>
        <option value="home" ${outcome === "home" ? "selected" : ""}>${escapeHtml(match.home)} 胜 · ${escapeHtml(formatPercent(probability.homeWin))}</option>
        <option value="draw" ${outcome === "draw" ? "selected" : ""}>平局 · ${escapeHtml(formatPercent(probability.draw))}</option>
        <option value="away" ${outcome === "away" ? "selected" : ""}>${escapeHtml(match.away)} 胜 · ${escapeHtml(formatPercent(probability.awayWin))}</option>
      </select>
    </div>
  `;
}

function renderInput(label, name, value, type = "text", className = "", step = "", min = "") {
  return `
    <label class="edit-field ${className}">
      <span>${escapeHtml(label)}</span>
      <input
        name="${escapeHtml(name)}"
        type="${escapeHtml(type)}"
        value="${escapeHtml(value ?? "")}"
        ${step ? `step="${escapeHtml(step)}"` : ""}
        ${min ? `min="${escapeHtml(min)}"` : ""}
      />
    </label>
  `;
}

function renderProbabilityBar(label, value, kind) {
  return `
    <div class="prob-row">
      <span class="prob-label">${escapeHtml(label)}</span>
      <span class="bar-track"><span class="bar-fill ${kind}" style="width: ${Math.max(0, Math.min(100, value * 100))}%"></span></span>
      <span class="prob-value">${formatPercent(value)}</span>
    </div>
  `;
}

function renderScorePill(score) {
  return `
    <div class="score-pill">
      <strong>${score.home}-${score.away}</strong>
      <span class="mini-track"><span class="mini-fill" style="width: ${Math.max(4, score.relative * 100)}%"></span></span>
      <span>${formatPercent(score.probability)}</span>
    </div>
  `;
}

function renderScoreGrid(probability) {
  const headers = Array.from({ length: MAX_EXACT_GOALS + 1 }, (_, index) => index);
  const maxCell = Math.max(...probability.matrix.flat().map((cell) => cell.probability));
  const cells = [
    `<div class="grid-axis">A\\B</div>`,
    ...headers.map((score) => `<div class="grid-head">${score}</div>`),
  ];

  headers.forEach((homeScore) => {
    cells.push(`<div class="grid-head">${homeScore}</div>`);
    headers.forEach((awayScore) => {
      const cell = probability.matrix[homeScore][awayScore];
      const heat = maxCell ? 0.08 + (cell.probability / maxCell) * 0.58 : 0.08;
      cells.push(`
        <div class="grid-cell ${heat > 0.48 ? "hot" : ""}" style="--heat: ${heat.toFixed(3)}">
          ${formatPercent(cell.probability)}
        </div>
      `);
    });
  });

  return `<div class="score-grid">${cells.join("")}</div>`;
}

function renderAwards() {
  if (!els.awardsPanel) return;
  els.awardsPanel.innerHTML = renderAwardsPanel();
}

function renderAwardsPanel() {
  const awards = computeAwardProbabilities();
  const finishedCount = state.matches.filter(isFinishedMatch).length;
  const totalCount = state.matches.length;
  const notice = state.awardSchemaMissing
    ? "请重新运行 supabase/schema.sql 后启用奖项预测保存。"
    : state.awardPredictionNotice;

  return `
    <div class="prediction-list-head">
      <div>
        <h2 class="section-title">奖项概率</h2>
        <span class="award-subtitle">基于已完赛 ${finishedCount}/${totalCount} 场和后续赛程滚动估算</span>
      </div>
    </div>
    ${notice ? `<div class="prediction-notice award-notice">${escapeHtml(notice)}</div>` : ""}
    <div class="award-grid">
      ${awards.map(renderAwardCard).join("")}
    </div>
  `;
}

function renderAwardCard(award) {
  const myPrediction = state.myAwardPredictions.find((prediction) => prediction.award_type === award.type);
  const publicPredictions = state.awardPredictions
    .filter((prediction) => prediction.award_type === award.type)
    .slice(0, 5);
  const candidates = award.candidates.slice(0, AWARD_PROBABILITY_CANDIDATE_LIMIT);
  const options = award.candidates.slice(0, AWARD_PREDICTION_OPTION_LIMIT);
  const selectedCandidate = myPrediction?.candidate_name || options[0]?.name || "";
  if (selectedCandidate && !options.some((candidate) => candidate.name === selectedCandidate)) {
    options.push({
      name: selectedCandidate,
      team: myPrediction?.candidate_team || "",
      probability: normalizeStoredProbability(myPrediction?.model_probability) ?? 0,
    });
  }
  const disabled = !state.supabase || !state.authSession?.user || state.awardSchemaMissing ? "disabled" : "";

  return `
    <article class="award-card">
      <div class="award-card-head">
        <div>
          <strong>${escapeHtml(award.label)}</strong>
          <span>${escapeHtml(award.description)}</span>
        </div>
      </div>
      <div class="award-candidates">
        ${candidates.length ? candidates.map(renderAwardCandidate).join("") : `<div class="empty-list compact-empty">暂无候选概率</div>`}
      </div>
      <form class="award-form" data-award-form="${escapeHtml(award.type)}">
        <label>
          我的预测
          <select name="candidateName" ${disabled}>
            ${options.map((candidate) => `
              <option value="${escapeHtml(candidate.name)}" ${candidate.name === selectedCandidate ? "selected" : ""}>
                ${escapeHtml(candidate.name)}${candidate.team ? ` · ${escapeHtml(candidate.team)}` : ""}
              </option>
            `).join("")}
          </select>
        </label>
        <button type="button" class="action-button primary" data-action="submit-award-prediction" data-award-type="${escapeHtml(award.type)}" ${disabled}>保存</button>
      </form>
      ${myPrediction ? `<div class="award-my-pick">已预测：${escapeHtml(myPrediction.candidate_name)}${myPrediction.candidate_team ? ` · ${escapeHtml(myPrediction.candidate_team)}` : ""}</div>` : ""}
      <div class="award-public-picks">
        ${state.authSession?.user
          ? renderAwardPredictionRows(publicPredictions)
          : `<span>登录后查看用户奖项预测</span>`}
      </div>
    </article>
  `;
}

function renderAwardCandidate(candidate, index) {
  return `
    <div class="award-candidate">
      <span class="award-rank">#${index + 1}</span>
      <strong>${escapeHtml(candidate.name)}</strong>
      <span>${escapeHtml(candidate.team || "")}</span>
      <span class="award-probability">${formatPercent(candidate.probability)}</span>
      <span class="mini-track"><span class="mini-fill" style="width: ${Math.max(4, candidate.probability * 100)}%"></span></span>
    </div>
  `;
}

function renderAwardPredictionRows(predictions) {
  if (state.isLoadingPredictions) return `<span>正在加载用户奖项预测...</span>`;
  if (!predictions.length) return `<span>暂无用户预测</span>`;
  return predictions.map((prediction) => `
    <span>${escapeHtml(getPredictionDisplayName(prediction))}：${escapeHtml(prediction.candidate_name)}</span>
  `).join("");
}

function computeAwardProbabilities() {
  const context = buildAwardContext();
  return [
    {
      type: "golden_ball",
      label: AWARD_LABELS.golden_ball,
      description: AWARD_DESCRIPTIONS.golden_ball,
      candidates: buildGoldenBallCandidates(context),
    },
    {
      type: "golden_boot",
      label: AWARD_LABELS.golden_boot,
      description: AWARD_DESCRIPTIONS.golden_boot,
      candidates: buildGoldenBootCandidates(context),
    },
    {
      type: "golden_glove",
      label: AWARD_LABELS.golden_glove,
      description: AWARD_DESCRIPTIONS.golden_glove,
      candidates: buildGoldenGloveCandidates(context),
    },
  ];
}

function buildAwardContext() {
  const teams = new Map();
  const players = new Map();

  state.matches.forEach((match) => {
    const homeTeam = ensureAwardTeam(teams, match.home, match.homeAlt, match.homeCode);
    const awayTeam = ensureAwardTeam(teams, match.away, match.awayAlt, match.awayCode);
    const result = hasResult(match) ? match.result : null;

    if (isAwardSettledMatch(match) && result) {
      applyFinishedTeamStats(homeTeam, Number(result.home), Number(result.away));
      applyFinishedTeamStats(awayTeam, Number(result.away), Number(result.home));
      addScorersToAwardPlayers(players, match.homeScorers, homeTeam, match.kickoffUtc);
      addScorersToAwardPlayers(players, match.awayScorers, awayTeam, match.kickoffUtc);
      return;
    }

    if (isFutureOrLiveMatch(match)) {
      const probability = computeProbability(match);
      homeTeam.remainingMatches += 1;
      awayTeam.remainingMatches += 1;
      homeTeam.expectedFutureGoals += safeLambda(match.lambdaHome, 1.25);
      awayTeam.expectedFutureGoals += safeLambda(match.lambdaAway, 1.05);
      homeTeam.expectedFuturePoints += probability.homeWin * 3 + probability.draw;
      awayTeam.expectedFuturePoints += probability.awayWin * 3 + probability.draw;
    }
  });

  teams.forEach((team) => {
    team.goalDiff = team.goalsFor - team.goalsAgainst;
    team.pointsPerMatch = team.played ? team.points / team.played : 0;
    team.defenseScore = team.played ? team.cleanSheets * 1.8 + Math.max(0, 2.2 - team.goalsAgainst / team.played) : 0.5;
    team.performanceScore =
      team.points * 0.8 +
      team.goalDiff * 0.45 +
      team.goalsFor * 0.18 +
      team.expectedFuturePoints * 0.55 +
      team.expectedFutureGoals * 0.18 +
      1;
    ensureGenericPlayer(players, team);
  });

  return {
    teams: [...teams.values()],
    players: [...players.values()],
  };
}

function ensureAwardTeam(teams, name, alt, code) {
  const key = normalizeTeamKey(alt || code || name) || normalizeAwardKey(name, code);
  if (!teams.has(key)) {
    teams.set(key, {
      key,
      name: cleanText(name || alt || code),
      alt: cleanText(alt),
      code: cleanText(code),
      played: 0,
      points: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      cleanSheets: 0,
      remainingMatches: 0,
      expectedFutureGoals: 0,
      expectedFuturePoints: 0,
      performanceScore: 1,
      defenseScore: 0.5,
    });
  }
  return teams.get(key);
}

function applyFinishedTeamStats(team, goalsFor, goalsAgainst) {
  team.played += 1;
  team.goalsFor += goalsFor;
  team.goalsAgainst += goalsAgainst;
  if (goalsAgainst === 0) team.cleanSheets += 1;
  if (goalsFor > goalsAgainst) {
    team.wins += 1;
    team.points += 3;
  } else if (goalsFor === goalsAgainst) {
    team.draws += 1;
    team.points += 1;
  } else {
    team.losses += 1;
  }
}

function addScorersToAwardPlayers(players, scorers, team, kickoffUtc) {
  normalizeStoredScorers(scorers).forEach((name) => {
    const key = `${normalizeAwardKey(name)}:${team.key}`;
    const player = players.get(key) || {
      key,
      name,
      team: team.name,
      teamKey: team.key,
      teamRef: team,
      goals: 0,
      scoringMatches: 0,
      generic: false,
      latestGoalAt: "",
    };
    player.goals += 1;
    player.scoringMatches += 1;
    player.latestGoalAt = kickoffUtc || player.latestGoalAt;
    players.set(key, player);
  });
}

function ensureGenericPlayer(players, team) {
  const name = `${team.name}核心球员`;
  const key = `${normalizeAwardKey(name)}:${team.key}`;
  if (players.has(key)) return;
  players.set(key, {
    key,
    name,
    team: team.name,
    teamKey: team.key,
    teamRef: team,
    goals: 0,
    scoringMatches: 0,
    generic: true,
    latestGoalAt: "",
  });
}

function buildGoldenBootCandidates(context) {
  const candidates = context.players.map((player) => {
    const team = player.teamRef;
    const goalBase = player.goals + (player.generic ? 0.12 : 0.35);
    const score =
      goalBase ** 2.15 *
      (1 + team.expectedFutureGoals * 0.18 + team.remainingMatches * 0.08) +
      player.scoringMatches * 0.12 +
      Math.max(0, team.performanceScore) * 0.015;
    return toAwardCandidate(player, score);
  });
  return normalizeAwardCandidates(candidates);
}

function buildGoldenBallCandidates(context) {
  const candidates = context.players.map((player) => {
    const team = player.teamRef;
    const score =
      (player.generic ? 0.7 : 1.2) +
      player.goals * 2.6 +
      player.scoringMatches * 0.6 +
      team.performanceScore * 0.55 +
      team.expectedFutureGoals * 0.24 +
      team.cleanSheets * 0.18;
    return toAwardCandidate(player, score);
  });
  return normalizeAwardCandidates(candidates);
}

function buildGoldenGloveCandidates(context) {
  const candidates = context.teams.map((team) => {
    const concededPerMatch = team.played ? team.goalsAgainst / team.played : 1.2;
    const name = `${team.name}主力门将`;
    const score =
      0.8 +
      team.cleanSheets * 2.4 +
      Math.max(0, 2.1 - concededPerMatch) * 1.6 +
      team.points * 0.35 +
      team.expectedFuturePoints * 0.38 +
      team.remainingMatches * 0.16 +
      Math.max(0, team.goalDiff || 0) * 0.16;
    return {
      name,
      team: team.name,
      probability: 0,
      score: Math.max(0.02, score),
    };
  });
  return normalizeAwardCandidates(candidates);
}

function toAwardCandidate(player, score) {
  return {
    name: player.name,
    team: player.team,
    goals: player.goals,
    probability: 0,
    score: Math.max(0.02, score),
  };
}

function normalizeAwardCandidates(candidates) {
  const merged = new Map();
  candidates.forEach((candidate) => {
    if (!candidate.name) return;
    const key = `${normalizeAwardKey(candidate.name)}:${normalizeAwardKey(candidate.team)}`;
    const existing = merged.get(key);
    if (existing) {
      existing.score += candidate.score;
      existing.goals = Math.max(existing.goals || 0, candidate.goals || 0);
    } else {
      merged.set(key, { ...candidate });
    }
  });

  const list = [...merged.values()].filter((candidate) => Number.isFinite(candidate.score) && candidate.score > 0);
  const total = list.reduce((sum, candidate) => sum + candidate.score, 0) || 1;
  return list
    .map((candidate) => ({
      ...candidate,
      probability: candidate.score / total,
    }))
    .sort((a, b) => b.probability - a.probability || (b.goals || 0) - (a.goals || 0));
}

function normalizeAwardKey(...values) {
  return values
    .map((value) => cleanText(value).toLocaleLowerCase().replace(/\s+/g, ""))
    .filter(Boolean)
    .join(":");
}

function renderPredictionLists() {
  if (els.leaderboardList) els.leaderboardList.innerHTML = renderLeaderboard();
  els.myPredictionsList.innerHTML = renderPredictionList({
    predictions: state.myPredictions,
    emptyText: state.authSession?.user ? "还没有预测记录" : "登录后查看自己的历史预测",
    showOwner: false,
  });
  els.publicPredictionsList.innerHTML = renderPredictionList({
    predictions: state.authSession?.user ? state.publicPredictions : [],
    emptyText: getPublicPredictionsEmptyText(),
    showOwner: true,
  });
}

function getPublicPredictionsEmptyText() {
  if (!state.supabase) return "连接 Supabase 后查看用户预测";
  if (!state.authSession?.user) return "登录后查看用户预测";
  return "暂无用户预测";
}

function renderAdminPanel() {
  if (!els.adminPanel) return;
  els.adminPanel.hidden = !state.isAdmin;
  if (!state.isAdmin) return;

  if (els.refreshAdminButton) els.refreshAdminButton.disabled = state.isLoadingAdmin;
  if (els.adminNotice) {
    els.adminNotice.hidden = !state.adminNotice;
    els.adminNotice.textContent = state.adminNotice;
  }
  els.adminUsersList.innerHTML = renderAdminUsers();
  els.adminPredictionsList.innerHTML = renderAdminPredictions();
}

function renderAdminUsers() {
  if (state.isLoadingAdmin && !state.adminUsers.length) {
    return `<div class="empty-list compact-empty">正在加载用户...</div>`;
  }
  if (!state.adminUsers.length) return `<div class="empty-list compact-empty">暂无用户</div>`;

  return state.adminUsers.map((user) => {
    const selected = user.user_id === state.selectedAdminUserId;
    return `
      <button class="admin-user-card ${selected ? "is-selected" : ""}" type="button" data-admin-user-id="${escapeHtml(user.user_id)}">
        <strong>${escapeHtml(user.username || `用户 ${shortUserId(user.user_id)}`)}</strong>
        <span>点数 ${escapeHtml(formatPointAmount(user.point_balance || 0))}</span>
        <span>预测 ${Number(user.prediction_count || 0)}</span>
        <span>最近 ${escapeHtml(formatDateFull(user.latest_prediction_at || user.auth_created_at))}</span>
      </button>
    `;
  }).join("");
}

function renderAdminPredictions() {
  if (state.isLoadingAdmin) return `<div class="empty-list compact-empty">正在加载预测记录...</div>`;
  const user = getSelectedAdminUser();
  if (!user) return `<div class="empty-list compact-empty">请选择一个用户</div>`;

  const deleteDisabled = Number(user.prediction_count || 0) <= 0 ? "disabled" : "";
  const deleteUserDisabled = user.user_id === state.authSession?.user?.id ? "disabled" : "";
  const subtractDisabled = Number(user.point_balance || 0) <= 0 ? "disabled" : "";
  const records = state.adminPredictions.length
    ? state.adminPredictions.map((prediction) => renderPredictionCard(prediction, false)).join("")
    : `<div class="empty-list compact-empty">这个用户没有预测记录</div>`;

  return `
    <div class="admin-user-summary">
      <div>
        <strong>${escapeHtml(user.username || `用户 ${shortUserId(user.user_id)}`)}</strong>
        <span>可用 ${escapeHtml(formatPointAmount(user.point_balance || 0))} · 待结算投入 ${escapeHtml(formatPointAmount(user.pending_stake_points || 0))}</span>
        <span>注册 ${escapeHtml(formatDateFull(user.auth_created_at))}</span>
      </div>
      <div class="admin-point-controls">
        <label>
          调整点数
          <input type="number" min="0.01" step="0.01" value="100" data-admin-point-input="${escapeHtml(user.user_id)}" />
        </label>
        <button type="button" class="action-button" data-action="admin-add-points" data-admin-user-id="${escapeHtml(user.user_id)}">增加</button>
        <button type="button" class="action-button" data-action="admin-subtract-points" data-admin-user-id="${escapeHtml(user.user_id)}" ${subtractDisabled}>扣除</button>
      </div>
      <div class="admin-actions">
        <button type="button" class="action-button danger" data-action="admin-delete-user-predictions" data-admin-user-id="${escapeHtml(user.user_id)}" ${deleteDisabled}>清空预测</button>
        <button type="button" class="action-button danger" data-action="admin-delete-user" data-admin-user-id="${escapeHtml(user.user_id)}" ${deleteUserDisabled}>删除用户</button>
      </div>
    </div>
    ${records}
  `;
}

function getSelectedAdminUser() {
  return state.adminUsers.find((user) => user.user_id === state.selectedAdminUserId) || null;
}

function renderLeaderboard() {
  if (state.isLoadingPredictions || state.isLoadingLeaderboard) return `<div class="empty-list compact-empty">正在加载排行榜...</div>`;
  if (!state.supabase) return `<div class="empty-list compact-empty">连接 Supabase 后查看排行榜</div>`;
  if (!state.authSession?.user) return `<div class="empty-list compact-empty">登录后查看排行榜</div>`;

  if (state.leaderboardNotice) return `<div class="empty-list compact-empty">${escapeHtml(state.leaderboardNotice)}</div>`;

  const rows = state.leaderboardRows;
  if (!rows.length) {
    return `<div class="empty-list compact-empty">暂无预测返还记录</div>`;
  }

  return rows.map(renderLeaderboardRow).join("");
}

function renderLeaderboardRow(row, index) {
  const championTeam = getChampionTeam(row.championTeamCode);
  const isLegendary = row.achievementCount === ACHIEVEMENT_DEFINITIONS.length;
  return `
    <article class="leaderboard-row ${isLegendary ? "is-legendary" : ""}" data-user-id="${escapeHtml(row.userId)}">
      <span class="leaderboard-rank">#${index + 1}</span>
      <div class="leaderboard-user">
        <div class="leaderboard-name-line">
          <strong>${escapeHtml(row.displayName)}</strong>
          <span class="leaderboard-champion ${championTeam ? "is-picked" : ""}">
            ${championTeam ? `冠军 ${escapeHtml(championTeam.name)} · ${escapeHtml(championTeam.code)}` : "冠军未选择"}
          </span>
        </div>
        <div class="leaderboard-achievements">
          <span class="achievement-count">成就 ${row.achievementCount}/${ACHIEVEMENT_DEFINITIONS.length}</span>
          <div class="achievement-strip">
            ${row.achievementCount
              ? renderAchievementBadges(row.achievements)
              : `<span class="achievement-empty">暂无成就</span>`}
          </div>
        </div>
      </div>
      <div class="leaderboard-score">
        <span>累计返还</span>
        <strong>${escapeHtml(formatPointAmount(row.score))}</strong>
      </div>
      ${isLegendary ? `<span class="leaderboard-legendary-tag">ALL 10</span>` : ""}
    </article>
  `;
}

function formatPointAmount(points) {
  const value = Number(points);
  if (!Number.isFinite(value)) return "0 点";
  const rounded = Math.round(value * 100) / 100;
  return `${new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 2 }).format(rounded)} 点`;
}

function roundPointAmount(value) {
  const points = Number(value);
  if (!Number.isFinite(points)) return Number.NaN;
  return Math.round(points * 100) / 100;
}

function renderPredictionList({ predictions, emptyText, showOwner }) {
  if (state.isLoadingPredictions) return `<div class="empty-list compact-empty">正在加载预测...</div>`;
  if (!predictions.length) return `<div class="empty-list compact-empty">${escapeHtml(emptyText)}</div>`;
  return predictions.map((prediction) => renderPredictionCard(prediction, showOwner)).join("");
}

function renderPredictionCard(prediction, showOwner) {
  const ownerName = getPredictionDisplayName(prediction);
  const predictionMeta = formatPredictionMeta(prediction);
  return `
    <article class="prediction-card ${isComboPrediction(prediction) ? "is-combo" : ""}">
      <div class="prediction-card-head">
        <strong>${escapeHtml(prediction.match_label)}</strong>
        <span>${escapeHtml(formatDate(prediction.match_kickoff_utc))}</span>
      </div>
      <div class="prediction-card-body">
        <span>${escapeHtml(formatPrediction(prediction))}</span>
        ${predictionMeta ? `<span>${escapeHtml(predictionMeta)}</span>` : ""}
      </div>
      <div class="prediction-card-foot">
        <span>${escapeHtml(formatDateFull(prediction.created_at))}</span>
        ${showOwner ? `<span>${escapeHtml(ownerName)}</span>` : ""}
      </div>
    </article>
  `;
}

function formatPrediction(prediction) {
  if (isComboPrediction(prediction)) {
    const legs = normalizeComboLegs(prediction.combo_legs);
    if (legs.length) {
      return `组合：${legs.map(formatComboLeg).join("；")}`;
    }
    return `组合：${cleanText(prediction.model_probability_label) || "多场胜平负"}`;
  }
  if (isScorePrediction(prediction)) {
    const homeScore = Number(prediction.home_score);
    const awayScore = Number(prediction.away_score);
    if (Number.isFinite(homeScore) && Number.isFinite(awayScore)) {
      return `比分 ${homeScore}-${awayScore}`;
    }
  }
  if (prediction.outcome === "home") return `${prediction.home_team} 胜`;
  if (prediction.outcome === "away") return `${prediction.away_team} 胜`;
  return "平局";
}

function isComboPrediction(prediction) {
  return cleanText(prediction?.prediction_type).toLocaleLowerCase() === "combo";
}

function normalizeComboLegs(value) {
  let legs = value;
  if (typeof legs === "string") {
    try {
      legs = JSON.parse(legs);
    } catch {
      return [];
    }
  }
  return Array.isArray(legs) ? legs.filter((leg) => leg && typeof leg === "object") : [];
}

function formatComboLeg(leg) {
  const matchLabel = cleanText(leg.match_label) || `${cleanText(leg.home_team)} vs ${cleanText(leg.away_team)}`;
  const selectionLabel = cleanText(leg.selection_label) || (
    leg.outcome === "home"
      ? `${cleanText(leg.home_team)} 胜`
      : leg.outcome === "away"
        ? `${cleanText(leg.away_team)} 胜`
        : "平局"
  );
  const probability = normalizeStoredProbability(leg.probability);
  return `${matchLabel}：${selectionLabel}${probability === null ? "" : `（${formatPercent(probability)}）`}`;
}

function isScorePrediction(prediction) {
  const type = cleanText(prediction.prediction_type).toLocaleLowerCase();
  if (type === "score") return true;
  if (type === "outcome") return false;
  return hasStoredScore(prediction.home_score) && hasStoredScore(prediction.away_score);
}

function hasStoredScore(value) {
  if (value === null || value === undefined || value === "") return false;
  return Number.isFinite(Number(value));
}

function formatPredictionMeta(prediction) {
  const probability = formatStoredModelProbability(prediction);
  const parts = probability ? [`当时系统概率 ${probability}`] : [];
  const stake = Number(prediction.stake_points);
  if (Number.isFinite(stake) && stake > 0) {
    if (!prediction.settled_at) {
      parts.push(`投入 ${formatPointAmount(stake)} · 待结算`);
    } else if (prediction.is_correct === true) {
      parts.push(`投入 ${formatPointAmount(stake)} · 命中返还 ${formatPointAmount(prediction.payout_points)}`);
    } else {
      parts.push(`投入 ${formatPointAmount(stake)} · 未命中`);
    }
  }
  return parts.join(" · ");
}

function formatStoredModelProbability(prediction) {
  const probability = normalizeStoredProbability(prediction.model_probability);
  return probability === null ? "" : formatPercent(probability);
}

function getPredictionDisplayName(prediction) {
  const displayName = cleanText(prediction.display_name);
  if (displayName && !isInternalAuthEmail(displayName)) return displayName;
  if (prediction.user_id === state.authSession?.user?.id) {
    return getCurrentDisplayName();
  }
  return `用户 ${shortUserId(prediction.user_id)}`;
}

function isInternalAuthEmail(value) {
  return cleanText(value).toLocaleLowerCase().endsWith(INTERNAL_AUTH_EMAIL_DOMAIN);
}

function getVisibleMatches() {
  let matches = getSearchFilteredMatches();
  const ref = state.referenceAt.getTime();

  if (state.view === "upcoming") {
    matches = matches.filter((match) => isUpcomingMatch(match, ref)).sort(sortAscending);
  } else if (state.view === "history") {
    matches = matches.filter((match) => isHistoryMatch(match, ref)).sort(sortDescending);
  } else {
    matches = matches.sort(sortAscending);
  }

  const limit = getVisibleLimit();
  if (Number.isFinite(limit) && state.view !== "all") {
    matches = matches.slice(0, limit);
  }

  return matches;
}

function getVisibleLimit() {
  if (state.limit === "all") return Infinity;
  const limit = Number(state.limit);
  return Number.isFinite(limit) && limit > 0 ? Math.trunc(limit) : 8;
}

function getKickoffTime(match) {
  const time = new Date(match.kickoffUtc).getTime();
  return Number.isFinite(time) ? time : Number.NaN;
}

function isFinishedMatch(match) {
  return match.liveStatus === "FINISHED" && hasResult(match);
}

function isPastUnresolvedMatch(match) {
  if (isFinishedMatch(match) || match.liveStatus === "LIVE") return false;
  const kickoff = getKickoffTime(match);
  return Number.isFinite(kickoff) && kickoff < Date.now() - 30 * 60 * 1000;
}

function isFutureOrLiveMatch(match) {
  if (isFinishedMatch(match)) return false;
  if (match.liveStatus === "LIVE") return true;
  const kickoff = getKickoffTime(match);
  return !Number.isFinite(kickoff) || kickoff >= Date.now();
}

function isAwardSettledMatch(match) {
  if (isFinishedMatch(match)) return true;
  return hasResult(match) && getKickoffTime(match) < Date.now();
}

function isUpcomingMatch(match, referenceMs = state.referenceAt.getTime()) {
  if (isFinishedMatch(match)) return false;
  if (match.liveStatus === "LIVE") return true;
  return getKickoffTime(match) >= referenceMs;
}

function isHistoryMatch(match, referenceMs = state.referenceAt.getTime()) {
  if (isFinishedMatch(match)) return true;
  if (match.liveStatus === "LIVE") return false;
  return getKickoffTime(match) < referenceMs;
}

function getSearchFilteredMatches() {
  const query = state.query.toLocaleLowerCase();
  return state.matches.filter((match) => {
    const groupOk = state.group === "all" || match.group === state.group;
    if (!groupOk) return false;
    if (!query) return true;
    const haystack = [
      match.home,
      match.homeAlt,
      match.homeCode,
      match.away,
      match.awayAlt,
      match.awayCode,
      match.group,
      match.stage,
      match.venue,
    ]
      .filter(Boolean)
      .join(" ")
      .toLocaleLowerCase();
    return haystack.includes(query);
  });
}

function getSelectedMatch() {
  const visible = getVisibleMatches();
  if (!visible.length) return null;
  return visible.find((match) => match.id === state.selectedId) || visible[0];
}

function getTimelineStatus(match) {
  const kickoff = new Date(match.kickoffUtc);
  if (match.liveStatus === "LIVE") {
    return { key: "live", label: "进行中" };
  }
  if (match.liveStatus === "FINISHED" || (kickoff < state.referenceAt && hasResult(match))) {
    return { key: "final", label: "已完赛" };
  }
  if (kickoff < state.referenceAt) {
    return { key: "pending-result", label: "待同步" };
  }
  return { key: "upcoming", label: "未开赛" };
}

function getVisibleResult(match) {
  if (!hasResult(match)) return null;
  if (match.liveStatus === "FINISHED" || match.liveStatus === "LIVE") return match.result;
  if (new Date(match.kickoffUtc) >= state.referenceAt) return null;
  return match.result;
}

function getStatusClass(key) {
  if (key === "final") return "final";
  if (key === "history") return "history";
  if (key === "pending-result") return "pending";
  if (key === "live") return "live";
  return "";
}

function hasResult(match) {
  return (
    match.result &&
    Number.isFinite(Number(match.result.home)) &&
    Number.isFinite(Number(match.result.away))
  );
}

function sortAscending(a, b) {
  return new Date(a.kickoffUtc) - new Date(b.kickoffUtc);
}

function sortDescending(a, b) {
  return new Date(b.kickoffUtc) - new Date(a.kickoffUtc);
}

function getStrongestLean(match) {
  const probability = computeProbability(match);
  const options = [
    { label: `${match.homeCode || "A"}胜`, value: probability.homeWin },
    { label: "平局", value: probability.draw },
    { label: `${match.awayCode || "B"}胜`, value: probability.awayWin },
  ];
  return options.sort((a, b) => b.value - a.value)[0];
}

function computeProbability(match) {
  const homeLambda = safeLambda(match.lambdaHome, 1.25);
  const awayLambda = safeLambda(match.lambdaAway, 1.05);
  const marketWdl = getPolymarketWdl(match);
  const marketExact = getPolymarketExactScore(match);
  const outcome = marketWdl || outcomeFromLambdas(homeLambda, awayLambda);

  const homeExact = poissonDistribution(homeLambda, MAX_EXACT_GOALS);
  const awayExact = poissonDistribution(awayLambda, MAX_EXACT_GOALS);
  const listedScoreKeys = new Set((marketExact?.scores || []).map((score) => scoreKey(score.home, score.away)));
  const listedModelMass = marketExact
    ? marketExact.scores.reduce((sum, score) => sum + poisson(homeLambda, score.home) * poisson(awayLambda, score.away), 0)
    : 0;
  const unlistedModelMass = Math.max(0.000001, 1 - listedModelMass);
  const exactScoreMap = new Map((marketExact?.scores || []).map((score) => [scoreKey(score.home, score.away), score.probability]));
  const matrix = [];
  const topScores = [];
  let gridMass = 0;

  for (let home = 0; home <= MAX_EXACT_GOALS; home += 1) {
    matrix[home] = [];
    for (let away = 0; away <= MAX_EXACT_GOALS; away += 1) {
      const modelProbability = homeExact[home] * awayExact[away];
      const key = scoreKey(home, away);
      const probability =
        exactScoreMap.get(key) ??
        (marketExact && !listedScoreKeys.has(key)
          ? (marketExact.otherProbability * modelProbability) / unlistedModelMass
          : modelProbability);
      gridMass += probability;
      matrix[home][away] = { home, away, probability };
      topScores.push({ home, away, probability });
    }
  }

  topScores.sort((a, b) => b.probability - a.probability);
  const topMax = topScores[0]?.probability || 1;

  return {
    homeWin: outcome.homeWin,
    draw: outcome.draw,
    awayWin: outcome.awayWin,
    matrix,
    gridMass,
    otherScore: Math.max(0, 1 - gridMass),
    topScores: topScores.slice(0, 6).map((score) => ({
      ...score,
      relative: score.probability / topMax,
    })),
  };
}

function outcomeFromLambdas(lambdaHome, lambdaAway) {
  const homeWdl = poissonDistribution(safeLambda(lambdaHome, 1.25), MAX_WDL_GOALS);
  const awayWdl = poissonDistribution(safeLambda(lambdaAway, 1.05), MAX_WDL_GOALS);
  let homeWin = 0;
  let draw = 0;
  let awayWin = 0;
  let mass = 0;

  for (let home = 0; home <= MAX_WDL_GOALS; home += 1) {
    for (let away = 0; away <= MAX_WDL_GOALS; away += 1) {
      const probability = homeWdl[home] * awayWdl[away];
      mass += probability;
      if (home > away) homeWin += probability;
      else if (home === away) draw += probability;
      else awayWin += probability;
    }
  }

  return {
    homeWin: homeWin / mass,
    draw: draw / mass,
    awayWin: awayWin / mass,
  };
}

function getNoVigProbabilities(homeOdds, drawOdds, awayOdds) {
  const odds = [Number(homeOdds), Number(drawOdds), Number(awayOdds)];
  if (!odds.every((value) => Number.isFinite(value) && value > 1)) return null;
  const implied = odds.map((value) => 1 / value);
  const overround = implied.reduce((sum, value) => sum + value, 0);
  if (!Number.isFinite(overround) || overround <= 0) return null;
  return {
    homeWin: implied[0] / overround,
    draw: implied[1] / overround,
    awayWin: implied[2] / overround,
    overround,
  };
}

function estimateLambdasFromOdds(homeOdds, drawOdds, awayOdds) {
  const target = getNoVigProbabilities(homeOdds, drawOdds, awayOdds);
  if (!target) return { lambdaHome: 1.25, lambdaAway: 1.05, error: Infinity };

  let best = searchLambdaGrid(target, 0.2, 3.8, 0.05);
  best = searchLambdaGrid(
    target,
    Math.max(0.05, best.lambdaHome - 0.14),
    Math.min(5, best.lambdaHome + 0.14),
    0.01,
    Math.max(0.05, best.lambdaAway - 0.14),
    Math.min(5, best.lambdaAway + 0.14),
  );
  return best;
}

function estimateLambdasFromProbabilities(homeWin, draw, awayWin) {
  const probabilities = [homeWin, draw, awayWin].map(Number);
  const total = probabilities.reduce((sum, value) => sum + (Number.isFinite(value) && value > 0 ? value : 0), 0);
  if (!Number.isFinite(total) || total <= 0) return { lambdaHome: 1.25, lambdaAway: 1.05, error: Infinity };
  const odds = probabilities.map((value) => (Number.isFinite(value) && value > 0 ? total / value : Infinity));
  return estimateLambdasFromOdds(odds[0], odds[1], odds[2]);
}

function searchLambdaGrid(target, homeMin, homeMax, step, awayMin = homeMin, awayMax = homeMax) {
  let best = { lambdaHome: 1.25, lambdaAway: 1.05, error: Infinity };
  for (let home = homeMin; home <= homeMax + 0.0001; home += step) {
    for (let away = awayMin; away <= awayMax + 0.0001; away += step) {
      const outcome = outcomeFromLambdas(home, away);
      const error =
        (outcome.homeWin - target.homeWin) ** 2 +
        (outcome.draw - target.draw) ** 2 +
        (outcome.awayWin - target.awayWin) ** 2;
      if (error < best.error) {
        best = {
          lambdaHome: Number(home.toFixed(2)),
          lambdaAway: Number(away.toFixed(2)),
          error,
        };
      }
    }
  }
  return best;
}

function scoreProbability(match, homeScore, awayScore) {
  const homeLambda = safeLambda(match.lambdaHome, 1.25);
  const awayLambda = safeLambda(match.lambdaAway, 1.05);
  const modelProbability = poisson(homeLambda, homeScore) * poisson(awayLambda, awayScore);
  const marketExact = getPolymarketExactScore(match);
  if (!marketExact) return modelProbability;

  const explicitScore = marketExact.scores.find((score) => score.home === homeScore && score.away === awayScore);
  if (explicitScore) return explicitScore.probability;

  const listedModelMass = marketExact.scores.reduce(
    (sum, score) => sum + poisson(homeLambda, score.home) * poisson(awayLambda, score.away),
    0,
  );
  const unlistedModelMass = Math.max(0.000001, 1 - listedModelMass);
  return (marketExact.otherProbability * modelProbability) / unlistedModelMass;
}

function getPolymarketWdl(match) {
  const wdl = match?.polymarket?.wdl;
  if (!wdl) return null;
  const homeWin = Number(wdl.homeWin);
  const draw = Number(wdl.draw);
  const awayWin = Number(wdl.awayWin);
  const total = homeWin + draw + awayWin;
  if (![homeWin, draw, awayWin, total].every(Number.isFinite) || total <= 0) return null;
  return {
    homeWin: clampProbability(homeWin / total),
    draw: clampProbability(draw / total),
    awayWin: clampProbability(awayWin / total),
  };
}

function getPolymarketExactScore(match) {
  const exactScore = match?.polymarket?.exactScore;
  if (!exactScore || !Array.isArray(exactScore.scores)) return null;
  const scores = exactScore.scores
    .map((score) => ({
      home: Number(score.home),
      away: Number(score.away),
      probability: Number(score.probability),
    }))
    .filter(
      (score) =>
        Number.isInteger(score.home) &&
        Number.isInteger(score.away) &&
        score.home >= 0 &&
        score.away >= 0 &&
        Number.isFinite(score.probability) &&
        score.probability > 0,
    );
  const otherProbability = Number(exactScore.otherProbability);
  const other = Number.isFinite(otherProbability) ? otherProbability : 0;
  const total = scores.reduce((sum, score) => sum + score.probability, 0) + other;
  if (!scores.length || !Number.isFinite(total) || total <= 0) return null;
  return {
    scores: scores.map((score) => ({ ...score, probability: clampProbability(score.probability / total) })),
    otherProbability: clampProbability(other / total),
  };
}

function scoreKey(home, away) {
  return `${home}-${away}`;
}

function estimateLambdasFromTeamStrength(homeName, awayName) {
  const homeRating = getTeamStrengthRating(homeName);
  const awayRating = getTeamStrengthRating(awayName);
  const homeProfile = getTeamGoalProfile(homeName);
  const awayProfile = getTeamGoalProfile(awayName);
  const ratingDiff = clampNumber((homeRating - awayRating) / 450, -1.4, 1.4);
  const quality = clampNumber(((homeRating + awayRating) / 2 - 1650) / 500, -0.35, 0.35);
  const homeGoalPressure = homeProfile.attack * awayProfile.concede;
  const awayGoalPressure = awayProfile.attack * homeProfile.concede;
  const pressureFactor = clampNumber(Math.sqrt(homeGoalPressure * awayGoalPressure), 0.82, 1.18);
  const tempoFactor = clampNumber(Math.sqrt(homeProfile.tempo * awayProfile.tempo), 0.82, 1.22);
  const styleDiff = Math.log(homeGoalPressure / awayGoalPressure);
  const totalGoals = clampNumber((2.45 + quality * 0.22) * pressureFactor * tempoFactor, 1.65, 3.35);
  const homeShare = clampNumber(0.5 + ratingDiff * 0.13 + styleDiff * 0.18, 0.24, 0.76);
  return {
    lambdaHome: roundToTwo(totalGoals * homeShare),
    lambdaAway: roundToTwo(totalGoals * (1 - homeShare)),
  };
}

function getTeamStrengthRating(name) {
  return TEAM_STRENGTH_RATINGS[cleanText(name)] || 1600;
}

function getTeamGoalProfile(name) {
  return TEAM_GOAL_PROFILES[cleanText(name)] || { attack: 1, concede: 1, tempo: 1 };
}

function poissonDistribution(lambda, maxGoals) {
  return Array.from({ length: maxGoals + 1 }, (_, index) => poisson(lambda, index));
}

function poisson(lambda, goals) {
  if (goals < 0) return 0;
  if (goals === 0) return Math.exp(-lambda);
  let probability = Math.exp(-lambda);
  for (let index = 1; index <= goals; index += 1) {
    probability *= lambda / index;
  }
  return probability;
}

function safeLambda(value, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) return fallback;
  return Math.min(5, Math.max(0.05, number));
}

function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function clampProbability(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.min(1, Math.max(0, number));
}

function roundToTwo(value) {
  return Number(value.toFixed(2));
}

function loadMatches() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return seedMatches.map((match) => ({ ...match }));
    const parsed = JSON.parse(stored);
    const matches = normalizePayload(parsed);
    return matches.length ? matches : seedMatches.map((match) => ({ ...match }));
  } catch {
    return seedMatches.map((match) => ({ ...match }));
  }
}

function loadLiveMeta() {
  try {
    const stored = localStorage.getItem(LIVE_META_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function normalizePayload(payload) {
  const matches = Array.isArray(payload) ? payload : payload?.matches;
  if (!Array.isArray(matches)) return [];
  return matches.map(normalizeMatch).filter(Boolean);
}

function normalizeWorldCup26Payload(payload) {
  const games = Array.isArray(payload) ? payload : payload?.games;
  if (!Array.isArray(games)) return [];
  return games.map(normalizeWorldCup26Game).filter(Boolean);
}

function normalizeWorldCup26Game(game) {
  if (!game || typeof game !== "object") return null;
  const homeEn = cleanText(game.home_team_name_en || game.homeTeam || game.home);
  const awayEn = cleanText(game.away_team_name_en || game.awayTeam || game.away);
  if (!homeEn || !awayEn) return null;

  const kickoff = parseWorldCup26Date(game.local_date, game.stadium_id);
  if (!kickoff) return null;

  const stadium = WORLDCUP26_STADIUMS[Number(game.stadium_id)];
  const result = normalizeWorldCup26Result(game);
  const group = cleanText(game.group);
  const type = cleanText(game.type);
  const stage = type ? toTitle(type.replace(/_/g, " ")) : "World Cup 2026";
  const home = localizeTeamName(homeEn);
  const away = localizeTeamName(awayEn);
  const model = estimateLambdasFromTeamStrength(homeEn, awayEn);

  return {
    id: `worldcup26-${game.id || `${normalizeTeamKey(homeEn)}-${normalizeTeamKey(awayEn)}-${kickoff.toISOString()}`}`,
    kickoffUtc: kickoff.toISOString(),
    stage,
    group: group ? `Group ${group}` : "未分组",
    venue: stadium?.name || cleanText(game.venue) || "",
    home,
    homeAlt: homeEn,
    homeCode: codeFromName(homeEn),
    away,
    awayAlt: awayEn,
    awayCode: codeFromName(awayEn),
    lambdaHome: model.lambdaHome,
    lambdaAway: model.lambdaAway,
    result,
    homeScorers: normalizeWorldCup26Scorers(game.home_scorers),
    awayScorers: normalizeWorldCup26Scorers(game.away_scorers),
    generatedAt: new Date().toISOString(),
    source: "WorldCup26 live API + team strength/style model",
    liveStatus: normalizeWorldCup26Status(game),
    rawLocalDate: cleanText(game.local_date),
  };
}

function normalizeWorldCup26Result(game) {
  const finished = String(game.finished || "").toLowerCase() === "true";
  const home = Number(game.home_score);
  const away = Number(game.away_score);
  if (!finished && (!Number.isFinite(home) || !Number.isFinite(away))) return undefined;
  if (Number.isFinite(home) && Number.isFinite(away)) return { home, away };
  return undefined;
}

function normalizeWorldCup26Scorers(value) {
  const text = cleanText(value);
  if (!text || text.toLowerCase() === "null") return [];
  return text
    .replace(/[{}]/g, "")
    .split(/","|“,”|â€,â€|,/)
    .map(cleanScorerEntry)
    .filter(Boolean);
}

function cleanScorerEntry(value) {
  const text = cleanText(value)
    .replace(/^["'“”â€œâ€]+|["'“”â€œâ€]+$/g, "")
    .replace(/\\"/g, "")
    .replace(/\\u[\dA-Fa-f]{4}/g, "")
    .trim();
  if (!text || /(^|[\s(])og[\s)]|own goal/i.test(text)) return "";
  return text
    .replace(/\([^)]*\b(?:p|pen)\b[^)]*\)/gi, "")
    .replace(/\b\d{1,3}'?\+\d{1,2}'?/g, "")
    .replace(/\b\d{1,3}(?:\+\d{1,2})?'?/g, "")
    .replace(/[()]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeWorldCup26Status(game) {
  const finished = String(game.finished || "").toLowerCase() === "true";
  if (finished) return "FINISHED";
  const elapsed = cleanText(game.time_elapsed).toLowerCase();
  if (elapsed && elapsed !== "notstarted" && elapsed !== "not started") return "LIVE";
  return "SCHEDULED";
}

function parseWorldCup26Date(value, stadiumId) {
  const text = cleanText(value);
  const match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})$/);
  if (!match) return parseLocalDateTime(text);
  const [, month, day, year, hour, minute] = match.map(Number);
  const stadium = WORLDCUP26_STADIUMS[Number(stadiumId)];
  if (!stadium) return new Date(Date.UTC(year, month - 1, day, hour, minute));
  return new Date(Date.UTC(year, month - 1, day, hour, minute) - stadium.offsetMinutes * 60 * 1000);
}

function normalizeOddsEvent(event) {
  if (!event || typeof event !== "object") return null;
  const homeEn = cleanText(event.home_team);
  const awayEn = cleanText(event.away_team);
  const kickoff = new Date(event.commence_time);
  if (!homeEn || !awayEn || Number.isNaN(kickoff.getTime())) return null;

  const odds = extractAverageH2hOdds(event, homeEn, awayEn);
  if (!odds) return null;
  const estimate = estimateLambdasFromOdds(odds.home, odds.draw, odds.away);
  const home = localizeTeamName(homeEn);
  const away = localizeTeamName(awayEn);

  return {
    id: `oddsapi-${event.id || `${normalizeTeamKey(homeEn)}-${normalizeTeamKey(awayEn)}-${kickoff.toISOString()}`}`,
    kickoffUtc: kickoff.toISOString(),
    stage: "World Cup 2026",
    group: "未分组",
    venue: "",
    home,
    homeAlt: homeEn,
    homeCode: codeFromName(homeEn),
    away,
    awayAlt: awayEn,
    awayCode: codeFromName(awayEn),
    lambdaHome: estimate.lambdaHome,
    lambdaAway: estimate.lambdaAway,
    odds,
    generatedAt: getLatestBookmakerUpdate(event) || new Date().toISOString(),
    source: "The Odds API H2H avg",
  };
}

function extractAverageH2hOdds(event, home, away) {
  const buckets = { home: [], draw: [], away: [] };
  (event.bookmakers || []).forEach((bookmaker) => {
    const market = (bookmaker.markets || []).find((item) => item.key === "h2h");
    if (!market) return;
    (market.outcomes || []).forEach((outcome) => {
      const name = normalizeTeamKey(outcome.name);
      const price = Number(outcome.price);
      if (!Number.isFinite(price) || price <= 1) return;
      if (name === normalizeTeamKey(home)) buckets.home.push(price);
      else if (name === normalizeTeamKey(away)) buckets.away.push(price);
      else if (name === "draw" || name === "tie") buckets.draw.push(price);
    });
  });

  if (!buckets.home.length || !buckets.draw.length || !buckets.away.length) return null;
  return {
    home: average(buckets.home),
    draw: average(buckets.draw),
    away: average(buckets.away),
  };
}

function getLatestBookmakerUpdate(event) {
  const timestamps = (event.bookmakers || [])
    .map((bookmaker) => new Date(bookmaker.last_update).getTime())
    .filter(Number.isFinite);
  if (!timestamps.length) return "";
  return new Date(Math.max(...timestamps)).toISOString();
}

function normalizeMatch(raw, index) {
  if (!raw || typeof raw !== "object") return null;
  const homeTeam = readTeam(raw, "home");
  const awayTeam = readTeam(raw, "away");
  const kickoffUtc = raw.kickoffUtc || raw.utcKickoff || raw.kickoff || raw.date;
  const date = new Date(kickoffUtc);
  if (!homeTeam.name || !awayTeam.name || Number.isNaN(date.getTime())) return null;

  const result = normalizeResult(raw.result);
  const odds = normalizeOdds(raw.odds || raw.marketOdds || raw);

  return {
    id: String(raw.id || `${homeTeam.code || homeTeam.name}-${awayTeam.code || awayTeam.name}-${date.toISOString()}-${index}`),
    kickoffUtc: date.toISOString(),
    stage: String(raw.stage || ""),
    group: String(raw.group || "未分组"),
    venue: String(raw.venue || ""),
    home: homeTeam.name,
    homeAlt: homeTeam.alt,
    homeCode: homeTeam.code,
    away: awayTeam.name,
    awayAlt: awayTeam.alt,
    awayCode: awayTeam.code,
    lambdaHome: safeLambda(raw.lambdaHome ?? raw.homeLambda ?? raw.expectedHomeGoals, 1.25),
    lambdaAway: safeLambda(raw.lambdaAway ?? raw.awayLambda ?? raw.expectedAwayGoals, 1.05),
    result,
    homeScorers: normalizeStoredScorers(raw.homeScorers ?? raw.home_scorers),
    awayScorers: normalizeStoredScorers(raw.awayScorers ?? raw.away_scorers),
    odds,
    polymarket: normalizeStoredPolymarket(raw.polymarket),
    generatedAt: raw.generatedAt || raw.snapshotAt || raw.kickoffUtc || date.toISOString(),
    source: String(raw.source || "导入数据"),
    liveStatus: raw.liveStatus ? String(raw.liveStatus) : undefined,
    rawLocalDate: raw.rawLocalDate ? String(raw.rawLocalDate) : undefined,
  };
}

function normalizeStoredScorers(value) {
  if (Array.isArray(value)) return value.map(cleanText).filter(Boolean);
  return normalizeWorldCup26Scorers(value);
}

function readTeam(raw, side) {
  const direct = raw[side];
  const teamKey = raw[`${side}Team`];
  const value = direct ?? teamKey;
  if (value && typeof value === "object") {
    return {
      name: String(value.cn || value.name || value.displayName || ""),
      alt: String(value.en || value.alt || value.shortName || ""),
      code: String(value.code || value.abbreviation || ""),
    };
  }
  return {
    name: String(value || ""),
    alt: String(raw[`${side}Alt`] || ""),
    code: String(raw[`${side}Code`] || ""),
  };
}

function normalizeResult(value) {
  if (!value || typeof value !== "object") return undefined;
  const home = Number(value.home ?? value.homeGoals);
  const away = Number(value.away ?? value.awayGoals);
  if (!Number.isFinite(home) || !Number.isFinite(away)) return undefined;
  return { home, away };
}

function normalizeOdds(value) {
  if (!value || typeof value !== "object") return undefined;
  const home = Number(value.home ?? value.homeWin ?? value.homeOdds);
  const draw = Number(value.draw ?? value.drawOdds);
  const away = Number(value.away ?? value.awayWin ?? value.awayOdds);
  if ([home, draw, away].every((item) => Number.isFinite(item) && item > 1)) {
    return { home, draw, away };
  }
  return undefined;
}

function normalizeStoredPolymarket(value) {
  if (!value || typeof value !== "object") return undefined;
  const wdl = normalizePolymarketWdl(value.wdl);
  const exactScore = normalizePolymarketExactScore(value.exactScore || value.exact_score);
  if (!wdl && !exactScore) return undefined;
  return {
    wdl,
    exactScore,
    matchedBy: cleanText(value.matchedBy),
    kickoffUtc: cleanText(value.kickoffUtc),
  };
}

function importData(event) {
  const [file] = event.target.files;
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      const matches = normalizePayload(parsed);
      if (!matches.length) throw new Error("empty");
      state.matches = matches;
      state.selectedId = null;
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ matches }, null, 2));
      renderGroupOptions();
      render();
    } catch {
      window.alert("数据导入失败：请检查 JSON 结构。");
    } finally {
      els.importFile.value = "";
    }
  });
  reader.readAsText(file);
}

function exportData() {
  const payload = {
    exportedAt: new Date().toISOString(),
    referenceAt: state.referenceAt.toISOString(),
    matches: state.matches,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `worldcup-probabilities-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function getInitialReference() {
  const now = new Date();
  const start = new Date("2026-06-11T00:00:00Z");
  const end = new Date("2026-07-20T00:00:00Z");
  return now >= start && now <= end ? now : new Date(DEMO_REFERENCE_AT);
}

function getSupabaseConfig() {
  const pageConfig = window.WORLD_CUP_LOOKUP_SUPABASE || {};
  return {
    url: pageConfig.url || localStorage.getItem(SUPABASE_URL_STORAGE) || "",
    anonKey: pageConfig.anonKey || localStorage.getItem(SUPABASE_ANON_KEY_STORAGE) || "",
  };
}

function getCurrentDisplayName() {
  return getSessionDisplayName(state.authSession) || cleanText(localStorage.getItem(USERNAME_STORAGE)) || "用户";
}

function getSessionDisplayName(session) {
  const metadata = session?.user?.user_metadata || {};
  return cleanText(metadata.display_name || metadata.username || metadata.name);
}

function isMatchPredictable(match) {
  if (!match) return false;
  const kickoff = new Date(match.kickoffUtc);
  return kickoff > new Date() && match.liveStatus !== "LIVE" && match.liveStatus !== "FINISHED";
}

function shortUserId(value) {
  return String(value || "").slice(0, 8);
}

function parseLocalDateTime(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function cleanText(value) {
  return String(value ?? "").trim();
}

function readPositiveNumber(value, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) return fallback;
  return number;
}

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function codeFromName(name) {
  const mappedCode = TEAM_CODE_OVERRIDES[cleanText(name)];
  if (mappedCode) return mappedCode;
  return cleanText(name)
    .replace(/[^a-z]/gi, "")
    .slice(0, 3)
    .toUpperCase() || "TBD";
}

function localizeTeamName(name) {
  const cleanName = cleanText(name);
  return TEAM_NAME_ZH[cleanName] || cleanName;
}

function toTitle(value) {
  return cleanText(value)
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function getErrorMessage(error) {
  if (error?.name === "AbortError") return "请求超时";
  return error?.message || "未知错误";
}

function teamPair(match) {
  return `${match.homeCode || match.home} vs ${match.awayCode || match.away}`;
}

function formatPercent(value) {
  return `${(value * 100).toFixed(value < 0.01 ? 2 : 1)}%`;
}

function formatNumber(value) {
  return Number(value).toFixed(2);
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return `${new Intl.DateTimeFormat("zh-CN", {
    timeZone: BEIJING_TIME_ZONE,
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    hourCycle: "h23",
  }).format(date)} 北京时间`;
}

function formatDateFull(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return `${new Intl.DateTimeFormat("zh-CN", {
    timeZone: BEIJING_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    hourCycle: "h23",
  }).format(date)} 北京时间`;
}

function toDatetimeLocal(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
  const pad = (number) => String(number).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function toBeijingDatetimeLocal(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
  const parts = getBeijingDateTimeParts(date);
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
}

function parseBeijingDatetimeLocal(value) {
  const text = cleanText(value);
  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);
  if (!match) return parseLocalDateTime(text);
  const [, year, month, day, hour, minute] = match.map(Number);
  return new Date(Date.UTC(year, month - 1, day, hour, minute) - BEIJING_OFFSET_MINUTES * 60 * 1000);
}

function getStartOfBeijingDay(date) {
  const parts = getBeijingDateTimeParts(date);
  return new Date(
    Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day), 0, 0) -
      BEIJING_OFFSET_MINUTES * 60 * 1000,
  );
}

function getBeijingDateTimeParts(date) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: BEIJING_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    hourCycle: "h23",
  });
  const parts = Object.fromEntries(formatter.formatToParts(date).map((part) => [part.type, part.value]));
  return {
    year: parts.year,
    month: parts.month,
    day: parts.day,
    hour: parts.hour === "24" ? "00" : parts.hour,
    minute: parts.minute,
  };
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[char];
  });
}
