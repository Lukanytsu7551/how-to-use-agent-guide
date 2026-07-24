# Case 67｜用Taste Skill，3分钟做出科技感官网并上线

> **WorkBuddy 案例集 · 第 67 篇**
> 分类：网站与应用开发

---

## 一、场景描述

逛 GitHub 看到一个叫 Taste Skill 的项目，17k+ Star，专门教 AI 编程助手告别"模板味"。正好有个朋友想做企业官网，拿来试试。公司名叫「研智科技网络公司」，做成人高考培训、AI 培训、招聘会策划、企业培训。第一版做出来能看但不够看，配色偏素排版中规中矩没有科技感。第二版读取 Taste Skill 规则重新做 Design Read，选了暗黑科技风，深色背景青色光晕粒子网络扫描线，对味了。最后用 CloudStudio 部署上线，还修了移动端适配问题。

## 二、想要完成的任务

用 WorkBuddy + Taste Skill（13 个子技能）为「研智科技」做一个暗黑科技风企业官网，包含四大核心服务板块、实力数据、联系表单，部署到线上可访问，并完成移动端适配。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| Taste Skill（13 个子技能） | 核心方法论 Design Read：先读懂需求推断设计方向再选设计系统输出，告别模板味 | GitHub 开源（17k+ Star） | 无 |
| cloudstudio-deploy 技能 | 把 HTML 部署到 CloudStudio 沙箱，返回可分享链接 | WorkBuddy 技能市场 | 无 |
| 移动端适配排查与修复 | 解决宽度溢出、inline style 覆盖 Tailwind、HTML 属性重复等问题 | WorkBuddy 内置 | 无 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 已安装 cloudstudio-deploy 技能
3. 能访问 GitHub 获取 Taste Skill 仓库

## 五、在 WorkBuddy 中的操作

### 步骤 1：安装 Taste Skill
跟 WorkBuddy 说「帮我安装 Taste Skill」。它从 GitHub clone 下来，把 13 个子技能全部装到了 ~/.workbuddy/skills/ 目录，整个过程不到一分钟。13 个子技能包括：taste-skill（核心 v2）、taste-skill-v1、gpt-tasteskill、soft-skill、minimalist-skill、brutalist-skill、image-to-code-skill、redesign-skill、output-skill、stitch-skill 等。
**关键步骤**：Taste Skill 是纯文本规则文件（SKILL.md），不是代码不联网，告诉 AI 别再生成千篇一律的模板页面。

### 步骤 2：第一版差点意思
提需求：「公司名叫「研智科技网络公司」，做成人高考培训、AI培训、招聘会策划、企业培训。页面要有科技感。」很快生成一版，但配色偏素排版中规中矩，科技感几乎没有，典型"模板输出"——结构完整设计为零。

### 步骤 3：第二版暗黑科技风对味了
直接说「这个没有设计感，也没有科技感，换个方向。」WorkBuddy 读取 Taste Skill 规则重新做 Design Read，选了暗黑科技风：深色背景 #0a0f1a（赛博朋克城市夜空）、青色光晕 #06b6d4 主色调（终端屏幕的光）、Canvas 画动态连线粒子网络背景、扫描线效果（青色光线从上到下扫过页面）、Space Grotesk 等宽风格显示字体。四大业务板块卡片呈现，hover 有微动效；数据区域四列排开有渐变分隔线；底部联系方式和简洁 Footer。
**关键步骤**：Design Read 多了一步"读懂需求推断设计方向"，出来的东西完全不一样。

### 步骤 4：部署上线
页面做完得上线。本来想部署到 Cloudflare Pages 绑自定义域名 kt.yaniw.com，结果 wrangler 授权出问题（OAuth token 权限不够，sandbox 环境没法弹浏览器完成授权）。换方案，WorkBuddy 用 CloudStudio 一键部署，几分钟拿到线上地址：https://c7adaa3e5543449eb5de3e925be4d198.app.codebuddy.work

### 步骤 5：移动端适配修复
手机打开发现宽度溢出，右边多出一截，菜单按钮得横向滑动才能看到。WorkBuddy 排查发现三个坑：① 绝对定位装饰元素溢出（粒子光晕渐变圆伸出视口外，父级没 overflow:hidden）；② inline style 覆盖了 Tailwind 响应式类（手动写的 grid-template-columns 优先级比 Tailwind 的 md:grid-cols-2 高）；③ HTML 属性重复（多个元素写了两个 class= 或两个 style=，浏览器只认第一个）。修复方案：给所有 section 加 overflow:hidden、删掉 inline 的 grid-template-columns 让 Tailwind 接管、合并重复 HTML 属性、加完整 @media(max-width:768px) 样式。修完卡片从横排变竖排，字号自适应，导航收进汉堡菜单。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `帮我安装 Taste Skill` | 从 GitHub clone 13 个子技能到 ~/.workbuddy/skills/ |
| 2 | `公司名叫「研智科技网络公司」，做成人高考培训、AI培训、招聘会策划、企业培训。页面要有科技感。` | 第一版生成（模板味，不够看） |
| 3 | `这个没有设计感，也没有科技感，换个方向。` | 触发 Design Read 重新选暗黑科技风方向 |
| 4 | （部署相关指令，原文未直接引用） | CloudStudio 一键部署获取线上地址 |
| 5 | （移动端适配修复指令，原文未直接引用） | 排查三个坑并修复，加 @media 样式 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. Taste Skill 13 个子技能安装到 ~/.workbuddy/skills/
2. 研智科技暗黑科技风企业官网 HTML（深色背景 #0a0f1a + 青色光晕 #06b6d4 + 粒子网络 Canvas + 扫描线 + Space Grotesk 字体）
3. 四大核心服务板块（成人高考培训/AI 培训/招聘会活动策划/企业培训活动）
4. 实力数据区（200+ 服务企业、5,000+ 培训学员、120+ 策划活动、98% 满意度）
5. 联系表单 + Footer
6. 在线地址：https://c7adaa3e5543449eb5de3e925be4d198.app.codebuddy.work
7. 移动端适配修复（卡片竖排、字号自适应、汉堡菜单、@media(max-width:768px) 样式）

### 结果证明

![Taste Skill 安装](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbROjiaOaiaQtQIh8Dv1pghKqZhIQIhk9I3ALKD7ArWWQvbH3SrYh2oyMv8aVl6E0iaE2nHajJZnuauh3RsXQaHWLxPU43I8xj11LUU/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

![暗黑科技风首页](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbROyt7hicxl1spZB4M6wahDUiaiat6Sa7cUc9dv02UI8NWeFibB0QBrCdYaVialvR5tnqIZmNXiaUXY3Sv0k9CC7PK0ibEINZluXMMcFhc/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

![四大核心服务板块](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRMMeS0NCIpm5T9jnicldINkhwWbz5LLdicQK8nSCBtN6PDqOFZaJACrVVlq5ibic12wM7UG3dGtzvG7WxicicaxVhskVfBWiate6vzxXc/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

![实力数据区](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRO33gPMibrKOpacWqWl4GLkIAb7JQE4LkxtTVfRcWqt3kbt7oibMnLckasIGID9lsvoiaTYkrCaeibzqoaje4PcOZhzwylJic50sW5A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

![联系表单](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRPNVMWq3HicSDGzbyjMhE4sdJH5nEaAHccfOZLpyC0uUwNPQukib6n9Olo4oIhynrXjibAthjKUFh5U9xbuhfNibjbL2WAiaoVwtbFk/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

![移动端适配后](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRMwlLWILTC090pQ5xYvE6obPmiawPIve7Fufm5U1QjMiajZ92tyaib9UicDQWfm690UhO3UOp6JqCHav0lFnqdXqZmNYhF29J3iaVAY/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

## 八、验收标准

- [ ] 「帮我安装 Taste Skill」后 13 个子技能装到 ~/.workbuddy/skills/
- [ ] 第一版生成但配色偏素无科技感（模板输出）
- [ ] 「换个方向」后触发 Design Read 选暗黑科技风
- [ ] 深色背景 #0a0f1a + 青色光晕 #06b6d4 主色调
- [ ] Canvas 画动态连线粒子网络背景
- [ ] 扫描线效果（青色光线从上到下扫过页面）
- [ ] Space Grotesk 等宽风格显示字体
- [ ] 四大核心服务板块卡片呈现，hover 有微动效
- [ ] 实力数据区四列排开（200+/5,000+/120+/98%）
- [ ] 联系表单 + Footer
- [ ] CloudStudio 部署获取线上地址 https://c7adaa3e5543449eb5de3e925be4d198.app.codebuddy.work
- [ ] 移动端修复三个坑（装饰元素溢出/inline style 覆盖/HTML 属性重复）
- [ ] 卡片从横排变竖排，字号自适应，导航收进汉堡菜单
- [ ] 加完整 @media(max-width:768px) 样式
