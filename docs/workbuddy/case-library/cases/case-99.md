# Case 99｜一个PPT Skill+增强提示词，22页瑞士风PPT直接拉满

> **WorkBuddy 案例集 · 第 99 篇**
> 分类：办公协同与效率提升

---

## 一、场景描述

帮公司做内部培训资料，要整一份30-40分钟的 WorkBuddy 教学 PPT。心想这事儿不难——把产品概述、核心功能、操作演示、实际案例、常见问题往里一塞，再让AI排个版不就完了？结果错了。先后试了直接聊「帮我做份教学PPT」、换提示词加「要精美」「要分章节」、让AI自己选风格，出来的东西不是像Word文档复制过来的就是灰底白字加一堆icon跟互联网公司2018年发布会似的。听朋友说 guizang 不错有个专门的PPT skill，就想着试试。

## 二、想要完成的任务

在 WorkBuddy 技能市场搜索安装 guizang-PPT-Skill，用 /maga 调出技能，输入一句简单提示词后点「增强提示词」按钮把大白话扩成结构化完整需求，生成一份瑞士国际主义风格的22页 WorkBuddy 教学 PPT，最后部署上线拿到可分享链接。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| guizang-PPT-Skill | 生成高质量网页PPT，内置电子杂志风和瑞士国际主义两套视觉系统 | WorkBuddy 技能市场 | WorkBuddy 账号 |
| 增强提示词 | 把一句大白话扩成结构化完整需求 | WorkBuddy 内置 | WorkBuddy 账号 |
| CloudStudio 部署 | 一键推上线拿分享链接 | WorkBuddy 内置 | WorkBuddy 账号 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. WorkBuddy 技能市场可搜索到 guizang-PPT-Skill
3. 有 CloudStudio 部署能力可用

## 五、在 WorkBuddy 中的操作

### 步骤 1：在技能市场搜到 guizang
打开 WorkBuddy 的「技能」面板搜了「guizang」。搜索结果第一条：Magazine Web PPT——降耦的PPT Skills，生成高质量网页PPT、演讲deck与多比例封面，内置电子杂志风和瑞士国际主义两套视觉系统。简介里说「瑞士国际主义」这四个字做设计的朋友都念叨过。点进去看详情，装的过程没让动手——WorkBuddy 自己装完了，右上角弹出来一个绿色提示：「guizang-PPT-Skill」技能已安装，去试试。
**关键步骤**：技能市场搜 guizang → 自己安装完弹绿色提示。

### 步骤 2：装上了先调出技能
在输入框里打了 /maga，弹出来刚安装的 Magazine Web PPT 技能，点了一下把它启用。然后在输入框里写了一句话「帮我写份 workBuddy 教学 ppt」。写完盯着这句话看了几秒——就这么发出去？风格没指定它会随便选一个，内容结构只靠「教学ppt」四个字让AI猜，章节划分时长配色字体全凭AI自由发挥。之前几次就是吃这个亏——提示词太糙再强的skill也接不住。
**关键步骤**：打 /maga 调出技能 → 输入一句简单提示词 → 犹豫要不要就这么发。

### 步骤 3：点一下「增强提示词」效果直接拉满
注意到输入框下方有个小图标旁边写着「增强提示词」。点了一下，WorkBuddy 把那句「帮我写份workBuddy教学ppt」重写成了一段结构化的完整需求：帮我设计一份WorkBuddy教学PPT，包含产品概述（定位、核心价值、适用场景）、核心功能模块（任务管理、团队协作、进度追踪、智能提醒等）、操作演示流程（注册登录、创建项目、分配任务、查看报表）、实际案例、常见问题与技巧。每页PPT需标注标题、要点内容和建议的配图/插图类型，整体结构适合30-40分钟的教学演示。同一句需求结构一变差出十万八千里：内容范围从笼统的「教学PPT」变成五大模块逐个点名，结构从让AI自己猜变成显式给出30-40分钟节奏，配图从不提变成每页标注配图类型。
**关键步骤**：点「增强提示词」→ 大白话扩成结构化完整需求。

### 步骤 4：发送后22页瑞士风PPT出炉
点发送。PPT一出来就知道不一样了——瑞士国际主义风格，克莱因蓝主调，字号对比夸张到过瘾，每页都有明确的视觉焦点。22页讲完整个产品正合我意。首页：WORKBUDDY 教学指南，40MIN，26.07.08，01/22，克莱因蓝满屏，200字号主标题，顶部ASCII呼吸场，右上角01/22和底下← → SWIPE 有 Massimo Vignelli 那个味儿。
**关键步骤**：发送增强后的提示词 → 22页瑞士风PPT出炉。

### 步骤 5：一键部署上线发个链接谁都能看
PPT做完了但文件在本地——发给朋友还得传文件对方还得下载打开。对 WorkBuddy 说「把做好的 ppt 部署上线」。WorkBuddy 调用部署工具把整个PPT目录（index.html+4张配图）打包上传到 CloudStudio sandbox。30秒不到返回一个在线链接。手机、电脑、平板任何浏览器打开都能看——横向翻页、ESC索引视图、B低功耗模式全都在。
**关键步骤**：说「部署上线」→ 30秒拿到在线链接。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `帮我写份 workBuddy 教学 ppt` | 输入一句简单提示词 |
| 2 | （点「增强提示词」按钮） | 把大白话扩成结构化完整需求 |
| 3 | `把做好的 ppt 部署上线` | 一键部署拿链接 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. guizang-PPT-Skill 已安装（技能市场搜索自动安装）
2. 增强后的结构化提示词（五大模块+30-40分钟节奏+每页标注配图类型）
3. 22页瑞士国际主义风格 WorkBuddy 教学 PPT（克莱因蓝主调）
4. 在线分享链接：https://f902bb228dd44ac18f907666c206ddbb.app.codebuddy.work

### 结果证明

![技能市场搜到 guizang：Magazine Web PPT](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRPBC9kxJoYicQyMKHHUrcDqibJC4FXkKsqvicdu1zXJmksGYsyNXrtx6Q0bLk1kRYfbSVuCqXAG7khElFhQ1picMzRBibkVQ0X0UhX4/640?from=appmsg&watermark=1#imgIndex=0)

![skill详情页：已安装去试试](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRNUPpZ9tP9EGSUIRtiasmLRgx5jicGUgUplrl8SKb4j6UibSlY9UPNjFlgj57NJWHRuf104GHGXQm5UJMic9k58QIGp3jDkcMwK1Ow/640?from=appmsg&watermark=1#imgIndex=1)

![输入 /maga 调出 Magazine Web PPT 技能](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRMEPojT3gus7XnRHtECMY6jWMG8PUEowUQkPBGIHAiaKibnEaEV0dVLXGicDuruPicH23h493fALZcu6bOWJPea8Ej23BDvyIS09ics/640?from=appmsg&watermark=1#imgIndex=2)

![输入框下方的「增强提示词」按钮](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRO3A2Cp4UTibH8Sy804E8vvRtialMibSuW95RpXjOZjaDMsMKX0W4ic1toMAgkhHyASOrhAApILzgx9ByMfdib8eeZmX09lOolaJHl4/640?from=appmsg&watermark=1#imgIndex=3)

![增强后的完整结构化提示词](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRM95bHRL725YwWk6jpXk3uD1N7SRuBRXz52GhHBXTrBEy1L5ribzGYNLia2G27Rqo7MOgOHwF2RLwAdGEdQjdDT0H41DxPG5AlhY/640?from=appmsg&watermark=1#imgIndex=4)

![22页瑞士风PPT首页：克莱因蓝满屏](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRNzwux5AvoI0GdibtQibhTCKHViaSxIuibVE1knVFNC132IFYnFUeqTetLtGDeZukrAL1R4BNNREhLhqFr2EkJ2Ns7N6O32ichnAe3E/640?from=appmsg&watermark=1#imgIndex=5)

## 八、验收标准

- [ ] 技能市场搜「guizang」找到 Magazine Web PPT
- [ ] 简介包含「瑞士国际主义」视觉系统
- [ ] WorkBuddy 自己安装完弹绿色「已安装」提示
- [ ] 输入 /maga 调出 Magazine Web PPT 技能
- [ ] 输入一句简单提示词「帮我写份workBuddy教学ppt」
- [ ] 点「增强提示词」按钮后重写成结构化完整需求
- [ ] 增强后提示词包含五大模块（产品概述/核心功能/操作演示/实际案例/常见问题）
- [ ] 增强后提示词包含30-40分钟教学演示节奏
- [ ] 增强后提示词要求每页标注配图/插图类型
- [ ] 发送后生成22页瑞士国际主义风格PPT（克莱因蓝主调）
- [ ] 首页有01/22页码和← → SWIPE 翻页提示
- [ ] 说「部署上线」后30秒内返回在线链接（.app.codebuddy.work）
- [ ] 链接在任何浏览器打开都能看（横向翻页/ESC索引视图/B低功耗模式）
