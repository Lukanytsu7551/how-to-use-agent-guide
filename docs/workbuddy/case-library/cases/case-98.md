# Case 98｜发现一个排版更好的Skill，6套主题全试了一遍，排完直接推到公众号草稿箱

> **WorkBuddy 案例集 · 第 98 篇**
> 分类：内容创作与新媒体运营

---

## 一、场景描述

之前一直用 wenyan mcp 和 baoyu-post-to-wechat 两个 Skill 来排版和推送公众号文章。两条路都能走通，主题样式够用，但时间长了就那几个来回换，总觉得排版少了点新鲜感。直到在 GitHub 上刷到一个东西——gzh-design Skill。把链接丢给 WorkBuddy，让它审查、安装、排版、6套主题全推一遍到公众号草稿箱，全程只说了四句话。

## 二、想要完成的任务

让 WorkBuddy 看懂 gzh-design Skill 的作用，做安全审计后安装，用它排版一篇文章，然后把6套主题（摸鱼绿/红白色系/石墨极简风/留白禅意风/摸鱼票据风/橄榄手记）全部排版+校验+推送到公众号草稿箱，不用手动复制粘贴。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| gzh-design | Markdown 自动排版成可粘贴公众号的高质量HTML，6套主题组件库 | GitHub 开源 Skill | WorkBuddy 账号 |
| baoyu-post-to-wechat | 把 HTML 直接推送到公众号草稿箱 | 已安装 Skill | 公众号 API 权限 |
| WorkBuddy Agent | 安全审计 + 安装 + 排版 + 推送全链路 | WorkBuddy 内置 | WorkBuddy 账号 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 已有 baoyu-post-to-wechat Skill 安装并配置好公众号 API 权限
3. 有一篇待排版的 Markdown 文章

## 五、在 WorkBuddy 中的操作

### 步骤 1：发现 Skill——发 GitHub 链接让 WorkBuddy 看作用
说「看下这个skill https://github.com/isjiamu/gzh-design-skill 他有什么作用？」。WorkBuddy 看完告诉我核心能力：把 Markdown 自动排版成可以直接粘贴到公众号编辑器的高质量 HTML——粘贴后样式不丢失。它自带6套主题，每套不是配色方案而是完整的组件库——引言卡片、章节标题、代码块、作者签名，全是经过合规校验的 HTML 片段：摸鱼绿（教程测评清单）、红白色系（深度分析观点）、石墨极简（科技评论专业观点）、留白禅意（随笔极简）、摸鱼票据（工具对比创意评测）、橄榄手记（内刊案例复盘）。还有主题生成器一句话描述风格就能生成全新组件库。但 gzh-design 只排版不管推送，输出的是一段 HTML 需要手动复制粘贴。
**关键步骤**：发 GitHub 链接 → WorkBuddy 分析功能 + 拆解6套主题 + 解释技术原理。

### 步骤 2：审查+安装——两句话就搞完了
说「装一个试试」。但装第三方 Skill 不能直接就装，WorkBuddy 自发做了一轮安全审计。它把仓库克隆到临时目录，逐个检查核心文件：SKILL.md（纯 Markdown 工作流定义无可执行代码）、validate_gzh_html.py（校验脚本只读HTML用标准库不联网）、component_lint.py（组件库检查只读+标准库）、extract_docx.py（Word转Markdown工具标准库只输出本地）、wrap_preview.py（预览页包装器读模板+替换占位符标准库）。审查结果：P2（安全）——零网络调用、零外部依赖、零敏感操作。WorkBuddy 装到 ~/.workbuddy/skills/gzh-design/，清理 .git，跑了一遍 lint——0 ERROR。
**关键步骤**：说「装一个试试」→ WorkBuddy 自发安全审计 → P2安全 → 安装+lint通过。

### 步骤 3：排版试试——这篇就是用 gzh-design 排的
说「使用刚安装的 skill 排下版，我看下效果」。WorkBuddy 加载了 gzh-design Skill，读了摸鱼绿组件库，组装完整公众号 HTML，跑合规校验——0 ERROR、165 处 &lt;span leaf&gt; 包裹。然后生成了带「复制到公众号」按钮的预览页。排版决策：主题摸鱼绿（工具发现+评测类文章信息密度高卡片丰富），核心组件 tool-label + pill-list，点缀组件 oneliner-card/quote-box/center-divider。
**关键步骤**：说「排下版」→ 加载组件库 + 组装HTML + 合规校验0 ERROR + 生成预览页。

### 步骤 4：6套主题全推一遍——排版+推送两个Skill拼起来
gzh-design 专注排版出好看的 HTML，baoyu 专注推送进草稿箱——两个 Skill 各干各的活。说「重新推送下，分别使用6套主题推送下」。WorkBuddy 把6套主题全部排版、校验、推送了一遍。公众号草稿箱里现在有6个版本，标题末尾标了 [摸鱼绿]/[红白色系]/[石墨极简风]/[留白禅意风]/[摸鱼票据风]/[橄榄手记]。6套主题全部 0 ERROR，全部推送成功。
**关键步骤**：说「6套主题都推一遍」→ 全部排版+校验+baoyu推送，全0 ERROR。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `看下这个skill https://github.com/isjiamu/gzh-design-skill 他有什么作用？` | 发链接让WorkBuddy分析作用 |
| 2 | `装一个试试` | 安全审计+安装 |
| 3 | `使用刚安装的skill排下版，我看下效果` | 排版试试效果 |
| 4 | `重新推送下，分别使用6套主题推送下。` | 6套主题全推到草稿箱 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. gzh-design Skill 已安装到 ~/.workbuddy/skills/gzh-design/（安全审计 P2 通过）
2. 摸鱼绿主题排版 HTML（0 ERROR、165处 span leaf 包裹）
3. 6套主题全部排版+校验+推送到公众号草稿箱（全0 ERROR）
4. 草稿箱里6个版本，标题末尾标了主题名方便对比

### 结果证明

![wenyan default vs gzh-design摸鱼绿排版对比](/images/workbuddy-cases/case-98/01.png)

![WorkBuddy 分析 gzh-design Skill 作用](/images/workbuddy-cases/case-98/02.png)

![6套主题排版效果对比](/images/workbuddy-cases/case-98/03.png)

![安全审计完成：P2安全直接安装](/images/workbuddy-cases/case-98/04.png)

![安全审计详情：逐文件检查](/images/workbuddy-cases/case-98/05.png)

![安装完成：位置/清理/.git/lint 0 ERROR](/images/workbuddy-cases/case-98/06.png)

![摸鱼绿主题排版完成：0 ERROR](/images/workbuddy-cases/case-98/07.png)

![摸鱼绿排版效果预览](/images/workbuddy-cases/case-98/08.png)

![6套主题全部推送完成](/images/workbuddy-cases/case-98/09.png)

![6套主题排版效果完整对比](/images/workbuddy-cases/case-98/10.png)

## 八、验收标准

- [ ] 发 GitHub 链接后 WorkBuddy 分析出 gzh-design 核心能力（Markdown转高质量HTML粘贴不失样式）
- [ ] 拆解6套主题及适用场景（摸鱼绿/红白色系/石墨极简/留白禅意/摸鱼票据/橄榄手记）
- [ ] 说「装一个试试」后 WorkBuddy 自发做安全审计
- [ ] 安全审计逐文件检查（SKILL.md/validate_gzh_html.py/component_lint.py/extract_docx.py/wrap_preview.py）
- [ ] 审查结果 P2（安全）：零网络调用、零外部依赖、零敏感操作
- [ ] 安装到 ~/.workbuddy/skills/gzh-design/，清理 .git，lint 0 ERROR
- [ ] 说「排下版」后加载组件库组装HTML，合规校验 0 ERROR
- [ ] 生成带「复制到公众号」按钮的预览页
- [ ] 说「6套主题都推一遍」后全部排版+校验+baoyu推送
- [ ] 6套主题全部 0 ERROR 全部推送成功
- [ ] 草稿箱里6个版本标题末尾标了主题名方便对比
- [ ] 全程只说了四句话（看作用/装/排版/6套推一遍）
