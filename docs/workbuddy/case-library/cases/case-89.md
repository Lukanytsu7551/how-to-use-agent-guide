# Case 89｜丢一句话进去，AI给我吐出一个科技大会官网出来

> **WorkBuddy 案例集 · 第 89 篇**
> 分类：网站与应用开发

---

## 一、场景描述

周末晚上闲着没事，想测试一件事：如果只用一句话，能不能让 WorkBuddy 做出一个完整、可以直接上线的大会官网？不是套模板的简陋页面，要有 Hero 大标题、实时倒计时、演讲者阵容、时间线日程、数字滚动动画、带校验的报名表单、Footer 社交图标——一个真正的 AI 科技大会落地页。风格要 Apple + Mistral 那种极简风，大量留白，高端科技感。本篇记录如何用一句话指令让 WorkBuddy 写出 1363 行单文件 HTML（内联 CSS、零 CDN、原生 JS），再用 cloudstudio-deploy 一键部署上线。

## 二、想要完成的任务

使用 WorkBuddy 生成 AI 科技大会活动落地页（单文件 HTML，内联无外部依赖），Apple + Mistral 极简风格，大量留白、高端科技氛围。含 6 个模块：Hero（大会名「AI Frontier 2026」+ 副标题 + 日期地点 + 实时倒计时 + 报名 CTA）、演讲者阵容（6 位嘉宾姓名/职位/公司）、日程（时间线布局分上午/下午）、亮点数字（参会者 2000+/演讲 30+/Workshop 12/合作伙伴 50+ 滚动递增）、报名表单（姓名/邮箱/公司/职位 + 基础校验）、Footer（社交图标 + 版权）。最后用 cloudstudio-deploy 部署上线。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| frontend-design（前端开发 + 品牌设计风格专家） | 生成单文件 HTML 落地页 | WorkBuddy 内置 | WorkBuddy 账号 |
| cloudstudio-deploy | 把 HTML 部署到云端生成公网链接 | WorkBuddy 内置 | WorkBuddy 账号 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 本地有浏览器可打开 HTML 预览
3. 可访问 cloudstudio.work 域名

## 五、在 WorkBuddy 中的操作

### 步骤 1：一句话发需求
把完整需求一次性发给 WorkBuddy：「前端开发 品牌设计风格专家请生成一个AI科技大会活动落地页(单文件HTML,内联无外部依赖),Apple + Mistral 极简风格，大量留白、高端科技氛围。模块:1.Hero:大会名「AI Frontier 2026」+副标题「探索AI的下一个前沿」+日期地点+实时倒计时+报名CTA。2.演讲者阵容:6位嘉宾(姓名/职位/公司)。3.日程:时间线布局，分上午/下午。4.亮点数字:参会者2000+/演讲30+/Workshop12/合作伙伴50+(滚动数字递增)。5.报名表单:姓名/邮箱/公司/职位+基础校验。6.Footer:社交图标 + 版权」。WorkBuddy 唰唰唰写完，1363 行，单文件，内联 CSS，零 CDN，全部原生 JS。
**关键步骤**：一句话需求覆盖 6 模块 + Apple + Mistral 极简风格 + 单文件内联无外部依赖。

### 步骤 2：浏览器打开查看效果
直接在浏览器里打开。顶部导航是毛玻璃效果，滚动后自动出现模糊背景。Hero 区域：大标题「AI Frontier 2026」、副标题「探索 AI 的下一个前沿」、日期 2026 年 9 月 18-20 日、地点北京国家会议中心、两个 CTA 按钮。下面实时倒计时——目标日期 2026 年 9 月 18 日，天/时/分/秒逐秒跳动。
**关键步骤**：Hero 区含标题/副标题/日期地点/CTA/实时倒计时（逐秒跳动）。

### 步骤 3：查看演讲者 + 日程模块
演讲者阵容 6 位嘉宾用 grid 网格布局：Yann LeCun（Meta AI Research 首席 AI 科学家）、Demis Hassabis（Google DeepMind CEO & 联合创始人）、Andrej Karpathy（独立研究员，前 OpenAI/Tesla）、Fei-Fei Li（Stanford HAI 教授 & 联合院长）、Ilya Sutskever（Safe Superintelligence 创始人 & CEO）、周志华（南京大学人工智能学院教授 & 院长）。每个卡片有姓名、职位、公司、领域标签。hover 上去背景微微变色——Apple 风格那种克制的交互。日程用时间线布局，三天 Tab 切换。每天分上午/下午，每个环节用一条竖线串起来，圆点在线上。每个环节有分类标签：Keynote、Workshop、圆桌、休息——用了不同颜色 badge。这个细节没在提示里说，是 WorkBuddy 自己判断的。
**关键步骤**：演讲者 6 位 grid 布局 + hover 微变色；日程三天 Tab + 时间线竖线圆点 + 分类标签色 badge。

### 步骤 4：查看数字亮点 + 报名表单
数字亮点模块黑底白字整块反白。四个数字：2000+ 参会者、30+ 演讲、12 个 Workshop、50+ 合作伙伴。数字不是直接显示——滚到可视区域时从 0 滚动到目标值，用 ease-out cubic 缓动。报名表单四个字段：姓名、邮箱、公司、职位。每个都有校验——邮箱正则、必填提示。提交后显示 loading 动画（三个跳动小圆点），然后切到成功状态。这些交互逻辑全在一个 HTML 里，没有任何后端。
**关键步骤**：数字滚动动画（ease-out cubic）+ 表单校验（邮箱正则/必填）+ 提交 loading + 成功状态。

### 步骤 5：查看 Footer + 部署上线
Footer 含品牌名、导览链接、社交图标（X、LinkedIn、微信、GitHub）——全是 SVG 手绘的，没用任何图标库。到这活已经干得不错了，但还想看看能不能直接部署上线。说「使用 cloudstudio-deploy 部署上线」。WorkBuddy 调 CloudStudio 部署能力，把文件上传到沙箱，几秒钟给了一个公网链接：https://e7c1ef3d214b4f99941659c29977905e.app.codebuddy.work。可以直接打开，一个完整的 AI 科技大会落地页就这么上线了。
**关键步骤**：Footer 含 SVG 手绘社交图标；cloudstudio-deploy 一键部署返回公网链接。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `前端开发 品牌设计风格专家请生成一个AI科技大会活动落地页(单文件HTML,内联无外部依赖),Apple + Mistral 极简风格，大量留白、高端科技氛围。模块:1.Hero:大会名「AI Frontier 2026」+副标题「探索AI的下一个前沿」+日期地点+实时倒计时+报名CTA。2.演讲者阵容:6位嘉宾(姓名/职位/公司)。3.日程:时间线布局，分上午/下午。4.亮点数字:参会者2000+/演讲30+/Workshop12/合作伙伴50+(滚动数字递增)。5.报名表单:姓名/邮箱/公司/职位+基础校验。6.Footer:社交图标 + 版权` | 一句话生成完整落地页 |
| 2 | `使用cloudstudio-deploy 部署上线` | 部署到云端生成公网链接 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 单文件 HTML 落地页（1363 行，内联 CSS，零 CDN，全部原生 JS）
2. 6 个模块完整：Hero + 演讲者 + 日程 + 数字亮点 + 报名表单 + Footer
3. 公网访问链接：https://e7c1ef3d214b4f99941659c29977905e.app.codebuddy.work

### 结果证明

![一句话需求指令](/images/workbuddy-cases/case-89/01.png)

![Hero 区域含倒计时](/images/workbuddy-cases/case-89/02.png)

![演讲者阵容 6 位嘉宾](/images/workbuddy-cases/case-89/03.png)

![日程时间线布局](/images/workbuddy-cases/case-89/04.png)

![数字亮点黑底白字](/images/workbuddy-cases/case-89/05.png)

![报名表单含校验](/images/workbuddy-cases/case-89/06.png)

![cloudstudio-deploy 部署上线](/images/workbuddy-cases/case-89/07.png)

## 八、验收标准

- [ ] 单文件 HTML 1363 行
- [ ] 内联 CSS，零 CDN 依赖
- [ ] 全部原生 JS，无外部库
- [ ] 顶部导航毛玻璃效果，滚动后出现模糊背景
- [ ] Hero 大标题「AI Frontier 2026」
- [ ] 副标题「探索 AI 的下一个前沿」
- [ ] 日期 2026 年 9 月 18-20 日
- [ ] 地点北京国家会议中心
- [ ] 两个 CTA 按钮（立即报名 / 查看日程）
- [ ] 实时倒计时（天/时/分/秒逐秒跳动）
- [ ] 演讲者阵容 6 位嘉宾 grid 网格布局
- [ ] 含 Yann LeCun / Demis Hassabis / Andrej Karpathy / Fei-Fei Li / Ilya Sutskever / 周志华
- [ ] 每位含姓名、职位、公司、领域标签
- [ ] hover 上去背景微微变色
- [ ] 日程时间线布局，三天 Tab 切换
- [ ] 每天分上午/下午，竖线串圆点
- [ ] 每个环节分类标签（Keynote/Workshop/圆桌/休息）不同颜色 badge
- [ ] 数字亮点黑底白字反白
- [ ] 四个数字：2000+ 参会者 / 30+ 演讲 / 12 Workshop / 50+ 合作伙伴
- [ ] 数字滚动动画从 0 到目标值（ease-out cubic 缓动）
- [ ] 报名表单四字段：姓名/邮箱/公司/职位
- [ ] 邮箱正则校验、必填提示
- [ ] 提交后 loading 动画（三个跳动小圆点）+ 成功状态
- [ ] Footer 含品牌名、导览链接
- [ ] 社交图标 X/LinkedIn/微信/GitHub 全是 SVG 手绘
- [ ] 移动端响应式（两个断点）
- [ ] 无障碍 aria-label、role、prefers-reduced-motion 全配
- [ ] 顶部进度条、回到顶部按钮、导航吸顶磨砂
- [ ] 已用 cloudstudio-deploy 部署上线
- [ ] 公网链接可访问：https://e7c1ef3d214b4f99941659c29977905e.app.codebuddy.work
