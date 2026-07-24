# Case 52｜一个人怎么变成一支团队？多Agent模式完全指南

> **WorkBuddy 案例集 · 第 52 篇**
> 分类：多Agent协作与团队

---

## 一、场景描述

社群里有人问："WorkBuddy 有多 Agent 模式吗？多 agent 怎么分角色？"并让出个具体案例。这个问题确实值得单独写一篇——因为多 Agent 可能是 WorkBuddy 里最被大家忽略的能力。好多人用了很久都不知道，自己其实已经用过了。实际上当你在 WorkBuddy 里说"帮我看看这个项目结构"时，背后会自动派子 Agent 去扫描文件、搜索关键词、理解逻辑，最后把结果汇总回来。整个过程你是无感的。

## 二、想要完成的任务

搞清楚 WorkBuddy 多 Agent 模式的几种用法，并用两个具体案例验证：一是用一句话让 AI 同时干两件不依赖的事（查竞品+写 HTML），二是创建一个虚拟团队（调研员+写手+审查员）协作完成一个 AI 工具排行榜文章项目。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| 自动子 Agent（Explore/Plan/general-purpose/Fork） | 无感并行处理任务 | WorkBuddy 内置 | WorkBuddy 账号 |
| 并行子 Agent | 多个不依赖任务同时执行 | WorkBuddy 内置 | WorkBuddy 账号 |
| Team 模式（虚拟团队） | 不同专业角色分工协作 | WorkBuddy 内置 | WorkBuddy 账号 |
| 工具调用面板 | 查看不同 Agent 名称和工作状态 | WorkBuddy 内置 | WorkBuddy 账号 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 任务涉及搜索/写文件等操作需要对应权限

## 五、在 WorkBuddy 中的操作

### 步骤 1：感知多 Agent 在工作
感知信号有四个：速度明显变快、回复分了好几段、工具面板里出现 Explore/general-purpose 等不同 Agent 名称、Fork 模式最明显（继承了完整对话上下文）。
**关键步骤**：看一眼工具面板就知道是单 Agent 还是多 Agent 在工作。

### 步骤 2：方式一——一句话让 AI 同时干两件事
指令："帮我同时做两件事：1）搜一下 2026 年最热门的 3 个 AI 记账 App，列出特色功能；2）帮我写一个 HTML 页面，做一个简单的记账表单"
两个子 Agent 各干各的——一个去搜竞品，一个去写代码，最后两份结果几乎一起返回。关键词是"同时"或"并行"。
**关键步骤**：加"同时"或"并行"两个字触发并行子 Agent。

### 步骤 3：方式二——创建一个虚拟团队
指令：
```
帮我创建一个团队，3 个角色：
1. 调研员：搜索「2026年最受欢迎的AI工具排行榜」，整理成表格
2. 写手：根据调研结果写一篇 1000 字的公众号文章草稿
3. 审查员：检查文章有没有错别字和逻辑问题
三个人同时开工，最后汇总给我。
```
工具调用面板出现三个不同 Agent 同时工作——一个在搜索网页，一个在写文件，一个在读文件。最后交了一份表格、一篇草稿、还有审查意见。

### 步骤 4：理解 Team 模式的权限隔离
三个角色有不同权限：调研员只能搜索和读网页、写手能写文件和执行命令、审查员只能读文件不能改。这是 Team 模式和普通并行最大的区别——并行子 Agent 是几个能力相同的小助手同时干活，Team 模式是不同专业的人做不同的事。

### 步骤 5：掌握 Team 模式触发方式
三种触发方式：直接说"创建团队"、给一个复杂的多任务列表、自然语言描述角色分工。最推荐第三种，直接说"谁负责什么"就行，不用记格式。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `帮我同时做两件事：1）搜一下 2026 年最热门的 3 个 AI 记账 App，列出特色功能；2）帮我写一个 HTML 页面，做一个简单的记账表单` | 加"同时"触发并行子 Agent，两个不依赖任务一起干 |
| 2 | `帮我创建一个团队，3 个角色：\n1. 调研员：搜索「2026年最受欢迎的AI工具排行榜」，整理成表格\n2. 写手：根据调研结果写一篇 1000 字的公众号文章草稿\n3. 审查员：检查文章有没有错别字和逻辑问题\n三个人同时开工，最后汇总给我。` | 触发 Team 模式，三个角色分工协作 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 多 Agent 感知信号清单（速度变快/回复分段/工具面板不同 Agent 名称/Fork 继承上下文）
2. 自动子 Agent 四种类型说明（Explore/Plan/general-purpose/Fork）
3. 并行子 Agent 案例：同时搜 AI 记账 App + 写记账表单 HTML
4. Team 模式案例：调研员+写手+审查员三人协作完成 AI 工具排行榜文章
5. Team 模式三种触发方式对照表
6. 多 Agent 适用/不适用场景判断表

### 结果证明

![社群提问截图](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbROwMlj2IKqvFXuiazQezn4rZRCggEROoIsXNC9OObHL9A7Yn6ZQ28SA3aMHeWshYHicc4icBsibj8EmXoDfsAcPDk30JJezWY7Ez58/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

![社群回答多Agent功能](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRNMo6tfJcvqhnOIpNquytHPJpDiaKXWVich9GG7t4LquUso2S1poqb3e4bS1qibh1HRbIGLUmwjokBicgSKFgN1hP4K0sK7g8zE9gI/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

![要求出教程加两个案例](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRMTTLbgOADBV4K4A3icWdnDsHQJX3zXvCUppwfNjhtnuZvGTmPqHNj4sl0UN206w6O8Famj6ZMYqWTz9hKiaNxibbP96j2JEwB0a4/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

![并行子Agent同时工作截图](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbROyNAiaxRrgjic9l6gib9FgHQf1wo5Aia80PoeOiapB9RMB9H7YW7EOrFpejzNdZEdXQ7tIzaCURPncKI4EFzjicbTI8swetA95XtkTo/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

![Team模式创建团队截图](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRO86pmFtfkic9dzDfdkibmRvJqYJ68ktR05ChdTLZZSiclYapiaABQ5r7euibFgtN8icfcIvWA8caVdx2mWsOm5icPMRibibqtjSOyDhzKo/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

![三个角色并行调度状态表](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRN5RWaAgKarDcldLkiaiboXrq1UcwkdfWCNU5vv11aY0PmsuuHuYibwxYJTZgX84jdQy9EA52YznahpoNoAZxP5NzhriaOvRBicaLibo/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

## 八、验收标准

- [ ] 能感知多 Agent 在工作（速度变快/回复分段/工具面板出现不同 Agent 名称/Fork 继承上下文）
- [ ] 并行子 Agent 案例：用"同时"或"并行"触发，两个不依赖任务一起返回
- [ ] Team 模式案例：创建调研员+写手+审查员三人团队
- [ ] Team 模式三人任务依赖链：调研员完成后写手自动接手，写手完成后审查员自动接手
- [ ] Team 模式权限隔离：调研员只能搜索和读网页、写手能写文件和执行命令、审查员只能读文件不能改
- [ ] Team 模式三种触发方式：直接说"创建团队"/给复杂多任务列表/自然语言描述角色分工
- [ ] 多 Agent 适用场景判断：几件事互相不依赖+任务类型差别大+工作量大才适合，否则不适合
