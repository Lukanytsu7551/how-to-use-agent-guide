# Case 43｜一个电话，三个 AI 专家，从零搭出道路救援系统原型

> **WorkBuddy 案例集 · 第 43 篇**
> 分类：网站与应用开发

---

## 一、场景描述

中午接到一个电话："你看能不能搞个道路救援的 App？"就这么一句话，没有需求文档，没有竞品分析，没有预算说明，甚至连"我要哪些功能"都没说清楚。这玩意儿涉及车主端、师傅端、管理后台，还要实时定位、智能派单、支付结算，一个正经项目光写方案可能就要两三周。但转念一想，现在有 WorkBuddy 的专家模式，试试呗。

WorkBuddy 的专家中心里有 100 多个领域专家。这次选了三位流水线作业：架构师出蓝图（设计系统整体架构，交付可扩展架构设计方案文档）→ 高级开发工程师出施工图（制定开发计划和技术方案，交付完整开发方案含数据库/API/里程碑）→ 快速原型工程师出效果图（搭建可交互的产品原型，交付 HTML 交互原型页面）。策略很清楚：每一步的输出都是下一步的输入。

从接到电话到拿到三份交付物，一个下午搞定蓝图 + 施工图 + 效果图。如果用传统方式：请架构师出方案 1-2 周 → 技术评审 → 开发团队写技术方案 1 周 → UI 设计师画原型 1-2 周 → 评审迭代，整个过程可能需要 3-4 周，还不算中间的沟通成本和等待时间。三位专家各自领域深耕：架构师对高可用/渐进演进的把控、开发工程师对数据库索引和 Spring 状态机的理解、原型工程师对交互细节的打磨——这些是省不掉的专业能力。

## 二、想要完成的任务

用一个下午时间，通过 WorkBuddy 专家模式串联三位专家（架构师 → 高级开发工程师 → 快速原型工程师），从一句"搞个道路救援 App"的需求，产出可扩展架构设计方案 + 完整开发方案（含数据库/API/Sprint 里程碑）+ 可交互 HTML 原型（3 端 5 页面）。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| 软件架构师专家 | 设计系统整体架构（四层架构/智能派单引擎/三阶段演进路线） | WorkBuddy 专家中心 | WorkBuddy 账号 |
| 高级开发工程师专家 | 制定开发方案（项目结构/数据库表/API 清单/Sprint 里程碑/部署架构） | WorkBuddy 专家中心 | WorkBuddy 账号 |
| 快速原型工程师专家 | 搭建可交互 HTML 原型（3 端 5 页面，浏览器直接打开） | WorkBuddy 专家中心 | WorkBuddy 账号 |
| 文件传递能力 | 上一步产出的 .md 文档直接传给下一步专家作为输入 | 内置能力 | 本地文件读写 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端（含专家中心）
2. 专家中心可用，能找到软件架构师、高级开发工程师、快速原型工程师
3. 工作区可写入文件（用于保存架构文档、开发方案、原型 HTML）
4. 准备好一句话级别的需求描述（如"搞个道路救援 App"）
5. 浏览器可打开 HTML 文件（用于预览可交互原型）

## 五、在 WorkBuddy 中的操作

### 步骤 1：请架构师出蓝图
在专家中心找到「软件架构师」，点击进入专属对话窗口。需求描述很直接："我们正在开发道路救援app,系统,需要整体架构设计和长期发展规划,请软件架构师帮我们设计可扩展的系统架构。"几分钟后，架构师交付了一份完整的可扩展架构设计方案，文档含 9 个章节：设计原则、架构总览、核心服务设计、技术选型、数据架构、非功能性设计、演进路线、风险应对、团队配置。关键内容：①四层架构（用户触点层→车主App/师傅App/运营后台；业务网关层→API网关/认证鉴权/限流熔断；核心服务层→订单/派单/用户/支付/位置/评价；基础设施层→MySQL/Redis/Kafka/ES/OSS/K8s），模块化单体起步预留拆分接口；②智能派单引擎评分模型 score = 0.4×距离 + 0.3×技能匹配 + 0.2×评分 + 0.1×负载，三种派单模式（系统派单/抢单/人工调度）；③三阶段演进路线（Phase 1 MVP 0-6 个月模块化单体 → Phase 2 规模化 6-18 个月微服务拆分 → Phase 3 平台化 18+ 个月 SaaS 赋能）。
**关键步骤**：在专家中心找到软件架构师，一句话描述需求，等待几分钟即获 9 章节架构设计方案文档。

### 步骤 2：请开发工程师出施工图
回到专家中心，找到「高级开发工程师」，开一个新的对话窗口。把架构师刚才产出的文档直接给他，说："根据这个架构设计，给我出一份开发方案。" 开发工程师看完后交付了一份完整开发方案：①项目结构已定义好（road-rescue/ 含 rr-common 通用模块、rr-gateway API 网关、rr-service 业务服务 6 个子模块、rr-admin 管理后台、rr-app 统一启动模块，MVP 阶段模块化单体按领域划包）；②数据库表结构全部设计好（6 个模块共 11 张表：user/driver_info/vehicle、rescue_order/order_event/order_evaluation、dispatch_record、payment_record/settlement_record、driver_location，连核心 SQL 索引都写好了）；③API 接口清单全部列出（车主/师傅/管理后台三端加起来 40+ 个接口，RESTful 路径和方法全定义好）；④Sprint 级别开发里程碑（6 个月 MVP 拆成 12 个 Sprint 每个 2 周，每个 Sprint 有明确任务分配和交付物）；⑤部署架构与服务器资源估算（约 8000-12000 元/月）、质量保障策略。
**关键步骤**：把架构师产出的 .md 文档传给开发工程师，一句话"根据这个架构设计出开发方案"，获完整开发方案（项目结构/11 张表/40+ API/12 Sprint/部署方案）。

### 步骤 3：请原型工程师出效果图
再次回到专家中心，找到「快速原型工程师」，进入对话。把架构文档和开发方案文档一起发给它："文件1为软件架构，文件2为开发方案，根据这两份文件，请快速原型工程师帮我们快速搭建产品原型。" 然后一个完整的可交互原型页面就出来了——不是画个线框图，不是 Figma 里的静态页面，而是一个可以直接在浏览器里操作的 HTML 原型。原型覆盖三个核心视图：①车主端（完整求助发单流程：选故障类型→地图定位→费用预估→选支付方式→支付成功→实时追踪；我的订单列表：进行中/已完成/待评价，含评价弹窗星级+标签）；②师傅端（工作台：新订单推送带 30s 倒计时、评分推荐理由、一键接单有滑出动画；收入统计：周收入柱状图、按故障类型构成分析、结算记录）；③管理后台（5 个子页面：数据概览核心指标+24h 趋势图+实时告警面板、智能调度中心地图可视化+派单评分引擎 Top-3 推荐、订单管理带状态筛选、师傅管理列表+资质审核、结算管理日切批次+GMV/平台费/师傅收入明细）。整个原型用暗色紧急主题（深色背景配橙色强调色），不用启动任何服务，直接浏览器打开 HTML 文件就能用。
**关键步骤**：把架构方案 + 开发方案两份 .md 文档一起传给原型工程师，一句话触发，获可直接在浏览器操作的可交互 HTML 原型（3 端 5 页面）。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `我们正在开发道路救援app,系统,需要整体架构设计和长期发展规划,请软件架构师帮我们设计可扩展的系统架构。` | 向软件架构师提需求，产出可扩展架构设计方案（9 章节） |
| 2 | `根据这个架构设计，给我出一份开发方案、` | 把架构文档传给高级开发工程师，产出完整开发方案（项目结构/数据库/API/Sprint） |
| 3 | `文件1为软件架构，文件2为开发方案，根据这两份文件，请快速原型工程师帮我们快速搭建产品原型。` | 把两份文档传给快速原型工程师，产出可交互 HTML 原型（3 端 5 页面） |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 可扩展架构设计方案文档（9 章节：设计原则/架构总览/核心服务设计/技术选型/数据架构/非功能性设计/演进路线/风险应对/团队配置）
2. 完整开发方案文档（项目结构 6 模块 + 11 张数据库表 + 40+ API 接口 + 12 个 Sprint 里程碑 + 部署架构 + 资源估算）
3. 可交互 HTML 原型（3 端 5 页面：车主端发单流程+订单列表、师傅端工作台+收入统计、管理后台数据概览+智能调度+订单管理+师傅管理+结算管理）
4. 暗色紧急主题设计（深色背景配橙色强调色，浏览器直接打开无需启动服务）

### 结果证明

![WorkBuddy 专家中心与三位专家](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRMlVgmIzJ9icHJYh71yHJaYs8YjTicynHn3mbyXiafZ2oVvpKKBbmxeP4bD7gz0wkMf6vxjtFAH40qW17IXZMhC53GiaseJoKRP2Os/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

![第一步：架构师产出四层架构与智能派单引擎](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRNIvicfTN5sCCJuP3usFJ93JFV01ick33UyN5OOff7Krd0OXIpDmiaBRppYvJssANSU4mOt4mTQtcq3bPVeBtSapTpq0vmpWoXV3Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

![智能派单引擎核心业务流程图](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRN6MVf4ZoTFoxIiarYmeDU9PKvyy7mN71bflU9WEjMSqqFCP0PUEibkKu4FWnDJiaxmEianP28PibrHLIy0JPM5mlhZIWsHibHpv8lRQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

![三阶段演进路线（MVP→规模化→平台化）](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRPQo8nIM1vXql5d2X7fMw04zLctuAZc1j4n4chRDUicNxQxzJJf5Ewp2Qtc7kFKIzCnppRy3vUDV6UmXkpwibYERA0SUeCicjQPWY/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

![第二步：开发工程师产出项目结构与 API 清单](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRP1dGp3oO6qpgV2LW27dfmeoVPP2nlddeRwsq1picua19tMHl2CevvEicnevUibCSibtudUzb4Br1YibiaYwd411FXgxCHTQKXIMCVfQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

![Sprint 详细规划（任务/负责人/交付物）](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbROY0MOiceEvJlvoaIGdZNiboUJ8DZZnsDIODz0sFQdQHXFSu8TIDO4EdkLkZXufiapVYOrjM0OA2d8635fRczG1ZuR5mpgmEZtNYo/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=9)

![第三步：原型工程师搭建可交互原型](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRNUibBbLqRpj653h4f2lUrT4hd4CBlJqFauMmcJbEvSEKRE13qItcOy97uicZhLMl0BkQNHibqFKic3sIvl133Ckm4w1SQMDD7AZ8M/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=13)

![车主端发单流程（选故障类型/费用预估/支付）](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbROMgUKtPHF31E0v3fcY8iaSiaDIv3jptsHvHwzEc1S3wlvLgQzIzFptOztufoRwtx7XicjFNBPTTfWDOdPxdGRFRGg4o2pibhhqMxg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=14)

![管理后台智能调度中心（地图可视化+派单评分 Top-3）](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRNqseYSDYv6PIWe9jyM3wjC6zWZdq2mwiaYsRXvCHcjqtBACicCxr0FYjicic461dFkjPhePeExomAzwKrDIcMO8xd90DnRLf47LRo/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=20)

### 传统方式 vs WorkBuddy 方式

| 维度 | 传统方式 | WorkBuddy 方式 |
|---|---|---|
| 架构设计 | 找架构师沟通 1-2 周 | 几分钟产出 9 章节方案 |
| 开发方案 | 开发团队写 1 周 | 几分钟产出项目结构/11 表/40+ API/12 Sprint |
| 产品原型 | UI 设计师画 1-2 周 | 几分钟产出可交互 HTML 原型（3 端 5 页面） |
| 文件衔接 | 会议评审+文档传递 | 上一步 .md 直接传给下一步 |
| 总耗时 | 3-4 周（含沟通等待） | 一个下午 |

## 八、验收标准

- [ ] 成功在专家中心找到软件架构师并一句话发起需求
- [ ] 架构师产出可扩展架构设计方案（含 9 章节）
- [ ] 架构方案含四层架构设计（用户触点层/业务网关层/核心服务层/基础设施层）
- [ ] 架构方案含智能派单引擎评分模型（score = 0.4×距离 + 0.3×技能匹配 + 0.2×评分 + 0.1×负载）
- [ ] 架构方案含三阶段演进路线（MVP 0-6 月 / 规模化 6-18 月 / 平台化 18+ 月）
- [ ] 成功把架构文档传给高级开发工程师并一句话发起开发方案
- [ ] 开发方案含项目结构（road-rescue/ 含 6 个子模块）
- [ ] 开发方案含 11 张数据库表定义（含 SQL 索引）
- [ ] 开发方案含 40+ API 接口清单（车主/师傅/管理后台三端 RESTful）
- [ ] 开发方案含 12 个 Sprint 里程碑（每个 2 周，含任务/负责人/交付物）
- [ ] 成功把架构方案 + 开发方案两份文档传给快速原型工程师
- [ ] 原型工程师产出可交互 HTML 原型（3 端：车主端/师傅端/管理后台）
- [ ] 原型含车主端完整发单流程（选故障类型→地图定位→费用预估→支付→实时追踪）
- [ ] 原型含师傅端工作台（新订单推送带 30s 倒计时+接单动画）+ 收入统计
- [ ] 原型含管理后台 5 个子页面（数据概览/智能调度/订单管理/师傅管理/结算管理）
- [ ] 原型用暗色紧急主题，浏览器直接打开无需启动服务
- [ ] 三个专家通过文件传递串联，上一步输出自然成为下一步输入
- [ ] 全流程一个下午完成（传统方式需 3-4 周）
