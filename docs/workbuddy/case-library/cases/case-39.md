# Case 39｜用 WorkBuddy 自动录制 HTML+CSS 动画为视频

> **WorkBuddy 案例集 · 第 39 篇**
> 分类：视频与图像生成

---

## 一、场景描述

精心制作了一个 HTML+CSS 动画页面，却不知道如何把它变成视频？本次场景源自一个真实需求：用 HTML+CSS 实现一个 20 秒的"AI Weekly"新闻速递动画，包含片头标题弹入动画、5 条新闻依次滑入、渐变色背景+粒子效果、自动时间轴切换。动画做好了，问题来了——如何在公众号文章中展示这个动画？

可选方案有三个：方案 A 直接放 HTML 链接（用户需要点击跳转，体验差）；方案 B 录制屏幕（手动操作繁琐，效果不稳定）；方案 C 用 WorkBuddy 自动录制（一键完成，专业效果）。最终选择方案 C，让 WorkBuddy 自动完成从 HTML 到 MP4 的全过程。

WorkBuddy 接到"帮我把这个 HTML 动画录制成视频"的指令后，自动检测系统环境（检查 ffmpeg、Playwright）、安装缺失依赖（npm install playwright）、生成 Node.js 录制脚本（record-video.js）、运行脚本录制为 webm、再用 ffmpeg 转换为 MP4。最终产出 1.4MB、20 秒、1920x1080 的视频文件，可直接插入公众号文章。以前手动录制需要 5-10 分钟还容易录错，现在一键完成耗时不到 1 分钟。

## 二、想要完成的任务

用 WorkBuddy 自动把一个 1920x1080、20 秒自动循环的 HTML+CSS 动画文件录制为 MP4 视频，无需手动录屏，无需查文档装依赖。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| 环境感知能力 | 自动检测系统已安装的 ffmpeg、Playwright | 内置能力 | 系统命令执行 |
| 依赖管理能力 | 自动安装缺失的 npm 包（npm install playwright） | 内置能力 | npm 安装权限 |
| 脚本生成能力 | 根据需求生成可执行的 Node.js 录制脚本 record-video.js | 内置能力 | 本地文件读写 |
| Playwright（无头浏览器） | 加载 HTML 页面并录制视频（webm 格式） | 自动安装的依赖 | 本地文件读写 |
| ffmpeg | 把 webm 转换为 MP4（libx264 + crf 22） | 系统工具 | 系统命令执行 |
| 错误处理与自修复 | 遇到问题时自动调试与修复 | 内置能力 | 本地文件读写 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 准备好一个完整的 HTML 动画文件（如 ai-weekly-fixed.html），建议固定分辨率 1920x1080、使用 CSS @keyframes 动画、JavaScript 控制时间轴切换、避免依赖外部资源
3. 系统可执行 npm 命令（用于安装 Playwright）
4. 系统可执行 ffmpeg 命令（用于格式转换，缺失时 WorkBuddy 会提示安装）
5. 工作区可写入文件（用于保存 record-video.js 与输出视频）

## 五、在 WorkBuddy 中的操作

### 步骤 1：准备 HTML 文件
准备好一个完整的 HTML 动画文件（ai-weekly-fixed.html），包含：1920x1080 分辨率（标准视频尺寸）、20 秒自动循环动画、多个场景自动切换。设计原则：固定分辨率、使用 CSS 动画（@keyframes）、JavaScript 控制时间轴切换、避免依赖外部资源。
**关键步骤**：HTML 文件自包含、无外部依赖，确保录制时离线可用。

### 步骤 2：让 WorkBuddy 安装工具
直接说"帮我把这个 HTML 动画录制成视频"。WorkBuddy 自动：① 检测系统环境（检查 ffmpeg、Playwright 是否已安装）；② 安装缺失的依赖（npm install playwright）；③ 创建录制脚本。
**关键步骤**：环境感知 + 依赖管理全自动，无需手动查文档装依赖。

### 步骤 3：自动录制
WorkBuddy 生成一个 Node.js 脚本（record-video.js），核心逻辑：用 chromium.launch 启动浏览器（headless: false、--start-maximized），用 browser.newContext 创建上下文（viewport 1920x1080、recordVideo dir 与 size 1920x1080），用 page.goto 加载 file:// 协议的 HTML 文件，用 page.waitForTimeout(21000) 等待动画完成，最后 context.close 与 browser.close 保存视频。运行脚本：node record-video.js。WorkBuddy 自动打开浏览器、加载 HTML 页面、录制 20 秒动画、保存为 webm 格式。
**关键步骤**：recordVideo 配置 size 与 HTML 分辨率保持一致（1920x1080），waitForTimeout 时长略大于动画时长（21 秒 vs 20 秒）。

### 步骤 4：转换为 MP4
Playwright 录制的是 webm 格式，需要转换为 MP4。WorkBuddy 自动执行 ffmpeg 命令：ffmpeg -i input.webm -c:v libx264 -preset fast -crf 22 output.mp4。最终效果：文件大小 1.4MB、视频时长 20 秒、分辨率 1920x1080、可直接插入公众号文章。
**关键步骤**：-preset fast 平衡编码速度与压缩率，-crf 22 控制画质（数值越小画质越高）。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `帮我把这个HTML动画录制成视频` | 触发 WorkBuddy 自动检测环境、安装依赖、生成录制脚本 |
| 2 | `ffmpeg -i input.webm -c:v libx264 -preset fast -crf 22 output.mp4` | WorkBuddy 自动执行的格式转换命令（webm → MP4） |

## 七、在 WorkBuddy 中的效果

### 交付物
1. Node.js 录制脚本 record-video.js（Playwright + chromium + recordVideo 配置）
2. webm 格式原始录制文件（Playwright 输出）
3. MP4 格式最终视频（1920x1080、20 秒、1.4MB、libx264 编码）
4. 可直接插入公众号文章的视频素材

### 结果证明

![HTML 文件经 Playwright 录制为 MP4 视频的流程示意](/images/workbuddy-cases/case-39/01.png)

### 传统方式 vs WorkBuddy 方式

| 步骤 | 传统方式 | WorkBuddy 方式 |
|---|---|---|
| 安装工具 | 手动查文档、装依赖 | 自动检测并安装 |
| 编写脚本 | 查 API 文档、调试代码 | 自动生成可用脚本 |
| 录制视频 | 手动操作、容易出错 | 一键运行、稳定可靠 |
| 格式转换 | 查 ffmpeg 命令参数 | 自动执行并验证 |
| 总耗时 | 5-10 分钟 | 不到 1 分钟 |

### WorkBuddy 核心能力

| 能力 | 说明 |
|---|---|
| 环境感知 | 自动检测系统已安装的 tools |
| 依赖管理 | 自动安装缺失的 npm 包 |
| 脚本生成 | 根据需求生成可执行的代码 |
| 错误处理 | 遇到问题时自动调试和修复 |
| 格式转换 | 自动调用 ffmpeg 转换视频格式 |

## 八、验收标准

- [ ] WorkBuddy 自动检测系统环境（ffmpeg、Playwright 是否已安装）
- [ ] 缺失依赖自动安装（npm install playwright）
- [ ] 生成 Node.js 录制脚本 record-video.js（chromium.launch + newContext + recordVideo）
- [ ] recordVideo 配置 size 与 HTML 分辨率一致（1920x1080）
- [ ] page.waitForTimeout 时长略大于动画时长（21 秒 vs 20 秒）
- [ ] 运行脚本后成功生成 webm 格式原始录制文件
- [ ] 自动执行 ffmpeg 命令把 webm 转换为 MP4（-c:v libx264 -preset fast -crf 22）
- [ ] 最终 MP4 视频规格：1920x1080、20 秒、约 1.4MB
- [ ] MP4 视频可直接插入公众号文章
- [ ] 全流程一键完成，耗时不到 1 分钟
- [ ] 全程无需手动查文档或装依赖
