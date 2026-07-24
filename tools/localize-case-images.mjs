import { readdir, readFile, mkdir, stat, writeFile } from "node:fs/promises";
import { basename, extname, join, relative } from "node:path";

const projectRoot = process.cwd();
const casesDir = join(projectRoot, "docs/workbuddy/case-library/cases");
const imageRoot = join(
  projectRoot,
  "docs/public/images/workbuddy-cases",
);
const imagePattern =
  /!\[([^\]]*)\]\((https:\/\/mmbiz\.qpic\.cn\/[^)\s]+)\)/g;
const concurrency = 8;

function caseNumber(fileName) {
  return Number(fileName.match(/\d+/)?.[0] ?? 0);
}

function imageExtension(url) {
  const parsed = new URL(url);
  const format = parsed.searchParams.get("wx_fmt")?.toLowerCase();

  if (format === "jpeg" || format === "jpg") return "jpg";
  if (format === "gif") return "gif";
  if (format === "webp") return "webp";
  if (format === "png") return "png";
  if (parsed.pathname.includes("_jpg/")) return "jpg";
  if (parsed.pathname.includes("_gif/")) return "gif";
  if (parsed.pathname.includes("_webp/")) return "webp";
  return "png";
}

async function fileExists(path) {
  try {
    return (await stat(path)).size > 0;
  } catch {
    return false;
  }
}

async function downloadImage(job) {
  if (await fileExists(job.outputPath)) {
    return { ...job, status: "existing" };
  }

  await mkdir(job.outputDir, { recursive: true });
  let lastError;

  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch(job.url, {
        headers: {
          Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
          Referer: "https://mp.weixin.qq.com/",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        },
        signal: AbortSignal.timeout(30_000),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const contentType = response.headers.get("content-type") ?? "";
      if (!contentType.startsWith("image/")) {
        throw new Error(`unexpected content type: ${contentType || "unknown"}`);
      }

      const data = Buffer.from(await response.arrayBuffer());
      if (data.length < 100) {
        throw new Error(`image payload is too small: ${data.length} bytes`);
      }

      await writeFile(job.outputPath, data);
      return { ...job, status: "downloaded", bytes: data.length };
    } catch (error) {
      lastError = error;
      if (attempt < 4) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 800));
      }
    }
  }

  return {
    ...job,
    status: "failed",
    error: lastError instanceof Error ? lastError.message : String(lastError),
  };
}

async function runPool(jobs) {
  const results = new Array(jobs.length);
  let cursor = 0;
  let completed = 0;

  async function worker() {
    while (cursor < jobs.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await downloadImage(jobs[index]);
      completed += 1;

      if (completed % 25 === 0 || completed === jobs.length) {
        console.log(`Processed ${completed}/${jobs.length} images`);
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, jobs.length) }, () => worker()),
  );
  return results;
}

const caseFiles = (await readdir(casesDir))
  .filter((fileName) => /^case-\d+\.md$/.test(fileName))
  .sort((a, b) => caseNumber(a) - caseNumber(b));

const documents = [];
const jobs = [];

for (const fileName of caseFiles) {
  const filePath = join(casesDir, fileName);
  const source = await readFile(filePath, "utf8");
  const matches = [...source.matchAll(imagePattern)];
  const caseId = basename(fileName, extname(fileName));
  const outputDir = join(imageRoot, caseId);

  documents.push({ filePath, source, matches });

  matches.forEach((match, index) => {
    const extension = imageExtension(match[2]);
    const outputPath = join(
      outputDir,
      `${String(index + 1).padStart(2, "0")}.${extension}`,
    );

    jobs.push({
      key: `${filePath}:${match.index}`,
      url: match[2],
      outputDir,
      outputPath,
      publicPath: `/images/workbuddy-cases/${caseId}/${basename(outputPath)}`,
    });
  });
}

if (jobs.length === 0) {
  console.log("No remote WeChat case images found.");
  process.exit(0);
}

console.log(
  `Localizing ${jobs.length} images from ${caseFiles.length} case files...`,
);
const results = await runPool(jobs);
const resultByKey = new Map(results.map((result) => [result.key, result]));

for (const document of documents) {
  const rewritten = document.source.replace(
    imagePattern,
    (fullMatch, alt, url, offset) => {
      const result = resultByKey.get(`${document.filePath}:${offset}`);
      if (!result || result.status === "failed") return fullMatch;
      return `![${alt}](${result.publicPath})`;
    },
  );

  if (rewritten !== document.source) {
    await writeFile(document.filePath, rewritten);
  }
}

const failed = results.filter((result) => result.status === "failed");
const downloaded = results.filter((result) => result.status === "downloaded");
const existing = results.filter((result) => result.status === "existing");
const totalBytes = downloaded.reduce(
  (sum, result) => sum + (result.bytes ?? 0),
  0,
);

console.log(
  [
    `Downloaded: ${downloaded.length}`,
    `Reused: ${existing.length}`,
    `Failed: ${failed.length}`,
    `New data: ${(totalBytes / 1024 / 1024).toFixed(1)} MB`,
  ].join(" | "),
);

if (failed.length > 0) {
  console.error("\nFailed images:");
  for (const result of failed) {
    console.error(
      `- ${relative(projectRoot, result.outputPath)}: ${result.error}`,
    );
  }
  process.exitCode = 1;
}
