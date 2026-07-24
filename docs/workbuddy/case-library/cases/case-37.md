# Case 37｜探索新功能，一键制作 3D 可视化数字大屏

> **WorkBuddy 案例集 · 第 37 篇**
> 分类：数据分析与可视化

---

## 一、场景描述

朋友做智慧城市项目，突然问了一句「那种很酷的数据大屏，是不是得专门雇个前端才能搞？」正好 WorkBuddy 升级后多出来一个「探索」模块，里面直接提供 3D 可视化大屏能力。打开看了一眼，里面可以基于 CSS 3D 变换、伪等距投影、动态数据流生成汇报级数据大屏。

抱着给朋友演示一下的心态，把能想到的大屏需求一次性全丢进去：深色主题背景、CSS 3D perspective 伪等距投影、3D 柱状图、旋转环形指标盘、SVG 路径连线动画、关键指标发光脉冲、数字计数器动画、响应式网格布局、监控指标（人口流量、能耗指数、交通密度、空气质量）、全部 CSS/JS 内联无外部依赖。看起来需求很多，但对 AI 来说越详细越好。

WorkBuddy 直接开始写代码，生成一个完整的单文件 HTML，包含顶部 KPI 卡片、中间 3D 柱状图与环形仪表盘、底部 sparkline 趋势线。中间还遇到一个 SVG 渐变作用域 Bug——环形盘共用了页面顶部隐藏 SVG 的渐变定义，跨 SVG 引用 url(#grad-cyan) 在大部分浏览器失效。WorkBuddy 自己定位到原因，把渐变改为每个环形盘单独声明，并把 CSS transition 改成 requestAnimationFrame 控制。修完之后再跑，渐变描边、2 秒缓入动画与设计预期完全对得上。

## 二、想要完成的任务

用 WorkBuddy 探索模块的 3D 数据可视化能力，一句话生成一个「智慧城市运营监控中心」3D 数据可视化大屏单文件 HTML，包含 KPI 卡片、3D 柱状图、环形仪表盘、趋势线，全部 CSS/JS 内联无外部依赖。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| 探索模块 · 3D 数据可视化大屏 | 一句话生成 3D 可视化大屏单文件 HTML | WorkBuddy 探索模块 | WorkBuddy 账号 |
| Craft Auto 技能 | 自动调用前端开发能力构建单文件 HTML | 内置技能 | 本地文件读写 |
| 代码自检与修复能力 | 定位 SVG 渐变作用域 Bug 并修复 | 内置能力 | 本地文件读写 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端（版本含「探索」模块）
2. 网络可用，能正常加载探索模块能力
3. 准备好大屏需求清单（颜色色值、技术路线、监控指标、布局结构）
4. 工作区可写入文件（用于保存 HTML 单文件）

## 五、在 WorkBuddy 中的操作

### 步骤 1：说清楚想要什么
在探索模块的对话框里，把想到的大屏需求一次性全丢进去：深色主题背景（#0a0e27 → #1a1f3a 渐变）、CSS 3D perspective 伪等距投影、3D 柱状图（rotateX/rotateY/translateZ）、旋转环形指标盘（渐变描边）、SVG 路径 dash 连线动画、关键指标发光脉冲效果、数字从 0 开始的计数器动画、响应式网格布局（顶部 KPI、中间 3D 图表、底部趋势线）、监控指标（人口流量、能耗指数、交通密度、空气质量）、全部 CSS/JS 内联无外部 CDN、系统字体栈、无 emoji。
**关键步骤**：颜色直接给色值（#0a0e27 → #1a1f3a），技术路线直接写（CSS 3D perspective），避免歧义。

### 步骤 2：WorkBuddy 直接开始写代码
WorkBuddy 调用所需技能后创建完整的单文件 HTML。布局结构为响应式网格：顶部 4 个 KPI 卡片（人口流量、能耗指数、交通密度、空气质量）带 perspective 伪等距投影；中间左侧 3D 柱状图（7 个区域能耗分布），右侧 4 个环形指标盘；底部 SVG 城市节点网络拓扑 + 24h 趋势折线图 + 实时预警信息 + 区域热力分布。
**关键步骤**：3D 与动效全部内联实现，rotateX(-15deg) rotateY(-20deg) 构建带深度的伪 3D 柱状图。

### 步骤 3：动画与规格细节
动画效果包括：数字从 0 滚动到目标值带缓动（requestAnimationFrame）、环形盘 2 秒缓入动画（stroke-dashoffset）、3D 柱状图透视变换、连线 dash 流动动画、关键指标 box-shadow 发光呼吸 + node-ping 脉冲扩散、趋势线 stroke-dashoffset 路径绘制动画。规格上零外部依赖、全部 CSS/JS 内联、系统字体栈无 emoji、支持 prefers-reduced-motion 和响应式断点（1200px/768px）。
**关键步骤**：单文件 HTML 双击就能在浏览器打开，不用联网不用装任何东西。

### 步骤 4：出了 Bug，WorkBuddy 自己修
第一版跑起来后，环形仪表盘是灰色的静态圆环，没有颜色也没有动画。直接跟 WorkBuddy 说现象："核心指标环形盘中的为什么是用的图片，不是动态的？"WorkBuddy 直接去查代码，定位到原因：第一版所有环形盘的 SVG 共用了页面顶部一个隐藏 SVG 里的渐变定义，但跨 SVG 引用 url(#grad-cyan) 这种写法在大部分浏览器里失效，是经典的 SVG 渐变作用域 Bug。修复方案是每个环形盘的 SVG 里面单独声明渐变，同时把 CSS transition 改成用 JavaScript 的 requestAnimationFrame 来控制动画。
**关键步骤**：遇到 Bug 直接描述看到的现象（如"环形盘没有动画"），不用解释原因，WorkBuddy 自己排查。

### 步骤 5：修完再跑，效果对齐
修完之后再跑——渐变描边、2 秒缓入动画，和设计预期完全对得上。在线体验地址：https://panda.yaniw.com/3dcity。整个大屏层次感强：顶部 KPI 卡片发光脉冲边框数字从 0 滚动进场，中间左侧 CSS 3D 柱状图带透视感、右侧 4 个环形仪表盘带渐变动画，底部 Canvas sparkline 带区域填充。
**关键步骤**：一个 HTML 文件打开就能用，不用联网不用装任何东西。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `帮我构建一个「智慧城市运营监控中心」3D 数据可视化大屏，要求：深色主题背景（#0a0e27 → #1a1f3a 渐变）、CSS 3D perspective 伪等距投影、3D 柱状图（rotateX/rotateY/translateZ）、旋转环形指标盘（渐变描边）、SVG 路径 dash 连线动画、关键指标发光脉冲效果、数字从 0 开始的计数器动画、响应式网格布局（顶部 KPI、中间 3D 图表、底部趋势线）、监控指标（人口流量、能耗指数、交通密度、空气质量）、全部 CSS/JS 内联无外部 CDN、系统字体栈、无 emoji` | 一次性丢出完整大屏需求 |
| 2 | `核心指标环形盘中的为什么是用的图片，不是动态的？` | 描述 Bug 现象，触发 WorkBuddy 自检与修复 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 一个完整的单文件 HTML 3D 数据可视化大屏（智慧城市运营监控中心）
2. 顶部 4 张 KPI 卡片（人口流量、能耗指数、交通密度、空气质量，带发光脉冲）
3. 中间 CSS 3D 透视柱状图（7 个区域能耗分布）+ 4 个环形仪表盘（路网通畅率、能源利用率、绿化覆盖率等）
4. 底部 SVG 城市节点网络拓扑 + 24h 趋势折线图 + 实时预警 + 区域热力分布
5. 全部动画效果（计数器缓动、环形盘 2 秒缓入、3D 透视、dash 流动、发光呼吸、脉冲扩散）
6. 在线体验地址：https://panda.yaniw.com/3dcity

### 结果证明

![WorkBuddy 探索模块入口与 3D 数据可视化大盾示例](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbROfvovBIJOk6X9yPEqskoKpgYsfzqjRh9dx0xcMAG8NusfNXL6rBxPEBYrfa3WPqBXfksP5kNajwMylNRoPQFVKvJvv8M7IqqA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

![在探索模块对话框一次性丢出完整大屏需求](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbROx0X1KcIicpHavAuxCBJ7RR3t17KWEx2jpxA6fBjiaD8pJyuYew3CZ1cdqkctTbGmQcFP7y70TbpwSAX2ZRMT4Pic9P6A57vuxcg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

![WorkBuddy 自动调用技能并开始写代码](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRNjndebv1Imjh3ibvLUj0zLGN1kXO9OxXZSNfsDRlEy62wUX6rubUNBwx8ibYibALs6I7oo9RqVrBFP0tvibIKZlc7m9HnCVgtyHg0/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

![大屏第一版效果：KPI 卡片与 3D 柱状图](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRMqrrGuXicxLzqtFAGQRLyklZoB3e7ibR4ZaNaj81aIuRQrG01jibnY4ylFs98QpNv8OIn6XCZaYdbnACGg7BDzEK2fClUehYcGW4/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

![修复后的核心指标环形盘带渐变与动画](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbROj0fl2qCxAgz8QbkShRMMMXTFkXnCeecBAL4TR26qxonDSItzCs2HPFfPF7qQTtNibicc2PzOicMvibfhsABwD79rU8SrQMibS95l0/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

### 传统方式 vs WorkBuddy 方式

| 维度 | 传统方式 | WorkBuddy 方式 |
|---|---|---|
| 人员 | 需要前端团队 | 一句话生成 |
| 耗时 | 数天开发 | 几分钟 |
| 依赖 | 需要构建工具与外部库 | 单文件 HTML，零外部依赖 |
| Bug 修复 | 人工排查 | 描述现象，AI 自检修复 |
| 分发 | 需要部署 | 双击即可打开 |

## 八、验收标准

- [ ] 成功在「探索」模块触发 3D 数据可视化大屏能力
- [ ] 一次性提交完整需求（含色值、技术路线、监控指标、布局结构）
- [ ] 生成单文件 HTML，全部 CSS/JS 内联，无外部 CDN
- [ ] 顶部 KPI 卡片包含 4 项指标（人口流量、能耗指数、交通密度、空气质量），带发光脉冲
- [ ] 中间包含 CSS 3D 透视柱状图与 4 个环形仪表盘
- [ ] 底部包含 SVG 节点拓扑 + 趋势折线图 + 预警信息
- [ ] 数字从 0 滚动到目标值带缓动（requestAnimationFrame）
- [ ] 环形盘有 2 秒缓入动画（stroke-dashoffset）
- [ ] 支持响应式断点（1200px/768px）与 prefers-reduced-motion
- [ ] Bug 修复后环形盘渐变描边正常显示
- [ ] 单文件 HTML 双击即可在浏览器打开，不用联网
