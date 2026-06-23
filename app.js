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
const THE_ODDS_API_BASE = "https://api.the-odds-api.com/v4";
const DEMO_REFERENCE_AT = "2026-06-22T16:00:00Z";
const MAX_EXACT_GOALS = 6;
const MAX_WDL_GOALS = 12;
const SHOW_ADMIN_TOOLS = false;
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

const state = {
  matches: loadMatches(),
  view: "upcoming",
  query: "",
  group: "all",
  limit: "5",
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
  authStatus: "未连接 Supabase",
  authNotice: "",
  predictionNotice: "",
  myPredictions: [],
  publicPredictions: [],
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
  usernameInput: document.getElementById("usernameInput"),
  passwordInput: document.getElementById("passwordInput"),
  loginButton: document.getElementById("loginButton"),
  registerButton: document.getElementById("registerButton"),
  signOutButton: document.getElementById("signOutButton"),
  refreshPredictionsButton: document.getElementById("refreshPredictionsButton"),
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
  els.referenceInput.value = toDatetimeLocal(state.referenceAt);
  if (SHOW_ADMIN_TOOLS && els.oddsApiKeyInput && els.oddsSportKeyInput && els.oddsRegionSelect) {
    els.oddsApiKeyInput.value = localStorage.getItem(ODDS_API_KEY_STORAGE) || "";
    els.oddsSportKeyInput.value = localStorage.getItem(ODDS_SPORT_KEY_STORAGE) || "soccer_fifa_world_cup";
    els.oddsRegionSelect.value = localStorage.getItem(ODDS_REGION_STORAGE) || "us";
  }
  const supabaseConfig = getSupabaseConfig();
  els.usernameInput.value = localStorage.getItem(USERNAME_STORAGE) || "";
  renderGroupOptions();
  bindEvents();
  render();
  if (supabaseConfig.url && supabaseConfig.anonKey) {
    connectSupabase();
  }
}

function bindEvents() {
  els.searchInput.addEventListener("input", (event) => {
    state.query = event.target.value.trim();
    state.selectedId = null;
    render();
  });

  els.referenceInput.addEventListener("change", (event) => {
    const nextDate = new Date(event.target.value);
    if (Number.isNaN(nextDate.getTime())) return;
    state.referenceAt = nextDate;
    state.selectedId = null;
    render();
  });

  els.groupFilter.addEventListener("change", (event) => {
    state.group = event.target.value;
    state.selectedId = null;
    render();
  });

  els.limitSelect.addEventListener("change", (event) => {
    state.limit = event.target.value;
    render();
  });

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
    if (!event.target.matches("[data-score-input]")) return;
    const value = Number(event.target.value);
    if (!Number.isFinite(value)) return;
    const clipped = Math.max(0, Math.min(12, Math.trunc(value)));
    if (event.target.dataset.scoreInput === "home") state.scoreHome = clipped;
    if (event.target.dataset.scoreInput === "away") state.scoreAway = clipped;
    renderDetail(getSelectedMatch());
  });

  els.matchDetail.addEventListener("change", (event) => {
    if (!event.target.matches("[name='predictionType']")) return;
    const form = event.target.closest("[data-prediction-form]");
    if (!form) return;
    form.dataset.predictionType = event.target.value;
  });

  els.matchDetail.addEventListener("click", handleDetailAction);
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
  renderSummary();
  renderList();
  renderDetail(getSelectedMatch());
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

async function syncWorldCupSchedule() {
  state.isSyncingSchedule = true;
  state.notice = "";
  state.liveMeta.lastError = "";
  renderLiveStatus();

  try {
    const payload = await fetchJson(WORLDCUP26_GAMES_URL);
    const liveMatches = normalizeWorldCup26Payload(payload);
    if (!liveMatches.length) throw new Error("接口没有返回可识别的比赛数据");

    const summary = mergeMatches(liveMatches, { preserveModel: true });
    const syncedAt = new Date().toISOString();
    state.liveMeta = {
      ...state.liveMeta,
      scheduleSyncedAt: syncedAt,
      scheduleSource: WORLDCUP26_GAMES_URL,
      lastError: "",
      lastScheduleCount: liveMatches.length,
    };
    state.notice = `赛程/比分同步完成：新增 ${summary.added} 场，更新 ${summary.updated} 场。`;
    state.view = "all";
    persistLiveMeta();
    persistMatches();
    renderGroupOptions();
  } catch (error) {
    const message = getErrorMessage(error);
    state.liveMeta = { ...state.liveMeta, lastError: `赛程同步失败：${message}` };
    state.notice = `赛程同步失败：${message}`;
    persistLiveMeta();
  } finally {
    state.isSyncingSchedule = false;
    render();
  }
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
    state.authSession = data.session;
    if (data.session) await saveUserProfile();
    state.authStatus = data.session ? `已进入：${getCurrentDisplayName()}` : "Supabase 已连接";
    state.authNotice = "";

    if (state.authSubscription) state.authSubscription.unsubscribe();
    const { data: listener } = state.supabase.auth.onAuthStateChange((_event, session) => {
      state.authSession = session;
      state.authStatus = session ? `已进入：${getCurrentDisplayName()}` : "Supabase 已连接";
      state.authNotice = "";
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
    state.authSession = data.session;
    if (data.session) await saveUserProfile(credentials.username);
    state.authNotice = data.session
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
    state.authSession = data.session;
    if (data.session) await saveUserProfile(credentials.username);
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
  state.authSession = null;
  state.myPredictions = [];
  resetAdminState();
  state.authNotice = error ? state.authNotice : "已退出。";
  await loadPredictions();
}

async function submitPrediction(match) {
  if (!state.supabase || !state.authSession?.user) {
    state.predictionNotice = "请先登录后再提交预测。";
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
  let { error } = await state.supabase
    .from("predictions")
    .upsert(payload, { onConflict: "user_id,match_id" });

  if (error && isPredictionProbabilitySchemaError(error)) {
    const legacyPayload = stripPredictionProbabilitySnapshot(payload);
    const legacyResult = await state.supabase
      .from("predictions")
      .upsert(legacyPayload, { onConflict: "user_id,match_id" });
    error = legacyResult.error;
    if (!error) {
      state.predictionNotice = "预测已保存。请重新运行 supabase/schema.sql 后，新的预测记录会保存当时系统概率。";
      await loadPredictions();
      return;
    }
  }

  if (error) {
    state.predictionNotice = `预测提交失败：${error.message}`;
    render();
    return;
  }
  state.predictionNotice = "预测已保存。";
  await loadPredictions();
}

function buildPredictionPayload(match, formData) {
  const predictionType = cleanText(formData.get("predictionType"));
  const isPublic = formData.get("isPublic") === "on";
  const base = {
    user_id: state.authSession.user.id,
    match_id: match.id,
    match_kickoff_utc: new Date(match.kickoffUtc).toISOString(),
    match_label: `${match.home} vs ${match.away}`,
    home_team: match.home,
    away_team: match.away,
    display_name: getCurrentDisplayName(),
    prediction_type: predictionType,
    is_public: isPublic,
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
  return `u_${hashString(username.toLocaleLowerCase())}${INTERNAL_AUTH_EMAIL_DOMAIN}`;
}

function hashString(value) {
  let hash = 2166136261;
  for (const char of value) {
    hash ^= char.codePointAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

async function loadPredictions() {
  if (!state.supabase) {
    state.myPredictions = [];
    state.publicPredictions = [];
    resetAdminState();
    render();
    return;
  }
  state.isLoadingPredictions = true;
  renderAuthStatus();

  const publicQuery = state.supabase
    .from("predictions")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: false })
    .limit(500);

  const myQuery = state.authSession?.user
    ? state.supabase
        .from("predictions")
        .select("*")
        .eq("user_id", state.authSession.user.id)
        .order("created_at", { ascending: false })
        .limit(500)
    : Promise.resolve({ data: [], error: null });

  const [publicResult, myResult] = await Promise.all([publicQuery, myQuery]);
  state.isLoadingPredictions = false;

  if (publicResult.error || myResult.error) {
    state.authNotice = `读取预测失败：${publicResult.error?.message || myResult.error?.message}`;
  } else {
    state.publicPredictions = publicResult.data || [];
    state.myPredictions = myResult.data || [];
  }
  await loadAdminData();
  render();
}

async function loadAdminData(options = {}) {
  if (!state.supabase?.rpc || !state.authSession?.user) {
    resetAdminState();
    return;
  }

  state.isLoadingAdmin = true;
  if (options.force) renderAdminPanel();

  const adminResult = await state.supabase.rpc("is_admin");
  if (adminResult.error || !adminResult.data) {
    resetAdminState();
    return;
  }

  state.isAdmin = true;
  const usersResult = await state.supabase.rpc("admin_list_users");
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

async function loadAdminUserPredictions(userId) {
  if (!state.supabase?.rpc || !state.isAdmin || !userId) {
    state.adminPredictions = [];
    return;
  }
  const result = await state.supabase.rpc("admin_list_user_predictions", { target_user_id: userId });
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

function createSupabaseRestClient(projectUrl, apiKey) {
  const baseUrl = projectUrl.replace(/\/+$/, "");
  const sessionKey = `${SUPABASE_SESSION_STORAGE}:${baseUrl}`;
  const listeners = new Set();

  const getStoredSession = () => {
    try {
      const stored = localStorage.getItem(sessionKey);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };

  const notify = (event, session) => {
    listeners.forEach((listener) => listener(event, session));
  };

  const saveSession = (session, event = "SIGNED_IN") => {
    if (session) localStorage.setItem(sessionKey, JSON.stringify(session));
    else localStorage.removeItem(sessionKey);
    notify(event, session);
  };

  const request = async (path, options = {}) => {
    const session = getStoredSession();
    const response = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${session?.access_token || apiKey}`,
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
    const text = await response.text();
    const payload = text ? JSON.parse(text) : null;
    if (!response.ok) {
      throw new Error(payload?.error_description || payload?.error || payload?.msg || payload?.message || `HTTP ${response.status}`);
    }
    return payload;
  };

  return {
    auth: {
      async getSession() {
        return { data: { session: getStoredSession() }, error: null };
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
      async signUp({ email, password }) {
        try {
          const payload = await request("/auth/v1/signup", {
            method: "POST",
            body: JSON.stringify({ email, password }),
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
      async signOut() {
        try {
          await request("/auth/v1/logout", { method: "POST" });
        } catch {
          // A local sign-out is still valid when the remote token is already expired.
        }
        saveSession(null, "SIGNED_OUT");
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
      const data = text ? JSON.parse(text) : null;
      if (!response.ok) {
        throw new Error(data?.error_description || data?.error || data?.message || data?.msg || `HTTP ${response.status}`);
      }
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
}

function normalizeSupabaseSession(payload) {
  if (!payload?.access_token) return null;
  const expiresAt =
    payload.expires_at ||
    (payload.expires_in ? Math.floor(Date.now() / 1000) + Number(payload.expires_in) : null);
  return {
    access_token: payload.access_token,
    refresh_token: payload.refresh_token || "",
    token_type: payload.token_type || "bearer",
    expires_in: payload.expires_in || null,
    expires_at: expiresAt,
    user: payload.user || decodeJwtUser(payload.access_token),
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

async function fetchJson(url) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 18000);
  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    window.clearTimeout(timeoutId);
  }
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

function mergeMatch(existing, incoming, preserveModel) {
  const keepExistingModel = preserveModel && !incoming.odds;
  return {
    ...existing,
    ...incoming,
    id: existing.id || incoming.id,
    lambdaHome: keepExistingModel ? existing.lambdaHome : incoming.lambdaHome,
    lambdaAway: keepExistingModel ? existing.lambdaAway : incoming.lambdaAway,
    odds: incoming.odds || existing.odds,
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
  const kickoff = parseLocalDateTime(formData.get("kickoffUtc"));
  const generatedAt = parseLocalDateTime(formData.get("generatedAt")) || new Date();
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
  const searchable = getSearchFilteredMatches();
  const upcoming = searchable.filter((match) => new Date(match.kickoffUtc) >= state.referenceAt);
  const history = searchable.filter((match) => new Date(match.kickoffUtc) < state.referenceAt);
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
        <h2 class="section-title">胜平负概率</h2>
        <div class="prob-bars">
          ${renderProbabilityBar(`${match.homeCode || "A"} 胜`, probability.homeWin, "home")}
          ${renderProbabilityBar("平局", probability.draw, "draw")}
          ${renderProbabilityBar(`${match.awayCode || "B"} 胜`, probability.awayWin, "away")}
        </div>

        <div class="top-scores">
          <h2 class="section-title">最可能比分</h2>
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
        ${renderInput("开赛时间", "kickoffUtc", toDatetimeLocal(new Date(match.kickoffUtc)), "datetime-local")}
        ${renderInput("概率快照", "generatedAt", toDatetimeLocal(new Date(match.generatedAt || match.kickoffUtc)), "datetime-local")}
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
  const disabled = !user || !state.supabase || !canPredict;
  const disabledAttr = disabled ? "disabled" : "";
  const status = !state.supabase
    ? "未连接 Supabase"
    : !user
      ? "登录后可提交预测"
      : !canPredict
        ? "比赛已开始或已完赛"
        : "可提交或更新预测";

  return `
    <form class="prediction-form" data-prediction-form data-prediction-type="outcome">
      <div class="prediction-form-head">
        <h2 class="section-title">提交预测</h2>
        <span>${escapeHtml(status)}</span>
      </div>
      ${state.predictionNotice ? `<div class="prediction-notice">${escapeHtml(state.predictionNotice)}</div>` : ""}
      <div class="prediction-controls">
        <label>
          类型
          <select name="predictionType" ${disabledAttr}>
            <option value="outcome">胜平负</option>
            <option value="score">具体比分</option>
          </select>
        </label>
        <label data-outcome-prediction-field>
          胜平负
          <select name="outcome" ${disabledAttr}>
            <option value="home">${escapeHtml(match.homeCode || "A")} 胜</option>
            <option value="draw">平局</option>
            <option value="away">${escapeHtml(match.awayCode || "B")} 胜</option>
          </select>
        </label>
        <label data-score-prediction-field>
          A队进球
          <input name="predictedHomeScore" type="number" min="0" max="20" step="1" value="1" ${disabledAttr} />
        </label>
        <label data-score-prediction-field>
          B队进球
          <input name="predictedAwayScore" type="number" min="0" max="20" step="1" value="1" ${disabledAttr} />
        </label>
        <label class="public-toggle">
          <input name="isPublic" type="checkbox" ${disabledAttr} />
          公开
        </label>
        <button type="button" class="action-button primary prediction-submit" data-action="submit-prediction" ${disabledAttr}>提交</button>
      </div>
    </form>
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

function renderPredictionLists() {
  if (els.leaderboardList) els.leaderboardList.innerHTML = renderLeaderboard();
  els.myPredictionsList.innerHTML = renderPredictionList({
    predictions: state.myPredictions,
    emptyText: state.authSession?.user ? "还没有预测记录" : "登录后查看自己的历史预测",
    showOwner: false,
  });
  els.publicPredictionsList.innerHTML = renderPredictionList({
    predictions: state.publicPredictions,
    emptyText: state.supabase ? "暂无公开预测" : "连接 Supabase 后查看公开预测",
    showOwner: true,
  });
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
        <span>预测 ${Number(user.prediction_count || 0)} · 公开 ${Number(user.public_prediction_count || 0)} · 私密 ${Number(user.private_prediction_count || 0)}</span>
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
  const records = state.adminPredictions.length
    ? state.adminPredictions.map((prediction) => renderPredictionCard(prediction, false)).join("")
    : `<div class="empty-list compact-empty">这个用户没有预测记录</div>`;

  return `
    <div class="admin-user-summary">
      <div>
        <strong>${escapeHtml(user.username || `用户 ${shortUserId(user.user_id)}`)}</strong>
        <span>注册 ${escapeHtml(formatDateFull(user.auth_created_at))}</span>
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
  if (state.isLoadingPredictions) return `<div class="empty-list compact-empty">正在加载排行榜...</div>`;
  if (!state.supabase) return `<div class="empty-list compact-empty">连接 Supabase 后查看排行榜</div>`;

  const rows = buildLeaderboardRows();
  if (!rows.length) return `<div class="empty-list compact-empty">暂无已结算的公开预测</div>`;

  return rows.map(renderLeaderboardRow).join("");
}

function buildLeaderboardRows() {
  const users = new Map();
  getUniquePredictions(state.publicPredictions)
    .filter((prediction) => prediction.is_public)
    .forEach((prediction) => {
      const assessment = assessPrediction(prediction);
      if (!assessment) return;

      const userId = prediction.user_id || getPredictionDisplayName(prediction);
      if (!users.has(userId)) {
        users.set(userId, {
          userId,
          displayName: getPredictionDisplayName(prediction),
          correct: 0,
          total: 0,
          latestAt: "",
        });
      }

      const row = users.get(userId);
      row.correct += assessment.correct ? 1 : 0;
      row.total += 1;
      row.latestAt = maxDateString(row.latestAt, prediction.created_at);
      const displayName = getPredictionDisplayName(prediction);
      if (displayName && !isFallbackUserName(displayName)) row.displayName = displayName;
    });

  return [...users.values()]
    .filter((row) => row.total > 0)
    .map((row) => ({
      ...row,
      accuracy: row.correct / row.total,
    }))
    .sort((a, b) =>
      b.accuracy - a.accuracy ||
      b.correct - a.correct ||
      b.total - a.total ||
      new Date(b.latestAt) - new Date(a.latestAt),
    )
    .slice(0, 20);
}

function renderLeaderboardRow(row, index) {
  return `
    <article class="leaderboard-row">
      <span class="leaderboard-rank">#${index + 1}</span>
      <strong>${escapeHtml(row.displayName)}</strong>
      <span class="leaderboard-accuracy">${formatPercent(row.accuracy)}</span>
      <span class="leaderboard-record">命中 ${row.correct}/${row.total}</span>
    </article>
  `;
}

function getUniquePredictions(predictions) {
  const map = new Map();
  predictions.forEach((prediction) => {
    const key = prediction.id || `${prediction.user_id || ""}:${prediction.match_id || ""}`;
    if (!map.has(key)) map.set(key, prediction);
  });
  return [...map.values()];
}

function assessPrediction(prediction) {
  const match = findMatchById(prediction.match_id);
  const result = getFinalResultForLeaderboard(match);
  if (!result) return null;
  return { correct: isPredictionCorrect(prediction, result) };
}

function findMatchById(matchId) {
  return state.matches.find((match) => match.id === matchId);
}

function getFinalResultForLeaderboard(match) {
  if (!match || !hasResult(match) || match.liveStatus === "LIVE") return null;
  const result = getVisibleResult(match);
  if (!result) return null;
  return {
    home: Number(result.home),
    away: Number(result.away),
  };
}

function isPredictionCorrect(prediction, result) {
  if (prediction.prediction_type === "score") {
    return Number(prediction.home_score) === result.home && Number(prediction.away_score) === result.away;
  }
  return prediction.outcome === getOutcomeFromResult(result);
}

function getOutcomeFromResult(result) {
  if (result.home > result.away) return "home";
  if (result.home < result.away) return "away";
  return "draw";
}

function maxDateString(a, b) {
  if (!a) return b || "";
  if (!b) return a;
  return new Date(a) > new Date(b) ? a : b;
}

function isFallbackUserName(value) {
  return cleanText(value).startsWith("用户 ");
}

function renderPredictionList({ predictions, emptyText, showOwner }) {
  if (state.isLoadingPredictions) return `<div class="empty-list compact-empty">正在加载预测...</div>`;
  if (!predictions.length) return `<div class="empty-list compact-empty">${escapeHtml(emptyText)}</div>`;
  return predictions.map((prediction) => renderPredictionCard(prediction, showOwner)).join("");
}

function renderPredictionCard(prediction, showOwner) {
  const ownerName = getPredictionDisplayName(prediction);
  return `
    <article class="prediction-card">
      <div class="prediction-card-head">
        <strong>${escapeHtml(prediction.match_label)}</strong>
        <span>${escapeHtml(formatDate(prediction.match_kickoff_utc))}</span>
      </div>
      <div class="prediction-card-body">
        <span>${escapeHtml(formatPrediction(prediction))}</span>
        <span>${escapeHtml(formatPredictionMeta(prediction))}</span>
      </div>
      <div class="prediction-card-foot">
        <span>${escapeHtml(formatDateFull(prediction.created_at))}</span>
        ${showOwner ? `<span>${escapeHtml(ownerName)}</span>` : ""}
      </div>
    </article>
  `;
}

function formatPrediction(prediction) {
  if (prediction.prediction_type === "score") {
    return `比分 ${prediction.home_score}-${prediction.away_score}`;
  }
  if (prediction.outcome === "home") return `${prediction.home_team} 胜`;
  if (prediction.outcome === "away") return `${prediction.away_team} 胜`;
  return "平局";
}

function formatPredictionMeta(prediction) {
  const parts = [prediction.is_public ? "公开" : "私密"];
  const probability = formatStoredModelProbability(prediction);
  if (probability) parts.push(`当时系统概率 ${probability}`);
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
    matches = matches.filter((match) => new Date(match.kickoffUtc).getTime() >= ref).sort(sortAscending);
  } else if (state.view === "history") {
    matches = matches.filter((match) => new Date(match.kickoffUtc).getTime() < ref).sort(sortDescending);
  } else {
    matches = matches.sort(sortAscending);
  }

  if (state.limit !== "all" && state.view !== "all") {
    matches = matches.slice(0, Number(state.limit));
  }

  return matches;
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
    return { key: "history", label: "历史" };
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
  const outcome = outcomeFromLambdas(homeLambda, awayLambda);

  const homeExact = poissonDistribution(homeLambda, MAX_EXACT_GOALS);
  const awayExact = poissonDistribution(awayLambda, MAX_EXACT_GOALS);
  const matrix = [];
  const topScores = [];
  let gridMass = 0;

  for (let home = 0; home <= MAX_EXACT_GOALS; home += 1) {
    matrix[home] = [];
    for (let away = 0; away <= MAX_EXACT_GOALS; away += 1) {
      const probability = homeExact[home] * awayExact[away];
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
  return poisson(homeLambda, homeScore) * poisson(awayLambda, awayScore);
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
  const home = cleanText(game.home_team_name_en || game.homeTeam || game.home);
  const away = cleanText(game.away_team_name_en || game.awayTeam || game.away);
  if (!home || !away) return null;

  const kickoff = parseWorldCup26Date(game.local_date, game.stadium_id);
  if (!kickoff) return null;

  const stadium = WORLDCUP26_STADIUMS[Number(game.stadium_id)];
  const result = normalizeWorldCup26Result(game);
  const group = cleanText(game.group);
  const type = cleanText(game.type);
  const stage = type ? toTitle(type.replace(/_/g, " ")) : "World Cup 2026";

  return {
    id: `worldcup26-${game.id || `${normalizeTeamKey(home)}-${normalizeTeamKey(away)}-${kickoff.toISOString()}`}`,
    kickoffUtc: kickoff.toISOString(),
    stage,
    group: group ? `Group ${group}` : "未分组",
    venue: stadium?.name || cleanText(game.venue) || "",
    home,
    homeAlt: home,
    homeCode: codeFromName(home),
    away,
    awayAlt: away,
    awayCode: codeFromName(away),
    lambdaHome: 1.25,
    lambdaAway: 1.05,
    result,
    generatedAt: new Date().toISOString(),
    source: "WorldCup26 live API",
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
  if (!stadium) return new Date(year, month - 1, day, hour, minute);
  return new Date(Date.UTC(year, month - 1, day, hour, minute) - stadium.offsetMinutes * 60 * 1000);
}

function normalizeOddsEvent(event) {
  if (!event || typeof event !== "object") return null;
  const home = cleanText(event.home_team);
  const away = cleanText(event.away_team);
  const kickoff = new Date(event.commence_time);
  if (!home || !away || Number.isNaN(kickoff.getTime())) return null;

  const odds = extractAverageH2hOdds(event, home, away);
  if (!odds) return null;
  const estimate = estimateLambdasFromOdds(odds.home, odds.draw, odds.away);

  return {
    id: `oddsapi-${event.id || `${normalizeTeamKey(home)}-${normalizeTeamKey(away)}-${kickoff.toISOString()}`}`,
    kickoffUtc: kickoff.toISOString(),
    stage: "World Cup 2026",
    group: "未分组",
    venue: "",
    home,
    homeAlt: home,
    homeCode: codeFromName(home),
    away,
    awayAlt: away,
    awayCode: codeFromName(away),
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
    odds,
    generatedAt: raw.generatedAt || raw.snapshotAt || raw.kickoffUtc || date.toISOString(),
    source: String(raw.source || "导入数据"),
    liveStatus: raw.liveStatus ? String(raw.liveStatus) : undefined,
    rawLocalDate: raw.rawLocalDate ? String(raw.rawLocalDate) : undefined,
  };
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
    url: localStorage.getItem(SUPABASE_URL_STORAGE) || pageConfig.url || "",
    anonKey: localStorage.getItem(SUPABASE_ANON_KEY_STORAGE) || pageConfig.anonKey || "",
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
  return cleanText(name)
    .replace(/[^a-z]/gi, "")
    .slice(0, 3)
    .toUpperCase() || "TBD";
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
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function formatDateFull(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZoneName: "short",
  }).format(date);
}

function toDatetimeLocal(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
  const pad = (number) => String(number).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
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
