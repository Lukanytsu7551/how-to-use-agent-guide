# Enterprise UI And Link Stability Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the site into an enterprise product documentation experience and prevent GitHub Pages internal 404s.

**Architecture:** Keep VuePress + Theme Hope. Change visual identity through `docs/.vuepress/styles/index.scss`, page composition through `docs/index.md`, metadata helpers through `docs/.vuepress/seo.ts`, and verification through reusable Node scripts in `scripts/`.

**Tech Stack:** VuePress, vuepress-theme-hope, TypeScript config files, SCSS, Node.js verification scripts, pnpm.

## Global Constraints

- The site is deployed under `/how-to-use-codex-/`.
- Internal links must not assume domain root.
- The visual direction is enterprise product documentation: deep ink text, quiet surfaces, restrained borders, indigo and teal accents.
- Avoid heavy decorative gradients or playful visual language.
- Before publishing, run `pnpm build`, local generated-site link scan, risky source-link scan, and a small online crawl.

---

### Task 1: Link Stability Regression Scripts

**Files:**
- Create: `scripts/check-built-links.mjs`
- Create: `scripts/check-source-links.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces: `pnpm check:links` command.
- Produces: `node scripts/check-built-links.mjs docs/.vuepress/dist /how-to-use-codex-/`.
- Produces: `node scripts/check-source-links.mjs docs`.

- [ ] **Step 1: Create the built-link checker**

Create `scripts/check-built-links.mjs` with code that:

```js
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { extname, join, normalize, relative, resolve, sep, dirname } from "node:path";

const root = resolve(process.argv[2] ?? "docs/.vuepress/dist");
const base = process.argv[3] ?? "/how-to-use-codex-/";
const files = [];
const broken = [];

const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (file.endsWith(".html")) files.push(file);
  }
};

const existsForPathname = (pathname, currentFile) => {
  let target;

  if (pathname.startsWith(base)) {
    target = decodeURI(pathname.slice(base.length));
  } else if (pathname.startsWith("/")) {
    broken.push({ file: currentFile, url: pathname, reason: "root path outside base" });
    return true;
  } else {
    const currentRelDir = dirname(relative(root, currentFile));
    target = normalize(join(currentRelDir, decodeURI(pathname)));
  }

  if (target === "." || target === "") target = "index.html";
  if (target.endsWith(sep) || target.endsWith("/")) target = join(target, "index.html");
  if (!extname(target)) target += ".html";

  return existsSync(join(root, target));
};

walk(root);

for (const file of files) {
  const html = readFileSync(file, "utf8");
  const attrRe = /(?:href|src)="([^"]+)"/gu;
  let match;

  while ((match = attrRe.exec(html))) {
    const raw = match[1];
    if (/^(?:https?:|mailto:|tel:|javascript:|#|data:)/u.test(raw)) continue;

    const pathname = raw.split("#")[0].split("?")[0];
    if (!pathname) continue;

    const before = broken.length;
    const ok = existsForPathname(pathname, file);
    if (!ok && broken.length === before) {
      broken.push({ file, url: raw, reason: "missing target" });
    }
  }
}

console.log(`HTML files checked: ${files.length}`);
console.log(`Broken local href/src: ${broken.length}`);

for (const item of broken) {
  console.log(`${relative(root, item.file)}: ${item.url} (${item.reason})`);
}

if (broken.length) process.exit(1);
```

- [ ] **Step 2: Create the source-link checker**

Create `scripts/check-source-links.mjs` with code that fails on root-based links in handwritten Markdown/HTML:

```js
import { readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const root = resolve(process.argv[2] ?? "docs");
const risky = [];
const extensions = new Set([".md", ".ts", ".vue", ".scss"]);

const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === ".vuepress" && file.includes(`${join("docs", ".vuepress", "dist")}`)) continue;
      walk(file);
      continue;
    }

    if (![...extensions].some((ext) => file.endsWith(ext))) continue;
    const source = readFileSync(file, "utf8");
    const patterns = [
      { label: "markdown root link", re: /\]\(\/(?!how-to-use-codex-|\/|#)/gu },
      { label: "html root href", re: /href="\/(?!how-to-use-codex-|\/|#)/gu },
    ];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.re.exec(source))) {
        const line = source.slice(0, match.index).split("\n").length;
        risky.push(`${relative(root, file)}:${line} ${pattern.label}`);
      }
    }
  }
};

walk(root);

console.log(`Risky source links: ${risky.length}`);
for (const item of risky) console.log(item);
if (risky.length) process.exit(1);
```

- [ ] **Step 3: Add package scripts**

Modify `package.json` scripts to include:

```json
"check:links": "node scripts/check-built-links.mjs docs/.vuepress/dist /how-to-use-codex-/ && node scripts/check-source-links.mjs docs"
```

- [ ] **Step 4: Verify scripts pass**

Run:

```bash
pnpm build
pnpm check:links
```

Expected: build succeeds, `Broken local href/src: 0`, `Risky source links: 0`.

- [ ] **Step 5: Commit**

```bash
git add package.json scripts/check-built-links.mjs scripts/check-source-links.mjs
git commit -m "test: add site link checks"
```

### Task 2: URL Helper Trailing Slash Fix

**Files:**
- Modify: `docs/.vuepress/seo.ts`

**Interfaces:**
- Consumes: `toSiteUrl(path: string): string`.
- Produces: project-root URLs that end in `/`.

- [ ] **Step 1: Update URL constants**

Change:

```ts
export const siteBase = "/how-to-use-codex-";
export const siteUrl = `${siteOrigin}${siteBase}`;
```

to:

```ts
export const siteBase = "/how-to-use-codex-/";
export const siteUrl = `${siteOrigin}${siteBase.slice(0, -1)}`;
```

- [ ] **Step 2: Update `toSiteUrl`**

Ensure root path preserves the slash:

```ts
export const toSiteUrl = (path: string): string => {
  const cleanPath = toCleanPath(path.startsWith("/") ? path : `/${path}`);

  return cleanPath === "/" ? `${siteUrl}/` : `${siteUrl}${cleanPath}`;
};
```

- [ ] **Step 3: Verify**

Run:

```bash
pnpm build
rg -n 'https://lukanytsu7551.github.io/how-to-use-codex-"|https://lukanytsu7551.github.io/how-to-use-codex\\\\"' docs/.vuepress/dist
pnpm check:links
```

Expected: build succeeds, `rg` finds no slashless project-root URL, link checks pass.

- [ ] **Step 4: Commit**

```bash
git add docs/.vuepress/seo.ts
git commit -m "fix: preserve project root trailing slash"
```

### Task 3: Enterprise Home Page Composition

**Files:**
- Modify: `docs/index.md`

**Interfaces:**
- Consumes: existing VuePress home frontmatter.
- Produces: home page sections using stable relative links.

- [ ] **Step 1: Replace frontmatter copy**

Use:

```yaml
---
home: true
icon: home
title: OpenAI Codex 企业级教程与实战指南
description: "How to Use Codex 是面向企业团队和个人开发者的 OpenAI Codex 教程，帮助你从第一次任务快速上手 Codex，并通过进阶教程与团队实践掌握实用技巧。"
pageClass: codex-home-page
heroImage: /logo.svg
heroText: How to Use Codex
tagline: 面向团队落地的 Codex App、CLI、权限治理与实战交付指南
actions:
  - text: 开始学习
    link: ./start/
    type: primary
  - text: 查看学习路线
    link: ./guide/
    type: default
  - text: 团队实践
    link: ./advanced/10-team-playbook.html
    type: default
---
```

- [ ] **Step 2: Replace home body**

Use sections with these class names and relative links:

```html
<div class="codex-home">
<section class="home-section home-overview">
  <div class="home-section-kicker">学习路径</div>
  <h2>从个人上手到团队落地</h2>
  <p>按入口、能力和场景组织教程，减少试错成本，把 Codex 使用经验沉淀成可复用流程。</p>
  <div class="home-core-layout">
    <a class="home-core-card home-core-card-primary" href="./start/">
      <span class="home-core-index">01</span>
      <strong>快速上手</strong>
      <span>完成安装、账号准备、桌面 App 入门和第一个可验证任务。</span>
      <em>适合第一次使用 Codex 的读者</em>
    </a>
    <a class="home-core-card" href="./advanced/">
      <span class="home-core-index">02</span>
      <strong>进阶教程</strong>
      <span>理解 AGENTS.md、Skills、Plugins、权限、Hooks、配置和线程管理。</span>
      <em>适合长期使用和团队推广</em>
    </a>
    <a class="home-core-card" href="./recipes/">
      <span class="home-core-index">03</span>
      <strong>实战案例</strong>
      <span>学习浏览器、PPT、Obsidian、Figma、CI 和远程排障等真实流程。</span>
      <em>适合寻找模板和复用方式</em>
    </a>
  </div>
</section>

<section class="home-section home-enterprise">
  <div class="home-section-kicker">企业关注点</div>
  <h2>把工具能力变成交付规范</h2>
  <div class="home-principle-grid">
    <a href="./advanced/04-permissions-security.html"><strong>权限治理</strong><span>明确文件、命令、网络和敏感信息边界。</span></a>
    <a href="./advanced/02-agents-md.html"><strong>项目规则</strong><span>用 AGENTS.md 固化团队约定、命令和验证方式。</span></a>
    <a href="./advanced/08-thread-management.html"><strong>任务管理</strong><span>用 thread、worktree 和 subagent 管理复杂任务。</span></a>
    <a href="./advanced/11-troubleshooting.html"><strong>排障手册</strong><span>沉淀登录、依赖、权限、执行失败的恢复路径。</span></a>
  </div>
</section>

<section class="home-section home-featured">
  <div class="home-section-kicker">推荐阅读</div>
  <h2>先读这几篇，建立稳定工作流</h2>
  <div class="home-gallery-frame">
    <div class="home-gallery-track">
      <a class="home-gallery-card" href="./start/06-first-task.html"><span>快速上手</span><strong>用 Codex 完成第一个任务</strong><em>从选择工作目录到验证结果，跑通最小闭环。</em></a>
      <a class="home-gallery-card" href="./start/07-task-design.html"><span>快速上手</span><strong>任务设计</strong><em>把目标、范围、上下文、禁止事项和验收方式写清楚。</em></a>
      <a class="home-gallery-card" href="./advanced/03-skills-plugins-mcp.html"><span>进阶教程</span><strong>Skills 和 Plugins</strong><em>把重复任务沉淀成专项流程和可复用能力。</em></a>
      <a class="home-gallery-card" href="./recipes/03-playwright-mcp.html"><span>实战案例</span><strong>让 Codex 操控浏览器</strong><em>用 Playwright MCP 完成点击、截图和网页验证。</em></a>
    </div>
  </div>
</section>

<section class="home-section home-community">
  <div class="home-community-copy">
    <div class="home-section-kicker">持续维护</div>
    <h2>建立可复用的 Codex 实践库</h2>
    <p>把成功任务沉淀成案例、规则、排障记录和验证清单，让经验变成下一次交付的起点。</p>
    <div class="home-action-row">
      <a class="home-primary-link" href="./community/roadmap.html">查看维护路线</a>
      <a href="./community/tutorials.html">阅读延伸教程</a>
      <a href="./manual/">查看参考手册</a>
    </div>
  </div>
  <div class="home-community-panel">
    <strong>企业落地重点</strong>
    <span>任务模板、AGENTS.md、权限策略、验证命令、复盘记录和参考来源。</span>
  </div>
</section>
</div>
```

- [ ] **Step 3: Verify links**

Run:

```bash
pnpm build
pnpm check:links
```

Expected: both pass.

- [ ] **Step 4: Commit**

```bash
git add docs/index.md
git commit -m "feat: refresh enterprise home page"
```

### Task 4: Enterprise Theme Styling

**Files:**
- Modify: `docs/.vuepress/styles/index.scss`

**Interfaces:**
- Consumes: Theme Hope classes and home page classes from Task 3.
- Produces: enterprise visual system with indigo/teal accents.

- [ ] **Step 1: Replace color tokens**

Update `:root` variables to:

```scss
:root {
  --theme-color: #2563eb;
  --vp-c-accent: #2563eb;
  --vp-c-accent-bg: #1d4ed8;
  --vp-c-accent-hover: #0f766e;
  --vp-c-accent-soft: rgb(37 99 235 / 10%);
  --codex-ink: #111827;
  --codex-muted: #526071;
  --codex-border: rgb(15 23 42 / 12%);
  --codex-surface: #ffffff;
  --codex-surface-soft: #f8fafc;
  --codex-teal: #0f766e;
  --codex-indigo: #2563eb;
}
```

Add dark tokens:

```scss
[data-theme="dark"] {
  --codex-ink: #f8fafc;
  --codex-muted: #a8b3c2;
  --codex-border: rgb(226 232 240 / 14%);
  --codex-surface: #0f172a;
  --codex-surface-soft: #111827;
}
```

- [ ] **Step 2: Update navbar, dropdown, sidebar, content, and home styles**

Keep class names stable. Use restrained surfaces:

```scss
.vp-navbar {
  border-bottom: 1px solid var(--codex-border);
  background: color-mix(in srgb, var(--vp-c-bg) 94%, transparent);
  backdrop-filter: blur(16px);
}

.vp-nav-item > .route-link,
.vp-dropdown-title,
.vp-dropdown-item .route-link,
.vp-sidebar-link {
  border-radius: 6px;
}

.vp-project-home .vp-hero-info-wrapper::before {
  background-image: url("/images/home-hero-background.webp");
  opacity: 0.18;
}

.vp-project-home .vp-hero-info-wrapper::after {
  background:
    linear-gradient(180deg, rgb(248 250 252 / 92%) 0%, rgb(248 250 252 / 78%) 56%, var(--vp-c-bg) 100%);
}

.home-core-layout,
.home-principle-grid,
.home-gallery-track {
  display: grid;
  gap: 1rem;
}

.home-core-layout {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.home-principle-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.home-core-card,
.home-principle-grid a,
.home-gallery-card,
.home-community-panel {
  border: 1px solid var(--codex-border);
  border-radius: 8px;
  background: var(--codex-surface);
  box-shadow: 0 12px 28px rgb(15 23 42 / 6%);
}

.home-core-card:hover,
.home-principle-grid a:hover,
.home-gallery-card:hover {
  border-color: color-mix(in srgb, var(--codex-indigo) 45%, var(--codex-border));
  transform: translateY(-2px);
}

@media (max-width: 900px) {
  .home-core-layout,
  .home-principle-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Verify no one-note palette**

Run:

```bash
rg -n '#0f766e|#0d9488|#14b8a6|teal|purple|orange|brown|espresso|beige|cream|sand|tan' docs/.vuepress/styles/index.scss
```

Expected: limited teal references only as accent, no dominant old green-only palette.

- [ ] **Step 4: Build and link-check**

Run:

```bash
pnpm build
pnpm check:links
```

Expected: both pass.

- [ ] **Step 5: Commit**

```bash
git add docs/.vuepress/styles/index.scss
git commit -m "style: apply enterprise documentation theme"
```

### Task 5: Publish And Online Verification

**Files:**
- No source changes expected.

**Interfaces:**
- Consumes: deploy key `~/.ssh/how-to-use-codex-upload`.
- Produces: GitHub Pages deployment from `main`.

- [ ] **Step 1: Final local verification**

Run:

```bash
pnpm build
pnpm check:links
```

Expected: both pass.

- [ ] **Step 2: Push**

Run:

```bash
KEY_PATH="$HOME/.ssh/how-to-use-codex-upload"
GIT_SSH_COMMAND="ssh -i '$KEY_PATH' -o HostName=ssh.github.com -o Port=443 -o StrictHostKeyChecking=accept-new -o IdentitiesOnly=yes" git push ssh://git@github.com/Lukanytsu7551/how-to-use-codex-.git main
```

Expected: remote `main` updates.

- [ ] **Step 3: Online crawl**

Run the existing Python online crawl from this plan's implementation notes, scoped to:

```text
https://lukanytsu7551.github.io/how-to-use-codex-/
```

Expected: no 404s and no internal links outside `/how-to-use-codex-/`.

- [ ] **Step 4: Report**

Report the latest commit hash, verification commands, and any remaining deployment/cache caveats.
