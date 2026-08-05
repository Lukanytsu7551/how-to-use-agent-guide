import { defineConfig } from "vitepress";

import { siteSidebar } from "./sidebar";
import { configureMermaidMarkdown } from "./mermaid-markdown";

const siteUrl =
  process.env.VITEPRESS_SITE_URL ||
  "https://lukanytsu7551.github.io/how-to-use-agent-guide/";

export default defineConfig({
  lang: "zh-CN",
  title: "How to Use Agent",
  titleTemplate: ":title | How to Use Agent",
  description:
    "Codex、WorkBuddy 与 Agent 系统知识教程中心，帮助你选择合适的 Agent，并从概念、实践、进阶到问题排查建立可靠工作流。",
  base: "/how-to-use-agent-guide/",
  cleanUrls: true,
  lastUpdated: true,
  srcExclude: [
    "cases/**",
    "help/**",
    "plans/**",
    "reading-guide.md",
    "community/case-contributing.md",
    "community/contributing.md",
  ],
  sitemap: {
    hostname: siteUrl,
  },
  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/how-to-use-agent-guide/favicon.svg?v=3",
      },
    ],
    ["meta", { name: "theme-color", content: "#17352a" }],
    ["meta", { name: "author", content: "How to Use Agent Contributors" }],
    [
      "meta",
      {
        name: "keywords",
        content:
          "Codex,Codex 教程,WorkBuddy,WorkBuddy 教程,AI Agent,AI 助手,Skills,MCP,自动化",
      },
    ],
  ],
  markdown: {
    config: configureMermaidMarkdown,
    image: {
      lazyLoading: true,
    },
    theme: {
      light: "github-light",
      dark: "github-dark",
    },
  },
  themeConfig: {
    siteTitle: "How to Use Agent",
    nav: [
      { text: "首页", link: "/" },
      {
        text: "Codex Guide",
        items: [
          { text: "学习路线", link: "/codex/learning-path" },
          { text: "快速上手", link: "/start/" },
          { text: "实战案例", link: "/recipes/" },
          { text: "进阶教程", link: "/advanced/" },
          { text: "问题排查", link: "/codex/troubleshooting" },
          { text: "附录", link: "/codex/appendix" },
        ],
      },
      {
        text: "WorkBuddy Guide",
        items: [
          { text: "学习路线", link: "/workbuddy/learning-path" },
          { text: "快速上手", link: "/bluebook/%E7%AC%AC%E4%B8%80%E7%AF%87%20%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C%EF%BC%9A%E5%85%88%E6%8A%8A%20WorkBuddy%20%E7%94%A8%E8%B5%B7%E6%9D%A5/" },
          { text: "实战案例", link: "/bluebook/%E7%AC%AC%E4%BA%8C%E7%AF%87%20%E6%A1%88%E4%BE%8B%E7%AF%87%EF%BC%9A%E4%BB%8E%E4%B8%80%E9%A1%B9%E4%BB%BB%E5%8A%A1%E5%88%B0%E4%B8%80%E6%94%AF%20AI%20%E5%9B%A2%E9%98%9F/" },
          { text: "进阶教程", link: "/bluebook/%E7%AC%AC%E4%B8%89%E7%AF%87%20%E8%BF%9B%E9%98%B6%E7%AF%87%EF%BC%9A%E6%8A%8A%E6%A1%88%E4%BE%8B%E5%8F%98%E6%88%90%E8%87%AA%E5%B7%B1%E7%9A%84%E5%B7%A5%E4%BD%9C%E7%B3%BB%E7%BB%9F/" },
          { text: "问题排查", link: "/workbuddy/troubleshooting" },
          { text: "附录", link: "/bluebook/%E9%99%84%E5%BD%95/" },
        ],
      },
      {
        text: "Agent Guide",
        items: [
          { text: "Agent Guide 首页", link: "/agent/" },
          { text: "前言", link: "/agent/preface" },
          { text: "Part 1 概述", link: "/agent/part-01/" },
          { text: "Part 2 概述", link: "/agent/part-02/" },
          { text: "Part 3 概述", link: "/agent/part-03/" },
          { text: "Part 4 概述", link: "/agent/part-04/" },
          { text: "Part 5 概述", link: "/agent/part-05/" },
          { text: "Part 6 概述", link: "/agent/part-06/" },
          { text: "Part 7 概述", link: "/agent/part-07/" },
          { text: "Part 8 概述", link: "/agent/part-08/" },
          { text: "Part 9 概述", link: "/agent/part-09/" },
          { text: "Part 10 概述", link: "/agent/part-10/" },
          { text: "附录 A：术语表", link: "/agent/appendix-a" },
          { text: "附录 B：模式选择指南", link: "/agent/appendix-b" },
          { text: "附录 C：常见问题 FAQ", link: "/agent/appendix-c" },
        ],
      },
      {
        text: "参考手册",
        items: [
          { text: "精选资源", link: "/manual/resources" },
          { text: "近期 Codex 更新", link: "/manual/01-codex-updates" },
          { text: "近期 WorkBuddy 更新", link: "/manual/workbuddy-updates" },
          { text: "参考来源和致谢", link: "/manual/02-credits" },
        ],
      },
    ],
    sidebar: siteSidebar,
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/Lukanytsu7551/how-to-use-agent-guide",
      },
    ],
    search: {
      provider: "local",
    },
    outline: {
      level: [2, 3],
      label: "本页目录",
    },
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    lastUpdated: {
      text: "最后更新",
      formatOptions: {
        dateStyle: "medium",
        timeStyle: "short",
      },
    },
    editLink: {
      pattern:
        "https://github.com/Lukanytsu7551/how-to-use-agent-guide/edit/main/docs/:path",
      text: "在 GitHub 上改进此页",
    },
    footer: {
      message: "MIT Licensed | Modified for How to Use Agent",
      copyright: "Copyright © 2026 Lukanytsu7551",
    },
  },
});
