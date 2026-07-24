# Case 03｜零代码！语聊 20 分钟，2048 游戏直接上线

> **WorkBuddy 案例集 · 第 3 篇**
> 分类：网站与应用开发

---

## 一、场景描述

一位没有写代码经验的用户，早上起来随手打开 WorkBuddy，想做一个 2048 小游戏玩。全程通过语音对话方式与 AI 沟通，没有写一行代码。

之前他做过一个"熊猫接竹子"的游戏并部署上线，这次想让 WorkBuddy 用同样的方式再做一个 2048。整个过程从开口提需求到游戏上线可玩，大约花了 20 多分钟，中间经历了需求表达错误、部署位置遗忘、界面 bug、动画不流畅、音效引发新 bug 等多次调整，全部通过语音对话解决。

关键突破在于 WorkBuddy 现在支持微信直接截图识别图片内容，调试时不需要手动描述错误现象，直接截图发送，AI 就能自己看懂问题所在，比人工描述还准确。

## 二、想要完成的任务

用纯语音对话方式让 WorkBuddy 编写一个 2048 H5 小游戏，部署到 Cloudflare Pages，并通过微信截图识别快速调试修复 bug，最终上线可玩。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| 语音输入对话 | 通过语音描述需求，WorkBuddy 转写并执行 | WorkBuddy 语音输入 | 麦克风权限 |
| H5 游戏代码生成 | 生成 2048 游戏的 HTML/CSS/JavaScript 代码 | WorkBuddy 内置代码生成能力 | 本地文件读写权限 |
| GitHub 推送 | 将游戏文件推送到 GitHub 仓库 | WorkBuddy Git 集成 | GitHub 账号配置 |
| Cloudflare Pages 部署 | 通过 Git 推送自动触发 Cloudflare Pages 部署 | 外部平台集成 | Cloudflare Pages 项目配置 |
| 微信图片识别 | 识别微信截图中的游戏界面 bug，定位问题 | WorkBuddy 多模态识别 | 无额外权限 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 桌面端，支持语音输入。
2. 已有 GitHub 账号并在 WorkBuddy 中配置好 Git。
3. 已有 Cloudflare Pages 项目并绑定自定义域名（本例为 `panda.yaniw.com`）。
4. 已有一个可复用的 GitHub 仓库（本例为 `zgedu-new/panda-bamboo-game`）。
5. 微信端可正常发送截图给 WorkBuddy。

## 五、在 WorkBuddy 中的操作

### 步骤 1：语音提需求并修正

用语音告诉 WorkBuddy 要做什么游戏，并修正口误。

**关键步骤**：用户先说"帮我写一个 1024H5 小游戏"，随后改口"说错了，是 2048 那种"。WorkBuddy 生成游戏文件 `game-1024.html`，并将目标数字改为 2048，支持手机触摸滑动控制、分数记录、本地保存。

### 步骤 2：部署到 Cloudflare Pages

让 WorkBuddy 把游戏部署到原来熊猫接竹子游戏的同一位置。

**关键步骤**：WorkBuddy 一开始忘记了上次部署位置，用户提醒它去找原来的 Git 配置。WorkBuddy 找到仓库 `zgedu-new/panda-bamboo-game`，将 2048 游戏文件放入该仓库并推送到 GitHub，Cloudflare Pages 自动部署，访问地址为 `https://panda.yaniw.com/game-2048.html`。

### 步骤 3：截图反馈界面 bug 并修复

第一版上线后界面有 bug，方块位置跑到格子外面，玩不了。用户直接截图发给 WorkBuddy。

**关键步骤**：WorkBuddy 识别截图后定位问题——方块位置不对，跑到外面去了。改用 CSS Grid 布局重新修复，推送到 GitHub 后 Cloudflare Pages 自动重新部署。

### 步骤 4：加滑动动画和音效

bug 修好后动画不流畅，用户要求加滑动动画和合并音效。

**关键步骤**：WorkBuddy 新增滑动动画（0.12 秒流畅移动）、合并音效（根据数值高低音调不同）、移动音效、胜利音效（叮叮叮旋律），推送部署。

### 步骤 5：修复音效引发的新 bug

加了音效后，方块又飘出格子外面。用户再次截图反馈。

**关键步骤**：WorkBuddy 识别问题——`tiles-container` 的 `top: 8px; left: 8px;` 与 JavaScript 计算位置时不一致，导致偏移 8px。修复 `tiles-container` 定位从 8px 改为 0px，并修正 `cellSize` 计算考虑 grid 的 padding。重新推送部署，方块位置对齐。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `你帮我写一个1024H5小游戏` | 初次提需求 |
| 2 | `说错了，是2048那种。2048那种小游戏` | 修正需求为目标 2048 |
| 3 | `我部署到我原来那个与那个熊猫接榫的游戏，部署到一个地方去。` | 要求部署到原熊猫游戏同一位置 |
| 4 | `你上一次不是部署过吗?熊猫接触的游戏已经部署到线上了呀,你看一下记录,上一次在哪里部署的,这一次部署在同一个地方。` | 提醒 WorkBuddy 查找历史部署记录 |
| 5 | `推到get上面去，然后用那个cloud fly, 嗯，那个叫什么cloud fly fly部署到我那个域名下面去,怎么会忘了呢?` | 要求用 Cloudflare Pages 部署 |
| 6 | `你你把这个游戏的文件放在熊猫熊猫接锁的一个目录，熊猫接锁的那个get配置好了。` | 指定使用原仓库的 Git 配置 |
| 7 | `你检查一下这个游戏，你看这个界面有bug呀，玩不了。` | 截图反馈界面 bug |
| 8 | `滑动的时候，没有滑动动画呀，就是不流畅。然后合并的时候，加个音效。` | 要求加滑动动画和合并音效 |
| 9 | `为什么加了音效之后，这个滑块飘出来了，不在格子里边了?` | 截图反馈音效引发的新 bug |

## 七、在 WorkBuddy 中的效果

### 交付物

1. **1 个 2048 H5 小游戏 HTML 文件**（`game-2048.html`）
2. **1 个可公开访问的线上游戏地址**（`https://panda.yaniw.com/game-2048.html`）
3. **游戏功能**：4×4 格子随机生成数字方块、上下左右滑动合并相同数字、声音开关、背景音乐、分数实时显示、重新开始

### 结果证明

**第一步：语音提需求并修正**

![语音提需求并修正为2048](/images/workbuddy-cases/case-03/01.jpg)

**第二步：部署到原熊猫游戏同一位置**

![部署到原熊猫游戏位置](/images/workbuddy-cases/case-03/02.jpg)

**第三步：推送到 Git 并用 Cloudflare Pages 部署**

![推送到Git并用Cloudflare Pages部署](/images/workbuddy-cases/case-03/03.jpg)

**第四步：截图反馈界面 bug 并修复**

![截图反馈界面bug并修复](/images/workbuddy-cases/case-03/04.jpg)

**第五步：加滑动动画和合并音效**

![加滑动动画和合并音效](/images/workbuddy-cases/case-03/05.jpg)

**第六步：修复音效引发的新 bug**

![修复音效引发的新bug](/images/workbuddy-cases/case-03/06.jpg)

**最终上线效果**

![2048游戏最终上线效果](/images/workbuddy-cases/case-03/07.jpg)

### 效果对比

| 环节 | 传统开发 | 使用 WorkBuddy |
|---|---|---|
| 编写 2048 游戏代码 | 需掌握 HTML/CSS/JS，数小时 | 语音一句话生成 |
| 部署上线 | 手动配置 Git、Cloudflare | 语音指令自动推送部署 |
| 调试界面 bug | 手动查看代码定位 | 微信截图 AI 自动识别 |
| 加动画音效 | 手写动画和 Web Audio API | 语音描述需求自动实现 |
| 全流程 | 数小时～数天 | 约 20 分钟 |

## 八、验收标准

- [ ] 通过语音对话生成可运行的 2048 H5 小游戏 HTML 文件
- [ ] 游戏目标数字为 2048（非 1024）
- [ ] 游戏成功推送到 GitHub 仓库 `zgedu-new/panda-bamboo-game`
- [ ] Cloudflare Pages 自动部署，访问地址 `https://panda.yaniw.com/game-2048.html` 可正常打开
- [ ] 游戏支持手机触摸滑动控制和电脑方向键操作
- [ ] 方块位置与格子对齐，无飘出格子的 bug
- [ ] 滑动有动画效果（约 0.12 秒流畅移动）
- [ ] 合并、移动、胜利均有音效
- [ ] 分数实时显示，支持重新开始
- [ ] 全流程耗时 **< 30 分钟**，无需手写一行代码
