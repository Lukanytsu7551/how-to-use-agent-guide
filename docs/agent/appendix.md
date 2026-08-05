---
description: "Agent Guide 附录：术语、阅读建议、实践模板与参考资料。"
containerClass: agent-guide-page
---

# Agent Guide 附录

## 常用术语

| 术语 | 简要说明 |
| --- | --- |
| Agent | 能围绕目标使用上下文和工具持续推进任务的系统 |
| Context | 当前运行中提供给模型的规则、历史、状态和资料 |
| Tool | Agent 用来读取或改变外部世界的接口 |
| RAG | 先检索外部知识，再把相关内容放入上下文生成结果 |
| MCP | 用于连接模型与外部工具/资源的一种开放协议 |
| Skill | 可组合的任务知识、步骤和资源集合 |
| Harness | 围绕模型搭建的运行、工具、状态、权限和验证工程 |

## 推荐阅读顺序

1. 先读[快速上手](./start/)，掌握三要素和核心循环。
2. 再选一个[实战案例](./recipes/)，观察输入、工具和验收如何连接。
3. 需要扩展时读[进阶教程](./advanced/)，一次只引入一种新能力。
4. 遇到异常先看[问题排查](./troubleshooting)，保留运行证据再调整。

## 可复用任务卡

```text
目标：
输入：
上下文规则：
可用工具：
禁止操作：
输出格式：
验收标准：
失败回退：
```

## 知识结构参考

本板块的知识地图参考了 [bojieli/ai-agent-book](https://github.com/bojieli/ai-agent-book) 与 [Wayland Zhang 的 AI Agent 架构教程](https://waylandz.com/ai-agent-book/) 的公开目录和阅读路径，重点吸收“模型、上下文、工具、推理、编排、生产治理与 Agent Loop”的递进关系；本站内容为重新组织和适配 How to Use Agent 的原创导读，不是上述网站的全文转载。

参考时遵循各自的授权边界：`ai-agent-book` 仓库标注为 Apache-2.0；Wayland 教程页面标注内容采用 CC BY-NC-SA 4.0，配套 Shannon 代码采用 Apache-2.0。后续如加入具体图片、代码或大段原文，会单独核对授权并保留必要署名。
