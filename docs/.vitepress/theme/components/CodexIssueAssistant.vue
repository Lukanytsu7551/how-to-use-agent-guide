<script setup lang="ts">
import { computed, ref } from "vue";

type Diagnosis = {
  title: string;
  causes: string[];
  checks: string[];
  fixes: string[];
};

const input = ref("");
const copied = ref(false);

const diagnosis = computed<Diagnosis>(() => {
  const text = input.value.toLowerCase();
  if (/login|登录|api key|认证|callback|回调/.test(text)) {
    return {
      title: "登录与认证",
      causes: ["浏览器回调未回到当前终端", "远程、WSL 或容器环境与浏览器不一致", "账号、API key 或组织权限异常"],
      checks: ["运行 `codex login status`", "确认当前环境是否为 WSL、SSH 或容器", "检查当前 shell 中的 API key 配置"],
      fixes: ["本机环境可先 `codex logout` 后重新登录", "远程环境使用 API key 或配置端口转发", "组织账号请联系管理员确认权限"],
    };
  }
  if (/reconnecting|timeout|websocket|network|proxy|vpn|网络|超时|代理/.test(text)) {
    return {
      title: "网络与连接",
      causes: ["代理或 VPN 不支持稳定长连接", "公司网络、DNS 或防火墙限制访问", "服务端或旧线程连接状态异常"],
      checks: ["切换网络或代理后重试", "新建线程判断是否仅旧线程异常", "记录完整 timeout、WebSocket 或 stream 报错"],
      fixes: ["换用稳定且支持长连接的网络", "升级 Codex 后重新测试", "保留脱敏日志用于后续反馈"],
    };
  }
  if (/sandbox|permission|approval|权限|审批|无法修改|denied/.test(text)) {
    return {
      title: "权限、审批与沙盒",
      causes: ["工作目录不在可写范围", "sandbox 阻止文件或网络访问", "线程继承了旧权限状态"],
      checks: ["确认 `pwd` 和 `git status --short --branch`", "检查当前 sandbox 与 approval 设置", "新建线程验证是否恢复"],
      fixes: ["将任务放在允许写入的 workspace 内", "按任务需要开启对应权限", "重启或新建线程后再执行"],
    };
  }
  if (/mcp|browser|plugin|skill|notion|figma|工具|插件/.test(text)) {
    return {
      title: "MCP、Browser、插件或 Skills",
      causes: ["工具未注入当前线程", "授权或环境变量缺失", "MCP worker 或组件版本异常"],
      checks: ["运行 `codex mcp list`", "新建线程查看工具是否出现", "检查 MCP 配置、OAuth 和环境变量"],
      fixes: ["重新添加并授权 MCP", "重启 Desktop、浏览器或对应 worker", "升级或回滚后对比表现"],
    };
  }
  return {
    title: "安装、启动或通用问题",
    causes: ["安装源、PATH 或多版本冲突", "配置文件或依赖环境异常", "信息不足，暂无法定位具体层级"],
    checks: ["运行 `codex --version`、`codex doctor`、`which codex`", "记录操作系统、安装方式和完整报错", "在空目录中复现最小任务"],
    fixes: ["一次只修改一个变量并重新验证", "按安装、启动、登录、使用、工具接入顺序排查", "将脱敏后的日志交给 AI 做进一步分析"],
  };
});

const prompt = computed(() => `请排查以下 Codex 问题，并按“可能原因、验证步骤、修复方案、仍需补充的信息”输出：\n\n${input.value.trim() || "（粘贴脱敏后的错误日志和复现步骤）"}`);

const copyPrompt = async () => {
  await navigator.clipboard.writeText(prompt.value);
  copied.value = true;
  window.setTimeout(() => (copied.value = false), 1600);
};
</script>

<template>
  <section class="codex-issue-assistant">
    <p class="codex-issue-assistant__eyebrow">CODEX ISSUE ASSISTANT</p>
    <h3>把报错或现象贴进来，先做一次本地排查</h3>
    <p>请先脱敏。该工具按站内问题库生成排查方向，并可复制提示词交给 Codex 或 ChatGPT 继续分析。</p>
    <textarea v-model="input" rows="7" placeholder="例如：codex login 后浏览器已经登录成功，但终端一直没有返回；或粘贴脱敏后的 Reconnecting / sandbox / MCP 报错。" />
    <div class="codex-issue-assistant__actions">
      <button type="button" @click="copyPrompt">{{ copied ? "已复制" : "复制 AI 分析提示词" }}</button>
      <button type="button" @click="input = ''">清空</button>
    </div>
    <div class="codex-issue-assistant__result">
      <h4>{{ diagnosis.title }}</h4>
      <div><strong>可能原因</strong><ul><li v-for="item in diagnosis.causes" :key="item">{{ item }}</li></ul></div>
      <div><strong>验证步骤</strong><ol><li v-for="item in diagnosis.checks" :key="item">{{ item }}</li></ol></div>
      <div><strong>修复方向</strong><ul><li v-for="item in diagnosis.fixes" :key="item">{{ item }}</li></ul></div>
    </div>
  </section>
</template>
