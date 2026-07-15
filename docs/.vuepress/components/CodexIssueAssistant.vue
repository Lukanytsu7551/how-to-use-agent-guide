<template>
  <section class="codex-issue-assistant" aria-labelledby="codex-issue-assistant-title">
    <div class="codex-issue-assistant__header">
      <div>
        <p class="codex-issue-assistant__eyebrow">Codex 问题助手</p>
        <h3 id="codex-issue-assistant-title">把报错或现象贴进来，先做一次本地排查</h3>
      </div>
      <span class="codex-issue-assistant__badge">无需 API Key</span>
    </div>

    <p class="codex-issue-assistant__note">
      这个窗口会根据站内问题库匹配类型，生成排查路径和可复制给 Codex / ChatGPT 的日志分析提示词。提交前请先脱敏。
    </p>

    <div class="codex-issue-assistant__quick" aria-label="常见问题快捷输入">
      <button
        v-for="sample in samples"
        :key="sample.label"
        type="button"
        @click="useSample(sample.text)"
      >
        {{ sample.label }}
      </button>
    </div>

    <label class="codex-issue-assistant__label" for="codex-issue-input">
      问题现象 / 报错日志
    </label>
    <textarea
      id="codex-issue-input"
      v-model="input"
      class="codex-issue-assistant__textarea"
      rows="8"
      placeholder="例如：codex login 后浏览器完成登录，但 CLI 一直没有返回；或粘贴脱敏后的 Reconnecting / sandbox / MCP 报错。"
    />

    <div class="codex-issue-assistant__actions">
      <button type="button" class="codex-issue-assistant__primary" @click="analyze">
        分析问题
      </button>
      <button type="button" @click="copyPrompt">
        复制 AI 分析提示词
      </button>
      <button type="button" @click="reset">
        清空
      </button>
      <span v-if="copyState" role="status">{{ copyState }}</span>
    </div>

    <div v-if="result" class="codex-issue-assistant__result" aria-live="polite">
      <div>
        <p class="codex-issue-assistant__result-label">初步归类</p>
        <h4>{{ result.title }}</h4>
        <p>{{ result.summary }}</p>
      </div>

      <div class="codex-issue-assistant__grid">
        <section>
          <h5>可能原因</h5>
          <ul>
            <li v-for="item in result.causes" :key="item">{{ item }}</li>
          </ul>
        </section>

        <section>
          <h5>验证步骤</h5>
          <ol>
            <li v-for="item in result.checks" :key="item">{{ item }}</li>
          </ol>
        </section>

        <section>
          <h5>修复方向</h5>
          <ul>
            <li v-for="item in result.fixes" :key="item">{{ item }}</li>
          </ul>
        </section>

        <section>
          <h5>还需要补充</h5>
          <ul>
            <li v-for="item in result.needMore" :key="item">{{ item }}</li>
          </ul>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

type Rule = {
  title: string;
  summary: string;
  keywords: string[];
  causes: string[];
  checks: string[];
  fixes: string[];
  needMore: string[];
};

const samples = [
  {
    label: "登录卡住",
    text: "codex login 后浏览器已经登录成功，但终端一直没有返回，环境是 WSL / 远程机器。",
  },
  {
    label: "网络重连",
    text: "Codex Desktop 一直显示 Reconnecting，偶尔出现 idle timeout waiting for websocket。",
  },
  {
    label: "沙盒权限",
    text: "执行命令时报 failed in sandbox，Codex 无法修改文件或无法访问网络。",
  },
  {
    label: "MCP 不可用",
    text: "codex mcp list 能看到配置，但线程里没有 MCP 工具，Browser MCP 报 Transport closed。",
  },
];

const rules: Rule[] = [
  {
    title: "登录与认证问题",
    summary: "问题集中在 ChatGPT 登录回调、API key 注入、远程环境或账号权限上。",
    keywords: ["login", "登录", "sign in", "callback", "localhost", "api key", "OPENAI_API_KEY", "认证", "账号"],
    causes: [
      "浏览器登录完成后，本地 CLI 没有收到回调。",
      "远程机器、WSL 或容器环境与浏览器所在环境不一致。",
      "API key 没有注入当前 shell，或 provider / base URL 配置不匹配。",
      "账号计划、组织策略或安全验证限制了当前入口。",
    ],
    checks: [
      "运行 `codex login status` 确认当前认证方式。",
      "确认问题发生在本机、远程机器、WSL 还是容器里。",
      "如果使用 API key，检查当前终端是否能读取 `OPENAI_API_KEY`。",
      "新开一个终端或新线程，验证是否仍然复现。",
    ],
    fixes: [
      "本机环境优先重新 `codex logout` 后再登录。",
      "远程 / WSL / 无头环境优先改用 API key，或配置正确的端口转发。",
      "组织账号问题需要联系管理员确认 Codex 和相关工具权限。",
    ],
    needMore: ["操作系统", "登录方式", "`codex login status` 输出", "是否在 WSL / SSH / 容器中运行"],
  },
  {
    title: "网络与连接问题",
    summary: "问题集中在代理、VPN、WebSocket/SSE、DNS 或公司网络策略上。",
    keywords: ["reconnecting", "websocket", "timeout", "stream disconnected", "network", "proxy", "vpn", "dns", "连接", "超时", "代理"],
    causes: [
      "代理或 VPN 对 WebSocket / 长连接支持不稳定。",
      "公司网络、DNS、证书或防火墙限制了 Codex 访问。",
      "旧线程连接状态异常，或者服务端短时波动。",
    ],
    checks: [
      "切换网络或临时关闭代理后重试。",
      "确认 `chatgpt.com`、`api.openai.com`、npm registry 等目标可访问。",
      "新建线程验证，判断是否只有旧线程受影响。",
      "记录完整报错，尤其是 timeout、WebSocket、stream 相关文本。",
    ],
    fixes: [
      "换用稳定网络或支持长连接的代理。",
      "在 MCP server 环境中单独配置代理变量。",
      "升级 Codex 到最新版本，必要时保留日志提交 issue。",
    ],
    needMore: ["网络环境", "是否使用代理 / VPN", "完整报错", "是否所有线程都复现"],
  },
  {
    title: "权限、审批与沙盒问题",
    summary: "问题集中在工作区写入范围、sandbox 策略、approval policy 或网络权限上。",
    keywords: ["sandbox", "approval", "permission", "denied", "writable", "read-only", "权限", "审批", "无法修改", "failed in sandbox"],
    causes: [
      "当前工作目录不在可写范围内。",
      "sandbox 阻止了文件、网络或系统资源访问。",
      "线程继承了旧权限状态，导致 Full Access 看起来没有生效。",
    ],
    checks: [
      "确认当前 `pwd` 是否是项目根目录。",
      "运行 `git status --short --branch` 看 Codex 是否在正确仓库。",
      "检查当前 sandbox / approval 设置。",
      "新建线程验证权限是否恢复正常。",
    ],
    fixes: [
      "把任务放在允许写入的 workspace 内执行。",
      "需要联网时明确开启网络权限，或让 Codex 输出离线方案。",
      "旧线程权限异常时，新建线程或重启 Desktop / CLI。",
    ],
    needMore: ["当前工作目录", "sandbox 设置", "失败命令", "完整权限报错"],
  },
  {
    title: "安装、更新与启动问题",
    summary: "问题集中在安装源、PATH、多版本冲突、配置文件或平台支持上。",
    keywords: ["install", "npm", "homebrew", "PATH", "unsupported platform", "No such file", "config.toml", "安装", "更新", "启动"],
    causes: [
      "PATH 未生效或存在多个 Codex 安装路径。",
      "npm / DNS / 代理导致安装包下载失败。",
      "`config.toml` 损坏或字段格式不兼容。",
      "当前系统或 CPU 架构暂不支持所选安装包。",
    ],
    checks: [
      "运行 `codex --version` 和 `which codex` / `where.exe codex`。",
      "确认安装方式：官方脚本、npm、Homebrew、GitHub Release 或 Desktop App。",
      "临时移走 `~/.codex/config.toml` 后再启动验证。",
      "检查 Node、npm、系统版本和完整安装报错。",
    ],
    fixes: [
      "删除旧安装残留，保留一个明确的 Codex 路径。",
      "切换网络或 npm registry 后重装。",
      "按当前版本文档重建配置文件。",
    ],
    needMore: ["安装方式", "Codex 版本", "系统版本", "安装或启动报错全文"],
  },
  {
    title: "MCP、Browser、插件或 Skills 问题",
    summary: "问题集中在工具注入、授权状态、worker 环境变量或组件版本上。",
    keywords: ["mcp", "browser", "Transport closed", "tool", "worker", "oauth", "skill", "notion", "figma", "插件", "工具"],
    causes: [
      "MCP 配置存在，但工具没有注入当前线程。",
      "OAuth 登录状态没有进入当前会话。",
      "Browser worker 或 Desktop 内置 MCP 连接异常。",
      "Skills 文件名、路径或软链接规则不符合要求。",
    ],
    checks: [
      "运行 `codex mcp list` 并保留 JSON 输出。",
      "新建线程验证工具是否出现。",
      "重启 Desktop、浏览器或相关 MCP worker。",
      "检查 `SKILL.md` 文件名和路径是否正确。",
    ],
    fixes: [
      "删除后重加 MCP，并重新授权。",
      "给 MCP server 单独配置所需环境变量。",
      "升级或回滚到稳定版本后对比表现。",
    ],
    needMore: ["MCP 配置", "授权状态", "worker 日志", "CLI 与 Desktop 是否表现一致"],
  },
];

const fallback: Rule = {
  title: "未能明确归类",
  summary: "当前信息还不足以定位到具体类型，先按通用流程收集诊断信息。",
  keywords: [],
  causes: [
    "问题描述里缺少错误文本、环境信息或复现步骤。",
    "可能同时涉及安装、网络、权限、配置或插件多个层级。",
  ],
  checks: [
    "运行 `codex --version`、`codex doctor`、`codex login status`。",
    "新建空目录和新线程，尝试一个最小任务。",
    "记录最近是否改过代理、MCP、模型、provider 或 `config.toml`。",
  ],
  fixes: [
    "先把问题压缩成最小复现，再按本页分类继续查。",
    "把脱敏日志交给 Codex / ChatGPT 做二次分析。",
  ],
  needMore: ["操作系统", "安装方式", "认证方式", "完整报错", "最短复现步骤"],
};

const input = ref("");
const result = ref<Rule | null>(null);
const copyState = ref("");

const normalizedInput = computed(() => input.value.toLowerCase());

const buildPrompt = (): string => `请根据以下信息帮我排查 Codex 问题：

1. 现象：
${input.value.trim() || "（在这里粘贴脱敏后的问题现象和报错日志）"}

2. 操作系统：
3. Codex 版本：
4. 安装方式：
5. 登录方式：
6. 是否使用代理 / VPN：
7. 是否使用 MCP / 插件 / Skills：
8. 最近改动：
9. 复现步骤：

请按“可能原因、验证步骤、修复方案、仍无法解决时需要补充的信息”输出。`;

const analyze = (): void => {
  const text = normalizedInput.value;
  const rankedRules = rules
    .map((rule) => ({
      rule,
      score: rule.keywords.reduce((score, keyword) => score + (text.includes(keyword.toLowerCase()) ? 1 : 0), 0),
    }))
    .sort((a, b) => b.score - a.score);

  result.value = rankedRules[0]?.score ? rankedRules[0].rule : fallback;
};

const useSample = (text: string): void => {
  input.value = text;
  analyze();
};

const copyPrompt = async (): Promise<void> => {
  copyState.value = "";
  const prompt = buildPrompt();

  try {
    await navigator.clipboard.writeText(prompt);
    copyState.value = "已复制";
  } catch {
    copyState.value = "复制失败，请手动选择文本";
  }

  window.setTimeout(() => {
    copyState.value = "";
  }, 1800);
};

const reset = (): void => {
  input.value = "";
  result.value = null;
  copyState.value = "";
};
</script>
