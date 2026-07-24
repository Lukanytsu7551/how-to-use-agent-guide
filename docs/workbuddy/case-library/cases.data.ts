import { createContentLoader } from "vitepress";

export type CaseDifficulty = "入门" | "进阶" | "复杂";

export interface CaseLibraryItem {
  id: number;
  caseNumber: string;
  title: string;
  category: string;
  difficulty: CaseDifficulty;
  duration: string;
  summary: string;
  capabilities: string[];
  featured: boolean;
  url: string;
}

const FEATURED_CASES = new Set([
  12, 14, 15, 22, 25, 36, 49, 52, 59, 60, 71, 85, 91, 100,
]);

const CATEGORY_ALIASES: Record<string, string> = {
  "AI能力扩展": "AI 能力扩展",
  "AI 能力扩展": "AI 能力扩展",
  "多Agent协作与团队": "多 Agent 协作与团队",
  "多 Agent 协作与团队": "多 Agent 协作与团队",
};

const cleanInlineMarkdown = (value: string) =>
  value
    .replace(/!\[[^\]]*]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/[*_`>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const sectionBody = (source: string, heading: string) => {
  const lines = source.split(/\r?\n/);
  const start = lines.findIndex((line) => line.trim() === heading);
  if (start < 0) return "";

  const body: string[] = [];
  for (const line of lines.slice(start + 1)) {
    if (/^#{1,6}\s/.test(line)) break;
    if (!line.trim() && body.length === 0) continue;
    if (!line.trim() && body.length > 0) break;
    body.push(line);
  }

  return cleanInlineMarkdown(body.join(" "));
};

const extractCapabilities = (source: string) => {
  const section = source.match(
    /## 三、使用的 Skill\s+([\s\S]*?)(?=\n##\s|$)/,
  )?.[1];
  if (!section) return [];

  return Array.from(
    new Set(
      section
        .split(/\r?\n/)
        .filter((line) => /^\|.+\|$/.test(line))
        .map((line) => cleanInlineMarkdown(line.split("|")[1] || ""))
        .filter(
          (value) =>
            value &&
            value !== "Skill / 能力" &&
            !/^[-:]+$/.test(value),
        ),
    ),
  ).slice(0, 3);
};

const inferDifficulty = (
  title: string,
  category: string,
  source: string,
): CaseDifficulty => {
  const text = `${title} ${category} ${source.slice(0, 2200)}`;

  if (
    /多\s*Agent|专家团|流水线|自动化工作流|后台管理系统|竞品|系统原型|API|接口|部署上线/.test(
      text,
    )
  ) {
    return "复杂";
  }

  if (
    /文件夹|会议纪要|Excel|PPT|封面图|问卷|签到|清理|膳食|出行计划|提示词/.test(
      text,
    )
  ) {
    return "入门";
  }

  return "进阶";
};

const extractDuration = (title: string) => {
  const duration = title.match(/(\d+(?:\.\d+)?)\s*(秒|分钟|小时|天)/);
  if (duration) return `${duration[1]} ${duration[2]}`;
  if (title.includes("半天")) return "半天";
  return "按任务复杂度";
};

export default createContentLoader<CaseLibraryItem[]>(
  "workbuddy/case-library/cases/*.md",
  {
    includeSrc: true,
    transform(data) {
      return data
        .map(({ src = "", url }) => {
          const heading = src.match(
            /^#\s+Case\s+(\d+)\s*[｜|]\s*(.+)$/m,
          );
          const id = Number(heading?.[1] || 0);
          const title = cleanInlineMarkdown(heading?.[2] || "未命名案例");
          const rawCategory =
            src.match(/^>\s*分类：(.+)$/m)?.[1]?.trim() || "其他场景";
          const category = CATEGORY_ALIASES[rawCategory] || rawCategory;
          const taskSummary =
            sectionBody(src, "## 二、想要完成的任务") ||
            sectionBody(src, "## 一、场景描述");

          return {
            id,
            caseNumber: String(id).padStart(3, "0"),
            title,
            category,
            difficulty: inferDifficulty(title, category, src),
            duration: extractDuration(title),
            summary:
              taskSummary.length > 112
                ? `${taskSummary.slice(0, 109)}...`
                : taskSummary,
            capabilities: extractCapabilities(src),
            featured: FEATURED_CASES.has(id),
            url,
          };
        })
        .sort((a, b) => a.id - b.id);
    },
  },
);
