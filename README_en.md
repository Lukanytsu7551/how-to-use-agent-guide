# How to Use Codex

An enterprise-oriented Codex tutorial site for teams and individual developers. It covers Codex App, CLI, Cloud, IDE workflows, permission governance, team rules, automation, and practical examples.

[![License: MIT](https://img.shields.io/badge/License-MIT-f59e0b?style=flat-square)](./LICENSE)
[![Repository](https://img.shields.io/badge/GitHub-Lukanytsu7551%2Fhow--to--use--codex---111827?style=flat-square)](https://github.com/Lukanytsu7551/how-to-use-codex-)

## Website

Default publishing URL:

<https://lukanytsu7551.github.io/how-to-use-codex-/>

If a custom domain is added later, update `docs/.vuepress/seo.ts`, `docs/.vuepress/public/CNAME`, and the deployment provider settings.

## Purpose

This guide focuses on three questions:

- **How to start**: choose the right Codex entry point, complete setup, and run the first low-risk task.
- **How to deliver**: describe goals, context, validation, and boundaries so Codex can produce reviewable work.
- **How to govern**: turn successful usage into team rules, permission policies, templates, cases, and retrospectives.

## Who It Is For

- First-time Codex users.
- Developers bringing Codex into real repositories.
- Technical leads building team standards, permission boundaries, and delivery workflows.
- Knowledge workers using Codex for documents, research, slides, knowledge bases, and automation.

## Quick Links

| Module | Use It For |
| --- | --- |
| [Learning Path](./docs/guide/index.md) | Reading order from beginner use to team adoption |
| [Quick Start](./docs/start/00-index.md) | Desktop App, accounts, first task, and task loop |
| [CLI Installation](./docs/start/10-cli-installation.md) | Installing and signing in to Codex CLI locally |
| [Advanced](./docs/advanced/00-index.md) | CLI, IDE, Cloud, permissions, AGENTS.md, automation, and team practice |
| [Recipes](./docs/recipes/00-index.md) | Reusable task templates and retrospectives for real projects |
| [Manual](./docs/manual/00-index.md) | Official sources, update notes, and references |

## Local Preview

Requirements:

- Node.js 22.12+ and lower than 25
- pnpm 10.33.0

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Build the static site:

```bash
pnpm build
```

The build output is written to `docs/.vuepress/dist`.

## Deployment

GitHub Pages can publish the generated `docs/.vuepress/dist` directory. The current site configuration defaults to:

```text
https://lukanytsu7551.github.io/how-to-use-codex-/
```

If you use Vercel, Cloudflare Pages, or a custom domain, update the site URL, CNAME, and canonical configuration together.

## Compliance

This project is a modified version of CodexGuide under the MIT License. The MIT License requires preserving the original copyright notice. See [LICENSE](./LICENSE) and [NOTICE](./NOTICE).
