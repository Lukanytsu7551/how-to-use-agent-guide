# Case 15｜2分钟生成AI短视频！接入豆包Seedance实测

> **WorkBuddy 案例集 · 第 15 篇**
> 分类：视频与图像生成

---

## 一、场景描述

字节跳动豆包 Seedance 开放 API 的消息，让我立刻兴奋起来——这款之前只能在 APP/即梦体验的视频生成模型，终于能通过接口调用了。但实测过程中踩的坑，反而更凸显了 WorkBuddy 的价值：不用写代码、不用懂接口，纯自然语言交互，2 分钟就能拿到成品 AI 视频。

刚看到火山引擎方舟控制台里 Seedance 2.0 标注的「50 万 token 免费额度」，本以为能直接白嫖，结果点击「使用」就弹出充值框——最低充值 200 元才能开通。咨询客服后确认了规则：必须先充值才能使用。等晚上再看时，Seedance 2.0 的免费额度已清零，仅剩 Seedance 1.5 Pro 还有可用额度。

换做手动操作，我需要翻文档改参数、重构请求体、替换模型名、重新提交……但用 WorkBuddy，我只说了一句：「换成 1.5 Pro 模型试试」，它就自动完成了所有适配操作，全程无需我碰任何技术环节。

## 二、想要完成的任务

用 WorkBuddy 接入豆包 Seedance 1.5 Pro API，通过 3 轮自然语言对话完成图生视频任务的创建、轮询、下载，2 分钟内拿到成品 MP4 视频，全程零代码。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| web-access / 联网搜索 | 检索火山引擎官方文档、第三方接入教程、定价方案 | 内置 Skill | 网络访问 |
| VideoGen / 视频生成 | 调用豆包 Seedance 1.5 Pro API 生成图生视频 | 内置 Skill | 火山引擎 API Key |
| 代码执行能力（Bash） | 提交请求、轮询任务状态、下载 MP4 文件至本地 | 内置能力 | 本地文件读写、网络访问 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 已注册火山引擎账号并开通方舟控制台
3. 拥有可用的 API Key（本文使用 Seedance 1.5 Pro 额度）
4. 准备好参考图片 URL（图生视频输入）
5. 本机网络可访问 ark.cn-beijing.volces.com

## 五、在 WorkBuddy 中的操作

### 步骤 1：确认可行性
我问 WorkBuddy："你能接入豆包 Seedance 生成视频？"WorkBuddy 没有直接答复，而是自动检索了火山引擎官方文档、第三方接入教程、定价方案，最终明确「可接入，官方 API 支持，推荐模型为 doubao-seedance-1-5-pro-251215」，并给出 3 个使用选项：文生视频、图生视频、先用官方示例测试跑通。
**关键步骤**：一句话提问，WorkBuddy 自动检索文档并给出可用模型与 3 种使用方案。

### 步骤 2：提供官方示例
我把火山引擎控制台里的图生视频接口请求示例直接复制给 WorkBuddy，内容包含请求地址、请求头、API 密钥、模型名称、画面描述与参考图片地址。我补充说明：「这个是官方示例，我用的是 seedance 1.5。」WorkBuddy 自动解析出接口地址、API Key、模型名称等核心参数，再次确认我的使用需求。
**关键步骤**：把 curl 示例粘贴给 WorkBuddy，AI 自动解析参数并确认需求。

### 步骤 3：触发执行
我看 WorkBuddy 没动静，催了一句："继续啊，怎么不动了？"WorkBuddy 默认选择「用官方示例跑通」，直接启动全流程自动化操作：解析请求示例提取所有参数、提交请求至火山引擎获取任务 ID、自动轮询任务状态（每 30-45 秒查询 1 次）、任务完成后自动下载视频文件至本地、生成完整数据报告。
**关键步骤**：一句催促触发 WorkBuddy 自动完成提交、轮询、下载、报告全流程。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `你能接入豆包Seedance生成视频？` | 触发 WorkBuddy 检索文档并给出可用模型与方案 |
| 2 | `这个是官方示例，我用的是seedance 1.5。`（附 curl 请求示例） | 提供接口参数，让 AI 解析并确认需求 |
| 3 | `继续啊，怎么不动了？` | 一句催促触发自动执行全流程 |
| 4 | `换成1.5 Pro模型试试` | 在额度清零后让 AI 自动适配新模型 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 一段图生视频 MP4 文件（5 秒 / 720p / 16:9 / 24fps / 9.4MB）
2. 完整数据报告（模型、分辨率、时长、帧率、文件大小、生成耗时、Token 消耗）
3. 任务状态流转日志

### 结果证明

![火山引擎控制台 Seedance 模型列表](https://mmbiz.qpic.cn/mmbiz_jpg/s516EMWvbRO2cwHbC8ib2tl1ibod1k6F3ibrQoIlg1tLroNOux6xwxmq8dePbz0GLh7ticCnOLJKC3lqCKkQB3YnFfw9HwvQ46mzzQ3tWS8dJQQ/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=0)

![购买咨询对话确认充值规则](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRPC4jogMKRZF3UicqFno2cjeSxMf8nwoGTtjKSXbZxia9847zwupQeRKAYCK1As5exeOaWIr3YicicMy5yibKFOUjTNG0ia55IpoRGuk/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

![使用豆包 Seedance 1.5 Pro 官方 API 创建图生视频任务](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbROxtmnuoyKWQYxGIEUGh5YFfdeVcRTP3iaLCbd3a7gMkMGEpt6zWdibUib3ic7JAkPMhuYu2ahPZAPRdT4yZCdcQCzTdG1JMzAccPc/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

### 任务状态流转日志

```
提交任务 → 获取task_id → 等待生成 → 任务完成 → 自动下载视频
T+0s   → 提交任务，拿到task_id: cgt-20260414225204-r8hs2
T+30s  → 查询状态：running（生成中）
T+75s  → 查询状态：succeeded（生成完成）
      → 解析video_url，自动下载MP4文件
```

### 生成视频核心数据

| 维度 | 数值 |
|---|---|
| 模型 | doubao-seedance-1-5-pro-251215 |
| 分辨率 | 720p / 16:9 |
| 时长 | 5 秒 |
| 帧率 | 24fps |
| 文件大小 | 9.4 MB |
| 生成耗时 | ~53 秒 |
| Token 消耗 | 108,900 |

### 成本对比

| 工具 | 单次成本 |
|---|---|
| OpenAI Sora | 约 5 美元/次 |
| 豆包 Seedance | 约 108,900 tokens/次（低成本一个数量级） |

## 八、验收标准

- [ ] WorkBuddy 能检索火山引擎官方文档并确认可接入
- [ ] 成功解析用户提供的 curl 请求示例中的接口地址、API Key、模型名称
- [ ] 成功调用 doubao-seedance-1-5-pro-251215 模型创建图生视频任务
- [ ] 自动轮询任务状态（每 30-45 秒查询 1 次）
- [ ] 任务完成后自动下载 MP4 文件至本地
- [ ] 生成视频规格为 5 秒 / 720p / 16:9 / 24fps
- [ ] 输出完整数据报告（模型、分辨率、时长、帧率、文件大小、耗时、Token 消耗）
- [ ] 全程 3 轮对话、零代码、约 2 分钟拿到成品
