# Case 80｜AI帮我做了套微信表情包：从角色设计到16张动图

> **WorkBuddy 案例集 · 第 80 篇**
> 分类：内容创作与新媒体运营

---

## 一、场景描述

上一篇把微信表情包上架的规格、流程、避坑都搞清楚了，接下来是真的动手做。不会画画，但 WorkBuddy 可以直接帮我用 AI 生成统一风格的表情主图。从「我想做一套表情包」到「已提交审核」，全程没打开 Photoshop，没花一分钱外包。这篇记录了怎么让 AI 设计专属 IP 形象、静态图 vs 动态 GIF 技术路线怎么选、16 张表情批量生成用了哪些工具、透明背景和配套素材怎么一键处理。

## 二、想要完成的任务

使用 WorkBuddy 调用混元生图设计 IP 形象「可乐」（蓝灰色企鹅+圆框眼镜+键盘挂件），验证动态 GIF 技术路线（混元文生视频 → ffmpeg 转 GIF → 压缩 ≤500KB），批量生成 16 张表情动图（覆盖日常聊天场景），用 Python 泛洪算法处理透明背景，生成配套素材（缩略图/横幅/封面/聊天面板图标），最终提交到 sticker.weixin.qq.com 审核。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| 混元生图（无水印） | 生成 IP 形象定型图和静态表情主图，支持无水印参数 | WorkBuddy 内置 | WorkBuddy 账号 |
| 混元文生视频 | 生成动作视频用于转 GIF | WorkBuddy 内置 | WorkBuddy 账号 |
| ffmpeg | MP4 → GIF 格式转换 | 系统工具 | 本地安装 |
| TinyPNG / ffmpeg | 压缩到 ≤500KB | 工具 | 无 |
| Python + PIL | 泛洪算法（Flood Fill）去白底处理透明背景 | Python 库 | 本地 Python 环境 |
| WorkBuddy 自动排版 | 从主图截取形象生成配套素材（缩略图/横幅/封面/聊天面板图标） | WorkBuddy 内置 | 无 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 已完成微信表情开放平台注册（sticker.weixin.qq.com）
3. 本地已安装 ffmpeg 和 Python + PIL 环境
4. 已了解微信表情包素材规格（详见 Case 79）

## 五、在 WorkBuddy 中的操作

### 步骤 1：设计 IP 形象
跟 WorkBuddy 说「我没有明显方向，你可以针对我的身份和我的公众号定位，帮我设计一套方案出来吗？我想使用 AI 生成。」。WorkBuddy 从资料里提炼关键信息：公众号「我与AI的那些事」定位 AI 工具+效率技巧，正在日更「WorkBuddy 100种用法」系列，形象叫可乐数字搭子。给了方案：蓝灰色企鹅+圆框眼镜+键盘挂件，二头身 Q 版，扁平手绘风格。「可乐」这个人设就这样定下来了。
**关键步骤**：基于公众号定位设计 IP 形象「可乐」（蓝灰色企鹅+圆框眼镜+键盘挂件）。

### 步骤 2：AI 生第一张角色定型图
WorkBuddy 调用混元生图出了第一版「可乐」，但有水印。换用混元生图（支持无水印参数）重新生成：蓝灰色企鹅+圆框眼镜 ✓，键盘挂件+Hello 屏幕 ✓，没水印 ✓，纯白背景 ✓。风格确认，可以批量跑了。生图目前 1024×1024，上架前统一裁剪压缩到 240×240+透明背景+≤500KB。
**关键步骤**：混元无水印参数生成定型图，风格确认后可批量跑。

### 步骤 3：验证动态 GIF 技术路线
问「我想生成动态的 GIF，能搞定吗？」。WorkBuddy 给了两个技术路线对比：A 文生视频 → 转 GIF（混元生视频 → 下载 MP4 → ffmpeg 转 GIF，动画流畅适合简单动作）、B 逐帧生成 → 合成 GIF（每张单独生成再合成，精确控制但帧间可能跳）。选了路线 A 先试一张。技术验证通过：混元文生视频 → 自动下载 MP4 → ffmpeg 转 GIF → 压缩到 319KB（≤500KB ✓），240×240 正方形符合微信审核规格。但有个问题：视频生成没法做透明通道，背景是白色实底，后面再处理。
**关键步骤**：路线 A 验证通过，319KB ≤500KB，240×240 符合规格，但背景是白色实底。

### 步骤 4：批量生成 16 张
第一张效果 ok，直接说「继续按这个风格跑完 16 张」。WorkBuddy 建了任务列表分批生成，覆盖日常聊天场景：你好（319KB）、好的（355KB）、谢谢（297KB）、收到（219KB）、加油（312KB）、晚安（274KB）、哈哈哈（330KB）、疑问（298KB）、委屈（303KB）、生气（274KB）、摸鱼（296KB）、点赞（281KB）、难过（318KB）、惊讶（307KB）、偷笑（324KB）、拜拜（311KB）。16 张全部符合微信规格，全程 AI 生成+自动压缩。
**关键步骤**：16 张表情动图全部生成成功，覆盖 16 个日常聊天场景，大小 219KB-355KB 均 ≤500KB。

### 步骤 5：处理透明背景
全套图出来了但白色背景在聊天界面里有点突兀。WorkBuddy 用泛洪算法（Flood Fill）从四角扫描，把白色背景像素全部替换为透明：企鹅的白色肚皮保留（被轮廓包围泛洪到不了），16 张全部写入 transparency=0 标记（标准 GIF 透明格式）。处理后文件大小 61KB-126KB，远低于 500KB 上限。
**关键步骤**：泛洪算法从四角扫描去白底，企鹅白色肚皮保留，处理后 61KB-126KB。

### 步骤 6：生成配套素材
主图搞定了但上架还需要 4 类配套素材：表情缩略图 120×120 px ≤50KB、详情页横幅 750×400 px ≤80KB、表情封面图 240×240 px ≤80KB、聊天面板图标 50×50 px ≤30KB。这张图如果用 AI 重新生成风格可能不统一。WorkBuddy 的做法是：从主图里截取「可乐」的形象重新排版，保证 IP 一致性。
**关键步骤**：从主图截取形象重新排版生成 4 类配套素材，保证 IP 一致性。

### 步骤 7：提交审核
素材全部就绪，登录 sticker.weixin.qq.com 开始提交。第 1 步选「表情专辑」。第 2 步上传表情：类型选动态表情（GIF 格式），批量上传 16 张主图，右侧实时预览效果。第 3 步填基本信息：名称「可乐的日常」（5 字）、介绍「可乐，一只会写代码的小企鹅，陪你聊天、工作、摸鱼～」、横幅 750×400 px、封面 240×240 px、图标 50×50 px。第 4 步填附加信息：类型卡通表情/其他、风格日常+搞笑（可多选）、主题万能通用、上架地区中国大陆/全球。点「提交」等审核。
**关键步骤**：提交表情专辑「可乐的日常」16 张动图到 sticker.weixin.qq.com 审核。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `我没有明显方向，你可以针对我的身份和我的公众号定位，帮我设计一套方案出来吗？我想使用ai生成。` | 设计 IP 形象方案 |
| 2 | `要无水印的啊，记住了，全部需要无水印。` | 换用混元无水印参数重新生成定型图 |
| 3 | `我想生成动态的gif,能搞定吗？` | 验证动态 GIF 技术路线 |
| 4 | `继续按这个风格跑完16张。` | 批量生成 16 张表情动图 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. IP 形象「可乐」（蓝灰色企鹅+圆框眼镜+键盘挂件，二头身 Q 版扁平手绘风格）
2. 16 张动态 GIF 表情主图（240×240 px，219KB-355KB 均 ≤500KB，覆盖你好/好的/谢谢/收到/加油/晚安/哈哈哈/疑问/委屈/生气/摸鱼/点赞/难过/惊讶/偷笑/拜拜）
3. 透明背景处理后的 16 张 GIF（泛洪算法去白底，61KB-126KB）
4. 4 类配套素材（缩略图 120×120/横幅 750×400/封面 240×240/聊天面板图标 50×50）
5. 提交到微信表情开放平台的表情专辑「可乐的日常」

### 结果证明

![IP 形象方案设计](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRN6s77OmhcJTJu9F1ZlaE89LrAKj0piaqffksTBZIy2JgmhIZDicTibuGxfDh3YxqZmvzy3WcGYNSKPO4Tq44caXRsDaCBhLhApqc/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

![第一版定型图有水印](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRP2lmFKsKXjJ42NmUSBT1FDbAhXRrYiaPibTTYicy5uicicGag62aHFKCLYfB9ajCZLEkLzW41pmTYbibu6BfnkdhzJ2mKOQZKice8EKo/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

![无水印版定型图](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRMib4abxia2oP5pLf4k4BV9fEUmJpPXsbnavPzhnqgIBX4ZecPick2wXc6t0LtZjjrhsOlYXu84MOFa744xR8ibrnsMaVVqiaVibdqFk/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

![动态 GIF 技术路线验证](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRPBev2TIord0icDumyUvvlOM24ialVJv6lOWAbp9gvkllaTHrfsYaBYNkBy216F9mHiab3axoZJQAwxom4kugq5aEPNiaHTibJAoibg0/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

![第一张动态 GIF 样张](https://mmbiz.qpic.cn/mmbiz_gif/s516EMWvbRPEL8G52ghhYZBW9nibQjdtxabiceHXRnWSLuwkFxEr5ra2eueRSF8k51nlkyicWfG9aYxhIyeo8hgaQLtrpucIVCVewoOctRoBTE/640?wx_fmt=gif&from=appmsg#imgIndex=5)

![批量生成进度 11/16](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbROwHiauPnC4hn6Gexc4TSZRqEoZwsSm74sebhC7crdumnHuEuktjGwnkMskPDXYJ0Qf82rmjx61YUXLxHklzhVRpJpYonWhq6S0/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

![16 张表情动图全套](https://mmbiz.qpic.cn/mmbiz_gif/s516EMWvbRMbZmawnXUUck4je7EXz7iauxumAVprh20AppRN4PSH7ia3OiaSeOQoukFoV9ia1Wibtnf5GRIf6zibtVuEibFeHMGyKCWxxpoOfvJGnk/640?wx_fmt=gif&from=appmsg#imgIndex=7)

![透明背景处理后的表情](https://mmbiz.qpic.cn/mmbiz_gif/s516EMWvbRPbJHoVAzI2CywOy2vRK7c8ny9USONcmNXuFxCNz3PrAiaTqRb4qcFM0SWRT1KISwEkjQbXw1LfOp3Llmhl3w6WRvLR77JHm6ia0/640?wx_fmt=gif&from=appmsg#imgIndex=23)

![配套素材自动排版](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRPhj4lGibgvNeMgeeQUvktRShWFCntMxxeUdfNYDFNp7mCiay4hwectG0quTIhrGTYMzQef142B62XCypNaSA2HjaHl5oCIicpKQA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=39)

![提交表情专辑页面](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRMOibNZamRnrJjkgR0WicueNKy7JW3Qrg4yKzBDQAjL2VrhndBibosv6n0auTnXSZEwTHiccQtQlVGfUzmaRsVricoQ1fURNicoJzqHw/640?from=appmsg&watermark=1#imgIndex=40)

![上传表情实时预览](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRN8fQfW5QYd1XfvyaHFUicH5xaYC8fRkibmh6CtDdsuYmYWB0yxRzzl9J8fjNRl0ufJiaVP69yaZSRLia8JxYdT9bRhVV3w7XgtEY0/640?from=appmsg&watermark=1#imgIndex=41)

![填基本信息页面](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRNUaMNa0x2m1MSqibWy4L3BbkH24ibNa3OhCGy08tdSLRHg1kiaKjFMtM9N3s6hp4VoGticJlYRWJQibe0aib9pjAibPsNiaEVnu5oyCaI/640?from=appmsg&watermark=1#imgIndex=42)

![提交审核页面](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRNaqaGovN8BCAX6mCrgkGpr4CvOubCY88ccnDL0sfIw8U25CRpBtgfNnBazPNoNEYze1Sf3Dzs3M1CSOUevmHmg6LCy14g5ank/640?from=appmsg&watermark=1#imgIndex=43)

## 八、验收标准

- [ ] IP 形象「可乐」：蓝灰色企鹅+圆框眼镜+键盘挂件，二头身 Q 版扁平手绘风格
- [ ] 基于「我与AI的那些事」公众号定位和「WorkBuddy 100种用法」系列设计
- [ ] 混元生图无水印参数生成定型图（1024×1024，纯白背景，无 Logo）
- [ ] 动态 GIF 技术路线 A：混元文生视频 → 下载 MP4 → ffmpeg 转 GIF → 压缩 ≤500KB
- [ ] 第一张 GIF 样张 319KB ≤500KB，240×240 正方形符合微信审核规格
- [ ] 16 张表情全部生成成功：你好/好的/谢谢/收到/加油/晚安/哈哈哈/疑问/委屈/生气/摸鱼/点赞/难过/惊讶/偷笑/拜拜
- [ ] 16 张大小范围 219KB-355KB 均 ≤500KB
- [ ] 泛洪算法（Flood Fill）从四角扫描去白底，企鹅白色肚皮保留
- [ ] 16 张全部写入 transparency=0 标记（标准 GIF 透明格式）
- [ ] 透明背景处理后文件大小 61KB-126KB 远低于 500KB 上限
- [ ] 4 类配套素材从主图截取形象重新排版生成（保证 IP 一致性）
- [ ] 配套素材规格：缩略图 120×120 ≤50KB、横幅 750×400 ≤80KB、封面 240×240 ≤80KB、图标 50×50 ≤30KB
- [ ] 表情专辑名称「可乐的日常」
- [ ] 介绍「可乐，一只会写代码的小企鹅，陪你聊天、工作、摸鱼～」
- [ ] 类型选动态表情（GIF 格式），16 张主图批量上传
- [ ] 附加信息：卡通表情/其他、日常+搞笑、万能通用、中国大陆/全球
- [ ] 已在 sticker.weixin.qq.com 点「提交」等审核
- [ ] 全程没打开 Photoshop，没花一分钱外包
