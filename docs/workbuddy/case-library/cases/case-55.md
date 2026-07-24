# Case 55｜写完网页不会部署？Cloudflare技能一键搞定

> **WorkBuddy 案例集 · 第 55 篇**
> 分类：网站与应用开发

---

## 一、场景描述

你有没有过这种经历——用 AI 花了半天写好了一个漂亮的网页，然后发现不会部署？买个服务器？配置域名？搞 Nginx？光想想就头大。直到发现 WorkBuddy 里面有个 Cloudflare 技能，直接把部署这件事降维成了"说一句话"。

## 二、想要完成的任务

用 WorkBuddy 从零写一个 WriteFlow AI 写作工具的产品介绍页（含视差背景、打字机效果、数字跳动计数等动画），然后用 Cloudflare 技能一键部署上线，全程不到 5 分钟，0 元成本。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| Web 动画设计技能 | 生成滚动叙事 HTML 页面 | WorkBuddy 技能市场 | WorkBuddy 账号 |
| Cloudflare 技能 | 一键部署到 Cloudflare Pages | WorkBuddy 技能市场 | 需安装并登录 Cloudflare 账号 |
| Wrangler（Cloudflare CLI） | 执行项目创建和部署命令 | Cloudflare 内置 | Cloudflare 账号 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 已在技能市场安装 Cloudflare 技能
3. 有 Cloudflare 账号（可免费注册，无需信用卡）

## 五、在 WorkBuddy 中的操作

### 步骤 1：写需求生成页面
跟 WorkBuddy 描述需求：一款叫 WriteFlow 的 AI 写作工具的产品介绍页，滚动叙事长页面，要有视差背景、打字机效果、数字跳动计数这些花哨的动画，纯 HTML/CSS/JS 不依赖外部库。大概 30 秒生成了一个完整的单文件页面，6 个区块全部做了滚动动画，靛蓝到紫到粉的渐变配色。
**关键步骤**：描述清楚页面需求+动画类型+技术栈要求。

### 步骤 2：安装 Cloudflare 技能
打开 WorkBuddy 左侧边栏点击「技能」，在技能市场搜索 Cloudflare，找到后点击安装。安装完成后就能在任何对话里用 @Cloudflare 调用它。
**关键步骤**：技能市场搜索 Cloudflare 并安装。

### 步骤 3：说一句话触发部署
指令："@Cloudflare 帮我把这个页面部署到网上"
WorkBuddy 立刻识别到这是部署需求，自动加载 Cloudflare 技能。

### 步骤 4：检查环境+登录 Cloudflare
WorkBuddy 检查环境：Wrangler 已安装但还没登录 Cloudflare 账号。弹出选项：登录 Cloudflare 部署（用浏览器登录授权，部署到 Cloudflare Pages）/用 CloudStudio 沙箱部署（不需要登录但链接有时效）。选第一个，自动执行 wrangler login，浏览器弹出 Cloudflare 授权页面，点"允许"就登录成功。
**关键步骤**：选"登录 Cloudflare 部署"+浏览器点允许授权。

### 步骤 5：自动执行三步部署
WorkBuddy 自动执行：
```
# 1. 创建项目
wrangler pages project create writeflow
# 2. 部署文件
wrangler pages deploy . --project-name writeflow --branch main
# 3. 部署完成，返回链接
```
全自动，不需要手动输入任何命令。几秒钟后页面就上线了。
**关键步骤**：自动执行 project create + pages deploy 两步命令。

### 步骤 6：踩坑修复
第一次部署完成后访问链接返回 404。原因：对话里删除了部署用的临时目录导致线上内容被清空。解决方法：重新部署一次。WorkBuddy 直接执行 `cp writeflow.html index.html && wrangler pages deploy . --project-name writeflow --branch main && rm index.html`。3 秒搞定，页面立刻恢复正常。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `帮我设计一个产品介绍的滚动叙事页面。产品是一款AI写作工具叫WriteFlow。页面需要包含：1)首屏Hero区带视差背景和打字机效果标题；2)痛点陈述区，3张卡片滚动渐入；3)解决方案展示区，功能卡片从左右两侧交替滑入；4)数据统计区，数字在滚动到可视区时自动跳动计数(1000万+用户、50+语言、99.9%可用性、3倍提速)；5)用户评价区，卡片错落渐入；6)底部CTA区带渐变背景动画。页面顶部要有滚动进度条，整体配色用现代渐变风格(靛蓝→紫→粉)，纯HTML/CSS/JS实现，不依赖外部库。` | 描述完整页面需求触发生成 |
| 2 | `@Cloudflare 帮我把这个页面部署到网上` | 一句话触发 Cloudflare 技能部署 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. WriteFlow 产品介绍页（6 区块滚动动画+靛蓝紫粉渐变配色+纯 HTML/CSS/JS）
2. Cloudflare Pages 部署地址：writeflow-4lw.pages.dev
3. 部署耗时约 3 秒，0 元成本
4. 完整时间线：写需求 30 秒+生成页面约 1 分钟+触发部署 10 秒+登录授权 15 秒+部署上线 3 秒=约 2 分钟

### 结果证明

![Web动画设计技能输入需求](/images/workbuddy-cases/case-55/01.png)

![技能市场搜索Cloudflare](/images/workbuddy-cases/case-55/02.png)

![一句话触发Cloudflare技能部署](/images/workbuddy-cases/case-55/03.png)

![Cloudflare授权页面](/images/workbuddy-cases/case-55/04.png)

![部署成功返回链接](/images/workbuddy-cases/case-55/05.png)

![WriteFlow页面上线效果](/images/workbuddy-cases/case-55/06.png)

![踩坑404修复截图](/images/workbuddy-cases/case-55/07.png)

## 八、验收标准

- [ ] 用 Web 动画设计技能生成完整 HTML 页面（6 区块滚动动画+靛蓝紫粉渐变）
- [ ] 在技能市场搜索 Cloudflare 并安装
- [ ] 用 @Cloudflare 一句话触发部署
- [ ] 选"登录 Cloudflare 部署"+浏览器点允许授权完成 wrangler login
- [ ] WorkBuddy 自动执行 wrangler pages project create writeflow
- [ ] WorkBuddy 自动执行 wrangler pages deploy . --project-name writeflow --branch main
- [ ] 部署成功返回生产域名 writeflow-4lw.pages.dev
- [ ] 部署耗时约 3 秒，0 元成本
- [ ] 从需求到上线合计约 2 分钟
- [ ] 踩坑修复：404 时用 cp writeflow.html index.html && wrangler pages deploy 重新部署
