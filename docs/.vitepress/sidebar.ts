import type { DefaultTheme } from "vitepress";

const item = (text: string, link: string): DefaultTheme.SidebarItem => ({
  text,
  link,
});

const bluebookPath = (...segments: string[]) =>
  `/bluebook/${segments.map(encodeURIComponent).join("/")}/`;

const bluebookVolume = (
  text: string,
  volume: string,
  chapters: Array<[label: string, chapter: string]>,
): DefaultTheme.SidebarItem => ({
  text,
  collapsed: false,
  items: [
    item("本篇导读", bluebookPath(volume)),
    ...chapters.map(([label, chapter]) => item(label, bluebookPath(volume, chapter))),
  ],
});

const bluebookCombinedVolume = (
  text: string,
  overview: string,
  chapters: Array<[volume: string, label: string, chapter: string]>,
): DefaultTheme.SidebarItem => ({
  text,
  collapsed: false,
  items: [
    item("本篇导读", bluebookPath(overview)),
    ...chapters.map(([volume, label, chapter]) => item(label, bluebookPath(volume, chapter))),
  ],
});

const guideModule = (
  text: string,
  overview: string,
  chapters: Array<[label: string, link: string]>,
): DefaultTheme.SidebarItem => ({
  text,
  collapsed: false,
  items: [item("本篇导读", overview), ...chapters.map(([label, link]) => item(label, link))],
});

const codexItems: DefaultTheme.SidebarItem[] = [
  item("学习路线", "/codex/learning-path"),
  guideModule("快速上手", "/start/", [
    ["01 / 认识 Codex", "/start/01-what-is-codex"],
    ["02 / 桌面 App 下载与安装", "/start/02-app-installation"],
    ["03 / 账号与订阅", "/start/03-account-plan"],
    ["04 / 连接第三方 API", "/start/04-third-party-api"],
    ["05 / 主界面与基础组成", "/start/05-app-overview"],
    ["06 / 完成第一个任务", "/start/06-first-task"],
    ["07 / 设计清晰任务", "/start/07-task-design"],
    ["08 / 执行与验证闭环", "/start/08-task-execution"],
    ["09 / 手机远程操控", "/start/09-mobile-control"],
    ["10 / 安装 Codex CLI", "/start/10-cli-installation"],
    ["11 / 运行 CLI", "/start/11-cli-first-run"],
    ["12 / CLI 选项与命令", "/start/12-cli-options"],
    ["13 / 在 VS Code 中使用", "/start/13-ide-vscode"],
    ["14 / 使用 Codex Cloud", "/start/14-cloud"],
  ]),
  guideModule("实战案例", "/recipes/", [
    ["01 / 一句话生成演示文稿", "/recipes/01-ppt-skill-walkthrough"],
    ["02 / AI 自动绘制架构图", "/recipes/02-drawio-mcp"],
    ["03 / 让 AI 操控浏览器", "/recipes/03-playwright-mcp"],
    ["04 / 用代码生成动画视频", "/recipes/04-hyperframes-animation"],
    ["05 / 在知识库中自动生成配图", "/recipes/05-obsidian-codex"],
    ["06 / 一句话处理飞书数据", "/recipes/06-feishu-cli-codex"],
    ["07 / 搭建 AI 知识库", "/recipes/07-llm-wiki-codex"],
    ["08 / 读懂设计稿", "/recipes/08-figma-mcp-codex"],
    ["09 / 打通知识空间", "/recipes/09-notion-mcp-codex"],
    ["10 / 网页一键发布到公网", "/recipes/10-dkfile-deploy-codex"],
    ["11 / 远程定位并修复 Bug", "/recipes/11-remote-bug-fix"],
    ["12 / 直接控制浏览器", "/recipes/12-chrome-browser-plugin"],
    ["13 / CI 失败自动修复", "/recipes/13-github-actions-ci-fix"],
    ["14 / 临床文献综述", "/recipes/14-clinical-literature-review"],
    ["15 / 用照片生成专属宠物", "/recipes/15-hatch-pet-photo"],
    ["16 / 手机远程操控", "/recipes/16-android-remote-control"],
    ["17 / 显示任务状态的桌面宠物", "/recipes/17-desktop-pet"],
  ]),
  guideModule("进阶教程", "/advanced/", [
    ["01 / 理解费用与上下文", "/advanced/01-cost-context"],
    ["02 / AGENTS.md", "/advanced/02-agents-md"],
    ["03 / Skills、Plugins 与 MCP", "/advanced/03-skills-plugins-mcp"],
    ["04 / 权限管理", "/advanced/04-permissions-security"],
    ["05 / 自动化", "/advanced/05-automation"],
    ["06 / Hooks", "/advanced/06-hooks"],
    ["07 / 沙盒与审批", "/advanced/07-sandbox-approvals"],
    ["08 / 自动线程管理", "/advanced/08-thread-management"],
    ["09 / 配置文件 config.toml", "/advanced/09-config-toml"],
    ["10 / 团队实践", "/advanced/10-team-playbook"],
    ["11 / 进阶排障手册", "/advanced/11-troubleshooting"],
  ]),
  {
    text: "问题排查",
    collapsed: false,
    items: [item("本篇导读", "/codex/troubleshooting")],
  },
  {
    text: "附录",
    collapsed: false,
    items: [item("本篇导读", "/codex/appendix")],
  },
];

const workbuddyItems: DefaultTheme.SidebarItem[] = [
  item("学习路线", "/workbuddy/learning-path"),
  bluebookVolume("快速上手", "第一篇 使用手册：先把 WorkBuddy 用起来", [
    ["01 / 初识 WorkBuddy", "第 1 章 初识 WorkBuddy"],
    ["02 / 下载、安装、登录与更新", "第 2 章 WorkBuddy的下载、安装、登录与更新"],
    ["03 / 主界面、任务与工作区", "第 3 章 WorkBuddy 的主界面、任务与工作区"],
    ["04 / 完成第一个 WorkBuddy 任务", "第 4 章 快速完成第一个 WorkBuddy 任务"],
    ["05 / 加载一个真正用得上的 Skill", "第 5 章 WorkBuddy加载一个真正用得上的 Skill"],
    ["06 / 专家和专家团", "第 6 章 WorkBuddy的专家和专家团"],
    ["07 / 使用连接器", "第 7 章 WorkBuddy 使用连接器"],
    ["08 / 接入小程序与 IM 助理", "第 8 章 WorkBuddy 接入小程序与 IM 助理"],
    ["09 / 接入外部 API", "第 9 章 如何接入外部 API"],
    ["10 / 自动化任务", "第 10 章 WorkBuddy 自动化任务"],
    ["扩展阅读 / 一章看懂 AI 工作系统", "课外阅读：一章看懂 AI 工作系统"],
  ]),
  bluebookVolume("实战案例", "第二篇 案例篇：从一项任务到一支 AI 团队", [
    ["01 / 办公三件套：Word、Excel、PPT", "第 11 章 办公三件套：Word、Excel、PPT"],
    ["02 / 从整理桌面文件这些小事做起", "第 12 章 从整理桌面文件这些小事做起"],
    ["03 / 远程控制你的电脑，不用发愁不在电脑前", "第 13 章 远程控制你的电脑，不用发愁不在电脑前"],
    ["04 / 生活助手的价值，是减少琐碎", "第 14 章 生活助手的价值，是减少琐碎"],
    ["05 / 资讯整合：把信息流变成每日通知", "第 15 章 资讯整合：把信息流变成每日通知"],
    ["06 / 收藏不是知识管理，能再次用起来才是", "第 16 章 收藏不是知识管理，能再次用起来才是"],
    ["07 / 会议结束不是终点，工作才刚刚开始", "第 17 章 会议结束不是终点，工作才刚刚开始"],
    ["08 / 把投资分析变成你的日常", "第 18 章 把投资分析变成你的日常"],
    ["09 / 一句话召唤 AI 视频团队", "第 19 章 一句话召唤 AI 视频团队"],
    ["10 / 自媒体不只是靠努力，而是一条增长闭环", "第 20 章 自媒体不只是靠努力，而是一条增长闭环"],
    ["11 / WorkBuddy也能做GEO专家", "第 21 章 WorkBuddy也能做GEO专家"],
  ]),
  bluebookCombinedVolume("进阶教程", "第三篇 进阶篇：把案例变成自己的工作系统", [
    ["第三篇 进阶篇：把案例变成自己的工作系统", "01 / 打造skill：将书和视频蒸馏为可执行 Skill", "第 22 章 打造skill：将书和视频蒸馏为可执行 Skill"],
    ["第三篇 进阶篇：把案例变成自己的工作系统", "02 / 其他用法补充：WorkBuddy 实操案例集", "第 23 章 其他用法补充：WorkBuddy 实操案例集"],
    ["第三篇 进阶篇：把案例变成自己的工作系统", "03 / 如何进行多 Agent 系统设计", "第 24 章 如何进行多 Agent 系统设计"],
    ["第三篇 进阶篇：把案例变成自己的工作系统", "04 / 自动化工作流的可靠性", "第 25 章 自动化工作流的可靠性"],
    ["第四篇 岗位与行业落地", "05 / 岗位路线图：不同岗位如何把 WorkBuddy 用深", "第 26 章 岗位路线图：不同岗位如何把 WorkBuddy 用深"],
    ["第四篇 岗位与行业落地", "06 / 行业路线图：从通用能力到行业工作流", "第 27 章 行业路线图：从通用能力到行业工作流"],
  ]),
  {
    text: "问题排查",
    collapsed: false,
    items: [item("本篇导读", "/workbuddy/troubleshooting")],
  },
  bluebookVolume("附录", "附录", [
    ["附录 A 常用指令模板", "附录 A 常用指令模板"],
    ["附录 B 场景速查表", "附录 B 场景速查表"],
  ]),
];

const manualItems: DefaultTheme.SidebarItem[] = [
  item("参考手册首页", "/manual/"),
  item("精选资源", "/manual/resources"),
  item("近期 Codex 更新", "/manual/01-codex-updates"),
  item("近期 WorkBuddy 更新", "/manual/workbuddy-updates"),
  item("参考来源和致谢", "/manual/02-credits"),
];

export const siteSidebar: DefaultTheme.Sidebar = {
  "/codex/": codexItems,
  "/start/": codexItems,
  "/advanced/": codexItems,
  "/recipes/": codexItems,
  "/troubleshooting/": codexItems,
  "/workbuddy/": workbuddyItems,
  "/bluebook/": workbuddyItems,
  "/manual/": manualItems,
};
