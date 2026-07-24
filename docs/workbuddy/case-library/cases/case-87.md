# Case 87｜写了3个月流水账，让AI帮我看了一眼后台数据

> **WorkBuddy 案例集 · 第 87 篇**
> 分类：数据分析与可视化

---

## 一、场景描述

写公众号快 3-4 个月了，100 多篇文章堆在那儿，想知道整体阅读量什么水平、每月波动大不大、哪些方向选题读者更愿意点开看。微信公众号后台没有全局视图，只能一篇一篇点进去看，100 多篇点完手都酸了。本篇记录如何用 WorkBuddy 浏览器自动化扫码登录公众号后台，自动翻页爬 194 条发表记录原始数据，按「WorkBuddy 100 种用法」系列筛选 86 篇，算出总阅读/篇均/中位数/TOP 10 爆款/月度趋势/阅读量分布，再把整个流程封装成 Skill，下次一句话搞定。

## 二、想要完成的任务

使用 WorkBuddy 浏览器自动化扫码登录微信公众号后台，去「内容管理 → 发表记录」页面翻页爬全部 194 条记录（含 read_num/share_num/old_like_num/comment_num/line_info.line_count/reward_money 字段），筛选「WorkBuddy 100 种用法」系列 86 篇做数据分析（总阅读/篇均/中位数/TOP 10/月度趋势/分布），把整个能力封装成 Skill（支持指定日期/标题/区间），生成 HTML 可视化报告。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| 浏览器自动化（Playwright） | 扫码登录公众号后台，翻页爬发表记录数据 | WorkBuddy 内置 | WorkBuddy 账号 |
| 自封装 Skill wechat-article-stats | 按日期/标题/区间筛选公众号文章统计数据 | WorkBuddy Skill 打包 | WorkBuddy 账号 |
| frontend-design | 生成 HTML 可视化报告（暖调编辑风格） | WorkBuddy 内置 | WorkBuddy 账号 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 有微信公众号账号（管理员或运营者权限）
3. 微信可扫码登录公众平台
4. 公众号已有发表记录（非空账号）

## 五、在 WorkBuddy 中的操作

### 步骤 1：说一句话触发数据抓取
跟 WorkBuddy 说「你能统计我的公众号文章阅读情况，并做简单的分析吗？」。WorkBuddy 立刻问数据怎么来——微信公众号后台没有开放 API 给普通用户，WorkBuddy 提出三种方案：扫码登录、手动导出 Excel、用 AppID/AppSecret 调 API。选第一个扫码登录。
**关键步骤**：WorkBuddy 提供三种数据来源方案，选「浏览器扫码登录」。

### 步骤 2：扫码登录自动翻页
桌面弹出 Chromium 窗口，里面是微信公众平台的登录二维码。微信扫码确认登录，浏览器进后台。WorkBuddy 去「内容管理 → 发表记录」页面——这里有全部已发布文章原始数据：阅读、分享、点赞、留言、划线、赞赏全都有。一页一页把数据拉下来，194 条记录，跑了大概两三分钟全拿到。原始 JSON 每篇一条，字段含 read_num、share_num、old_like_num（真实点赞藏在这里不是 like_num）、comment_num、line_info.line_count、reward_money。
**关键步骤**：扫码登录后台，翻页爬 194 条发表记录原始 JSON。

### 步骤 3：按系列筛选 + 数据分析
按「WorkBuddy 100 种用法」系列筛选 86 篇。核心数据：系列文章 86 篇（#1~#86 无缺失）、总阅读 92000+、总分享 10500+、总点赞 1499、篇均阅读 1074、阅读中位数 607。篇均 1074 vs 中位数 607 差了将近一倍，说明少数几篇拉高了整体。TOP 3：#18 接入 Gemma 4（16679 阅读 2339 分享）、#15 豆包 Seed 生视频（13251 阅读 1889 分享）、#34 股票研究专家（4526 阅读 535 分享）。月度趋势：4 月篇均 2036 → 5 月 794 → 6 月 526，日更稀释了单篇曝光窗口。阅读分布：69% 文章在 300-800 之间，超过 1200 的只有 12 篇，超过 3000 的 5 篇。
**关键步骤**：筛选 86 篇算出总阅读 92000+ / 篇均 1074 / 中位数 607 / TOP 10 / 月度趋势 / 分布。

### 步骤 4：封装成 Skill
整个过程非常曲折——HttpOnly Cookie 怎么拿、分页怎么处理、publish_page 字段要二次 JSON 解析、真实点赞藏在哪个字段。如果硬写死下次再跑又得改。干脆让 WorkBuddy 把这个能力封装成 Skill：`~/.workbuddy/skills/wechat-article-stats/`。内部两阶段流程：① 抓取（Playwright 自动登后台翻页拉原始数据 → wechat-raw-articles.json）；② 分析（按日期/标题/合集筛选 → HTML 报告 + CSV + JSON）。封装完后下次只需要一句话：「统计公众号 6 月份的文章阅读量」「分析 WorkBuddy 100 种用法系列的数据」「查一下公众号 5 月 1 号到 6 月 20 号的数据」。Skill 自己判断有没有登录态，没有就弹浏览器扫码，有就直接抓。
**关键步骤**：封装 wechat-article-stats Skill，支持按日期/标题/区间触发，两阶段流程抓取 + 分析。

### 步骤 5：生成 HTML 可视化报告
WorkBuddy 把数据生成 HTML 报告，KPI 卡片、TOP 榜单、月度趋势柱状图、完整明细表都有。原始版朴素，让它用暖调编辑风格重新设计一版：暖奶油底色 + 焦橙主色 + 纸纹质感，数据展示变成数据杂志的样子。
**关键步骤**：frontend-design 生成暖调编辑风格 HTML 报告（暖奶油底 + 焦橙主色 + 纸纹质感）。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `你能统计我的公众号文章阅读情况，并做简单的分析吗？` | 触发数据抓取需求 |
| 2 | `1浏览器扫码登录(推荐)` | 选扫码登录方案 |
| 3 | `能把这个功能封装成一个skill吗？能指定日期或者指定区间，或者指定标题` | 封装成可重复调用 Skill |
| 4 | `统计公众号数据，最近30天的` | 触发已封装 Skill |
| 5 | `统计 #50 到 #86 的数据` | 按标题区间筛选 |
| 6 | `统计4月1号到6月25号的` | 按日期区间筛选 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 86 篇「WorkBuddy 100 种用法」系列原始数据 JSON（含 6 个字段 read_num/share_num/old_like_num/comment_num/line_count/reward_money）
2. 数据分析结果（总阅读 92000+ / 篇均 1074 / 中位数 607 / TOP 10 / 月度趋势 / 分布）
3. 可重复调用 Skill：wechat-article-stats（支持按日期/标题/区间触发）
4. HTML 可视化报告（暖调编辑风格：暖奶油底 + 焦橙主色 + 纸纹质感）

### 结果证明

![触发统计需求](/images/workbuddy-cases/case-87/01.png)

![三种数据来源方案](/images/workbuddy-cases/case-87/02.png)

![弹出 Chromium 扫码登录](/images/workbuddy-cases/case-87/03.png)

![自动翻页爬 194 条记录](/images/workbuddy-cases/case-87/04.png)

![核心数据速览表](/images/workbuddy-cases/case-87/05.png)

![TOP 10 阅读量条形图](/images/workbuddy-cases/case-87/06.png)

![月度阅读趋势图](/images/workbuddy-cases/case-87/07.png)

![阅读量分布饼图](/images/workbuddy-cases/case-87/08.png)

![封装成 Skill 介绍](/images/workbuddy-cases/case-87/09.png)

![一句话触发已封装 Skill](/images/workbuddy-cases/case-87/10.png)

![HTML 可视化报告暖调编辑风格](/images/workbuddy-cases/case-87/11.png)

## 八、验收标准

- [ ] 已选「浏览器扫码登录」方案
- [ ] 桌面弹出 Chromium 窗口显示公众平台二维码
- [ ] 微信扫码确认登录后进入后台
- [ ] 已去「内容管理 → 发表记录」页面
- [ ] 194 条发表记录全部爬完
- [ ] 原始 JSON 含字段 read_num、share_num、old_like_num（真实点赞）、comment_num、line_info.line_count、reward_money
- [ ] 已按「WorkBuddy 100 种用法」系列筛选出 86 篇（#1~#86 无缺失）
- [ ] 总阅读 92000+
- [ ] 总分享 10500+
- [ ] 篇均阅读 1074
- [ ] 阅读中位数 607
- [ ] TOP 3：#18 接入 Gemma 4（16679 阅读）/ #15 豆包 Seed 生视频（13251 阅读）/ #34 股票研究专家（4526 阅读）
- [ ] 月度趋势：4 月篇均 2036 → 5 月 794 → 6 月 526
- [ ] 阅读分布：69% 文章在 300-800 之间
- [ ] 超过 1200 阅读的只有 12 篇，超过 3000 的 5 篇
- [ ] 已封装 Skill 到 `~/.workbuddy/skills/wechat-article-stats/`
- [ ] Skill 支持按日期、标题、区间筛选
- [ ] Skill 内部两阶段流程：抓取（Playwright） + 分析（HTML+CSV+JSON）
- [ ] 已生成 HTML 可视化报告（暖奶油底 + 焦橙主色 + 纸纹质感）
- [ ] 下次一句话即可触发（如「统计公众号 6 月份的文章阅读量」）
