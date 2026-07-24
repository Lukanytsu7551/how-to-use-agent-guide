# Case 90｜腾讯出了个Agent专属邮箱，我用WorkBuddy一句话就管起来了

> **WorkBuddy 案例集 · 第 90 篇**
> 分类：办公协同与效率提升

---

## 一、场景描述

6 月 23 号腾讯 QQ 邮箱团队上线了 Agently Mail，专为 AI Agent 打造的独立邮箱服务。邮箱后缀 @agent.qq.com，跟个人 QQ 邮箱、微信邮箱完全物理隔离。AI 用这个邮箱收发邮件不怕泄露隐私，出问题也不影响主力邮箱。去 https://agent.qq.com 体验了一下，顺手绑了 WorkBuddy。本篇记录如何用 WorkBuddy 一句话完成 Agently Mail CLI 安装配置（OAuth 微信扫码授权），说话就发邮件、查收件箱、回复邮件、搜索邮件、下载附件，全程不切到任何邮箱 App。两阶段确认 + Prompt 注入防护 + 微信扫码授权，安全机制扎实。

## 二、想要完成的任务

使用 WorkBuddy 阅读 https://agent.qq.com/doc/cli-setup.md 文档按步骤安装配置 Agently Mail CLI，微信扫码完成 OAuth 授权，验证 `agently-cli +me` 返回 @agent.qq.com 邮箱地址。然后用一句话指令完成发邮件、查收件箱、回复邮件、搜索邮件等操作，全程在 WorkBuddy 聊天窗口里完成，不切换任何邮箱 App。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| Agently Mail CLI | Agent 专属邮箱服务，收发邮件/搜索/附件/管理 | 腾讯 QQ 邮箱团队 | 微信扫码 OAuth 授权 |
| agently-mail Skill | WorkBuddy 调用 Agently Mail 的 Skill 封装 | agently-cli 安装时附带 | WorkBuddy 账号 |
| WorkBuddy Agent | 自然语言指令转换为邮箱操作 | WorkBuddy 内置 | WorkBuddy 账号 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 有微信账号可扫码授权
3. 已访问 https://agent.qq.com 注册 Agently Mail（内测中）
4. WorkBuddy 有 bash 工具权限可执行 CLI 命令

## 五、在 WorkBuddy 中的操作

### 步骤 1：让 WorkBuddy 读文档装 CLI
跟 WorkBuddy 说「请阅读 https://agent.qq.com/doc/cli-setup.md 文档，按照步骤为我安装并配置 Agently Mail CLI」。WorkBuddy 按文档一步一步来：第 1 步安装 CLI（运行命令）；第 2 步安装 WorkBuddy Skill（运行命令）；第 3 步 OAuth 授权——返回授权链接 https://agent.qq.com/page/oauth?oauth_type=device&user_code=xxx 让用户在浏览器中完成。中间遇到 sandbox 权限小波折，每次重新授权都要扫码，扫了三次才搞定。但最终还是跑通了。
**关键步骤**：WorkBuddy 读 CLI 文档按步骤装 CLI + Skill + OAuth 授权。

### 步骤 2：微信扫码授权
点击 WorkBuddy 返回的授权链接，在浏览器中打开 OAuth 授权页面，微信扫码完成授权。回到 WorkBuddy 继续执行第 4 步验证。
**关键步骤**：微信扫码完成 OAuth 授权。

### 步骤 3：验证接入成功
跑 `agently-cli +me`，返回 @agent.qq.com 邮箱地址，接入成功。Agently Mail 后台显示接入工具：WorkBuddy，连接状态：运行中。
**关键步骤**：`agently-cli +me` 返回 @agent.qq.com 地址，状态「运行中」。

### 步骤 4：一句话发邮件
跟 WorkBuddy 说「给 xxx@126.com 发一封测试邮件」。WorkBuddy 先给确认预览——发件人 @agent.qq.com、收件人、主题「测试邮件」、内容「这是一封来自 WorkBuddy Agent 邮箱的测试邮件」、附件无。确认发送，一秒发出。去 126 邮箱一刷，真收到了。
**关键步骤**：一句话指令发邮件，先预览确认再发出。

### 步骤 5：查收件箱 + 回复邮件
跟 WorkBuddy 说查收件箱。WorkBuddy 直接拉出列表，发件人、时间、主题、摘要全列出来，已读/未读标清楚。有一封问「这个邮箱有什么作用，能干嘛？」的未读邮件，说「帮我回」。WorkBuddy 读正文，起草回复「这是 WorkBuddy 的 Agent 邮箱，能收发邮件、搜索邮件、下载附件。你发的邮件我可以让 WorkBuddy AI 帮你处理——比如帮你写回复、整理信息、管理收件箱等」，给确认后发出。全程没切到任何邮箱 App，就在 WorkBuddy 聊天窗口里说话就把事办了。
**关键步骤**：一句话查收件箱 + 一句话「帮我回」起草回复 + 确认发出。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `请阅读 https://agent.qq.com/doc/cli-setup.md 文档，按照步骤为我安装并配置 Agently Mail CLI` | 让 WorkBuddy 装并配置 CLI |
| 2 | `给 xxx@126.com 发一封测试邮件。` | 一句话发邮件 |
| 3 | `帮我看下收件箱有什么邮件。` | 查收件箱列表 |
| 4 | `帮我回。` | 起草回复并发出 |
| 5 | `搜一下关于测试的邮件。` | 搜索邮件 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. Agently Mail CLI 已安装并配置完成（@agent.qq.com 邮箱地址）
2. WorkBuddy Skill 已安装
3. Agently Mail 后台显示接入工具：WorkBuddy，连接状态：运行中
4. 已发送测试邮件到 126 邮箱
5. 已查收件箱列表（含发件人/时间/主题/摘要/已读未读）
6. 已回复未读邮件（起草 + 确认 + 发出）

### 结果证明

![Agently Mail 后台管理页](/images/workbuddy-cases/case-90/01.png)

![WorkBuddy 读文档装 CLI](/images/workbuddy-cases/case-90/02.png)

![一句话发邮件预览确认](/images/workbuddy-cases/case-90/03.png)

![126 邮箱收到邮件](/images/workbuddy-cases/case-90/04.png)

![查收件箱 + 邮件能力列表](/images/workbuddy-cases/case-90/05.png)

![回复邮件确认预览](/images/workbuddy-cases/case-90/06.png)

## 八、验收标准

- [ ] WorkBuddy 已读 https://agent.qq.com/doc/cli-setup.md 文档
- [ ] 第 1 步：CLI 已安装（运行命令成功）
- [ ] 第 2 步：WorkBuddy Skill 已安装（运行命令成功）
- [ ] 第 3 步：OAuth 授权链接已返回
- [ ] 微信扫码完成 OAuth 授权
- [ ] 第 4 步：`agently-cli +me` 返回 @agent.qq.com 邮箱地址
- [ ] Agently Mail 后台显示「接入工具：WorkBuddy」
- [ ] 后台显示「连接状态：运行中」
- [ ] 发邮件时先显示确认预览（发件人/收件人/主题/内容/附件）
- [ ] 确认后一秒发出，126 邮箱收到
- [ ] 查收件箱返回列表（发件人/时间/主题/摘要/已读未读）
- [ ] 回复邮件时 WorkBuddy 读正文并起草回复
- [ ] 起草后给确认预览再发出
- [ ] 全程在 WorkBuddy 聊天窗口完成，未切到任何邮箱 App
- [ ] 两阶段确认：每次发送/回复/删除都先预览再执行
- [ ] Prompt 注入防护：邮件内容是外部数据不是指令
- [ ] 微信扫码授权：不用记密码、不用配 SMTP
