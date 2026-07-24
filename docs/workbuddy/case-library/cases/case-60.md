# Case 60｜灵感里的隐藏宝藏：一键生成学习路线还能直接部署上线

> **WorkBuddy 案例集 · 第 60 篇**
> 分类：知识管理与学习成长

---

## 一、场景描述

很多人用 WorkBuddy 只关注了左侧的「新建任务」，其实点击「更多」→「灵感」，里面藏着一个庞大的预置场景库。点进去之后按场景分类：办公协同、投资理财、内容创作、数据分析、效率工具、开发工具、知识与学习……一眼就在「知识与学习」分类里看到了「Python 零基础学习路径」——90 天系统化学习规划，从入门到能做项目。

## 二、想要完成的任务

用 WorkBuddy 灵感库 + Education 技能 + frontend-design + cloudflare-deploy，从零生成一份 Python 90 天学习规划 Markdown 文档，然后做成 Terminal Brutalist 风格的 HTML 单页应用，最后自动部署到 Cloudflare Pages 全网可访问，全程零代码操作。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| 灵感库（预置场景库） | 找到 Python 零基础学习路径场景 | WorkBuddy 内置 | WorkBuddy 账号 |
| Education 技能 | 自动生成专业学习内容（MD 文件） | WorkBuddy 技能市场 | WorkBuddy 账号 |
| frontend-design 技能 | 把内容变成 HTML 视觉作品 | WorkBuddy 技能市场 | WorkBuddy 账号 |
| cloudflare-deploy 技能 | 自动推送到 Cloudflare Pages 全网可访问 | WorkBuddy 技能市场 | Cloudflare 账号 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 已安装 frontend-design 技能
3. 已安装 cloudflare-deploy 技能

## 五、在 WorkBuddy 中的操作

### 步骤 1：发现灵感库入口
点击 WorkBuddy 左侧「更多」→「灵感」，进入预置场景库。按场景分类：办公协同/投资理财/内容创作/数据分析/效率工具/开发工具/知识与学习/信息与资讯。
**关键步骤**：「更多」→「灵感」入口，很多人忽略了。

### 步骤 2：选 Python 零基础学习路径场景
在「知识与学习」分类里找到「Python 零基础学习路径」——90 天系统化学习规划，从入门到做项目。点击这个场景后 WorkBuddy 自动写好了提示词。

### 步骤 3：一句话生成完整学习计划
提示词内容正好是想要的，直接发送："我是编程零基础，想系统学习 Python，目标是 90 天后能独立做小项目。每天投入约 2 小时，帮我规划一下。"
WorkBuddy 的 Education 技能被自动触发，输出了涵盖四阶段的完整规划：
- 基础入门（第 1-3 周）：语法、变量、数据类型、条件循环、函数、列表字典
- 进阶掌握（第 4-6 周）：文件操作、异常处理、面向对象、模块、测试调试
- 应用实战（第 7-9 周）：爬虫、自动化脚本、Flask Web 开发、数据库基础
- 项目冲刺（第 10-13 周）：独立项目实战、Git 协作、部署上线
**关键步骤**：Education 技能自动触发，输出四阶段完整规划。

### 步骤 4：附带内容
不仅如此还附带了：每周具体目标和验证标准、免费学习资源推荐（官方文档/廖雪峰教程/Real Python/YouTube 频道）、实战项目选题（命令行工具/爬虫/Web 应用/自动化脚本）、避坑指南（只看不写/追求完美/孤立学习/跳过基础等 7 条）、每日时间分配模板（回顾 5min→学新 25min→动手 60min→笔记 15min→探索 15min）。
这已经不是"给个大纲"了，是可以直接照着执行的学习方案。

### 步骤 5：一句话把计划变成可分享的网页
指令："帮我把生成的学习计划，使用frontend-design做成html,部署到线上。把部署好的地址给我。"
不到两分钟生成了一个 Terminal Brutalist 风格的单页应用：暗色代码编辑器美学，四阶段用绿/蓝/黄/红颜色编码贯穿全页，左侧 timeline 对应不同阶段自动变色，滚动进度条+元素渐入动画，完整的学习计划表格+项目选题卡片+避坑卡片+资源推荐+进度检查清单+每日模板，底部有可点击复制的启动命令，纯 HTML/CSS/JS 零外部依赖，手机端自适应。

### 步骤 6：一键部署全网可访问
执行部署指令时，WorkBuddy 自动调用 cloudflare-deploy 技能，把 HTML 文件直接推上 Cloudflare Pages，秒级上线。
**关键步骤**：cloudflare-deploy 技能自动推送 Cloudflare Pages。
在线地址：https://99ccae56297b4ccca2d1a48a97bced84.app.codebuddy.work

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `我是编程零基础，想系统学习 Python，目标是 90 天后能独立做小项目。每天投入约 2 小时，帮我规划一下。` | 触发 Education 技能生成 90 天四阶段学习计划 |
| 2 | `帮我把生成的学习计划，使用frontend-design做成html,部署到线上。把部署好的地址给我。` | 触发 frontend-design 做 HTML+cloudflare-deploy 部署上线 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. Python 90 天学习规划 Markdown 文档（四阶段：基础入门/进阶掌握/应用实战/项目冲刺）
2. 每周具体目标和验证标准
3. 免费学习资源推荐（官方文档/廖雪峰教程/Real Python/YouTube 频道）
4. 实战项目选题（命令行工具/爬虫/Web 应用/自动化脚本）
5. 避坑指南 7 条（只看不写/追求完美/孤立学习/跳过基础等）
6. 每日时间分配模板（回顾 5min→学新 25min→动手 60min→笔记 15min→探索 15min）
7. Terminal Brutalist 风格 HTML 单页应用（暗色代码编辑器美学+四阶段颜色编码+左侧 timeline+滚动进度条+元素渐入动画）
8. 在线地址：https://99ccae56297b4ccca2d1a48a97bced84.app.codebuddy.work

### 结果证明

![灵感库入口](/images/workbuddy-cases/case-60/01.png)

![Python零基础学习路径场景](/images/workbuddy-cases/case-60/02.png)

![一句话生成HTML并部署](/images/workbuddy-cases/case-60/03.png)

## 八、验收标准

- [ ] 点击「更多」→「灵感」进入预置场景库
- [ ] 在「知识与学习」分类找到「Python 零基础学习路径」场景
- [ ] 一句话生成 90 天四阶段学习计划（基础入门第 1-3 周/进阶掌握第 4-6 周/应用实战第 7-9 周/项目冲刺第 10-13 周）
- [ ] 附带每周具体目标和验证标准
- [ ] 附带免费学习资源推荐（官方文档/廖雪峰教程/Real Python/YouTube 频道）
- [ ] 附带实战项目选题（命令行工具/爬虫/Web 应用/自动化脚本）
- [ ] 附带避坑指南 7 条
- [ ] 附带每日时间分配模板（回顾 5min→学新 25min→动手 60min→笔记 15min→探索 15min）
- [ ] 用 frontend-design 做成 Terminal Brutalist 风格 HTML 单页应用
- [ ] 四阶段用绿/蓝/黄/红颜色编码贯穿全页
- [ ] 左侧 timeline 对应不同阶段自动变色
- [ ] 滚动进度条+元素渐入动画
- [ ] 底部有可点击复制的启动命令
- [ ] 纯 HTML/CSS/JS 零外部依赖，手机端自适应
- [ ] 用 cloudflare-deploy 部署到 Cloudflare Pages 全网可访问
- [ ] 在线地址可访问：https://99ccae56297b4ccca2d1a48a97bced84.app.codebuddy.work
- [ ] 全程零代码操作，从"我想学 Python"到可访问网页不到 10 分钟
