# Case 45｜折腾半天，终于让 AI 翻开了我的微信读书

> **WorkBuddy 案例集 · 第 45 篇**
> 分类：AI能力扩展

---

## 一、场景描述

打开 WorkBuddy，问了句："workBuddy 如何接入 微信 读书mcp"。WorkBuddy 解释了 MCP 是什么，然后说网上有人做了微信读书的 MCP Server，npm 包叫 mcp-server-weread。回了一句："你帮我全局安装，并配置，我去获取cookie给你。"WorkBuddy 直接执行了 npm install -g mcp-server-weread，装完告诉我现在需要去获取微信读书的 cookie。

去 Chrome 登录 weread.qq.com，从 F12 开发者工具的 Application 面板里复制了 cookie 发给它。WorkBuddy 把 cookie 配进了 ~/.workbuddy/mcp.json，说配好了重启一下就能用了。重启后问"我的书架有哪些书"，WorkBuddy 搜了一遍工具列表——没找到 weread 的 MCP 工具。又重启了一次，还是没找到。cookie 过期了（errcode: -201 认证失败），外部工具网站 cc.chenge.ink 也打不开，最后发现新加的 MCP 需要在设置界面手动点信任才会真正启动。

重新从 Chrome Application > Cookies 面板复制了新版 cookie，curl 测试成功返回 54 本书数据。点信任 MCP 后，4 个工具全部可用，几秒钟查出书架 52 本书（未读 44 本/在读 7 本/已读完 1 本，付费 39 本，有笔记 5 本，最大类别影视原著 10 本/个人成长 8 本/商业 4 本）。MCP 的意义在于——让 AI 从一个只会聊天的工具，变成能操作你各种服务的助手。微信读书只是一个开始。

## 二、想要完成的任务

通过安装 mcp-server-weread 并配置到 WorkBuddy 的 mcp.json，让 WorkBuddy 能直接查询微信读书书架（52 本书含分类/进度/时长/笔记）、搜索图书、获取书评和笔记标注。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| mcp-server-weread | 微信读书 MCP Server，提供书架查询/搜索/书评/笔记标注 4 个工具 | npm 包（npm install -g mcp-server-weread） | 微信读书 cookie |
| MCP 配置管理 | 编辑 ~/.workbuddy/mcp.json 添加 weread 配置条目 | WorkBuddy 内置能力 | 本地文件读写 |
| MCP 服务信任 | 在 MCP 服务管理界面手动点信任启动新加的 MCP Server | WorkBuddy 设置界面 | WorkBuddy 账号 |
| curl/Python 脚本 | 跳过 MCP 直接用 HTTP API 测试 cookie 是否有效 | 内置能力 | 网络访问 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端（含 MCP 支持）
2. 本地具备 Node.js/npm 环境（用于全局安装 mcp-server-weread）
3. Chrome 浏览器，已登录 weread.qq.com
4. 能从 F12 > Application > Cookies 面板复制 cookie（wr_skey/wr_vid/wr_gid/wr_fp/wr_rt）
5. 工作区可读写 ~/.workbuddy/mcp.json 文件
6. 网络可用，能访问微信读书 API

## 五、在 WorkBuddy 中的操作

### 步骤 1：全局安装 mcp-server-weread 并配置框架
问："workBuddy 如何接入 微信 读书mcp"。WorkBuddy 解释 MCP 是什么，说网上有人做了微信读书的 MCP Server，npm 包叫 mcp-server-weread。回："你帮我全局安装，并配置，我去获取cookie给你。"WorkBuddy 直接执行 npm install -g mcp-server-weread（安装到 /usr/local/bin/mcp-server-weread），验证命令能正常执行，然后在 ~/.workbuddy/mcp.json 添加 weread 配置条目，Cookie 字段暂填占位，等拿到 cookie 后补上。
**关键步骤**：一句话让 WorkBuddy 全局安装 npm 包并写好 mcp.json 配置框架（Cookie 占位）。

### 步骤 2：获取微信读书 cookie 并配置
从 Chrome 登录 weread.qq.com，F12 > Application > Cookies 面板复制 cookie（wr_skey/wr_vid/wr_gid/wr_fp/wr_rt），发给 WorkBuddy。WorkBuddy 把 cookie 配进 ~/.workbuddy/mcp.json 的 mcp-server-weread 条目 env.WEREAD_COOKIE 字段，说配好了重启一下就能用了。
**关键步骤**：从 Chrome Application > Cookies 面板复制 5 个关键 cookie 值，WorkBuddy 写入 mcp.json。

### 步骤 3：重启后发现 MCP 工具搜不到（坑 1：cookie 过期）
重启后问"我的书架有哪些书"，WorkBuddy 搜了一遍工具列表——没找到 weread 的 MCP 工具。又重启了一次，还是没找到。WorkBuddy 决定跳过 MCP，直接用 curl 测试 cookie 能不能用，结果报错 errcode: -201 认证失败——cookie 过期了（wr_skey=oCJUXSVR 是已过期的登录凭证）。
**关键步骤**：cookie 过期导致 -201 认证失败，需重新登录再拿。

### 步骤 4：外部工具网站打不开（坑 2：CookieCloud 不可用）
WorkBuddy 排查过程中搜到网上有人做了 CookieCloud 同步工具（cc.chenge.ink），可以自动同步 cookie。试了一下："https://cc.chenge.ink 这个网站都打不开"。这条路走不通，还是手动来吧。WorkBuddy 给了详细操作指引：用 Chrome 打开 weread.qq.com 登录，F12 > Application > Cookies > 点击 https://weread.qq.com，找到 wr_skey/wr_vid/wr_gid/wr_fp/wr_rt 几个关键值复制。
**关键步骤**：CookieCloud 网站 cc.chenge.ink 不可用，回到手动从 Chrome Application 面板复制 cookie 的方式。

### 步骤 5：重新获取 cookie 并 curl 验证成功
从 Chrome Application > Cookies 面板重新复制 cookie（特别注意确认登录状态活跃），新版 cookie 发给 WorkBuddy（wr_skey=MAHO7y0e）。WorkBuddy 拿新 cookie 用 curl 测了一下——这次成功了，返回了书架 54 本书的数据。但 MCP 工具在 WorkBuddy 里还是搜不到。
**关键步骤**：新版 cookie curl 验证通过（返回 54 本书数据），但 MCP 仍未加载。

### 步骤 6：发现 MCP 需手动点信任（坑 3：最隐蔽的坑）
WorkBuddy 查了启动日志，发现日志里完全没有 MCP 相关的启动信息。原因是：WorkBuddy 里新配置的 MCP Server，需要在设置界面手动点一下信任，才会真正启动。光写进 mcp.json、重启 WorkBuddy 是不够的。新加的 MCP 会被识别到，但默认处于「未信任」状态不会运行，要【MCP 服务管理】里找到它手动点信任。点了信任。
**关键步骤**：新加 MCP 默认未信任不运行，需在 MCP 服务管理界面手动点信任，无任何错误提示。

### 步骤 7：MCP 通了，4 个工具全部可用
点信任后跟 WorkBuddy 说："我重启了，你现在看下我的书架"。这次 WorkBuddy 搜 MCP 工具终于搜到了 4 个工具：mcp__mcp-server-weread__get_bookshelf（查书架）、mcp__mcp-server-weread__search_books（搜书）、mcp__mcp-server-weread__get_book_best_reviews（书评）、mcp__mcp-server-weread__get_book_notes_and_highlights（笔记标注）。几秒钟查出书架 52 本书：未读 44 本/在读 7 本/已读完 1 本，付费 39 本，有笔记 5 本，最大类别影视原著 10 本/个人成长 8 本/商业 4 本。带完整的分类、阅读进度、阅读时长、笔记数量。
**关键步骤**：点信任后 4 个 MCP 工具全部可用，几秒钟查出 52 本书完整信息。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `workBuddy 如何接入 微信 读书mcp` | 询问接入方式，WorkBuddy 推荐 mcp-server-weread npm 包 |
| 2 | `你帮我全局安装，并配置，我去获取cookie给你。` | 触发 npm 全局安装 + mcp.json 配置框架 |
| 3 | `wr_skey=oCJUXSVR; wr_vid=39829589; wr_gid=268425945; wr_fp=1822681908; wr_rt=web%40Yjcdm1uItuka9fedMqf_AL` | 提交第一版 cookie（已过期，-201 失败） |
| 4 | `我的书架有哪些书` | 测试 MCP 工具，发现搜不到 weread 工具 |
| 5 | `我已经重启了，现在看下` | 二次测试 MCP 工具，仍搜不到 |
| 6 | `https://cc.chenge.ink 这个网站都打不开` | 排查路径中断，回到手动获取 cookie |
| 7 | `wr_skey=MAHO7y0e; wr_vid=39829589; wr_gid=268425945; wr_fp=1822681908; wr_rt=web%40Yjcdm1uItuka9fedMqf_AL` + `你看这个可以吗` | 提交第二版 cookie，curl 验证成功返回 54 本书 |
| 8 | `我看到原因了，刚配置的mcp,需要在配置手动点击信任才能启动。你现在使用mcp,帮我查询下，应该就可以了，你试下` | 确认点信任后让 WorkBuddy 用 MCP 查书架 |
| 9 | `我重启了，你现在看下我的书架` | 触发 MCP get_bookshelf 工具查询书架 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 全局安装的 mcp-server-weread（/usr/local/bin/mcp-server-weread）
2. 配置好的 ~/.workbuddy/mcp.json（含 weread 条目 + 有效 cookie）
3. 4 个可用的 MCP 工具（get_bookshelf/search_books/get_book_best_reviews/get_book_notes_and_highlights）
4. 书架查询结果（52 本书完整信息：书名/作者/进度/阅读时长/笔记数）
5. 书架统计（未读 44/在读 7/已读完 1，付费 39，有笔记 5，最大类别影视原著 10/个人成长 8/商业 4）

### 结果证明

![全局安装 mcp-server-weread 并配置框架](/images/workbuddy-cases/case-45/01.png)

![Cookie 填入 mcp.json 配置完成](/images/workbuddy-cases/case-45/02.png)

![重启后 MCP 工具搜不到，排查](/images/workbuddy-cases/case-45/03.png)

![cookie 过期，curl 报 -201 认证失败](/images/workbuddy-cases/case-45/04.png)

![CookieCloud 网站打不开，回手动方式](/images/workbuddy-cases/case-45/05.png)

![MCP 服务管理手动点信任](/images/workbuddy-cases/case-45/06.png)

![点信任后 4 个 MCP 工具全部可用](/images/workbuddy-cases/case-45/07.png)

![书架查询结果 52 本书完整信息](/images/workbuddy-cases/case-45/08.png)

![书架统计与分类明细](/images/workbuddy-cases/case-45/09.png)

### 书架查询结果表（部分）

| 书名 | 作者 | 进度 | 阅读时长 | 笔记 |
|---|---|---|---|---|
| 《人民的名义》 | 周梅森 | 99% | 5 小时 45 分 | - |
| 《信用卡，从卡奴到卡神》 | 简七理财 | 94% | 6 分钟 | - |
| 《精进：如何成为一个很厉害的人》 | 采铜 | 31% | 2 小时 17 分 | 3 条 |
| 《你一年的 8760 小时》 | 艾力 | 21% | 50 分钟 | 1 条 |
| 《一万小时天才理论》 | 科伊尔 | 9% | 18 分钟 | 1 条 |
| 《我喜欢这个功利的世界》 | 咪蒙 | 100% | 5 小时 2 分 | 19 条 |

### 3 个坑及解决方案

| 坑 | 现象 | 解决方案 |
|---|---|---|
| 坑 1：cookie 过期 | curl 报 errcode: -201 认证失败 | 重新登录 weread.qq.com，从 Chrome Application > Cookies 面板复制最新 cookie |
| 坑 2：外部工具网站打不开 | cc.chenge.ink CookieCloud 不可用 | 放弃自动同步，回手动复制 cookie |
| 坑 3：MCP 需手动点信任 | mcp.json 写对、包装了、重启了，工具还是搜不到 | 在 MCP 服务管理界面手动点信任，无任何错误提示 |

## 八、验收标准

- [ ] 成功用一句话让 WorkBuddy 全局安装 mcp-server-weread（/usr/local/bin/mcp-server-weread）
- [ ] WorkBuddy 自动在 ~/.workbuddy/mcp.json 添加 weread 配置条目（含 command 和 env.WEREAD_COOKIE）
- [ ] 从 Chrome Application > Cookies 面板复制 5 个关键 cookie 值（wr_skey/wr_vid/wr_gid/wr_fp/wr_rt）
- [ ] 识别坑 1：第一版 cookie 过期（wr_skey=oCJUXSVR），curl 报 -201 认证失败
- [ ] 识别坑 2：CookieCloud 网站 cc.chenge.ink 不可用
- [ ] 识别坑 3：新加 MCP 默认未信任不运行，需在 MCP 服务管理界面手动点信任
- [ ] 重新获取 cookie 后 curl 验证成功（返回 54 本书数据）
- [ ] 点信任后 4 个 MCP 工具全部可用（get_bookshelf/search_books/get_book_best_reviews/get_book_notes_and_highlights）
- [ ] 成功用 MCP 查询书架，返回 52 本书完整信息（书名/作者/进度/阅读时长/笔记数）
- [ ] 书架统计正确（未读 44/在读 7/已读完 1，付费 39，有笔记 5）
- [ ] 最大类别统计正确（影视原著 10/个人成长 8/商业 4）
- [ ] 后续可一句话查询书架/在读/搜索笔记内容
