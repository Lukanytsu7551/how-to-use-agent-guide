---
description: "Agent 精选资源，按 Codex、WorkBuddy、Agent 开发与企业治理场景整理官方指南、开源项目、协议、评测和论文。"
---

# 精选资源

这里不是链接仓库，而是一份经过筛选的阅读地图。资源按“先理解边界，再选择系统，最后补工程与安全”的顺序整理，适合在完成本站基础教程后继续深入。

## 先按你的目标选择

| 你的目标 | 建议先看 | 重点关注 |
| --- | --- | --- |
| 用 Codex 完成真实开发任务 | [OpenAI Codex](https://github.com/openai/codex)、[Codex 官方文档](https://developers.openai.com/codex/) | 代码库上下文、Shell、文件编辑、测试、沙盒和审批 |
| 用 WorkBuddy 提升办公效率 | [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)、[MCP](https://modelcontextprotocol.io/) | 任务拆分、工具接入、Skills、人工确认和结果验收 |
| 从零开发自己的 Agent | [hello-agents](https://github.com/datawhalechina/hello-agents)、[OpenAI Agent 指南](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) | Agent loop、工具调用、状态、记忆和错误处理 |
| 建设企业级 Agent 系统 | [OpenAI Evals](https://platform.openai.com/docs/guides/evals)、[LangSmith](https://docs.smith.langchain.com/) | 评测、Trace、权限、成本、回放和安全治理 |

## 五份优先阅读资料

时间有限时，先完成下面五项，不必一次读完整个资源库。

1. [Anthropic：Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)：理解 workflow 与 agent 的边界，以及什么时候不该使用 Agent。
2. [OpenAI：A practical guide to building agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/)：从模型、工具、指令和编排角度理解 Agent 落地。
3. [OpenAI Codex 官方文档](https://developers.openai.com/codex/)：观察成熟 Coding Agent 如何处理项目上下文、权限、工具和长任务。
4. [Model Context Protocol](https://modelcontextprotocol.io/)：理解 Agent 如何标准化连接文件、数据库、搜索和业务系统。
5. [Datawhale hello-agents](https://github.com/datawhalechina/hello-agents)：中文系统教程，适合从 Agent 原理逐步进入工程实践。

## 官方指南与工程文档

### OpenAI

| 资源 | 适合解决什么问题 |
| --- | --- |
| [Codex 官方文档](https://developers.openai.com/codex/) | 学习 Codex App、CLI、Cloud、Skills、MCP、配置和安全边界 |
| [OpenAI Codex GitHub](https://github.com/openai/codex) | 研究开源 Coding Agent 的 CLI、沙盒、审批和工程实现 |
| [OpenAI Agents SDK](https://platform.openai.com/docs/guides/agents-sdk/) | 构建带工具、转交和 Trace 的 Agent 应用 |
| [Function Calling](https://platform.openai.com/docs/guides/function-calling) | 让模型以结构化参数选择并调用工具 |
| [OpenAI Evals](https://platform.openai.com/docs/guides/evals) | 为 Agent 建立固定测试集、评分标准和回归验证 |

### Anthropic 与 Google

| 资源 | 适合解决什么问题 |
| --- | --- |
| [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) | 区分可预测工作流和自主 Agent，避免过度设计 |
| [Claude Tool Use](https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview) | 理解工具定义、调用结果回传和错误处理 |
| [Claude Computer Use](https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/computer-use-tool) | 理解桌面操作 Agent 的观察、动作与风险边界 |
| [Google Agent Development Kit](https://google.github.io/adk-docs/) | 学习多 Agent、工具和运行时编排 |
| [Gemini Function Calling](https://ai.google.dev/gemini-api/docs/function-calling) | 对照不同模型平台的工具调用机制 |

## 开源项目地图

不要按 Star 数逐个安装。先确定想研究的能力，再选一个项目深入阅读目录、运行示例并观察完整 Trace。

| 学习方向 | 推荐项目 | 重点观察 |
| --- | --- | --- |
| 从零理解 Agent Harness | [learn-claude-code](https://github.com/shareAI-lab/learn-claude-code)、[hello-agents](https://github.com/datawhalechina/hello-agents) | Agent loop、工具注册、会话、上下文压缩和子任务 |
| Coding Agent | [Codex](https://github.com/openai/codex)、[OpenCode](https://github.com/opencode-ai/opencode)、[OpenHands](https://github.com/All-Hands-AI/OpenHands)、[SWE-agent](https://github.com/SWE-agent/SWE-agent) | 真实代码库编辑、Shell、测试、沙盒、Diff 和 PR 工作流 |
| 长任务与可控编排 | [DeerFlow](https://github.com/bytedance/deer-flow)、[LangGraph](https://github.com/langchain-ai/langgraph) | 状态管理、可恢复执行、沙盒、子 Agent 和长任务控制 |
| 个人与常驻 Agent | [OpenClaw](https://github.com/openclaw/openclaw)、[Hermes Agent](https://github.com/NousResearch/hermes-agent)、[CyberClaw](https://github.com/ttguy0707/CyberClaw) | 长期记忆、Skills、消息入口、心跳任务和安全审计 |
| Deep Research 与 RAG | [GPT Researcher](https://github.com/assafelovic/gpt-researcher)、[Open Deep Research](https://github.com/langchain-ai/open_deep_research)、[STORM](https://github.com/stanford-oval/storm) | 搜索、筛选、检索、引用、提纲和长报告生成 |
| 企业搜索与知识库 | [Onyx](https://github.com/onyx-dot-app/onyx)、[RAGFlow](https://github.com/infiniflow/ragflow)、[AnythingLLM](https://github.com/Mintplex-Labs/anything-llm) | 数据连接、文档解析、权限、检索和可追溯回答 |
| 记忆与上下文 | [mem0](https://github.com/mem0ai/mem0)、[Letta](https://github.com/letta-ai/letta)、[Khoj](https://github.com/khoj-ai/khoj) | 长期记忆、状态、上下文组织和个人知识系统 |
| 浏览器与桌面操作 | [browser-use](https://github.com/browser-use/browser-use)、[UI-TARS Desktop](https://github.com/bytedance/UI-TARS-desktop) | 页面观察、视觉理解、动作定位、失败恢复和审计 |
| 轻量开发框架 | [smolagents](https://github.com/huggingface/smolagents)、[Pydantic AI](https://ai.pydantic.dev/)、[Qwen-Agent](https://github.com/QwenLM/Qwen-Agent) | 代码式 Agent、类型安全、结构化输出与国产模型生态 |

## Skills、协议与工具接入

| 概念 | 推荐资料 | 它解决什么问题 |
| --- | --- | --- |
| Skills | [Claude Code Skills](https://code.claude.com/docs/en/skills)、[OpenClaw Skills](https://github.com/openclaw/openclaw/blob/main/docs/tools/skills.md) | 将流程知识、脚本、模板和验收标准打包为可复用能力 |
| MCP | [MCP 官方文档](https://modelcontextprotocol.io/)、[官方 Servers 合集](https://github.com/modelcontextprotocol/servers) | 让 Agent 标准化连接工具、数据源与业务服务 |
| A2A | [Agent2Agent Protocol](https://a2a-protocol.org/latest/specification/) | 让不同 Agent 发现、通信和协作 |
| ACP | [Agent Client Protocol](https://agentclientprotocol.com/) | 统一编辑器、终端、宿主应用与 Agent 的连接方式 |
| Skill 质量 | [SWE-Skills-Bench](https://arxiv.org/abs/2603.15401)、[SkillOpt](https://github.com/microsoft/SkillOpt) | 验证 Skill 是否提高任务成功率，而不是增加提示词噪声 |

### 对本站读者的对应关系

- **Codex 用户：** 优先学习 Skills、MCP、沙盒审批和 Coding Agent Harness。
- **WorkBuddy 用户：** 优先学习 Skills、MCP、Computer Use、消息入口和人工验收。
- **团队管理员：** 在接入更多工具前，先定义权限、日志、失败恢复和敏感操作确认。

## 评测、可观测性与安全

一个 Agent 能演示成功，不代表它能稳定交付。建议至少记录成功率、失败类型、工具调用次数、成本、延迟和人工接管点。

| 资源 | 主要用途 |
| --- | --- |
| [OpenAI Evals](https://platform.openai.com/docs/guides/evals) | 建立任务集、评分标准和自动化回归测试 |
| [LangSmith](https://docs.smith.langchain.com/) | 查看 Trace、状态、工具调用和失败位置 |
| [AgentBench](https://arxiv.org/abs/2308.03688) | 理解通用 Agent 能力评测方式 |
| [SWE-bench](https://arxiv.org/abs/2310.06770) | 评估 Agent 解决真实 GitHub Issue 的能力 |
| [WebArena](https://arxiv.org/abs/2307.13854) | 评估真实网页环境中的规划和操作能力 |
| [OSWorld](https://arxiv.org/abs/2404.07972) | 评估真实操作系统中的多模态桌面 Agent |
| [GAIA](https://arxiv.org/abs/2311.12983) | 评估推理、多模态、搜索与工具综合能力 |
| [τ-bench](https://arxiv.org/abs/2406.12045) | 评估 Agent、工具和用户之间的动态交互可靠性 |

## 经典论文与方法

| 论文 | 建议理解的核心概念 |
| --- | --- |
| [ReAct](https://arxiv.org/abs/2210.03629) | 推理与行动交替进行的 Agent 基础范式 |
| [Toolformer](https://arxiv.org/abs/2302.04761) | 模型如何学习何时调用工具 |
| [Reflexion](https://arxiv.org/abs/2303.11366) | 通过语言反馈进行复盘和自我改进 |
| [Generative Agents](https://arxiv.org/abs/2304.03442) | 记忆、反思与规划如何共同驱动行为 |
| [Voyager](https://arxiv.org/abs/2305.16291) | 开放环境中的长期学习与技能积累 |
| [SWE-agent](https://arxiv.org/abs/2405.15793) | 软件工程 Agent 的 Agent-Computer Interface |

## 值得持续关注的博客

- [Lilian Weng：LLM Powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/)：经典长文，系统梳理规划、记忆和工具使用。
- [Simon Willison 的 LLM 文章](https://simonwillison.net/tags/llms/)：偏实践和工程判断，适合了解工具边界与真实问题。
- [LangChain Blog](https://blog.langchain.com/)：持续更新 LangGraph、LangSmith 和 Agent 工程案例。
- [Google Developers Blog：ADK](https://developers.googleblog.com/agent-development-kit-easy-to-build-multi-agent-applications/)：Google ADK 的官方介绍与设计思路。

## 可了解但不必作为主线

| 框架 | 建议定位 |
| --- | --- |
| [CrewAI](https://docs.crewai.com/) | 用于理解 role、task、crew 抽象，不必把角色扮演式多 Agent 当成默认方案 |
| [AutoGen](https://microsoft.github.io/autogen/) | 多 Agent 对话框架的经典项目，适合了解发展历史和研究思路 |
| [LangChain Agents](https://docs.langchain.com/) | 生态仍重要，工程学习可优先转向 LangGraph 和具体运行模式 |

## 使用这些资源的方法

1. 先选一个真实任务，不要从安装十个框架开始。
2. 每次只深入一个系统，找到它的 Agent loop、工具注册、权限、状态和日志。
3. 跑通最小示例后增加一个自己的工具，并记录失败案例。
4. 在增加多 Agent 前，先为单 Agent 建立测试集和停止条件。
5. 涉及发消息、删文件、付款、发布内容和企业数据时，始终保留人工确认。

完整原始资源和持续更新内容可查看 [Datawhale Agent Learning Hub](https://datawhalechina.github.io/Agent-Learning-Hub/) 及其 [GitHub 仓库](https://github.com/datawhalechina/Agent-Learning-Hub)。
