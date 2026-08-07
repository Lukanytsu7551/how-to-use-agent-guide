import { access, mkdir, rename, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const API_BASE = "https://aihot.virxact.com/api/v1";
const USER_AGENT =
  "how-to-use-agent-guide/1.0 (+https://github.com/Lukanytsu7551/how-to-use-agent-guide)";
const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(
  scriptDirectory,
  "../docs/.vitepress/data/aihot.json",
);

const requestJson = async (path, attempts = 3) => {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20_000);

    try {
      const response = await fetch(`${API_BASE}${path}`, {
        headers: {
          Accept: "application/json",
          "User-Agent": USER_AGENT,
        },
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`${path} returned HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      lastError = error;
      if (attempt < attempts) {
        await new Promise((resolveDelay) =>
          setTimeout(resolveDelay, attempt * 800),
        );
      }
    } finally {
      clearTimeout(timeout);
    }
  }

  throw lastError;
};

const readItems = async (mode, window) => {
  const items = [];
  let cursor = null;
  let page = null;

  for (let pageNumber = 0; pageNumber < 20; pageNumber += 1) {
    const query = new URLSearchParams({ mode, window, limit: "100" });
    if (cursor) query.set("cursor", cursor);

    const response = await requestJson(`/items?${query.toString()}`);
    items.push(...response.items);
    page = response.page;

    if (!page?.hasMore || !page.nextCursor) break;
    cursor = page.nextCursor;
  }

  return {
    items,
    page: {
      count: items.length,
      hasMore: Boolean(page?.hasMore),
      nextCursor: page?.nextCursor ?? null,
    },
  };
};

const outputExists = async () => {
  try {
    await access(outputPath);
    return true;
  } catch {
    return false;
  }
};

try {
  const [selected, all, hot, daily] = await Promise.all([
    readItems("selected", "7d"),
    readItems("all", "24h"),
    requestJson("/hot-topics"),
    requestJson("/dailies/latest"),
  ]);

  const payload = {
    schemaVersion: 1,
    syncedAt: new Date().toISOString(),
    selected,
    all,
    hot: {
      count: hot.count,
      items: hot.items,
    },
    daily: {
      report: daily.report,
    },
  };

  await mkdir(dirname(outputPath), { recursive: true });
  const temporaryPath = `${outputPath}.tmp`;
  await writeFile(temporaryPath, `${JSON.stringify(payload, null, 2)}\n`);
  await rename(temporaryPath, outputPath);

  console.log(
    `AI News synced: ${selected.items.length} selected, ${all.items.length} recent, ${hot.items.length} hot topics.`,
  );
} catch (error) {
  if (await outputExists()) {
    console.warn(
      `AI News sync failed; keeping the existing fallback data. ${error.message}`,
    );
  } else {
    throw error;
  }
}
