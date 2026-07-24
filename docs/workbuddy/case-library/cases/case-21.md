# Case 21｜解锁 frontend-design 技能，5 分钟搞定你的专属个人网站

> **WorkBuddy 案例集 · 第 21 篇**
> 分类：网站与应用开发

---

## 一、场景描述

昨天，我用 WorkBuddy 从零搭建了一个专属个人网站。不是套模板、不是拖拽生成，而是 AI 全程设计+写代码+一键上线，全程耗时不到 5 分钟。今天把完整可复制的流程分享给你，特别适合想打造个人品牌的博主、需要个人展示页的职场人、想拥有专属个人站点的普通人，无需专业技术，轻松上手。

在信息繁杂的网络环境里，想让别人快速记住你、了解你，一个独立个人网站就是你的"线上名片"。一个优质个人网站，能帮你实现差异化突围、个人形象可视化、降低沟通成本、长期沉淀个人品牌资产。

传统做个人网站有 3 个痛点：套模板（Wix/Webflow）好看但同质化严重，调整布局耗时长，无个人特色；手写代码自由度最高，但开发周期长，非设计/技术岗易做出"能用但丑"的页面；找人定制效果好但成本高（数千元至上万元），后续修改沟通繁琐。用 AI 做设计 + 生成代码，是快、好看、低成本的解决方案。

## 二、想要完成的任务

用 WorkBuddy 的 frontend-design 技能，5 分钟内从零生成一个风格独特的专属个人作品集网站，并一键部署上线。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| frontend-design 技能 | 拒绝模板化，从字体、配色、布局、动效全维度定制设计个人网站 | WorkBuddy 内置技能 | WorkBuddy 账号 |
| 深度思考模式 | 在设计前明确网站目的、身份职业、风格偏好、模块需求、域名部署等关键信息 | 内置能力 | WorkBuddy 账号 |
| 代码执行能力（Bash） | 自动启动本地预览，实时查看生成效果 | 内置能力 | 本地端口 |
| GitHub + Cloudflare Pages/Vercel | 免费部署静态页面，支持绑定自定义域名 | 第三方平台 | GitHub、Cloudflare 账号 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 已开启"深度思考"模式
3. 已注册 GitHub 账号并配置好 Git 本地环境
4. 已注册 Cloudflare Pages / GitHub Pages / Vercel 任一静态托管平台
5. 明确个人网站的目的（作品集/简历展示/个人品牌）、身份职业、风格偏好、必含模块
6. （可选）已有自定义域名

## 五、在 WorkBuddy 中的操作

### 步骤 1：加载 frontend-design 技能并明确需求
在 WorkBuddy 中输入"帮我设计一下个人网站，使用 frontend-design"，并开启深度思考模式。skill 加载后，AI 会在开始设计前询问 5 个关键信息：网站目的（作品集/简历/个人品牌/博客）、身份职业（开发者/设计师/运营自媒体）、风格偏好（极简科技/温暖亲和/大胆前卫）、必含模块（个人介绍/作品展示/技能展示/联系方式）、域名/部署（已有域名还是先做本地版本）。
**关键步骤**：加载 frontend-design 技能，回答 5 个关键信息，AI 据此定制设计方案。

### 步骤 2：AI 生成定制设计方案并输出代码
我回答："作品集/简历展示，开发者。大胆前卫，作品展示-技能展示-联系方式。"WorkBuddy 基于需求设计了一个 Brutalist + 赛博朋克混合风格的方案：深色背景+霓虹色（青/橙）点缀、不对称布局、大字体排版、动态效果、开发者+自媒体的双重身份展示。随后自动生成 index.html，包含 Hero 区（大字标题+霓虹青色高亮+浮动代码装饰）、作品展示（4 个作品卡片，悬停动效突出）、技能展示（技能条形图+技术栈标签云）、联系方式（邮箱/GitHub/公众号+表单）。
**关键步骤**：补充需求后，AI 输出 Brutalist + 赛博朋克风格方案并生成完整 HTML 文件。

### 步骤 3：本地预览+迭代修改
AI 直接输出完整 HTML+CSS+JS 文件，本地浏览器打开即可预览。不满意可直接对话修改：标题字体缩小更协调、修复联系方式格式、优化移动端响应式适配。几轮微调就能达到理想效果。frontend-design 生成纯 HTML/CSS/JS，无外部依赖，所有静态托管平台都能直接部署。
**关键步骤**：本地浏览器打开预览，通过对话迭代修改直至满意。

### 步骤 4：一键推送上线
代码确认后，用 Git 推送到 GitHub。执行：`git add .` → `git commit -m "feat: 上线个人作品集网站"` → `git push origin main`。搭配 Cloudflare Pages / GitHub Pages / Vercel，免费自动部署，支持绑定自定义域名。

```bash
git add .
git commit -m "feat: 上线个人作品集网站"
git push origin main
```

**关键步骤**：Git 推送到 GitHub，搭配 Cloudflare Pages / GitHub Pages / Vercel 免费部署上线。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `帮我设计一下个人网站，使用 frontend-design` | 加载 frontend-design 技能，触发 AI 反问 5 项关键信息 |
| 2 | `作品集/简历展示，开发者。大胆前卫，作品展示-技能展示-联系方式` | 明确需求，AI 据此生成 Brutalist + 赛博朋克风格定制方案 |
| 3 | （对话迭代）`标题字体缩小，更协调` / `修复联系方式格式` / `优化移动端响应式适配` | 本地预览后迭代修改 |
| 4 | `git add . && git commit -m "feat: 上线个人作品集网站" && git push origin main` | 一键推送 GitHub，触发自动部署 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 一个包含 Hero、作品展示、技能展示、联系方式 4 大模块的个人作品集网站（纯 HTML/CSS/JS）
2. 深色背景+霓虹色点缀的 Brutalist + 赛博朋克定制设计方案
3. 一个永久可访问的线上地址（GitHub + Cloudflare Pages 部署）
4. 鼠标跟随光效、滚动渐入动画、响应式适配移动端等精细化交互

### 结果证明

![加载 frontend-design 技能并询问关键信息](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRMC9Utic0IHibZxWXe2TVAIeiahqGGuIBlPzBNLotKtL5JIcP2BuRDBByC1NlJonuaLiaFGu3K8bv7gdI5klAiaVPNvxJSdTjeiaJWkk/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

![AI 生成设计方案并输出 index.html](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRMu80sY7tYp3Sa8S4d5jx5ckI4mSqoZZO7KZXicInv7IvuicL6JOFxBrRM34aP2ISZUZLrRLsYawpjq8CmhjbPibnEic8t5aphP2o0/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

![个人作品集网站作品展示页预览](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRPhl05iagPUYhxkQEJfWoPcS3LGDGKCuaZmicqLbEPmUFibCtRfJocX1sjV1FUuK4EjMR5zTicDjHRSYgBPCES1QQrG0aCgqEUPk6w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

![个人作品集网站联系方式页预览](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRPxTzShrwCRGiaXLwRlHCP81G02bNHs6icGshnzo4CH4rLrQkiady6tjOfjl1R2HibcPnNydGS5wP2icAaibicvkHY9F3OAO8mLcebMmo/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

### 普通 AI 生成 vs frontend-design 生成 对比表

| 对比维度 | 普通 AI 生成 | frontend-design 生成 |
|---|---|---|
| 设计逻辑 | 套用通用模板 | 先定风格，再定制设计 |
| 字体选择 | 默认 Arial/Inter | 精选高辨识度字体 |
| 配色方案 | 固定紫白渐变 | 按个人风格定制专属配色 |
| 交互动效 | 几乎无动效 | 精细化微交互设计 |
| 最终呈现 | 典型 AI 生成感 | 专业设计师出品质感 |

## 八、验收标准

- [ ] WorkBuddy 加载 frontend-design 技能后能反问 5 项关键信息（网站目的/身份职业/风格偏好/必含模块/域名部署）
- [ ] 补充需求后 5 分钟内生成完整 HTML+CSS+JS 个人网站文件
- [ ] 生成的页面包含 Hero、作品展示、技能展示、联系方式 4 大模块
- [ ] 设计风格符合用户指定（如大胆前卫 → Brutalist + 赛博朋克）
- [ ] 本地浏览器可直接预览，支持对话迭代修改
- [ ] 生成的代码为纯 HTML/CSS/JS，无外部依赖
- [ ] 通过 Git 推送到 GitHub 并搭配 Cloudflare Pages / Vercel 成功部署
- [ ] 部署地址永久可访问，支持移动端响应式适配
- [ ] 包含鼠标跟随光效、滚动渐入动画等精细化交互
