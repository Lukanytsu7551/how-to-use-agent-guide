<script setup lang="ts">
import { computed } from "vue";
import { useRoute, withBase } from "vitepress";

const route = useRoute();
const isCaseLibraryDetail = computed(() =>
  route.path.includes("/workbuddy/case-library/cases/case-"),
);
</script>

<template>
  <div v-if="isCaseLibraryDetail" class="case-library-context">
    <a :href="withBase('/workbuddy/case-library/')">← 返回 100 个真实案例库</a>
    <span>社区使用分享 · 能力与界面请以当前版本为准</span>
  </div>
</template>

<style scoped>
.case-library-context {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 36px;
  padding: 12px 0;
  border-top: 1px solid var(--wb-line);
  border-bottom: 1px solid var(--wb-line);
  color: var(--wb-muted);
  font-size: 12px;
}

.case-library-context a {
  color: var(--agent-workbuddy);
  font-weight: 720;
  text-decoration: none;
}

.case-library-context a:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

@media (max-width: 640px) {
  .case-library-context {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
