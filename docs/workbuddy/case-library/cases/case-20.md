# Case 20｜告别群接龙！AI 3 分钟生成专业活动报名页

> **WorkBuddy 案例集 · 第 20 篇**
> 分类：网站与应用开发

---

## 一、场景描述

下周想组织一场马拉松约跑，一想到要在微信群接龙统计报名信息，头都大了——翻聊天记录找报名信息、统一杂乱的格式、手动数人数…果断放弃，打开 WorkBuddy 试了试，没想到彻底解决了这个痛点。

群接龙有 3 个致命痛点：① 信息易刷屏，想查某个人是否报名得翻几十条聊天记录；② 格式不统一，有人写"张三+1"，有人写"1人 张三"，统计超费劲；③ 数据易出错，手动数人数人多必错，核对起来耗时长。

用 WorkBuddy 生成报名落地页，扫码即报，数据自动汇总到腾讯文档，全程零代码，免费部署永久可用。仅 2 分钟，一个完整的报名落地页就生成好了，还自动启动本地服务让我实时预览。

## 二、想要完成的任务

用 WorkBuddy 3 分钟内生成一个马拉松约跑活动的专业报名落地页，配合腾讯文档收集表实现数据自动汇总，并通过 GitHub + Cloudflare Pages 免费部署上线，全程零代码、零成本。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| WorkBuddy 对话生成 HTML | 自然语言描述需求，生成包含 Hero/数据栏/亮点/时间线/报名区/FAQ 的报名落地页 | 内置能力 | WorkBuddy 账号 |
| 代码执行能力（Bash） | 启动本地服务实时预览生成的 HTML 页面 | 内置能力 | 本地端口、命令执行 |
| 腾讯文档收集表 | 用户扫码填写报名信息，数据实时汇总并支持导出 Excel | 第三方工具 | 腾讯文档账号 |
| GitHub + Cloudflare Pages | 免费部署静态页面，永久访问 | 第三方平台 | GitHub、Cloudflare 账号 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 已注册腾讯文档账号（用于创建收集表）
3. 已注册 GitHub 账号并有一个可用仓库（用于部署）
4. 已注册 Cloudflare 账号并开通 Pages 服务
5. 已明确活动信息（名称、时间、地点、目标受众、亮点、报名方式）
6. 本机可访问 localhost 端口用于实时预览

## 五、在 WorkBuddy 中的操作

### 步骤 1：描述需求生成报名页
我对 WorkBuddy 说：「请帮我设计一个用于马拉松约跑活动的报名落地页，整体风格现代、专业，突出报名入口、活动亮点和用户信任感，并生成可直接预览的页面。」WorkBuddy 立刻精准追问核心信息：活动名称/时间/地点、目标受众、活动核心亮点、报名方式。
**关键步骤**：用一段自然语言描述需求（活动类型 + 风格 + 重点模块 + 预览要求），AI 反问 4 项核心信息。

### 步骤 2：补充核心信息
我补充完需求：「线下马拉松约跑，面向跑步爱好者，周六日早上在体育馆举办，支持表单填写或扫码报名。」仅 2 分钟，一个完整的报名落地页就生成好了，还自动启动本地服务让我实时预览。
**关键步骤**：补充活动 4 项核心信息，AI 在 2 分钟内生成完整 HTML 并启动本地预览。

### 步骤 3：WorkBuddy 生成完整报名页模块
生成的马拉松报名页包含 6 大模块：① Hero 区域（醒目活动标题+主视觉）；② 数据栏（参与人数、活动天数等关键数据可视化）；③ 活动亮点（6 个卡片清晰展示活动特色）；④ 时间流程（可视化时间线，活动安排一目了然）；⑤ 报名区（二维码+报名须知，引导用户快速报名）；⑥ FAQ（常见问题解答，减少用户咨询量）。只需把后续生成的腾讯文档二维码替换进去，页面就完成了。
**关键步骤**：AI 自动生成 6 大模块的完整 HTML，替换腾讯文档二维码即可上线。

### 步骤 4：创建腾讯文档收集表（数据自动汇总）
报名页的二维码指向腾讯文档"收集表"，用户扫码填写信息，数据实时汇总，再也不用手动统计。
- 打开腾讯文档 docs.qq.com
- 新建 → 收集表
- 设置收集字段（姓名、电话、参加人数、是否有跑步经验等）
- 发布后一键生成二维码/分享链接
核心优势：用户微信内直接填写无需跳转、数据实时同步支持一键导出 Excel、有人报名时微信自动提醒。
**关键步骤**：在腾讯文档 1 分钟创建收集表，发布生成二维码，替换到报名页报名区。

### 步骤 5：GitHub + Cloudflare Pages 免费部署上线
将 WorkBuddy 生成的 HTML 文件上传到 GitHub 仓库，Cloudflare Pages 关联该仓库，可选设置自定义域名（无域名也可直接用 cloudflare 默认域名）。后续更新页面只需推送代码到 GitHub，Cloudflare 自动部署，地址永久有效。
**关键步骤**：GitHub 上传 HTML → Cloudflare Pages 关联仓库 → 自动部署获得永久访问地址。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `请帮我设计一个用于马拉松约跑活动的报名落地页，整体风格现代、专业，突出报名入口、活动亮点和用户信任感，并生成可直接预览的页面。` | 触发 WorkBuddy 反问核心信息 |
| 2 | `线下马拉松约跑，面向跑步爱好者，周六日早上在体育馆举办，支持表单填写或扫码报名。` | 补充活动信息，触发 AI 2 分钟生成完整 HTML |
| 3 | （腾讯文档操作）`新建 → 收集表 → 设置字段 → 发布 → 生成二维码` | 创建数据收集表，替换到报名页 |
| 4 | （GitHub + Cloudflare）`上传 HTML → 关联仓库 → 自动部署` | 免费部署上线，获得永久访问地址 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 一个包含 6 大模块的马拉松约跑报名落地页（HTML 文件）
2. 一份腾讯文档收集表（含二维码，数据实时汇总）
3. 一个永久可访问的线上地址（GitHub + Cloudflare Pages 部署）
4. 完整的用户端 + 组织者端使用流程

### 结果证明

![请帮我设计一个用于活动报名的落地页](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRNrBIv7wtUjTa22wnia3sQLsd56AEiboopFbLldN6ibSrrFq7jnFAolGHpcUmIhWZTWUDc4lNegmzibCGTq45Xf21yLFq67Cia1bpM0/640?wx_fmt=png&from=appmsg#imgIndex=0)

![WorkBuddy 追问核心信息](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbROy2uY8XUdlFAfEdtJR5jDqBOAuShET40SMSz6vksnN5MoQZ9cibwgjOzU17Np6QBXxWlfUUPLBncaxsCUAGVG6c6PBEJCPgv9w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

![任务列表完成](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRNyx0Loic7R6Q33ibT5kjXhKra5hs5l86LOocL8bqZ9PIDygLsH3N0UFAGl1nhntGvlNFM8ibHJZ9ibydiamR1Aria3aGiboiaoCGTnLRw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

![马拉松报名页预览](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbROPiaYq7zHVp4miaLNWwjfUEPznCXyt8rJ6ibVzYZMbe7s9BW87c4xZs6bbnK4dmJP5lYmhCfG4SDexmcnQg9YuMxeCUYKQsn0IP0/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

![跑步爱好者专属活动页面](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbROmkPXExdmun2PNJMdVA6hTyvjZs5UOfDqibXhA24LTUouGydkiaLNZE4xIdIPh8Ym7dcX1SQRV6yOkYVAELia6mCIMENSYxBOAoA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

![腾讯文档收集表](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRNudiacUoTCMficiaA2HhIx4xvy18xLibBe7gzANwQWclm8pdBfJQDeoqzzpDw4OHPLk4X2JUvXLZcCmhxMVwn2vdN1Su0gU8zyib9E/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

![跑步报名表二维码](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRPR2Xfsahv87I3EgCW40f9xLnvgszP5Nz8t8AMkSCZePtLyibnIQdIRXicMfalUkibJgIgC3T2Go7aoZhPdUtiaugPhibGVX4uhuLWY/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

![手机端预览效果](https://mmbiz.qpic.cn/mmbiz_jpg/s516EMWvbRNCZfjh8pibIdH1jnMaNdKDVkv6xC77VYz6tbOrVqt9YPKBQhehkUCib0t4smXvmpOfwS1uoHLGB5xgSPdUdiaLSme1RCS4otXbFM/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=7)

### 核心优势对比

| 维度 | 群接龙 | WorkBuddy 报名页 |
|---|---|---|
| 生成时间 | 数小时（找模板改代码） | 2 分钟 |
| 视觉效果 | 信息刷屏、混乱 | 现代、专业、模块清晰 |
| 数据统计 | 手动数人数易错 | 自动汇总+实时提醒 |
| 数据导出 | 手动复制 | 一键导出 Excel |
| 用户查询 | 翻几十条聊天记录 | 扫码即查 |
| 部署成本 | 免费 | 免费（GitHub + Cloudflare + 腾讯文档） |

### 用户端流程（不到 1 分钟）
1. 扫码查看活动介绍+报名须知
2. 点主按钮跳转腾讯文档填写信息
3. 提交完成，无需反复确认

### 组织者端流程
1. 腾讯文档实时查看报名数据，无需手动整理
2. 一键导出 Excel，快速统计人数/联系方式
3. 微信实时提醒新报名，及时跟进

## 八、验收标准

- [ ] WorkBuddy 接收一段自然语言需求后能反问 4 项核心信息（活动名称/时间/地点、目标受众、亮点、报名方式）
- [ ] 补充信息后 2 分钟内生成完整 HTML 报名页
- [ ] 生成的页面包含 6 大模块（Hero、数据栏、活动亮点、时间流程、报名区、FAQ）
- [ ] 自动启动本地服务支持实时预览
- [ ] 腾讯文档收集表创建成功，发布生成二维码
- [ ] 收集表字段完整（姓名、电话、参加人数、是否有跑步经验等）
- [ ] 二维码已替换到报名页报名区
- [ ] HTML 已上传 GitHub 并通过 Cloudflare Pages 部署上线
- [ ] 部署地址永久可访问（如 https://panda.yaniw.com/marathon-signup）
- [ ] 用户微信内扫码可直接填写，数据实时汇总
- [ ] 有人报名时微信自动提醒，支持一键导出 Excel
- [ ] 全程零代码、零成本
