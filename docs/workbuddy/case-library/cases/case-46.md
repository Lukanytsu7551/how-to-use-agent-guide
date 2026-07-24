# Case 46｜发现个实时航班模块，顺手做了个页面，使用 EdgeOne 部署到了线上

> **WorkBuddy 案例集 · 第 46 篇**
> 分类：网站与应用开发

---

## 一、场景描述

昨天在 WorkBuddy 的【探索】列表里看到一个叫"实时航班追踪"的模块，第一反应是这玩意能干嘛？顺手点了进去，根据模板改了一下，直接给 WorkBuddy 下了一个指令——把查询西宁上空航班、对比北京和上海空中交通繁忙程度、生成 HTML 页面、用品牌设计风格专家做设计、最后部署到 EdgeOne Pages，一次性把需求全说完了。

WorkBuddy 先加载航班追踪技能，又去加载"品牌设计风格专家"技能——结果这个技能没装上，报了个错。没关系，WorkBuddy 说自己按高质量设计标准来做。它用的是 OpenSky Network 的 ADS-B 数据接口，免费不需要 API Key，数据来自全球的 ADS-B 接收器。先给三个城市（西宁、北京、上海）分别设了经纬度范围去查数据，结果回来一看——全部为空。

WorkBuddy 没有放弃，先验证 API 本身是不是正常的。查了一下欧洲区域（瑞士上空）——336 架航班，数据哗哗的，API 没问题。然后它把范围扩大到整个中国全境（东经 73 度到 135 度）——528 架航班，但大部分在印度上空（边界区域），东经 100 度以东有 316 架，主要分布在台湾海峡、东海、日韩航线上。结论很明确：OpenSky Network 在中国大陆内陆没有 ADS-B 接收器覆盖。这就是开源数据的局限性——覆盖率取决于有没有人装接收器。

数据虽然覆盖有限，但 WorkBuddy 把 316 架航班全部拿过来，按距离三个城市分别统计了不同半径内的航班数量，用这些数据生成了一个深色航空雷达主题的 HTML 页面。页面包括四个统计卡片、三个城市对比卡片（带多半径可视化条形图）、50 架航班详细列表、覆盖范围说明。设计风格很到位，深色背景、橙色主色调、JetBrains Mono 等宽字体，有航空管制中心雷达屏幕的感觉。最后部署环节 EdgeOne Pages 连接器连续 6 次超时/报错，最终手动拖拽上传到 EdgeOne Pages 管理后台秒传成功。

## 二、想要完成的任务

用 WorkBuddy 的"实时航班追踪"技能查询西宁/北京/上海上空航班数据，生成深色航空雷达主题的 HTML 页面，并部署到 EdgeOne Pages 线上访问。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| 实时航班追踪技能 | 调用 OpenSky Network ADS-B API 查询指定区域实时航班数据 | WorkBuddy 探索模块 | 网络访问 |
| 品牌设计风格专家 | 设计高质量 HTML 页面视觉风格 | WorkBuddy 专家（未安装，自动降级） | WorkBuddy 账号 |
| EdgeOne Pages 连接器 | 通过 deploy_folder 工具一键部署静态 HTML 到线上 | WorkBuddy 连接器 | EdgeOne 账号授权 |
| curl/Python 脚本 | 验证 API 是否正常、按距离筛选航班数据 | 内置能力 | 本地执行 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 在【探索】列表中可看到"实时航班追踪"模块
3. 工作区网络可访问 OpenSky Network API（opensky-network.org）
4. EdgeOne Pages 连接器已在 WorkBuddy 左下角连接器面板中显示 connected 状态
5. 浏览器可访问 EdgeOne Pages 管理后台（手动部署备用方案）

## 五、在 WorkBuddy 中的操作

### 步骤 1：发现技能并一次性下达完整需求
在 WorkBuddy【探索】列表里找到"实时航班追踪"模块，点进去后根据模板改了一下，直接把需求一次性说完：查西宁上空航班 + 对比北京/上海 + 生成 HTML + 品牌设计 + 部署 EdgeOne Pages。
**关键步骤**：一句话把"数据查询 + 页面生成 + 视觉设计 + 部署上线"全流程需求说完。

### 步骤 2：技能加载失败，自动降级处理
WorkBuddy 先加载航班追踪技能成功，又去加载"品牌设计风格专家"技能——结果这个技能没装上，报了个错。WorkBuddy 决定自己按高质量设计标准来做，先查数据，三组查询并行：西宁、北京、上海上空的实时航班。
**关键步骤**：专家技能未安装时 WorkBuddy 自动降级，不阻断主流程。

### 步骤 3：三城市查询全部为空，验证 API 是否正常
WorkBuddy 用 OpenSky Network 的 ADS-B 数据接口，分别给三个城市设了经纬度范围去查数据。结果回来一看：西宁 0 架、北京 0 架、上海 0 架，全部为空。WorkBuddy 没放弃，先验证 API 本身是不是正常的——查了一下欧洲区域（瑞士上空）——336 架航班，数据哗哗的，API 没问题。
**关键步骤**：用瑞士上空 336 架航班验证 API 正常，排除接口故障。

### 步骤 4：扩大范围到中国全境，确认覆盖局限
WorkBuddy 把范围扩大到整个中国全境（东经 73 度到 135 度）——528 架航班，但大部分在印度上空（边界区域）。东经 100 度以东有 316 架，主要分布在台湾海峡、东海、日韩航线上。结论很明确：OpenSky Network 在中国大陆内陆没有 ADS-B 接收器覆盖。
**关键步骤**：中国全境 528 架但主要在边境/海上，东经 100° 以东 316 架可用。

### 步骤 5：按距离三城市分别统计并生成 HTML 页面
WorkBuddy 把 316 架航班全部拿过来，按距离三个城市分别统计不同半径内的航班数量（西宁 100/300/500km 内全 0；北京 100/300/500km 内全 0；上海 100km 内 1 架/300km 内 2 架/500km 内 6 架）。用这些数据生成深色航空雷达主题 HTML 页面，含四个统计卡片、三个城市对比卡片（带 100/300/500km 多半径可视化条形图）、50 架航班详细列表、覆盖范围说明。
**关键步骤**：用 316 架航班按距离三城市分别统计，生成深色雷达主题 HTML。

### 步骤 6：EdgeOne Pages 连接器连续 6 次部署失败
WorkBuddy 调用 deploy_folder 工具，传了三个参数（builtFolderPath=flights-radar 文件夹路径，workspacePath=工作区路径，projectType=static）。第一次超时，第二次超时，第三次返回 API error: undefined，第四次超时，第五次 API error: undefined，第六次又超时。WorkBuddy 分析：MCP 通道能通（偶尔不超时），但 EdgeOne Pages 后端 API 本身有问题。
**关键步骤**：连接器显示 connected 但连续 6 次超时/API 报错，连接器体验有优化空间。

### 步骤 7：手动拖拽上传到 EdgeOne Pages 秒传成功
手动打开 EdgeOne Pages 管理后台，把 flights-radar 文件夹直接拖上去上传——秒传成功。线上地址：https://flights-radar-gvy19xppwv.edgeone.cool/，深色主题、航空风格、316 架航班实时数据。
**关键步骤**：连接器部署失败 6 次后改手动拖拽，秒传成功上线。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `帮我查一下西宁上空现在正在飞行的所有航班，显示呼号、来源国、飞行高度、速度和航向，并对比北京和上海的空中交通繁忙程度。结果生成html格式，并使用品牌设计风格专家设计好看点，帮我把最终HTML页面部署到EdgeOne Pages` | 一次性下达查询+对比+生成+设计+部署全流程需求 |
| 2 | `连好了，你帮我再试一次` | 第 6 次重试 EdgeOne Pages 部署（仍失败） |
| 3 | `再帮我使用EdgeOne Pages 部署一次` | 让 WorkBuddy 再次尝试部署（仍超时） |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 深色航空雷达主题 HTML 页面（flights-radar/index.html）
2. 三城市航班对比统计（西宁 0/0/0，北京 0/0/0，上海 1/2/6 架）
3. 50 架航班详细列表（呼号、来源国、高度、速度、航向、坐标）
4. 中国东部 316 架航班数据集（OpenSky Network）
5. EdgeOne Pages 线上访问地址：https://flights-radar-gvy19xppwv.edgeone.cool/
6. 部署失败 6 次的连接器问题记录

### 结果证明

![WorkBuddy 探索列表中的实时航班追踪模块](/images/workbuddy-cases/case-46/01.png)

![一次性下达完整需求并开始干活](/images/workbuddy-cases/case-46/02.png)

![三城市查询全空，扩大范围排查](/images/workbuddy-cases/case-46/03.png)

![中国全境范围 528 架航班数据筛选过程](/images/workbuddy-cases/case-46/04.png)

![生成的深色航空雷达主题 HTML 页面](/images/workbuddy-cases/case-46/05.png)

![EdgeOne Pages 连接器连续 6 次部署失败](/images/workbuddy-cases/case-46/06.png)

![EdgeOne Pages 项目概览（手动上传成功）](/images/workbuddy-cases/case-46/07.png)

### 三城市航班统计表

| 城市 | 100km 内 | 300km 内 | 500km 内 |
|---|---|---|---|
| 西宁 | 0 架 | 0 架 | 0 架 |
| 北京 | 0 架 | 0 架 | 0 架 |
| 上海 | 1 架 | 2 架 | 6 架 |

### 部署失败记录表

| 第几次 | 现象 | 原因分析 |
|---|---|---|
| 第 1 次 | 超时 | EdgeOne Pages 后端 API 异常 |
| 第 2 次 | 超时 | EdgeOne Pages 后端 API 异常 |
| 第 3 次 | API error: undefined | EdgeOne Pages 后端 API 异常 |
| 第 4 次 | 超时 | EdgeOne Pages 后端 API 异常 |
| 第 5 次 | API error: undefined | EdgeOne Pages 后端 API 异常 |
| 第 6 次 | 超时 | EdgeOne Pages 后端 API 异常 |
| 手动上传 | 秒传成功 | 绕过 MCP 连接器，直接拖拽到管理后台 |

## 八、验收标准

- [ ] 在 WorkBuddy【探索】列表找到"实时航班追踪"模块并点进去
- [ ] 一句话下达完整需求（查询西宁+对比北京上海+生成 HTML+品牌设计+部署 EdgeOne Pages）
- [ ] 识别"品牌设计风格专家"技能未安装，WorkBuddy 自动降级处理
- [ ] 用 OpenSky Network API 查询三城市航班数据（西宁/北京/上海均返回 0 架）
- [ ] 用瑞士上空 336 架航班验证 API 本身正常工作
- [ ] 扩大范围到中国全境，确认 OpenSky 在中国大陆内陆无 ADS-B 覆盖
- [ ] 拿到中国东部 316 架航班数据并按距离三城市分别统计（西宁 0/0/0，北京 0/0/0，上海 1/2/6）
- [ ] 生成深色航空雷达主题 HTML 页面（含 4 个统计卡片+3 个城市对比卡片+50 架航班列表+覆盖范围说明）
- [ ] 调用 deploy_folder 工具传参（builtFolderPath/workspacePath/projectType=static）
- [ ] 识别 EdgeOne Pages 连接器连续 6 次部署失败（超时/API error: undefined）
- [ ] 手动拖拽 flights-radar 文件夹到 EdgeOne Pages 管理后台秒传成功
- [ ] 线上地址可访问：https://flights-radar-gvy19xppwv.edgeone.cool/
