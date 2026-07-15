---
description: "Codex 问题排查中心，按安装、登录、网络、权限、CLI、Desktop、插件和 Windows 等场景整理常见问题、Bug 现象、定位方法和恢复路径。"
permalink: /troubleshooting/
---

# 问题排查中心

这里集中整理安装和使用 Codex 过程中常见的问题、Bug 现象、排查路径和恢复方式。你可以把它当成一个可持续维护的 Codex 问题库：先按使用阶段定位，再按现象查找，最后按“先确认、再修复、再记录”的顺序处理。

## 快速使用

- 页面内查找：使用浏览器搜索，输入错误关键词，例如 `Reconnecting`、`login`、`sandbox`、`MCP`、`Windows`、`permission`。
- 不确定原因：先运行 `codex doctor`，再看“通用定位流程”，把问题归到安装、启动、登录、网络、权限、任务执行或插件集成。
- 需要求助：先准备脱敏后的错误信息、系统版本、Codex 版本、安装方式、认证方式、复现步骤和最近改动。

## 排查主线

Codex 的问题通常不是孤立出现的。建议按用户真实使用进程递进排查：

```text
下载与安装 -> 打开与启动 -> 登录与认证 -> 首次运行 -> 权限与沙盒 -> 网络连接 -> 配置与模型 -> Desktop / IDE -> 插件 / MCP / Browser -> Windows / WSL -> 问题上报
```

| 使用阶段 | 典型问题 | 优先动作 |
|---|---|---|
| 下载安装到 | 安装失败、版本不对、命令不存在 | 确认安装方式、PATH、Node/npm、系统权限 |
| 打开 Codex | CLI / Desktop 无法启动、配置报错 | 运行 `codex doctor`，检查 `config.toml` 和启动日志 |
| 登录认证 | 浏览器登录卡住、API key 不生效、远程机器无法回调 | 检查登录方式、回调环境、`codex login status` |
| 开始使用 | 找不到项目、读不到文件、命令执行失败 | 确认工作目录、Git 状态、sandbox、任务范围 |
| 持续运行 | Reconnecting、timeout、stream 中断 | 检查代理、VPN、WebSocket、服务状态 |
| 高级集成 | MCP、Browser、Skills、插件工具不可用 | 检查授权、环境变量、工具注入、worker 日志 |
| 平台专项 | Windows / WSL 路径、权限、sandbox 异常 | 分清 Windows 与 WSL 环境，按平台单独排查 |

## 通用自检命令

遇到问题时，先把这些信息整理出来，后续定位会快很多：

```bash
codex --version
codex doctor
codex login status
which codex
pwd
git status --short --branch
```

Windows PowerShell 可把 `which codex` 换成：

```powershell
where.exe codex
```

## 问题分类

| 分类 | 适用场景 | 优先检查 |
|---|---|---|
| 安装与更新 | 桌面 App、CLI、依赖安装失败 | 版本、安装源、系统权限、网络 |
| 打开与启动 | CLI / Desktop 无法打开、启动时报错 | PATH、配置文件、app-server、系统日志 |
| 登录与认证 | 登录失败、计划不可用、组织权限异常 | 账号计划、组织策略、登录状态、API key |
| 首次使用 | 不知道怎么开始、读不到项目、命令失败 | 工作目录、Git 状态、依赖安装、任务范围 |
| 网络与连接 | Reconnecting、stream disconnected、请求超时 | 代理、WebSocket/SSE、服务端状态 |
| 权限与沙盒 | 文件不可写、命令被拦截、审批异常 | sandbox、approval、工作目录 |
| CLI 与配置 | `codex` 命令异常、`config.toml` 不生效 | 配置层级、provider、环境变量 |
| Desktop 与线程 | 会话不可见、线程恢复失败、工作区异常 | thread、resume、worktree、项目路径 |
| 插件与 MCP | Browser、node_repl、Notion、Figma 等工具失败 | MCP 环境变量、授权、worker 日志 |
| Windows / WSL | Windows App、PowerShell、WSL 路径问题 | 用户环境变量、WSL 启动方式、路径映射 |

## 通用定位流程

1. **记录现象**：截图或复制错误文本，标注发生时间和触发动作。
2. **判断范围**：新建任务是否也失败？只有某个项目失败，还是整个 Codex 都失败？
3. **区分层级**：是安装、启动、登录、网络、权限、配置、插件，还是具体任务执行问题？
4. **最小复现**：换一个空目录或简单命令验证，避免把项目问题误判成 Codex 问题。
5. **检查最近改动**：是否刚改过 `config.toml`、代理、MCP、系统权限或 Git 分支？
6. **采用最小修复**：一次只改一个变量，修复后记录原因和验证结果。

## 常见问题速查

### 安装与更新

| 现象 | 可能原因 | 处理方式 |
|---|---|---|
| CLI 安装后找不到 `codex` 命令 | PATH 未生效、安装失败或多个安装路径冲突 | 重新打开终端，检查 `which codex` / `where.exe codex`，确认实际运行路径 |
| `npm install -g @openai/codex` 失败 | npm 源、DNS、代理、Node 环境或权限问题 | 先确认 npm registry 可访问；必要时切换网络、代理或使用官方安装脚本 / GitHub Release 二进制包 |
| npm 报 `ENOTFOUND` | DNS 或网络无法解析 `registry.npmjs.org` | 检查 DNS、VPN、公司网络策略和 npm registry 配置 |
| 更新后仍提示旧版本 | npm、Homebrew、手动二进制多路径并存 | 找到实际 `codex` 路径，删除旧安装残留后重装 |
| 桌面 App 安装后无法启动 | 系统权限、下载包损坏或安全策略限制 | 重新下载官方安装包，检查系统安全与隐私设置 |
| 更新后功能异常 | 旧配置与新版本行为不一致 | 先备份配置，再按官方文档核对新版本变更 |
| 依赖安装失败 | 网络、npm/pnpm 源、权限或 Node 版本问题 | 检查 Node 版本、包管理器版本和网络代理 |
| 提示 unsupported platform | 当前系统或架构暂不支持 | 换官方支持的平台包，或使用源码构建 / 等待官方支持 |

建议记录：

- 安装方式：官方脚本 / npm / Homebrew / GitHub Release / Desktop App。
- 版本信息：`codex --version`。
- 实际路径：`which codex` 或 `where.exe codex`。
- 完整安装错误：脱敏后保留关键报错行。

### 打开与启动

| 现象 | 可能原因 | 处理方式 |
|---|---|---|
| 输入 `codex` 后没有反应 | 命令路径、shell 初始化或安装不完整 | 换一个新终端，确认 PATH，运行 `codex --version` |
| 启动时报 `No such file or directory` | 配置文件路径、缓存目录或旧版本残留异常 | 备份后检查 `~/.codex/config.toml`，必要时临时移走配置重新启动 |
| TOML / config 解析失败 | `config.toml` 字段写错、引号或缩进错误 | 按官方配置格式逐项核对；一次只恢复一个配置块 |
| Linux sandbox 启动警告 | 缺少 bubblewrap、user namespace 或 AppArmor 限制 | 安装系统依赖，检查发行版 sandbox 限制 |
| Desktop 无法新建线程 | app-server、权限 profile 或本地状态异常 | 更新 CLI 和 Desktop，完全退出后重启；用 CLI 新线程做对照测试 |

启动阶段优先判断：CLI 是否正常、Desktop 是否单独异常、只有某个项目失败还是所有项目都失败。

### 登录与认证

| 现象 | 可能原因 | 处理方式 |
|---|---|---|
| 登录循环或登录后仍显示未登录 | 浏览器会话、缓存或账号切换异常 | 退出账号后重新登录，必要时换默认浏览器完成登录 |
| 浏览器登录后不返回 CLI | 本地回调端口、默认浏览器、远程机器或 WSL 环境异常 | 在本机环境完成登录；远程 / 无头环境优先考虑 API key |
| 远程机器登录失败 | CLI 在远程主机，浏览器在本地，`localhost` 回调不通 | 使用 API key 登录，或配置端口转发让回调回到远程环境 |
| API key 不生效 | 环境变量未注入当前 shell，或 key / provider 配错 | 检查 `OPENAI_API_KEY`、provider、base URL 和当前终端环境 |
| 功能入口不可见 | 账号计划、地区、组织策略或灰度开关限制 | 打开官方 Help Center 核对当前账号可用性 |
| 组织账号权限异常 | 管理员策略限制 Codex 或相关工具 | 联系管理员确认 Codex、Computer Use、插件权限 |
| 第三方 API 连接失败 | API Key、base URL 或模型名配置错误 | 逐项核对 provider、model、env 和请求地址 |
| 账号验证卡住 | MFA、手机号、安全验证或账号状态问题 | 走 OpenAI 账号恢复 / 支持流程，Codex 本身无法绕过账号安全验证 |

常用检查：

```bash
codex login status
codex logout
printenv OPENAI_API_KEY
```

### 首次使用

| 现象 | 可能原因 | 处理方式 |
|---|---|---|
| 不知道怎么开始 | 任务目标过大或没有明确文件范围 | 先让 Codex 阅读项目结构，再交给它一个小而明确的修改任务 |
| Codex 读不到项目文件 | 启动目录不对、工作区不对或路径包含特殊环境 | 在项目根目录启动；确认 `pwd` 和 Git 根目录 |
| Codex 改错文件 | 指令范围不清或同名文件太多 | 明确允许修改的路径、禁止修改的范围和验收标准 |
| 命令执行失败 | 依赖未安装、脚本不存在或环境变量缺失 | 先运行项目 README 中的安装步骤，再让 Codex 读取 package / Makefile |
| 测试一直失败 | 项目本身已有失败、环境缺依赖或 Codex 改动引入问题 | 先跑 baseline，区分“原本失败”和“本次改动导致失败” |

首次使用建议从这类任务开始：

- “请阅读项目结构，告诉我入口文件、构建命令和测试命令。”
- “请修复这个单一报错，不要改动无关文件。”
- “请运行现有测试，并告诉我失败是否和本次改动有关。”

### 网络与连接

| 现象 | 可能原因 | 处理方式 |
|---|---|---|
| Desktop 一直显示 `Reconnecting` | 主连接、代理、WebSocket/SSE 或服务端临时异常 | 先检查代理和网络，再看是否只有旧会话受影响 |
| `stream disconnected before completion` | 流式连接中断、网络抖动或服务端临时问题 | 重试任务，必要时缩短上下文或新建线程 |
| `idle timeout waiting for websocket` | WebSocket 连接被代理、VPN、公司网络或 Cloudflare 链路中断 | 切换网络 / VPN，尝试直连，升级版本并保留日志 |
| 登录、npm、模型请求都失败 | 公司网络、DNS、证书或代理策略限制 | 确认 `chatgpt.com`、`api.openai.com`、npm registry 等目标可访问 |
| MCP 工具连接失败 | MCP worker 没有继承代理或环境变量 | 在 MCP server env 中单独配置代理变量 |
| 请求超时 | 网络出口、代理协议或 DNS 问题 | 使用 `curl` 验证代理协议、目标域名和出口 |

参考命令：

```bash
scutil --proxy
launchctl getenv HTTP_PROXY
launchctl getenv HTTPS_PROXY
curl -sS --max-time 10 https://api.ipify.org?format=json
```

### 权限、审批与沙盒

| 现象 | 可能原因 | 处理方式 |
|---|---|---|
| Codex 无法修改文件 | 工作区不在可写范围或沙盒限制 | 确认当前目录、sandbox 策略和 writable roots |
| 命令需要反复审批 | approval policy 设置较严格 | 根据任务风险调整审批方式，保留高风险命令人工确认 |
| 提示 `failed in sandbox` | 当前 sandbox 不允许命令访问文件、网络或系统资源 | 判断是否需要扩大权限，或把任务改成在工作区内完成 |
| 无法访问网络 | `workspace-write` 默认关闭网络，或当前环境无网络出口 | 在允许的环境中开启网络访问；受限环境下让 Codex 输出离线方案 |
| Full Access 下旧线程仍受限 | 线程恢复时继承了旧权限状态 | 新建线程验证；必要时重启 Desktop / CLI |
| 任务改动范围过大 | 指令边界不清或上下文不足 | 明确允许修改的文件、禁止改动范围和验收标准 |

### CLI 与配置

| 现象 | 可能原因 | 处理方式 |
|---|---|---|
| `config.toml` 修改后不生效 | 文件位置、层级或字段名错误 | 核对官方配置参考，确认使用的是当前 `$CODEX_HOME` |
| 模型不可选或不可用 | 登录方式、账号计划、provider 或版本差异 | 核对当前认证方式；必要时切换 API key / provider |
| 配置被覆盖 | CLI 参数、项目配置、profile、用户配置存在优先级 | 从命令行参数到项目 `.codex/config.toml` 再到用户配置逐层检查 |
| 切换 provider 后旧会话不可见 | 会话 metadata 或项目缓存仍指向旧 provider | 先备份 `~/.codex`，再核对 sessions 和 provider 配置 |
| CLI 能用但 Desktop 不正常 | Desktop 启动环境与终端环境不同 | 检查 GUI 环境变量、代理和登录状态 |
| 同一命令在不同终端表现不同 | shell、PATH 或 login 环境不同 | 打印 `which codex`、`env` 和 shell 启动方式 |

### Desktop、线程与工作区

| 现象 | 可能原因 | 处理方式 |
|---|---|---|
| 历史线程找不到 | 项目路径变化、最近线程限制或 provider 切换 | 先查 `$CODEX_HOME/sessions`，再判断是否只是列表过滤 |
| 旧线程打不开或加载不完整 | Desktop 线程索引、app-server 或本地状态异常 | 重启 Desktop；新建线程对照；保留 thread id 和日志 |
| sidebar 显示 No chats | 远程项目、路径变化或索引未刷新 | 确认当前 workspace 路径，避免删除本地会话数据 |
| Worktree 任务混乱 | 多分支/多目录未区分清楚 | 给任务命名，记录分支、目录和交付目标 |
| 线程恢复后上下文不对 | 旧任务摘要不足或工作区变更 | 补充当前目标、关键文件和最新状态 |
| Handoff 后找不到项目 | 目标 host 或路径未配置 | 确认目标环境、项目路径和 Git 状态 |

### 插件、Browser 与 MCP

| 现象 | 可能原因 | 处理方式 |
|---|---|---|
| MCP 配置存在但工具不可用 | 工具未注入当前线程、版本回归或授权状态异常 | 运行 `codex mcp list`，新建线程验证，保留 JSON 输出 |
| Browser MCP 报 `Transport closed` | Browser worker、Desktop 内置 MCP 或浏览器连接异常 | 重启 Desktop / 浏览器，确认 CLI 与 Desktop 表现是否一致 |
| OAuth MCP 登录成功但工具不出现 | OAuth 状态没有进入当前线程或工具导入失败 | 重新授权、删除后重加 MCP，检查 `auth_status` |
| Browser / Chrome 控制失败 | 浏览器连接、扩展、权限或页面登录态异常 | 先确认目标浏览器和页面状态，再重试连接 |
| node_repl 无法执行 | worker 未启动、依赖缺失或环境变量不完整 | 检查 MCP worker 日志和工具初始化步骤 |
| Notion 写入失败 | integration 未授权目标页面或数据库 | 将目标页面/数据库 share 给 Notion integration |
| Figma / Notion / GitHub 插件返回空 | 权限范围不足或未选中正确 workspace | 重新授权并确认目标资源可见 |
| Skills 不加载 | 文件名、路径、软链接或版本规则不符合要求 | 确认文件名为 `SKILL.md`，路径在 Codex 可识别位置，新线程重试 |

### Windows / WSL

| 现象 | 可能原因 | 处理方式 |
|---|---|---|
| Windows sandbox setup 失败 | UAC、企业策略、用户组、firewall 或 logon rights 限制 | 重新执行 elevated setup；公司电脑联系 IT；临时使用 unelevated sandbox |
| Windows error 1385 | sandbox 用户被系统拒绝某类登录 | 检查本地安全策略 / 企业策略，保留 sandbox log |
| Windows App 读不到代理 | 只配置了 WSL 或终端环境变量 | 配置 Windows 用户环境变量并重启 App |
| WSL 下路径混乱 | Windows 路径和 Linux 路径混用 | 明确任务运行在 Windows 还是 WSL，统一路径口径 |
| WSL 浏览器登录失败 | WSL 与 Windows 浏览器回调环境不一致 | 在 WSL 内完成认证，配置端口转发，或改用 API key |
| PowerShell 命令失败 | 执行策略、转义或权限问题 | 简化命令，必要时以管理员权限运行一次诊断 |
| Browser / Computer Use 权限异常 | Windows 桌面权限或浏览器扩展未就绪 | 先确认浏览器可见状态和扩展授权 |

## 未收录问题的处理路径

如果遇到这里没有记录的问题，而且暂时找不到明确解决方案，优先走下面两条路径：

### 看官方文档和更新日志

有些问题其实来自版本变更、功能灰度、已知限制或新旧配置差异。先对照官方资料确认当前行为是否已经变化：

- [Codex 官方文档](https://developers.openai.com/codex/)
- [Codex Changelog](https://developers.openai.com/codex/changelog)

建议重点查看：

- 当前版本是否刚发布过相关修复或破坏性变更。
- 安装、认证、sandbox、MCP、配置项是否有新说明。
- 问题是否只出现在某个版本、某个平台或某种登录方式下。

### 让 AI 帮你分析日志

把脱敏后的错误日志、配置片段和复现步骤发给 Codex / ChatGPT，让它按下面结构分析：

<CodexIssueAssistant />

```md
请根据以下信息帮我排查 Codex 问题：

1. 现象：
2. 报错日志：
3. 操作系统：
4. Codex 版本：
5. 安装方式：
6. 登录方式：
7. 最近改动：
8. 复现步骤：

请按“可能原因、验证步骤、修复方案、仍无法解决时需要补充的信息”输出。
```

提交给 AI 前，先删除或打码 token、API key、邮箱、真实 IP、私有仓库地址、session id、conversation id 和本机敏感路径。

## Bug 上报模板

复制下面模板，发给团队成员或提交到 issue 时更容易定位：

```md
## 环境信息

- Codex 版本：
- 操作系统：
- 安装方式：官方脚本 / npm / Homebrew / GitHub Release / Desktop App
- 使用入口：CLI / Desktop / IDE / Web
- 登录方式：ChatGPT / API key / 第三方 provider
- 是否使用代理 / VPN：
- 是否使用 MCP / 插件 / Skills：

## 问题现象

- 报错信息：
- 截图：
- 是否稳定复现：

## 复现步骤

1.
2.
3.

## 已尝试方案

-

## 诊断信息

- `codex --version`：
- `codex doctor` 输出：
- `codex login status` 输出：
- 相关配置文件路径：
```

## 提交问题时建议附带的信息

- 问题标题：一句话描述现象。
- 发生环境：macOS / Windows / WSL / Linux，Codex App 或 CLI。
- Codex 版本：App 版本或 CLI 版本。
- 安装方式：官方脚本、npm、Homebrew、GitHub Release 或 Desktop App。
- 认证方式：ChatGPT 登录、API key 或第三方 provider。
- 复现步骤：从打开项目到报错的最短步骤。
- 错误文本：脱敏后的完整错误。
- 最近改动：是否改过代理、`config.toml`、MCP、模型或 provider。
- 已尝试方案：避免别人重复建议同一操作。

不要公开邮箱、account id、conversation id、session id、token、真实出口 IP、私有仓库名、完整本机路径或未脱敏日志。

## 后续维护格式

新增问题时建议使用下面格式：

```md
### 问题标题

- 现象：
- 影响范围：
- 可能原因：
- 排查步骤：
- 解决方案：
- 验证方式：
- 关联版本/平台：
```

## 延伸阅读

- [进阶教程：排障手册](../advanced/11-troubleshooting.md)
- [参考手册](../manual/)
- [权限管理](../advanced/04-permissions-security.md)
- [沙盒与审批](../advanced/07-sandbox-approvals.md)
- [配置文件 config.toml](../advanced/09-config-toml.md)
