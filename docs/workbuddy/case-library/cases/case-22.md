# Case 22｜一句话召唤 AI 团队，多 Agent 协作效率直接拉满

> **WorkBuddy 案例集 · 第 22 篇**
> 分类：多 Agent 协作与团队

---

## 一、场景描述

30 分钟搞定一篇带 5 张配图+定制封面的公众号文章，我只说了一句话。今天这篇文章，从资料搜集、正文写作到封面设计，全程由 WorkBuddy 多 Agent 协作完成。

用过 AI 的人几乎都踩过这些坑：长文翻译越翻越乱，前后术语不统一；批量配图要一张一张等，像排队等外卖；又写又画又查资料，AI 忙不过来，效率上不去。核心原因：单 Agent 只能串行干活，一件做完才能做下一件。就像一个人身兼写稿、设计、调研，再厉害也快不起来。

WorkBuddy 的多 Agent 协作模式，相当于你当老板，AI 组建团队。你只发一次指令，多个 AI 同时干活——主 Agent（项目经理）拆解任务、分发、汇总；研究员 Agent 搜集资料、整理要点；写作 Agent 撰写正文、优化表达；设计 Agent 生成封面、批量配图。全员并行，同步产出，主 Agent 统一审核、合并、交付给你。

## 二、想要完成的任务

用 WorkBuddy 多 Agent 协作模式，一句话启动并完成一篇公众号文章的资料搜集、正文写作、5 张封面图 HTML 设计与批量截图，全程并行执行。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| 多 Agent 协作能力 | 主 Agent 拆解任务，并行调度研究员/写手/封面设计子 Agent | 内置能力 | WorkBuddy 账号 |
| code-explorer 子代理 | 研究员 Agent，读取历史文章、代码库翻译技能文档、图片生成技能文档 | 内置子代理 | WorkBuddy 账号 |
| 封面设计子 Agent | 并行生成 5 张封面图 HTML（紫/橙/绿/赛博/蓝 5 种风格） | 内置子代理 | WorkBuddy 账号 |
| Playwright 批量截图 | 将 5 张 HTML 封面同时截图为 PNG | 内置能力 | 本地 Python 环境 |
| 写手子 Agent | 根据研究员结果+发布风格撰写公众号文章 | 内置子代理 | WorkBuddy 账号 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 已有可访问的历史文章/代码库供研究员 Agent 参考
3. 本机已安装 Python3 与 Playwright（用于批量截图）
4. 已明确文章主题、配图数量与风格要求
5. 理解发布类操作不能并行（微信 API 频率限制，逐篇确认）

## 五、在 WorkBuddy 中的操作

### 步骤 1：一句话启动多 Agent 协作
我对 WorkBuddy 说："比如说我今天想一篇新的公众号内容 workbuddy100 种用法 #22 举例说明 workBuddy 如何使用多 agent 要求图文并茂。的文章，就写这篇文章来，如何使用多 agent 进行处理？"WorkBuddy 自动设计工作流：主 Agent（我）→ 子 Agent 研究员（搜索 WorkBuddy 多 Agent 相关资料、实际案例）→ 子 Agent 写手（根据研究结果+发布风格写第 22 篇文章）→ 子 Agent 封面设计（并行生成 5 张封面图 HTML）→ 主 Agent 汇总，等我确认内容后再选封面、截图、发布。
**关键步骤**：一句话描述需求，WorkBuddy 自动拆解为研究+写作+封面设计三条任务线。

### 步骤 2：并行启动研究员与封面设计子 Agent
现在同时启动研究员和封面设计两个子 Agent：研究员搜集 WorkBuddy 多 Agent 能力资料（读了 21 篇历史文章、代码库翻译技能文档、图片生成技能文档，整理出完整写作参考文档）；封面设计 Agent 同时并行生成 5 张封面图 HTML（紫/橙/绿/赛博/蓝 5 种风格）。并行的部分：研究+写作（有依赖，写手等研究员出结果）、封面设计（独立，可以完全并行）。串行的部分：你确认内容→你选封面→截图→发布。
**关键步骤**：研究员与封面设计两个子 Agent 并行执行，写手等研究员结果后再启动。

### 步骤 3：写手 Agent 根据研究结果撰写文章
研究员子 Agent 的资料收集完毕后，写手 Agent 接收研究结果撰写第 22 篇文章。同时并行进行的是封面设计 Agent 生成 5 张封面 HTML 文件：2026-04-22-multiagent-style1-purple.html、style2-orange.html、style3-green.html、style4-cyber.html、style5-blue.html。文章和 5 张封面全部生成完毕后，开始并行截图。
**关键步骤**：写手 Agent 基于研究结果生成 workbuddy-100-022-multi-agent.md，封面设计 Agent 并行生成 5 张 HTML。

### 步骤 4：并行批量截图并汇总成果
使用 Playwright 批量截图生成 5 张封面 PNG，命令通过 Python 脚本一次性执行。全部完成后，主 Agent 把结果汇报给你：研究员 Agent 读了 21 篇历史文章、代码库翻译技能文档、图片生成技能文档，整理出完整写作参考文档；封面设计 Agent 以封面生成任务并行进行，5 张封面同时生成。文章已生成，路径为 /post-to-wechat/workbuddy-100-022-multi-agent.md。
**关键步骤**：Playwright 并行截图 5 张封面 PNG，主 Agent 汇总并交付。

### 步骤 5：用户确认内容后选封面并发布
你确认文章内容→选封面→截图→发布。注意：发布环节不能并行，因为微信 API 有调用频率限制、草稿箱不能同时推多篇容易混淆、需要逐篇确认内容才能发。多 Agent 的价值主要在内容生产阶段。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `比如说我今天想一篇新的公众号内容 workbuddy100 种用法 #22 举例说明 workBuddy 如何使用多 agent 要求图文并茂。的文章，就写这篇文章来，如何使用多 agent 进行处理？` | 一句话启动多 Agent，自动拆解研究+写作+封面设计任务 |
| 2 | （自动执行）`同时启动研究员和封面设计两个子 Agent` | 并行执行资料收集与封面 HTML 生成 |
| 3 | （自动执行）`写手 Agent 根据研究结果写第 22 篇文章` | 研究完成后，写手撰写正文 |
| 4 | （自动执行）`python3 批量截图生成 5 张封面 PNG` | Playwright 并行截图 5 张封面 |
| 5 | （用户操作）`确认内容 → 选封面 → 截图 → 发布` | 串行环节，逐篇确认后发布 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 一篇完整的公众号文章（workbuddy-100-022-multi-agent.md）
2. 5 张不同风格的封面图 HTML（紫/橙/绿/赛博/蓝）
3. 5 张封面 PNG 截图
4. 完整的研究参考资料文档

### 结果证明

![用户询问多 Agent 工作流程](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRMt3qw2VhAULu6uhLBnVhrl3piadPMuGHgjRfJJdKMbyicquzlzFAgwnT41DpmngjhTkgfRmF7ATibX4uwkkczuRKDibPCtTHBflPA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

![多 Agent 协作模式说明与限制](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbROPHm0tKajArhxpCfo7Jw0Nic4BCPoOiavpF1XRlWXRUFPM6icOOdTFSecNia8ViaCWDKdNGMZGrbic89WLXYUIYAaAAicfT9m6JWqxqM/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

![翻译 5 段内容单 Agent 串行 vs 多 Agent 并行效率对比](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbROe7jVTqD4dZEGYItQSUye5HNrQ97GvxTrvsQoA8sicCnTicvxPDGoFicibOoHvxay8njkbg89V09LCRRuicSBPkiadoYDdSBb75KfYs/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

![一句话启动多 Agent 并行执行任务列表](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbROia5d06I9QYxLHOqqDtxlaGWJbicfmia1OWuxThxKN0ebXfbRT0rXBtc6Nta00xxib2BI4kcDGS2ECgHxLibErQLdn9qF1dq6ZvFV4/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

![研究员与封面设计 Agent 并行成果汇报](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbROV7mtVY8WeHyianSce1W1ibrKsKr1bVT6RSWsXuRYtGSoia5NzpjSyONBeLZLKT7EyQiaS1L6j41Yv7mHjSwAaDicjcnTaWeQDCQv8/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

### 单 Agent vs 多 Agent 对比表

| 维度 | 单 Agent | 多 Agent |
|---|---|---|
| 速度 | 串行排队，慢 | 并行同步，快 |
| 一致性 | 长文易"失忆"，前后不一 | 共享规则，全程统一 |
| 复杂任务 | 上下文越长越容易崩 | 分工明确，小任务更稳定 |
| 你的操作 | 一句话 | 一句话，零学习成本 |
| 5 张图总耗时 | 约 5 分钟 | 约 1 分钟 |
| 风格统一度 | 靠记忆，容易偏差 | 共享规则，高度统一 |

### 3 个让多 Agent 效率拉满的技巧
1. 只说"要什么"，不说"怎么做"——错误：先写文章，再配图，最后做封面；正确：帮我写一篇文章，配 5 张图+1 张封面，图文并茂
2. 任务越多、越长、越重复，多 Agent 越值钱——短文本差别不大，长文翻译、批量配图、批量生成优势爆炸
3. 发布类操作别并行——发文、发邮件、提交报告等必须一步步确认，避免重复操作

## 八、验收标准

- [ ] 一句话指令能触发 WorkBuddy 自动拆解为研究+写作+封面设计三条任务线
- [ ] 研究员 Agent 能读取历史文章、代码库技能文档并整理写作参考文档
- [ ] 封面设计 Agent 能并行生成 5 张不同风格的封面图 HTML
- [ ] 写手 Agent 能基于研究结果撰写完整公众号文章（.md 文件）
- [ ] Playwright 能批量截图 5 张封面 HTML 为 PNG
- [ ] 主 Agent 能汇总并汇报各子 Agent 的成果
- [ ] 5 张封面总耗时约 1 分钟（vs 单 Agent 约 5 分钟）
- [ ] 发布环节保持串行，逐篇确认后再发布
- [ ] 全程用户只需一句话启动，零学习成本
