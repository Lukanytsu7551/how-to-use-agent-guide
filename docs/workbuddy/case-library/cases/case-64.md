# Case 64｜白嫖！接入Agnes AI免费模型

> **WorkBuddy 案例集 · 第 64 篇**
> 分类：AI能力扩展

---

## 一、场景描述

看到一条消息，Agnes AI 开放了免费 API 额度，支持文本、图片、视频生成。本着"有羊毛不薅就是亏"的原则点进去看了一眼。注册 5 分钟，拿到 API Key，接进 WorkBuddy，直接能用。最爽的是——不用手改配置文件，把 Key 扔给 WorkBuddy，它自己配好了。

## 二、想要完成的任务

在 Agnes AI 官网注册账号并获取免费 API Key，把 Key 发给 WorkBuddy 自动完成模型配置（写入 ~/.workbuddy/models.json），重启后在模型下拉菜单切换到 Agnes 2.0 Flash 并测试对话。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| 自定义模型接入 | 把 Agnes AI API Key 写入 ~/.workbuddy/models.json，自动验证并配置 | WorkBuddy 内置 | WorkBuddy 账号 |
| curl 接口调用 | 用 Bearer Token 调 https://apihub.agnes-ai.com/v1/models 查支持的模型列表 | WorkBuddy 内置 | Agnes AI API Key |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 拥有 Google 或 GitHub 账号（用于 Agnes AI 注册登录）
3. 能访问 https://agnes-ai.com 和 https://platform.agnes-ai.com

## 五、在 WorkBuddy 中的操作

### 步骤 1：打开 Agnes AI 官网
访问 https://agnes-ai.com，首页能看到三大模型：Agnes-2.0-Flash（对话）、Agnes-Image-2.1-Flash（生图）、Agnes-Video（视频）。点蓝色按钮「Try it now at platform.agnes-ai.com」。

### 步骤 2：注册账号
跳转到 platform.agnes-ai.com，支持 Google 或 GitHub 登录，不用填邮箱验证码。选 Google，点一下弹窗选账号就进去了，全程 30 秒。

### 步骤 3：进入后台找到 API Keys
登录成功后，点左侧菜单 Settings → API Keys，点「Create new secret key」按钮。

### 步骤 4：命名并生成 Key
弹窗里给 Key 起个名字（如 zgedu），点 Save。Key 格式是 sk-xxxxxxxx。点右边复制图标把 Key 存好，页面一关就再也看不到了。
**关键步骤**：Key 只显示一次，务必复制保存。

### 步骤 5：把 Key 扔给 WorkBuddy
把 API Key 直接发给 WorkBuddy。它先提示「API 需要鉴权才能列出模型。用你提供的 key 来查一下支持的模型列表」，然后自动执行 curl -s https://apihub.agnes-ai.com/v1/models，用 Bearer Token 调接口查模型。返回「API key 验证通过！这个 API 支持以下模型：」，弹出多选题：A. agnes-2.0-flash（最新对话模型，速度快）/ B. agnes-1.5-flash（上一代对话模型，稳定）/ C. 全部对话模型 / D. 输入你的答案。选 A 点完成，WorkBuddy 自己把 ~/.workbuddy/models.json 写好了。
**关键步骤**：不用手改配置文件、不用管 baseUrl 怎么填、不用管 provider 是什么——WorkBuddy 全搞定。

### 步骤 6：重启切换模型测试
保存配置后重启 WorkBuddy。对话窗口点模型下拉菜单，看到「Agnes 2.0 Flash:agnes-2.0-flash」。切过去问「你是什么模型？」，秒回「我是 Agnes-2.0-Flash，由 Sapiens AI 开发。」免费 API 接入成功。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | （把 API Key 直接发给 WorkBuddy，格式为 sk-xxxxxxxx） | 触发自动验证 Key + 查询模型列表 + 写入 models.json |
| 2 | （在多选题中选择 A. agnes-2.0-flash） | 选择要添加的模型，WorkBuddy 自动完成配置 |
| 3 | `你是什么模型？` | 切换到 Agnes 模型后测试对话验证接入成功 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. Agnes AI 账号注册成功（Google 登录）
2. API Key 生成并保存（格式 sk-xxxxxxxx）
3. ~/.workbuddy/models.json 配置写入完成（agnes-2.0-flash）
4. 模型下拉菜单出现「Agnes 2.0 Flash:agnes-2.0-flash」
5. 对话测试通过：「我是 Agnes-2.0-Flash，由 Sapiens AI 开发」

### 结果证明

![Agnes AI 官网首页](/images/workbuddy-cases/case-64/01.jpg)

![Google 账号登录](/images/workbuddy-cases/case-64/02.jpg)

![API Keys 页面](/images/workbuddy-cases/case-64/03.png)

![生成 API Key](/images/workbuddy-cases/case-64/04.png)

![WorkBuddy 自动配置](/images/workbuddy-cases/case-64/05.png)

![模型下拉菜单](/images/workbuddy-cases/case-64/06.png)

![对话测试成功](/images/workbuddy-cases/case-64/07.png)

## 八、验收标准

- [ ] 访问 https://agnes-ai.com 看到三大模型（Agnes-2.0-Flash/Agnes-Image-2.1-Flash/Agnes-Video）
- [ ] 用 Google 或 GitHub 登录 platform.agnes-ai.com 注册成功
- [ ] 在 Settings → API Keys 点「Create new secret key」生成 Key（格式 sk-xxxxxxxx）
- [ ] Key 只显示一次，复制保存成功
- [ ] 把 Key 发给 WorkBuddy 后自动执行 curl 查询模型列表
- [ ] 多选题出现 A. agnes-2.0-flash / B. agnes-1.5-flash / C. 全部对话模型 / D. 输入答案
- [ ] 选 A 后 WorkBuddy 自动写入 ~/.workbuddy/models.json
- [ ] 重启 WorkBuddy 后模型下拉菜单出现「Agnes 2.0 Flash:agnes-2.0-flash」
- [ ] 切换到 Agnes 模型问「你是什么模型？」返回「我是 Agnes-2.0-Flash，由 Sapiens AI 开发」
- [ ] 全程不用手改配置文件，5 分钟完成接入
