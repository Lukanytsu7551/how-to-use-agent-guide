import { navbar } from "vuepress-theme-hope";

const codexItems = [
  { text: "学习路线", icon: "map", link: "/codex/learning-path.html" },
  { text: "快速上手", icon: "rocket", link: "/start/" },
  { text: "进阶教程", icon: "book", link: "/advanced/" },
  { text: "实战案例", icon: "lightbulb", link: "/recipes/" },
  { text: "问题排查", icon: "debug", link: "/codex/troubleshooting.html" },
];

const workbuddyItems = [
  { text: "学习路线", icon: "map", link: "/workbuddy/learning-path.html" },
  { text: "快速上手", icon: "rocket", link: "/workbuddy/getting-started.html" },
  { text: "进阶教程", icon: "book", link: "/workbuddy/advanced.html" },
  { text: "实战案例", icon: "lightbulb", link: "/workbuddy/recipes.html" },
  { text: "问题排查", icon: "debug", link: "/workbuddy/troubleshooting.html" },
];

const manualItems = [
  { text: "精选资源", icon: "star", link: "/manual/resources.html" },
  { text: "近期 Codex 更新", icon: "time", link: "/manual/01-codex-updates.html" },
  { text: "近期 WorkBuddy 更新", icon: "time", link: "/manual/workbuddy-updates.html" },
  { text: "参考来源和致谢", icon: "heart", link: "/manual/02-credits.html" },
];

export default navbar([
  { text: "首页", icon: "home", link: "/" },
  {
    text: "Codex Guide",
    icon: "code",
    link: "/codex/",
    ariaLabel: "Codex Guide 导航",
    children: codexItems,
  },
  {
    text: "WorkBuddy Guide",
    icon: "briefcase",
    link: "/workbuddy/",
    ariaLabel: "WorkBuddy Guide 导航",
    children: workbuddyItems,
  },
  {
    text: "参考手册",
    icon: "book",
    link: "/manual/",
    ariaLabel: "参考手册导航",
    children: manualItems,
  },
]);
