# Case 32｜召唤PPT制作专家，一键生成天使轮融资BP

> **WorkBuddy 案例集 · 第 32 篇**
> 分类：办公协同与效率提升

---

## 一、场景描述

上篇用三位 AI 专家从零搭出了道路救援系统的架构、开发方案、可交互原型。原型链接发给我哥后他说"长这样我就放心了"，但紧接着提出新需求：要融资的话，得有个 BP（商业计划书）PPT 吧？投资人不会去点 HTML 原型链接，但一份专业的 BP PPT 是敲开 VC 大门的敲门砖。

可问题是我又不是做 PPT 的，上哪去搞一份投资人看得上眼的 BP？答案还是 WorkBuddy——在专家中心直接搜索"PPT"或"商业计划书"，找到 PPT 制作专家，把需求描述发过去。

专家回复的速度很快，给出的不是一堆文字，而是一套完整的 PPT 制作方案——用代码（pptxgenjs）直接生成 PPTX 文件，14 页，深色商务风格，配色、布局、文案全部到位。整个过程不到 1 小时，还附赠了 3 分钟路演演讲稿和投资人常问 10 个问题的标准答案。

## 二、想要完成的任务

用 WorkBuddy 的 PPT 制作专家，基于已完成的系统架构方案、开发方案、可交互原型，一键生成一份专业、可路演的 14 页天使轮融资 BP 商业计划书 PPT，并附赠路演稿与投资人 Q&A。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| 专家能力（PPT 制作专家） | 基于项目历史产出，按创投通用 BP 结构生成 14 页 PPTX 文件 | WorkBuddy 专家市场 | WorkBuddy 账号 |
| 代码执行能力（pptxgenjs） | 通过代码生成 PPTX，布局完全可控、配色精准 | 内置能力 | 本地命令执行、Node 环境 |
| 文件读写能力 | 保存 PPTX 文件与路演稿/Q&A 附件 | 内置能力 | 本地文件读写 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 在专家市场搜索"PPT"或"商业计划书"，找到并激活 PPT 制作专家
3. 本机已安装 Node.js 与 pptxgenjs 依赖
4. 已有完整的项目背景材料（架构方案、开发方案、可交互原型），可通过聊天记录或文件传给专家
5. 网络可用，可正常调用专家能力

## 五、在 WorkBuddy 中的操作

### 步骤 1：召唤 PPT 制作专家并提交需求
在 WorkBuddy 专家中心搜索"PPT"或"商业计划书"，找到 PPT 制作专家。把需求描述发过去：明确这是一份道路救援 APP 的天使轮融资 BP；说明背景（已完成系统架构方案、开发方案、可交互 HTML 原型）；提出要求——严格按创投通用 BP 结构做 12-15 页、深度结合已有技术架构与产品原型、单独做一页"已有成果"页、风格专业商务、额外附赠 3 分钟路演稿和投资人 Q&A。
**关键步骤**：在需求中明确"已有成果"页是灵魂——必须突出项目已经完成架构 + 开发方案 + 成品原型，落地基础完备。

### 步骤 2：专家用代码生成 14 页 PPTX
专家收到需求后，使用 pptxgenjs 代码生成方式（而非模板编辑）输出 PPTX 文件。代码生成的好处是布局完全可控、配色精准、不需要手动调整每个元素的位置。最终生成 14 页深色商务风格 BP。
**关键步骤**：专家自动完成 14 页内容编排——封面、行业痛点、市场规模、竞品分析、产品功能、技术架构优势、已有成果、商业模式、盈利模式、运营规划、团队介绍、融资方案、未来规划等。

### 步骤 3：核心页面"已有成果"页制作
"已有成果"页是整个 BP 的灵魂——大多数创业公司 BP 都是"PPT 项目"，只有愿景没有落地。专家把已经完成的三份交付物（完整系统架构方案、落地开发方案、可交互产品原型）做成三张并列卡片，证明项目已完成"设计 + 施工图 + 效果图"阶段，MVP 开发周期可缩短 6-12 个月。
**关键步骤**：三张卡片分别展示 01 完整系统架构方案（9 大章节、四层架构、技术选型清单、三阶段演进路线）、02 落地开发方案（7 大模块、11 张表、40+ API、12 个 Sprint）、03 可交互产品原型（浏览器可直接运行、三端覆盖、暗色专业 UI）。

### 步骤 4：融资方案与资金用途页制作
融资方案页左半部分大字展示"¥500 万 / 天使轮融资 / 稀释股权 10-15%"，右半部分用进度条展示资金用途：40% 产品研发（200 万）、30% 市场推广（150 万）、20% 运营人员（100 万）、10% 预留储备（50 万）。
**关键步骤**：融资方案页直接给出融资金额、稀释比例、资金用途明细、18 个月达盈亏平衡的目标。

### 步骤 5：附赠路演稿与投资人 Q&A
PPT 做完后，专家额外附赠一份 BP 附件文件（road-rescue-BP-appendix.md），包含两块内容：3 分钟路演演讲稿（按 30 秒开场 / 60 秒产品与技术 / 40 秒市场与商业 / 30 秒融资诉求精确分配）和投资人常问 10 个问题的标准答案（每题约 300 字结构化回答）。
**关键步骤**：路演稿中关键一句"我们不是一个 PPT 项目"配合可交互原型现场演示；Q&A 覆盖差异化、供给侧冷启动、技术壁垒、时机选择、盈亏平衡假设、巨头竞争、团队短板、原型与成品差距、A 轮计划、资金用完兜底 10 个高频问题。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `我需要制作一份道路救援APP的天使轮融资BP商业计划书PPT。背景：我们已经完成了系统架构方案、开发方案、可交互产品原型（有完整的HTML原型）。要求：1.严格按照创投通用BP结构，12-15页完整框架；2.深度结合已有的技术架构、开发设计、产品原型，单独做一页"已有成果"页；3.包含板块：行业痛点、市场规模、竞品分析、产品功能、技术架构优势、现有原型成果、商业模式、盈利模式、运营规划、团队介绍、融资额度、资金用途、未来规划；4.风格专业商务，适合给天使投资人、创投机构路演；5.额外附赠：3分钟路演演讲稿 + 投资人常问10个问题及标准答案` | 触发 PPT 制作专家生成完整 BP |
| 2 | （专家修复中文引号语法错误后继续生成） | 完成 14 页 PPTX 输出 |
| 3 | （专家自动转换为图片做 QA 检查） | 验证 PPT 视觉效果 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 一份 14 页深色商务风格 BP PPTX 文件（封面、行业痛点、市场规模、竞品分析、产品功能、技术架构优势、已有成果、商业模式、盈利模式、运营规划、团队介绍、融资方案、未来规划等）
2. 一份 3 分钟路演演讲稿（按时间分配精确撰写）
3. 一份投资人常问 10 个问题的标准答案（每题约 300 字结构化回答）
4. 关键的"已有成果"页，证明项目已落地（架构 + 开发方案 + 可交互原型）

### 结果证明

![PPT 制作专家接收需求并生成 BP](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRMdRFXkwzXeqc1JVda5Rw59fvZRVNWnoMe032YguoaUa5CibKUlPprJ59EH7WUdfTHZXY9Ou4ek6WlGyKBAf9ybWCIFYnibaAHib4/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

![BP 封面页：救援快车 RescueGo](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbROBNv93oOoaEogXkb67kMaLvn25eEPtqcaTPZ9icUPI8tiaLor5oOfmhSfGb0Fggw0aBicLhlkiayLIQGcCHWEL5OOV20vibjXC9yics/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

![行业痛点页：四大痛点与系统性空白结论](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRN1WJV1FBIyK2RUV1LW4Rqhhc2MktKicI0tFgR7HwDf04icbDiaGVxFWpGde4W7In30160RTOOAVSv68MAU7Ifw83GibDukaj9wqAQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

![市场规模页：4000 亿+ / 1200 亿 / 3.5 亿三大数据](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRPBicO8kg95V5gFnCa82vQGIfzricS0yEbyxmnND06TzpNSe4rZibenYyxfs0hg8WzLibJwO0ibFoolrC3MHIJiaKc1oBccj51rlRqCw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

![竞品分析页：差异化竞争格局对比表](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRMCR6PwsyTZkkOVYO44mNuiaUYHC2S46G3xr3hjC6xpTmNvjwKTVJI2WcUWWJQ1wpSdYBNbW262NJp3ycichZ3YAnHt0QIn2bl7o/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

![产品功能页：三端全覆盖完整救援闭环](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbROGbRrqHx4IqoyTkJ5TTbNq4qLZ108yO4CoCTma3KCLgPRPF7Kniabb7XXG0Zgc93DZTngtDfXN1CqWoLOwsK05gdrWDa2NRhLI/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

![融资方案页：500 万天使轮与资金用途进度条](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRPIdN5SmBl7btmt5dXbK3dLiblJxicsAUbX4LbVQdLhFC9xiaffc7QvxUWREXu5eEGar6gbGmdcE85nx52KtRQicYicXmX9U9cvN80c/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

![路演演讲稿与投资人 Q&A 附件](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRNl6uzicykSWibRu980icwAlm24ojib0NArqa24m84cnUA4OmvdoWs0oZHBQlOgcnmHWKmBINJg90XISUpBq6of34E07mQvAdn0avk/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

### 效率对比

| 方式 | 耗时 / 成本 |
|---|---|
| 找 PPT 设计公司 | 3-5 天，费用 5000-20000 元 |
| 自己学 BP 结构 + 找设计师排版 + 写路演稿 + 准备 Q&A | 4-6 天 |
| 用 WorkBuddy PPT 制作专家 | 不到 1 小时，含路演稿与 Q&A |

## 八、验收标准

- [ ] 成功在专家中心搜索并激活 PPT 制作专家
- [ ] 专家基于历史聊天记录的项目信息（架构 + 开发方案 + 原型）生成 BP
- [ ] 输出 14 页深色商务风格 PPTX 文件，含封面、行业痛点、市场规模、竞品分析、产品功能、技术架构优势、已有成果、商业模式、盈利模式、运营规划、团队介绍、融资方案、未来规划等板块
- [ ] 单独的"已有成果"页完整展示三大交付物（架构方案、开发方案、可交互原型），证明项目已落地
- [ ] 融资方案页明确给出 500 万天使轮、稀释 10-15%、四档资金用途进度条
- [ ] 附赠 3 分钟路演演讲稿，按时间分配精确撰写
- [ ] 附赠投资人常问 10 个问题的标准答案，每题约 300 字
- [ ] 整个流程在 1 小时内完成
