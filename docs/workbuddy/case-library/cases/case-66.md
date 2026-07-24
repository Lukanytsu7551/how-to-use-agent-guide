# Case 66｜NVDA值多少钱？AI3分钟给我算了3种答案

> **WorkBuddy 案例集 · 第 66 篇**
> 分类：金融投资与专业咨询

---

## 一、场景描述

突发奇想跟 WorkBuddy 说了一句话：「帮我给 NVIDIA 做一个完整的 DCF 估值，考虑 AI 芯片需求的 Bear/Base/Bull 三种情景。」然后就去做别的事了。三分钟后回来，桌面上多了个 Excel 文件。打开一看——不是随便丢几个数字那种敷衍，是正经八百的投行级 DCF 模型，包含 311 个公式、75 个敏感性分析公式，修改任意假设结果自动联动。手动搭一个 DCF 模型要小两个小时，WorkBuddy 三分钟。

## 二、想要完成的任务

用 WorkBuddy 金融服务能力，给 NVIDIA 做一个完整的 DCF 估值模型，考虑 AI 芯片需求的 Bear/Base/Bull 三种情景（Base case 假设未来 5 年营收 CAGR 25%），输出包含 WACC 敏感性分析和终值敏感性分析的 Excel 文件，所有公式原生可联动。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| 金融服务（wb-finance-skill） | DCF 估值、财务建模、WACC 计算、敏感性分析 | WorkBuddy 内置 | WorkBuddy 账号 |
| 市场数据拉取 | 自动拉取 NVIDIA 最新财务数据（营收/毛利率/净利润/市值/净现金） | WorkBuddy 内置 | 无 |
| Excel 生成 | 输出包含原生公式的 .xlsx 文件（DCF Sheet + WACC Sheet） | WorkBuddy 内置 | 无 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 基本了解 DCF 估值、WACC、CAPM 等财务概念（能判断参数合不合理）

## 五、在 WorkBuddy 中的操作

### 步骤 1：一句话下达估值任务
指令：「帮我给 NVIDIA 做一个完整的 DCF 估值，考虑 AI 芯片需求的 Bear/Base/Bull 三种情景，Base case 假设未来 5 年营收 CAGR 25%，输出包含 WACC 敏感性分析和终值敏感性分析的 Excel。」
**关键步骤**：一句话包含标的、情景、CAGR、输出格式、敏感性分析要求。

### 步骤 2：自动拉取最新财务数据
WorkBuddy 第一步查 NVIDIA 最新财务数据：FY2025 全年营收 1304.5 亿美元，毛利率 75%，净利润 728.8 亿，当前市值约 3.4 万亿，股价 218 美元左右，账上净现金 329 亿。基础数据自动从市场拉取，不用手动填。

### 步骤 3：三情景假设生成
WorkBuddy 自动设了三套逻辑自洽的假设：Base Case（CAGR 25%，WACC 12%，终端增长率 3%，AI 需求持续强劲但竞争加剧）；Bear Case（CAGR 15.3%，WACC 13%，终端增长率 2.5%，ASIC 替代加速、大客户自研芯片冲击）；Bull Case（CAGR 36.4%，WACC 10.5%，终端增长率 3.5%，NVIDIA 继续保持 AI 训练和推理垄断地位）。FY2030E Revenue 分别为 266B/398B/601B，EBIT Margin 分别为 43%/52%/65%。

### 步骤 4：WACC 计算（CAPM）
无风险利率（10Y UST）4.49%（FRED DGS10，2026-06-03），Beta（5Y Monthly）1.65，股权风险溢价 5.0%（Duff & Phelps 推荐），Cost of Equity 12.74%，WACC（Base）12.0%（几乎无杠杆 ≈ Ke）。

### 步骤 5：敏感性分析表
两张敏感性分析表：WACC 敏感性（WACC 从 9% 到 15%，终端增长率从 2% 到 4%，交叉出来每股内在价值）；终端价值敏感性（终值乘数从 15x 到 35x，永续增长率从 2% 到 4%）。两张表各有 25 个数据点，表格联动的是真实的 DCF 公式，不是贴死的数。还有第三张：FY2026 营收增速 vs 终期 EBIT 利润率→隐含股价，以及 Beta vs 无风险利率→隐含股价。共 3 张表 75 个公式。

### 步骤 6：Excel 输出
两个 Sheet：DCF Sheet（市场数据、历史财务、情景假设、利润表预测、自由现金流、DCF 估值、三张敏感性表）；WACC Sheet（CAPM 模型、债务成本、资本结构、WACC 完整推导）。总共 311 个公式，75 个敏感性分析公式，所有公式原生，修改任意假设结果自动联动。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `帮我给 NVIDIA 做一个完整的 DCF 估值，考虑 AI 芯片需求的 Bear/Base/Bull 三种情景，Base case 假设未来 5 年营收 CAGR 25%，输出包含 WACC 敏感性分析和终值敏感性分析的 Excel。` | 一句话触发完整 DCF 估值流程，3 分钟生成 Excel |

## 七、在 WorkBuddy 中的效果

### 交付物
1. NVDA_DCF_Model_2026-06-05.xlsx 文件（两个 Sheet：DCF Sheet + WACC Sheet）
2. 三情景假设表（Bear/Base/Bull：CAGR 15.3%/25%/36.4%，FY2030E Revenue 266B/398B/601B，EBIT Margin 43%/52%/65%，WACC 13%/12%/10.5%）
3. WACC 计算表（CAPM：无风险利率 4.49%、Beta 1.65、ERP 5.0%、Cost of Equity 12.74%）
4. 三张敏感性分析表共 75 个公式（WACC vs 终值增长率→隐含股价 / FY2026 营收增速 vs 终期 EBIT 利润率→隐含股价 / Beta vs 无风险利率→隐含股价）
5. 总共 311 个公式，所有公式原生可联动

### 结果证明

![金融服务指令](/images/workbuddy-cases/case-66/01.png)

![三情景框架表](/images/workbuddy-cases/case-66/02.png)

![WACC 计算与敏感性分析](/images/workbuddy-cases/case-66/03.png)

![DCF Sheet](/images/workbuddy-cases/case-66/04.png)

![WACC Sheet](/images/workbuddy-cases/case-66/05.png)

## 八、验收标准

- [ ] 一句话指令包含 NVIDIA 标的、Bear/Base/Bull 三情景、CAGR 25%、WACC 敏感性、终值敏感性、Excel 输出
- [ ] 自动拉取 FY2025 数据：营收 1304.5 亿美元、毛利率 75%、净利润 728.8 亿、净现金 329 亿
- [ ] 三情景假设表：Bear CAGR 15.3%/Base 25%/Bull 36.4%，FY2030E Revenue 266B/398B/601B
- [ ] EBIT Margin 终期：Bear 43%/Base 52%/Bull 65%
- [ ] WACC：Bear 13.0%/Base 12.0%/Bull 10.5%
- [ ] 终端增长率：Bear 2.5%/Base 3.0%/Bull 3.5%
- [ ] CAPM 计算：无风险利率 4.49%、Beta 1.65、ERP 5.0%、Cost of Equity 12.74%
- [ ] 三张敏感性分析表共 75 个公式
- [ ] Excel 两个 Sheet（DCF Sheet + WACC Sheet），总共 311 个公式
- [ ] 所有公式原生，修改任意假设结果自动联动
- [ ] 3 分钟内生成 Excel 文件
