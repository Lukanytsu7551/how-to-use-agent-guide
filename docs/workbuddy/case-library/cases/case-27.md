# Case 27｜把 DeepSeek V4 接入 WorkBuddy

> **WorkBuddy 案例集 · 第 27 篇**
> 分类：AI 能力扩展

---

## 一、场景描述

DeepSeek V4 刚发布没多久，今天终于把它接入到 WorkBuddy 里了。以后用自定义模型又多了一个选择。这篇文章记录一下接入的全过程，包括怎么申请 API Key、怎么充值、怎么配置、填哪些参数，以及我踩过的一个坑。

DeepSeek V4 是 DeepSeek 刚刚发布的新一代大语言模型，有两个版本：V4 Pro（专业版，性能更强）和 V4 Flash（轻量版，速度更快）。两个版本都支持思考模式（reasoning），API 调用方式和 OpenAI 兼容，配置起来比较简单。WorkBuddy 的自定义模型机制真的很方便，只要 API 支持 OpenAI 格式，理论上都能接进来。

不过接入过程中我踩了一个坑：配置好之后兴致勃勃地测试，结果一上来就报错——DeepSeek V4 不支持图片输入。问题出在对话历史上，之前用别的模型跑过带图片的对话，WorkBuddy 切换到 DeepSeek V4 后把整段历史都发过去了，但 V4 只认纯文本。解决方法很简单：开一个新对话，不要带任何图片消息。

## 二、想要完成的任务

把 DeepSeek V4（Pro + Flash 两个版本）接入 WorkBuddy 自定义模型系统，完成 API Key 申请、实名认证、充值、配置文件编写，并解决图片输入报错的坑。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| WorkBuddy 自定义模型配置 | 编辑 ~/.workbuddy/models.json 添加 DeepSeek V4 Pro 与 Flash | 内置能力 | WorkBuddy 账号 |
| DeepSeek 开放平台 | 申请 API Key、实名认证、充值 | 第三方平台 | DeepSeek 账号 |
| OpenAI 兼容 API | DeepSeek V4 调用方式与 OpenAI 兼容 | 第三方 API | DeepSeek API Key |
| WorkBuddy 自动配置能力 | 一句话告诉 WorkBuddy 即可自动填写所有配置项 | 内置能力 | WorkBuddy 账号 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 已注册 DeepSeek 开放平台账号（platform.deepseek.com）
3. 已完成 DeepSeek 实名认证（Individual 或 Enterprise）
4. 已充值 API 余额（¥10/¥20/¥50/¥100/¥300/¥500 或自定义）
5. 本机有可编辑 ~/.workbuddy/models.json 的权限
6. 理解 DeepSeek V4 不支持图片输入（仅纯文本）

## 五、在 WorkBuddy 中的操作

### 步骤 1：注册并创建 DeepSeek API Key
打开浏览器访问 https://platform.deepseek.com/，使用手机短信验证码或微信扫码登录注册。登录后点击左侧菜单「API keys」，点击黑色按钮「Create new API key」，在弹出的对话框中填写 API Key 名称（比如"WorkBuddy 专用"），点击「Create API key」完成创建。⚠️ 重要提示：API Key 创建后只会显示一次，请立即点击「Copy」复制保存。如果忘记保存，只能删除旧 Key 后重新创建。
**关键步骤**：在 DeepSeek 开放平台创建 API Key 并立即复制保存（只显示一次）。

### 步骤 2：实名认证并充值
DeepSeek API 需要完成实名认证才能充值使用。点击左侧菜单「Top up」（充值），页面会提示需要完成实名认证，点击「Verify」按钮。选择认证类型「Individual」（个人）或「Enterprise」（企业）。填写信息：Real Name（真实姓名，仅限中文）、Type of ID（证件类型，默认二代身份证）、ID Number（身份证号）。勾选同意服务条款，点击「Submit」提交认证。认证通过后进入「Top up」充值页面，选择充值金额（¥10/¥20/¥50/¥100/¥300/¥500 或自定义），选择支付方式（支付宝或微信支付），点击「Next step」完成支付。
**关键步骤**：完成实名认证后充值，支持支付宝或微信支付，网页版和 App 对话免费。

### 步骤 3：让 WorkBuddy 自动配置
拿到 API Key 后，最简单的方式是直接告诉 WorkBuddy：

> "workBuddy 中使用自定义模型接入 deepseek v4，API Key 是 sk-xxxxx"

WorkBuddy 会自动帮你填写好所有配置项，包括 URL、模型名称、是否支持思考模式等。
**关键步骤**：一句话告诉 WorkBuddy API Key，自动填写所有配置项。

### 步骤 4：（可选）手动编辑配置文件
如果想自己配置或了解具体填了什么，可手动编辑 ~/.workbuddy/models.json（如果文件不存在，创建一个即可）：

```json
{
  "models": [
    {
      "id": "deepseek-v4-pro",
      "name": "DeepSeek V4 Pro",
      "vendor": "Custom",
      "url": "https://api.deepseek.com/v1",
      "apiKey": "sk-你的deepseek-api-key",
      "supportsToolCall": false,
      "supportsImages": false,
      "supportsReasoning": true
    },
    {
      "id": "deepseek-v4-flash",
      "name": "DeepSeek V4 Flash",
      "vendor": "Custom",
      "url": "https://api.deepseek.com/v1",
      "apiKey": "sk-你的deepseek-api-key",
      "supportsToolCall": false,
      "supportsImages": false,
      "supportsReasoning": true
    }
  ]
}
```

保存文件后，完全重启 WorkBuddy，模型就会出现在模型列表里了。
**关键步骤**：手动编辑 ~/.workbuddy/models.json，添加 V4 Pro 和 Flash 两个模型配置。

### 步骤 5：解决图片输入报错的坑
配置好之后我兴致勃勃地测试，结果一上来就报错：

```
Failed to deserialize the JSON body:
messages[80]: unknown variant `image_url`, expected `text`
```

这个错误的意思是：DeepSeek V4 不支持图片输入。问题出在对话历史上。之前我用别的模型跑过带图片的对话，WorkBuddy 切换到 DeepSeek V4 后，把整段历史都发过去了，但 V4 只认纯文本，不认图片。解决方法很简单：开一个新对话，不要带任何图片消息。

建议：
- 开启新对话时再切换到这个模型
- 不要在包含图片的历史对话里切换
**关键步骤**：遇到 image_url 报错时，开一个新对话（不带图片）再切换到 DeepSeek V4。

### 步骤 6：切换模型并测试
配置好之后，在 WorkBuddy 里切换到 DeepSeek V4 Pro 或 Flash，就能直接用了。DeepSeek V4 的响应速度不错，思考模式开启后能看到推理过程，对于需要复杂推理的任务很有用。
**关键步骤**：在 WorkBuddy 模型列表切换到 DeepSeek V4 Pro/Flash，开启思考模式测试。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | （DeepSeek 平台）`API keys → Create new API key → 填写名称 → Copy` | 创建并保存 API Key |
| 2 | （DeepSeek 平台）`Top up → Verify → Individual → 填写身份信息 → Submit` | 完成实名认证 |
| 3 | （DeepSeek 平台）`Top up → 选择金额 → 支付宝/微信支付 → Next step` | 充值 API 余额 |
| 4 | `workBuddy 中使用自定义模型接入 deepseek v4，API Key 是 sk-xxxxx` | 一句话让 WorkBuddy 自动配置 |
| 5 | （遇到报错时）`开一个新对话，不要带任何图片消息` | 解决 image_url 报错 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. DeepSeek V4 Pro 与 Flash 两个模型接入 WorkBuddy
2. ~/.workbuddy/models.json 配置文件（含两个模型完整配置）
3. DeepSeek 开放平台账号（已完成实名认证+充值）
4. 可在 WorkBuddy 模型列表中切换使用 DeepSeek V4

### models.json 关键字段说明表

| 字段 | 说明 |
|---|---|
| id | 模型唯一标识，后面切换模型时会用到（deepseek-v4-pro / deepseek-v4-flash） |
| name | 在 WorkBuddy 里显示的名称（DeepSeek V4 Pro / DeepSeek V4 Flash） |
| url | DeepSeek 的 API 地址，必须是 https://api.deepseek.com/v1 |
| apiKey | 你的 DeepSeek API Key（第一步申请的） |
| supportsReasoning | 是否支持思考模式，V4 建议开启（true） |
| supportsImages | 是否支持图片输入，V4 设为 false |
| supportsToolCall | 是否支持工具调用，设为 false |

### 接入前后对比表

| 维度 | 接入前 | 接入后 |
|---|---|---|
| 可用模型 | WorkBuddy 默认模型 | 默认模型 + DeepSeek V4 Pro + Flash |
| 思考模式 | 取决于默认模型 | V4 支持思考模式，可看推理过程 |
| 推理能力 | 取决于默认模型 | V4 Pro 性能更强，适合复杂推理 |
| 响应速度 | 取决于默认模型 | V4 Flash 速度更快 |
| API 兼容 | - | OpenAI 兼容格式 |
| 图片输入 | 取决于默认模型 | V4 不支持图片，需开新对话 |

## 八、验收标准

- [ ] DeepSeek 开放平台账号已注册（platform.deepseek.com）
- [ ] API Key 已创建并保存（API keys → Create new API key → Copy）
- [ ] 实名认证已通过（Individual → 填写姓名/身份证号 → Submit）
- [ ] API 余额已充值（Top up → 支付宝/微信支付）
- [ ] ~/.workbuddy/models.json 包含 deepseek-v4-pro 和 deepseek-v4-flash 两个模型配置
- [ ] url 配置为 https://api.deepseek.com/v1
- [ ] supportsReasoning 设为 true
- [ ] supportsImages 设为 false
- [ ] 完全重启 WorkBuddy 后，模型列表中出现 DeepSeek V4 Pro 和 Flash
- [ ] 切换到 V4 后能正常对话，思考模式可看到推理过程
- [ ] 遇到 image_url 报错时，开新对话（不带图片）能解决
