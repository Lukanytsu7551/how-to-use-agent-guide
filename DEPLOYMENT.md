# GitHub Pages 部署

本站采用 VitePress 静态构建，并通过 GitHub Actions 发布到 GitHub Pages。

## GitHub Pages 设置

在仓库的 **Settings → Pages** 中，将 Source 设置为 **GitHub Actions**。推送到 `main` 分支后，`.github/workflows/deploy-pages.yml` 会自动构建并发布站点。

本地按仓库 `.nvmrc` 使用 Node.js 22；GitHub Actions 当前显式使用 Node.js 24。两者都满足 `package.json` 的 `>=20 <25` 约束。依赖以 `pnpm-lock.yaml` 为准，GitHub Actions 构建时会使用 `pnpm install --frozen-lockfile` 安装。

## 本地使用同一套构建

```bash
pnpm install --frozen-lockfile
pnpm run build
pnpm run preview
```

## 自动部署行为

- 推送到 `main`：发布生产版本。
- 每次构建前：同步 AI HOT 公开数据，再发布 `AI News`。
- 构建输出是纯静态文件，不需要数据库或服务端密钥。
- `pnpm run news:sync` 会更新 `docs/.vitepress/data/aihot.json`；同步失败时保留上一次成功数据，避免发布空页面。
- 当前主目录是 `docs/agent/` 的 Agent Guide 书籍型结构；未列入主导航的历史页面仍会随构建生成，以兼容旧链接。

发布前建议运行：

```bash
pnpm run build
pnpm test
git diff --check
```

`docs/public/_headers` 会为带内容指纹的 `/assets/*` 设置一年不可变缓存，
并为社区图片、分享图和 favicon 设置一个月浏览器缓存。
