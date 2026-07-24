# Case 72｜封装一个公众号贴图技能，从生图到发草稿全自动

> **WorkBuddy 案例集 · 第 72 篇**
> 分类：内容创作与新媒体运营

---

## 一、场景描述

微信公众号出了个贴图功能（2026 年 2 月灰度上线，形态对标小红书，不用写长文，一张图加一句话就能发）。问 WorkBuddy 知不知道，它说不清楚，让它去搜，搜得浮皮潦草直接下结论说「贴图没有独立 API」。把微信官方文档链接甩过去，它读完才承认——article_type=newspic 明明写在那儿，贴图跟图文走的是同一个草稿箱接口，只是换了个类型。搞明白接口后，意识到这跟 WorkBuddy 封装技能的逻辑几乎一样，为什么不把整个过程封装成一个可复用的技能？

## 二、想要完成的任务

基于微信公众平台的 draft/add 接口（article_type=newspic）封装一个名为 wechat-tietu 的 WorkBuddy 技能，输入标题、正文、图片路径后自动完成生图（混元无水印）、素材上传、草稿创建全流程，并修复中文乱码、换行符字面文本、标题超字节、IP 白名单、凭证路径等 5 个坑。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| wechat-tietu（自封装技能） | 一句触发完成规划内容→生图→上传素材→创建草稿全流程 | 用户自封装 | 微信公众号 AppID/AppSecret + IP 白名单 |
| 混元生图（无水印） | 生成 768×1024 竖版贴图样张 | WorkBuddy 内置 | WorkBuddy 账号 |
| draft/add 接口 | 微信公众平台草稿箱接口，article_type=newspic 为贴图类型 | 微信官方 API | access_token |
| material/add_material 接口 | 上传永久素材获取 media_id | 微信官方 API | access_token |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 拥有微信公众号开发者权限（AppID + AppSecret）
3. 调用方公网 IP 已加入微信公众号 IP 白名单
4. 本地已配置 `~/.workbuddy/wechat.env` 凭证文件
5. 已安装混元生图技能（或可切换 DALL·E/即梦/Nano Banana）

## 五、在 WorkBuddy 中的操作

### 步骤 1：确认接口能力
把微信官方文档链接发给 WorkBuddy，让它读 draft/add 接口文档。确认 article_type 参数有两个值：news（默认图文）和 newspic（图片消息，就是贴图）。贴图需要的字段：title（标题最多 32 字节）、content（正文）、image_info.image_list（图片列表最多 20 张，第一张为封面），话题关键字无独立字段，在正文里用 #话题名# 实现。
**关键步骤**：通过官方文档确认 article_type=newspic 为贴图类型。

### 步骤 2：封装 wechat-tietu 技能
跟 WorkBuddy 说「帮我把这个过程封装成 skill」。生成了技能结构：`~/.workbuddy/skills/wechat-tietu/` 包含 `SKILL.md`（完整流程文档）和 `scripts/tietu_publish.py`（核心脚本）。生图环节不写死，默认用混元无水印，一句话可切换 DALL·E、即梦、Nano Banana。
**关键步骤**：技能结构清晰，生图模型可选，凭证自动查找。

### 步骤 3：修复坑一——中文全变乱码
草稿创建成功但打开后台标题正文全是 \uff0c、\u5de5 这种转义序列。原因是 requests 的 post(json=payload) 默认把中文转成 \uXXXX 转义序列。修复为手动序列化：`resp = requests.post(url, data=json.dumps(payload, ensure_ascii=False).encode("utf-8"), headers={"Content-Type": "application/json; charset=utf-8"})`。
**关键步骤**：关掉 ensure_ascii，中文以 UTF-8 原文发送。

### 步骤 4：修复坑二——换行符成字面文本
第二篇草稿正文里赫然写着 \n\n。因为命令行的 \n 传到 Python 里是两个字面字符。WorkBuddy 在脚本里加了 `args.content = args.content.replace("\\n", "\n")` 自动转换。
**关键步骤**：脚本自动将字面 \n 转为真换行。

### 步骤 5：修复坑三——标题报 45003
标题「记住这3个AI生图公式」15 个字怎么还报超限。微信贴图标题限制是 32 字节（UTF-8），不是 32 个字。中文字在 UTF-8 里一个占 3 字节，15 个中文字 = 45 字节，超了。改成短标题「3款AI，画出三种世界」（8 个字 = 24 字节）才过去。WorkBuddy 顺手把这个坑更新到了技能文档的错误码表里。
**关键步骤**：标题限制是 32 字节非 32 字，中文占 3 字节/字。

### 步骤 6：修复坑四——IP 白名单没设
不设的话 access_token 都拿不到。微信要求把调用方公网 IP 加入白名单。WorkBuddy 把这个提醒加到了技能的「首次使用：凭证配置」章节，脚本里做了自动检测——遇到 40164/61004 错误时自动 curl ifconfig.me 查出口 IP 并打印设置指引。
**关键步骤**：遇到 40164/61004 错误自动查出口 IP 并打印设置指引。

### 步骤 7：修复坑五——凭证路径不通用
初版脚本凭证路径写死在 `~/.baoyu-skills/.env`，别人没有这个目录。WorkBuddy 改成自动查找：先找 `~/.workbuddy/wechat.env`（所有用户都有），找不到再 fallback 到旧路径。
**关键步骤**：凭证路径自动查找，新用户创建 `~/.workbuddy/wechat.env` 即可用。

### 步骤 8：一口气发 5 篇草稿
让 WorkBuddy 出个系列选题「AI工具美学」5 篇贴图，从选题到生图到草稿全部一条龙。每篇配 2-3 张混元无水印生图（768×1024 竖版），加上正文和话题标签，五篇草稿全部创建成功，就等在后台手动点「发布」。
**关键步骤**：5 篇贴图草稿全部创建成功。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `你好好看下这个接口文档，这里面不是有类型图片消息吗？` | 让 WorkBuddy 读官方文档确认 article_type=newspic |
| 2 | `发贴图除过发图片，还需要什么？贴图内容和图片，标题，话题关键字，你要帮我准备好。` | 确认贴图字段需求 |
| 3 | `帮我把这个过程封装成 skill` | 封装 wechat-tietu 技能 |
| 4 | `发贴图，主题是XXX` | 一句触发全流程：规划内容→生图→上传素材→创建草稿 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. wechat-tietu 技能（SKILL.md + tietu_publish.py），生图模型可选、凭证自动查找、错误有详细指引
2. 「AI工具美学」系列 5 篇贴图草稿全部创建成功（Hook 吸引型/干货教学型/对比展示型/场景代入型/总结推荐型）
3. 每篇配 2-3 张混元无水印生图（768×1024 竖版）
4. 技能文档错误码表（含 45003 标题超字节、40164/61004 IP 白名单等坑）

### 结果证明

![WorkBuddy 搜索贴图功能详情](/images/workbuddy-cases/case-72/01.png)

![draft/add 接口 article_type=newspic 确认](/images/workbuddy-cases/case-72/02.png)

![贴图字段确认表](/images/workbuddy-cases/case-72/03.png)

![混元生图贴图样张](/images/workbuddy-cases/case-72/04.png)

![5篇贴图草稿在公众号后台草稿箱](/images/workbuddy-cases/case-72/05.jpg)

## 八、验收标准

- [ ] WorkBuddy 读完官方文档后确认 draft/add 接口 article_type 参数有 news 和 newspic 两个值
- [ ] 贴图字段确认：title（≤32 字节）、content、image_info.image_list（≤20 张），话题用 #话题名# 嵌入正文
- [ ] wechat-tietu 技能目录 `~/.workbuddy/skills/wechat-tietu/` 包含 SKILL.md 和 scripts/tietu_publish.py
- [ ] 生图环节不写死，默认混元无水印，可一句话切换 DALL·E/即梦/Nano Banana
- [ ] 中文乱码修复：使用 `json.dumps(payload, ensure_ascii=False).encode("utf-8")` 手动序列化
- [ ] 换行符修复：脚本自动执行 `args.content.replace("\\n", "\n")`
- [ ] 标题 45003 修复：标题限制为 32 字节（UTF-8），中文占 3 字节/字，「3款AI，画出三种世界」24 字节通过
- [ ] IP 白名单检测：遇到 40164/61004 错误自动 curl ifconfig.me 查出口 IP 并打印指引
- [ ] 凭证路径自动查找：先找 `~/.workbuddy/wechat.env`，找不到 fallback 到旧路径
- [ ] 「AI工具美学」5 篇贴图草稿全部创建成功（WorkBuddy你的AI数字搭子/记住这3个AI生图公式/3款AI画出三种世界/一个打工人的AI24小时/2026AI工具箱升级指南）
- [ ] 每篇配 2-3 张混元无水印生图（768×1024 竖版）
- [ ] 技能文档错误码表包含 45003、40164、61004 等坑
