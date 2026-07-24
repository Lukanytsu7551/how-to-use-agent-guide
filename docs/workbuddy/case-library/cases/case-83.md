# Case 83｜我给公众号绑了个AI客服，零代码

> **WorkBuddy 案例集 · 第 83 篇**
> 分类：网站与应用开发

---

## 一、场景描述

公众号读者每天发来几百条消息——「这个效果怎么做」「那个同步我为什么不行」「上次你说的那个东西是什么来着」，根本回不过来。用关键词自动回复又太蠢，问「多少钱」触发了一次，问「价格」就触发不了。本篇记录如何用 IMA 知识库 + 微信小程序跳转，给公众号绑一个真正的 AI 客服，零代码十分钟搞定。读者点公众号菜单栏按钮直接跳进 IMA 知识库小程序，在指定知识库里随便问，背后是 DeepSeek 模型基于上传资料回答。

## 二、想要完成的任务

使用 WorkBuddy 管理 IMA 知识库（批量导入公众号历史文章），在 IMA 桌面端创建共享知识库并拿到 shareId，在公众号后台关联 IMA 小程序，配置自定义菜单跳转小程序路径 `pages/index/index?shareId=你的shareId`，发布后读者点菜单「AI客服」按钮即可跳进知识库提问。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| IMA 知识库（ima-skills） | 创建/管理共享知识库、批量导入公众号历史文章 | WorkBuddy Skill | IMA 账号 |
| 微信公众平台 | 关联 IMA 小程序、配置自定义菜单跳转小程序 | 公众号后台 | 公众号管理员权限 |
| DeepSeek 模型 | IMA 知识库背后提供 AI 回答能力 | IMA 内置 | 无需单独配置 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 已有 IMA 桌面端或手机端，并能登录
3. 已有微信公众号管理员权限（不是管理员需找人扫码）
4. 公众号已实名认证

## 五、在 WorkBuddy 中的操作

### 步骤 1：用 WorkBuddy 管理 IMA 知识库
在 WorkBuddy 里操作 IMA 知识库比在 IMA 客户端里方便——不用翻文件夹、不用一个个点上传，直接说一句话。比如「帮我把公众号最近 80 篇历史文章全部同步 IMA 知识库，文件名用文章标题」。WorkBuddy 十几秒搞定。爬文章、复制粘贴、一个个创建笔记的体力活全免了。
**关键步骤**：WorkBuddy 批量同步公众号历史文章到 IMA 知识库。

### 步骤 2：建共享知识库拿 shareId
打开 IMA 桌面端，把想让读者问到的资料全丢进去——FAQ 文档、价格表、产品说明、退货流程、联系方式、公众号历史文章。然后点「共享」让它公开可见。点右上角「分享」→「复制链接」，得到地址：`https://ima.qq.com/wiki/?shareId=090c36e38192aa26f03bd9e0d99c01a31...`。记住这段 shareId，后面配置菜单要用。
**关键步骤**：IMA 知识库点「共享」公开，复制链接拿到 shareId。

### 步骤 3：公众号后台关联 IMA 小程序
公众号后台 → 广告与服务 → 小程序管理 → 点击「关联小程序」。管理员扫码授权。搜索「IMA知识库」，找到之后点关联。看到「关联成功」就对了。注意这一步需要有公众号管理员权限，不是管理员的话找人扫一下就行。
**关键步骤**：公众号后台小程序管理 → 关联「IMA知识库」小程序 → 管理员扫码授权。

### 步骤 4：配置菜单栏
公众号后台 → 互动管理 → 自定义菜单 → 添加菜单。先选「跳转小程序」，然后选「IMA知识库」。关键一步：在「小程序路径」里把第二步拿到的 shareId 拼进去。路径格式：`pages/index/index?shareId=你的shareId`。备用网页留空。右下角点「保存并发布」，确认发布。菜单 24 小时内对所有用户生效。
**关键步骤**：自定义菜单选「跳转小程序」→「IMA知识库」，路径填 `pages/index/index?shareId=xxx`，保存并发布。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `帮我把公众号最近 80 篇历史文章全部同步 IMA 知识库，文件名用文章标题。` | WorkBuddy 批量同步文章到知识库 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. IMA 共享知识库（含公众号历史文章、FAQ、产品说明等资料）
2. 公众号菜单栏「AI客服」按钮（点击跳转 IMA 小程序指定知识库）
3. 知识库 shareId 配置完成的菜单跳转路径
4. 读者可用的 AI 客服入口（基于 DeepSeek 模型回答）

### 结果证明

![IMA 知识库内容列表](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRMeHte2icWesvUyD5t4QF8OdcUYIyAeuBOHDsXzt88vgiclasniaRqWrVUXUYDJxaYCW7EkTHjfDVfsW6dwylp5NTvXibVCPeoFR9A/640?wx_fmt=png&watermark=1#imgIndex=0)

![IMA 知识库分享面板](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRMLdR3r8ia3a9eibywj9YebtY7bOKzO6YkCw5GRbH12W3KRyab8sMldibVNvNB5icicNB1k4T3AjdpSF1vcbOmEicYKRlL3icObsPpjUo/640?wx_fmt=png&watermark=1#imgIndex=1)

![公众号后台小程序管理](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRPM8H1Q1u5z4icIibsnh5OnmBckrp9HIQVCz11OBdFru51VibtrPib0tKhDLibHeKIkzARfvjqAKYEVRdeKCKVK9Z9TUbzicsbFT9ibGI/640?wx_fmt=png&watermark=1#imgIndex=2)

![关联小程序验证身份](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRMFU4YzC6w111yD5R4sYnl4XKY72Du7oyp9HRDcttdSNSc5qZs8f6m2ic5yf1DwxDWSaXfR8aEqH5ibiaGWBBCW5LM9IlDAiaRz0Ko/640?wx_fmt=png&watermark=1#imgIndex=3)

![搜索 IMA 知识库小程序](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRMPE0DLnZfPUicyJLhvArcQJVtFsgCf4aibbvslduLmXVUqLZuMvHTQWFCULM7bVU6hBbiakmQt4jS6mneskhLNibNezrjmkGibgZicQ/640?wx_fmt=png&watermark=1#imgIndex=4)

![关联成功显示已关联](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRNNPxHkZLicbO4uhkqP2IIRY8iaMquhZicEWSQadicLxKNFLlnKiclzvJehmPuBfTHWdqv0j8veEXwL91AneO6z4qksMZYVpibQUnOTw/640?wx_fmt=png&watermark=1#imgIndex=5)

![自定义菜单选跳转小程序](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRO74nwdIsmUsCvWzAibuoNuZmCjic3E2vEJR4rvau9TXV4pCXk0Qy2nYvibHDHJRk0Nqiawh9vjGxMedMgaSzqtAFD3hWgtSWcjjrk/640?wx_fmt=png&watermark=1#imgIndex=6)

![小程序路径填 shareId](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbROialwNnH87ribIpNZagT5EbTzMn8A3OkxXzkJ3mwqicQXeu6VpujOHibTwibNCicGhO6tK2evZ8Cc55W4Mic1oicPBJTsEFSAmAM3T56Q/640?wx_fmt=png&watermark=1#imgIndex=7)

![保存并发布菜单](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRNfKAiaTINumAqPqMCWgibhLCiatm0RibxmYY7zr9j6icTvTksiciccCYQyCLFWps5OicwAaicY1KK48KKLAnMxR8G0329qu4eGXx6Bot18/640?wx_fmt=png&watermark=1#imgIndex=8)

![确认发布提示框](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRNV7JZDy0FFy9WbmJtUGHeyXZ7qgp8JWKLSPZcHwibjk6icqSiaicvWQ2psxm71wLzXtqBsQdfoxBribMKlGia5RRCYmibd3sCyORGgE4/640?wx_fmt=png&watermark=1#imgIndex=9)

![手机端公众号底部 AI 客服按钮](https://mmbiz.qpic.cn/sz_mmbiz_jpg/s516EMWvbROMPUhNP0CQLsnb8Tw0hfpLicOCJuGSpnclBZlXzh5aQr4V7TCpflpXM7IsPrd2Jqd9FCsOu9h272vyrPc8IBQe6aibw7QJYOV6A/640?wx_fmt=jpeg&watermark=1#imgIndex=10)

![读者点按钮进入 IMA 知识库提问](https://mmbiz.qpic.cn/mmbiz_jpg/s516EMWvbRO5CFj7FicCAa7hvGJRYUnUPAqt7n6icTetmf7f0PViaHlk9opLqJoxrYx45CGwEEpF1icxw3mjUf7Bnbk0qicrL2yZtoXgvfkJ5iaoQ/640?wx_fmt=jpeg&watermark=1#imgIndex=11)

## 八、验收标准

- [ ] IMA 知识库已创建并设置「共享」公开可见
- [ ] 已复制知识库分享链接拿到 shareId
- [ ] 公众号后台「广告与服务 → 小程序管理」已关联「IMA知识库」小程序
- [ ] 关联时管理员已扫码授权完成
- [ ] 公众号后台「互动管理 → 自定义菜单」已添加菜单
- [ ] 菜单消息类型选「跳转小程序」
- [ ] 小程序选「IMA知识库」
- [ ] 小程序路径填 `pages/index/index?shareId=你的shareId`
- [ ] 备用网页留空
- [ ] 已点「保存并发布」并确认发布
- [ ] 手机端公众号底部出现「AI客服」按钮
- [ ] 读者点按钮可跳进指定 IMA 知识库
- [ ] 知识库背后是 DeepSeek 模型，基于上传资料回答不胡编
- [ ] 全程零代码，未写一行后端代码
- [ ] WorkBuddy 用于批量同步公众号历史文章到 IMA 知识库
