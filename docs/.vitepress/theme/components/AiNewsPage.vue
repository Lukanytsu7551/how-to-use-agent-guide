<script setup lang="ts">
import { computed, ref } from "vue";
import fallbackData from "../../data/aihot.json";

type NewsView = "selected" | "all" | "hot" | "daily";

interface NewsItem {
  id: string;
  title: string;
  summary: string | null;
  source: { name: string };
  publishedAt: string | null;
  discoveredAt: string;
  category: string | null;
  links: {
    aihot: string;
    original: string;
  };
}

interface HotTopic {
  id: string;
  rank: number;
  title: string;
  source: { name: string };
  links: {
    aihot: string;
    original: string;
    story?: string;
  };
  sourceCount: number;
  latestAt: string;
}

interface DailyItem {
  title: string;
  summary: string | null;
  source: { name: string };
  links: {
    aihot: string | null;
    original: string;
  };
}

interface DailyReport {
  date: string;
  title: string | null;
  lead: string | null;
  links: { aihot: string };
  sections: Array<{
    label: string;
    items: DailyItem[];
  }>;
  flashes: DailyItem[];
}

interface ItemsResponse {
  items: NewsItem[];
  page: {
    count: number;
    hasMore: boolean;
    nextCursor: string | null;
  };
}

interface NewsPayload {
  syncedAt: string | null;
  selected: ItemsResponse;
  all: ItemsResponse;
  hot: {
    count: number;
    items: HotTopic[];
  };
  daily: {
    report: DailyReport | null;
  };
}

const initialData = fallbackData as unknown as NewsPayload;

const activeView = ref<NewsView>("selected");
const selectedItems = ref<NewsItem[]>(initialData.selected.items);
const allItems = ref<NewsItem[]>(initialData.all.items);
const hotTopics = ref<HotTopic[]>(initialData.hot.items);
const dailyReport = ref<DailyReport | null>(initialData.daily.report);
const syncedAt = ref(initialData.syncedAt);
const searchQuery = ref("");
const selectedCategory = ref("all");

const categoryLabels: Record<string, string> = {
  all: "全部分类",
  "ai-models": "模型",
  "ai-products": "产品",
  industry: "行业",
  paper: "论文",
  tip: "技巧与观点",
};

const views: Array<{ id: NewsView; label: string; caption: string }> = [
  { id: "selected", label: "精选", caption: "最近 7 天" },
  { id: "all", label: "全部动态", caption: "过去 24 小时" },
  { id: "hot", label: "热点榜", caption: "当前趋势" },
  { id: "daily", label: "AI 日报", caption: "每日更新" },
];

const currentItems = computed(() =>
  activeView.value === "all" ? allItems.value : selectedItems.value,
);

const categoryOptions = computed(() => {
  const counts = new Map<string, number>();
  currentItems.value.forEach((item) => {
    if (item.category) {
      counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
    }
  });

  return Object.entries(categoryLabels)
    .filter(([slug]) => slug === "all" || counts.has(slug))
    .map(([slug, label]) => ({
      slug,
      label,
      count: slug === "all" ? currentItems.value.length : counts.get(slug) ?? 0,
    }));
});

const filteredItems = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  return currentItems.value.filter((item) => {
    const matchesCategory =
      selectedCategory.value === "all" ||
      item.category === selectedCategory.value;
    const searchable = [item.title, item.summary, item.source.name]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return matchesCategory && (!query || searchable.includes(query));
  });
});

const activeViewInfo = computed(
  () => views.find((view) => view.id === activeView.value) ?? views[0],
);

const formatDateTime = (value: string | null | undefined) => {
  if (!value) return "时间待补充";

  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value));
};

const formatSyncTime = computed(() => {
  if (!syncedAt.value) return "正在获取最新内容";
  return `同步于 ${formatDateTime(syncedAt.value)}`;
});

const categoryLabel = (category: string | null) =>
  category ? categoryLabels[category] ?? category : "综合";

const safeExternalLink = (
  value: string | null | undefined,
  fallback = "https://aihot.virxact.com",
) => {
  try {
    if (!value) return fallback;
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.toString()
      : fallback;
  } catch {
    return fallback;
  }
};

const safeAiHotLink = (value: string | null | undefined) => {
  const link = safeExternalLink(value);

  try {
    return new URL(link).hostname === "aihot.virxact.com"
      ? link
      : "https://aihot.virxact.com";
  } catch {
    return "https://aihot.virxact.com";
  }
};

const selectView = (view: NewsView) => {
  activeView.value = view;
  searchQuery.value = "";
  selectedCategory.value = "all";
};
</script>

<template>
  <main class="ai-news-page">
    <header class="ai-news-hero">
      <div class="ai-news-hero__copy">
        <p class="ai-news-eyebrow">LIVE AI INTELLIGENCE</p>
        <h1>AI News</h1>
        <p class="ai-news-hero__lead">
          集中阅读近期 AI 精选、行业热点与每日简报。内容随 AI HOT
          持续更新，在一个页面里完成筛选、判断和继续阅读。
        </p>
      </div>
      <div class="ai-news-hero__status" aria-live="polite">
        <span :class="{ 'is-live': syncedAt }"></span>
        <div>
          <strong>随站点发布同步</strong>
          <small>{{ formatSyncTime }}</small>
        </div>
      </div>
    </header>

    <nav class="ai-news-tabs" aria-label="AI News 内容分类">
      <button
        v-for="view in views"
        :key="view.id"
        type="button"
        :class="{ 'is-active': activeView === view.id }"
        :aria-current="activeView === view.id ? 'page' : undefined"
        @click="selectView(view.id)"
      >
        <span>{{ view.label }}</span>
        <small>{{ view.caption }}</small>
      </button>
    </nav>

    <section
      v-if="activeView === 'selected' || activeView === 'all'"
      class="ai-news-explorer"
      :aria-labelledby="`ai-news-${activeView}`"
    >
      <div class="ai-news-section-heading">
        <div>
          <p>{{ activeView === "selected" ? "EDITOR'S PICKS" : "LATEST SIGNALS" }}</p>
          <h2 :id="`ai-news-${activeView}`">{{ activeViewInfo.label }}</h2>
        </div>
        <strong>{{ filteredItems.length }} 条内容</strong>
      </div>

      <div class="ai-news-toolbar">
        <label class="ai-news-search">
          <span>搜索</span>
          <input
            v-model="searchQuery"
            type="search"
            placeholder="搜索标题、摘要或来源"
          />
        </label>
        <label>
          <span>分类</span>
          <select v-model="selectedCategory">
            <option
              v-for="option in categoryOptions"
              :key="option.slug"
              :value="option.slug"
            >
              {{ option.label }}（{{ option.count }}）
            </option>
          </select>
        </label>
      </div>

      <div v-if="filteredItems.length" class="ai-news-list">
        <article v-for="item in filteredItems" :key="item.id" class="ai-news-item">
          <div class="ai-news-item__meta">
            <span>{{ categoryLabel(item.category) }}</span>
            <time :datetime="item.publishedAt || item.discoveredAt">
              {{ formatDateTime(item.publishedAt || item.discoveredAt) }}
            </time>
            <small>{{ item.source.name }}</small>
          </div>
          <div class="ai-news-item__body">
            <h3>
              <a
                :href="safeAiHotLink(item.links.aihot)"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ item.title }}
              </a>
            </h3>
            <p v-if="item.summary">{{ item.summary }}</p>
          </div>
          <a
            class="ai-news-item__read"
            :href="safeAiHotLink(item.links.aihot)"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`阅读：${item.title}`"
          >
            <span>阅读</span>
            <b aria-hidden="true">↗</b>
          </a>
        </article>
      </div>

      <div v-else class="ai-news-empty">
        <strong>没有匹配的内容</strong>
        <p>换一个关键词或分类试试。</p>
      </div>

    </section>

    <section
      v-else-if="activeView === 'hot'"
      class="ai-news-explorer"
      aria-labelledby="ai-news-hot"
    >
      <div class="ai-news-section-heading">
        <div>
          <p>TRENDING NOW</p>
          <h2 id="ai-news-hot">热点榜</h2>
        </div>
        <strong>{{ hotTopics.length }} 个热点</strong>
      </div>

      <div class="ai-news-hot-list">
        <a
          v-for="topic in hotTopics"
          :key="topic.id"
          class="ai-news-hot-item"
          :href="safeAiHotLink(topic.links.story || topic.links.aihot)"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>{{ String(topic.rank).padStart(2, "0") }}</strong>
          <div>
            <h3>{{ topic.title }}</h3>
            <p>
              {{ topic.sourceCount }} 个来源 · 更新于
              {{ formatDateTime(topic.latestAt) }}
            </p>
          </div>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>

    <section
      v-else
      class="ai-news-explorer ai-news-daily"
      aria-labelledby="ai-news-daily"
    >
      <div class="ai-news-section-heading">
        <div>
          <p>DAILY BRIEFING</p>
          <h2 id="ai-news-daily">AI 日报</h2>
        </div>
        <a
          v-if="dailyReport"
          :href="safeAiHotLink(dailyReport.links.aihot)"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ dailyReport.date }} ↗
        </a>
      </div>

      <template v-if="dailyReport">
        <p v-if="dailyReport.lead" class="ai-news-daily__lead">
          {{ dailyReport.lead }}
        </p>
        <section
          v-for="section in dailyReport.sections"
          :key="section.label"
          class="ai-news-daily__section"
        >
          <h3>{{ section.label }}</h3>
          <div class="ai-news-daily__items">
            <article v-for="item in section.items" :key="item.title">
              <small>{{ item.source.name }}</small>
              <h4>
                <a
                  :href="item.links.aihot
                    ? safeAiHotLink(item.links.aihot)
                    : safeExternalLink(item.links.original)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ item.title }}
                </a>
              </h4>
              <p v-if="item.summary">{{ item.summary }}</p>
            </article>
          </div>
        </section>
      </template>

      <div v-else class="ai-news-empty">
        <strong>今日日报暂未生成</strong>
        <p>可以先查看精选和热点榜，日报生成后会自动出现。</p>
      </div>
    </section>

    <footer class="ai-news-source">
      <div>
        <strong>数据来源：AI HOT</strong>
        <p>本站同步公开 API 提供的标题、摘要、时间与链接，内容权利归原作者所有。</p>
      </div>
      <a
        href="https://aihot.virxact.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        访问 AI HOT ↗
      </a>
    </footer>
  </main>
</template>

<style scoped>
.ai-news-page {
  --news-accent: #a8c477;
  width: min(1320px, calc(100% - 48px));
  margin: 0 auto;
  padding: 28px 0 80px;
  color: var(--wb-ink);
}

.ai-news-hero {
  display: grid;
  min-height: 350px;
  grid-template-columns: minmax(0, 1fr) 260px;
  align-items: end;
  gap: 48px;
  padding: 68px 72px 56px;
  border: 1px solid #314538;
  border-radius: 6px;
  background: #17352a;
  box-shadow: 8px 8px 0 color-mix(in srgb, var(--news-accent) 62%, transparent);
}

.ai-news-eyebrow,
.ai-news-section-heading p {
  margin: 0;
  color: #cce69d;
  font-family: var(--wb-pixel);
  font-size: 11px;
  line-height: 1.6;
  letter-spacing: 0;
}

.ai-news-hero h1 {
  margin: 18px 0 16px;
  color: #f4f7ef;
  font-size: clamp(58px, 7vw, 92px);
  font-weight: 850;
  line-height: 0.95;
  letter-spacing: 0;
}

.ai-news-hero__lead {
  max-width: 760px;
  margin: 0;
  color: #d4ddd2;
  font-size: 18px;
  line-height: 1.75;
}

.ai-news-hero__status {
  display: grid;
  grid-template-columns: 12px minmax(0, 1fr);
  gap: 14px;
  align-items: start;
  padding-top: 20px;
  border-top: 1px solid #4b6354;
}

.ai-news-hero__status > span {
  width: 10px;
  height: 10px;
  margin-top: 5px;
  border-radius: 50%;
  background: #8b998d;
}

.ai-news-hero__status > span.is-live {
  background: #c8e65a;
  box-shadow: 0 0 0 4px rgb(200 230 90 / 14%);
}

.ai-news-hero__status div {
  display: grid;
  gap: 4px;
}

.ai-news-hero__status strong {
  color: #f4f7ef;
  font-size: 14px;
}

.ai-news-hero__status small {
  color: #b8c6ba;
  font-size: 12px;
}

.ai-news-tabs {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin: 40px 0 64px;
  border: 1px solid var(--wb-line);
  background: var(--wb-surface);
}

.ai-news-tabs button {
  display: grid;
  min-height: 86px;
  gap: 5px;
  padding: 17px 22px;
  border: 0;
  border-right: 1px solid var(--wb-line);
  color: var(--wb-muted);
  background: transparent;
  cursor: pointer;
  text-align: left;
}

.ai-news-tabs button:last-child {
  border-right: 0;
}

.ai-news-tabs button:hover,
.ai-news-tabs button:focus-visible {
  background: var(--wb-acid-soft);
}

.ai-news-tabs button:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -4px;
}

.ai-news-tabs button.is-active {
  color: #f4f7ef;
  background: #213b30;
}

.ai-news-tabs span {
  font-size: 17px;
  font-weight: 800;
}

.ai-news-tabs small {
  color: inherit;
  font-size: 12px;
  opacity: 0.78;
}

.ai-news-explorer {
  display: grid;
  gap: 28px;
}

.ai-news-section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 22px;
  border-bottom: 1px solid var(--wb-line);
}

.ai-news-section-heading h2 {
  margin: 8px 0 0;
  color: var(--wb-ink);
  font-size: 34px;
  line-height: 1.2;
  letter-spacing: 0;
}

.ai-news-section-heading > strong,
.ai-news-section-heading > a {
  color: var(--wb-muted);
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
}

.ai-news-toolbar {
  display: grid;
  grid-template-columns: minmax(260px, 1fr) 240px;
  gap: 12px;
}

.ai-news-toolbar label {
  display: grid;
  gap: 7px;
  color: var(--wb-muted);
  font-size: 12px;
  font-weight: 700;
}

.ai-news-toolbar input,
.ai-news-toolbar select {
  width: 100%;
  height: 46px;
  padding: 0 14px;
  border: 1px solid var(--wb-line);
  border-radius: 3px;
  color: var(--wb-ink);
  background: var(--wb-surface);
  font: inherit;
  font-size: 14px;
}

.ai-news-toolbar input:focus,
.ai-news-toolbar select:focus {
  border-color: var(--vp-c-brand-1);
  outline: 2px solid color-mix(in srgb, var(--vp-c-brand-1) 20%, transparent);
  outline-offset: 1px;
}

.ai-news-list {
  border-top: 1px solid var(--wb-line);
}

.ai-news-item {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr) 72px;
  gap: 28px;
  align-items: start;
  padding: 30px 0;
  border-bottom: 1px solid var(--wb-line);
}

.ai-news-item__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 9px 12px;
  align-items: center;
}

.ai-news-item__meta span {
  padding: 4px 8px;
  border: 1px solid var(--wb-line);
  border-radius: 2px;
  color: var(--vp-c-brand-1);
  background: var(--wb-acid-soft);
  font-size: 11px;
  font-weight: 800;
}

.ai-news-item__meta time,
.ai-news-item__meta small {
  color: var(--wb-muted);
  font-size: 12px;
}

.ai-news-item__meta small {
  flex-basis: 100%;
  line-height: 1.45;
}

.ai-news-item__body h3 {
  margin: 0;
  font-size: 22px;
  line-height: 1.4;
  letter-spacing: 0;
}

.ai-news-item__body h3 a {
  color: var(--wb-ink);
  text-decoration: none;
}

.ai-news-item__body h3 a:hover {
  color: var(--vp-c-brand-1);
}

.ai-news-item__body p {
  display: -webkit-box;
  margin: 12px 0 0;
  overflow: hidden;
  color: var(--wb-muted);
  font-size: 15px;
  line-height: 1.7;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.ai-news-item__read {
  display: grid;
  gap: 5px;
  justify-items: end;
  color: var(--wb-muted);
  font-size: 12px;
  text-decoration: none;
}

.ai-news-item__read b {
  color: var(--wb-ink);
  font-size: 22px;
  font-weight: 500;
}

.ai-news-item__read:hover,
.ai-news-item__read:hover b {
  color: var(--vp-c-brand-1);
}

.ai-news-hot-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-top: 1px solid var(--wb-line);
  border-left: 1px solid var(--wb-line);
}

.ai-news-hot-item {
  display: grid;
  min-height: 160px;
  grid-template-columns: 54px minmax(0, 1fr) 22px;
  gap: 18px;
  align-items: start;
  padding: 28px;
  border-right: 1px solid var(--wb-line);
  border-bottom: 1px solid var(--wb-line);
  color: var(--wb-ink);
  background: var(--wb-surface);
  text-decoration: none;
}

.ai-news-hot-item:hover {
  background: var(--wb-acid-soft);
}

.ai-news-hot-item > strong {
  color: var(--vp-c-brand-1);
  font-family: var(--wb-pixel);
  font-size: 20px;
}

.ai-news-hot-item h3 {
  margin: 0;
  font-size: 18px;
  line-height: 1.45;
  letter-spacing: 0;
}

.ai-news-hot-item p {
  margin: 12px 0 0;
  color: var(--wb-muted);
  font-size: 12px;
}

.ai-news-hot-item > span {
  color: var(--wb-muted);
  font-size: 18px;
}

.ai-news-daily__lead {
  max-width: 820px;
  margin: 0;
  color: var(--wb-muted);
  font-size: 17px;
  line-height: 1.75;
}

.ai-news-daily__section {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 28px;
  padding-top: 28px;
  border-top: 1px solid var(--wb-line);
}

.ai-news-daily__section > h3 {
  margin: 0;
  color: var(--wb-ink);
  font-size: 18px;
  letter-spacing: 0;
}

.ai-news-daily__items {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  background: var(--wb-line);
}

.ai-news-daily__items article {
  min-height: 220px;
  padding: 24px;
  background: var(--wb-surface);
}

.ai-news-daily__items small {
  color: var(--wb-muted);
  font-size: 11px;
}

.ai-news-daily__items h4 {
  margin: 14px 0 0;
  font-size: 18px;
  line-height: 1.45;
  letter-spacing: 0;
}

.ai-news-daily__items h4 a {
  color: var(--wb-ink);
  text-decoration: none;
}

.ai-news-daily__items h4 a:hover {
  color: var(--vp-c-brand-1);
}

.ai-news-daily__items p {
  margin: 12px 0 0;
  color: var(--wb-muted);
  font-size: 14px;
  line-height: 1.65;
}

.ai-news-empty {
  padding: 56px 24px;
  border: 1px solid var(--wb-line);
  background: var(--wb-surface);
  text-align: center;
}

.ai-news-empty strong {
  font-size: 18px;
}

.ai-news-empty p {
  margin: 8px 0 0;
  color: var(--wb-muted);
}

.ai-news-source {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  margin-top: 72px;
  padding: 28px 32px;
  border: 1px solid var(--wb-line);
  background: var(--wb-acid-soft);
}

.ai-news-source strong {
  color: var(--wb-ink);
  font-size: 14px;
}

.ai-news-source p {
  margin: 5px 0 0;
  color: var(--wb-muted);
  font-size: 12px;
}

.ai-news-source a {
  flex: 0 0 auto;
  color: var(--vp-c-brand-1);
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
}

.dark .ai-news-hero {
  border-color: #526b5a;
  background: #183328;
  box-shadow: 8px 8px 0 rgb(168 196 119 / 24%);
}

.dark .ai-news-tabs button.is-active {
  background: #294638;
}

@media (max-width: 960px) {
  .ai-news-page {
    width: min(100% - 32px, 1320px);
  }

  .ai-news-hero {
    grid-template-columns: 1fr;
    gap: 34px;
    padding: 52px 42px;
  }

  .ai-news-tabs {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .ai-news-tabs button:nth-child(2) {
    border-right: 0;
  }

  .ai-news-tabs button:nth-child(-n + 2) {
    border-bottom: 1px solid var(--wb-line);
  }

  .ai-news-item {
    grid-template-columns: 150px minmax(0, 1fr) 52px;
    gap: 18px;
  }

  .ai-news-hot-list,
  .ai-news-daily__items {
    grid-template-columns: 1fr;
  }

  .ai-news-daily__section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .ai-news-page {
    width: min(100% - 24px, 1320px);
    padding-top: 16px;
  }

  .ai-news-hero {
    min-height: 0;
    padding: 40px 26px;
  }

  .ai-news-hero h1 {
    font-size: 54px;
  }

  .ai-news-hero__lead {
    font-size: 16px;
  }

  .ai-news-tabs {
    margin: 30px 0 48px;
  }

  .ai-news-tabs button {
    min-height: 76px;
    padding: 14px;
  }

  .ai-news-section-heading {
    align-items: start;
    flex-direction: column;
  }

  .ai-news-toolbar {
    grid-template-columns: 1fr;
  }

  .ai-news-item {
    grid-template-columns: 1fr auto;
    gap: 16px;
  }

  .ai-news-item__meta {
    grid-column: 1 / -1;
  }

  .ai-news-item__read span {
    display: none;
  }

  .ai-news-hot-item {
    grid-template-columns: 42px minmax(0, 1fr) 18px;
    padding: 22px 18px;
  }

  .ai-news-source {
    align-items: start;
    flex-direction: column;
    padding: 24px;
  }
}
</style>
