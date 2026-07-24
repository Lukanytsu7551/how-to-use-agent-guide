# Case 54｜外甥玩数独被广告打断，顺手让WorkBuddy帮他写了一个

> **WorkBuddy 案例集 · 第 54 篇**
> 分类：网站与应用开发

---

## 一、场景描述

周末去看 7 岁的小外甥，他最近迷上了数独。他打开一款数独 App 玩得挺专注，然后广告来了——全屏广告，要等 15 秒才能关的那种，中间偶尔还有个"跳过"按钮但有时候点了没反应。小孩最烦这个，他皱着眉头把 iPad 往桌上一放说："舅舅，这个游戏有好多广告。"我说："你等一下。"然后打开了 WorkBuddy。

## 二、想要完成的任务

用 WorkBuddy 的「高级开发工程师」专家，一句话生成一个专为 7 岁儿童设计、浏览器直接运行、三端自适应（PC/手机/iPad）的趣味数独闯关游戏，含背景音乐、激励奖励、等级关卡、新手引导，无广告，并部署上线让外甥直接在 iPad 上玩。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| 高级开发工程师 | 全栈开发，HTML+CSS+JS 一把梭从需求到交付 | WorkBuddy 专家中心 | WorkBuddy 账号 |
| frontend-design 技能 | 前端开发工作流 | WorkBuddy 技能市场 | WorkBuddy 账号 |
| Web Audio API | 生成背景音乐和音效 | 浏览器内置 | 无 |
| localStorage | 本地进度保存 | 浏览器内置 | 无 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 在专家中心召唤「高级开发工程师」
3. 部署上线需要部署能力（CloudStudio/Cloudflare 等）

## 五、在 WorkBuddy 中的操作

### 步骤 1：召唤高级开发工程师
在 WorkBuddy 的专家中心里找到「高级开发工程师」——专门做前端开发的全栈工程师，擅长 HTML+CSS+JS 一把梭，从设计到代码一条龙。
**关键步骤**：专家中心召唤「高级开发工程师」。

### 步骤 2：把整个需求一股脑打进去
需求原文："帮我开发一款专为7岁儿童设计、浏览器直接运行的趣味数独闯关小游戏，需完美适配PC端、手机端、iPad端三端自适应，画面精美卡通、带背景音乐、完整激励奖励、等级关卡、新手引导，无广告……"
具体功能需求列得很细——分等级（4/6/9 宫格）、分关卡（共 35 关）、音效类型、激励话术风格、错误提示方式、皮肤解锁、关卡进度保存……需求越细结果越接近想要的。

### 步骤 3：AI 自动建任务清单并开发
回车之后，高级开发工程师自动建任务清单、一步步分析需求、写代码。中间去倒了杯茶，回来时一个完整的 sudoku-kids.html 文件已经躺在桌面上了。
**关键步骤**：AI 自动建任务清单+一步步开发，一次成型无报错。

### 步骤 4：生成的功能清单
- 关卡系统：入门（4 宫格 x10 关）+进阶（6 宫格 x15 关）+高阶（9 宫格 x10 关）=35 关
- 解锁机制：通关当前关才能解锁下一关，跨等级自动开放
- 星级评分：1-3 星，根据用时、错误次数、提示次数综合评定
- 背景音乐：Web Audio API 自动生成轻快儿童音乐，右上角可开关
- 音效：点击、填数正确、填错、通关、提示各有专属音效
- 提示系统：每关 3 次免费提示，点亮正确答案不直接告知
- 皮肤商店：默认绿/森林/海洋/夕阳 4 款皮肤，星星达标自动解锁
- 新手引导：首次进入弹出图文教程，含迷你演示棋盘
- 进度保存：localStorage 持久化，刷新不丢进度
- PC 键盘：数字键 1-9 填数，方向键移动选格，退格键擦除
- 三端自适应：棋盘/按钮自动缩放，触屏/鼠标均支持
- 粒子动效：填对/通关时屏幕飘满表情粒子
- 错误限制：3 次错误机会（爱心显示），超出触发鼓励重来弹窗

### 步骤 5：部署上线
把游戏部署到服务器，浏览器打开就能玩，不用下载任何 App。在线地址：panda.yaniw.com/sudoku-kids.html。PC、手机、iPad 三端都可以玩。

### 步骤 6：让外甥验收
把链接在 iPad 上打开递给他："你试试这个，没有广告。"他玩了两个小时。中间跑来问过一次："舅舅，这个是你做的吗？"我说："嗯，用 WorkBuddy 做的。"他点点头又跑回去玩了。小孩不说话专心玩就是合格。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `帮我开发一款专为7岁儿童设计、浏览器直接运行的趣味数独闯关小游戏，需完美适配PC端、手机端、iPad端三端自适应，画面精美卡通、带背景音乐、完整激励奖励、等级关卡、新手引导，无广告……` | 一句话把所有功能需求列细，触发高级开发工程师一次成型开发 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 一个完整的 sudoku-kids.html 文件（一次成型无报错无漏功能）
2. 35 关关卡系统（4 宫格 10 关+6 宫格 15 关+9 宫格 10 关）
3. 激励系统（1-3 星评分+4 款皮肤解锁+鼓励语随机出现）
4. 体验细节（Web Audio API 背景音乐+5 种音效+3 次免费提示+新手引导）
5. 三端自适应（PC 鼠标+键盘/手机 iPad 触屏）
6. localStorage 进度保存
7. 在线地址：panda.yaniw.com/sudoku-kids.html

### 结果证明

![专家中心召唤高级开发工程师](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRN7bnOibRtrUtoqVNgT7TUAtHlspmxFzcSbRvLT6JvoOs1YWIhUEGEPgibkuHevFp9M2UWwdl6CGjhe0ZFjhS8bsCEnc7YxcBjtE/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

![AI自动建任务清单](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRMQUasnkaWFgNAN0dysVyuVEYVemGKHZb6bmdk62sFxwP26YrFcF27hWllOovHJmYfdP9zJ3IiaAXT9GWbnSG3GfBibjIhV9uicHc/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

![完整功能清单表](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRPicHz2WxV57s5E7b7eGuJc08mYrmwXzFQJR74IChHL3I7AAwVYiaNGQgRRCH3mjkJuIZ5LlUCF50YGDVpokw6VYP5O5eoOoP4lg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

![游戏开始页面](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRNJ6m7f3mqJzkUhhIos8ogo0GwxBs9ms87AdIkgUt4yRFGBWCciaicVqMWwqtHnCc01IhMvvqnyGllVnrTdYu9u8aDFPhISw2Yibw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

## 八、验收标准

- [ ] 在专家中心召唤「高级开发工程师」
- [ ] 一句话描述完整需求（含三端自适应/背景音乐/激励奖励/等级关卡/新手引导/无广告）
- [ ] AI 自动建任务清单并一步步开发
- [ ] 生成一个完整的 sudoku-kids.html 文件，一次成型无报错
- [ ] 关卡系统：4 宫格 10 关+6 宫格 15 关+9 宫格 10 关=35 关
- [ ] 解锁机制：通关当前关才能解锁下一关
- [ ] 星级评分：1-3 星，根据用时/错误次数/提示次数综合评定
- [ ] 背景音乐：Web Audio API 生成，右上角可开关
- [ ] 5 种音效：点击/填对/填错/通关/提示
- [ ] 每关 3 次免费提示
- [ ] 4 款皮肤（默认绿/森林/海洋/夕阳）星星达标自动解锁
- [ ] 新手引导：首次进入弹出图文教程含迷你演示棋盘
- [ ] localStorage 进度保存，刷新不丢进度
- [ ] PC 键盘支持（数字键 1-9 填数+方向键移动+退格键擦除）
- [ ] 三端自适应（PC/手机/iPad）
- [ ] 粒子动效（填对/通关飘满表情粒子）
- [ ] 3 次错误机会爱心显示
- [ ] 部署上线，浏览器打开就能玩
