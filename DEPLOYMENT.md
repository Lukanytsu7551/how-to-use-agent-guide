# GitHub Pages 部署

本站采用 VitePress 静态构建，并通过 GitHub Actions 发布到 GitHub Pages。

## GitHub Pages 设置

在仓库的 **Settings → Pages** 中，将 Source 设置为 **GitHub Actions**。推送到 `main` 分支后，`.github/workflows/deploy-pages.yml` 会自动构建并发布站点。

仓库中的 `.nvmrc` 会声明 Node.js 22。依赖通过锁文件固定，GitHub Actions 构建时会使用 `pnpm install --frozen-lockfile` 安装。

## 本地使用同一套构建

```bash
npm ci
npm run docs:build
npm run docs:preview
```

## 自动部署行为

- 推送到 `main`：发布生产版本。
- 构建输出是纯静态文件，不需要数据库或服务端密钥。

`docs/public/_headers` 会为带内容指纹的 `/assets/*` 设置一年不可变缓存，
并为社区图片、分享图和 favicon 设置一个月浏览器缓存。
