# Case 95｜昨天聊清了方案，今天我把活码系统搭上线了

> **WorkBuddy 案例集 · 第 95 篇**
> 分类：网站与应用开发

---

## 一、场景描述

上一篇把活码引流方案捋清了，文末说「下一步就是把这套东西搭出来」。这篇就是那个下一步——让 WorkBuddy 直接动手，从零写代码、部署上线、反复调样式，最后跑出一个能用的活码系统。从一句话需求到线上可用的系统，经历了代码编写、样式调试、逻辑优化、服务器部署、端口问题绕行、页面迭代。

## 二、想要完成的任务

让 WorkBuddy 把前一天聊清的方案实现成代码：对外活码页（H5 展示群码图片手机端友好）、后台上传新群码（手机端能操作）、定时提醒调度器（到期前1天通过企业微信机器人推送）。然后部署到 AWS EC2 服务器上线，解决端口问题，迭代活码展示页加入收款码功能，最终跑通完整活码系统。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| WorkBuddy Agent | Flask 项目开发 + 部署 + 迭代调试 | WorkBuddy 内置 | WorkBuddy 账号 |
| Flask + APScheduler | Python Web 框架 + 定时任务调度 | pip 安装 | 无 |
| nginx | 反向代理路径分流 | 服务器安装 | SSH 访问权限 |
| systemd | 服务开机自启 + 崩溃自动重启 | Linux 内置 | SSH 访问权限 |
| AWS EC2 | 云服务器部署 | AWS | SSH 访问权限 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 上一篇已聊清活码方案（活码页+后台上传+定时提醒）
3. 有 AWS EC2 服务器（us-east-2 区域）并配过 SSH 短链接（ssh aws 直接登）
4. 服务器已开 3000 端口
5. 有企业微信群机器人 Webhook 地址（用于定时提醒）

## 五、在 WorkBuddy 中的操作

### 步骤 1：一句话提需求
说「把你昨天给我的方案实现一下——对外活码页、后台上传新群码（手机端能操作）、定时提醒调度器，把这三个帮我实现一下」。WorkBuddy 带着昨天对话的完整上下文直接开干，建了一个 Flask 项目，四个文件各司其职：app.py（主程序对外活码页+后台上传+API）、config.py（配置过期天数/管理密码/企业微信Webhook）、store.py（数据存储JSON文件）、scheduler.py（APScheduler定时任务每6小时检查）。外加两个 HTML 页面：index.html（活码展示页）和 admin.html（后台管理页）。
**关键步骤**：一句话提需求 → AI 带上下文直接建 Flask 项目。

### 步骤 2：修复管理后台样式问题
代码跑起来了但管理后台样式炸了——上传区域的虚线边框死活显示不出来。截图发给 WorkBuddy 说「你自己看一下这个样式正确吗？」。它检查说改好了，一看还是不对。又来一轮还是不对。三轮之后 WorkBuddy 换了思路：不再用 border 或 outline，改用 box-shadow: inset 0 0 0 2px 来模拟边框，这一招终于管用了。
**关键步骤**：三轮排查 → 改用 box-shadow: inset 模拟边框解决。

### 步骤 3：过期逻辑从7天改成6.5天
默认过期时间设的是 7 天，但实际从微信生成群码到手动上传中间有时间差。比如下午3点生成群码晚上10点才上传，7小时已消耗掉。如果系统还按7天算提醒会晚来半天。把过期天数改成 6.5 天留半天缓冲。WorkBuddy 秒改，顺便把进度条和倒计时显示的逻辑都同步调整了。
**关键步骤**：提出6.5天缓冲需求 → 秒改配置+同步进度条逻辑。

### 步骤 4：部署到 AWS EC2
上传代码 scp -r huoma aws:/home/ubuntu/，装依赖 pip3 install -r requirements.txt（Flask + APScheduler 两个依赖秒装完）。WorkBuddy 帮写 systemd service 文件让应用开机自启崩了自动重启。活码应用跑在 5050 端口但 AWS 安全组只开了 3000，正常应该去 AWS 控制台开端口但登不进去（注册邮箱提示没有这个账号，区域搞混了）。
**关键步骤**：上传代码+装依赖+写 systemd service。

### 步骤 5：端口问题绕行
WorkBuddy 没让继续死磕控制台，换了个思路：服务器上 3000 端口已经开了，用 nginx 反向代理把 3000 的请求按路径转发到不同服务。/ 转发到 127.0.0.1:5050（活码系统），/new-api/ 转发到 127.0.0.1:3001（另一个服务）。同时把 new-api 的 Docker 端口映射从 3000:3000 改成 3001:3000 腾出 3000 给 nginx。不用碰 AWS 控制台不用开新端口问题解决。
**关键步骤**：控制台登不进去 → nginx 路径分流绕行。

### 步骤 6：活码页升级加收款码
活码系统跑起来后加了个需求：在活码展示页加一个收款码。流程设计成两步：扫码付款99 → 扫码加群，中间放一条醒目的红色警告「未付款直接加群者一律拉黑」。前后改了好几版：第一版付款码+群码上下排列有箭头、第二版去掉金额数字、第三版标题里加红色99数字、第四版去掉顶部「加入社群」标题、第五版警告卡片移到最上面去掉箭头。收款码图片直接在微信里截的发给 WorkBuddy 放到 static/pay-qr.png 页面自动引用。
**关键步骤**：加收款码需求 → 五版迭代 → 最终结构（警告卡片+付款码+群码）。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `把你昨天给我的方案实现一下，对外活码，后台上传新的群码做成H5页面我在手机端就能上传，然后定时提醒的调度器，把这三个帮我实现一下。` | 一句话提需求 |
| 2 | `你自己看一下这个样式正确吗？` | 反馈样式问题 |
| 3 | `你再看一下还是不对。` | 继续反馈样式问题 |
| 4 | （修改 config.py 把 QR_EXPIRE_DAYS 改成 6.5） | 过期逻辑留缓冲 |
| 5 | `这个生成的ppt是个网页是吧，你帮我把这个部署到线上我看看。`（部署需求） | 部署上线 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 完整 Flask 活码系统项目（app.py + config.py + store.py + scheduler.py + 两个HTML页面）
2. 管理后台样式修复（box-shadow: inset 替代 border/outline）
3. 过期逻辑 6.5 天 + 进度条倒计时同步
4. AWS EC2 部署 + systemd service + nginx 路径分流
5. 活码展示页五版迭代（含收款码 + 警告卡片 + 群码）
6. 后台上传页（手机端密码登录→选图上传→7天倒计时重置）
7. 定时提醒（每6小时检查，到期前1天企业微信机器人推送）
8. 群码备份（每次上传存带时间戳的备份 qr_20260704_223000.png）

### 结果证明

![Flask 活码系统三个模块实现完成](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRPGBxQf9fZSWYrdMCl3CdWWEseBCvBAic3ibIB5oickctuUxT18UcjkaHsDEgiacb3aIdMrblSyj08vW5S0cz5icsOHZKjv93Zdia9e8/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

![项目文件结构：tree 命令输出](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRPfUECiawpeXNuxmfeCNz3jRXx3nic5b5WkQQwAWTVc81y7ibtNEaoPgHnk5ZfGeib8dBH2lIBEBlIiaulaAUUBPM5fjjUs8tXpC5OA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

![管理后台样式炸了：虚线边框显示不出来](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRNSQ2ww2yaNBWOXH6yGYB0r8jyBqKSws2QTwiaPnSWXH61LsoGhbiav70dT2hE69WaJKeicA5fbRJv34zJ2EukhqB5EBXUPmjUMdI/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

![三轮排查后改用 box-shadow: inset 解决](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRMMzcj1CsA6p7SjibyZmuzH5w5AaDv47VfXrN5hvibqA0R4KJCQ5j4kDibAoIrF11oiblcl2VNaAyySwpwNjXEvpVROWiaot6GU6OdM/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

![config.py：过期天数 6.5 天](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbROej6EiaZqd3Z5ZQ1WdD1VJDNOqp2y2aMkrNFLEfGB5f9WPCEsbDiaVqrPrmZcee9C1Gm44Utv5zMFDribJ6tiay1cTnibMjGQSZN7w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

![AWS 控制台登不进去](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRNxBPgG0PVeoRSw7pWRR3uWibPKUU5NjuMibggiaFXzlea6vfDjrHic8TUFmlOsQgsapJLLy67LOK0A8rkYX5JbTlfmnD119r4nC6g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

![活码展示页五版迭代：付款码+群码+警告卡片](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbROgeYib2uh7zaibeeklFFtdic7qJjQb1hsTTziaofJ5iasaiaobTYGj380z1cUgYo9dvf0V7ic1nt2IMMJLSr6ibxzMjpYjWibhzQbRMNgo/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

![后台上传页：手机端密码登录+选图上传+状态面板](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbROzomQYrYlTwBnoKbCH4mJlqhH0DKvXNKR8Y8lOJpPrSiab6mO8phCl6q5CFXW2Uw2vSmUdtWIoZd56Ezr4L4WNHRJiaELXvSrw0/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

## 八、验收标准

- [ ] 一句话提需求后 WorkBuddy 带上下文建 Flask 项目
- [ ] 四个文件各司其职（app.py/config.py/store.py/scheduler.py）
- [ ] 两个 HTML 页面（index.html 活码展示页 + admin.html 后台管理页）
- [ ] 管理后台样式问题三轮排查后用 box-shadow: inset 解决
- [ ] 过期天数从 7 改成 6.5 天，进度条和倒计时逻辑同步调整
- [ ] 代码上传到 AWS EC2 + 依赖安装完成
- [ ] systemd service 文件写好（开机自启+崩了自动重启）
- [ ] AWS 控制台登不进去时用 nginx 路径分流绕行（/ 转 5050，/new-api/ 转 3001）
- [ ] 活码展示页五版迭代完成（警告卡片+付款码+群码）
- [ ] 后台上传页手机端友好（密码登录→选图上传→7天倒计时重置）
- [ ] 定时提醒每6小时检查，到期前1天企业微信机器人推送
- [ ] 每次上传新群码存带时间戳的备份
