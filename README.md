# 世界杯比分概率查询

一个静态单页原型，用来查询世界杯比赛的胜平负概率、具体比分概率、后续几场比赛和历史赛前概率。页面也支持实时同步赛程/比分、新增/编辑比赛、录入赛果、导入导出 JSON，以及用十进制胜平负赔率反推期望进球。

## 运行

直接在浏览器打开 `index.html` 即可。也可以在本目录启动任意静态服务器。

## 稳定发布

这是纯静态站点，适合发布到 GitHub Pages、Netlify、Vercel 或 Cloudflare Pages。

- GitHub Pages：把仓库推到 GitHub，在 Pages 设置里选择从 `main` 分支根目录发布。
- Netlify：导入仓库即可，`netlify.toml` 已设置 `publish = "."`。
- Vercel：按静态项目导入仓库即可，无需构建命令。
- Cloudflare Pages：导入仓库，构建命令留空，输出目录填 `.`。

不要使用 localtunnel/ngrok 作为正式发布方式；它们依赖本机进程和临时隧道，稳定性不足。

## 实时数据

页面顶部“实时数据”面板支持两个来源：

- `同步赛程/比分`：调用 `https://worldcup26.ir/get/games`，把比赛、比分、完赛/进行中状态合并进本地数据。这个源不需要 API key，但属于第三方免费接口，可能偶发请求失败。
- `同步赔率`：调用 The Odds API 的 `/v4/sports/{sportKey}/odds`，默认 sport key 是 `soccer_fifa_world_cup`，市场为 `h2h`，赔率格式为 decimal。需要输入自己的 The Odds API key，key 只保存在浏览器 `localStorage`，不会写入源码。

同步逻辑：

- 赛程/比分同步会尽量保留本地已有 `lambdaHome/lambdaAway` 和赔率。
- 赔率同步会聚合同一场比赛多个 bookmaker 的 1X2 赔率均值，去水后反推 `lambdaHome/lambdaAway`。
- 如果接口失败，页面会保留现有本地数据并在实时状态栏显示错误。

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
