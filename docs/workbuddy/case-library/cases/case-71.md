# Case 71｜让AI帮你发知乎：agent-browser实战，从登录到发布全搞定

> **WorkBuddy 案例集 · 第 71 篇**
> 分类：内容创作与新媒体运营

---

## 一、场景描述

写公众号的同时想运营知乎，每篇内容手动复制粘贴、调整格式、点发布，累而且没必要。WorkBuddy 里有 agent-browser 这个技能，底层是 Playwright，能真正打开 Chromium，点击、输入、截图，跟人操作一模一样。想试试能不能只告诉 WorkBuddy「帮我把这篇发到知乎」，剩下的它全搞定。结果成了，中间的坑全是 WorkBuddy 自己踩、自己填的——只需要说一句「帮我发这篇」。

## 二、想要完成的任务

通过 WorkBBuddy 调用 agent-browser 技能，自动打开浏览器登录知乎、找到「发想法」入口、把内容填进 Draft.js 富文本编辑器、激活发布按钮并点击发布，全程只在扫码登录环节需要人工介入，其余步骤由 WorkBuddy 自动诊断并修复问题。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| agent-browser | 打开 Chromium 浏览器，执行 open/wait/snapshot/click/eval 等操作模拟真人点击输入 | WorkBuddy 内置技能 | 本地浏览器环境 |
| snapshot -i | 列出页面上所有可交互元素并带 [ref=exx] 编号 | agent-browser 子命令 | 无 |
| eval（JS 执行） | 在页面上下文执行 JavaScript，绕过 click 超时直接调用 .click() | agent-browser 子命令 | 无 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 本地已安装 agent-browser 技能（基于 Playwright）
3. 拥有可扫码登录的知乎账号（手机微信扫一扫）

## 五、在 WorkBuddy 中的操作

### 步骤 1：打开知乎并等待扫码
跟 WorkBuddy 说「帮我把这篇文章发到知乎想法上」。WorkBBuddy 加载 agent-browser 技能后执行 `agent-browser open https://www.zhihu.com` 和 `agent-browser wait --load networkidle`，浏览器弹出知乎首页。登录态没保持，需要扫码。扫码必须人来操作，WorkBuddy 自己判断出需要登录，停下来告知「登好了告诉我」，扫完码回一句「登好了」立刻继续。
**关键步骤**：WorkBuddy 自动识别登录态缺失并暂停等待人工扫码。

### 步骤 2：找到「发想法」入口
登录后用 `snapshot -i` 列出页面所有可交互元素，定位到 `button "发想法" [ref=e24]`，执行 `agent-browser click "[ref=e24]"`。第一个坑来了——click 超时，元素被动画遮罩导致不可交互。WorkBuddy 自己分析错误原因，改用 JS 直接调用 .click()：`[...document.querySelectorAll("button")].find(b => b.textContent.includes("发想法"))?.click()`，一行 eval 解决。
**关键步骤**：click 超时后自动切换为 JS eval 方案，无需人工介入。

### 步骤 3：往编辑器填内容（最大坑）
知乎用的是 Draft.js 富文本框架，不能直接改 innerHTML，也不能通过 execCommand("insertText") 正确保留多段换行。第一轮尝试把带 \n\n 换行的完整文章用 insertText 填进去，内容填进去了但所有换行被吞掉，393 字只剩 47 字。WorkBuddy 自己通过截图对比发现文字不完整，分析出 Draft.js 的 insertText 会消费 \n\n，自己调整方案：去掉所有 \n\n 换行符，将全文作为连续纯文本整体插入。第二轮 381 字完整写入，一字不差。
**关键步骤**：WorkBuddy 自己截图验证、自己发现问题、自己改策略重试。

### 步骤 4：激活「发布」按钮
内容填完，「发布」按钮还是灰的（disabled）。又是 Draft.js 的坑——DOM 虽然被改了，但 React 内部的 editorState 没更新。WorkBuddy 自己想到触发机制：往编辑器里插入一个字符再删掉，强制 React 重新计算 editorState：`document.execCommand("insertText", false, " "); document.execCommand("delete", false);`。一插一删，「发布」按钮亮了。
**关键步骤**：insert+delete 触发 React state 重算，发布按钮从 disabled 变可点击。

### 步骤 5：点发布收工
按钮亮了。WorkBuddy 再次用 agent-browser click 点发布——又超时了，同样的动画遮罩问题。WorkBuddy 直接复用之前成功的方案，JS eval 点按钮：`[...document.querySelectorAll('button')].find(b => b.textContent.trim() === '发布')?.click()`。点下去，知乎弹出「发布成功」确认窗口，第 10 篇想法发出去了。
**关键步骤**：复用 JS eval 方案点击发布按钮，出现「发布成功」确认窗口。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `帮我把这篇文章发到知乎想法上` | 启动 agent-browser 打开知乎并等待扫码 |
| 2 | `登好了` | 通知 WorkBuddy 扫码完成，继续后续流程 |
| 3 | （沉默，WorkBuddy 自动处理） | WorkBuddy 遇到 click 超时自动切换 JS eval 方案 |
| 4 | （沉默，WorkBuddy 自动处理） | WorkBuddy 发现换行丢失自动去掉换行重试 |
| 5 | （沉默，WorkBuddy 自动处理） | WorkBuddy 发现发布按钮 disabled 自动 insert+delete 触发 |
| 6 | （沉默，WorkBuddy 自动处理） | WorkBuddy 复用 JS eval 方案点击发布按钮 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 知乎第 10 篇想法成功发布，弹出「发布成功」确认窗口
2. 381 字完整内容写入 Draft.js 编辑器，一字不差
3. 全程只人工说了两句话（「帮我发」+「登好了」），其余几十个步骤由 WorkBuddy 自动完成

### 结果证明

![知乎扫码登录页](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRP3QCiaFQvKwwNr5G4Y9sV5VhtJbHSrWhNbRacAl0ic9EPf1mvSVcPz66lBDVe280dsCdzHvNnHH3qEJuLG9ACFFgpREcKOialEl8/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

![知乎首页与创作中心](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRNUEt2ibmoLQdNkUvqCNQ2qHZX3dB0foUE4snNJLCyhSOb7o67daZzuT94icWvzEMU1pnb9SOKXNhsNkRIvY2OqOdmVdxc86Q3M8/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

![编辑器内容换行被吞掉只剩47字](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRPwMh85lHfiaibNS97ZUpnMtqqPsn9AB2m0GbfFSfmMZlKWKaQh8T4X1vEA5jsfv2icvNdqc7XficibiaGHQrNF6q5UVhZHOzJ6mzhL4/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

![381字完整写入编辑器](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRPYSGsreoAQB6utSR55WRqceOnS3X32FQqC82k6asWhq8GsiaNAmVkmTicVribsiakV5lEOiaib4tk5nPUEduyrPqsdDVe2IZCOgzSVA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

![知乎发布成功确认窗口第10篇想法](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRMcH95SSeBnktibFUCN0MDS2ty5SwvjJX6nUqa3Pw2LibElibR9Jr35mEgmdqZgZOQFGaOq6ssbuhcqwIjOtBasQKdY7kQfpiax1J0/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

## 八、验收标准

- [ ] `agent-browser open https://www.zhihu.com` 成功打开知乎首页
- [ ] WorkBuddy 自动识别未登录状态并暂停等待扫码
- [ ] 人工扫码后回复「登好了」，WorkBuddy 立即继续
- [ ] `snapshot -i` 能列出 `button "发想法" [ref=e24]` 元素
- [ ] click 超时后自动切换为 JS eval `[...document.querySelectorAll("button")].find(b => b.textContent.includes("发想法"))?.click()`
- [ ] 第一轮 insertText 填入后 393 字内容只剩 47 字（换行被 Draft.js 吞掉）
- [ ] 第二轮去掉 \n\n 后 381 字完整写入，一字不差
- [ ] 发布按钮 disabled 时自动执行 `document.execCommand("insertText", false, " "); document.execCommand("delete", false);` 触发 state 重算
- [ ] 发布按钮点亮后复用 JS eval 方案点击发布
- [ ] 知乎弹出「发布成功」确认窗口，显示「第10篇创作」
- [ ] 全程人工只说两句话（「帮我发」+「登好了」），其余步骤由 WorkBuddy 自动完成
