<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useData } from "vitepress";

const LEFT_SIDEBAR_KEY = "how-to-use-agent-guide:chapter-sidebar-collapsed";
const RIGHT_SIDEBAR_KEY = "how-to-use-agent-guide:outline-sidebar-collapsed";

const { frontmatter, page } = useData();
const chapterSidebarCollapsed = ref(false);
const outlineSidebarCollapsed = ref(false);

const isDocumentPage = computed(
  () =>
    !page.value.isNotFound &&
    frontmatter.value.layout !== "home" &&
    frontmatter.value.layout !== "page" &&
    frontmatter.value.layout !== false,
);

const applyState = () => {
  document.documentElement.classList.toggle(
    "agent-chapter-sidebar-collapsed",
    chapterSidebarCollapsed.value,
  );
  document.documentElement.classList.toggle(
    "agent-outline-sidebar-collapsed",
    outlineSidebarCollapsed.value,
  );
};

const toggleChapterSidebar = () => {
  chapterSidebarCollapsed.value = !chapterSidebarCollapsed.value;
};

const toggleOutlineSidebar = () => {
  outlineSidebarCollapsed.value = !outlineSidebarCollapsed.value;
};

onMounted(() => {
  chapterSidebarCollapsed.value = localStorage.getItem(LEFT_SIDEBAR_KEY) === "true";
  outlineSidebarCollapsed.value = localStorage.getItem(RIGHT_SIDEBAR_KEY) === "true";
  applyState();
});

watch(chapterSidebarCollapsed, (collapsed) => {
  localStorage.setItem(LEFT_SIDEBAR_KEY, String(collapsed));
  applyState();
});

watch(outlineSidebarCollapsed, (collapsed) => {
  localStorage.setItem(RIGHT_SIDEBAR_KEY, String(collapsed));
  applyState();
});
</script>

<template>
  <div v-if="isDocumentPage" class="agent-sidebar-toggles" aria-label="目录显示控制">
    <button
      class="agent-sidebar-toggle agent-sidebar-toggle--chapter"
      type="button"
      :aria-label="chapterSidebarCollapsed ? '展开章节目录' : '收起章节目录'"
      :aria-pressed="chapterSidebarCollapsed"
      :title="chapterSidebarCollapsed ? '展开章节目录' : '收起章节目录'"
      @click="toggleChapterSidebar"
    >
      <span
        class="vpi-chevron-left"
        :class="{ 'is-expanded': chapterSidebarCollapsed }"
        aria-hidden="true"
      />
    </button>

    <button
      class="agent-sidebar-toggle agent-sidebar-toggle--outline"
      type="button"
      :aria-label="outlineSidebarCollapsed ? '展开本页目录' : '收起本页目录'"
      :aria-pressed="outlineSidebarCollapsed"
      :title="outlineSidebarCollapsed ? '展开本页目录' : '收起本页目录'"
      @click="toggleOutlineSidebar"
    >
      <span
        class="vpi-chevron-right"
        :class="{ 'is-expanded': outlineSidebarCollapsed }"
        aria-hidden="true"
      />
    </button>
  </div>
</template>
