# How to Use Codex

面向企业团队和个人开发者的 Codex 实践教程站，覆盖 Codex App、CLI、Cloud、IDE、权限治理、团队规则、自动化和真实工作流案例。

[![License: MIT](https://img.shields.io/badge/License-MIT-f59e0b?style=flat-square)](./LICENSE)
[![Repository](https://img.shields.io/badge/GitHub-Lukanytsu7551%2Fhow--to--use--codex---111827?style=flat-square)](https://github.com/Lukanytsu7551/how-to-use-codex-)

## 在线阅读

默认发布地址：

<https://lukanytsu7551.github.io/how-to-use-codex-/>

如果后续绑定自定义域名，只需要更新 `docs/.vuepress/seo.ts`、`docs/.vuepress/public/CNAME` 和部署平台配置。

## 内容定位

这个教程站关注三个问题：

- **如何开始**：选择适合自己的 Codex 入口，完成安装、登录、设置和第一个低风险任务。
- **如何交付**：把目标、上下文、验证方式和边界说清楚，让 Codex 产出可检查结果。
- **如何治理**：把个人经验沉淀成团队规则、权限策略、模板、案例和复盘流程。

## 适合谁

- 第一次使用 Codex 的学习者。
- 想把 Codex 接入真实项目的开发者。
- 需要沉淀团队规范、权限边界和交付流程的技术负责人。
- 希望把 Codex 用在文档、研究、PPT、知识库和自动化场景的知识工作者。

## 快速入口

| 模块 | 适合解决什么问题 |
| --- | --- |
| [学习路线](./docs/guide/index.md) | 从入门、进阶到团队化使用的阅读顺序 |
| [快速上手](./docs/start/00-index.md) | 桌面 App、账号、首个任务和任务闭环 |
| [CLI 安装与登录](./docs/start/10-cli-installation.md) | 在本地终端安装 Codex CLI 并完成登录 |
| [进阶教程](./docs/advanced/00-index.md) | CLI、IDE、Cloud、权限、AGENTS.md、自动化和团队实践 |
| [实战案例库](./docs/recipes/00-index.md) | 可复制到真实项目的任务模板和复盘结构 |
| [参考手册](./docs/manual/00-index.md) | OpenAI 官方资料、更新记录和参考来源 |

## 本地预览

环境要求：

- Node.js 22.12+，且低于 25
- pnpm 10.33.0

安装依赖：

```bash
pnpm install
```

启动开发服务：

```bash
pnpm dev
```

构建静态站点：

```bash
pnpm build
```

构建产物位于 `docs/.vuepress/dist`。

## 部署

推荐使用 GitHub Pages 发布 `docs/.vuepress/dist`。当前站点配置默认面向：

```text
https://lukanytsu7551.github.io/how-to-use-codex-/
```

如果使用 Vercel、Cloudflare Pages 或自定义域名，请同步更新站点 URL、CNAME 和 canonical 配置。

## 合规说明

本项目基于 MIT 许可的 CodexGuide 二次开发。MIT License 要求保留原始版权声明，相关说明见 [LICENSE](./LICENSE) 和 [NOTICE](./NOTICE)。
