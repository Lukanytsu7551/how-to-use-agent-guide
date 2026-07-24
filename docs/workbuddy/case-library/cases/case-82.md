# Case 82｜AI帮我分析热点案件，报告还直接上线了

> **WorkBuddy 案例集 · 第 82 篇**
> 分类：内容创作与新媒体运营

---

## 一、场景描述

刷到新闻：重庆「遇见小面」跑去河南南阳把「渝见小面」夫妻店告了，说商标侵权。第一反应是这也能告——「渝」是重庆地名，「小面」是通用名称。光靠直觉不行，决定用 WorkBuddy 正儿八经分析这个案子。本篇记录如何用案件分析报告 Skill + 华宇元典法律数据 MCP，调用法律关系分析法（三段论 + 五步骤框架）输出结构化报告，再用 frontend-design 做成「司法墨韵」风格 HTML，最后 cloudstudio-deploy 部署上线让所有人都能看到。

## 二、想要完成的任务

使用 WorkBuddy 调用「案件分析报告（法律关系分析法 Plus）」Skill 和华宇元典法律数据 MCP，分析「遇见小面诉渝见小面商标侵权纠纷案」。检索真实法律条文（商标法第五十七条/五十九条）和类案（最高法民申 1374 号太平豆腐案），按法律关系分析法两阶段五步骤生成 Markdown 报告；再用 frontend-design 做成宣纸底色 + 朱砂红点缀 + 衬线字体的「司法墨韵」风格 HTML 页面；最后用 cloudstudio-deploy 部署到线上生成公网链接。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| 案件分析报告（法律关系分析法 Plus） | 按三段论 + 五步骤框架生成结构化案件分析报告 | SkillHub 安装 | SkillHub 账号 |
| 华宇元典法律数据 MCP | 检索真实法律条文、类案、最高法答问，避免 AI 编造法条 | WorkBuddy 连接器 | 华宇元典账号（微信扫码） |
| frontend-design | 把 Markdown 报告转成「司法墨韵」风格 HTML 页面 | WorkBuddy 内置 | WorkBuddy 账号 |
| cloudstudio-deploy | 把 HTML 部署到云端生成公网链接 | WorkBuddy 内置 | WorkBuddy 账号 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 在 WorkBuddy 左侧「连接器」里找到「Huayu Yuandian Legal Data」并点击连接
3. 微信扫码登录/注册华宇元典账号，同意协议并确认授权
4. 从 SkillHub 安装「案件分析报告（法律关系分析法 Plus）」Skill
5. MCP 状态显示「已连接」

## 五、在 WorkBuddy 中的操作

### 步骤 1：装华宇元典 MCP
在 WorkBuddy 左侧点「连接器」，列表里找到「Huayu Yuandian Legal Data」，点 + 号弹出连接弹窗，点「连接」。跳转到华宇元典页面，微信扫码登录（新用户需先注册），勾选同意协议，点「同意并继续」。最后一步确认给 WorkBuddy 授权调用元典数据接口，点「确认授权」。回到 WorkBuddy 状态显示「已连接」。
**关键步骤**：连接器里点「Huayu Yuandian Legal Data」→ 微信扫码 → 同意协议 → 确认授权 → 状态「已连接」。

### 步骤 2：装案件分析 Skill
从 SkillHub 安装「案件分析报告（法律关系分析法 Plus）」Skill，作者是浙江金道律师事务所龚家勇律师。让 WorkBuddy 帮忙安装，整个准备工作完成。
**关键步骤**：SkillHub 搜索并安装案件分析报告 Skill。

### 步骤 3：说一句「帮我分析案件」
跟 WorkBuddy 说「帮我分析下案件，网上前两天的遇见小面状告河南夫妻店渝见小面事件」。WorkBuddy 先自己上网扒案件材料（原告、被告、事实经过、索赔金额），然后调用华宇元典 MCP 检索《商标法》第五十七条/五十九条、查找「商标近似判断」类案、重点搜索「地名正当使用」判例。
**关键步骤**：一句话指令触发 Skill，AI 自动扒案件材料 + 调 MCP 检索法条和类案。

### 步骤 4：按法律关系分析法生成报告
报告按两阶段五步骤走。第一阶段发现案件事实：原告遇见小面（港股上市，近 600 家门店）、被告渝见小面（河南南阳夫妻店，2024 年 8 月开业，一碗 8 元）、索赔 7000-8000 元、原告起诉后舆论反弹火速撤诉。第二阶段法律分析：争议焦点有四个，关键两个——「渝见」和「遇见」是否构成近似商标（结论：不构成，字形/含义不同）；「渝」字使用是否正当（结论：地名正当使用，商标法第五十九条明确规定）。还找到最高法类案（2024 最高法民申 1374 号太平豆腐案），确立「地名正当使用不构成侵权」裁判规则。
**关键步骤**：两阶段五步骤框架输出结构化分析报告，含当事人/时间线/争议焦点/类案引用。

### 步骤 5：Markdown → HTML 司法墨韵风格
分析做完生成了 Markdown 报告但长得朴素。用 frontend-design 技能，要求「司法墨韵」风格——宣纸底色、朱砂红点缀、衬线字体（Noto Serif SC）、侧边导航、时间线、法条引用卡片（红色左边框）、争议焦点分析卡里嵌三段论结构（大前提/小前提/结论）。几分钟后 HTML 出来。
**关键步骤**：frontend-design 把 Markdown 转成「司法墨韵」风格 HTML，含侧边圆点导航和三段论结构卡。

### 步骤 6：部署上线
跟 WorkBuddy 说「帮我把这个 HTML 部署到线上，让所有人都能看到」。WorkBuddy 调 cloudstudio-deploy，几分钟后分享链接出来：https://9a4e284c5f9a4e3a904f74b45c5cc452.app.codebuddy.work。
**关键步骤**：cloudstudio-deploy 部署 HTML 到云端，返回公网链接。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `https://skillhub.cn/skills/case-analysis-report-legal-relationship-analysis-method-plus 帮我看下这个skill有什么作用?` | 查询 Skill 作用 |
| 2 | `那你再帮我看下这个华宇元典法律数据 MCP，这个mcp有什么作用?` | 查询 MCP 能力 |
| 3 | `我已经安装了这个mcp, https://skillhub.cn/skills/case-analysis-report-legal-relationship-analysis-method-plus 帮我安装下这个skill` | 安装案件分析 Skill |
| 4 | `帮我分析下案件，网上前两天的遇见小面状告河南夫妻店渝见小面事件。` | 触发 Skill 分析案件 |
| 5 | `做成 HTML，司法墨韵风格，宣纸底色、朱砂红点缀、衬线字体，侧边导航、时间线、法条引用卡片。` | 用 frontend-design 生成 HTML |
| 6 | `帮我把这个 HTML 部署到线上，让所有人都能看到。` | 用 cloudstudio-deploy 部署上线 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. Markdown 案件分析报告（含两阶段五步骤分析、当事人、时间线、争议焦点、类案引用）
2. HTML 可视化页面（「司法墨韵」风格，宣纸底色 + 朱砂红 + Noto Serif SC 字体 + 侧边导航 + 法条引用卡 + 三段论结构卡）
3. 公网访问链接：https://9a4e284c5f9a4e3a904f74b45c5cc452.app.codebuddy.work

### 结果证明

![Skill 作用介绍](/images/workbuddy-cases/case-82/01.png)

![华宇元典 MCP 能力表](/images/workbuddy-cases/case-82/02.png)

![连接器列表找到华宇元典](/images/workbuddy-cases/case-82/03.png)

![点击连接弹窗](/images/workbuddy-cases/case-82/04.png)

![微信扫码登录华宇元典](/images/workbuddy-cases/case-82/05.jpg)

![同意协议页面](/images/workbuddy-cases/case-82/06.png)

![确认授权页面](/images/workbuddy-cases/case-82/07.png)

![MCP 已连接并安装 Skill](/images/workbuddy-cases/case-82/08.png)

![Markdown 案件分析报告](/images/workbuddy-cases/case-82/09.png)

![HTML 司法墨韵风格页面](/images/workbuddy-cases/case-82/10.png)

## 八、验收标准

- [ ] 已在 WorkBuddy「连接器」里找到「Huayu Yuandian Legal Data」
- [ ] 已微信扫码登录华宇元典账号
- [ ] 已同意协议并确认授权，MCP 状态显示「已连接」
- [ ] 已从 SkillHub 安装「案件分析报告（法律关系分析法 Plus）」Skill
- [ ] 报告含原告遇见小面（港股上市，近 600 家门店）和被告渝见小面（河南南阳夫妻店）基本信息
- [ ] 报告含事件时间线（2026.06.11 起诉 → 06.13 撤诉 → 06.15 创始人致歉）
- [ ] 报告引用《商标法》第五十七条和第五十九条
- [ ] 报告引用最高法民申 1374 号太平豆腐案作为类案
- [ ] 争议焦点分析包含「渝见」与「遇见」是否构成近似商标的结论（不构成）
- [ ] 争议焦点分析包含「渝」字使用是否正当的结论（地名正当使用）
- [ ] HTML 页面为「司法墨韵」风格：宣纸底色 + 朱砂红 + Noto Serif SC 字体
- [ ] HTML 页面含侧边圆点导航、时间线、法条引用卡（红色左边框）
- [ ] HTML 页面争议焦点卡里嵌三段论结构（大前提/小前提/结论）
- [ ] 公网链接可访问：https://9a4e284c5f9a4e3a904f74b45c5cc452.app.codebuddy.work
- [ ] 全程从「看到新闻」到「报告上线」只用几句话指令
