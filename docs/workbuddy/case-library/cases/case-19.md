# Case 19｜不用敲命令！用这个 Skill 轻松获取视频素材

> **WorkBuddy 案例集 · 第 19 篇**
> 分类：视频与图像生成

---

## 一、场景描述

平时整理公众号素材，经常需要处理各类访谈视频。以往要么手动下载、要么折腾命令行，步骤繁琐还容易出错。

今天发现了 yt-dlp-downloader 这个 skill，直接把它发给 WorkBuddy 让它讲解功能，随后按流程执行，全程自然语言对话就能搞定视频下载、音频提取，最终还能提炼出视频里的核心内容，特别省心。

本次实操素材为 4 月 17 日罗永浩《罗永浩的十字路口》和梁建章对谈的 B 站视频，WorkBuddy 自动调用技能完成 MP3 提取，并最终整理出视频核心内容。

## 二、想要完成的任务

用 yt-dlp-downloader Skill 在 WorkBuddy 中完成"B 站视频下载 → 音频提取为 MP3 → 视频核心内容整理"的全流程，全程自然语言对话，不敲任何命令行。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| yt-dlp-downloader | 下载 B 站/YouTube 视频、提取音频为 MP3、抓取字幕 | WorkBuddy Skill 市场 | 网络、本地文件读写 |
| WorkBuddy 对话能力 | 让 AI 讲解技能、安装技能、整理视频内容 | 内置能力 | WorkBuddy 账号 |
| whisper-transcription（备选方案） | 转录 MP3 为文字（作者因空间不足未采用） | 备选 Skill | 本地磁盘空间 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 本机已安装 ffmpeg（Mac 提取音频前必备依赖）
3. 网络 available，可访问 B 站
4. 下载外网视频时需准备浏览器 Cookie（避免 403 报错）
5. 本技能仅用于个人学习素材处理，需遵守平台版权规则

## 五、在 WorkBuddy 中的操作

### 步骤 1：让 WorkBuddy 讲解 yt-dlp-downloader 技能
我直接把 yt-dlp-downloader 这个技能扔给 WorkBuddy，让它给我详细讲解这个技能到底是做什么的、具体能实现哪些操作，先把技能的功能和用法摸清楚。WorkBuddy 很快给出详细讲解：这个技能基于 yt-dlp 封装，不用手动敲复杂命令行，AI 会自动识别需求、生成并执行对应指令，支持下载 B 站/YouTube 等主流平台视频、提取音频为 MP3、抓取视频原生字幕，支持不同画质选择，还能处理各类网络异常。
**关键步骤**：把 Skill 名称发给 WorkBuddy，让它讲解功能、用法、安装方式与注意事项（如 Cookie、ffmpeg 依赖）。

### 步骤 2：安装技能
讲解完功能后，WorkBuddy 同步给出技能的安装方式与关键注意事项：下载外网视频通常需要搭配浏览器 Cookie 才能正常运行，否则可能出现 403 报错；Mac 设备提取音频前需提前安装 ffmpeg 依赖；技能仅用于个人学习素材处理，要遵守平台版权规则。了解清楚后，我直接让 WorkBuddy 帮我安装这个技能，整个过程很快，没有多余操作，安装完成后就可以直接投入使用。
**关键步骤**：让 WorkBuddy 一键安装 yt-dlp-downloader 技能，安装完即可使用。

### 步骤 3：B 站视频转 MP3
安装好之后，我直接把 4 月 17 日罗永浩《罗永浩的十字路口》和梁建章对谈的 B 站视频链接发给 WorkBuddy，让他把这个视频转成 MP3。收到指令后，WorkBuddy 立刻调用 yt-dlp-downloader 技能，自动执行音频提取指令，开启强制 IPv4 重试。全程无需手动调整参数，短短几十秒，就把视频里的音频完整提取出来，生成 MP3 文件自动保存到电脑下载文件夹。
**关键步骤**：把视频链接发给 WorkBuddy 说"转成 MP3"，AI 自动调用技能执行音频提取，几十秒生成 MP3 到下载文件夹。

### 步骤 4：尝试提取 MP3 内容整理成文档
提取完音频之后，我想进一步整理视频文字内容，就问了一句："能提取 mp3 中的主要内容整理成文档吗？"结果他说需要转录，给出的方案是 whisper-transcription。可我的电脑空间不足了……他改方案说可以直接下载字幕，我说可以，结果他说没有字幕！我给他瞎说，我都看到字幕了。最后他找到 AI 字幕，并基于字幕给我整理了视频核心内容。
**关键步骤**：MP3 转录方案因空间不足被放弃，改为下载 AI 字幕，AI 据字幕整理出视频核心内容。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `yt-dlp-downloader`（把技能名发给 WorkBuddy 并让它讲解） | 让 AI 讲解技能功能、用法、安装方式与注意事项 |
| 2 | `帮我安装下` | 让 WorkBuddy 一键安装 yt-dlp-downloader 技能 |
| 3 | `（B 站视频链接）把这个视频转成 MP3` | 触发 AI 调用技能提取音频，生成 MP3 到下载文件夹 |
| 4 | `能提取 mp3 中的主要内容整理成文档吗？` | 触发 AI 给出转录/字幕方案 |
| 5 | `可以`（确认下载字幕） | 触发 AI 下载 AI 字幕并整理视频核心内容 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 一份从 B 站视频提取的 MP3 音频文件（保存到下载文件夹）
2. 一份梁建章 x 罗永浩《十字路口》对谈的视频核心内容整理文档
3. 全流程零命令行的视频素材处理工作流

### 结果证明

![yt-dlp-downloader 技能讲解](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRNr71MNCva67qZeAge8iaUwpaEfevyMzsjcXspNfHU0vJQgAsz29BsQuPWltAx1B21gZe0xReicWosBIbBH9e5Ahwsl1nXQibgXAE/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

![技能典型使用方式](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRPhZ0AS5o4hIadKdqWndf5R1QZbH5jSyp3T0bOBnia3Lhic4IuX45wQ3byxQI4VfHf7oGdR2nwGZiaiaB4icb3dIiciaS8qd5KBRts4o8/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

![让 WorkBuddy 帮忙安装技能](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRMQ8REgdE0YSicwzb5NFd4Y8fK58XiacaFGvfUvicdWxVtjfYoZTXQSDwXBjriaJsEibSDQ74PD2iax6QxC4iabCLMMaSnEiaZfAHVt2Mc/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

![B 站视频转 MP3 提取指令](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRN3BzNuzNYSzibWw6EJcMkYXC6rhXFPuXicA84emt74e3vjgZds3YsPrdmY86Kwrxr8LXdRgZuLHMP1cdMtOvfLMryUc7ibd2Pic7M/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

![询问能否提取 MP3 内容整理成文档](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRPC30vbynqnxJWM7wR8Opx59Q7uM0WVHAO1F1rCBBmFmYfRslc21mOupr7EPRx4msNiaYlmOGprHglIyOiaWqhniahj6ZWssbCt3M/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

![whisper-transcription 转录方案](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRNfNuWtUHtyhs8cnXzBicdwZkf7K1J1PCz7LROSRia8Y9R8zCIF0QBz1Ag8yK8DbUttwYxeU91u81ZnNYBLibiapfBdo1NVe65HEmM/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

![空间不足后给出的其他方案](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRN1aMOXMjDZDOLOTYLtibPhA5emUhZh1rGp4uiby6s9AEfSrsKibNibYiatdiaCQtMhrAbPBur2rJt9Mcuq1IzQMRujCib00iaMTKRibqEg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

![AI 一开始说视频没有字幕](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRMF98gUpQyBYYia87z6fEcYwibILy8ib6skeWZPKdYZZDEly4ZCAEN71GjW0SAXiczbpYrhdib2JiaJ2ODaTUUbLfSBWibibGicPUWcWp2Y/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

![用户指正后 AI 找到 AI 字幕](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRPpmEEPdYl2A87Op4GE6Ug7s1vaylWWichhIuhYjZibdH4GgQ1fW2XElDY3aUCMicfibpiafhXrjnysOQsqu1bAXHtamkhtgrq9wYso/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)

![梁建章 x 罗永浩《十字路口》核心内容整理结果](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRNcQBxMia37B2ianOSmjeAbVTlxaf0Za9CXroCKgmgibibw9EpiavUO7ZXkPbMk5hJliaOVJxJrVic91Yk6VUs5iabHJjibqEkh0ueGPhmY/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=9)

## 八、验收标准

- [ ] WorkBuddy 能详细讲解 yt-dlp-downloader 技能的功能、用法与注意事项
- [ ] 技能成功安装，可直接调用
- [ ] 收到 B 站视频链接后能自动调用技能执行音频提取
- [ ] 几十秒内生成 MP3 文件并保存到下载文件夹
- [ ] 提取过程无需手动敲任何命令行
- [ ] 能针对 MP3 内容整理需求给出转录/字幕方案
- [ ] 在空间不足场景下能切换为下载 AI 字幕方案
- [ ] 最终输出视频核心内容整理文档（梁建章 x 罗永浩《十字路口》）
- [ ] 全程零命令行，纯自然语言对话完成
