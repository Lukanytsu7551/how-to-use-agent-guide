# Case 33｜备案警告？AI 5分钟排查域名解析问题

> **WorkBuddy 案例集 · 第 33 篇**
> 分类：办公协同与效率提升

---

## 一、场景描述

傍晚手机收到一条火山引擎的短信提醒——备案信息存在不合格情况，要求及时整改。短信里没说具体哪里不合格，只让去查邮件和站内信。第一反应是不是域名解析出了问题，随手 ping 了一下域名，果然解析结果指向了一个海外 IP，完全没打到火山云的服务器上。

明明在 Cloudflare 配了 A 记录指向火山云服务器 IP，怎么 ping 出来是国外地址？这下有点慌了。把 Cloudflare DNS 后台截图直接扔给 WorkBuddy，问："这是我域名的 DNS 解析配置，帮我分析下，我有一台服务器，为什么没解析到服务器，解析到国外了？"

WorkBuddy 一句话结论：服务器没问题，是 Cloudflare 的 Proxied（代理）模式在"截流"。按 AI 给出的三步修复方案操作，5 分钟搞定，国内访问延迟从 140ms+ 降至 20ms 以内。

## 二、想要完成的任务

用 WorkBuddy 快速排查"域名 ping 出海外 IP 而非自己服务器 IP"的异常，定位 Cloudflare Proxied 模式的根因，并完成 DNS 配置修复与备案复核。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| 图像理解能力 | 读取 Cloudflare DNS 后台截图，识别 A 记录与 Proxy 状态 | 内置能力 | 上传图片 |
| 知识解答能力 | 解释 Cloudflare Proxied 与 DNS only 两种模式的机制差异 | 内置能力 | 无 |
| 可视化能力 | 画图说明流量路径与代理机制 | 内置能力 | 无 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 本机能正常 ping 域名（终端可用）
3. 有 Cloudflare 账号并可登录 DNS 管理后台
4. 域名已完成 ICP 备案，服务器在火山引擎等国内云厂商
5. 可截图保存 DNS 配置并发给 WorkBuddy

## 五、在 WorkBuddy 中的操作

### 步骤 1：ping 发现异常
打开终端，ping 自己的域名。结果显示 IP 指向 172.67.180.114，这是 Cloudflare 的美国边缘节点 IP，而不是自己的火山云服务器 115.xx.xx.xx。国内用户访问时绕道美国，速度极慢，且触发备案核查。
**关键步骤**：通过 ping 结果定位异常——IP 指向海外 172.67.x.x，而非火山云服务器 115.xx.xx.xx。

### 步骤 2：截图发给 WorkBuddy 分析
把 Cloudflare DNS 后台截图直接扔给 WorkBuddy，附上问题："这是我域名的 DNS 解析配置，帮我分析下，我有一台服务器，为什么没解析到服务器，解析到国外了？"WorkBuddy 给出一句话结论：服务器没问题，是 Cloudflare 的 Proxied（代理）模式在"截流"。
**关键步骤**：WorkBuddy 识别出三条 A 记录（admin、marathon、yaniw.com）都指向 115.xx.xx.xx，但全部开启了 Proxied（橙色云朵图标），因此 DNS 查询不返回真实 IP，而是返回 Cloudflare 的海外边缘节点 IP。

### 步骤 3：理解 Proxied 模式的机制
WorkBuddy 用一张对比表清晰说明两种模式的差异：Proxied 模式 DNS 返回 Cloudflare 边缘 IP，流量路径为"用户 → CF 节点 → 服务器"，适合国际访问加速、隐藏真实 IP；DNS only 模式 DNS 返回真实服务器 IP，流量路径为"用户 → 服务器（直连）"，适合国内服务器、需要直连的场景。对于国内服务器 + 国内用户的场景，Proxied 反而是负优化——流量绕道美国再回来，延迟倍增，还会触发 ICP 备案核查。
**关键步骤**：理解 Cloudflare Proxied 模式本质是一个反向代理，真实 IP 被隐藏，用户看到的永远是 CF 的 IP。

### 步骤 4：三步修复，5 分钟搞定
按 WorkBuddy 给出的修复方案操作：1）登录 Cloudflare DNS 管理后台，进入 yaniw.com 的 DNS 记录列表，找到所有 A 记录；2）将每条 A 记录的 Proxy 状态从 Proxied 改为 DNS only（橙色云朵切换为灰色），保存；3）等待 DNS 传播，重新 ping 验证，确认返回 115.xx.xx.xx。
**关键步骤**：重点修改 yaniw.com 主域名记录的 Proxy 状态，从橙色云朵切换为灰色云朵。

### 步骤 5：验证修复结果并提交备案复核
改为 DNS only 后，再次 ping yaniw.com 直接返回 115.xx.xx.xx，国内访问延迟从 140ms+ 降至 20ms 以内。同时向火山云提交备案复核，问题解除。
**关键步骤**：通过修改前后 ping 结果对比验证修复成功，并向火山引擎提交备案复核完成闭环。

### 步骤 6：获取 Proxied 使用决策建议
WorkBuddy 同时给出决策建议：适合开启 Proxied 的情况（服务器在海外、需要隐藏真实 IP 防 DDoS、使用 Cloudflare Workers/Pages 部署）；应该关闭 Proxied 使用 DNS only 的情况（服务器在国内有 ICP 备案需求、需要 IP 直连如 SSH/游戏服务器、已有国内 CDN 不需要 CF 代理层）。
**关键步骤**：根据服务器位置与业务场景，判断是否开启 Proxied，避免负优化。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `ping yaniw.com` | 终端命令，发现 IP 指向海外，定位异常 |
| 2 | （附 Cloudflare DNS 截图）`这是我域名的dns解析配置，帮我分析下，我有一台服务器，为什么没解析到服务器，解析到国外了?` | 触发 WorkBuddy 分析截图并定位 Proxied 模式根因 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 域名解析异常的根因定位结论（Cloudflare Proxied 模式截流）
2. Proxied vs DNS only 两种模式的对比表与流量路径图
3. 三步修复方案（改 Proxy 状态 + 等 DNS 传播 + ping 验证）
4. Proxied 使用决策建议（何时开启、何时关闭）
5. 修复完成，国内访问延迟从 140ms+ 降至 20ms 以内，备案复核通过

### 结果证明

![火山引擎备案不合格短信提醒](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRNwRSlLr0ia5jg1ocS8TpcJSDDBgoEor8r1clIJNaibWzzXBOk6bpE26QWkeHJG1rIJ2CBsmyYSkicIERzia939ZWNXkpgkJRtzmAk/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

![ping yaniw.com 返回海外 IP 172.67.180.114](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRMgHo1O5icXw9ibDF99iagUeIGq5mFMDlqG32Ft14ZiavLGbDTwXWzHflHzu36YypcTlM5cl9pEwJI8psAzjUpAYMdDU7k2oGKKPMM/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

![WorkBuddy 分析截图并画出流量路径图](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbROicXGRdF2hpJUjjUo5a3kR7WVzHF2dcO8BL16ItwOq4IhEkzQN2ygSIG3Y4U4onbXwqLAQdb0ibwtS0fTSbt92YlXz4Aj9MZHtA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

![修改前 Proxied 橙色云朵状态](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRONuuIc5AKn3ACYo97kHwicnibL5miaCMyLlyr88ydzHCXPN0dTD4ovDG5ePtqeJltIyzjib3RtX4zYlejxCxFa7j7KcvL58icPgiaSU/640?wx_fmt=png&from=appmsg#imgIndex=3)

![修改后 DNS only 灰色云朵状态](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRNdO9tdu1YC6CZTfJMsFibZGhKSNVftwsXhOFxvIx6vobJMgR6czMT1F6t7mgbQSgqJ41DnNAkiaibTbGN1icrcjicRHg9auWbZdm9k/640?wx_fmt=png&from=appmsg#imgIndex=4)

![修复后 ping yaniw.com 返回 115.xx.xx.xx 真实服务器 IP](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRMD3WjGEiaJg9eDOdAvzTEyXydX9NYbib55660hRficB8iaHibBjVM5Am11GV4lZllWpUtx3DMRVRr25yEFhGXt6m7BMrTy9YZib28xI/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

### 效率对比

| 方式 | 耗时 |
|---|---|
| 自己查文档排查 | 半天起 |
| 用 WorkBuddy 分析截图 + 三步修复 | 5 分钟搞定 |

## 八、验收标准

- [ ] 通过 ping 命令发现域名解析异常（IP 指向海外 172.67.x.x）
- [ ] 成功将 Cloudflare DNS 后台截图发送给 WorkBuddy 并获得根因分析
- [ ] WorkBuddy 给出明确结论：Proxied 模式截流导致 DNS 返回 CF 边缘 IP
- [ ] 输出 Proxied 与 DNS only 两种模式的对比表，含 DNS 返回 IP、流量路径、适合场景
- [ ] 按三步修复方案操作：登录后台 → 改 Proxy 状态为 DNS only → 等待传播
- [ ] 修复后 ping 域名返回真实服务器 IP 115.xx.xx.xx
- [ ] 国内访问延迟从 140ms+ 降至 20ms 以内
- [ ] 向火山引擎提交备案复核并问题解除
- [ ] 输出 Proxied 使用决策建议（何时开启、何时关闭）
- [ ] 全程 5-10 分钟内完成
