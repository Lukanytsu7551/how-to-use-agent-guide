---
description: "Agent Guide 附录 C：常见问题与参考边界。"
containerClass: agent-guide-page
---

# 附录 C / 常见问题 FAQ

## Agent 和普通聊天有什么区别？

普通聊天通常在一次回答中完成任务；Agent 会围绕目标维护状态、选择动作、调用工具并根据反馈继续推进。两者没有绝对的产品边界，关键要看系统是否承担了持续决策和外部执行。

## 为什么 Agent 看起来会“跑偏”？

先检查目标是否可验收、上下文是否混入过期信息、工具结果是否被正确解释，以及流程有没有明确的停止和回退条件。增加提示词长度或切换模型，通常不是第一步。

## 为什么工具调用失败后还会继续执行？

工具失败没有被建模成状态。应把错误类型、重试次数、人工接管和停止条件作为运行时的一部分，而不是只在提示词中提醒“遇到错误要小心”。

## 多 Agent 一定比单 Agent 更好吗？

不一定。多 Agent 会带来角色分工、消息传递、共享状态和调试成本。只有当专业边界、并行执行或独立复核确实能降低任务风险时，拆分才有价值。

## 本站的目录参考了哪些公开材料？

本 Agent Guide 的知识地图参考了 [bojieli/ai-agent-book](https://github.com/bojieli/ai-agent-book) 与 [Wayland Zhang 的 AI Agent 架构教程](https://waylandz.com/ai-agent-book/) 的公开目录和阅读路径，本站页面为重新组织和适配 How to Use Agent 的原创导读，不是上述网站的全文转载。

参考时遵循各自的授权边界：ai-agent-book 仓库标注为 Apache-2.0；Wayland 教程页面标注内容采用 CC BY-NC-SA 4.0，配套 Shannon 代码采用 Apache-2.0。后续如加入具体图片、代码或大段原文，会单独核对授权并保留必要署名。
