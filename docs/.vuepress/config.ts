import { existsSync, readFileSync, writeFileSync } from "node:fs";

import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";

import { getPageDescription, siteDescription, toSiteUrl } from "./seo.js";
import theme from "./theme.js";

const rewriteSitemapCleanUrlsPlugin = {
  name: "codexguide-clean-sitemap-urls",
  onGenerated: (app) => {
    const sitemapPath = app.dir.dest("sitemap.xml");

    if (!existsSync(sitemapPath)) return;

    const sitemap = readFileSync(sitemapPath, "utf-8");
    const cleanedSitemap = sitemap.replace(
      /<loc>(https:\/\/codexguide\.ai[^<]*)<\/loc>/gu,
      (_, url: string) => {
        const { pathname, search, hash } = new URL(url);

        return `<loc>${toSiteUrl(`${pathname}${search}${hash}`)}</loc>`;
      },
    );

    writeFileSync(sitemapPath, cleanedSitemap);
  },
};

export default defineUserConfig({
  base: "/how-to-use-codex-/",
  dest: "docs/.vuepress/dist",
  lang: "zh-CN",
  title: "How to Use Codex",
  description: siteDescription,

  head: [
    ["meta", { name: "robots", content: "index,follow,max-image-preview:large" }],
    ["meta", { name: "author", content: "Lukanytsu7551" }],
    [
      "meta",
      {
        name: "keywords",
        content:
          "How to Use Codex,Codex 教程,Codex教程,OpenAI Codex 中文教程,Codex 使用教程,Codex CLI 教程,Codex App,AGENTS.md,AI 编程,AI Agent,企业工作流,实战指南",
      },
    ],
    ["meta", { name: "theme-color", content: "#0f766e" }],
    ["meta", { name: "format-detection", content: "telephone=no" }],
    ["link", { rel: "icon", href: "/how-to-use-codex-/logo.svg", type: "image/svg+xml" }],
  ],

  plugins: [
    {
      name: "codexguide-seo-defaults",
      extendsPage: (page) => {
        page.frontmatter.description = getPageDescription(page.path);
      },
    },
    rewriteSitemapCleanUrlsPlugin,
  ],

  bundler: viteBundler(),

  theme,

  pagePatterns: ["**/*.md", "!.vuepress", "!node_modules", "!superpowers/**/*.md"],

  shouldPrefetch: false,
  shouldPreload: false,
});
