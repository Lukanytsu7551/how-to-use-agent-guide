# How to Use Agent Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `subagent-driven-development` (recommended) or `executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the existing Codex-only documentation site into a navigable `How to Use Agent` foundation with a Codex Guide, a WorkBuddy Guide, and a shared reference manual.

**Architecture:** Keep the existing VuePress site and Codex tutorial files in place for this foundation release. Add semantic Guide landing routes that link to the existing Codex material, create a parallel WorkBuddy route hierarchy with source-attributed index pages, and make the shared shell data-driven through navigation, sidebar, SEO, and CSS theme tokens.

**Tech Stack:** VuePress 2, vuepress-theme-hope, TypeScript configuration, Markdown content, Sass, Node link-check scripts.

## Global Constraints

- Publish under `/how-to-use-agent-guide/`; every local absolute link must use this base.
- Use `How to Use Agent` as the global site name, not `How to Use Codex`.
- Codex is blue-violet (`#5B63E8`); WorkBuddy is mint-jade (`#00B982`); public reference content is neutral navy (`#073B5C`).
- The global navigation contains only `首页`, `Codex Guide`, `WorkBuddy Guide`, and `参考手册`.
- Both product Guide landing pages contain `学习路线`, `快速上手`, `进阶教程`, `实战案例`, and `问题排查`.
- Product-level issue pages organize content as `安装`, `登录`, `使用`, `工具接入`, and `反馈`.
- WorkBuddy source pages must link to `AlephAITech/WorkBuddyGuide`, `workbuddy.homes`, and its MIT license; do not copy unverified tutorial bodies.
- Preserve old Codex documentation routes in this release; do not bulk move existing tutorial files.
- Verification requires `pnpm build` and `pnpm check:links` before commit.

---

### Task 1: Make the site base and metadata describe the new product

**Files:**
- Modify: `package.json`
- Modify: `scripts/check-source-links.mjs`
- Modify: `docs/.vuepress/config.ts`
- Modify: `docs/.vuepress/seo.ts`
- Modify: `docs/.vuepress/theme.ts`

**Interfaces:**
- Consumes: existing `siteOrigin`, `siteBase`, `siteUrl`, and `toSiteUrl` exports from `docs/.vuepress/seo.ts`.
- Produces: a single `siteBase` of `/how-to-use-agent-guide/`, all build/link checks keyed to that base, and global `How to Use Agent` metadata.

- [ ] **Step 1: Write a failing base-path check**

Run:

```bash
node scripts/check-built-links.mjs docs/.vuepress/dist /how-to-use-agent-guide/
```

Expected: FAIL because existing generated URLs still use `/how-to-use-codex-/`.

- [ ] **Step 2: Update metadata and base configuration**

Set the package name to `how-to-use-agent-guide`; set the site base to `/how-to-use-agent-guide/`; update site title, description, author keywords, repository URL, copyright wording, search placeholder, JSON-LD name, Twitter/Open Graph labels, and canonical URLs to `How to Use Agent`.

- [ ] **Step 3: Update source-link checker**

Change the allowed absolute internal prefix in `scripts/check-source-links.mjs` from `/how-to-use-codex-/` to `/how-to-use-agent-guide/`.

- [ ] **Step 4: Run the base-path check again**

Run:

```bash
pnpm build && pnpm check:links
```

Expected: build succeeds and link checker reports `Broken local href/src: 0` and `Risky source links: 0`.

- [ ] **Step 5: Commit metadata foundation**

```bash
git add package.json scripts/check-source-links.mjs docs/.vuepress/config.ts docs/.vuepress/seo.ts docs/.vuepress/theme.ts
git commit -m "chore: rename site to how to use agent"
```

### Task 2: Add the route and content skeleton for both Guides and the public manual

**Files:**
- Create: `docs/codex/index.md`
- Create: `docs/codex/learning-path.md`
- Create: `docs/codex/troubleshooting.md`
- Create: `docs/workbuddy/index.md`
- Create: `docs/workbuddy/learning-path.md`
- Create: `docs/workbuddy/getting-started.md`
- Create: `docs/workbuddy/advanced.md`
- Create: `docs/workbuddy/recipes.md`
- Create: `docs/workbuddy/troubleshooting.md`
- Create: `docs/manual/resources.md`
- Create: `docs/manual/workbuddy-updates.md`
- Modify: `docs/manual/00-index.md`
- Modify: `docs/manual/02-credits.md`

**Interfaces:**
- Consumes: old Codex routes under `/guide/`, `/start/`, `/advanced/`, `/recipes/`, and `/troubleshooting/`.
- Produces: landing pages under `/codex/` and `/workbuddy/`, and public manual routes under `/manual/`.

- [ ] **Step 1: Write a failing route expectation**

Run:

```bash
test -f docs/codex/index.md && test -f docs/workbuddy/index.md && test -f docs/manual/workbuddy-updates.md
```

Expected: FAIL because the new route files do not yet exist.

- [ ] **Step 2: Create Codex Guide landing pages**

Create a Codex overview and learning-path page linking the five required areas to the existing Codex routes. Create a Codex troubleshooting page that exposes the five required issue categories and links to the existing troubleshooting index.

- [ ] **Step 3: Create WorkBuddy Guide landing pages**

Create a WorkBuddy overview plus learning-path, getting-started, advanced, recipes, and troubleshooting pages. Each page describes its intended learning stage, marks source material as under curation where needed, and links to the official WorkBuddy site and MIT-licensed WorkBuddyGuide source.

- [ ] **Step 4: Rebuild the public manual**

Create dedicated selected-resources and WorkBuddy-updates pages. Update the manual index to link exactly to selected resources, recent Codex updates, recent WorkBuddy updates, and sources/credits. Add a WorkBuddyGuide attribution entry in credits.

- [ ] **Step 5: Verify route skeleton**

Run:

```bash
pnpm build && pnpm check:links
```

Expected: all new landing pages render, and no internal link is broken.

- [ ] **Step 6: Commit route skeleton**

```bash
git add docs/codex docs/workbuddy docs/manual
git commit -m "feat: add dual product guide structure"
```

### Task 3: Replace global navigation and sidebar with product-aware navigation

**Files:**
- Modify: `docs/.vuepress/navbar.ts`
- Modify: `docs/.vuepress/navbar-source.ts`
- Modify: `docs/.vuepress/sidebar/index.ts`

**Interfaces:**
- Consumes: the routes created in Task 2.
- Produces: four-item global navigation and sidebars for `/codex/`, `/workbuddy/`, `/manual/`, while retaining sidebars for old Codex routes.

- [ ] **Step 1: Write a failing navigation-content expectation**

Run:

```bash
rg -n 'Codex Guide|WorkBuddy Guide|参考手册' docs/.vuepress/navbar.ts
```

Expected: FAIL because the existing navbar has standalone Codex topic items instead of the four top-level items.

- [ ] **Step 2: Implement the four global navigation entries**

Replace existing global topic entries with exact labels `首页`, `Codex Guide`, `WorkBuddy Guide`, and `参考手册`. Use product landing pages as direct links and only expose product subitems inside the product menus.

- [ ] **Step 3: Add matching product sidebars**

Add `/codex/` and `/workbuddy/` sidebar groups with the five required learning areas. Add the four public manual items. Keep old Codex route sidebars intact so old links remain readable.

- [ ] **Step 4: Verify navigation source and generated links**

Run:

```bash
pnpm build && pnpm check:links
```

Expected: no missing sidebar targets and no broken generated navigation links.

- [ ] **Step 5: Commit navigation**

```bash
git add docs/.vuepress/navbar.ts docs/.vuepress/navbar-source.ts docs/.vuepress/sidebar/index.ts
git commit -m "feat: add product guide navigation"
```

### Task 4: Rebuild the home page and shared visual tokens

**Files:**
- Modify: `docs/index.md`
- Modify: `docs/.vuepress/styles/index.scss`
- Modify: `docs/.vuepress/public/logo.svg`
- Modify: `docs/.vuepress/public/og.svg`

**Interfaces:**
- Consumes: `/codex/`, `/workbuddy/`, and `/manual/` routes.
- Produces: a product-selection homepage, reusable theme variables, product page theme modifiers, and updated branded logo/social image.

- [ ] **Step 1: Write a failing homepage-copy expectation**

Run:

```bash
rg -n '选择合适的 Agent，推进真实工作|Codex Guide|WorkBuddy Guide|从任务开始' docs/index.md
```

Expected: FAIL because the existing homepage is Codex-only.

- [ ] **Step 2: Replace homepage content**

Create the approved layout in Markdown/HTML: a product-choice hero, a four-item value strip, two product cards, task-first navigation, four-step learning path, update lists, and public manual links. Use precise internal routes rather than placeholder buttons.

- [ ] **Step 3: Implement shared and product visual tokens**

Replace Codex-only CSS variables with neutral base variables plus `--agent-codex-*`, `--agent-workbuddy-*`, and `--agent-manual-*`. Build the home layout as open bands and rails rather than generic nested cards. Add `.codex-guide-page` and `.workbuddy-guide-page` scoped styles so product title, buttons, active sidebar, and links inherit the correct theme.

- [ ] **Step 4: Update logo and social image**

Replace Codex-only visible branding in `logo.svg` and `og.svg` with a neutral two-product agent mark. Retain vector assets and use the same blue-violet and mint-jade colors used by the site.

- [ ] **Step 5: Verify rendered home page**

Run:

```bash
pnpm build && pnpm check:links
pnpm dev --host 127.0.0.1
```

Expected: site builds, local links pass, the home page loads at `/how-to-use-agent-guide/`, both product links navigate, and desktop/mobile layouts do not overflow.

- [ ] **Step 6: Commit visual foundation**

```bash
git add docs/index.md docs/.vuepress/styles/index.scss docs/.vuepress/public/logo.svg docs/.vuepress/public/og.svg
git commit -m "feat: redesign agent guide home"
```

### Task 5: Run full verification and publish

**Files:**
- Verify: `docs/.vuepress/dist/`
- Verify: all files changed in Tasks 1 through 4

**Interfaces:**
- Consumes: the new base, route skeleton, navigation, and visual layout.
- Produces: a pushed `main` branch with the initial How to Use Agent site foundation.

- [ ] **Step 1: Run static verification**

Run:

```bash
git diff --check
pnpm build
pnpm check:links
```

Expected: all commands exit 0; generated link checker reports zero broken local URLs and zero risky source links.

- [ ] **Step 2: Run rendered verification**

Use the local dev server and Browser plugin if available; otherwise document that the Browser plugin is unavailable and use the project’s available browser/screenshot method. Check home desktop and mobile, product page desktop/mobile, global navigation, and at least one product-page link.

- [ ] **Step 3: Commit any final fixes**

```bash
git add package.json scripts/check-source-links.mjs docs/index.md docs/codex docs/workbuddy docs/manual docs/.vuepress
git commit -m "fix: polish agent guide foundation"
```

- [ ] **Step 4: Push to the new private repository**

```bash
GIT_SSH_COMMAND='ssh -i "$HOME/.ssh/how-to-use-agent-guide-upload" -o HostName=ssh.github.com -o Port=443 -o StrictHostKeyChecking=accept-new -o IdentitiesOnly=yes' git push origin main
```
