# Case 96｜想转岗AI最火的FDE？让AI当你的职业搭子

> **WorkBuddy 案例集 · 第 96 篇**
> 分类：知识管理与学习成长

---

## 一、场景描述

最近朋友圈全在刷 FDE，什么「单人接单月入十万」「零基础转行年薪百万」，看得人心痒但也看得人发懵——这岗到底干啥的？没科班背景能冲吗？要学啥怎么学？平时就在折腾 AI 工具算是有点底子，可一说到「转岗」还是两眼一抹黑。于是把这团焦虑直接丢给 WorkBuddy，让它当职业搭子帮忙捋清。

## 二、想要完成的任务

通过四轮对话让 WorkBuddy 把 FDE 转岗这事彻底捋清：FDE 到底是个啥职位职责有什么国内有哪些岗位、有基础编程能力还差什么、让 AI 读长期记忆定制一份学习计划、把计划从 Word 版改成 HTML 可视化路线图。最终拿到一份基于个人真实起点、项目驱动、复用现有素材的 3 个月冲刺学习计划。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| WorkBuddy Agent | 职业咨询 + 反问定位 + 读记忆定制计划 | WorkBuddy 内置 | WorkBuddy 账号 |
| 长期记忆 | 读取用户真实能力起点（HTML/CSS/Python/Playwright/内容创作） | WorkBuddy 内置 | WorkBuddy 账号 |
| 文档生成 | 输出 Word 版学习计划 | WorkBuddy 内置 | WorkBuddy 账号 |
| HTML 生成 | 输出可视化网页版学习路线图 | WorkBuddy 内置 | WorkBuddy 账号 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 长期记忆里有能力痕迹（HTML/CSS、Python脚本、Playwright自动化、AI工具使用、内容创作）
3. 对 FDE 岗位感兴趣但不确定是否转岗
4. 倾向 3 个月冲刺 + 项目驱动的学习风格

## 五、在 WorkBuddy 中的操作

### 步骤 1：第一问——FDE 到底是个啥
说「什么是FDE？FDE的职位职责有什么？国内FDE的职位有什么？」。WorkBuddy 没甩百科，先把最容易被混淆的点讲清楚：现在 FDE 主流是 Forward Deployed Engineer（前沿部署工程师），源自 Palantir 被 OpenAI/Anthropic 在大模型时代沿用——本质是把前沿 AI 技术和具体业务场景缝合起来的驻场复合型工程师。顺手提醒苹果也有 FDE 但那是 Field Design Engineer 做无线产品测试的不是一回事。职责拆成六块：需求翻译→POC/Demo→模型部署适配→调优定制→落地运营→反哺产品。国内岗位直接给了张表（字节跳动豆包AI大模型FDE 35K-70K×15薪、阿里云人工智能FDE 35K-55K×13薪、腾讯AI FDE 60-120万/年等）。
**关键步骤**：问FDE是什么 → 讲清主流含义+职责六块+国内岗位薪资表。

### 步骤 2：第二问——有基础编程还差啥
说「如果我有基础编程能力，要做FDE还需要具备什么能力？如果让你针对我制定一份学习计划，你从哪些方面来制定？」。WorkBuddy 回答基础编程只是地板，真正拉开差距的是另外三层：LLM 应用工程能力（最核心）、系统集成与落地、业务&行业理解、沟通&驻场软技能。然后没急着甩课表，而是反手甩出一张提问卡要先弄清四个变量：当前背景、目标方向、周期、风格。
**关键步骤**：问还差啥 → 给三层能力差距 + 反问四个变量。

### 步骤 3：第三问——你先去翻翻我的记忆给我定制份计划
四个答案分别是：当前背景「你去我的记忆里看」、目标方向还没定/广泛准备、周期3个月冲刺、风格做项目驱动。WorkBuddy 真去读了长期记忆，定位出真实起点——会 HTML/CSS、Python 脚本、Playwright 自动化，是重度 AI 工具用户，运营着「我与AI的那些事」写「WorkBuddy 100种用法」；缺口在「搭 AI 系统」的深度（RAG/Agent/评测）、后端集成、私有化部署、行业深耕和驻场实战。它没把用户当零基础而是当成「工具使用者」——这反而成了 FDE 的好起点。接着生成了一份定制学习计划 Word 版。
**关键步骤**：让它读记忆 → 定位真实起点 → 生成 Word 版定制计划。

### 步骤 4：第四问——别要doc了给我做成HTML
看了一眼 Word 说「做成HTML版本的，不要做文档格式的」。WorkBuddy 二话不说改成可视化网页版——一张带色块、能自适应手机的学习路线图。包含起点画像（左右两栏底牌/待补缺口）、总体策略+三个月路线总览表、逐月周任务（第1月LLM地基→第2月Agent+部署→第3月行业实战）、作品集清单/推荐资源/反馈闭环。最戳的是「用我自己的素材练手」零获取成本：第1月用「WorkBuddy100种用法」系列做个人知识库RAG，第2月把封面流水线升级成公众号发布自动化Agent。
**关键步骤**：要HTML版 → 改成可视化路线图 + 用现有素材设计项目。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `什么是FDE？FDE的职位职责有什么？国内FDE的职位有什么？` | 问FDE是什么 |
| 2 | `如果有基础的编程能力，要做FDE还需要具备什么能力？如果让你针对我的制定一份学习计划的话，你从哪些方面来制定？` | 问还差啥+定制计划 |
| 3 | （回答四个反问：背景去记忆里看/方向广泛准备/周期3个月/风格项目驱动） | 提供四个变量 |
| 4 | `做成HTML版本的，不要做文档格式的。` | 要HTML可视化版 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. FDE 概念讲清（主流 Forward Deployed Engineer + 职责六块 + 国内岗位薪资表）
2. 能力差距分析（三层：LLM应用工程/系统集成/业务理解+沟通）
3. 长期记忆读取结果（已有能力底牌 + 待补缺口）
4. 定制学习计划 Word 版（FDE学习计划-3个月冲刺.docx）
5. 定制学习计划 HTML 可视化版（带色块+自适应手机的学习路线图）
6. 三个月路线总览（第1月LLM地基→第2月Agent+部署→第3月行业实战+求职冲刺）
7. 作品集清单（个人知识库RAG + 公众号发布自动化Agent + 行业POC）

### 结果证明

![第一问：FDE是什么+职责+国内岗位](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRMZdacf9nBLsrJWOdTDTmUYcQRGoM9UhtKe7BcM6VBia3zAicc1UMOR6zpUsjeW0RjGPJwBUGGoib7ccy1HbBlAx1KkUF3eWEdqlE/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

![FDE职责六块+国内岗位薪资表](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRMc0GibIPwfZCRrkuf0Bicw5ic85D7tkNx1XUNdtEj34UibsQL1pmQSIYdiaJdgf9mWLukujyYUretTd77jMWpGaOFL5VRYo6JiaeDLM/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

![第二问：能力差距+反问四个变量](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRO7JTtYumHPuLfBSS30tNNnbhWSZsqtWmaKNQcgGH9bPAY45V0BGibYCsrDJZ903Gz0kyicAJsmrTboTlibBu83Dl19G8Cic6NhKrk/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

![第三问：读记忆定位真实起点+Word版计划](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRM7EpGHnbsiaPKHQRHEcykLcpB8vCt37t47exTHSSibIfmXN0V2fFjzNFP9gFGt8eNlxsgS0u1eVFljy2O8I0jjI0xqTibQibrWgtY/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

![第四问：改成HTML可视化路线图](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbROnqJFY4c6Y5iaUCyFDr4xIQaMsDo0IIQVZ6zmbia9swt6LibD9WFZEbibYoajveRRvibBuDghnsWxWXcoTBZCsFawLdXxxNKiaRZY14/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

![HTML版：起点画像（底牌/待补缺口）](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRPsNXFNkUA8aia1UndZlSc7e5rBLu3HRVce7kAibtoItyG9nxZVZzkarolpZictEaXyONajRibR2HrDWQSPO3gJ0icPaSWYcnyqmYzM/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

![HTML版：总体策略+三个月路线总览表](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRPcORHkZAXCHTpz33xTWh6BcWdskxQvmqjqDQstEtYBu2kGAsZRfzl9UnWzvYEP04AANpwK7nDQyib4KBFEL9uU83mOKiafZHsNI/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

![HTML版：逐月路线与周任务](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRO1WCjmAKar7XYvJUBjKBp9f5DlwhNW4mmbPDT0Ue3MtRjyNnrbETxDdDXzxibXSxs5eIwLCpLwfpaX7c5TxZf5UPH6rD9H0nz4/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

![HTML版：第3月行业实战+求职冲刺](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRMjyHJMLWWc3OEIDKcQPJmzBn91H2guGNKeOODyLTmYXce9gLhiamW8t136u34awmvAUJJ0ozyqbia1XPJBmHv0ASMZuLzGKUEic0/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)

![HTML版：作品集清单+推荐资源+反馈闭环](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRNsCEibzQmFU505QwJfgDTuictE3piaNJbs3gIjib10yq5R4dKCSgzgxBuDWib1mAcwticeiaicOD51DD3Eiczz8zzENAzml1VhG308fFGA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=9)

## 八、验收标准

- [ ] 第一问：讲清 FDE 主流含义（Forward Deployed Engineer 源自 Palantir）
- [ ] 第一问：提醒苹果 FDE 是 Field Design Engineer 不是一回事
- [ ] 第一问：职责拆成六块（需求翻译/POC/模型部署/调优/落地运营/反哺产品）
- [ ] 第一问：给国内岗位薪资表（字节/阿里云/腾讯/百度/华为）
- [ ] 第二问：回答三层能力差距（LLM应用工程/系统集成/业务理解+沟通）
- [ ] 第二问：反问四个变量（背景/方向/周期/风格）而不是直接甩课表
- [ ] 第三问：真去读长期记忆定位真实起点（HTML/CSS/Python/Playwright/AI工具/内容创作）
- [ ] 第三问：区分「已有能力底牌」和「待补缺口」
- [ ] 第三问：生成 Word 版定制学习计划（FDE学习计划-3个月冲刺.docx）
- [ ] 第四问：改成 HTML 可视化路线图（带色块+自适应手机）
- [ ] HTML 版包含起点画像/总体策略/三个月路线总览表/逐月周任务/作品集清单/推荐资源/反馈闭环
- [ ] 计划用现有素材设计项目（WorkBuddy100种用法系列做RAG + 封面流水线升级成Agent）
- [ ] 每个阶段有「可验证产出」——没做出 demo 就不算过
