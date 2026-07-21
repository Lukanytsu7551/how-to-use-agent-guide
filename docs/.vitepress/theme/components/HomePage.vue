<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { withBase } from "vitepress";

import PixelIcon from "./PixelIcon.vue";
import PixelIconSprite from "./PixelIconSprite.vue";

type LearningModule = "start" | "advanced" | "recipes" | "troubleshooting";
type AgentName = "codex" | "workbuddy";
type TaskIntent = "engineering" | "office";

const selectedModule = ref<LearningModule | null>(null);
const selectedAgent = ref<AgentName>("codex");
const selectedIntent = ref<TaskIntent>("engineering");
const codexMark = withBase("/brand/codex-mark.png");
const workbuddyMark = withBase("/brand/workbuddy-mark.png");

const taskRecommendations: Record<
  TaskIntent,
  { agent: AgentName; label: string; summary: string; reason: string; href: string }
> = {
  engineering: {
    agent: "codex",
    label: "推荐从 Codex Guide 开始",
    summary: "代码、终端与工程任务",
    reason: "它更适合读项目、改代码、运行命令和处理复杂开发工作流。",
    href: "./codex/",
  },
  office: {
    agent: "workbuddy",
    label: "推荐从 WorkBuddy Guide 开始",
    summary: "办公、资料与桌面自动化",
    reason: "它更适合文档、数据、协作和日常办公任务的连续推进。",
    href: "./workbuddy/",
  },
};

const activeRecommendation = computed(() => taskRecommendations[selectedIntent.value]);

const moduleCopy: Record<LearningModule, { title: string; codex: string; workbuddy: string }> = {
  start: {
    title: "选择“快速上手”的学习产品",
    codex: "./start/",
    workbuddy: "./bluebook/%E7%AC%AC%E4%B8%80%E7%AF%87%20%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C%EF%BC%9A%E5%85%88%E6%8A%8A%20WorkBuddy%20%E7%94%A8%E8%B5%B7%E6%9D%A5/",
  },
  advanced: {
    title: "选择“进阶教程”的学习产品",
    codex: "./advanced/",
    workbuddy: "./bluebook/%E7%AC%AC%E4%B8%89%E7%AF%87%20%E8%BF%9B%E9%98%B6%E7%AF%87%EF%BC%9A%E6%8A%8A%E6%A1%88%E4%BE%8B%E5%8F%98%E6%88%90%E8%87%AA%E5%B7%B1%E7%9A%84%E5%B7%A5%E4%BD%9C%E7%B3%BB%E7%BB%9F/",
  },
  recipes: {
    title: "选择“实战案例”的学习产品",
    codex: "./recipes/",
    workbuddy: "./bluebook/%E7%AC%AC%E4%BA%8C%E7%AF%87%20%E6%A1%88%E4%BE%8B%E7%AF%87%EF%BC%9A%E4%BB%8E%E4%B8%80%E9%A1%B9%E4%BB%BB%E5%8A%A1%E5%88%B0%E4%B8%80%E6%94%AF%20AI%20%E5%9B%A2%E9%98%9F/",
  },
  troubleshooting: {
    title: "选择“问题排查”的产品",
    codex: "./codex/troubleshooting",
    workbuddy: "./workbuddy/troubleshooting",
  },
};

const openModuleChooser = (module: LearningModule) => {
  selectedModule.value = module;
};

const selectTask = (intent: TaskIntent) => {
  selectedIntent.value = intent;
  selectedAgent.value = taskRecommendations[intent].agent;
  localStorage.setItem("how-to-use-agent-guide:preferred-agent", selectedAgent.value);
};

const selectAgent = (agent: AgentName) => {
  selectedAgent.value = agent;
  localStorage.setItem("how-to-use-agent-guide:preferred-agent", agent);
};

onMounted(() => {
  const storedAgent = localStorage.getItem("how-to-use-agent-guide:preferred-agent");
  if (storedAgent === "codex" || storedAgent === "workbuddy") {
    selectedAgent.value = storedAgent;
    selectedIntent.value = storedAgent === "codex" ? "engineering" : "office";
  }
});
</script>

<template>
  <main class="wb-home agent-home">
    <PixelIconSprite />
    <section class="wb-hero agent-hero" aria-labelledby="agent-hero-title">
      <div class="wb-hero__stage agent-hero__stage">
        <div class="wb-hero__copy agent-hero__copy">
          <p class="wb-pixel-label">HOW TO USE AGENT · CODEX + WORKBUDDY</p>
          <h1 id="agent-hero-title">How to Use Agent</h1>
          <p class="wb-hero__summary">
            一个教你选择、使用并真正用好 Agent 的教程中心。这里整理 Codex 和
            WorkBuddy 的快速上手、进阶教程、实战案例与问题排查。先选适合自己的
            Agent，再沿着对应路径完成第一个真实任务。
          </p>
          <div class="wb-hero__actions">
            <a class="wb-button wb-button--primary" href="#agent-choice">
              <span>选择适合我的 Agent</span>
              <PixelIcon name="arrow-right" />
            </a>
            <a class="wb-button wb-button--outline" href="#agent-learning">查看学习路线</a>
          </div>
        </div>

        <div class="wb-hero__art im-hero__art" aria-label="从任务选择适合的 Agent">
          <div class="im-agent-console">
            <div class="im-agent-console__chrome" aria-hidden="true">
              <span></span><span></span><span></span>
              <b>agent-guide / choose</b>
            </div>
            <div class="im-agent-console__body">
              <p class="im-agent-console__eyebrow">START WITH THE TASK</p>
              <strong>你想把 Agent 用在什么地方？</strong>
              <div class="im-agent-console__choices" aria-label="选择任务场景">
                <button
                  type="button"
                  :class="{ 'is-selected': selectedIntent === 'engineering' }"
                  :aria-pressed="selectedIntent === 'engineering'"
                  @click="selectTask('engineering')"
                >
                  <img :src="codexMark" alt="Codex" />
                  <span><b>Codex Guide</b><small>代码、终端与工程任务</small></span>
                  <PixelIcon name="arrow-right" />
                </button>
                <button
                  type="button"
                  :class="{ 'is-selected': selectedIntent === 'office' }"
                  :aria-pressed="selectedIntent === 'office'"
                  @click="selectTask('office')"
                >
                  <img :src="workbuddyMark" alt="WorkBuddy" />
                  <span><b>WorkBuddy Guide</b><small>办公、资料与桌面自动化</small></span>
                  <PixelIcon name="arrow-right" />
                </button>
              </div>
              <a class="im-agent-console__prompt" :href="activeRecommendation.href">
                <span><b>{{ activeRecommendation.label }}</b><small>{{ activeRecommendation.reason }}</small></span>
                <PixelIcon name="arrow-right" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="wb-value-strip" aria-label="适合你的学习路径">
        <div class="wb-value-strip__item agent-learning-strip__title">
          <PixelIcon name="book" />
          <span><b>适合你的学习路径</b><small>LEARNING PATH</small></span>
        </div>
        <button class="wb-value-strip__item" type="button" @click="openModuleChooser('start')">
          <PixelIcon name="user" />
          <span><b>快速上手</b><small>GET STARTED</small></span>
        </button>
        <button class="wb-value-strip__item" type="button" @click="openModuleChooser('recipes')">
          <PixelIcon name="briefcase" />
          <span><b>实战案例</b><small>REAL CASES</small></span>
        </button>
        <button class="wb-value-strip__item" type="button" @click="openModuleChooser('advanced')">
          <PixelIcon name="sitemap" />
          <span><b>进阶教程</b><small>GO DEEPER</small></span>
        </button>
        <button class="wb-value-strip__item" type="button" @click="openModuleChooser('troubleshooting')">
          <PixelIcon name="check-box" />
          <span><b>问题排查</b><small>TROUBLESHOOT</small></span>
        </button>
      </div>
    </section>

    <section id="agent-choice" class="wb-section agent-choice" aria-labelledby="agent-choice-title">
      <div class="wb-section__heading">
        <div>
          <p class="wb-pixel-label">STEP 01 · CHOOSE YOUR AGENT</p>
          <h2 id="agent-choice-title">先选对工具，再开始学习。</h2>
        </div>
        <p>两种 Agent 的目标不同。根据工作任务、使用环境与执行方式，进入更合适的学习路径。</p>
      </div>
      <div class="agent-choice__grid">
        <a class="agent-choice__card agent-choice__card--codex" :class="{ 'is-recommended': selectedAgent === 'codex' }" href="./codex/" @click="selectAgent('codex')">
          <span class="agent-choice__tag">01 / CODEX GUIDE</span>
          <span class="agent-choice__recommendation">{{ selectedAgent === 'codex' ? '与你的任务匹配' : '代码与复杂开发' }}</span>
          <img class="agent-product-mark" :src="codexMark" alt="Codex" />
          <strong>面向代码与复杂开发</strong>
          <p>适合读项目、改代码、运行终端命令、工程重构和深度技术开发。</p>
          <em>IDE · CLI · MCP · 工程工作流</em>
          <b>进入 Codex Guide <PixelIcon name="arrow-right" /></b>
        </a>
        <a class="agent-choice__card agent-choice__card--workbuddy" :class="{ 'is-recommended': selectedAgent === 'workbuddy' }" href="./workbuddy/" @click="selectAgent('workbuddy')">
          <span class="agent-choice__tag">02 / WORKBUDDY GUIDE</span>
          <span class="agent-choice__recommendation">{{ selectedAgent === 'workbuddy' ? '与你的任务匹配' : '办公与桌面自动化' }}</span>
          <img class="agent-product-mark" :src="workbuddyMark" alt="WorkBuddy" />
          <strong>面向办公与桌面自动化</strong>
          <p>适合周报、资料整理、数据处理、PPT、文件归档和协作推进等日常工作。</p>
          <em>办公协作 · 国内生态 · 自动化 · 多 Agent</em>
          <b>进入 WorkBuddy Guide <PixelIcon name="arrow-right" /></b>
        </a>
      </div>
    </section>

    <section id="agent-learning" class="wb-section wb-reading" aria-labelledby="agent-learning-title">
      <div class="wb-section__heading">
        <div>
          <p class="wb-pixel-label">STEP 02 · LEARNING PATH</p>
          <h2 id="agent-learning-title">选好 Agent 后，按路径把它用起来。</h2>
        </div>
        <p>两个产品分别有独立的教程和问题排查。选择一条路线，从第一个任务开始逐步深入。</p>
      </div>
      <ol class="agent-path" aria-label="Agent 学习路径">
        <li class="agent-path__entry">
          <a href="#agent-choice"><span>01</span><b>选择 Agent</b><small>先从任务场景判断该走哪一条路线。</small><PixelIcon name="arrow-right" /></a>
        </li>
        <li>
          <button type="button" @click="openModuleChooser('start')"><span>02</span><b>完成第一个任务</b><small>快速上手：安装、登录、基础设置和首个结果。</small><PixelIcon name="arrow-right" /></button>
        </li>
        <li>
          <button type="button" @click="openModuleChooser('recipes')"><span>03</span><b>复用真实案例</b><small>实战案例：把一次成功迁移到相似工作中。</small><PixelIcon name="arrow-right" /></button>
        </li>
        <li>
          <button type="button" @click="openModuleChooser('advanced')"><span>04</span><b>建立工作流</b><small>进阶教程：配置、工具接入与可靠执行。</small><PixelIcon name="arrow-right" /></button>
        </li>
        <li>
          <button type="button" @click="openModuleChooser('troubleshooting')"><span>05</span><b>处理问题与反馈</b><small>问题排查：按产品定位、验证并解决障碍。</small><PixelIcon name="arrow-right" /></button>
        </li>
      </ol>
    </section>

    <div v-if="selectedModule" class="agent-module-dialog" role="dialog" aria-modal="true" :aria-labelledby="`${selectedModule}-chooser-title`" @click.self="selectedModule = null">
      <section class="agent-module-dialog__panel">
        <button class="agent-module-dialog__close" type="button" aria-label="关闭" @click="selectedModule = null">×</button>
        <p class="wb-pixel-label">CHOOSE YOUR AGENT</p>
        <h2 :id="`${selectedModule}-chooser-title`">{{ moduleCopy[selectedModule].title }}</h2>
        <p>两种产品的能力与使用场景不同。选择后进入对应的学习内容。</p>
        <div class="agent-module-dialog__choices">
          <a class="agent-module-dialog__choice agent-module-dialog__choice--codex" :class="{ 'is-preferred': selectedAgent === 'codex' }" :href="moduleCopy[selectedModule].codex" @click="selectAgent('codex')">
            <img class="agent-product-mark" :src="codexMark" alt="Codex" />
            <span><strong>Codex Guide</strong><em>代码、终端与复杂开发</em></span>
            <PixelIcon name="arrow-right" />
          </a>
          <a class="agent-module-dialog__choice agent-module-dialog__choice--workbuddy" :class="{ 'is-preferred': selectedAgent === 'workbuddy' }" :href="moduleCopy[selectedModule].workbuddy" @click="selectAgent('workbuddy')">
            <img class="agent-product-mark" :src="workbuddyMark" alt="WorkBuddy" />
            <span><strong>WorkBuddy Guide</strong><em>办公、资料处理与自动化</em></span>
            <PixelIcon name="arrow-right" />
          </a>
        </div>
      </section>
    </div>

    <section class="wb-community agent-reference" aria-labelledby="agent-reference-title">
      <div class="agent-reference__intro">
        <p class="wb-pixel-label">UPDATES · REFERENCES · CREDITS</p>
        <h2 id="agent-reference-title">参考手册</h2>
        <p>集中查看两类 Agent 的近期更新，以及本站的参考来源与致谢说明。</p>
      </div>
      <div class="agent-reference__links" aria-label="参考手册栏目">
        <a href="./manual/resources"><span>01</span><b>精选资源</b><PixelIcon name="arrow-right" /></a>
        <a href="./manual/01-codex-updates"><span>02</span><b>近期 Codex 更新</b><PixelIcon name="arrow-right" /></a>
        <a href="./manual/workbuddy-updates"><span>03</span><b>近期 WorkBuddy 更新</b><PixelIcon name="arrow-right" /></a>
        <a href="./manual/02-credits"><span>04</span><b>参考来源和致谢</b><PixelIcon name="arrow-right" /></a>
      </div>
      <PixelIcon name="book" class="wb-community__icon" />
    </section>
  </main>
</template>
