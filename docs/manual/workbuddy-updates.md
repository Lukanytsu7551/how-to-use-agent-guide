---
description: "近期 WorkBuddy 相关更新摘要，筛选 CodeBuddy IDE 发布说明中与 Agent、Skills、MCP、自动化、远程工作和对话体验相关的变化。"
---

# 近期 WorkBuddy 更新

本页从官方发布说明中筛选与 WorkBuddy 使用路径直接相关的变化，并按“重点变化、实际影响、建议动作”重新整理。纯编辑器内核、主题和底层构建修复不在此逐条展开。

## 最近版本速览

| 版本 | 发布日期 | 值得关注 |
| --- | --- | --- |
| 4.10.3 | 2026-07-17 | 会话标题、历史定位、Skills 与远程稳定性 |
| 4.10.2 | 2026-07-14 | 主 / 子 Agent 步数限制、Max 模式继承 |
| 4.10.1 | 2026-07-12 | 聊天加载、大工作区、文件引用和模型兼容 |
| 4.10.0 | 2026-07-10 | Skills、MCP OAuth、SubAgents、命令安全 |
| 4.9.15 | 2026-06-26 | 多会话、历史搜索、Diff、Stop Hook |
| 4.9.14 | 2026-06-23 | Agent 独立进程、子代理模型、Skill 识别 |
| 4.9.13 | 2026-06-10 | Hook 权限、企业模型与 Skill 管控 |

## 2026 年 7 月

[查看官方完整版本说明](https://www.codebuddy.cn/docs/ide/release-notes/release-notes)

<article class="codex-update-entry">

<p class="codex-update-date">2026-07-17</p>

### 4.10.3：会话整理与稳定性修复

**重点变化：** 首轮问答结束后可自动生成会话标题，切换历史会话时会继承思考强度；历史提问列表改为分段加载并优化跳转定位。

**实际影响：** 多任务并行时更容易找到旧会话。版本同时修复 Skills 未正确注入提示词、Max Step 无法写入、终端无响应、远程 Agent 搜索死循环、Remote-SSH 面板加载异常和多 Diff 标签引发的内存问题。

**建议动作：** 遇到 Skills 生效异常、远程会话空白或终端卡死的用户优先升级；升级后重新打开一个新会话验证 Skill 和 Max Step 设置。

</article>

<article class="codex-update-entry">

<p class="codex-update-date">2026-07-14</p>

### 4.10.2：控制 Agent 执行上限

**重点变化：** 可以分别设置主 Agent 与子 Agent 的最大执行步数，`0` 表示不限制；切换会话 Tab 时可继承 Max 模式状态。

**实际影响：** 长任务的成本和失控风险更容易管理。版本也修复大型 Skills 目录阻塞发送、多工作区文件引用错误、自定义模型工具调用配置失效、上下文无法自动压缩和运行中会话停止按钮消失等问题。

**建议动作：** 企业或高频用户应为主 Agent、子 Agent 设置合理上限；只有经过验证的固定流程才建议使用不限制步数。

</article>

<article class="codex-update-entry">

<p class="codex-update-date">2026-07-12</p>

### 4.10.1：聊天加载与大工作区体验

**重点变化：** 聊天面板冷启动和再次打开的速度得到优化，隐藏后重新打开可直接复用。

**实际影响：** 修复升级后长期停在 `Loading CodeBuddy...`、Windows 路径包含特殊字符时无法加载、大型或远程工作区扫描导致无响应、自定义模型兼容异常、文件拖入失败和多会话草稿串扰等问题。

**建议动作：** 若升级后仍卡在 Loading，先重启客户端并检查工作区路径；远程或超大项目建议先在较小目录验证扫描与引用范围。

</article>

<article class="codex-update-entry">

<p class="codex-update-date">2026-07-10</p>

### 4.10.0：Agent 工作流集中升级

**重点变化：** 输入框接入 Skills 与自定义模型，新增思考强度、SubAgents 状态、MCP 云端 OAuth、命令安全分级、Git Worktree、静默终端、自动运行配置和 Remote SSH macOS 支持。

**实际影响：** 从模型选择、工具授权到多代理执行的链路更完整。会话历史、长对话、Plan、自动化、MCP、Remote SSH、Diff、浏览器和自定义模型的稳定性也进行了大范围修复。

**建议动作：** 这是变化较大的版本。升级前备份模型、Skills、MCP 与自动运行配置；升级后按“登录 → 模型 → Skill → MCP → 子 Agent → 远程连接”的顺序逐项验证。

</article>

## 2026 年 6 月

<article class="codex-update-entry">

<p class="codex-update-date">2026-06-26</p>

### 4.9.15：多会话与任务回溯

**重点变化：** 新增会话 Tab、历史提问、历史搜索、对话消耗显示和并排 Diff；命令执行结果默认折叠，Stop Hook 可通过 `loop_limit` 限制续跑次数。

**实际影响：** 更适合并行处理多个任务并回看关键提问，也减少了无限续跑和长命令输出干扰。版本还修复制品跨会话串台、Kimi 工具调用死循环、MCP 断网崩溃和部分内存泄漏。

**建议动作：** 自动化任务应明确设置 `loop_limit`；多会话工作时用清晰标题区分项目，并在交付前确认制品属于当前会话。

</article>

<article class="codex-update-entry">

<p class="codex-update-date">2026-06-23</p>

### 4.9.14：Agent 进程与子代理稳定性

**重点变化：** Agent 改为独立进程，降低扩展宿主崩溃和内存溢出风险；子代理模型可继承主 Agent 配置，Skill 入口文件兼容小写 `skill.md`。

**实际影响：** 长任务、远程任务和多代理任务的稳定性更好。模型选择、MCP 重连、对话恢复、超大项目引用、插件市场和 Stop Hook 也得到集中修复。

**建议动作：** Skill 项目仍建议统一使用标准 `SKILL.md`；涉及主 / 子 Agent 使用不同模型的流程，升级后要重新检查继承关系。

</article>

<article class="codex-update-entry">

<p class="codex-update-date">2026-06-10</p>

### 4.9.13：企业权限与工具治理

**重点变化：** PreToolUse Hook 提供更细的工具执行控制，新增企业自定义模型和 Skill 上传策略，并支持通过 deeplink 导入 prompt、command 与 rules。

**实际影响：** 团队可以更明确地控制模型来源、Skill 分发和工具审批。版本还修复 Hook 确认被跳过、子 Agent 误调用、MCP OAuth 循环、超大工具结果导致崩溃以及 Windows 安全问题。

**建议动作：** 企业管理员应重新核对 Hook、AutoRun、模型白名单和 Skill 上传策略；不要只依赖默认设置作为权限边界。

</article>

## 阅读与升级建议

- **普通办公用户：** 优先关注聊天加载、会话历史、Skills 和模型兼容性。
- **自动化用户：** 重点检查 Agent 步数、`loop_limit`、AutoRun 与失败恢复。
- **企业管理员：** 重点检查 Hook、MCP OAuth、自定义模型、Skill 上传策略和危险命令审批。
- **远程开发用户：** 重点关注 Remote SSH、工作区扫描、终端和文件引用修复。

版本功能可能因客户端、账号、地区和灰度策略不同而有差异。升级或配置前请打开 [官方完整版本说明](https://www.codebuddy.cn/docs/ide/release-notes/release-notes) 核对。
