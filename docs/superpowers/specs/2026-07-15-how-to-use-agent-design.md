# How to Use Agent Design Specification

## Purpose

将原有的单产品 Codex 教程站升级为 `How to Use Agent`：一个面向企业团队与知识工作者的 Agent 使用导航平台。用户先选择 Codex 或 WorkBuddy，再在一致的学习结构中完成上手、实践与排障。

本项目不把两套教程混成同一篇内容。产品差异由独立的 Guide、独立主题色和独立问题排查内容清楚表达；公共资源与更新信息放入单独的参考手册。

## Audience And Product Positioning

- 技术人员和团队负责人：需要使用 Codex 完成代码、终端、MCP、自动化与复杂工作流。
- 国内业务与知识工作者：需要使用 WorkBuddy 完成办公、资料处理和协作工作流。
- 团队内培训负责人：需要一处可查、可跟进更新、可复用的 Agent 教程入口。

品牌气质为企业级工具导航：理性、专业、可信、易检索。页面不采用营销型大图、深色霓虹、玻璃拟态或渐变装饰。

## Information Architecture

```text
How to Use Agent
├── 首页
│   ├── 产品选择：Codex Guide / WorkBuddy Guide
│   ├── 从任务开始
│   ├── 近期产品更新
│   └── 参考手册入口
├── Codex Guide
│   ├── 学习路线
│   ├── 快速上手
│   ├── 进阶教程
│   ├── 实战案例
│   └── 问题排查
│       ├── 安装
│       ├── 登录
│       ├── 使用
│       ├── 工具接入
│       └── 反馈
├── WorkBuddy Guide
│   ├── 学习路线
│   ├── 快速上手
│   ├── 进阶教程
│   ├── 实战案例
│   └── 问题排查
│       ├── 安装
│       ├── 登录
│       ├── 使用
│       ├── 工具接入
│       └── 反馈
└── 参考手册
    ├── 精选资源
    ├── 近期 Codex 更新
    ├── 近期 WorkBuddy 更新
    └── 参考来源和致谢
```

顶部一级导航固定为：`首页`、`Codex Guide`、`WorkBuddy Guide`、`参考手册`。进入任一产品 Guide 后，左侧导航只呈现该产品的五个栏目；问题排查不再作为站点独立一级导航。

## Page Strategy

### Home

首页承担产品分流，而不是继续作为 Codex 的教程目录。

1. 顶部为站点品牌、四个一级导航与搜索入口。
2. 首屏标题使用“选择合适的 Agent，推进真实工作。”，说明站点帮助用户按任务选择产品。
3. 两个不对称但结构一致的产品入口并列出现：Codex Guide 与 WorkBuddy Guide。每个入口展示适用场景、五个学习栏目及进入按钮。
4. “从任务开始”将写代码、整理资料、自动化办公、研究与分析、排查问题作为场景入口。
5. 底部以列表呈现近期 Codex 更新、近期 WorkBuddy 更新和参考手册入口。

### Codex Guide

将现有 `start`、`advanced`、`recipes`、`troubleshooting` 内容迁至 `codex/` 语义路径，旧路径通过重定向或兼容页保留。既有 Codex 排障内容按安装、登录、使用、工具接入、反馈重组。

### WorkBuddy Guide

创建与 Codex Guide 对称的 `workbuddy/` 路径和五个栏目。首轮先提供明确的栏目首页、学习路线和来源说明；后续基于 `AlephAITech/WorkBuddyGuide` 的公开教程补充具体章节、案例与排障。任何直接复制或改编的内容必须保留 MIT 许可证、版权声明、可追溯来源和本项目的改编说明。

### Reference Manual

公共手册不使用产品主题色。其栏目为精选资源、近期 Codex 更新、近期 WorkBuddy 更新和参考来源与致谢。已有 Codex 更新和资源内容会迁入相应栏目；WorkBuddy 更新保留独立页面与来源链接。

## Visual System

### Shared Foundation

- 背景：冷白 `#F4F7FA`；内容表面：白色 `#FFFFFF`。
- 主文字：深蓝灰 `#172B3A`；辅助文字：`#5B6977`；分隔线：`#DBE3EA`。
- 公共手册及中性导航色：深海军蓝 `#073B5C`。
- 卡片圆角只使用 6 至 8px；用细分隔线和留白组织内容，不使用层层嵌套卡片。
- 字体优先使用 `PingFang SC`、`Hiragino Sans GB`、`Microsoft YaHei` 等中文系统字体，避免额外加载造成布局跳动。

### Product Themes

| Area | Main | Soft surface | Use |
| --- | --- | --- | --- |
| Codex Guide | `#5B63E8` | `#EEF0FF` | 当前导航、按钮、重点链接、步骤状态 |
| WorkBuddy Guide | `#00B982` | `#E6F9F2` | 当前导航、按钮、重点链接、步骤状态 |
| Reference Manual | `#073B5C` | `#E9F0F4` | 中性列表、更新与来源内容 |

颜色区分来自两个产品 App 图标：Codex 使用蓝紫/长春花蓝，WorkBuddy 使用薄荷绿/翡翠绿。产品图标作为入口和产品页的首要识别物，避免只靠颜色区分。

## Interaction And Responsive Behavior

- 产品入口整卡和主按钮都可进入相应 Guide。
- 顶部与左侧导航必须使用稳定路径，所有内部链接经构建链接检查。
- 场景入口可先链接到对应 Guide 栏目或问题排查首页；在内容足够后再提供跨产品筛选。
- 窄屏下顶部导航收拢为菜单；产品入口由双列改为单列；任务入口从五列调整为两列或单列，内容不截断。
- 所有主题色组合满足正文与交互控件可读性；hover 和 focus 使用明确边框或色阶变化，不依赖颜色作为唯一状态。

## Technical Direction

- 保留 VuePress 2、现有构建和本地链接检查脚本。
- 更新全局站点名称、SEO、基础路径、导航、侧边栏、首页组件与全局样式。
- 新增可复用的产品主题配置，不为 Codex 和 WorkBuddy 分别复制同一套 Vue 组件或 CSS。
- 新仓库默认部署地址基于 `https://lukanytsu7551.github.io/how-to-use-agent-guide/`；自定义域名仅在用户明确决定后配置。
- 不在 GitHub Pages 前端嵌入任何 API 密钥。现有本地问题助手仍保留本地规则回退；未来真实 AI 问答需单独部署服务端代理。

## Content And License Boundaries

- 现有 Codex 内容是新站的迁移基线，保留已有适用许可与来源说明。
- WorkBuddyGuide 为参考和内容来源。直接复制、改编或结构性引用时，在参考来源和致谢页记录原始仓库、具体来源页、许可证和改编范围。
- 未完成来源核验的 WorkBuddy 内容使用“待补充”状态，不伪造安装步骤、产品能力或更新日期。

## Delivery Sequence

1. 建立站点品牌、基础路径、共享主题 token、首页与一级导航。
2. 将 Codex 内容映射到 `codex/` 下的五个栏目，并修复内部链接与旧路径兼容。
3. 建立 WorkBuddy 对称栏目、来源页和首批经核验的学习入口。
4. 重建公共参考手册及更新页面。
5. 在桌面和移动端检查首页、两个 Guide 首页、侧边栏、链接和主题状态；构建并检查全部生成链接。

## Acceptance Criteria

- 网站标题、导航和首页清晰表明产品为 `How to Use Agent`，而非单一 Codex 教程。
- Codex Guide 与 WorkBuddy Guide 均有学习路线、快速上手、进阶教程、实战案例和问题排查五个入口。
- 每个产品的问题排查入口内部按安装、登录、使用、工具接入、反馈组织。
- 参考手册拥有精选资源、近期 Codex 更新、近期 WorkBuddy 更新、参考来源和致谢四个入口。
- Codex 蓝紫与 WorkBuddy 薄荷绿仅用于对应产品主题，公共页面保持中性企业级视觉。
- 旧 Codex 内容可访问，新增及迁移的内部链接没有构建时 404。
- WorkBuddy 的引用、许可证和改编来源可追溯。
