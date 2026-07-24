# Case 74｜我搭了一套公众号自动情报系统，大V发啥我都知道

> **WorkBuddy 案例集 · 第 74 篇**
> 分类：内容创作与新媒体运营

---

## 一、场景描述

在 GitHub 上刷到一个项目叫 WeRSS，能把微信公众号转成 RSS 订阅源。把链接丢给 WorkBuddy 介绍后，直接抛出真实需求：把关注的大 V 公众号采集下来，加入到 IMA 知识库，形成自己的内容情报系统。WorkBuddy 给出了完整架构方案：微信公众号 → WeRSS 采集 → RSS 输出 → 定时抓取脚本 → IMA 知识库 API 存储。从拉 RSS 到入库全是 WorkBuddy 在对话里操作，人工只说了几个「好」和「继续」。

## 二、想要完成的任务

在 AWS EC2 服务器上部署 WeRSS（Docker 方式），通过扫码授权获取微信公众平台 token，将指定公众号文章转为 RSS 订阅源，然后通过 IMA OpenAPI 的 import_urls 接口将 25 篇历史文章分批导入 IMA 知识库，最后配置每天 9:00 和 18:00 的自动化任务定时同步新文章。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| WeRSS（开源项目） | 把微信公众号转成 RSS 订阅源，模拟微信公众平台后台操作 | GitHub rachelos/we-mp-rss | 微信扫码授权 |
| IMA 知识库 OpenAPI | import_urls 接口直接把微信文章 URL 丢进去自动抓取正文入库 | ima.qq.com 官方 | Client ID + API Key |
| IMA Skill（ima_api.cjs） | 内部调 OpenAPI 读写知识库 | WorkBuddy 技能 | OpenAPI 凭证有效 |
| 自动化任务 | 每天 9:00/18:00 定时拉 RSS 找新文章入库 | WorkBuddy 内置 | WorkBuddy 账号 |
| Docker | 部署 WeRSS 容器 | 系统工具 | 服务器权限 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 拥有一台可访问的服务器（如 AWS EC2），已开放所需端口
3. 拥有可扫码授权的微信公众号管理员权限
4. 已在 ima.qq.com/agent-interface 获取 OpenAPI 的 Client ID 和 API Key（有效期需注意）
5. 已在 IMA 创建共享知识库并获取长 ID

## 五、在 WorkBuddy 中的操作

### 步骤 1：确认 WeRSS 采集原理
问 WeWe RSS 和 WeRSS 的原理区别。WeWe RSS 走微信读书间接获取，依赖闭源中转服务 weread.111965.xyz，token 要过别人服务器。WeRSS 没有中转，模拟微信公众平台后台（mp.weixin.qq.com）操作，用 Playwright 无头浏览器拿到登录 token 和 cookie，直接调用后台接口，所有流量直连微信服务器，token 只存在自己机器上。果断选 WeRSS。
**关键步骤**：WeRSS 无中转，token 不过别人手，安全性更可控。

### 步骤 2：Docker 部署 WeRSS
服务器是 AWS EC2，已跑 newapi（3000 端口），WeRSS 用 8888 端口。一行 Docker 命令部署：`docker run -d --name werss -p 8888:8001 -v ~/werss/data:/app/data --restart unless-stopped ghcr.io/rachelos/we-mp-rss:latest`。部署完发现访问不了——AWS 安全组没放行 8888 端口。WorkBuddy 手把手教：EC2 控制台 → 实例 → Security → Edit inbound rules → 加一条 Custom TCP 8888 端口 → Save。
**关键步骤**：Docker 一行部署 + AWS 安全组放行 8888 端口。

### 步骤 3：配置账号密码环境变量
WeRSS 页面打开了但登录提示「用户名或密码错误」。WeRSS 的账号密码不是页面上注册的，要在 Docker 启动时指定。用环境文件方式：`cat > ~/werss/.env << 'EOF' \n USERNAME=zgedu \n PASSWORD=你的密码 \n SECRET_KEY=werss2026secretkey \n EOF`。注意 SECRET_KEY 必须加，不加登录看似成功但 Token 不生效。
**关键步骤**：账号密码通过 .env 文件指定，SECRET_KEY 必须配置。

### 步骤 4：主机网络模式解决二维码加载
扫码授权微信这步，二维码加载不出来。看日志发现后端生成了二维码但前端找不到图片文件（404 Not Found）。WorkBuddy 给了一招——用主机网络模式启动：`docker run -d --name werss --network host -v ~/werss/data:/app/data --env-file ~/werss/.env -e PORT=8888 --restart unless-stopped ghcr.io/rachelos/we-mp-rss:latest`。重启后二维码出来了。
**关键步骤**：--network host 模式解决二维码 404 问题。

### 步骤 5：25 篇文章一键入库
扫码授权成功，添加公众号，RSS 地址出来了：`http://x.xx.29.xx:8888/feed/MP_WXS_3089182632.rss`。WorkBuddy 验证 RSS 能正常访问，25 篇文章全在。用 IMA OpenAPI 的 import_urls 接口直接把微信文章 URL 丢进去，IMA 自动抓取正文入库。25 篇文章分 3 批导入（接口每次最多 10 个 URL）：第 1 批 10 篇成功，第 2 批 10 篇成功，第 3 批 5 篇成功。
**关键步骤**：import_urls 接口分 3 批导入 25 篇文章全部成功。

### 步骤 6：IMA 凭证续期
写入 IMA 知识库需要 OpenAPI 的 Client ID 和 API Key。之前配置过但过期了。WorkBuddy 先通过 IMA Skill 的 ima_api.cjs 脚本尝试写入，一直返回 skill auth failed，排查后发现是凭证过期。去 ima.qq.com/agent-interface 续期凭证后，WorkBuddy 直接用 curl 调 IMA OpenAPI 就通了。还有一个知识点：IMA 知识库 ID 有两套，MCP 连接器返回短 ID，OpenAPI 接口用长 ID，WorkBuddy 通过 API 查到正确长 ID 才导入成功。
**关键步骤**：IMA OpenAPI 凭证需在 ima.qq.com/agent-interface 续期，知识库 ID 需用长 ID。

### 步骤 7：配置自动化任务
WorkBuddy 帮建了两个自动化任务：早间同步（每天 9:00 拉 RSS → 找新文章 → 入库 IMA）、晚间同步（每天 18:00 拉 RSS → 找新文章 → 入库 IMA）。自动化会自动维护一个状态文件，记录哪些文章已经入库了，不会重复导入。
**关键步骤**：两个自动化任务每天早晚各跑一次，自动维护去重状态文件。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `你看下这个项目，给我介绍下`（附 GitHub 链接） | 让 WorkBuddy 介绍 WeRSS 项目 |
| 2 | `我想做这么一个功能，把关注的大V的公众号采集下来。加入到IMA知识库，形成自己的内容情报系统。这个应该怎么做？` | 让 WorkBuddy 设计完整架构方案 |
| 3 | `WeWe RSS 采集的原理是什么？帮我简单介绍下。他为什么能采集公众号内容，原理是什么。` | 对比 WeWe RSS 和 WeRSS 原理 |
| 4 | `weread.111965.xyz 这个中转服务主要作用是什么，我自己搭一个可以吗？` | 确认 WeWe RSS 中转闭源无法自建 |
| 5 | `方案2：WeRSS（你之前看的那个）中有没有中转，他的原理是什么？` | 确认 WeRSS 无中转直连微信 |
| 6 | （Docker 部署命令） | 一行部署 WeRSS 容器 |
| 7 | （环境文件配置） | 指定账号密码和 SECRET_KEY |
| 8 | （主机网络模式启动命令） | 解决二维码 404 问题 |
| 9 | `好` / `继续` | 确认继续操作 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. WeRSS Docker 容器部署成功（8888 端口，AWS 安全组已放行）
2. 公众号 RSS 订阅地址：`http://x.xx.29.xx:8888/feed/MP_WXS_3089182632.rss`
3. IMA 知识库「公众号内容情报库」25 篇文章全部入库（分 3 批：10+10+5）
4. 两个自动化任务：WeRSS→IMA 早间同步（每天 9:00）、WeRSS→IMA 晚间同步（每天 18:00）
5. 自动化状态文件（记录已入库文章，避免重复导入）

### 结果证明

![WeRSS 项目介绍](/images/workbuddy-cases/case-74/01.png)

![内容情报系统架构方案](/images/workbuddy-cases/case-74/02.png)

![WeWe RSS 采集原理](/images/workbuddy-cases/case-74/03.png)

![WeRSS 与 WeWe RSS 对比表](/images/workbuddy-cases/case-74/04.png)

![AWS 安全组放行 8888 端口](/images/workbuddy-cases/case-74/05.png)

![WeRSS 订阅管理页面](/images/workbuddy-cases/case-74/06.png)

![IMA 知识库公众号内容情报库](/images/workbuddy-cases/case-74/07.png)

![IMA OpenAPI 凭证续期页面](/images/workbuddy-cases/case-74/08.png)

![自动化任务列表](/images/workbuddy-cases/case-74/09.png)

## 八、验收标准

- [ ] WeRSS 项目介绍包含：公众号转 RSS、Web 管理界面、定时自动更新、钉钉通知四个核心功能
- [ ] 架构方案：微信公众号 → WeRSS → RSS 输出 → 定时抓取脚本 → IMA 知识库 API → IMA 知识库
- [ ] WeWe RSS 依赖闭源中转 weread.111965.xyz，WeRSS 无中转直连微信服务器
- [ ] WeRSS 采集原理：扫码登录微信公众平台 → Playwright 拿 token+cookie → 直接调用 mp.weixin.qq.com 后台接口
- [ ] Docker 部署命令 `docker run -d --name werss -p 8888:8001 ...` 执行成功
- [ ] AWS 安全组放行 Custom TCP 8888 端口
- [ ] .env 文件包含 USERNAME、PASSWORD、SECRET_KEY 三个环境变量
- [ ] 主机网络模式 `--network host` 解决二维码 404 加载问题
- [ ] RSS 地址格式为 `http://x.xx.29.xx:8888/feed/MP_WXS_XXXX.rss`，25 篇文章全在
- [ ] IMA OpenAPI import_urls 接口分 3 批导入（10+10+5）25 篇文章全部成功
- [ ] IMA 知识库 ID 需用长 ID（如 IQZDEbf14_n4fXCkn4cbfb6SDugzQEMOZbuiUB2_pDA=）非短 ID
- [ ] 自动化任务：WeRSS→IMA 早间同步每天 9:00、WeRSS→IMA 晚间同步每天 18:00
- [ ] 自动化任务自动维护去重状态文件，不重复导入
