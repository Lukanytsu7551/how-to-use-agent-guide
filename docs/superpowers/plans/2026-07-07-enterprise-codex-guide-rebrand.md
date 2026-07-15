# Enterprise Codex Guide Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the downloaded CodexGuide VuePress site into a compliant enterprise Codex tutorial site for `Lukanytsu7551/how-to-use-codex-`.

**Architecture:** Keep the existing VuePress static documentation architecture. Update branding, SEO, navigation, compliance docs, README, and deployment metadata while removing sponsor/community promotion surfaces.

**Tech Stack:** VuePress 2, `vuepress-theme-hope`, TypeScript config files, Markdown content, pnpm.

## Global Constraints

- Preserve the MIT license copyright notice: `Copyright (c) 2026 canghe`.
- Use repository URL: `https://github.com/Lukanytsu7551/how-to-use-codex-`.
- Use default site URL: `https://lukanytsu7551.github.io/how-to-use-codex-`.
- Do not keep original sponsor ads, WeChat group QR codes, original GitHub badges, or original CDN-hosted branding.
- Keep changes scoped to branding, compliance, deployment, and public presentation.

---

### Task 1: Branding And Compliance Copy

**Files:**
- Modify: `package.json`
- Modify: `README.md`
- Modify: `README_en.md`
- Create: `NOTICE`
- Modify: `PRODUCT.md`

**Interfaces:**
- Consumes: Existing package metadata and README structure.
- Produces: Public repository identity and compliance notice used by maintainers and readers.

- [ ] **Step 1: Add a content scan command**

Run:

```bash
rg -n "freestylefly|canghecode|苍何|赞助商|wechat|微信|codexguide\\.ai" README.md README_en.md package.json PRODUCT.md
```

Expected: Shows existing original operational references before editing.

- [ ] **Step 2: Replace README files with enterprise-oriented copy**

Write concise README files that name `How to Use Codex`, link to the private repository, describe local preview/build commands, and state that the project keeps the original MIT notice.

- [ ] **Step 3: Add NOTICE**

Create `NOTICE` with the original source, license, and summary of modifications.

- [ ] **Step 4: Verify scan improves**

Run:

```bash
rg -n "freestylefly|canghecode|苍何|赞助商|wechat|微信|codexguide\\.ai" README.md README_en.md package.json PRODUCT.md NOTICE
```

Expected: Only compliant source attribution in `NOTICE`, no promotional references in README or package metadata.

### Task 2: VuePress Site Metadata And Navigation

**Files:**
- Modify: `docs/.vuepress/config.ts`
- Modify: `docs/.vuepress/theme.ts`
- Modify: `docs/.vuepress/seo.ts`
- Modify: `docs/.vuepress/navbar.ts`
- Modify: `docs/.vuepress/sidebar/index.ts`
- Modify: `docs/.vuepress/client.ts`
- Modify: `docs/.vuepress/public/CNAME`
- Modify: `vercel.json`

**Interfaces:**
- Consumes: Existing VuePress theme configuration.
- Produces: Site-level title, URL, SEO metadata, navigation, and deployment settings.

- [ ] **Step 1: Update site constants**

Set site title to `How to Use Codex`, repository URL to `https://github.com/Lukanytsu7551/how-to-use-codex-`, and default site URL to `https://lukanytsu7551.github.io/how-to-use-codex-`.

- [ ] **Step 2: Remove sponsor and WeChat navigation**

Delete sponsor and WeChat entries from navbar and sidebar. Keep home, learning path, quick start, advanced, recipes, manual, and community/tutorial links.

- [ ] **Step 3: Replace original CDN assets with local assets**

Use `/logo.svg`, `/og.svg`, and `/images/home-hero-background.webp` instead of `https://cdn.canghecode.com/...`.

- [ ] **Step 4: Update deployment metadata**

Clear `docs/.vuepress/public/CNAME` unless a custom domain is provided, and remove sponsor redirects from `vercel.json`.

### Task 3: Homepage And Public Content Cleanup

**Files:**
- Modify: `docs/index.md`
- Modify: `docs/community/roadmap.md`
- Modify: `docs/community/tutorials.md`
- Modify: `docs/manual/02-credits.md`
- Delete: `docs/sponsors/00-index.md`

**Interfaces:**
- Consumes: Existing homepage and community pages.
- Produces: Public-facing enterprise tutorial home and cleaned content pages.

- [ ] **Step 1: Rewrite homepage frontmatter and community section**

Use `How to Use Codex` as hero text. Replace community QR section with contribution and governance links.

- [ ] **Step 2: Remove sponsor page**

Remove `docs/sponsors/00-index.md` and all navigation references to `/sponsors/`.

- [ ] **Step 3: Keep credits factual**

Ensure credits mention third-party tutorial sources where relevant, and add a compliance note pointing to `NOTICE`.

### Task 4: Static Asset And Text Reference Cleanup

**Files:**
- Delete: `assets/sponsors/*`
- Delete: `assets/wechat-codex-group.png`
- Delete: `docs/.vuepress/public/images/wechat-codex-group.png`
- Modify: `assets/banner.svg`
- Modify: `docs/.vuepress/public/logo.svg`
- Modify: `docs/.vuepress/public/og.svg`
- Modify: `docs/.vuepress/styles/index.scss`

**Interfaces:**
- Consumes: Existing images and CSS.
- Produces: Local brand assets and styles with no personal QR/sponsor dependency.

- [ ] **Step 1: Remove unused sponsor and QR assets**

Delete sponsor images and QR code images after removing page references.

- [ ] **Step 2: Replace visible brand text in SVG assets**

Change `CodexGuide` text inside SVG assets to `How to Use Codex` where feasible with direct SVG text edits.

- [ ] **Step 3: Remove CSS rules for sponsor and QR panels**

Delete or neutralize CSS selectors that only target sponsor grids or WeChat QR overlays.

### Task 5: Verification, Git, And Push

**Files:**
- Modify: Git repository metadata.

**Interfaces:**
- Consumes: Completed file changes and user GitHub credentials.
- Produces: Local git commit and attempted push to the private remote.

- [ ] **Step 1: Install dependencies if needed**

Run:

```bash
pnpm install
```

Expected: Dependencies installed or lockfile already satisfied.

- [ ] **Step 2: Build**

Run:

```bash
pnpm build
```

Expected: VuePress build exits 0 and writes `docs/.vuepress/dist`.

- [ ] **Step 3: Final original-reference scan**

Run:

```bash
rg -n "freestylefly|canghecode|苍何|赞助商|wechat|微信|codexguide\\.ai|/sponsors/" .
```

Expected: No public promotional references. Allowed matches are license/compliance notes or tutorial content source citations.

- [ ] **Step 4: Initialize and commit**

Run:

```bash
git init
git branch -M main
git add .
git commit -m "chore: rebrand codex tutorial site"
```

Expected: Commit succeeds.

- [ ] **Step 5: Add remote and push**

Run:

```bash
git remote add origin https://github.com/Lukanytsu7551/how-to-use-codex-.git
git push -u origin main
```

Expected: Push succeeds if local GitHub authentication has access to the private repository. If authentication fails, report the exact error and leave the committed local repository ready to push.
