import { existsSync, readFileSync, writeFileSync } from "node:fs";

import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";

import { getPageDescription, siteDescription, toSiteUrl } from "./seo.js";
import theme from "./theme.js";

const rewriteSitemapCleanUrlsPlugin = {
  name: "agent-guide-clean-sitemap-urls",
  onGenerated: (app) => {
    const sitemapPath = app.dir.dest("sitemap.xml");

    if (!existsSync(sitemapPath)) return;

    const sitemap = readFileSync(sitemapPath, "utf-8");
    const cleanedSitemap = sitemap.replace(
      /<loc>(https:\/\/lukanytsu7551\.github\.io\/how-to-use-agent-guide[^<]*)<\/loc>/gu,
      (_, url: string) => {
        const { pathname, search, hash } = new URL(url);

        return `<loc>${toSiteUrl(`${pathname}${search}${hash}`)}</loc>`;
      },
    );

    writeFileSync(sitemapPath, cleanedSitemap);
  },
};

export default defineUserConfig({
  base: "/how-to-use-agent-guide/",
  dest: "docs/.vuepress/dist",
  lang: "zh-CN",
  title: "How to Use Agent",
  description: siteDescription,

  head: [
    ["meta", { name: "robots", content: "index,follow,max-image-preview:large" }],
    ["meta", { name: "author", content: "Lukanytsu7551" }],
    [
      "meta",
      {
        name: "keywords",
        content:
          "How to Use Agent,Codex Guide,WorkBuddy Guide,AI Agent 教程,企业工作流,Agent 使用指南,AI 自动化,实战指南",
      },
    ],
    ["meta", { name: "theme-color", content: "#073b5c" }],
    ["meta", { name: "format-detection", content: "telephone=no" }],
    ["link", { rel: "icon", href: "/how-to-use-agent-guide/logo.svg", type: "image/svg+xml" }],
  ],

  plugins: [
    {
      name: "agent-guide-seo-defaults",
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
