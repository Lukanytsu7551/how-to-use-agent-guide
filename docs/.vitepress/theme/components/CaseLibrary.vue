<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { withBase } from "vitepress";
import { data as caseItems } from "../../../workbuddy/case-library/cases.data";
import type {
  CaseDifficulty,
  CaseLibraryItem,
} from "../../../workbuddy/case-library/cases.data";

type ViewMode = "featured" | "all";

const CATEGORY_ORDER = [
  "办公协同与效率提升",
  "网站与应用开发",
  "内容创作与新媒体运营",
  "AI 能力扩展",
  "数据分析与可视化",
  "视频与图像生成",
  "金融投资与专业咨询",
  "知识管理与学习成长",
  "多 Agent 协作与团队",
];

const searchQuery = ref("");
const selectedCategory = ref("全部场景");
const selectedDifficulty = ref<CaseDifficulty | "全部难度">("全部难度");
const viewMode = ref<ViewMode>("featured");
const visibleCount = ref(18);

const normalizedQuery = computed(() => searchQuery.value.trim().toLowerCase());
const hasFilters = computed(
  () =>
    normalizedQuery.value.length > 0 ||
    selectedCategory.value !== "全部场景" ||
    selectedDifficulty.value !== "全部难度",
);

const categories = computed(() =>
  CATEGORY_ORDER.map((category) => ({
    name: category,
    count: caseItems.filter((item) => item.category === category).length,
  })).filter((category) => category.count > 0),
);

const filteredCases = computed(() => {
  const items = caseItems.filter((item) => {
    const searchable = [
      item.title,
      item.category,
      item.summary,
      ...item.capabilities,
    ]
      .join(" ")
      .toLowerCase();

    return (
      (!normalizedQuery.value || searchable.includes(normalizedQuery.value)) &&
      (selectedCategory.value === "全部场景" ||
        item.category === selectedCategory.value) &&
      (selectedDifficulty.value === "全部难度" ||
        item.difficulty === selectedDifficulty.value)
    );
  });

  if (viewMode.value === "featured" && !hasFilters.value) {
    return items.filter((item) => item.featured);
  }

  return items;
});

const visibleCases = computed(() =>
  filteredCases.value.slice(0, visibleCount.value),
);

const resultLabel = computed(() => {
  if (viewMode.value === "featured" && !hasFilters.value) {
    return `${filteredCases.value.length} 篇编辑精选`;
  }
  return `找到 ${filteredCases.value.length} 篇案例`;
});

const selectCategory = (category: string) => {
  selectedCategory.value = category;
  viewMode.value = "all";
};

const clearFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "全部场景";
  selectedDifficulty.value = "全部难度";
  viewMode.value = "all";
};

watch(
  [searchQuery, selectedCategory, selectedDifficulty, viewMode],
  () => {
    visibleCount.value = 18;
  },
);

const caseHref = (item: CaseLibraryItem) => withBase(item.url);
</script>

<template>
  <section class="case-library" aria-labelledby="case-library-title">
    <header class="case-library__hero">
      <p class="case-library__eyebrow">WORKBUDDY · REAL CASE LIBRARY</p>
      <h1 id="case-library-title">100 个案例，不用从第一篇开始。</h1>
      <p>
        先说清楚你想完成的任务，再从真实分享中找到接近的做法。现有 11
        篇核心教程继续负责系统学习，这里负责提供灵感、路径和可复用的任务参考。
      </p>
      <div class="case-library__summary" aria-label="案例库概览">
        <span><strong>{{ caseItems.length }}</strong>真实案例</span>
        <span><strong>{{ categories.length }}</strong>任务场景</span>
        <span><strong>3</strong>难度层级</span>
      </div>
    </header>

    <section class="case-library__start" aria-labelledby="case-start-title">
      <div class="case-library__section-heading">
        <div>
          <span>START WITH THE OUTCOME</span>
          <h2 id="case-start-title">你想让 WorkBuddy 完成什么？</h2>
        </div>
        <p>选择最接近的场景，只看与你当前任务有关的案例。</p>
      </div>
      <div class="case-library__category-grid">
        <button
          v-for="category in categories"
          :key="category.name"
          type="button"
          :class="{ 'is-active': selectedCategory === category.name }"
          @click="selectCategory(category.name)"
        >
          <span>{{ category.name }}</span>
          <strong>{{ String(category.count).padStart(2, "0") }}</strong>
        </button>
      </div>
    </section>

    <section class="case-library__explorer" aria-labelledby="case-explorer-title">
      <div class="case-library__section-heading">
        <div>
          <span>EXPLORE THE LIBRARY</span>
          <h2 id="case-explorer-title">找到适合现在的案例</h2>
        </div>
        <p>{{ resultLabel }}</p>
      </div>

      <div class="case-library__toolbar">
        <label class="case-library__search">
          <span>搜索案例</span>
          <input
            v-model="searchQuery"
            type="search"
            placeholder="搜索任务、产出或 Skill"
          />
        </label>
        <label>
          <span>任务场景</span>
          <select v-model="selectedCategory" @change="viewMode = 'all'">
            <option>全部场景</option>
            <option
              v-for="category in categories"
              :key="category.name"
              :value="category.name"
            >
              {{ category.name }}（{{ category.count }}）
            </option>
          </select>
        </label>
        <label>
          <span>难度</span>
          <select v-model="selectedDifficulty" @change="viewMode = 'all'">
            <option>全部难度</option>
            <option>入门</option>
            <option>进阶</option>
            <option>复杂</option>
          </select>
        </label>
      </div>

      <div class="case-library__tabs" role="tablist" aria-label="案例浏览模式">
        <button
          type="button"
          role="tab"
          :aria-selected="viewMode === 'featured'"
          :class="{ 'is-active': viewMode === 'featured' }"
          @click="viewMode = 'featured'"
        >
          编辑精选
        </button>
        <button
          type="button"
          role="tab"
          :aria-selected="viewMode === 'all'"
          :class="{ 'is-active': viewMode === 'all' }"
          @click="viewMode = 'all'"
        >
          全部案例
        </button>
        <button
          v-if="hasFilters"
          class="case-library__clear"
          type="button"
          @click="clearFilters"
        >
          清除筛选
        </button>
      </div>

      <div
        v-if="visibleCases.length"
        class="case-library__results"
        aria-live="polite"
      >
        <a
          v-for="item in visibleCases"
          :key="item.id"
          class="case-library__card"
          :href="caseHref(item)"
        >
          <div class="case-library__card-topline">
            <span>CASE {{ item.caseNumber }}</span>
            <em>{{ item.difficulty }}</em>
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.summary }}</p>
          <div class="case-library__card-meta">
            <span>{{ item.category }}</span>
            <span>{{ item.duration }}</span>
          </div>
          <div v-if="item.capabilities.length" class="case-library__capabilities">
            <span
              v-for="capability in item.capabilities"
              :key="capability"
            >
              {{ capability }}
            </span>
          </div>
          <strong class="case-library__read">查看完整案例 <span>→</span></strong>
        </a>
      </div>

      <div v-else class="case-library__empty">
        <strong>没有找到完全匹配的案例</strong>
        <p>尝试缩短关键词，或清除部分筛选条件。</p>
        <button type="button" @click="clearFilters">查看全部案例</button>
      </div>

      <button
        v-if="visibleCount < filteredCases.length"
        class="case-library__load-more"
        type="button"
        @click="visibleCount += 18"
      >
        再显示 {{ Math.min(18, filteredCases.length - visibleCount) }} 篇
      </button>
    </section>

    <footer class="case-library__notice">
      <strong>阅读提示</strong>
      <p>
        案例来源于真实使用分享，涉及的模型、接口、积分、平台能力和完成时间可能随版本变化。
        建议先核对当前环境，再把案例中的方法迁移到自己的任务中。
      </p>
    </footer>
  </section>
</template>

<style scoped>
.case-library {
  --case-accent: oklch(46% 0.095 158);
  --case-accent-soft: oklch(94% 0.025 153);
  display: grid;
  gap: 72px;
  color: var(--wb-ink);
}

.case-library__hero {
  position: relative;
  display: grid;
  gap: 24px;
  overflow: hidden;
  padding: 48px;
  border: 1px solid var(--wb-line);
  background: #17352a;
  color: #eef5ec;
}

.case-library__hero::after {
  position: absolute;
  right: -20px;
  bottom: -46px;
  color: oklch(82% 0.12 120 / 0.14);
  font-family: var(--wb-pixel);
  font-size: 180px;
  line-height: 1;
  content: "100";
}

.case-library__eyebrow,
.case-library__section-heading span {
  color: #cfe5a8;
  font-family: var(--wb-pixel);
  font-size: 11px;
  letter-spacing: 0;
}

.case-library__hero .case-library__eyebrow {
  color: #d7eba8 !important;
}

.case-library__hero h1 {
  position: relative;
  z-index: 1;
  max-width: 760px;
  margin: 0;
  color: #f4f7ef !important;
  font-size: clamp(40px, 5vw, 72px);
  line-height: 1.05;
  letter-spacing: 0;
}

.case-library__hero > p:not(.case-library__eyebrow) {
  position: relative;
  z-index: 1;
  max-width: 760px;
  margin: 0;
  color: #cbd8cd;
  font-size: 18px;
  line-height: 1.75;
}

.case-library__summary {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  width: fit-content;
  max-width: 660px;
  background: oklch(91% 0.02 150 / 0.18);
}

.case-library__summary span {
  display: flex;
  min-width: 150px;
  align-items: baseline;
  gap: 8px;
  padding: 15px 18px;
  background: #17352a;
  color: #cbd8cd;
  font-size: 13px;
}

.case-library__summary strong {
  color: #eff6d4;
  font-family: var(--wb-pixel);
  font-size: 20px;
}

.case-library__start,
.case-library__explorer {
  display: grid;
  gap: 28px;
}

.case-library__section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--wb-line);
}

.case-library__section-heading > div {
  display: grid;
  gap: 10px;
}

.case-library__section-heading span {
  color: var(--case-accent);
}

.case-library__section-heading h2 {
  margin: 0;
  font-size: 30px;
  line-height: 1.2;
  letter-spacing: 0;
}

.case-library__section-heading p {
  max-width: 360px;
  margin: 0;
  color: var(--wb-muted);
  text-align: right;
}

.case-library__category-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid var(--wb-line);
  border-left: 1px solid var(--wb-line);
}

.case-library__category-grid button {
  display: grid;
  min-height: 104px;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 16px;
  padding: 20px;
  border: 0;
  border-right: 1px solid var(--wb-line);
  border-bottom: 1px solid var(--wb-line);
  border-radius: 0;
  color: var(--wb-ink);
  background: var(--wb-surface);
  cursor: pointer;
  text-align: left;
  transition:
    color 160ms cubic-bezier(0.25, 1, 0.5, 1),
    background 160ms cubic-bezier(0.25, 1, 0.5, 1);
}

.case-library__category-grid button:hover,
.case-library__category-grid button.is-active {
  color: #eef5ec;
  background: #214c3c;
}

.case-library__category-grid button:focus-visible,
.case-library__tabs button:focus-visible,
.case-library__load-more:focus-visible,
.case-library__empty button:focus-visible {
  position: relative;
  z-index: 1;
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}

.case-library__category-grid span {
  font-weight: 680;
  line-height: 1.45;
}

.case-library__category-grid strong {
  color: var(--case-accent);
  font-family: var(--wb-pixel);
  font-size: 18px;
}

.case-library__category-grid button:hover strong,
.case-library__category-grid button.is-active strong {
  color: #cfe5a8;
}

.case-library__toolbar {
  display: grid;
  grid-template-columns: minmax(280px, 1.6fr) repeat(2, minmax(180px, 0.7fr));
  gap: 12px;
}

.case-library__toolbar label {
  display: grid;
  gap: 8px;
}

.case-library__toolbar label > span {
  color: var(--wb-muted);
  font-size: 12px;
  font-weight: 700;
}

.case-library__toolbar input,
.case-library__toolbar select {
  width: 100%;
  min-height: 46px;
  padding: 0 14px;
  border: 1px solid var(--wb-line);
  border-radius: 3px;
  color: var(--wb-ink);
  background: var(--wb-surface);
  font: inherit;
}

.case-library__toolbar input:focus,
.case-library__toolbar select:focus {
  border-color: var(--case-accent);
  outline: 2px solid color-mix(in oklab, var(--case-accent) 28%, transparent);
  outline-offset: 1px;
}

.case-library__toolbar input::placeholder {
  color: color-mix(in oklab, var(--wb-muted) 88%, var(--wb-surface));
}

.case-library__tabs {
  display: flex;
  align-items: center;
  gap: 4px;
  border-bottom: 1px solid var(--wb-line);
}

.case-library__tabs button {
  min-height: 44px;
  padding: 0 16px;
  border: 0;
  border-bottom: 3px solid transparent;
  color: var(--wb-muted);
  background: transparent;
  cursor: pointer;
  font-weight: 700;
}

.case-library__tabs button.is-active {
  border-bottom-color: var(--case-accent);
  color: var(--wb-ink);
}

.case-library__tabs .case-library__clear {
  margin-left: auto;
  color: var(--case-accent);
  font-weight: 650;
}

.case-library__results {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid var(--wb-line);
  border-left: 1px solid var(--wb-line);
}

.case-library__card {
  display: flex;
  min-width: 0;
  min-height: 360px;
  flex-direction: column;
  padding: 24px;
  border-right: 1px solid var(--wb-line);
  border-bottom: 1px solid var(--wb-line);
  color: var(--wb-ink);
  background: var(--wb-surface);
  text-decoration: none;
  transition:
    color 180ms cubic-bezier(0.25, 1, 0.5, 1),
    background 180ms cubic-bezier(0.25, 1, 0.5, 1),
    transform 180ms cubic-bezier(0.25, 1, 0.5, 1);
}

.case-library__card:hover {
  color: #eff6ef;
  background: #214c3c;
  transform: translateY(-3px);
}

.case-library__card:focus-visible {
  position: relative;
  z-index: 1;
  outline: 3px solid var(--vp-c-brand-1);
  outline-offset: -3px;
}

.case-library__card-topline {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: var(--case-accent);
  font-family: var(--wb-pixel);
  font-size: 10px;
}

.case-library__card-topline em {
  color: var(--wb-muted);
  font-family: var(--wb-body);
  font-style: normal;
  font-weight: 700;
}

.case-library__card:hover .case-library__card-topline,
.case-library__card:hover .case-library__card-topline em {
  color: #cfe5a8;
}

.case-library__card h3 {
  margin: 24px 0 14px;
  color: inherit;
  font-size: 21px;
  line-height: 1.35;
  letter-spacing: 0;
}

.case-library__card p {
  display: -webkit-box;
  overflow: hidden;
  margin: 0;
  color: var(--wb-muted);
  font-size: 14px;
  line-height: 1.75;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}

.case-library__card:hover p {
  color: #cbd8cd;
}

.case-library__card-meta,
.case-library__capabilities {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.case-library__card-meta {
  margin-top: 20px;
}

.case-library__card-meta span,
.case-library__capabilities span {
  padding: 4px 7px;
  border: 1px solid var(--wb-line);
  border-radius: 2px;
  color: var(--wb-muted);
  font-size: 11px;
}

.case-library__capabilities {
  margin-top: 8px;
}

.case-library__capabilities span {
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.case-library__card:hover :is(.case-library__card-meta span, .case-library__capabilities span) {
  border-color: #547363;
  color: #d9e5dc;
}

.case-library__read {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 24px;
  color: var(--case-accent);
  font-size: 13px;
}

.case-library__card:hover .case-library__read {
  color: #d8efa9;
}

.case-library__read span {
  font-size: 20px;
  transition: transform 160ms cubic-bezier(0.25, 1, 0.5, 1);
}

.case-library__card:hover .case-library__read span {
  transform: translateX(4px);
}

.case-library__load-more,
.case-library__empty button {
  justify-self: center;
  min-height: 46px;
  padding: 0 20px;
  border: 1px solid var(--wb-ink);
  border-radius: 3px;
  color: var(--wb-ink);
  background: transparent;
  cursor: pointer;
  font-weight: 720;
}

.case-library__load-more:hover,
.case-library__empty button:hover {
  color: #eff6ef;
  background: #214c3c;
}

.case-library__empty {
  display: grid;
  justify-items: center;
  gap: 10px;
  padding: 64px 24px;
  border: 1px solid var(--wb-line);
  text-align: center;
}

.case-library__empty strong {
  font-size: 20px;
}

.case-library__empty p {
  margin: 0 0 12px;
  color: var(--wb-muted);
}

.case-library__notice {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 24px;
  padding: 24px 0;
  border-top: 1px solid var(--wb-line);
  border-bottom: 1px solid var(--wb-line);
}

.case-library__notice strong {
  font-size: 14px;
}

.case-library__notice p {
  margin: 0;
  color: var(--wb-muted);
  font-size: 13px;
  line-height: 1.7;
}

.dark .case-library {
  --case-accent: oklch(76% 0.09 152);
  --case-accent-soft: oklch(24% 0.025 153);
}

.dark .case-library__hero {
  border-color: oklch(37% 0.03 153);
  background: #183126;
}

.dark .case-library__category-grid button:hover,
.dark .case-library__category-grid button.is-active,
.dark .case-library__card:hover,
.dark .case-library__load-more:hover,
.dark .case-library__empty button:hover {
  color: #eff6ef;
  background: #254737;
}

@media (max-width: 1100px) {
  .case-library__category-grid,
  .case-library__results {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .case-library {
    gap: 52px;
  }

  .case-library__hero {
    padding: 32px 24px;
  }

  .case-library__hero h1 {
    font-size: 40px;
  }

  .case-library__hero > p:not(.case-library__eyebrow) {
    font-size: 16px;
  }

  .case-library__section-heading {
    display: grid;
    align-items: start;
  }

  .case-library__section-heading p {
    text-align: left;
  }

  .case-library__category-grid,
  .case-library__results,
  .case-library__toolbar {
    grid-template-columns: 1fr;
  }

  .case-library__card {
    min-height: 320px;
  }

  .case-library__notice {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .case-library__card,
  .case-library__read span {
    transition-duration: 0.01ms;
  }
}
</style>
