# Case 02｜公众号配图背景乱？AI 一键批量统一

> **WorkBuddy 案例集 · 第 2 篇**
> 分类：内容创作与新媒体运营

---

## 一、场景描述

做公众号久了，最容易忽略的细节大坑不是写文章本身，而是**配图背景不统一**。

一位自媒体作者在撰写《AI 都这么强了，为什么我们反而更累了》时，文章需要配 3 张数据图表：AI 普及率趋势、工具泛滥现象、两种工作模式对比。图表内容由 WorkBuddy 直接生成 HTML 可视化图，数据排版好看，但存在一个突出问题——三张图里，1 张是白色背景（chart1），2 张是深色背景（chart2、chart3，深蓝渐变 `#1a1a2e`）。单独看都挺好看，放到一起就很奇怪。

公众号文章正文背景是白色的。白底配白图看不清，白底配深色图像贴了煤块，怎么看都别扭。手动处理一张图要打开 PS/Figma、找背景图层、改色、调整文字颜色、重新导出，一张约 7 分钟，三张就是 20 分钟，重复且烦琐。

## 二、想要完成的任务

用一句话让 WorkBuddy 把三张图表的背景批量统一改成深色，并自动重新截图，使其与公众号正文风格协调一致。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| HTML 文件批量编辑 | 定位并修改 chart1/chart2/chart3 三个 HTML 图表文件的背景色与文字配色 | WorkBuddy 内置代码编辑能力 | 本地文件读写权限 |
| 配色方案适配 | 背景改深后同步调整文字、图表元素颜色，保持可读性与对比度 | WorkBuddy 对话推理 | 无额外权限 |
| Playwright 截图 | 修改完成后重新对三个 HTML 文件截图生成 PNG | WorkBuddy 内置浏览器自动化 | 本地文件读写权限 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 桌面端。
2. 已有用 WorkBuddy 生成的 HTML 图表文件（chart1.html、chart2.html、chart3.html）。
3. 图表文件存放在本地可访问的目录中。

## 五、在 WorkBuddy 中的操作

### 步骤 1：用一句话描述问题并下达指令

把背景不统一的问题直接丢给 WorkBuddy，说明现状和目标。

**关键步骤**：WorkBuddy 接收指令后自动定位三个 HTML 图表文件，识别出白色背景的 chart1，并开始批量处理。

### 步骤 2：批量修改背景与配色

WorkBuddy 自动执行以下调整：

- 背景：白色 → 深蓝渐变（`#1a1a2e`）
- 文字：深灰 → 白色
- 图表颜色：橙色/蓝色主色调保留，对比度调整到适合深色底展示
- 三个文件一次性全部处理完

**关键步骤**：WorkBuddy 不只是改一个参数，而是把整套配色方案做了重新适配——原来白色背景下的深色文字在背景改深后自动变浅，保持可读性。

### 步骤 3：重新截图并预览

处理完成后，WorkBuddy 调用 Playwright 对三个 HTML 文件重新截图，生成统一的深色版配图，并打开预览确认效果。

**关键步骤**：三张图都是深色背景，没有突兀感，与正文风格统一。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `这三张图背景色不统一，有1张白色2张深色，放到公众号里和白底都不搭，能帮我批量把背景统一改成深色吗？` | 描述问题并要求批量统一背景 |

## 七、在 WorkBuddy 中的效果

### 交付物

1. **3 张背景统一的深色版 HTML 图表文件**（chart1、chart2、chart3）
2. **3 张重新截图生成的 PNG 配图**（可直接插入公众号文章）

### 结果证明

**修改前：三张图背景不统一（1 白 2 深）**

![修改前配图背景不统一](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRNNFX2oVncQE6oSU6NwheBXZ4yQJD4d4weqNFlZjQf8bFKnbz7ib7otEx2FJNkOyJrxA9A2He7YMvKOibcGIy1XA5rvPIPvh8pA0/640?wx_fmt=png&watermark=1#imgIndex=0)

![修改前深色背景配图](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRNYzMELKPM4bicLxpiaHulHEdCo9SvNU4NRFH5f8p26eeR8Zmr9F2XLfKMKH6e8y3J0CtQs4ZBEd48E2X02UHAzz1Z0Slkj8IjCc/640?wx_fmt=png&watermark=1#imgIndex=1)

![修改前模式对比图](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRPaYA4PEDjpX56dZRawwxaa23cFOMT7VoLULXHFIuKpIOjdNoZ0wuibiaJbcNjLfLtLRcvX67SLH3fdW1aicKlnQb8ibx1whvmbY60/640?wx_fmt=png&watermark=1#imgIndex=2)

**WorkBuddy 修改对话过程**

![WorkBuddy修改对话过程](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRNJYABSp7AyebloM3qpC4PVxRhLUxXAhqPkBYXpnm2CpyURy9mSLdYnMic1lhRQf6VgZAYvN8L33c1LWzibbR0licweSN8Rbfb8Bk/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

**修改后：三张图背景统一为深色**

![修改后配图背景统一](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRPCMsllmnll2P1wXopNjDuFIPKrtkKuJicGAjdq4DkekmnAVmgMnuT9zqTR4eyZPQ9gq7dE2xScZREpy2eSjDqKnhtrNNnLtHy0/640?wx_fmt=png&watermark=1#imgIndex=4)

![修改后工具泛滥图](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRNYzMELKPM4bicLxpiaHulHEdCo9SvNU4NRFH5f8p26eeR8Zmr9F2XLfKMKH6e8y3J0CtQs4ZBEd48E2X02UHAzz1Z0Slkj8IjCc/640?wx_fmt=png&watermark=1#imgIndex=5)

![修改后模式对比图](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRPaYA4PEDjpX56dZRawwxaa23cFOMT7VoLULXHFIuKpIOjdNoZ0wuibiaJbcNjLfLtLRcvX67SLH3fdW1aicKlnQb8ibx1whvmbY60/640?wx_fmt=png&watermark=1#imgIndex=6)

### 时间对比

| 环节 | 传统手动 | 使用 WorkBuddy |
|---|---|---|
| 打开 PS/Figma | 2 分钟 | — |
| 找到背景图层 | 1 分钟 | — |
| 改背景色 | 1 分钟 | — |
| 调整文字颜色 | 2 分钟 | — |
| 重新导出 | 1 分钟 | — |
| 单张合计 | 约 7 分钟 | — |
| 三张合计 | 约 20 分钟 | — |
| 说"帮我把这三张图背景改成深色" | — | 10 秒 |
| 等待处理完成 | — | 约 30 秒 |
| 三张合计 | — | 不到 1 分钟 |

## 八、验收标准

- [ ] WorkBuddy 一次性处理 **3 张** HTML 图表文件，无需逐张操作
- [ ] chart1 背景从白色改为深蓝渐变（`#1a1a2e`），与 chart2、chart3 一致
- [ ] 文字颜色随背景变化自动调整（深灰 → 白色），保持可读性
- [ ] 图表主色调（橙色/蓝色）保留，对比度适合深色底展示
- [ ] 处理完成后自动重新截图生成 PNG，可直接插入公众号
- [ ] 三张图放在白底正文中无明显突兀感
- [ ] 全流程耗时 **< 1 分钟**
