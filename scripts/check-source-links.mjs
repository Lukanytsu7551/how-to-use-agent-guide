import { readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const root = resolve(process.argv[2] ?? "docs");
const risky = [];
const extensions = new Set([".md", ".ts", ".vue", ".scss"]);

const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "superpowers") continue;
      if (file.includes(join("docs", ".vuepress", "dist"))) continue;
      walk(file);
      continue;
    }

    if (![...extensions].some((ext) => file.endsWith(ext))) continue;

    const source = readFileSync(file, "utf8");
    const patterns = [
      { label: "markdown root link", re: /\]\(\/(?!how-to-use-codex-|\/|#)/gu },
      { label: "html root href", re: /href="\/(?!how-to-use-codex-|\/|#)/gu },
    ];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.re.exec(source))) {
        const line = source.slice(0, match.index).split("\n").length;
        risky.push(`${relative(root, file)}:${line} ${pattern.label}`);
      }
    }
  }
};

walk(root);

console.log(`Risky source links: ${risky.length}`);
for (const item of risky) console.log(item);

if (risky.length) process.exit(1);
