# Case 44｜从没人像到带声音，我用 WorkBuddy 折腾出了 30 秒脱口秀视频

> **WorkBuddy 案例集 · 第 44 篇**
> 分类：视频与图像生成

---

## 一、场景描述

之前用 WorkBuddy 的视频制作专家生成脱口秀视频，当时生成完一看——没有人像。画面里只有舞台灯光、观众席的模糊轮廓，就是没有演员本人。之前用视频制作专家生成过其他视频效果还不错，所以第一反应是：可能这个场景不太适合，换一个方式试试。然后就去问 WorkBuddy 本身了。

打开一个新的对话窗口，直接问了一句："你能生成视频吗？"WorkBuddy 说可以，列了一堆能力：文生视频、文生图片、图片转视频特效、3D 模型生成。顺手给了一个画面描述试试："黄昏时分，一列复古蒸汽火车穿过被雪覆盖的森林，蒸汽从烟囱袅袅升起"。90 秒之后视频出来了，16MB，画面确实不错。然后问了关键问题："为什么生成的视频只有5s，能生成30s的视频吗？"它说不行，5 秒是模型的硬性上限。不太信，追问了一句："你生成视频使用的什么模型？"它说是腾讯混元（Hunyuan）的文生视频模型，底层是腾讯云 VCG 服务。

接着让它去调查混元 API 都支持多少秒的视频生成，想办法生成 30 秒。WorkBuddy 读源码、查文档，发现 buddy-cloud.py 里 Duration 写死了 5 秒，没有任何模型原生支持 30 秒。它给了多分镜拼接方案：6 个 5 秒分镜顺序生成，ffmpeg 拼成 30 秒。后来又发现声音问题——混元 API 其实支持音频生成，关键参数是 sound: "on"，只有 pro 模式才支持。最终用 6 分镜拼接 + pro 模式 + sound on，生成了 30 秒带声音的脱口秀视频。

## 二、想要完成的任务

用 WorkBuddy 多模态内容生成能力（腾讯混元/Kling v2.6 API），通过多分镜拼接方案突破 5 秒硬性上限，生成一段 30 秒带声音的脱口秀视频。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| 多模态内容生成 | 文生视频（腾讯混元/Kling v2.6），含文生图片/图片转视频特效/3D 模型生成 | WorkBuddy 内置能力 | WorkBuddy 账号 |
| buddy-cloud.py 脚本 | 调用腾讯云 VCG 服务的视频生成脚本（含 Vendor/Model/ModelParam 参数） | 内置脚本 | 本地文件读写 |
| ffmpeg | 多分镜视频拼接（concat 模式合成 30 秒长视频） | 系统工具 | 本地执行 |
| WebFetch/源码读取 | 查阅腾讯云混元官方文档、读取 buddy-cloud.py 源码确认 API 参数 | 内置能力 | 网络访问 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端（含多模态内容生成能力）
2. 本地环境具备 ffmpeg（用于多分镜拼接）
3. 网络可用，能正常调用腾讯云混元视频生成 API
4. 腾讯云混元 API 每日提交额度未耗尽（每日最多 10 次）
5. 工作区可写入文件（用于保存生成的视频片段和最终合成视频）

## 五、在 WorkBuddy 中的操作

### 步骤 1：问 WorkBuddy 能不能生成视频
打开一个新对话窗口，直接问："你能生成视频吗？"WorkBuddy 列了多模态生成能力概览：文生视频（约 5 秒/段）、文生图片、图片转视频特效（60+ 特效模板）、3D 模型生成。顺手给了一个画面描述试试："黄昏时分，一列复古蒸汽火车穿过被雪覆盖的森林，蒸汽从烟囱袅袅升起"。90 秒后视频出来了，16MB，画面不错但只有 5 秒。
**关键步骤**：先确认 WorkBuddy 的视频生成能力，用测试描述验证效果，发现 5 秒时长限制。

### 步骤 2：追问模型与时长限制
问："为什么生成的视频只有5s，能生成30s的视频吗？"WorkBuddy 说 5 秒是底层模型的硬性上限。追问："你生成视频使用的什么模型？"它说是腾讯混元（Hunyuan）的文生视频模型，底层是腾讯云 VCG 服务。再问："你能看混元的api吗？"它实诚回答：没有直接访问腾讯云控制台或 API 文档后台的权限，但可以读脚本源码和查公开文档。
**关键步骤**：通过连续追问确认底层模型（腾讯混元/Kling v2.6）和时长限制原因（Duration 写死 5 秒）。

### 步骤 3：让 WorkBuddy 调查混元 API 支持的视频时长
说："你去调查下，混元api都支持多少s的视频生成，想办法生成30s的视频。5s的视频没有应用市场。"WorkBuddy 读 buddy-cloud.py 源码发现默认参数 "Vendor": "Kling", "Model": "v2.6", "ModelParam": {"Duration": 5} 写死了 5 秒。各模型实际支持的最长视频时长：Vidu viduq3-pro/turbo 16 秒、Kling 10~15 秒、Vidu viduq2 系列 10 秒、Hailuo 10 秒、OS 12 秒。没有任何一个模型原生支持 30 秒。它给了两个方案：多分镜拼接（6 个 5 秒分镜 = 30 秒），或多 GPU 并行加速。
**关键步骤**：WorkBuddy 主动读源码、查文档，给出各模型时长对比表和多分镜拼接方案。

### 步骤 4：用多分镜拼接方案生成 30 秒雪林火车视频
说："多分镜拼接（推荐）：混元 API 支持最多 6 个分镜，每个分镜可以独立生成 5~10 秒，然后拼接成完整长视频。6 个 5 秒分镜 = 30 秒。使用这个方案帮我生成 30s视频，我看下效果。"WorkBuddy 先试改 Duration 参数从 5 改成 10（脚本写死改不了），试 monkey-patch、独立脚本、复制 buddy-cloud.py 本地改，最后发现并发限制是 2 个任务。换思路：6 段 5 秒顺序生成，ffmpeg 拼接。6 段全部生成完成（每段约 90 秒，共 9-10 分钟），用 ffmpeg 拼成 final_30s.mp4（74MB，30 秒）。
**关键步骤**：6 段 5 秒分镜顺序生成，ffmpeg concat 模式拼接成 30 秒长视频。

### 步骤 5：发现没声音，追问 API 是否支持音频
问："为什么生成的视频没有声音？"WorkBuddy 回答说混元 API 只支持无声生成。这个答案不太对劲，追了一句："你从哪里看的，混元API只支持无声的？"它沉默了一会儿说"好问题，我重新确认一下"，然后去查文档，查完改口了："我之前说错了。查证之后确认：混元 API（Kling v2.6）是支持音频生成的，我之前没用这个参数而已。"关键参数是 sound: "on"（开启音频生成，默认关闭），voice_list 可选指定音色，只有 pro 模式才支持音频，std 模式不行。
**关键步骤**：AI 第一次答错了，追问"你从哪里看的"让它自己去查文档，查完发现 sound: "on" 参数可开启音频，需 pro 模式。

### 步骤 6：带声音重新生成脱口秀视频
说："你帮我写一脱口秀的脚本，使用有上面的方案，带声音生成，然后合成我看下效果。"WorkBuddy 自己写了脱口秀脚本（6 个分镜：演员出场调麦克风→讲段子手势丰富→无奈表情摊手→得意地笑竖大拇指→比划相机取景框调皮→鞠躬谢幕观众席亮灯），ModelParam 里多了两个字段："Duration": 5, "Mode": "pro", "Sound": "on"。中间出了小插曲：5 月 11 日当天 API 额度用完了（每日 10 次，之前生成雪林视频用了 6 次加测试耗尽）。等到 5 月 14 日额度刷新，重新跑，6 个分镜全部生成完成，用 ffmpeg 一行命令合成：ffmpeg -y -f concat -safe 0 -i stitch_comedy.txt -c copy comedy_30s.mp4。最终 28MB，30 秒，1920×1080，AAC 44100Hz 立体声。
**关键步骤**：ModelParam 加 "Mode": "pro" + "Sound": "on" 三行改动让声音有了，6 分镜顺序生成后 ffmpeg concat 拼接。

### 步骤 7：效果评估与人物连贯性问题
最终视频每段 5 秒画面质量不错，有灯光、观众席、演员动作，且确实带了声音（舞台环境音、观众背景声）。但硬伤是：每段里的人都不一样。第一段穿西装男的，第二段可能变成了另一个人，第三段又换了一张脸。这不是 bug，是多分镜拼接方案的本质问题——6 个分镜各自独立生成，AI 每次随机生成人物形象，没法保证同一个人。解决思路：用图生视频（Image-to-Video）先确定一张人物参考图，每段都基于同一张图生成；或等模型本身支持更长时长减少拼接段数。
**关键步骤**：多分镜拼接适合风景/场景/特效（人物连贯性不重要），涉及人物连贯性需换图生视频方案。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `你能生成视频吗？` | 确认 WorkBuddy 视频生成能力，获取多模态能力概览 |
| 2 | `黄昏时分，一列复古蒸汽火车穿过被雪覆盖的森林，蒸汽从烟囱袅袅升起` | 测试画面描述，验证文生视频效果（5 秒/16MB） |
| 3 | `为什么生成的视频只有5s，能生成30s的视频吗？` | 追问时长限制，发现 5 秒硬性上限 |
| 4 | `你生成视频使用的什么模型？` | 追问底层模型，确认是腾讯混元/Kling v2.6 |
| 5 | `你能看混元的api吗？` | 追问 API 文档访问权限，确认可读源码和查公开文档 |
| 6 | `你去调查下，混元api都支持多少s的视频生成，想办法生成30s的视频。5s的视频没有应用市场。` | 触发 WorkBuddy 读源码查文档，给出各模型时长对比和多分镜拼接方案 |
| 7 | `多分镜拼接（推荐）：混元 API 支持最多 6 个分镜，每个分镜可以独立生成 5~10 秒，然后拼接成完整长视频。6 个 5 秒分镜 = 30 秒。使用这个方案帮我生成 30s视频，我看下效果。` | 确认使用多分镜拼接方案生成 30 秒雪林火车视频 |
| 8 | `为什么生成的视频没有声音？` | 发现无声问题，触发音频支持调查 |
| 9 | `你从哪里看的，混元API只支持无声的？` | 追问出处，AI 发现自己答错，确认 sound: "on" 参数可开启音频 |
| 10 | `你帮我写一脱口秀的脚本，使用有上面的方案，带声音生成，然后合成我看下效果。` | 让 WorkBuddy 写脱口秀脚本并带声音生成 30 秒视频 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 一段 5 秒雪林火车测试视频（16MB，文生视频验证）
2. 一段 30 秒雪林火车无声视频（final_30s.mp4，74MB，6 分镜拼接）
3. 一段 30 秒脱口秀带声音视频（comedy_30s.mp4，28MB，1920×1080，AAC 44100Hz 立体声）
4. 脱口秀脚本（6 个分镜：出场/讲段子/无奈/得意/调皮/谢幕）
5. 各模型时长对比调查报告（Vidu/Kling/Hailuo/OS）

### 结果证明

![WorkBuddy 多模态内容生成能力概览](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRNEfNiafcJl4SqWpM6WAKaXpBkRDCl01jHIiaPrvF2GGoV3wnf56eRuAhQsdTwO4b9bZ8XcicqcZzUq9iboK81VTwKnzPmMl74erc4/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

![雪林火车测试视频生成成功约 90 秒 16MB](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbROxcCV69NrRCLaIyfXL0Rmbt4j0JITicFVicjL1feibGZA6m7COeay47juyAOUtbRic7EeNPvHKEuHJ63ibw9nuxHSBWnIqK3wA0wPU/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

![5 秒是模型硬性上限，不支持 30 秒](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRNh2HmdqUCX8vLO0XAFtjuWNdYbNQGKrOAwr3JUVv9W8Uib7FpU7xFChPJDXWjCLWzGNtTGOGgZaIchPhVFzew6fmKFkaF9W4vc/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

![底层模型是腾讯混元 Kling v2.6](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRNxh4TzDsQ4N1Lst9hgSVt8U8ucxAyam5wqwGYpOBHrEib7Aj1Tc2EtF1HxeUumFE2dibRAq4cOObjJtqRiaMPvGRddxbG3YEXKFk/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

![WorkBuddy 读源码查文档给各模型时长对比](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRMdFmgoC6oCWFibuHeRicegVYia54tJQqqkiaxqibInQwiaZFoBzGG3dEADRrDjwHHUHrnYK8rSgRe6AbicdmVqIicMgddg2FECCyA9Ty8/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

![30 秒雪林火车无声视频拼接完成 74MB](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRN2RnjtwT76RJkFznFsjmCsI6n2BiazRCpRcs5ibudO9oa33uZ9LxTzpaUBruaZPVbAnrXAiaso9WiciaXDoJLP5zHpl6h7JOWeuPZ4/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

![追问出处后 AI 改口：sound: "on" 可开启音频](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbROs4NibA4m8icqibOs53Fhk5xMn8NcJ5KKwmFjwvwjmlAfXzgrVLRicia5QAPk4xCThKNtIial7JEjlW4X0v8E0hIU9xiccCmZBACq8Zo/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)

![pro 模式 + sound on 参数详情](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRMQH0y4BencxVvLMQFX5icw4ia1aXmJL5tWE1S0nl1lsTr7hPg7vIFNOOK9U0eOZiaBLwczLIIGj2gd1iaplD8FRtfs09udOmBVtq0/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=9)

![带声音脱口秀脚本与生成过程](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbROXxoVDToyxas9DjcKYXAx3lmzNnFn3hBMX8vBTqlic9wXpa7obevNXDRCe22WlqsXfuNaXoRs8MPPibyZP5c3pJ6mPEwjAUKLaA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=10)

![API 额度耗尽等待刷新](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRMicxEeCr06z0CwxgnkNEIqGicR3fu7Zlibjm0b6c0nNRW7NezLw1iapxFzKs4kD7V89BFweWYzCCM3AVPF0yZA2JYcGWAoxscG3YY/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=12)

![最终 30 秒带声音脱口秀视频 28MB](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRNQQAVYEzdZx3lVJfYqxrMiatSrTBRIEOKHEhe0akH88EQoVkQ4yGNLx7oaPTiaxtfpY8OIe9wR75PFp2tGNQTSvN7cgjafiaXXec/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=14)

### 各模型最长视频时长对比表

| 模型 | 最长视频 | Duration 可选值 |
|---|---|---|
| Vidu viduq3-pro/turbo | 16 秒 | 1~16 |
| Kling | 10~15 秒 | 5、10（API 接口层）或 3~15（部分版本） |
| Vidu viduq2 系列 | 10 秒 | 1~10 |
| Hailuo | 10 秒 | 6、10 |
| OS | 12 秒 | 4、8、12 |

### 雪林火车 6 分镜拼接明细表

| 文件 | 大小 | 内容 |
|---|---|---|
| scene_1.mp4 | 15MB | 蒸汽火车驶入雪林 |
| scene_2.mp4 | 13MB | 穿越茂密雪松林 |
| scene_3.mp4 | 13MB | 俯瞰火车行驶 |
| scene_4.mp4 | 11MB | 冰湖倒影 |
| scene_5.mp4 | 12MB | 驶出森林进入雪原 |
| scene_6.mp4 | 11MB | 日落全景航拍 |
| final_30s.mp4 | 74MB | 30 秒拼接视频（无声） |
| comedy_30s.mp4 | 28MB | 30 秒脱口秀（带声音） |

## 八、验收标准

- [ ] 成功用"你能生成视频吗"触发 WorkBuddy 多模态内容生成能力
- [ ] 用测试描述生成 5 秒雪林火车视频（约 90 秒，16MB）
- [ ] 通过连续追问确认底层模型为腾讯混元/Kling v2.6
- [ ] WorkBuddy 主动读 buddy-cloud.py 源码发现 Duration 写死 5 秒
- [ ] 产出各模型最长视频时长对比表（Vidu/Kling/Hailuo/OS）
- [ ] 用多分镜拼接方案（6 段 5 秒顺序生成 + ffmpeg concat）生成 30 秒雪林火车视频（74MB）
- [ ] 追问"你从哪里看的"让 AI 发现自己答错，确认 sound: "on" 参数可开启音频
- [ ] 确认 pro 模式才支持音频，std 模式不行
- [ ] WorkBuddy 自动写脱口秀脚本（6 个分镜）
- [ ] ModelParam 加 "Mode": "pro" + "Sound": "on" 生成带声音视频
- [ ] 最终产出 30 秒带声音脱口秀视频（comedy_30s.mp4，28MB，1920×1080，AAC 44100Hz 立体声）
- [ ] 识别多分镜拼接的人物连贯性问题（每段人物形象不同）
- [ ] 给出解决思路（图生视频保证人物一致 / 等模型支持更长时长）
