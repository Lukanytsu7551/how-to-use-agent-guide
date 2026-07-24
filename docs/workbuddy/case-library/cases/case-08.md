# Case 08｜定时任务直接推微信！PushPlus 秒通知方案

> **WorkBuddy 案例集 · 第 8 篇**
> 分类：办公协同与效率提升

---

## 一、场景描述

在 WorkBuddy 100 种用法第 7 篇中，我们用邮件解决了 WorkBuddy 定时任务收不到结果的问题，但邮件方案时效性差，还需要手动打开邮箱查看。

WorkBuddy 原生推送也不稳定：定时任务执行后，微信经常收不到通知；而邮件体验不佳，查看步骤多、延迟高，不适合即时提醒。我们需要一种让 WorkBuddy 定时任务执行完后，直接秒推送到微信的方案，无需等待、无需跳转，消息实时接收。

PushPlus 是专注于消息推送的工具，能将各类工具的执行结果实时发送到微信，完美适配 WorkBuddy。它实时推送、消息秒级到达微信，零代码门槛、WorkBuddy 全自动配置，个人免费版额度充足，支持天气、报告、任务提醒等各类场景。

## 二、想要完成的任务

让 WorkBuddy 定时任务执行完成后，通过 PushPlus 将结果实时推送到微信，实现秒级消息提醒。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| Skill 创建能力 | 自动创建 PushPlus Skill 目录与文件、安装依赖、生成推送调用方法 | WorkBuddy 内置 | 本地文件写入 |
| 定时任务（自动化） | 在定时任务中调用 PushPlus 推送结果 | WorkBuddy 内置 | 任务调度 |
| PushPlus 推送服务 | 将消息实时推送到微信 | 第三方（pushplus.plus） | 实名认证（3.9 元一次性） |

## 四、前置条件

1. 已安装 WorkBuddy 客户端并登录
2. 拥有可正常使用的微信账号（用于扫码登录 PushPlus 并接收推送）
3. 完成 PushPlus 实名认证（3.9 元一次性费用，终身有效）
4. 已配置至少一个 WorkBuddy 定时任务（如天气提醒、自动化报告等）

## 五、在 WorkBuddy 中的操作

### 步骤 1：打开 PushPlus 官网并扫码登录

访问 PushPlus 官方网站 `https://www.pushplus.plus/`，点击登录按钮，使用微信一键扫码，无需注册账号。

**关键步骤**：微信扫码完成登录，进入个人中心。

### 步骤 2：复制专属 Token

登录后在个人中心的「开发配置 - 开发设置」中获取你的专属推送 Token，全程只需复制一次。

**关键步骤**：在「个人资料 - 用户 token」处点击「复制」，保存好 Token。

### 步骤 3：完成实名认证

按页面提示填写姓名、身份证、手机号，完成短信验证，支付 3.9 元认证费，一次认证终身有效。

**关键步骤**：访问 `https://verify.pushplus.plus` 完成实名认证，未实名将无法调用发送消息接口。

### 步骤 4：将 Token 发送给 WorkBuddy，自动创建 Skill

回到 WorkBuddy，把复制的 Token 发送过去，它会自动帮你完成所有配置：
- 自动创建 PushPlus Skill 目录与文件
- 自动安装所需依赖
- 生成完整的推送调用方法

**关键步骤**：把 Token 直接粘贴到 WorkBuddy 对话框发送，WorkBuddy 会在 `~/.workbuddy/skills/pushplus-wechat/` 下自动创建 Skill。

### 步骤 5：实名完成后，WorkBuddy 自动测试推送

实名认证完成后，告知 WorkBuddy，它会立即发送测试消息，验证推送是否正常。

**关键步骤**：告诉 WorkBuddy「好了」，它会自动调用 PushPlus 接口发送一条测试消息。

### 步骤 6：微信实时接收测试消息

几秒内，微信就会收到 PushPlus 推送的测试消息，说明配置完全成功。

**关键步骤**：在微信中确认收到 PushPlus 推送的测试消息，标题为「测试消息」。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 4 | `这是我的 PushPlus Token：[粘贴 Token]，帮我创建推送 Skill` | 让 WorkBuddy 自动创建 PushPlus Skill、安装依赖、生成调用方法 |
| 5 | `好了` | 告知 WorkBuddy 实名认证已完成，触发自动测试推送 |
| 定时任务中 | `push_wechat("定时任务完成", "你的天气预报已生成")` | 在定时任务执行完后调用推送方法，把结果发到微信 |

## 七、在 WorkBuddy 中的效果

### 交付物

1. 自动创建的 PushPlus Skill（位置：`~/.workbuddy/skills/pushplus-wechat/`）
2. 可直接调用的推送方法 `push_wechat(标题, 内容)`
3. 微信实时接收的测试消息

### 结果证明

![PushPlus 官网扫码登录页面](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRP6dXJVW0PBLolKtjm16ibFly6zVme60bP7G3BMVL492plLqnfUCee2xPBXhwIp7sV4dXOffK0ib5GWP8hqvf0kz8AzWZFcIlmlc/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

![PushPlus 个人中心复制 Token 页面](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRPfUJt28KeyhAHUcm36fTJMXibPbiccaXzWvKvTTjDkZFCaAG7Kf7Qnd5syC6qFwyXadyeRRY3zaUAEr8Oah8qIVqCzxsyJW0ytI/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

![PushPlus 实名认证填写页面](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRO53PiapXMGJ2BAaogcaG3UBib8zgWjQgt9mdASMk978Sf2Jo4TusK72GSiaJzzOH5xfts90TgWIYPibPpQ9Qqy7fCPIeFWA22aOibI/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

![PushPlus 实名认证支付 3.9 元成功页面](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRPnicYIX2UReTc9WulAIn6uasL3S3wicjRNRHyQQyuNFdl20VQYuKXllGvIB5gcl8xecR0MIj6W3UJqbZIRn7sZ4DKRLShQbflmM/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

![WorkBuddy 自动创建 PushPlus Skill 完成提示](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRNuf1bFlxJ3Tkh3taic0IZriaKW0SyXzQibHEoKDAwth1ibUbCk8dQibrWDBfq4tibzlPMV2MU34F4yyq1aybq7icZiaZTP1mN0L1OX6To/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

![WorkBuddy 自动测试推送成功对话](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRNs10aq6FZ9Z5iaxyqrlTPa2QCVvjEIarF6jr89hkPjQmk6B9iciaSbmmoHquGjxicFEwpfZ3EaXmyvtfX0ruEFaA97OL8y2YUFJRk/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

![微信收到 PushPlus 推送的测试消息](https://mmbiz.qpic.cn/sz_mmbiz_jpg/s516EMWvbRNOcLiaG2txafgORhudlduiaaqsE6Lo9lGRrwXx7saqAc6JnpoicnEmMBsQYFbmZ499nXbeW97BH2WVbdHwicyXw4bribIyDibk5P99E/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=6)

### PushPlus 与邮件方案对比

| 对比项 | PushPlus 方案 | 邮件方案 |
|---|---|---|
| 推送渠道 | 微信直达 | 邮箱 |
| 时效性 | 秒级推送 | 延迟较高 |
| 体验 | 实时接收，体验极佳 | 需手动查看 |
| 费用 | 需 3.9 元实名认证 | 完全免费 |
| 附件支持 | 不支持大附件 | 支持大附件 |
| 适用场景 | 日常定时提醒、自动化任务 | 需要附件记录的场景 |

## 八、验收标准

- [ ] 成功在 PushPlus 官网微信扫码登录
- [ ] 复制到专属 Token 字符串
- [ ] 完成 PushPlus 实名认证（3.9 元一次性费用）
- [ ] Token 发送给 WorkBuddy 后，自动在 `~/.workbuddy/skills/pushplus-wechat/` 创建 Skill
- [ ] WorkBuddy 自动安装所需依赖并生成 `push_wechat(标题, 内容)` 调用方法
- [ ] WorkBuddy 自动测试推送成功
- [ ] 微信在几秒内收到标题为「测试消息」的 PushPlus 推送
- [ ] 在定时任务中调用 `push_wechat` 能将结果实时推送到微信
- [ ] Token 未泄露给第三方，妥善保管
