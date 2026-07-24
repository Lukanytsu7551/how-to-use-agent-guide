# Case 92｜我把飞书交给AI管了一天，建表发消息查日程全搞定了

> **WorkBuddy 案例集 · 第 92 篇**
> 分类：办公协同与效率提升

---

## 一、场景描述

以前用飞书的操作路径是：登录 → 点开飞书 → 找到多维表格 → 新建 → 设计字段 → 录数据 → 调格式 → 切看板视图 → 发到群里让同事看。一步一步点，少说十分钟。这次在 WorkBuddy 里试了一下，把飞书连接器接上，用自然语言让 AI 替你跑完建表、查日程、建群、发消息一条龙，全程不碰飞书客户端。

## 二、想要完成的任务

把 WorkBuddy 和飞书连上，然后用一句话指令完成：建一张「7月计划」多维表格并设计字段、新增记录、按负责人统计未完成任务数；查今天的日程；往群里发消息；建新群并把 AI 机器人拉进去发欢迎语；最后创建一个「公众号选题库」Base 并批量录入文章记录。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| Feishu 连接器 | WorkBuddy 操作飞书 Base/IM/日历等 | WorkBuddy 连接器市场 | 飞书 Open Platform 授权 |
| lark-base | 飞书多维表格建表、字段、记录操作 | WorkBuddy 连接器 | 飞书 Base 读写权限 |
| lark-im | 飞书消息收发、群聊管理 | WorkBuddy 连接器 | 飞书 IM 权限 |
| lark-calendar | 飞书日历日程查询 | WorkBuddy 连接器 | 飞书日历权限 |
| WorkBuddy Agent | 自然语言指令转飞书操作 | WorkBuddy 内置 | WorkBuddy 账号 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 有飞书账号可扫码授权
3. 在飞书 Open Platform 创建 CLI 应用（WorkBuddy 会自动帮你填好名字）
4. 首次连接需逐项授权飞书权限（im:message、im:message.send_as_user、im:chat:create_by_user 等），授权一次后累积不再重复问

## 五、在 WorkBuddy 中的操作

### 步骤 1：连接飞书
打开 WorkBuddy 的「连接器」页面，找到 Feishu，点「连接」按钮，跳转到 Feishu Open Platform 创建 CLI 应用（自动填好名字），点 Create。然后授权飞书权限列表（文档评论、群消息、审批、任务、日历等），直接点「Add and Authorize」。授权成功后显示「Permissions added and authorized」，飞书和 WorkBuddy 正式连上。
**关键步骤**：连接器页面点 Feishu → 创建 CLI 应用 → 授权权限。

### 步骤 2：建一张「7月计划」多维表格
说「在飞书多维表格里建一张表叫7月计划，放任务跟踪的字段：标题、负责人、截止日期、状态（未开始/进行中/已完成）」。建好后说「在任务跟踪里新增一行，标题=Q2 上线评审、状态=进行中、截止=2026-07-20」。然后说「按负责人统计未完成任务数」。它跑了聚合查询，返回当前只有一条未完成记录，负责人是空的（因为飞书通讯录里搜不到「张三」，它老老实实告诉你搜不到，不会硬塞错误值）。
**关键步骤**：一句话建表 + 一句话加记录 + 一句话跑聚合查询。

### 步骤 3：查今天的日程
说「查今天的日程」。飞书权限弹窗来了，扫码授权。它告诉今天没有安排。整个过程比打开飞书日历还快。
**关键步骤**：一句话查日程，扫码授权后秒出结果。

### 步骤 4：建群 + 拉机器人 + 发欢迎语
先试往一个外部活动群发消息，遇到 230027 错误（外部群安全策略不允许第三方应用以用户身份发消息）。换 Bot 发也不行（Bot 不在群里）。于是说「帮我建个新群」，第三次扫码授权 im:chat:create_by_user。WorkBuddy 建了「AI助手测试群」，自动把应用机器人拉进去，Bot 进群后马上发了「👋 嗨，我是可乐的AI助手，建群成功！」。
**关键步骤**：外部群发不了 → 建新群 → 自动拉 Bot → Bot 自动发欢迎语。

### 步骤 5：建公众号选题库 Base
说「飞书的多维表格有什么使用场景？」它列了一堆场景，挑了「公众号选题库」。说「试下」。它在飞书里创建了新 Base「公众号选题库」，自动设计了一套字段（标题、副标题、系列、状态、发布日期、预期阅读量、文章链接、备注），颜色标记也配好了（待写=灰、写作中=蓝、已发布=绿）。说「把我最近写的文章录进去」，它把 #83 到 #86 文章批量写进去。#91 因标题匹配没对上生成了两条重复记录，让它检查，它搜出重复、定位旧记录 ID、用 --yes 确认删除，一刀清干净。
**关键步骤**：一句话建选题库 Base + 自动设计字段 + 批量录入 + 自动清理重复记录。

### 步骤 6：约定长期规则
跟它约定：以后说「推送到公众号」，它自动去飞书选题库里把那条标为「已发布」，写上发布日期。这条规则写进长期记忆，以后每次推送文章自动执行。
**关键步骤**：约定自动化规则并写入长期记忆。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `在飞书多维表格里建一张表叫7月计划，放任务跟踪的字段：标题、负责人、截止日期、状态（未开始/进行中/已完成）。` | 建多维表格 |
| 2 | `在任务跟踪里新增一行，标题=Q2 上线评审、状态=进行中、截止=2026-07-20。` | 新增记录 |
| 3 | `按负责人统计未完成任务数。` | 跑聚合查询 |
| 4 | `查今天的日程。` | 查日历 |
| 5 | `帮我建个新群。` | 建群拉 Bot |
| 6 | `飞书的多维表格有什么使用场景？` | 探索使用场景 |
| 7 | `试下。` | 建公众号选题库 Base |
| 8 | `把我最近写的文章录进去。` | 批量录入文章记录 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 飞书与 WorkBuddy 正式连接（CLI 应用 + 全权限授权）
2. 「7月计划」多维表格（含标题/负责人/截止/状态字段 + 1 条记录）
3. 今日日程查询结果
4. 「AI助手测试群」+ Bot 进群 + 欢迎语
5. 「公众号选题库」Base（8 个字段 + 颜色标记 + #83-#86 文章记录）
6. 长期规则：说「推送到公众号」自动更新选题库状态

### 结果证明

![WorkBuddy 连接器页面找到 Feishu](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRMs9HglIbqCfjfOGIaEqOMqHVibGUsbKicnt8UNVYMjBrwTiaMGjEnxThzY1WrF0MibUkuxJxsR5V1P9VwLKaic1icLukaXQqWD5UIQI/640?wx_fmt=png&watermark=1#imgIndex=0)

![飞书权限授权列表](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRMt1Y3Uhic53DFZicWxs9ouMpaz53TRWpZof9z8H6ZyLIbwZyg0dEe7ZjBVicDlVMsRicbKMicnZaDN7A4tBSklF8feb6M3q9U18o9A/640?wx_fmt=png&watermark=1#imgIndex=3)

![7月计划多维表格建表完成](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRO0DRMIcbq94tY44ibLkkuzNkJiayC9m90TJNvsHBnshPuLL0amdt8OfhicYBpjRTm7HpXgh8KXTHuCrQD37EDTA9kx8Mc1RG23nE/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

![查今天的日程：日程清空](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRNLJlzuYoWOOSWV6xDJGY7B4DbcvHic89dzooQ6ORlk2rkiaSrPUTXIUvyApwzbwsKXpeowNty7JKmr4vYkPicWAwiaMOManvsOxBo/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

![建群成功：AI助手测试群](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRPYicr9jSsbhDtVD7w2DtW9OdHD1YnvsTOaOJtojuXl9j0S4FeSoagXkGhlbs7TOdibjPwRkAtRaCRExibCelJO0R0tibztZUABKV0/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)

![公众号选题库 Base 建表完成](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRP9iaI8qVejccooBKvg10ico2z36cE9uISBh5RaXMWxehIxd34CsNA0lxpAjSvMSRHcWkZfll9Awx3QY8CpY5H5X6y5qTOoMDq4E/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=11)

![选题库批量录入文章记录](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRPoVG3UNEbLRPa4Gia6lP4G5P4PMVpqEM9AxTtqhrwwMyk6RyLL7EgZvYtlicJ9FFMEcPaKr9fQDKNBkUjkq7yKPlW7asbc7vqC4/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=12)

## 八、验收标准

- [ ] WorkBuddy 连接器页面找到 Feishu 并点击连接
- [ ] 飞书 Open Platform 创建 CLI 应用成功
- [ ] 飞书权限授权完成（显示 Permissions added and authorized）
- [ ] 一句话建「7月计划」多维表格，字段正确（标题/负责人/截止/状态）
- [ ] 一句话新增记录成功（Q2上线评审/进行中/2026-07-20）
- [ ] 聚合查询返回未完成任务数（搜不到张三时如实告知不硬塞）
- [ ] 一句话查今日日程，扫码授权后秒出结果
- [ ] 建新群成功 + Bot 自动进群 + 发欢迎语
- [ ] 公众号选题库 Base 自动设计 8 个字段 + 颜色标记（待写=灰/写作中=蓝/已发布=绿）
- [ ] 批量录入 #83-#86 文章记录，发布日期/系列标签/状态标记正确
- [ ] #91 重复记录定位旧 ID 并用 --yes 确认删除
- [ ] 长期规则写入记忆：说「推送到公众号」自动更新选题库状态
