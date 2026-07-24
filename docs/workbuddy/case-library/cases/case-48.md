# Case 48｜MCP 才装两天就过时了——用官方 Skill 让 WorkBuddy 接管微信读书

> **WorkBuddy 案例集 · 第 48 篇**
> 分类：AI能力扩展

---

## 一、场景描述

前几天刚折腾完微信读书 MCP，写了一整篇踩坑记录——cookie 过期、网站打不开、配置完还要手动信任。没想到两天后，微信读书自己把 Skill 开放了。直接开干。打开 WorkBuddy 问了一句："微信读书现在有 skill 了吗？"WorkBuddy 回：没有官方 Skill，但你可以用 MCP 方式接入。跟两天前一样的答案。不信，让 WorkBuddy 去微信读书官网搜索看看，到底有没有。搜完回来，语气变了——微信读书确实在 2025 年 5 月 16 日发布了官方 Agent Skill，版本 1.0.3。

WorkBuddy 解释了 Skill 和 MCP 的区别：MCP 认证用 Cookie（会过期），Skill 用 API Key（长期有效）；MCP 安装是 npm 全局安装 + 手动配置 mcp.json，Skill 是下载 zip 解压到 skills 目录；MCP 是通用工具协议，Skill 是专为 AI Agent 设计；MCP 覆盖 4 个工具，Skill 覆盖 8 大模块（多出搜索/统计/推荐等）。最关键的一点——不需要 cookie 了。API Key 绑定用户身份，不会过期，不用每次登录重新拿。

让 WorkBuddy 装，先试了官方推荐的方式 `npx skills add jerlinn/jerlin-weread -g -y`，结果卡住了，等了好几分钟没有任何输出，超时了。WorkBuddy 换了个思路：直接从官方 CDN 下载 zip 包 `curl -L -o weread-skills.zip https://cdn.weread.qq.com/skills/weread-skills.zip`，解压把文件手动拷到 ~/.workbuddy/skills/weread/ 目录。9 个 Markdown 文件清清爽爽：SKILL.md/search.md/shelf.md/book.md/notes.md/review.md/readdata.md/discover.md/profile.md。配 API Key 直接去微信读书 Skill 官网拿，点"获取 API Key"按钮生成专属 Key（wrk-NVbX...dgAA），复制发给 WorkBuddy。WorkBuddy 把 Key 写进 ~/.zshrc，验证一下直接调接口查书架——秒回，53 条数据（52 本电子书 + 1 个文章合集）。跟上次 MCP 拿到的数据一致，但这次没有 cookie 过期、没有认证失败、没有手动信任。一个坑都没踩，唯一的小插曲是 npx skills add 卡住了，换成手动下载 zip 就好了。

## 二、想要完成的任务

用微信读书 2025-05-16 发布的官方 Agent Skill（v1.0.3）替代两天前装的 MCP，让 WorkBuddy 通过 API Key 直接接管微信读书 8 大能力模块（书架/搜索/笔记/书评/统计/推荐/章节划线/书籍详情）。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| 微信读书官方 Skill (v1.0.3) | 8 大模块：搜索/书籍信息/书架/阅读统计/笔记划线/热门划线/书籍点评/推荐好书 | 微信读书官方（cdn.weread.qq.com/skills/） | 微信读书 API Key |
| ardot-design-assistant（参考） | 技能市场安装方式参考 | WorkBuddy 技能市场 | - |
| curl + unzip | 下载官方 zip 包并解压到 skills 目录 | 内置能力 | 本地文件读写 |
| 环境变量配置 | 将 WEREAD_API_KEY 写入 ~/.zshrc | 内置能力 | 本地文件读写 |
| curl 接口验证 | 直接调微信读书 API 验证 Key 是否生效 | 内置能力 | 网络访问 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 工作区可读写 ~/.workbuddy/skills/weread/ 目录
3. 工作区可读写 ~/.zshrc 文件
4. 网络可访问 cdn.weread.qq.com（下载 Skill zip 包）
5. 网络可访问 i.weread.qq.com（API 接口验证）
6. 已注册微信读书账号并能登录 weread.qq.com 获取 API Key
7. （可选）已读过 Case 45 的 MCP 方案，便于对比

## 五、在 WorkBuddy 中的操作

### 步骤 1：询问是否有官方 Skill，WorkBuddy 信息滞后
问："微信读书现在有 skill 了吗？"WorkBuddy 回：没有官方 Skill，但你可以用 MCP 方式接入。跟两天前一样的答案。不信，让 WorkBuddy 去微信读书官网搜索看看，到底有没有。搜完回来 WorkBuddy 语气变了——微信读书确实在 2025 年 5 月 16 日发布了官方 Agent Skill，版本 1.0.3，刚发布的。
**关键步骤**：WorkBuddy 信息滞后给出错误答案，要求其去官网搜索纠正认知。

### 步骤 2：WorkBuddy 主动对比 Skill vs MCP 的差异
WorkBuddy 给出对比表：MCP 认证用 Cookie（会过期），Skill 用 API Key（长期有效）；MCP 是 npm 全局安装+手动配置 mcp.json，Skill 是下载 zip 解压到 skills 目录；MCP 是通用工具协议，Skill 是专为 AI Agent 设计；MCP 覆盖 4 个工具，Skill 覆盖 8 大模块（多出搜索/统计/推荐/章节热门划线）。最关键——不需要 cookie 了，API Key 绑定用户身份不会过期。
**关键步骤**：API Key 替代 Cookie，8 大模块替代 4 个工具，无需手动信任。

### 步骤 3：尝试官方推荐安装方式 npx skills add 卡住
让 WorkBuddy 装。先试了官方推荐的方式 `npx skills add jerlinn/jerlin-weread -g -y`，结果卡住了，等了好几分钟没有任何输出，超时了。
**关键步骤**：npx skills add 超时无输出，需要切换安装方式。

### 步骤 4：改用 curl 下载官方 zip 包并解压到 skills 目录
WorkBuddy 换了个思路：直接从官方 CDN 下载 zip 包 `curl -L -o weread-skills.zip https://cdn.weread.qq.com/skills/weread-skills.zip`，下载完解压把文件手动拷到 ~/.workbuddy/skills/weread/ 目录。9 个 Markdown 文件清清爽爽：SKILL.md（总入口+接口规范）、search.md（书城搜索）、shelf.md（书架管理）、book.md（书籍详情/章节/进度）、notes.md（笔记/划线/书签）、review.md（书评）、readdata.md（阅读统计）、discover.md（个性化推荐）、profile.md（用户画像）。
**关键步骤**：curl 下载 zip + unzip 解压到 ~/.workbuddy/skills/weread/，9 个 Markdown 文件。

### 步骤 5：去微信读书 Skill 官网一键获取 API Key
配 API Key 直接去微信读书 Skill 官网拿（https://weread.qq.com/r/weread-skills），打开官网第一眼就看到六个能力模块：查阅书架/书籍搜索/阅读统计/书籍详情/笔记和划线/推荐好书。点"快速配置"进入配置页：第 1 步复制 Skill 安装指令（显示下载 zip 包的命令），第 2 步获取 API Key。点"获取 API Key"按钮，直接生成专属 Key：wrk-NVbX...dgAA，下面有"复制 Key"按钮。注意下面的小字——创建于 2026-05-17，尚未使用。全新的 Key。
**关键步骤**：官网一键生成 API Key（wrk- 前缀），无需复制 cookie。

### 步骤 6：把 Key 发给 WorkBuddy，写入 ~/.zshrc 并验证
点"复制 Key"，把 Key 发给 WorkBuddy：`wrk-NVbXuyyHTDaMjpfT5UbjdFAA`。WorkBuddy 收到后把它写进 ~/.zshrc：`export WEREAD_API_KEY="wrk-NVbXuyyHTDaMjpfT5UbjdgAA"`。然后验证——直接调接口查书架 `curl -X POST "https://i.weread.qq.com/api/agent/gateway" -H "Authorization: Bearer $WEREAD_API_KEY" -H "Content-Type: application/json" -d '{"api_name": "/shelf/sync", "skill_version": "1.0.3"}'`，秒回。53 条数据——52 本电子书 + 1 个文章合集。跟上次 MCP 拿到的数据一致，但这次没有 cookie 过期、没有认证失败、没有手动信任。
**关键步骤**：API Key 写入 ~/.zshrc，curl 验证秒回 53 条书架数据。

### 步骤 7：使用 Skill 推荐 12 本书并修正 WorkBuddy 走错路径
配好后直接用："推荐几本书给我"。WorkBuddy 这时候犯了个错——它没加载 Skill 而是自己写 Python 脚本去调 API。虽然也能用但失去装 Skill 的意义。提醒："你不是安装了微信读书 skill 吗？直接使用 skill 不行吗？为啥还用 python 调取"。WorkBuddy 立刻纠正，加载了微信读书 Skill，按 Skill 文档规范调推荐接口，12 本书推荐回来还带 deep link，点击直接跳微信读书 APP。
**关键步骤**：WorkBuddy 走错路径用 Python 硬调，提醒后加载 Skill 按规范调用返回 12 本推荐书。

### 步骤 8：列出 Skill 全部 8 大能力模块
问："微信读书的 skill 还有什么能力？在我看下"。WorkBuddy 列出 8 大模块：搜索书籍（/store/search，支持书籍/网文/有声书/作者/全文/书单/公众号/文章）、书籍信息（/book/info + /book/chapterinfo + /book/getprogress）、书架管理（/shelf/sync）、阅读统计（/readdata/summary + /readdata/detail，按周/月/年/全周期）、笔记划线（/user/notebooks + /book/noteCount）、章节热门划线（/book/chapterBestHighlights）、书籍点评（/book/review + /book/reviewByCategory）、推荐好书（/book/recommend + /book/similar）。对比 MCP 的 4 个工具，Skill 多了搜索/阅读统计/个性化推荐/章节热门划线这四样。
**关键步骤**：8 大模块对比 MCP 4 个工具，多出搜索/统计/推荐/热门划线。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `微信读书现在有skill了吗？` | 询问是否有官方 Skill（WorkBuddy 信息滞后） |
| 2 | `你去微信读书官网搜索看看，到底有没有` | 要求 WorkBuddy 联网搜索纠正认知 |
| 3 | `好，你帮我安装下，他给我瞎安装，因为技能仓库有很多不名skill` | 触发安装，提醒不要装错来源 |
| 4 | `你安装这个skill要去官网查看如何安装` | 要求按官方方式安装 |
| 5 | `wrk-NVbXuyyHTDaMjpfT5UbjdFAA` | 提交从官网获取的 API Key |
| 6 | `推荐几本书给我` | 测试 Skill 推荐能力 |
| 7 | `你不是安装了微信读书skill吗？直接使用skill不行吗？为啥还用python调取` | 修正 WorkBuddy 走错路径，要求按 Skill 规范调用 |
| 8 | `微信读书的skill还有什么能力？在我看下` | 查看 8 大能力模块完整列表 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 微信读书官方 Skill 安装目录（~/.workbuddy/skills/weread/，9 个 Markdown 文件）
2. 配置好的 API Key（~/.zshrc 中 WEREAD_API_KEY，wrk-NVbX...dgAA）
3. 书架验证数据（53 条 = 52 本电子书 + 1 个文章合集）
4. 12 本个性化推荐书单（含书名/作者/分类/deep link）
5. 8 大能力模块清单（搜索/书籍信息/书架/阅读统计/笔记划线/热门划线/书籍点评/推荐好书）

### 结果证明

![询问是否有 Skill，WorkBuddy 信息滞后](/images/workbuddy-cases/case-48/01.png)

![WorkBuddy 联网搜索后确认官方 Skill 已发布](/images/workbuddy-cases/case-48/02.png)

![npx skills add 卡住，改用 curl 下载 zip 手动安装](/images/workbuddy-cases/case-48/03.png)

![9 个 Markdown 文件清爽的 skills 目录结构](/images/workbuddy-cases/case-48/04.png)

![微信读书 Skill 官网快速配置页](/images/workbuddy-cases/case-48/05.png)

![点击获取 API Key 生成专属 Key](/images/workbuddy-cases/case-48/06.png)

![复制 Key 按钮（创建于 2026-05-17，尚未使用）](/images/workbuddy-cases/case-48/07.png)

![API Key 验证通过，书架 53 条数据](/images/workbuddy-cases/case-48/08.png)

![推荐 12 本书并修正 WorkBuddy 走 Skill 路径](/images/workbuddy-cases/case-48/09.png)

![WorkBuddy 纠正后按 Skill 规范调用返回推荐结果](/images/workbuddy-cases/case-48/10.png)

![8 大能力模块完整清单](/images/workbuddy-cases/case-48/11.png)

### Skill vs MCP 对比表

| 对比项 | MCP | Skill |
|---|---|---|
| 认证方式 | Cookie（会过期） | API Key（长期有效） |
| 安装方式 | npm 全局安装 + 手动配置 mcp.json | 下载 zip 解压到 skills 目录 |
| 生态定位 | 通用工具协议 | 专为 AI Agent 设计 |
| 覆盖能力 | 4 个工具（书架/搜索/笔记/书评） | 8 大模块（多出搜索/统计/推荐/热门划线） |
| 维护方 | 社区维护 | 微信读书官方维护 |
| 安装踩坑 | cookie 过期/CookieCloud 打不开/需手动信任 | 仅 npx skills add 卡住，换 zip 下载就好 |

### 8 大能力模块表

| 模块 | 你可以这样问 | 核心接口 |
|---|---|---|
| 搜索书籍 | "帮我搜一下三体" | /store/search（8 种类型） |
| 书籍信息 | "这本书有多少章""我读到哪了" | /book/info + /book/chapterinfo + /book/getprogress |
| 书架管理 | "看看我的书架" | /shelf/sync |
| 阅读统计 | "我这个月读了多久""今年读了几本书" | /readdata/summary + /readdata/detail |
| 笔记划线 | "看看我在三体里的笔记" | /user/notebooks + /book/noteCount |
| 章节热门划线 | "这章有什么热门划线" | /book/chapterBestHighlights |
| 书籍点评 | "三体这本书有什么点评？" | /book/review + /book/reviewByCategory |
| 推荐好书 | "给我推荐几本书" | /book/recommend + /book/similar |

## 八、验收标准

- [ ] 询问"微信读书现在有 skill 了吗"，WorkBuddy 信息滞后给出错误答案
- [ ] 要求 WorkBuddy 去微信读书官网搜索，确认 2025-05-16 发布官方 Skill v1.0.3
- [ ] WorkBuddy 主动给出 Skill vs MCP 对比表（认证/安装/定位/能力/维护）
- [ ] 尝试 `npx skills add jerlinn/jerlin-weread -g -y` 超时无输出
- [ ] 改用 `curl -L -o weread-skills.zip https://cdn.weread.qq.com/skills/weread-skills.zip` 下载成功
- [ ] 解压到 ~/.workbuddy/skills/weread/，确认 9 个 Markdown 文件（SKILL/search/shelf/book/notes/review/readdata/discover/profile）
- [ ] 去微信读书 Skill 官网点"获取 API Key"生成专属 Key（wrk- 前缀）
- [ ] API Key 写入 ~/.zshrc（export WEREAD_API_KEY=...）
- [ ] curl 调 /shelf/sync 接口验证秒回 53 条书架数据（52 本电子书 + 1 个文章合集）
- [ ] 识别 WorkBuddy 走错路径（用 Python 硬调 API），提醒后按 Skill 规范调用
- [ ] 推荐接口返回 12 本书（含书名/作者/分类/deep link）
- [ ] 列出 8 大能力模块完整清单（对比 MCP 4 个工具多出 4 样）
- [ ] 全程一个坑都没踩（仅 npx 卡住，换 zip 就好）
