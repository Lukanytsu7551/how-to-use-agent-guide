import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import { getPageDescription, siteOgImage, siteOrigin, siteUrl, toSiteUrl } from "./seo.js";
import sidebar from "./sidebar/index.js";

const addMeta = (
  head: unknown[][],
  attribute: "name" | "property",
  name: string,
  content: string,
): void => {
  if (head.some(([tag, attrs]) => tag === "meta" && attrs?.[attribute] === name)) return;
  head.push(["meta", { [attribute]: name, content }]);
};

const isHomePage = (path: string): boolean => path === "/" || path === "/index.html";

export default hopeTheme({
  hostname: siteOrigin,
  logo: "/logo.svg",
  favicon: "/logo.svg",

  author: {
    name: "Lukanytsu7551",
    url: "https://github.com/Lukanytsu7551",
  },

  repo: "https://github.com/Lukanytsu7551/how-to-use-agent-guide",
  docsDir: "docs",

  navbar,
  sidebar,

  print: false,
  pure: true,
  focus: false,
  breadcrumb: true,
  displayFooter: true,
  footer: "MIT Licensed | How to Use Agent",
  pageInfo: ["Category", "Tag", "Date", "Original", "Word", "ReadingTime"],

  blog: false,

  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    gfm: true,
    mark: true,
    tasklist: true,
    tabs: true,
  },

  plugins: {
    copyCode: true,
    copyright: {
      author: "How to Use Agent",
      license: "MIT",
      triggerLength: 100,
      maxLength: 700,
      canonical: `${siteUrl}/`,
      global: true,
    },
    feed: {
      atom: true,
      json: true,
      rss: true,
    },
    seo: {
      fallBackImage: siteOgImage,
      canonical: (page) => toSiteUrl(page.path),
      ogp: (ogp, page) => ({
        ...ogp,
        "og:description": getPageDescription(page.path),
        "og:image": page.frontmatter.cover || page.frontmatter.banner ? ogp["og:image"] : siteOgImage,
        "og:image:alt": `${page.title} - How to Use Agent`,
        "og:locale": "zh_CN",
      }),
      jsonLd: (jsonLD, page) =>
        isHomePage(page.path)
          ? {
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${siteUrl}/#organization`,
                  name: "How to Use Agent",
                  url: toSiteUrl("/"),
                  logo: {
                    "@type": "ImageObject",
                    url: `${siteUrl}/logo.svg`,
                  },
                  sameAs: ["https://github.com/Lukanytsu7551/how-to-use-agent-guide"],
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  name: "How to Use Agent",
                  alternateName: ["Codex Guide", "WorkBuddy Guide", "Agent 使用指南"],
                  url: toSiteUrl("/"),
                  description: getPageDescription(page.path),
                  inLanguage: "zh-CN",
                  publisher: {
                    "@id": `${siteUrl}/#organization`,
                  },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: `${siteUrl}/?search={search_term_string}`,
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": ["LearningResource", "Course"],
                  "@id": `${siteUrl}/#agent-course`,
                  name: "How to Use Agent：Codex 与 WorkBuddy 企业级使用指南",
                  url: toSiteUrl("/"),
                  description: getPageDescription(page.path),
                  image: [siteOgImage],
                  inLanguage: "zh-CN",
                  educationalLevel: "Beginner to Intermediate",
                  teaches: [
                    "Codex 工作流",
                    "WorkBuddy 工作流",
                    "Agent 自动化",
                    "问题排查与团队实践",
                  ],
                  provider: {
                    "@id": `${siteUrl}/#organization`,
                  },
                },
              ],
            }
          : {
              ...jsonLD,
              description: getPageDescription(page.path),
              url: toSiteUrl(page.path),
              image: [siteOgImage],
              inLanguage: "zh-CN",
              isPartOf: {
                "@type": "WebSite",
                name: "How to Use Agent",
                url: toSiteUrl("/"),
              },
              publisher: {
                "@type": "Organization",
                name: "How to Use Agent",
                url: toSiteUrl("/"),
                logo: {
                  "@type": "ImageObject",
                  url: `${siteUrl}/logo.svg`,
                },
              },
            },
      customHead: (head, page) => {
        const description = getPageDescription(page.path);
        const title = `${page.title} | How to Use Agent`;

        addMeta(head, "name", "twitter:card", "summary_large_image");
        addMeta(head, "name", "twitter:title", title);
        addMeta(head, "name", "twitter:description", description);
        addMeta(head, "name", "twitter:image", siteOgImage);
        addMeta(head, "name", "twitter:image:alt", `${page.title} - How to Use Agent`);
      },
    },
    sitemap: {
      hostname: siteOrigin,
      changefreq: "weekly",
      excludePaths: ["/404.html", "/guide/", "/community/"],
    },
    slimsearch: {
      maxSuggestions: 10,
      locales: {
        "/": {
          placeholder: "搜索 How to Use Agent",
        },
      },
    },
  },
});
