# Case 84｜我用HTML写了一支30秒竖屏视频，配音还是AI

> **WorkBuddy 案例集 · 第 84 篇**
> 分类：视频与图像生成

---

## 一、场景描述

写完上一篇公众号文章后想给每篇文章都配一支短视频发视频号。但不会剪视频——打开剪映就头皮发麻，时间轴、关键帧、转场特效看着就想关掉。发现 HeyGen 出的开源项目 HyperFrames，专为 AI Agent 设计。本篇记录如何用 WorkBuddy + HyperFrames 把公众号文章 #83 的内容做成 30 秒竖屏视频，过程中翻车三次：英文 TTS 听不懂、横屏加黑边变邮票、HyperFrames 特殊语法报错。最终 1080×1920 竖屏视频 + 中文 edge-tts 配音跑通。

## 二、想要完成的任务

使用 WorkBuddy 调用 HyperFrames CLI，基于 #83 文章内容生成 30 秒视频（5 个场景：Hook 开场 / 痛点共鸣 / 三步方案 / 四步操作 / CTA 关注），用 GSAP 驱动动画时间线，headless Chrome 逐帧截图 + FFmpeg 合成 MP4。中途切 Kokoro TTS → edge-tts「晓晓」女声 1.15x 语速，横屏 1920×1080 → 竖屏 1080×1920 重写 composition，修复 HyperFrames 特殊语法（data-composition-id / window.__timelines），最终输出 30 秒 1080×1920 竖屏视频 + 配音。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| HyperFrames CLI | 写 HTML composition 渲染成 MP4 视频 | HeyGen 开源项目（Apache 2.0） | 本地安装 |
| Bun 运行时 | HyperFrames 底层运行时 | 系统依赖 | 本地安装 |
| FFmpeg | MP4 合成、音轨合并、视频格式转换 | 系统工具 | 本地安装 |
| edge-tts（微软语音） | 中文 TTS 配音（晓晓女声 1.15x 语速） | Python 包 | pip 安装 |
| WorkBuddy Agent | 写 HTML composition、修 bug、跑渲染、合成音轨 | WorkBuddy 内置 | WorkBuddy 账号 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 本地已安装 Bun 运行时
3. 本地已安装 FFmpeg
4. 本地有 Python 环境可 pip 安装 edge-tts

## 五、在 WorkBuddy 中的操作

### 步骤 1：装 HyperFrames + 写 composition
WorkBuddy 先检查环境：Bun 已装、FFmpeg 已装，只差 HyperFrames CLI。装完就开始写 composition。HyperFrames 的 composition 是一个 HTML 文件，5 个场景：0-5s Hook 开场「给你的公众号装一个 AI 客服」、5-11s 痛点共鸣「关键词回复太蠢」、11-17s 三步解决方案、17-24s 四步操作详解、24-30s CTA + 关注引导。每个场景是一个 `<div class="scene">`，用 GSAP 驱动进出动画。WorkBuddy 一口气把整份 HTML 写出来，色彩方案、字体大小、动画节奏都定好。
**关键步骤**：装 HyperFrames CLI，写 5 场景 composition.html，用 GSAP 驱动动画。

### 步骤 2：跑 hyperframes render 出横屏视频
跑 `hyperframes render`，一分钟不到，1920×1080 横屏视频出来，30fps，H.264 编码。
**关键步骤**：渲染横屏 1920×1080 30fps H.264 MP4。

### 步骤 3：翻车一——换中文 TTS
点开视频一看，画面没问题，但配音是英文乱码。HyperFrames 自带 TTS 用 Kokoro 模型，只支持英文，读中文变乱码发音。WorkBuddy 立刻切方案：用 edge-tts（微软语音服务），选「晓晓」女声，语速 1.15x。重新生成配音，清晰流畅，29.7 秒，完美匹配 30 秒视频。
**关键步骤**：Kokoro 翻车 → 换 edge-tts「晓晓」1.15x 语速，29.7 秒配音。

### 步骤 4：翻车二——横屏加黑边变邮票
横屏视频看着还行，但需要的是竖屏（视频号、抖音都是 9:16）。第一次偷懒直接用 ffmpeg 加黑边，把 1920×1080 塞进 1080×1920 画布，结果画面只有 1070×607 大，上下各 650 多像素黑边，手机上看像看邮票。WorkBuddy 重写 composition：画布改 1080×1920、文字全部加大（标题 118px、正文 46-48px）、布局从左右流改成上下流、每个场景加渐变背景和氛围光。
**关键步骤**：竖屏重写 composition，画布 1080×1920，文字加大，布局上下流。

### 步骤 5：翻车三——修 HyperFrames 特殊语法
渲染又挂，报错「No GSAP timeline registered」和「Root composition missing data-composition-id」。HyperFrames 有自己的规则：根元素必须有 `data-composition-id="root"`、`data-width`、`data-height`、`data-duration`；每个场景需要 `data-start` 和 `data-duration`；GSAP 时间线必须注册到 `window.__timelines["root"]`。WorkBuddy 看到报错直接把结构修对。第三次渲染跑通：30 秒，1080×1920，3.3MB。用 ffmpeg 把 edge-tts 配音合进去，完美。
**关键步骤**：修复 HyperFrames 特殊语法（data-composition-id / window.__timelines），第三次渲染跑通。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `HyperFrames 你知道这个吗？` | 让 WorkBuddy 介绍 HyperFrames 项目 |
| 2 | `基于 #83 的文章内容，生成一支 30 秒的视频。` | 生成 HTML composition |
| 3 | `你给我生成的什么配音？我一点都听不懂。` | 发现 Kokoro TTS 翻车，切换 edge-tts |
| 4 | `帮我把这个处理成竖屏的视频。` | 横屏 → 竖屏（重写 composition） |
| 5 | `完成了吗？` | 触发 HyperFrames 语法修复 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 30 秒竖屏视频（1080×1920，30fps，H.264，3.3MB）
2. 5 场景 HTML composition（Hook / 痛点 / 三步方案 / 四步操作 / CTA）
3. 中文配音音频（edge-tts「晓晓」女声 1.15x 语速，29.7 秒）

### 结果证明

![HyperFrames 项目介绍](/images/workbuddy-cases/case-84/01.png)

![写 composition 并渲染](/images/workbuddy-cases/case-84/02.png)

![Kokoro 翻车切 edge-tts](/images/workbuddy-cases/case-84/03.png)

![竖屏处理方案](/images/workbuddy-cases/case-84/04.png)

![修复 HyperFrames 特殊语法](/images/workbuddy-cases/case-84/05.png)

## 八、验收标准

- [ ] 已安装 HyperFrames CLI（Bun 运行时 + FFmpeg 已装）
- [ ] composition.html 含 5 场景（0-5s Hook / 5-11s 痛点 / 11-17s 三步方案 / 17-24s 四步操作 / 24-30s CTA）
- [ ] 每个场景是 `<div class="scene">`，用 GSAP 驱动进出动画
- [ ] 第一次渲染输出 1920×1080 30fps H.264 MP4
- [ ] Kokoro TTS 翻车后切换 edge-tts
- [ ] edge-tts 选「晓晓」女声，语速 1.15x
- [ ] 配音时长 29.7 秒，完美匹配 30 秒视频
- [ ] 横屏加黑边方案被否（上下各 650+ 像素黑边）
- [ ] composition 重写：画布 1080×1920，标题 118px，正文 46-48px
- [ ] 布局从左右流改成上下流，每场景加渐变背景和氛围光
- [ ] 根元素已加 `data-composition-id="root"`、`data-width`、`data-height`、`data-duration`
- [ ] 每个场景已加 `data-start` 和 `data-duration`
- [ ] GSAP 时间线已注册到 `window.__timelines["root"]`
- [ ] 第三次渲染跑通：30 秒 1080×1920 3.3MB MP4
- [ ] ffmpeg 已把 edge-tts 配音合并进视频
- [ ] 全程在 WorkBuddy 聊天框里说指令，没碰剪映、没调时间轴
