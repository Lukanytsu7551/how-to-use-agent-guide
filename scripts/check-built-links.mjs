import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, extname, join, normalize, relative, resolve, sep } from "node:path";

const root = resolve(process.argv[2] ?? "docs/.vuepress/dist");
const base = process.argv[3] ?? "/how-to-use-agent-guide/";
const files = [];
const broken = [];

const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(file);
    } else if (file.endsWith(".html")) {
      files.push(file);
    }
  }
};

const existsForPathname = (pathname, currentFile) => {
  let target;

  if (pathname.startsWith(base)) {
    target = decodeURI(pathname.slice(base.length));
  } else if (pathname.startsWith("/")) {
    broken.push({ file: currentFile, url: pathname, reason: "root path outside base" });
    return true;
  } else {
    const currentRelDir = dirname(relative(root, currentFile));
    target = normalize(join(currentRelDir, decodeURI(pathname)));
  }

  if (target === "." || target === "") target = "index.html";
  if (target.endsWith(sep) || target.endsWith("/")) target = join(target, "index.html");
  if (!extname(target)) target += ".html";

  return existsSync(join(root, target));
};

walk(root);

for (const file of files) {
  const html = readFileSync(file, "utf8");
  const attrRe = /(?:href|src)="([^"]+)"/gu;
  let match;

  while ((match = attrRe.exec(html))) {
    const raw = match[1];
    if (/^(?:https?:|mailto:|tel:|javascript:|#|data:)/u.test(raw)) continue;

    const pathname = raw.split("#")[0].split("?")[0];
    if (!pathname) continue;

    const before = broken.length;
    const ok = existsForPathname(pathname, file);
    if (!ok && broken.length === before) {
      broken.push({ file, url: raw, reason: "missing target" });
    }
  }
}

console.log(`HTML files checked: ${files.length}`);
console.log(`Broken local href/src: ${broken.length}`);

for (const item of broken) {
  console.log(`${relative(root, item.file)}: ${item.url} (${item.reason})`);
}

if (broken.length) process.exit(1);
