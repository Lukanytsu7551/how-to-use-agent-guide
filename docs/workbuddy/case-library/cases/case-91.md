# Case 91｜扔一句话过去，AI给我搭了个博客还直接上线了

> **WorkBuddy 案例集 · 第 91 篇**
> 分类：网站与应用开发

---

## 一、场景描述

写公众号几个月了，文章越来越多，但都散在公众号后台——没有归档、没有标签检索、没有阅读体验好的文章页面。想搭个个人博客把文章归档起来，但对前端这一套不是很熟。要是以前，得先找模板、改代码、配部署，半天起步。这次换了个思路，直接在 WorkBuddy 里打了一句话，让 AI 帮忙搭站并部署上线。

## 二、想要完成的任务

用一句话指令让 WorkBuddy 开发一个主题为「我与AI的那些事」的个人博客网站，要求包含文章列表、文章详情、标签分类、关于页面，支持 Markdown 渲染。搭好后再说一句「部署上线」，拿到可访问的 HTTPS 链接，全站跑通文章浏览、搜索、暗黑模式等功能。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| WorkBuddy Agent | 自然语言需求转完整前端工程 | WorkBuddy 内置 | WorkBuddy 账号 |
| CloudStudio 部署 | 一键把网页推到云端拿 HTTPS 链接 | WorkBuddy 内置 | WorkBuddy 账号 |
| marked.js / highlight.js | Markdown 渲染 + 代码高亮 | CDN 引入 | 无 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 品牌色（#FF6B35）已留在项目记录里，AI 会自动复用
3. WorkBuddy 有云部署能力可用

## 五、在 WorkBuddy 中的操作

### 步骤 1：一句话提需求
直接在 WorkBuddy 对话框输入需求，指定博客主题、页面清单和 Markdown 渲染要求。WorkBuddy 没急着写代码，先分析需求并给出方案：用纯 HTML/CSS/JS + SPA 架构，hash 路由，Markdown 用 marked.js 渲染，代码高亮用 highlight.js，不依赖任何框架，一个 index.html 搞定所有页面。
**关键步骤**：一句话提需求，AI 先出技术方案再写代码。

### 步骤 2：AI 写代码
先写 HTML 结构（导航栏、主要内容区、页脚），再写 CSS（品牌色直接用了公众号封面的橙色 #FF6B35，自适应暗黑模式），然后写 6 篇示例文章（直接把公众号最近写的内容变成 Markdown 写进去），最后写 JS 逻辑（路由跳转、文章渲染、标签筛选、全文搜索、阅读进度条）。全部一气呵成，零报错。
**关键步骤**：HTML + CSS + JS + 6 篇示例文章一次写完。

### 步骤 3：部署上线
说一句「部署上线」，大概 30 秒，一个可访问的 HTTPS 链接就出来了。域名是 CodeBuddy 的沙箱环境，自动配了 HTTPS，直接能用。全站跑得很稳，文章、搜索、暗黑模式都没崩。
**关键步骤**：一句话部署，30 秒拿到 HTTPS 链接。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `帮我开发一个个人博客网站，主题是【我与AI的那些事】。要求：文章列表、文章详情、标签分类、关于页面，支持 Markdown 渲染。` | 一句话提需求 |
| 2 | `部署上线` | 一句话部署拿链接 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 完整的个人博客网站工程（纯 HTML/CSS/JS + marked.js + highlight.js）
2. 6 篇示例文章（Markdown 格式，真实公众号内容素材）
3. 在线可访问的 HTTPS 链接：https://74e7d628245849159e4c74ee18dbe858.app.codebuddy.work
4. 超出需求的功能：暗黑模式、全文搜索、阅读进度条、上下篇导航、标签云、响应式

### 结果证明

![WorkBuddy 接收需求并开始开发](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRN7HMvjrkUR09zDK226YibzPaMotBLrzHaJjwOZV3yx9h0QWqYicrSwKUjIZibbNJWibjXRSoq8nNmgFIVwv26iakpcicYpFmibcibkT58/640?wx_fmt=png&from=appmsg#imgIndex=0)

![博客网站开发完成并上线预览](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRNK7icNIJfdmVC9jhLiaHA7D2GPPiahCbXYticSt1ia7cCG4gERiaibwb5kCrWia5o36eZb3Td5F4iarfRBf9olgVyJ1q7YrCQMgntWHISA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

![博客首页效果：导航栏 + 文章卡片列表](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRNBjBibD5xIkIyOpIlS5RcibSgVoU1ZzRw1RSBBzibOXQ5ticby4gp4PNRoDRXAl9I8eObBxYibicfSiarX1Xh3ulnjCzUwicd1uJWJ71o/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

![标签分类页：18个标签按文章数量排列](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbROqR6ltf0MciaGAvMicJjdBKc1stwNYpVEBsWoYsMDOibBfwM1RGvjN9f3yczZEnNLfKiaDgjSXbkacoHof2Ezt3nib4PPiaBFQ7FXBM/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

![部署后的线上效果：文章详情页](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRO9HuFnNFKiaNdt2mLVLIia3HwRia7xSh0qOnDtVz1tJEbY8icOAVbeFwvW19kqCa30XZjdhCmIlTs78Zws8XG8RP6yVewueT91weQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

## 八、验收标准

- [ ] 一句话需求发出后，WorkBuddy 先出技术方案（纯 HTML/CSS/JS + SPA + marked.js + highlight.js）
- [ ] HTML 结构包含导航栏、主要内容区、页脚
- [ ] CSS 使用品牌色 #FF6B35，支持暗黑模式
- [ ] 写入 6 篇示例文章（Markdown 格式）
- [ ] JS 逻辑包含路由跳转、文章渲染、标签筛选、全文搜索、阅读进度条
- [ ] 全部代码一气呵成零报错
- [ ] 说「部署上线」后 30 秒内返回 HTTPS 链接
- [ ] 链接格式为 CodeBuddy 沙箱域名（.app.codebuddy.work）
- [ ] 线上全站跑通：文章浏览、搜索、暗黑模式均正常
- [ ] 超出需求的功能：暗黑模式、全文搜索、阅读进度条、上下篇导航、标签云、响应式
