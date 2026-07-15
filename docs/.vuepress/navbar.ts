import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { navbar } from "vuepress-theme-hope";

import {
  advancedItemsSource,
  manualItemsSource,
  recipeItemsSource,
  startItemsSource,
  type NavbarDocItem,
} from "./navbar-source.js";

const docsRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const markdownTitle = (file: string): string => {
  const content = readFileSync(resolve(docsRoot, file), "utf8");
  const match = content.match(/^#\s+(.+)$/m);

  if (!match) {
    throw new Error(`Missing H1 title in docs/${file}`);
  }

  return match[1].trim();
};

const pageLink = (file: string): string =>
  `/${file}`.replace(/00-index\.md$/, "").replace(/\.md$/, ".md");

const docItems = (items: NavbarDocItem[]) =>
  items.map((item) => ({
    text: markdownTitle(item.file),
    icon: item.icon,
    link: pageLink(item.file),
  }));

const startItems = docItems(startItemsSource);
const advancedItems = docItems(advancedItemsSource);
const recipeItems = docItems(recipeItemsSource);
const manualItems = docItems(manualItemsSource);

const moreItems = [
  { text: "快速上手", icon: "rocket", link: "/start/" },
  { text: "进阶教程", icon: "book", link: "/advanced/" },
  { text: "实战案例", icon: "lightbulb", link: "/recipes/" },
  { text: "问题排查", icon: "debug", link: "/troubleshooting/" },
  { text: "参考手册", icon: "gear", link: "/manual/" },
  { text: "社区优秀教程合集", icon: "book", link: "/community/tutorials.md" },
];

export default navbar([
  { text: "首页", icon: "home", link: "/" },
  { text: "学习路线", icon: "map", link: "/guide/" },
  {
    text: "快速上手",
    icon: "rocket",
    link: "/start/",
    ariaLabel: "快速上手导航",
    children: startItems,
  },
  {
    text: "进阶教程",
    icon: "book",
    link: "/advanced/",
    ariaLabel: "进阶教程导航",
    children: advancedItems,
  },
  {
    text: "实战案例",
    icon: "lightbulb",
    link: "/recipes/",
    ariaLabel: "实战案例导航",
    children: recipeItems,
  },
  {
    text: "问题排查",
    icon: "debug",
    link: "/troubleshooting/",
  },
  {
    text: "参考手册",
    icon: "gear",
    link: "/manual/",
    ariaLabel: "参考手册导航",
    children: manualItems,
  },
  {
    text: "更多",
    icon: "more",
    ariaLabel: "更多导航",
    children: moreItems,
  },
  {
    text: "社区教程",
    icon: "book",
    link: "/community/tutorials.md",
    ariaLabel: "社区优秀教程合集",
  },
]);
