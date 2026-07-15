import { inject } from "@vercel/analytics";
import { defineClientConfig } from "vuepress/client";

import CodexIssueAssistant from "./components/CodexIssueAssistant.vue";

const analyticsHosts = new Set(["lukanytsu7551.github.io"]);
const siteBase = "/how-to-use-agent-guide/";

const withSiteBase = (path: string): string =>
  `${siteBase}${path.replace(/^\//u, "")}`;

const navbarDropdownLinks: Record<string, string> = {
  "Codex Guide 导航": withSiteBase("/codex/"),
  "WorkBuddy Guide 导航": withSiteBase("/workbuddy/"),
  参考手册导航: withSiteBase("/manual/"),
};

const legacySectionPaths: Record<string, string> = {
  "/guide": withSiteBase("/guide/"),
  "/guide.html": withSiteBase("/guide/"),
  "/start": withSiteBase("/start/"),
  "/start.html": withSiteBase("/start/"),
  "/advanced": withSiteBase("/advanced/"),
  "/advanced.html": withSiteBase("/advanced/"),
  "/recipes": withSiteBase("/recipes/"),
  "/recipes.html": withSiteBase("/recipes/"),
  "/troubleshooting": withSiteBase("/troubleshooting/"),
  "/troubleshooting.html": withSiteBase("/troubleshooting/"),
  "/manual": withSiteBase("/manual/"),
  "/manual.html": withSiteBase("/manual/"),
};

const normalizeLegacySectionPath = (): void => {
  const target = legacySectionPaths[window.location.pathname];

  if (!target) return;

  window.history.replaceState(
    window.history.state,
    "",
    `${target}${window.location.search}${window.location.hash}`,
  );
};

if (typeof window !== "undefined") {
  normalizeLegacySectionPath();
}

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("CodexIssueAssistant", CodexIssueAssistant);

    if (typeof window !== "undefined") {
      document.addEventListener("click", (event) => {
        if (event.detail === 0) return;

        const target = event.target as Element | null;
        if (target?.closest(".vp-dropdown")) return;

        const button = target?.closest<HTMLButtonElement>(".vp-dropdown-title");
        const link = button ? navbarDropdownLinks[button.getAttribute("aria-label") ?? ""] : null;

        if (link) window.location.assign(link);
      });
    }

    if (
      import.meta.env.PROD &&
      typeof window !== "undefined" &&
      analyticsHosts.has(window.location.hostname)
    ) {
      inject();
    }
  },
});
