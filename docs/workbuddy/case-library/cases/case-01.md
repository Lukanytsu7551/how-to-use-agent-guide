# Case 01｜公众号封面图，AI 一秒给我 5 张选

> **WorkBuddy 案例集 · 第 1 篇**
> 分类：内容创作与新媒体运营

---

## 一、场景描述

一个日更公众号的自媒体运营者，每天写完文章后最耗时的环节不是写作本身，而是**制作封面图**。

传统流程需要在 Canva 或稿定设计中完成：搜模板 → 改字 → 改颜色 → 调尺寸 → 导出 → 上传公众号，整套流程至少 20 分钟，遇到不满意的模板甚至要折腾一个小时。一个月下来，光做封面就花了将近 10 个小时。

核心痛点：**重复性高、耗时大、模板与文章内容匹配度低**。

## 二、想要完成的任务

写完文章后，用一句话让 AI 自动生成 5 张不同风格的公众号封面图（900×383 像素，2.35:1 比例），从中选择一张最合适的，并直接发布到公众号草稿箱。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| HTML 封面图生成 | 根据文章内容自动生成多个不同风格的 HTML 封面文件，每个可独立预览 | WorkBuddy 内置代码生成能力 | 无额外权限 |
| AI 选图建议 | 根据文章风格、目标读者、平台特性分析每张封面的适配度并给出推荐 | WorkBuddy 对话推理 | 无额外权限 |
| Playwright 截图 | 将选中的 HTML 封面自动截图为 PNG 图片 | WorkBuddy 内置浏览器自动化 | 本地文件读写权限 |
| 微信公众号 API 发布 | 将封面图 + 文章内容一起推送到公众号草稿箱 | 自定义 Skill（`baoyu-post-to-wechat`） | 微信公众号 AppID / AppSecret；草稿箱写入权限 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 桌面端。
2. 已有一篇写好的公众号文章（Markdown 或纯文本均可）。
3. 如需自动发布到草稿箱：已配置微信公众号 API 凭证（AppID / AppSecret），并安装 `baoyu-post-to-wechat` Skill。
4. 如仅生成封面图无需发布：无额外配置要求。

## 五、在 WorkBuddy 中的操作

### 步骤 1：生成 5 张封面图

将文章内容发给 WorkBuddy，输入以下指令：

> **任务指令：**
> ```
> 帮我生成5张封面图。
> ```

**输入**：文章正文（Markdown 或纯文本）

**关键步骤**：WorkBuddy 自动读取文章内容 → 生成 5 个不同风格的 HTML 封面文件 → 逐一打开预览。

生成的 5 种风格：

| 风格 | 说明 |
|---|---|
| 风格 1 · 紫色科技风 | 深紫渐变，底部 5 色缩略图条，第一张高亮 |
| 风格 2 · 蓝色网格风 | 深蓝 + 网格纹理，底部 5 个颜色卡片标签 |
| 风格 3 · 橙色数据风 | 暗底 + 橙色强调，底部 3 个数据（5 种风格 / <1 分钟 / 18→0 分钟） |
| 风格 4 · 绿色清新风 | 深绿渐变，底部流程条（说一句话 → 5 张预览 → 选一张发布） |
| 风格 5 · 靛蓝对话风 | 暗靛蓝，底部模拟聊天对话 |

### 步骤 2：让 AI 帮你选一张

5 张图摆出来后，如果拿不定主意，可以让 AI 帮忙分析：

> **任务指令：**
> ```
> 你觉得哪张最好？
> ```

**关键步骤**：WorkBuddy 结合文章主题、目标读者和平台特性给出推荐理由。例如它会指出风格 3 的橙色在信息流中更跳眼、底部数据直接呈现核心卖点，而风格 5 的对话设计在封面上"有点绕，读者第一眼看不懂"。

### 步骤 3：截图并发布到草稿箱

选定封面后，一句话完成发布：

> **任务指令：**
> ```
> 用这张图发到草稿箱。
> ```

**关键步骤**：WorkBuddy 用 Playwright 将选中的 HTML 封面截图为 PNG → 调用微信公众号 API 上传封面图 → 将文章内容 + 封面图一起推送到草稿箱 → 返回发布结果（含 media_id、标题、文章类型）。

## 六、提示词或任务指令

完整流程只需 3 条指令：

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `帮我生成5张封面图。` | 根据文章内容生成 5 张不同风格封面 |
| 2 | `你觉得哪张最好？` | 让 AI 分析并推荐最合适的封面 |
| 3 | `用这张图发到草稿箱。` | 截图 + 上传 + 推送草稿箱 |

## 七、在 WorkBuddy 中的效果

### 交付物

1. **5 张不同风格的封面图 HTML 文件**（900×383 像素，公众号 2.35:1 比例）
2. **1 张 PNG 封面图**（从选中风格截图生成）
3. **1 篇公众号草稿**（含封面图 + 文章正文）

### 结果证明

**5 张封面预览总览：**

![5张封面图总览](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRM8lovODlGUn1l1Z9rTFoFhR9p7rjTwbUfibCfhZRHZZMWENngRazoGQMibTwcwkba152dWLmpfQdk8Xibb51syNPa7zF28aOA0HI/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

**5 种风格逐一展示：**

![紫色科技风封面](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRPOy7k6GjkEpHUeoicmNNovw3ej8LlbXjZJlbfC8kRSn1TRcqUiaxl8HQbib8j1qh700XLp3JGd8MtyicicKco9tpNMz5X1Dy9uUmGY/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

![蓝色网格风封面](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRMosy8F0ujRk6YZffwPgFfHBC2bGYibnJPzerUGVxxztEOEn0Oo8tzysuOuqJ7B5UMMh5fA2Ig9gtmPg9ps3ujia366c9gFEPer4/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

![橙色数据风封面](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRMOwNWA0ibcFaBXJeJcl23A0oI8DUnUt4JwcmxvAr499F3JPDvsMAagD4ibzujkXOw5gVYwI1UkPSbVzRxPQ2usYN4XkROyaKtWM/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

![绿色清新风封面](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRPRzGHrkJicbbkzq63RO2WwkHlL58CdUx6c5sAvVMmsiaDicICkC3oD91zMTiaUTUK44yBuQhgAVPdc8IDeCtq0Ma03rfGEJhy41g4/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

![靛蓝对话风封面](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRPFq3dziaDmvPxjhXgx695w96umGeqrOvJJyPibccibI6aeRhH4iaaQP5MSmFK57IYUcfSnmY1tzsf64iaykvYRMOaK0IdA14shDjrI/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

**AI 选图建议对话：**

![AI选图建议对话](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRMlCqWmgk1U6eWOnYHMUtDhD0gXgcsM5jjoZjibEyKtHuGibO1ZYHrXambDAcnq8ibibMLQWjoR9friaaW00t5RdicomibbdiaibeoXsl80/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

**发布到草稿箱结果：**

![发布到草稿箱结果](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRPavbwZft4CZwyIvhMRtGzmLM2cljSSfNXxibCcOPE52t1u9bkFLLtjEhMcwav1Ukd46icyd7UP1t9eBSE0NUIxEPRpgicuWh5Wk8/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

### 时间对比

| 环节 | 传统手动 | 使用 WorkBuddy |
|---|---|---|
| 找模板 / 改字 / 调色 / 导出 / 上传 | 约 18 分钟 | — |
| 说"帮我生成封面图" | — | 5 秒 |
| 看 5 张预览选一张 | — | 30 秒 |
| 说"用这张发草稿箱" | — | 5 秒 |
| **合计** | **约 18 分钟** | **不到 1 分钟** |

每天省 15 分钟，一个月就是 **7.5 小时**。而且每张封面都是根据文章内容量身定制，不会出现图文不搭的情况。

## 八、验收标准

- [ ] WorkBuddy 一次性生成 **5 张**不同风格的封面图 HTML 文件
- [ ] 每张封面尺寸为 **900×383 像素**（公众号封面 2.35:1 比例）
- [ ] 封面文字内容与文章主题**直接相关**，无错别字
- [ ] 选定封面后，能**自动截图为 PNG** 并成功上传
- [ ] 文章 + 封面成功推送到公众号草稿箱，API 返回 `success: true`
- [ ] 全流程耗时 **< 2 分钟**（含人工选择时间）
- [ ] 草稿箱中可正常预览封面图和文章正文
