# 世界杯比分概率查询

一个静态单页原型，用来查询世界杯比赛的胜平负概率、具体比分概率、后续几场比赛、历史赛前概率，以及金球奖、金靴奖、金手套奖的滚动概率。页面也支持实时同步赛程/比分、新增/编辑比赛、录入赛果、导入导出 JSON，以及用十进制胜平负赔率反推期望进球。

## 运行

直接在浏览器打开 `index.html` 即可。也可以在本目录启动任意静态服务器。

## 稳定发布

这是纯静态站点，适合发布到 GitHub Pages、Netlify、Vercel 或 Cloudflare Pages。

- GitHub Pages：把仓库推到 GitHub，在 Pages 设置里选择从 `main` 分支根目录发布。
- Netlify：导入仓库即可，`netlify.toml` 已设置 `publish = "."`。
- Vercel：按静态项目导入仓库即可，无需构建命令。
- Cloudflare Pages：导入仓库，构建命令留空，输出目录填 `.`。

不要使用 localtunnel/ngrok 作为正式发布方式；它们依赖本机进程和临时隧道，稳定性不足。

## 用户预测后端

用户名密码注册/登录、我的历史预测、用户预测、奖项预测和预测排行榜需要 Supabase。

1. 创建 Supabase 项目。
2. 在 Supabase SQL Editor 运行 `supabase/schema.sql`。已经建过表时也可以重新运行，它会补齐新增字段。
3. 在 `supabase-config.js` 填入项目的 URL 和 anon key，然后重新发布。
4. Supabase Auth 里启用 Email provider，并关闭 Confirm email。
5. 如需自动同步服务端概率和结算点数，在 GitHub 仓库的 Actions secrets 里添加 `SUPABASE_SERVICE_ROLE_KEY`。它来自 Supabase Project Settings 的 service role secret，只能放在 GitHub Secrets，不能写进前端代码或仓库。`SUPABASE_URL` 可选；不填时会使用 `supabase-config.js` 里的项目 URL。

权限设计：

- 用户只能通过安全 RPC 提交或更新自己的比赛预测，不能绕过扣点直接写预测表或点数账户。
- 用户可以读取自己的全部预测。
- 登录用户可以读取所有预测；未登录用户不能查看用户预测和排行榜。
- 每个用户对每场比赛只有一条预测；重复提交会更新原记录。
- 每个用户对金球奖、金靴奖、金手套奖各有一条预测；重复提交会更新原记录。
- 预测记录会保存提交时系统给出的胜平负或比分概率，用于历史记录回看。
- 管理员为用户增加或扣除点数，每次调整都会写入点数流水。新用户初始为 0 点。
- 用户提交比赛预测时分配本次投入点数，提交后立即扣除。命中时返还 `投入点数 / 提交时概率`，未命中不返还；返还包含原投入。例如投入 10 点、概率 25%，命中返还 40 点。
- 更新尚未开赛的预测时，系统会先退回原投入，再扣除新投入。旧预测不会补扣点，也不参与点数结算。
- 比赛概率由 GitHub Actions 或管理员同步到 Supabase，数据库提交 RPC 使用服务端概率快照，不采信浏览器自行传入的概率。
- 累计返还排行榜只统计预测结算返还，按累计返还点数排序；管理员分配点数、当前余额、投入点数和命中次数都不参与排行。
- 奖项预测目前不投入点数，因为金球奖、金靴奖、金手套奖要到赛事结束后才有官方赛果。
- 所有预测都会公开展示，不再支持非公开预测；重新运行 SQL 会把旧的非公开记录改成公开。
- 用户界面只显示用户名和密码。前端会把用户名映射成内部邮箱交给 Supabase Auth，用户不需要输入真实邮箱；自定义用户名会单独保存在 `user_profiles`，不会因为清空预测记录而丢失。

## 管理员

`supabase/schema.sql` 会创建管理员名单和安全 RPC。重新运行 SQL 后，名单里的管理员登录页面即可看到管理员面板，可以查看用户及余额、增加或扣除点数、查看预测记录、清空预测，并删除旧用户账号。清空预测时，尚未结算的投入会自动退回。

## 实时数据

页面顶部“实时数据”面板支持两个来源：

- `同步赛程/比分`：调用 `https://worldcup26.ir/get/games`，把比赛、比分、完赛/进行中状态合并进本地数据。这个源不需要 API key，但属于第三方免费接口，可能偶发请求失败。
- `同步赔率`：调用 The Odds API 的 `/v4/sports/{sportKey}/odds`，默认 sport key 是 `soccer_fifa_world_cup`，市场为 `h2h`，赔率格式为 decimal。需要输入自己的 The Odds API key，key 只保存在浏览器 `localStorage`，不会写入源码。

同步逻辑：

- 赛程/比分同步会尽量保留本地已有 `lambdaHome/lambdaAway` 和赔率。
- 赔率同步会聚合同一场比赛多个 bookmaker 的 1X2 赔率均值，去水后反推 `lambdaHome/lambdaAway`。
- 如果接口失败，页面会保留现有本地数据并在实时状态栏显示错误。
- GitHub Actions 每 5 分钟刷新 `data/worldcup26-games.json` 和 Polymarket 缓存；配置 `SUPABASE_SERVICE_ROLE_KEY` 后，还会同步服务端概率快照，并把已完赛比分写入 Supabase。赛果写入后会自动结算点数，赛果更正时也会自动调整已返还点数。
- 奖项概率由前端根据当前赛程缓存滚动计算：金靴主要使用进球者和剩余赛程，金球综合进球贡献和球队走势，金手套使用球队失球、零封和剩余赛程。赛程/比分同步后，这三项概率会随比赛进程更新。

## 数据结构

页面内置的是演示数据。真实接入时建议从赛程、赔率或自有模型生成同样结构的 JSON，然后用页面右上角导入按钮加载。

```json
{
  "matches": [
    {
      "id": "argentina-austria-2026-06-22",
      "kickoffUtc": "2026-06-22T17:00:00Z",
      "stage": "First Stage",
      "group": "Group J",
      "venue": "Dallas Stadium",
      "home": "阿根廷",
      "homeAlt": "Argentina",
      "homeCode": "ARG",
      "away": "奥地利",
      "awayAlt": "Austria",
      "awayCode": "AUT",
      "lambdaHome": 1.92,
      "lambdaAway": 0.94,
      "odds": {
        "home": 1.72,
        "draw": 3.80,
        "away": 5.20
      },
      "generatedAt": "2026-06-22T10:00:00Z",
      "source": "赛前模型"
    }
  ]
}
```

历史比赛可以增加赛果：

```json
"result": { "home": 3, "away": 0 }
```

## 概率模型

当前版本用 `lambdaHome` 和 `lambdaAway` 作为两队期望进球，按独立 Poisson 分布计算：

- 胜平负概率：枚举 0-12 球比分并归一化。
- 具体比分概率：直接计算 `P(homeGoals) * P(awayGoals)`。
- 比分矩阵：默认展示 0-6 球区间，并单独显示其他比分概率。

如果后续接入博彩赔率，可以先把 1X2 赔率去水后映射为胜平负概率，再用优化方法反推 `lambdaHome/lambdaAway`，保持前端展示层不变。

页面里的“赔率估算”就是这个流程：

1. 输入十进制主胜、平局、客胜赔率。
2. 用 `1 / odds` 计算隐含概率，并按总和归一化去水。
3. 在合理的主客队 xG 网格里搜索，使 Poisson 模型的胜平负概率尽量贴近去水后的 1X2 概率。
4. 保存估算出的 `lambdaHome/lambdaAway`，随后所有比分概率都会自动刷新。
