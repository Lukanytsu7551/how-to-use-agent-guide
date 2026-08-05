---
description: "Agent Guide 进阶教程：上下文、记忆、工具协议、安全、评估与可观测性。"
containerClass: agent-guide-page
---

# Agent Guide 进阶教程

当 Agent 开始处理长任务、外部资料或多个工具时，问题通常不再只是“提示词怎么写”。你需要同时考虑上下文如何组织、工具如何约束、结果如何评估，以及失败后如何恢复。

本部分采用“问题 → 通用模式 → 工程实现 → 验收标准”的章节结构，按从单 Agent 到企业级多 Agent 的顺序展开。每个 Part 都可以独立阅读，但建议按顺序建立完整系统地图。

## 十个进阶 Part

| Part | 主题 | 主要问题 |
| --- | --- | --- |
| [01 / Agent 基础](./part-01-agent-basics) | Agent 的本质与运行循环 | Agent 如何理解任务并持续行动？ |
| [02 / 工具与扩展](./part-02-tools) | 工具调用、MCP、Skills 与事件 | Agent 如何安全地接触外部世界？ |
| [03 / 上下文与记忆](./part-03-context-memory) | 上下文工程、记忆和检索 | Agent 如何在长任务中保持状态？ |
| [04 / 单 Agent 模式](./part-04-single-agent) | Planning、Reflection 与停止 | 一个 Agent 如何处理复杂任务？ |
| [05 / 多 Agent 编排](./part-05-multi-agent) | 分工、DAG、Supervisor 与 Handoff | 什么时候多 Agent 值得引入？ |
| [06 / 高级推理](./part-06-reasoning) | 树搜索、辩论和研究综合 | 如何提升复杂判断的质量？ |
| [07 / 生产架构](./part-07-production) | 持久化、重试、可观测性 | 如何让 Agent 在生产环境稳定运行？ |
| [08 / 企业级治理](./part-08-governance) | 预算、策略、沙箱和多租户 | 如何控制成本、权限与合规风险？ |
| [09 / 前沿实践](./part-09-frontier) | Deep Research、Computer Use、Coding | 当前 Agent 正在扩展哪些边界？ |
| [10 / Agent Loop 工程](./part-10-agent-loop) | 压缩、工具加载、Watchdog 与并行 | 如何让长时 Agent Loop 不失控？ |

## 现有专题页

十个 Part 是主导航；下面的专题页提供可直接复用的工程方法：

- [上下文工程](./01-context-engineering)
- [记忆与知识库](./02-memory-and-rag)
- [工具、MCP 与 Skills](./03-tools-protocols)
- [安全、权限与护栏](./04-safety-guardrails)
- [评估与可观测性](./05-evaluation)

## 进阶学习原则

先做一个能验证的最小系统，再一次只引入一种复杂能力。每次改动都保留输入、运行轨迹、结果和验收记录，避免把多个变量混在一起。
