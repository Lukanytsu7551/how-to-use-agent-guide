---
description: "Codex 问题排查：按安装、登录、使用、工具接入和反馈组织常见问题。"
containerClass: codex-guide-page
---

# Codex 问题排查

当 Codex 没有按预期运行时，不要马上反复重试。先记录现象、版本、系统、任务目录、执行命令和脱敏日志；再按“安装 -> 登录 -> 使用 -> 工具接入 -> 反馈”逐层缩小范围。

## 使用方法

1. 找到与当前现象最接近的分类，先完成其中的基础检查。
2. 用空目录或最小命令复现问题，避免把项目本身的问题误判为 Codex 问题。
3. 需要求助时，提供脱敏后的版本、环境、复现步骤、错误截图或日志。

| 阶段 | 优先检查 | 入口 |
| --- | --- | --- |
| 安装 | App/CLI 安装、PATH、版本与依赖 | [安装与更新](../troubleshooting/#安装与更新) |
| 登录 | 浏览器回调、账号状态、API key | [登录与认证](../troubleshooting/#登录与认证) |
| 使用 | 工作目录、任务范围、依赖与验证 | [首次使用](../troubleshooting/#首次使用) |
| 工具接入 | MCP、Browser、Skills、插件与环境变量 | [高级集成](../troubleshooting/#问题分类) |
| 反馈 | 脱敏日志、复现步骤、版本和环境信息 | [问题上报](../troubleshooting/#问题上报模板) |

<div class="guide-action-row"><a class="guide-action-primary" href="../troubleshooting/">打开完整问题库</a></div>
