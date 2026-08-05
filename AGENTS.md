# How to Use Agent

## Purpose

This repository is a VitePress tutorial center with three connected entrances:
Codex Guide, WorkBuddy Guide, and the book-style Agent Guide.

## Run and Validate

- Use Node.js 22 locally (`.nvmrc`) and pnpm 11.9.0.
- Install with `pnpm install`; develop with `pnpm run dev`.
- Validate with `pnpm run build`, `pnpm test`, and `git diff --check`.
- The site base is `/how-to-use-agent-guide/`; production is GitHub Pages.

## Source of Truth

- `package.json` and `pnpm-lock.yaml` define the package manager and scripts.
- `docs/.vitepress/config.mts` defines the site metadata and top navigation.
- `docs/.vitepress/sidebar.ts` defines the document navigation.
- The current Agent Guide is `docs/agent/index.md`, `preface.md`, `part-01/` through
  `part-10/`, and `appendix-*.md`.
- `docs/agent/start/`, `recipes/`, `advanced/`, `troubleshooting.md`, and
  `appendix.md` are historical compatibility routes; do not add new primary
  chapters there.

## Content and Attribution

- Keep Codex, WorkBuddy, and Agent Guide scopes distinct but visually coherent.
- Write reproducible, source-backed content with explicit limits and validation.
- Preserve upstream license and attribution notices in `LICENSE` and `NOTICE`.
- Do not copy private data, credentials, or unlicensed source material.

## Worktree Boundaries

- This is a mixed worktree. Stage intended files explicitly; never use `git add -A`
  for routine documentation work.
- `docs/plans/`, `artifacts/`, `design/`, `package-lock.json`, `scripts/`,
  `tools/`, and `FEISHU_TASK_SYSTEM.md` may contain local history or working
  material. Inspect and confirm before deleting; they are not automatically
  disposable.
- The local Agent Guide restructuring is not considered deployed until it is
  committed, pushed, and verified through the Pages workflow and live URL.
