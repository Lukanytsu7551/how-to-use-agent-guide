# Case 38｜AI 生图能用了，但带水印？WorkBuddy 帮我封装了个 Skill 解决

> **WorkBuddy 案例集 · 第 38 篇**
> 分类：AI能力扩展

---

## 一、场景描述

WorkBuddy 老用户都知道，之前版本的默认生图功能一直不太好使——要么出不来图，要么得靠第三方 skill 或外接 API 才能解决。但最近版本升级之后，它开始能生图了。兴奋地点了一下，图片确实出来了，效果也还行，但紧接着就发现一个问题：图片右下角有一个"图片由 AI 生成"的水印。对于公众号封面这种场景来说，有水印的图片基本没法用，发朋友圈无所谓，但正式发布的内容带别人的 logo，总觉得不太专业。

跟 WorkBuddy 说了一声"帮我看看怎么去掉水印"。WorkBuddy 顺藤摸瓜找到水印根源：既然生图模型是混元的，底层调的肯定就是混元生图 API。它直接去翻了 WorkBuddy 的安装目录 /Applications/WorkBuddy.app/，内置 skill 源码在 app.asar.unpacked/resources/builtin-skills/ 里，找到生图脚本 buddy-cloud.py，发现 _build_image_body 函数里根本没有设置 LogoAdd 参数，没有显式设置就走 API 默认值，而混元 API 默认值是 LogoAdd=1，也就是默认带水印。

原理清楚后方案很简单：写一个自己的脚本把 LogoAdd 设成 0。与其每次手动跑脚本，不如直接封装成 WorkBuddy 的 Skill。整个过程也踩了一个大坑——脚本一直超时 300 秒，第二天 WorkBuddy 换思路打印 API 原始返回值，才发现 JobStatusCode 是字符串 "5" 而非整数 5，"5" == 5 永远为 False，加一个 int() 类型转换后 5 秒出图。从超时 300 秒到 5 秒完成，就差一个 int()。

## 二、想要完成的任务

让 WorkBuddy 翻自己的内置生图源码找到水印根源，封装一个无水印生图 Skill（LogoAdd=0），支持自定义分辨率、自动下载、Prompt 优化控制，并修复轮询超时 Bug，实现 5 秒出图无水印。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| 文件系统访问能力 | 翻 WorkBuddy 安装目录查找 buddy-cloud.py 源码 | 内置能力 | 读取 /Applications/WorkBuddy.app/ |
| Skill 封装能力 | 按 SKILL.md + scripts/ 规范封装 hunyuan-no-watermark Skill | 内置能力 | 本地 ~/.workbuddy/skills/ 读写 |
| 混元生图 API（TC3-HMAC-SHA256 签名） | 调用混元生图接口，LogoAdd=0 关闭水印 | 基于 buddy-cloud.py 认证逻辑 | 混元 API 凭证 |
| 代码自检与修复能力 | 打印 API 原始返回值，定位 JobStatusCode 类型不匹配 Bug | 内置能力 | 本地文件读写 |
| ImageGen（系统内置） | 对比验证（带水印版本） | 内置工具 | WorkBuddy 账号 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端（版本含可用的默认生图功能）
2. 本机可访问 /Applications/WorkBuddy.app/ 目录读取内置 skill 源码
3. 具备混元生图 API 凭证（TC3-HMAC-SHA256 签名所需 SecretId/SecretKey）
4. 本机 ~/.workbuddy/skills/ 目录可写入（用于封装新 Skill）
5. 本机 Python 3 可用（运行 hunyuan_nowm.py 脚本）

## 五、在 WorkBuddy 中的操作

### 步骤 1：WorkBuddy 顺藤摸瓜找到水印根源
WorkBuddy 判断生图模型是混元的，底层调的肯定就是混元生图 API。它直接去翻了 WorkBuddy 安装目录 /Applications/WorkBuddy.app/，内置 skill 源码在 app.asar.unpacked/resources/builtin-skills/ 里。然后找到生图相关脚本 buddy-cloud.py，在里面搜 LogoAdd，定位到 _build_image_body 函数（第 578 行）：该函数构造请求体时只设置了 Prompt、Resolution、Revise、Seed，根本没有设置 LogoAdd 参数。没有显式设置就走 API 默认值，而混元 API 默认值是 LogoAdd=1，也就是默认带水印。
**关键步骤**：对比同一个文件里视频生图的 _build_video_body 函数（第 567 行），视频那边是显式写的 LogoAdd: 1，图片这边压根没写，但结果一样——都有水印。

### 步骤 2：WorkBuddy 把方案封装成一个 Skill
按 WorkBuddy 的 Skill 规范（一个 SKILL.md 描述文件 + 一个 scripts/ 目录放脚本），以 buddy-cloud.py 的认证逻辑（TC3-HMAC-SHA256 签名）为基础，写了一个 hunyuan_nowm.py，核心改动就是一行：body 里设置 "LogoAdd": 0。还加了几个实用功能：自定义分辨率（支持 36 种预设尺寸，公众号封面 1280:720、竖版配图 768:1024 等常用比例）、自动下载（生成的图片直接保存到本地）、Prompt 优化控制（可以开关混元自带的 prompt 重写，--revise 0 精确控制，--revise 1 质量更高）。
**关键步骤**：SKILL.md 里写清楚和系统内置生图的对比表（水印、分辨率、图片下载、Prompt 优化四个维度）。

### 步骤 3：踩了一个大坑——脚本一直超时
Skill 封装好了，第一次跑超时，第二次又超时，然后又试了好几次全都超时，一直提示"任务超时（300s）"。但奇怪的是，通过 API 查询任务状态显示明明已经完成了——图片都已经生成好了，就是脚本检测不到。第一天下午 WorkBuddy 试了各种方法：换 token、改轮询间隔、关闭 prompt 重写（revise=0）、直接用内置 ImageGen 工具生成（图片能出来但有水印没意义），全都失败。折腾一下午没找到原因，只好先用内置 ImageGen 生了一张带水印的图凑合用。
**关键步骤**：API 查询显示任务完成，但脚本检测不到，这是典型的"图片早就生成好了，脚本看不见"问题。

### 步骤 4：第二天 WorkBuddy 找到 Bug 了
第二天早上重新打开 WorkBuddy 让他处理，他换了一个思路：直接打印 API 返回的原始数据，看看实际返回了什么。打印出来一看，关键数据是 {"JobStatusCode": "5", "Status": "DONE"}。WorkBuddy 注意到 JobStatusCode 的值是字符串 "5"，不是整数 5。再看脚本里的判断逻辑：if status == "DONE" or code == 5，Python 里字符串 "5" 和整数 5 是不相等的，"5" == 5 的结果是 False，所以 code == 5 这个条件永远命中不了。但 status == "DONE" 不是能命中吗？确实能——如果 API 同时返回了 Status 字段的话。但实际上 API 有时只返回 JobStatusCode 不返回 Status，这时候两个条件都为 False，程序就继续轮询，一直等到 300 秒超时。
**关键步骤**：修复方案是加一个类型转换，try: code = int(raw_code) if raw_code is not None else None，except (ValueError, TypeError): code = None。修完之后再跑——5 秒出图。

### 步骤 5：验证无水印效果
Bug 修完后生成一张公众号封面图："微信公众号封面图，极简科技风，深蓝到紫色渐变背景，画面中央是一个发光的透明水滴，水滴内部折射出数字代码和光粒子，水滴周围有细微的光晕和光线扩散，干净留白，高端大气，无文字"。几秒钟后图片就下来了——没有水印，干净利落。对比之前用内置 ImageGen 生成的带水印版本，右下角的 logo 确实没了，画面干净了很多。
**关键步骤**：从超时 300 秒到 5 秒完成，就差一个 int()。

### 步骤 6：WorkBuddy 一口气生成 5 张不同风格
既然搞定了，干脆让他多生成几张测试不同风格：极简科技风（深蓝到紫色渐变，几何线条网格，抽象数字粒子）、水墨中国风（青山绿水，云雾缭绕山峰，留白设计）、温暖治愈系（粉色橙色渐变，卡通云朵星星，手绘插画风）、商务精英风（深灰金色渐变，城市天际线剪影，光效粒子）、赛博朋克风（霓虹粉蓝紫撞色，雨夜街道倒影，蒸汽波）。5 张图并行提交，总共不到 30 秒全部完成。
**关键步骤**：部分图片上出现了 AI 自动生成的中文文字（如"温馨时刻""商务精英"），这不是水印，是混元模型根据 prompt 里的描述词自己加上去的，需要纯背景无文字的图在 prompt 里避免出现主题词就好。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `帮我看看怎么去掉水印。` | 触发 WorkBuddy 翻内置源码查找水印根源 |
| 2 | `微信公众号封面图，极简科技风，深蓝到紫色渐变背景，画面中央是一个发光的透明水滴，水滴内部折射出数字代码和光粒子，水滴周围有细微的光晕和光线扩散，干净留白，高端大气，无文字` | 验证无水印生图效果 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 一个自定义 Skill：hunyuan-no-watermark（位于 ~/.workbuddy/skills/hunyuan-no-watermark/）
2. 核心脚本 hunyuan_nowm.py（LogoAdd=0 关闭水印，支持 36 种预设分辨率、自动下载、--revise 0/1 控制）
3. SKILL.md 描述文件（含与系统内置 ImageGen 的对比表）
4. Bug 修复：JobStatusCode 类型转换（int()），轮询从超时 300 秒降到 5 秒
5. 一张无水印公众号封面图（极简科技风）
6. 5 种风格无水印生图测试（极简科技风、水墨中国风、温暖治愈系、商务精英风、赛博朋克风）

### 结果证明

![默认生图带"图片由 AI 生成"水印](/images/workbuddy-cases/case-38/01.png)

![封装好的 Skill 目录结构（SKILL.md + scripts/hunyuan_nowm.py）](/images/workbuddy-cases/case-38/02.png)

![无水印公众号封面图（极简科技风）](/images/workbuddy-cases/case-38/03.png)

![5 种风格无水印生图测试（30 秒完成）](/images/workbuddy-cases/case-38/04.png)

### 系统内置 ImageGen vs 无水印 Skill 对比

| 特性 | 系统内置 ImageGen | 无水印 Skill |
|---|---|---|
| 水印 | 默认有水印 | 无水印（LogoAdd=0） |
| 分辨率 | 默认 1024:1024 | 支持 36 种预设尺寸 |
| 图片下载 | 返回 URL | 自动下载到本地 |
| Prompt 优化 | 默认开启 | 可控（--revise 0/1） |
| 出图耗时 | 正常 | 5 秒（Bug 修复后） |

### 排查时间线

| 阶段 | 事件 |
|---|---|
| Day 1 下午 | 发现默认生图带水印 → 翻源码找到 LogoAdd 参数 → 封装 Skill → 跑脚本超时 → 反复测试全超时 → 暂时搁置 |
| Day 2 早上 | 打印 API 原始返回值 → 发现 JobStatusCode 是字符串 "5" → 加 int() 类型转换 → 5 秒出图无水印 → 批量测试 5 种风格 30 秒完成 |

## 八、验收标准

- [ ] 成功访问 /Applications/WorkBuddy.app/app.asar.unpacked/resources/builtin-skills/ 找到 buddy-cloud.py
- [ ] 定位到 _build_image_body 函数未设置 LogoAdd 参数（默认 LogoAdd=1 带水印）
- [ ] 成功封装 hunyuan-no-watermark Skill（SKILL.md + scripts/hunyuan_nowm.py）
- [ ] 脚本核心改动：body 中设置 "LogoAdd": 0
- [ ] 支持自定义分辨率（至少 36 种预设尺寸）
- [ ] 支持自动下载图片到本地
- [ ] 支持 --revise 0/1 控制 Prompt 优化开关
- [ ] SKILL.md 含与系统内置 ImageGen 的对比表（水印/分辨率/下载/Prompt 优化）
- [ ] 修复 JobStatusCode 类型不匹配 Bug（int() 类型转换）
- [ ] Bug 修复后出图耗时从 300 秒超时降到 5 秒
- [ ] 生成的图片右下角无"图片由 AI 生成"水印
- [ ] 5 种风格并行提交，30 秒内全部完成
