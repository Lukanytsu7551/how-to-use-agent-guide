# Case 68｜让AI帮你发小红书，全程不到10分钟

> **WorkBuddy 案例集 · 第 68 篇**
> 分类：内容创作与新媒体运营

---

## 一、场景描述

打开 WorkBuddy 问了一句「你能帮我发小红书吗？」就这么简单一句话，开启了一段全程不到 10 分钟的旅程。WorkBuddy 先检查能力：内容生成能做（已安装 xhs-content-gen、xiaohongshu-writer-expert 两个技能），但直接发布做不了（没有小红书 MCP 连接器）。不信邪，让它去 GitHub 搜，找到了 14k Star 的 xiaohongshu-mcp 项目。从下载安装、配置 MCP、扫码登录、信任连接器，到生成内容、即梦 AI 配图、一键发布，全链路自动化。

## 二、想要完成的任务

用 WorkBuddy 从 GitHub 找到并安装 xiaohongshu-mcp 连接器，配置 MCP 服务并扫码登录小红书，然后一句话生成 WorkBuddy 使用心得图文笔记内容，用即梦 AI 生成 3 张无水印配图，调用 publish_content 工具一键发布到小红书平台。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| xhs-content-gen / xiaohongshu-writer-expert | 生成小红书爆款文案（标题、正文、标签、配图描述） | WorkBuddy 技能市场 | 无 |
| xiaohongshu-mcp（MCP 连接器） | 小红书平台操作：发布图文/视频、搜索/评论/点赞/收藏、用户资料 | GitHub 开源（xpzouying/xiaohongshu-mcp，14k Star） | 小红书账号 |
| 即梦 AI 图片生成 | 生成 1080×1440 无水印配图 | WorkBuddy 内置 | 无 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 已安装 xhs-content-gen 和 xiaohongshu-writer-expert 技能
3. 拥有小红书账号（能用 App 扫码登录）
4. macOS x86_64 架构（下载对应版本二进制）

## 五、在 WorkBuddy 中的操作

### 步骤 1：先回答"能不能"
问「你能帮我发小红书吗？」。WorkBuddy 检查能力：内容生成能做（已安装两个技能），直接发布做不了（没有小红书 MCP 连接器）。给出可选方案：① 生成内容手动发布（推荐）；② 浏览器自动化模拟操作（风险高）。
**关键步骤**：WorkBuddy 主动坦白能力边界，不瞎承诺。

### 步骤 2：GitHub 找到宝藏项目
让它去 GitHub 搜。找到 3 个主要项目并对比：xiaohongshu-mcp（14k Star，Go+Python，图文+视频发布，全功能，活跃）；xhs-mcp（Node.js，图文+视频，基本功能，活跃）；RedNote-MCP（1.1k Star，TypeScript，只读，停更）。毫不犹豫选 xiaohongshu-mcp。
**关键步骤**：AI 主动搜索对比选最佳方案。

### 步骤 3：安装配置（全自动）
① 下载二进制文件（curl 下载 darwin-amd64 版本并解压 chmod +x）。小插曲：一开始下了 ARM64 版本，发现 Mac 是 x86_64 架构，自动切换到 AMD64 版本——AI 主动排查错误自修复。② 配置 MCP 连接写入 ~/.workbuddy/mcp.json（url: `http://localhost:18060/mcp`，type: `streamablehttp`）。③ 运行登录工具弹浏览器窗口，用小红书 App 扫码，Cookie 自动保存。④ 启动 MCP 服务器 nohup ./xiaohongshu-mcp-darwin-amd64，跑在 localhost:18060，注册 13 个 MCP 工具。
**关键步骤**：下载错架构自动修复，全程不用操心技术细节。

### 步骤 4：信任连接器验证
在 WorkBuddy 连接器页面找到 xiaohongshu-mcp 点「信任」。信任后验证：已登录，用户名 xiaohongshu-mcp，13 个小红书工具全部可用。工具分类：发布类（publish_content、publish_with_video）、内容发现（list_feeds、search_feeds、get_feed_detail、user_profile）、互动类（post_comment_to_feed、reply_comment_in_feed、like_feed、favorite_feed）、账号类（check_login_status、get_login_qrcode、delete_cookies）。

### 步骤 5：一键生成内容 + AI 配图 + 发布
一句话指令：「帮我发一条小红书图文笔记，主题为 WorkBuddy 使用心得，图片使用即梦生成，无水印。然后发布。」AI 全自动处理：① 以 10 年老程序员视角撰写，标题「用AI写代码是什么体验？WorkBuddy使用心得」，4 个核心卖点，结尾引导互动；② 用即梦图片生成 4.0 生成 3 张 1080×1440 配图（封面图 AI 助手与人类协作场景扁平插画风/功能展示 AI 工具界面特写多面板布局/氛围图居家办公场景温馨治愈风格）；③ 调用 publish_content 工具一键发布，内容发布成功。
**关键步骤**：一句话完成内容生成+图片生成+发布全链路。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `你能帮我发小红书吗？` | 触发能力检查，发现没有 MCP 连接器 |
| 2 | `你去github 找找有没有小红书的 MCP 连接器或发布 API或者 Skill` | 搜索 GitHub 找到 14k Star 的 xiaohongshu-mcp |
| 3 | （安装配置指令，原文未直接引用） | 下载二进制+配置 mcp.json+扫码登录+启动服务器 |
| 4 | `帮我发一条小红书图文笔记，主题为 WorkBuddy 使用心得，图片使用即梦生成，无水印。然后发布。` | 一键生成内容+即梦配图+发布到小红书 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. xiaohongshu-mcp 连接器安装配置成功（13 个工具全部可用）
2. 小红书账号扫码登录成功（Cookie 自动保存）
3. 小红书图文笔记内容（标题「用AI写代码是什么体验？WorkBuddy使用心得」，10 年老程序员视角，4 个核心卖点）
4. 3 张即梦 AI 生成无水印配图（1080×1440：封面图/功能展示/氛围图）
5. 笔记发布成功（标签：AI工具/WorkBuddy/效率工具/AI编程/程序员日常/生产力，原创声明已声明，公开可见）
6. 手机端可查看已发布笔记

### 结果证明

![你能帮我发小红书吗](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRN6JNMAicz8aAMiatTZepicg4xnUxZUzjEgXEyiah2tYcexS7nVxXKMEyic62PxrjRCI9ibNhmPW1oibbXWAOUmYZsiajOPdzTExuXibbeo/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

![能力检查结果](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRN0dT0OicURZth6lkXIVovSwibpGZg1mawONsyaibhnZqSibwpcThINsmj4a5dntVXub3urLmKjMB2uSI2ZhAmr8Xap6FLLiaFSmm7Y/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

![GitHub 搜索](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRMFvVl5vHtLKuvpktaURgTGUdZOIl14UHjOTqZabpmFOzXDNBlD3D5kBiaYm0M9ePtNQCgooHh0RRYwpnrhh6tiaIBN6noEba3U8/640?wx_fmt=png&from=appmsg#imgIndex=2)

![项目对比](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRPPriby8bfYbHEjicC0kQUc0NmyTUx2O0DWde7U57hMRBrNvt41MAbOMzHRMs7vb4R08elflj7cPiaqB99JFs3RxfX6ia3Yd9lwUG0/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

![自动修复架构](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRPwoFGCyOx43P8TUDibBk2ZjW9BoweEYGlMN9Vs5SI4ibAPUBCaYeR3vAMls2RkEootvxmPe3bEW7G5dSX9ftaV8kN2HFt4OhicjQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

![MCP 配置](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRMPwWLQy7qcy5niaRnexDAvjaAvLo2VUf1zfX8z4Bq6qSRnjfCILs9PqfHCM7GOhbLL2VafWBrfQuNSSSXzEdEOdNOaXjIEWq30/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

![扫码登录](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRPMOHr3ZyVic3KQ5WzpD69XmfmUKdmcwcziaQTuNr8wkT326YzXJicpAN9qQRribzxpgNziavnL9Ucv5ezwD0e6Sp11cibGbGeas3Xzg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

![13个工具列表](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRNtdh60a2VtwhhX86gia7zVOn4e8wXwQutzRd9wiaZfCVJZjpmXoK2zuqvklUmmd9XUnabH0stmPddrSHeOuL2tCBwicbCGiavCbGE/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

![信任连接器](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRM26ic1ITTEIBmlkFORC70KPEG6WenjUxKYJtlkibib4uCDJPxT9RGQric2qW9EibAFMTZs0wiaicrIEcoPqCPUt889m52ibQ0yJmzenMA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)

![验证登录成功](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRMcHx1Micpkkz2USVABretUEWSFg3bn9ibyVJ6KD5cFiaj2T3Zoyic1udvR3S0RiaUyXibBGibsIYxSOxOv0Qm9icoqHdwCiabUzp60VnLM/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=9)

![生成的配图文件](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRMHnTQcLlFPEqrwBZ1oBR76jhKdibO5wiabOgW8zRKiaLtDjUHcvicibj1M9ebqD8kjU9ovKLAAlIjyCVnVwLwJZkAiacSMPKhgJleKU/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=10)

![发布成功](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRMKJb1yicPZIsFJT1WYOFb7TAsMy0rVqSGBN7efHUxouadtfHI6pd7dSstc7YicL15iaPP790VxB5VAcOQmoHOqvuDuP0frAvpVH4/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=11)

![手机端发布效果](https://mmbiz.qpic.cn/mmbiz_jpg/s516EMWvbRNgPCwwVkPDUrGmj3l9Fkl2IVaXYBaVD80ic3NqkdW5waV1hqEaSqDXiaR3jMyW89J2iaqYEg70QzialiaGReLU2hAb1yAOObVMs4W0/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=12)

## 八、验收标准

- [ ] 问「你能帮我发小红书吗？」触发能力检查
- [ ] WorkBuddy 坦白能生成内容但不能直接发布
- [ ] GitHub 搜索找到 3 个项目并对比（xiaohongshu-mcp 14k Star 全功能活跃）
- [ ] 下载 darwin-amd64 二进制（自动从 ARM64 切换到 AMD64）
- [ ] 配置 ~/.workbuddy/mcp.json（url: localhost:18060/mcp，type: streamablehttp）
- [ ] 扫码登录小红书成功，Cookie 自动保存
- [ ] 启动 MCP 服务器 localhost:18060，13 个工具注册
- [ ] 连接器页面点「信任」后 13 个工具全部可用
- [ ] 验证登录状态：已登录，用户名 xiaohongshu-mcp
- [ ] 一句话生成内容（标题「用AI写代码是什么体验？WorkBuddy使用心得」）
- [ ] 即梦 AI 生成 3 张 1080×1440 无水印配图
- [ ] publish_content 发布成功（标签 6 个、原创声明、公开可见）
- [ ] 手机端可查看已发布笔记
- [ ] 全程不到 10 分钟
