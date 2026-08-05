# How to Use Agent

面向中文用户的 Agent 教程中心，帮助你选择适合自己的工具，理解 Agent 的系统原理，并从第一个真实任务开始建立可复用的工作方式。

[在线阅读](https://lukanytsu7551.github.io/how-to-use-agent-guide/) · [贡献指南](./CONTRIBUTING.md) · [安全政策](./SECURITY.md) · [行为准则](./CODE_OF_CONDUCT.md)

## 三条学习入口

| Guide | 适合场景 | 学习重点 |
| --- | --- | --- |
| Codex Guide | 代码编写、终端操作、工程重构与复杂开发 | 桌面 App、CLI、IDE、MCP、项目规则与工程工作流 |
| WorkBuddy Guide | 日常办公、资料处理、桌面自动化与协作 | 安装入门、办公任务、Skill、连接器、自动化与多 Agent 协作 |
| Agent Guide | 系统学习 Agent 原理与工程方法 | 运行循环、工具、上下文、记忆、编排、治理与长任务运行时 |

## 使用路径

1. 需要立即完成具体工作时，先根据任务类型、使用环境和技术门槛选择 Codex 或 WorkBuddy。
2. 从对应产品的快速上手开始，完成安装、登录与第一个可验证的任务。
3. 在实战案例中找到可复现的工作方式，再进入进阶教程学习配置、工具接入、自动化与协作流程。
4. 想系统理解 Agent 的共通原理时，从 Agent Guide 的前言和 Part 1 开始，按书籍型目录逐步深入。
5. 遇到问题时，按安装、登录、使用、工具接入与反馈路径排查。

Agent Guide 当前采用“前言 → Part 1–10 → 45 个章节 → 附录”的主目录。旧版 Agent 快速上手、案例和进阶页面仍保留为历史链接兼容入口，但不再作为主导航。

## 本地开发

需要 Node.js 22 和 pnpm。

```bash
pnpm install
pnpm run dev
```

构建静态站点：

```bash
pnpm run build
pnpm run preview
```

## 参与贡献

欢迎修正失效链接、过时内容和不准确表述，或补充可复现的教程、案例、问题排查与无障碍改进。提交前请阅读 [贡献指南](./CONTRIBUTING.md)，并避免提交密钥、个人数据或无权公开的资料。

产品功能、价格、可用范围、安全策略等时效性信息，请附可靠来源与核对日期。

## 许可证

本项目采用 [MIT License](./LICENSE) 开源。上游项目和修改范围见 [NOTICE](./NOTICE)。
