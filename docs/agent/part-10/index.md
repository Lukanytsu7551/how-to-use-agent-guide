---
description: "Agent Guide Part 10：Agent Loop 工程。"
containerClass: agent-guide-page
---

# Part 10 / Agent Loop 工程

深入长任务运行时：上下文压缩、工具预算、缓存、持久化、并行和卡循环检测。

## 本部分章节

| 章节 | 本章关注点 |
| --- | --- |
| [第 34 章：从 DAG 到 Agent Loop](./chapter-34-dag-to-loop) | 理解固定流程与动态循环的差异，选择适合任务的运行方式。 |
| [第 35 章：上下文压缩](./chapter-35-context-compression) | 在长任务中保留目标、决策和证据，压缩冗余历史。 |
| [第 36 章：Tool Result 预算与外溢](./chapter-36-tool-result-budget) | 控制工具结果大小，把过长结果外置并按需取回。 |
| [第 37 章：分层压缩](./chapter-37-layered-compression) | 按任务、阶段、会话和长期记忆分层保存信息，避免单一摘要承担全部职责。 |
| [第 38 章：Deferred Tool Loading 与 Tool Search](./chapter-38-deferred-tool-loading) | 按需加载工具描述和能力，降低工具数量对上下文与选择的干扰。 |
| [第 39 章：Prompt Cache 稳定性](./chapter-39-prompt-cache) | 让稳定前缀、系统规则和工具定义可复用，减少重复成本和延迟。 |
| [第 40 章：持久化 Agent Loop](./chapter-40-persistent-loop) | 让长任务跨进程、跨网络或跨时间恢复，保证状态和副作用一致。 |
| [第 41 章：运行中操控 Agent](./chapter-41-runtime-control) | 支持暂停、继续、修改约束、人工接管和安全终止。 |
| [第 42 章：Agent 超时与 Watchdog](./chapter-42-watchdog) | 用看门狗检测无响应、外部依赖阻塞和异常延迟。 |
| [第 43 章：卡循环检测](./chapter-43-loop-detection) | 识别重复调用、重复回答和状态没有变化的循环。 |
| [第 44 章：并行工具执行](./chapter-44-parallel-tools) | 在保证依赖和副作用安全的前提下提高多个工具任务的吞吐。 |
| [第 45 章：Computer Use 上下文管理](./chapter-45-computer-use-context) | 在视觉操作长任务中管理截图、界面状态、动作历史和恢复点。 |

## 本部分产出

完成本 Part 后，你应该能：

- 用自己的话解释本部分的关键模式，而不是只记住名词。
- 为一个真实任务画出输入、状态、动作、反馈和验收的边界。
- 说明该模式的适用条件、主要风险以及不适用时的替代方案。

## 建议学习方式

先读本页了解知识地图，再按章节顺序完成练习。每章都保留一份任务卡和一份验收记录，最后把它们合并成一个可复用的 Agent 设计说明。

**下一步：**从[第一个章节](./chapter-34-dag-to-loop)开始。

