# Case 93｜我把需求一丢，AI做出了一整个水色排序小程序

> **WorkBuddy 案例集 · 第 93 篇**
> 分类：网站与应用开发

---

## 一、场景描述

想做个微信小程序练手，验证现在 AI 能不能独立做出一个完整的小程序，而不是只会写个函数、解释段代码。选了经典品类——水色排序（Water Sort），规则简单但要做到手感好其实挺难。给 WorkBuddy 扔了一份正儿八经的需求文档，整整 10 大块，看它能不能照着文档把整个东西做出来。

## 二、想要完成的任务

让 WorkBuddy 严格按照 10 大块需求文档，落地一款「水色排序大师」微信原生小程序，完整包含核心玩法、新手引导、用户等级成长升级体系、关卡梯度、道具商城、留存激励、广告商业化、本地进度存档、社交裂变功能。然后经过十几轮挑刺-修复，把颜色显示、倒水方向、水流细线、同色分段、杯口贴合、音效合成等问题逐一解决，最终做出一个能玩的完整小程序。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| WorkBuddy Agent | 全栈小程序开发 + 十几轮迭代调试 | WorkBuddy 内置 | WorkBuddy 账号 |
| 微信开发者工具 | 小程序编译预览 | 本地安装 | 微信小程序账号 |
| Python 脚本 | 用代码合成倒水音效 pour.mp3 | WorkBuddy 执行 | 无 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 已安装微信开发者工具
3. 有微信小程序 AppID
4. 准备好完整需求文档（10 大块）

## 五、在 WorkBuddy 中的操作

### 步骤 1：扔需求文档
把完整需求文档丢给 WorkBuddy，指定它作为全栈小程序开发工程师，严格按照全部需求落地，不简化任何成长升级机制。WorkBuddy 交付了完整微信原生小程序工程：app.json/app.js/app.wxss 全套配置、pages/ 下 7 个页面（首页/游戏页/个人中心/商店/签到/设置/排行榜）、utils/ 下一堆逻辑文件（游戏引擎、关卡系统、用户系统、广告），连 README 和数据表都写好了。游戏引擎里还自带一个 DFS 求解器，自动检查每一关是否可解。
**关键步骤**：扔需求文档 → AI 交付完整工程 + DFS 求解器。

### 步骤 2：第一轮修复——颜色太细
第一版跑起来试管里的颜色细得像几条线。反馈「为什么试管里的颜色很细，几乎看不到」。WorkBuddy 查出是 CSS 高度塌陷——.liquid 容器少了 top:0 导致百分比高度算不出来。改完颜色正常。
**关键步骤**：反馈颜色太细 → 定位 CSS 高度塌陷 → 修复。

### 步骤 3：第二轮修复——倒水方向反了
倒水动画是「从底部」倒的。反馈「倒水的方向是错误的，不是应该从杯子口倒吗？怎么是底？」。WorkBuddy 把旋转中心从顶部挪到中心，又根据目标试管的左右位置判断倾斜方向。改完水从杯口倒出来。
**关键步骤**：反馈方向反了 → 旋转轴移到中心 + 按目标方向倾倒。

### 步骤 4：第三轮修复——杯子里有条细线
倒水过程中倒水的杯子里出现一条小细线。反馈「为什么倒水的过程中，杯子里有条小细线？」。WorkBuddy 发现水流元素放在了倾斜的杯子内部跟着转就扭出来了，把水流改成独立浮层单独绘制不跟着杯子转。细线消失。
**关键步骤**：反馈细线 → 水流改成独立叠加层 → 细线消失。

### 步骤 5：第四轮修复——同色一段一段的
同一个颜色的液体被分成好几段有分隔线像条形码。反馈「一个杯子里同一个颜色为什么要区分？为什么不整合起来？杯子口设计比杯体应该宽一点」。WorkBuddy 把每段底部的边框去掉，改成整根试管统一加一层玻璃质感，同色自然连成一片。杯口重做成半透明玻璃圈。
**关键步骤**：反馈同色分段 → 删掉逐段渐变改整管单层叠加 + 杯口重做。

### 步骤 6：第五轮修复——杯口和杯身不贴合
杯口和杯身之间有道缝像两个零件硬凑。反馈「液体和杯口之间处理还有问题，不是自然贴合」。WorkBuddy 把杯口重做成半透明玻璃圈，往上盖住杯身顶部 15rpx，接缝看不出来。
**关键步骤**：反馈贴合问题 → 杯口压住杯身顶部 15rpx 消除接缝。

### 步骤 7：合成倒水音效
游戏需要倒水音效但工程里没有这个文件，跑起来报错 readFile:fail /assets/pour.mp3 not found。说「你去想办法给我弄个 mp3，从网上搜索下载也行」。WorkBuddy 没去找现成音频，而是用代码合成了一段——棕噪水流声 + 中高频水花嘶声 + 起始3声咕嘟低频blip + 快起快落振幅包络 + 轻微 tremolo 抖动，时长 0.75s，用 ffmpeg + libmp3lame 编码生成 pour.mp3（约13KB）。
**关键步骤**：报错缺 mp3 → 用 Python 脚本合成真实倒水音效。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `你现在作为全栈小程序开发工程师，严格按照下方全部需求，落地一款水排序倒水解谜微信小游戏小程序……（完整10大块需求文档）` | 扔完整需求文档 |
| 2 | `为什么试管里的颜色很细，几乎看不到` | 反馈颜色太细 |
| 3 | `倒水的方向是错误的，倒水不是应该是杯子口倒吗？怎么是底？` | 反馈方向反了 |
| 4 | `现在倒水方向对了，但为什么倒水的过程中，倒水的杯子里有条小细线？` | 反馈细线问题 |
| 5 | `一个杯子里，同一个颜色为什么要区分？看起来一段一段的，为什么不整合起来。杯子口设计比杯体应该宽一点才对。` | 反馈同色分段+杯口 |
| 6 | `倒水的过程中，同一种颜色之间还会有分隔线……还有这个杯口和本体为什么只是简单的叠加，不是自然贴合。` | 反馈贴合问题 |
| 7 | `你去想办法给我弄个mp3，从网上搜索下载也行` | 合成倒水音效 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 完整「水色排序大师」微信原生小程序工程（7 页面 + 游戏引擎 + DFS 求解器 + 3200 关）
2. 倒水动画修复（颜色正常显示 + 从杯口倒出 + 无细线 + 同色连成一片 + 杯口自然贴合）
3. 合成的倒水音效 pour.mp3（约13KB，程序生成）
4. 商店、签到、成就、排行榜功能一应俱全

### 结果证明

![WorkBuddy 接收需求文档并交付完整工程](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRPBicRhMNibZVJzhXR8RKtUNvZmpHAeLicgicm1icb1Pbp3NdGprYwlhQoibDia3l5pkKa98rVeMAKGgFBW1E5rr5hdAica0HHzW7e1bRs/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

![工程文件结构：app.json + pages + utils](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRN0iaiawd02gIRoIbDma5jGzUOGHc1SFiafwKQ9W2diaUIIJW74S1oEehgUviatAWiaMDr7ZggpBrmtraPYZzlNJmem0g5eTEAfMb5s4/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

![第一轮修复：颜色太细问题](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRNWpYc2LYjm6diaiaW8T56icemIZdKQQMvmlhAGJNxPOoQbtSF9OhWuto1RVOkaIyq6wZTRK0nNiagbYU0FaCQKicZmCbUQ0FvxlV3M/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

![第二轮修复：倒水方向错误](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRMU3iaOmogxzNjX9G8lbQ3fDIicTreM7iajMWGXtkABrkePPAvsWkFm3h0cWlpbRrdrQjJPh9xOWt8QNJprg2SeE5TU6ydnlHtM4U/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

![第三轮修复：杯子里有条细线](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRNHYib1GHIzoPN2xgnnuZ8bE3ymtLiaYRFUd7ibEFZksHJGhKlNSicXLNNVAdN1INjian0Td6ibRiaibSaib7UOSyOOfhWH1OHc1bibZjwiac/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

![第四轮修复：同色分段+杯口设计](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRNwcX5YFlV6icRQD9P3CTKak2qxwBpwJzqC2xKAfs5WpaWjicOeEcakP3gwY4CJlAdBVTk8ibeTrc2Hg86QMcibibibseEh27zlHAbFk/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

![第五轮修复：杯口和杯身自然贴合](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRNFcMwPYibQSaBy7xSIoh8RISQDeeMEOvxF2NGkmcz4j7qEFbsz7P2JS3BgkmiaGoOFVFwLlGWMCjtymY9IaC9Ky0x2UwodZttqU/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

![合成倒水音效 pour.mp3](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRNquRuqiaUTF7Nl8K1uolGuGXibtm0p9U1Vf4mOp9f0EADLT79ZBhoSUTgYVmkRMetfzibO80L1jCplaxvYSnqxHdtKeCJuX2IWZg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)

![小程序首页：三种难度模式](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbROhyjozQ3RhhFoy55npkRaOBfEibjiaibXRkwMzh3ZVjljPfyibam1KibVeJomibGPYamVgUo5rJ8QOHGlmKkw0B2micbQzsdmspiaibUic4/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=9)

![商店页面：道具专区](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRMJpSx8RNt0ib6KM6Nx7eribQvT72yvjrhuev78iaFHWOXfY5sGGeMXMOwp7UamoClDE5TROBYoSxIls8yVcxgmdS4ZiaB0kVY4PK8/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=10)

![七日签到页面](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRMw2iaIEUNEtKyrFibM1Hu9CqA3oswa0MA2koWjaAG4TaPvia2DNjiaf1xy3WF9A61B2pJROBamcZe9LsopiaK3I5ic7odbtF34Fia4pU/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=11)

![游戏页面：第16关](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRO7tFNe5y5Kx8ljpUibKp1axCX2fs6P2YvoP1ybE09PAlrT8XUNVBDf4MlUtp2KhPeEKmS0wxrMu4aGcMp81aG0vrVNZmZI7BOA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=12)

![好友闯关排行榜](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRNhL7Cuq1lVU7fiaxW7rPibNvJJVEvSXmdXCtfBGxar4Qjgkvx9c59jLActNBpOtVXxGnptc9gxpelIcgmCQzF3a5SDkMpp9OoJg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=13)

![个人中心：等级与成就](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRM1A5Iz5c1JJ2GYAQrzYXuqk33KJ0LGJb8OnEXhgH1Mzibf3xuNvJiaT3Lz3lcQW1BPGJibyvUU5KHaib4Q2Picgzbiaukr3Aqs5L7xs/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=14)

## 八、验收标准

- [ ] WorkBuddy 接收 10 大块需求文档后交付完整微信原生小程序工程
- [ ] 工程包含 app.json/app.js/app.wxss 全套配置
- [ ] pages/ 下 7 个页面（首页/游戏页/个人中心/商店/签到/设置/排行榜）
- [ ] utils/ 下包含游戏引擎、关卡系统、用户系统、广告逻辑文件
- [ ] 游戏引擎自带 DFS 求解器，3200 关每关都可解
- [ ] 第一轮修复：颜色太细问题解决（CSS 高度塌陷修复）
- [ ] 第二轮修复：倒水方向从杯口倒出（旋转轴移到中心 + 按目标方向倾倒）
- [ ] 第三轮修复：杯子里细线消失（水流改成独立叠加层）
- [ ] 第四轮修复：同色连成一片（删掉逐段渐变改整管单层叠加）
- [ ] 第五轮修复：杯口和杯身自然贴合（杯口压住杯身顶部 15rpx）
- [ ] 倒水音效用代码合成（pour.mp3 约13KB，棕噪+水花嘶声+咕嘟blip）
- [ ] 新手教程只在第一关出现
- [ ] 商店、签到、成就、排行榜功能一应俱全
