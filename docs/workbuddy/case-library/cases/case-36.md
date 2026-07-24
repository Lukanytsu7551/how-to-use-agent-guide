# Case 36｜用 WorkBuddy 深度研究，一键生成行业分析报告

> **WorkBuddy 案例集 · 第 36 篇**
> 分类：办公协同与效率提升

---

## 一、场景描述

新升级的 WorkBuddy 上线了「探索」模块，里面有很多现成的能力供用户直接使用，其中的「深度研究」能自动搜索多路来源、交叉比对、生成结构化报告。本次复盘一次真实使用场景：系统理解 AI Coding 行业 2023-2026 年的商业模式演变。

研究需求不只是"有哪些工具"，而是要回答几个具体问题：2023 年到现在商业模式经历了哪几个阶段？关键转折点是什么、谁驱动的？国内外差异在哪？未来怎么走？如果自己查，要打开十几个网页，摘数据、理时间线，非常耗时。

于是打开 WorkBuddy，用了一句 prompt 触发深度研究模式。WorkBuddy 自动并行搜索多路来源、抓取高质量页面、提取结构化信息，最终生成一份包含摘要、八章正文、数据表格、附录的完整 Markdown 报告，并继续按要求转换为单文件 HTML，方便分享与归档。从提问到拿到 HTML 报告，全程不超过 10 分钟。

## 二、想要完成的任务

用 WorkBuddy「深度研究」能力，分析 AI Coding 行业 2023-2026 年的商业模式演变，找出关键转折点和驱动因素，并输出一份图文并茂的单文件 HTML 报告。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| 深度研究（探索模块） | 自动多路搜索、抓取、交叉比对、生成结构化 Markdown 报告 | WorkBuddy 探索模块 | WorkBuddy 账号 |
| HTML 转换能力 | 把 Markdown 报告转成单文件 HTML（内联 CSS、无外部依赖） | 内置能力 | 本地文件读写 |
| 文件落盘能力 | 把完整报告以 Markdown 文件保存到工作区 | 内置能力 | 本地文件读写 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端（版本含「探索」模块）
2. 网络可用，能正常调用搜索与网页抓取
3. 准备一个有明确分析框架的研究问题（包含时间范围、分析维度、产出要求）
4. 工作区可写入文件（用于保存 Markdown 报告与 HTML）

## 五、在 WorkBuddy 中的操作

### 步骤 1：用 @深度研究 触发深度研究模式
在 WorkBuddy 中选择「深度研究」，然后写出问题。深度研究模式会自动多路搜索，不需要手动指定搜索关键词。
**关键步骤**：提问要具体，包含时间范围和产出要求。好的提问如"分析 XX 行业从 2023 年到现在的商业模式演变，找出关键转折点和驱动因素"；避免"帮我研究一下 XX"这种太开放的问法。

### 步骤 2：自动多路搜索
WorkBuddy 接收指令后，自动并行搜索多个维度：英文关键词（AI coding assistant business model evolution 2023 2024 2025）、中文关键词（AI 编程助手 商业模式 演变 关键点 转折点）、厂商定价关键词（Cursor Replit GitHub Copilot pricing strategy）。搜索结果中识别到几个高质量来源，自动抓取全文。
**关键步骤**：多路并行搜索覆盖中英文与厂商定价维度，自动筛选高质量来源。

### 步骤 3：抓取并提取核心内容
WorkBuddy 自动访问以下页面并提取结构化信息：CSDN 博客（2023-2026 三阶段演变框架、厂商定价时间线）、Qubittool 定价经济学（推理成本分析、Agent 模式 Token 消耗数据）、EastonDev 全景盘点（2026 年市场格局、工具阵营分类、选型指南）。
**关键步骤**：自动提取每个来源的核心内容，为后续交叉比对做准备。

### 步骤 4：生成结构化 Markdown 报告
提取完成后，WorkBuddy 自动生成完整报告，包含：摘要（四大核心结论）、第一章行业背景与市场规模（含数据表格）、第二章商业模式演变三阶段、第三章三大关键转折点深度分析、第四章驱动因素（技术/市场/生态）、第五章代表性公司策略对比、第六章国内外商业模式差异、第七章未来趋势预测（2026-2028）、第八章结论与建议、附录主要厂商定价一览表。
**关键步骤**：报告自带摘要、数据表、结论，结构化程度高，可直接用于分享或归档。

### 步骤 5：转换为图文并茂的 HTML
Markdown 报告生成后，追加一句"把完整报告处理成 HTML 格式"。WorkBuddy 读取完整报告内容后生成单文件 HTML，内联 CSS，无外部依赖，系统字体栈，适配移动端。生成后自动弹出预览，可直接用于分享、归档，或作为公众号素材。
**关键步骤**：HTML 单文件无外部依赖，双击即可在浏览器打开。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `@"深度研究" 分析 AI Coding 行业的商业模式演变，从 2023 年到现在，找出关键转折点和驱动因素。` | 触发深度研究模式，自动多路搜索与结构化报告生成 |
| 2 | `把完整报告处理成 HTML 格式` | 将 Markdown 报告转换为单文件 HTML，便于分享与预览 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 一份完整 Markdown 格式深度研究报告（摘要 + 八章正文 + 附录，含数据表格）
2. 一份单文件 HTML 报告（内联 CSS、无外部依赖、系统字体栈、移动端适配）
3. 在线可访问的 HTML 报告地址：https://panda.yaniw.com/coding
4. 报告关键发现：三大关键转折点（2023 下半年中国厂商集体入局、2024 年 8 月 Trae 完全免费、2025 年 Agent 模式商业化）
5. 国内外商业模式差异对比表（个人版定价、竞争手段、变现路径）
6. 2026 年市场格局三大阵营（AI IDE / 代码助手插件 / 编程智能体 Agent）

### 结果证明

![深度研究模式触发指令与 WorkBuddy 响应](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRMIuVqmfTENhzicXQLGvQJia2FXib8uBiayVm2f7ffRk66bUZcTia8QDzM7Up1M6bkNCO2CRv5ljfnxn7EOUgJhTWlkDnS6oyicOZnJw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

![报告生成后要求转换为 HTML 格式](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRMKJdBU72pibfhHTric8tymEB5RzDGwEoHdcWcFibvrcJuIzB89zibm0LWkeXRauGSTiaFqPCZOP0JGibq1RGJGX9TomRyuchHRLROvU/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

![HTML 报告封面与目录页](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRPccPVLicHygU2zZa5AaF2pPFUExXyR1eWcCZGcQpqHpUuCvvGWvaVKAxdLM2KmdR2Xia0obQoRofXfY44mBvSmrwuYpGmZT47tA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

![Trae 免费策略引发的行业连锁反应与厂商应对策略](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRP1qpwkWoPF8em11iaI2sicTiaLV7pCIPHwBicqxs6JSECSxddQksJHOtiaiakpiaxCiarMLKCqR1cBDIhXsn8Diby0zQJJwGlyztjpSQCA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

![Agent 模式 Token 消耗量与成本估算表](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbROQ3FUCPxdzQJY9u6ibSFTpasglibBlIk2g1iaURDyOL7NVCXfCMKJJZhGEGic1Y9PJZC8nz19x9sEP1ceic6sf15L8icsEV99Cxp2oU/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

![国内外商业模式差异分析表](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbROBmtYnyv2ckq0Y1qM8oqcJiaHhgRPWxYAq30LGI6xicCWGYO00GHibQsFOeoGL7q8gvLJszTRIqaoKQOpbx0Hws60NGoGPJJcxZY/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

### 效率对比

| 方式 | 耗时 |
|---|---|
| 传统人工检索 + 整理报告 | 半天 |
| WorkBuddy 深度研究（提问到 HTML 报告） | 不超过 10 分钟 |

## 八、验收标准

- [ ] 成功在「探索」模块触发深度研究模式
- [ ] WorkBuddy 自动并行搜索中英文关键词与厂商定价关键词
- [ ] 自动抓取至少 3 个高质量来源（CSDN、Qubittool、EastonDev 等）并提取结构化信息
- [ ] 生成完整 Markdown 报告，含摘要 + 八章正文 + 附录
- [ ] 报告包含三大关键转折点（2023 下半年中国厂商入局、2024.8 Trae 免费、2025 Agent 商业化）
- [ ] 报告包含国内外商业模式差异对比表
- [ ] 报告包含 2026 年市场格局三大阵营分类
- [ ] 追加指令后成功生成单文件 HTML（内联 CSS、无外部依赖、移动端适配）
- [ ] HTML 报告可在浏览器直接打开预览
- [ ] 全流程从提问到拿到 HTML 报告不超过 10 分钟
