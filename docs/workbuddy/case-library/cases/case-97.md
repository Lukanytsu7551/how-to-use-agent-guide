# Case 97｜想做个泡泡玛特发展史PPT还要能在线看？WorkBuddy从生图到部署一条龙

> **WorkBuddy 案例集 · 第 97 篇**
> 分类：办公协同与效率提升

---

## 一、场景描述

朋友丢过来一句话：「能不能帮我搞个泡泡玛特发展史的小PPT，要好看点，每页都得有个IP角色，最好还能发链接让我在线翻。」13页PPT、每页一个潮玩IP、还得卡通风、还得能部署上线——搁以前得先找一圈版权图、再在PPT里一张张排版、最后还得租个服务器或者用某网盘生成分享。把需求原样甩给 WorkBuddy，没抱太大希望，结果它一条龙干完了。

## 二、想要完成的任务

让 WorkBuddy 用一句话需求完成：搭前端PPT脚手架定粉紫黄三色卡通风、调混元生图技能现画9张无水印IP角色图、写13页内容每页一个IP按时间线排好、导出41MB可编辑 .pptx、部署到 CloudStudio 生成在线分享链接。全程不需要自己在五个工具之间来回切。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| WorkBuddy Agent | 网页PPT开发 + 内容编排 + 导出 + 部署 | WorkBuddy 内置 | WorkBuddy 账号 |
| 混元生图（无水印技能） | 生成9张1024×1024卡通IP角色图 | WorkBuddy 内置 | WorkBuddy 账号 |
| Vite 网页PPT方案 | 前端脚手架搭建 | WorkBuddy 内置 | 无 |
| CloudStudio 部署 | 一键推上线拿分享链接 | WorkBuddy 内置 | WorkBuddy 账号 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 有 CloudStudio 部署能力可用
3. 有混元生图技能（带无水印技能自动关掉水印）

## 五、在 WorkBuddy 中的操作

### 步骤 1：一句话提需求
说「帮我做一个popmart发展史ppt，每一页都要有一个ip」。WorkBuddy 带着需求直接开干，用 Vite 网页PPT方案搭起前端脚手架，定了全局风格：粉 #FF4D8D、紫 #7C4DFF、黄 #FFC400 三色打底，圆润卡通风。
**关键步骤**：一句话需求 → 搭前端脚手架 + 定三色卡通风。

### 步骤 2：调混元生图画9张IP图
泡泡玛特的IP不能乱用官方版权图，WorkBuddy 直接调混元生图（带了个「无水印」技能自动关掉水印），按每个角色的特征写了提示词，一口气生成了9张1024×1024的卡通图：LABUBU（尖耳獠牙）、MOLLY（撅嘴湖绿眼）、DIMOO、SKULLPANDA、HIRONO小野、PUCKY、CRYBABY哭娃、Sonny Angel，以及一张IP总览网格图。后来专门让 WorkBuddy 核对过，9张图 MD5 全不一样，不是同一张图复用的。
**关键步骤**：调混元生图 + 无水印技能 → 9张独立IP图 + MD5核对各不相同。

### 步骤 3：写13页内容每页一个IP
骨架和图都有了，WorkBuddy 往里填内容，严格按「每页一个IP」来排：封面LABUBU、目录IP网格、2010-2015起步Sonny Angel、2016 MOLLY元年、2017 DIMOO、2018 THE MONSTERS LABUBU、2019 SKULLPANDA、2020上市HIRONO、2021-22全球扩张PUCKY、2023现象级LABUBU、2024破百亿CRYBABY、IP总览网格、结尾LABUBU。
**关键步骤**：13页内容按时间线排好，每页对应一个IP。

### 步骤 4：导出PPTX + 部署上线
说「这个生成的ppt是个网页是吧，你帮我把这个部署到线上我看看」。WorkBuddy 两步搞定：用内置导出把网页PPT压成一个 41MB 的 presentation.pptx（13页带图能直接编辑），然后用 CloudStudio 部署工具把网页版推上线返回分享链接。浏览器里点开链接 ← → 就能翻页跟本地一模一样。
**关键步骤**：导出41MB可编辑.pptx + CloudStudio部署拿分享链接。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `帮我做一个popmart发展史ppt，每一页都要有一个ip` | 一句话提需求 |
| 2 | `这个生成的ppt是个网页是吧，你帮我把这个部署到线上我看看。` | 部署上线拿链接 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 网页版 PPT 工程（Vite + 粉紫黄三色卡通风）
2. 9张1024×1024无水印卡通IP角色图（MD5各不相同）
3. 13页内容（封面/目录/2010-2024时间线/IP总览/结尾，每页一个IP）
4. 41MB 可编辑 presentation.pptx
5. 在线分享链接：https://b54a568fbd7b4dfdb815310858de726d.app.codebuddy.work

### 结果证明

![WorkBuddy 接收一句话需求开始做PPT](/images/workbuddy-cases/case-97/01.png)

![9张IP角色图：LABUBU/MOLLY/DIMOO/SKULLPANDA等](/images/workbuddy-cases/case-97/02.png)

![封面页：2010-2024品牌简史](/images/workbuddy-cases/case-97/03.png)

![2016 MOLLY元年页](/images/workbuddy-cases/case-97/04.png)

![2018 THE MONSTERS出海元年页](/images/workbuddy-cases/case-97/05.png)

![2024营收破百亿页](/images/workbuddy-cases/case-97/06.png)

![IP宇宙总览页](/images/workbuddy-cases/case-97/07.png)

![部署上线拿到分享链接](/images/workbuddy-cases/case-97/08.png)

![线上预览效果：浏览器翻页](/images/workbuddy-cases/case-97/09.png)

## 八、验收标准

- [ ] 一句话需求发出后 WorkBuddy 搭起 Vite 网页PPT脚手架
- [ ] 全局风格定为粉#FF4D8D/紫#7C4DFF/黄#FFC400 三色卡通风
- [ ] 调混元生图（无水印技能）生成9张1024×1024卡通IP图
- [ ] 9张图 MD5 各不相同（不是同一张图复用）
- [ ] 13页内容严格按「每页一个IP」排列
- [ ] 13页时间线覆盖：封面/目录/2010-2015起步/2016 MOLLY/2017 DIMOO/2018 LABUBU/2019 SKULLPANDA/2020上市/2021-22扩张/2023现象级/2024破百亿/IP总览/结尾
- [ ] 导出 41MB 可编辑 presentation.pptx
- [ ] 部署到 CloudStudio 返回在线分享链接（.app.codebuddy.work）
- [ ] 浏览器里 ← → 能翻页跟本地一模一样
- [ ] 全程不需要自己在五个工具之间来回切
