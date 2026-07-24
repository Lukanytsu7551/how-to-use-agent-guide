# Case 50｜WorkBuddy × Ardot：AI 驱动设计记账 App 的完整流程

> **WorkBuddy 案例集 · 第 50 篇**
> 分类：网站与应用开发

---

## 一、场景描述

前两天刷到 Ardot 公测的消息，手痒想试试。Ardot 简单说就是一个设计工具，但跟 Figma 不一样的是，它可以通过对话来生成设计稿。而且它跟 WorkBuddy 做了集成，也就是说可以跟 WorkBuddy 聊天让它帮忙做设计。决定试一下，做个稍微复杂点的东西——一个完整的记账 App，5 个页面那种。

环境配置分几步：第一步下载安装 Ardot 桌面版（ardot.tencent.com，支持 macOS Intel/Apple 芯片，Windows 即将上线），微信扫码登录 10 秒搞定。第二步配置 Ardot MCP——点击界面右上角"MCP 设置"按钮，在弹出的"MCP 集成"窗口里把 WorkBuddy 那个开关打开（窗口列出能对接的 AI 终端：CodeBuddy Code/CodeBuddy IDE/WorkBuddy/Claude Code/Cursor/Codex CLI 等）。这还没完——切换到 WorkBuddy 这边，在连接器页面找到 Ardot MCP 服务，点"信任"按钮，不然 WorkBuddy 调不动 Ardot。这个设计有点反直觉，两边都得确认。注意点：Ardot 必须保持运行状态（MCP 服务是它本地启动的，默认在 http://127.0.0.1:50501/api/v1/mcp），两边都要确认（Ardot 里开开关 + WorkBuddy 里点信任），不要关 Ardot（关了 MCP 服务会断）。还装了 ardot-design-assistant 技能（包含完整的设计 workflow：9 步标准流程、Agent Team 模式、设计规则等）。最后召唤"Ardot 设计专家"（作者林觉初）。

第三步提需求（30 秒）："帮我设计一个记账 App，要 5 个页面（首页/记一笔/统计/账户/我的），现代简约风格，通用移动端（不要 iOS 或 Android 专属）。"第四步 AI 自动生成设计——WorkBuddy 调用 Ardot 的设计能力，自动创建了 5 个 iPhone 尺寸的画面（375×812），每个页面对应一个功能模块。第五步调试和优化（最耗时的部分）——踩了 6 个坑：字体不匹配（Inter/Semi Bold vs Inter/SemiBold）、分类图标布局错乱（horizontal vs vertical）、SVG 环形图显示不出来（需用 type:"frame"+svg 属性）、颜色格式写错了（alpha 值要写在 opacity 字段）、交易记录日期重复（按日期分组）、Binding 名称过期（每次 batch_edit 必须用新的变量名）。第六步让 AI 自己评价——功能完整度 75 分，视觉精致度 60 分。经过几轮调试，5 个页面全部完成。整体体验可以用"惊喜"来形容：从配置环境到 5 个页面完工不到 2 小时（大部分时间花在排查环境问题和调试上），质量还行（配色统一、布局合理、交互逻辑清晰），可迭代（发现问题直接跟 AI 说，它会自动修正）。

## 二、想要完成的任务

用 WorkBuddy 的 Ardot MCP 集成 + ardot-design-assistant 技能 + Ardot 设计专家，通过自然语言对话驱动 Ardot 设计一个含 5 个页面（首页/记一笔/统计/账户/我的）的现代简约风格记账 App。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| Ardot 桌面版 | 本地启动 MCP 服务，承载设计画布 | ardot.tencent.com 下载 | Ardot 账号 |
| Ardot MCP 连接器 | 让 WorkBuddy 通过 MCP 协议操作 Ardot 画布 | WorkBuddy 连接器 | WorkBuddy 里点"信任" |
| ardot-design-assistant 技能 | 完整设计 workflow（9 步标准流程/Agent Team 模式/设计规则） | WorkBuddy 技能市场 | WorkBuddy 账号 |
| Ardot 设计专家 | 预设好的 Ardot 设计 workflow，直接描述需求即可 | WorkBuddy 专家中心（作者：林觉初） | WorkBuddy 账号 |
| batch_edit 工具 | 一次性创建多个页面和组件 | Ardot MCP 提供 | Ardot 保持运行 |
| get_available_fonts 工具 | 查询可用字体，修正字体名称 | Ardot MCP 提供 | Ardot 保持运行 |
| export_nodes 工具 | 导出 PNG/SVG/PDF 格式或生成前端代码 | Ardot MCP 提供 | Ardot 保持运行 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端（v4.22.14 或以上）
2. 已下载安装 Ardot 桌面版（ardot.tencent.com，macOS Intel/Apple 芯片）
3. 已登录 Ardot（微信扫码/手机号/邮箱）
4. Ardot 保持运行状态（MCP 服务由它本地启动，默认 http://127.0.0.1:50501/api/v1/mcp）
5. 在 Ardot "MCP 集成"窗口中打开 WorkBuddy 开关
6. 在 WorkBuddy 连接器页面找到 Ardot MCP 并点"信任"按钮
7. 已在技能市场安装 ardot-design-assistant 技能
8. 已在专家中心召唤"Ardot 设计专家"（作者：林觉初）

## 五、在 WorkBuddy 中的操作

### 步骤 1：下载安装 Ardot 桌面版并登录
打开 ardot.tencent.com，右上角"下载客户端"按钮，选 macOS Intel 或 Apple 芯片版本（Windows 即将上线）。下载安装后打开，支持微信扫码、手机号、邮箱三种方式登录，用微信扫码 10 秒搞定。
**关键步骤**：ardot.tencent.com 下载对应系统版本 + 微信扫码登录。

### 步骤 2：配置 Ardot MCP（两边都要确认）
登录进去后点击界面右上角"MCP 设置"按钮，在弹出的"MCP 集成"窗口里把 WorkBuddy 那个开关打开（窗口列出能对接的 AI 终端：CodeBuddy Code/CodeBuddy IDE/WorkBuddy/Claude Code/Cursor/Codex CLI 等）。切换到 WorkBuddy 这边，在连接器页面找到 Ardot MCP 服务，点"信任"按钮。这个设计有点反直觉——两边都得确认，缺一不可。注意点：Ardot 必须保持运行（关了 MCP 会断），默认在 http://127.0.0.1:50501/api/v1/mcp。
**关键步骤**：Ardot 里开 WorkBuddy 开关 + WorkBuddy 里点信任，两边都要确认。

### 步骤 3：安装 ardot-design-assistant 技能
光连上 MCP 还不够，WorkBuddy 得知道怎么操作 Ardot 的画布。这个技能包含了完整的设计 workflow（9 步标准流程、Agent Team 模式、设计规则等）。在技能市场里搜一下就能装。
**关键步骤**：技能市场搜索安装 ardot-design-assistant。

### 步骤 4：召唤 Ardot 设计专家
光有技能还不够，得找个专业的人来干这个活儿。在 WorkBuddy 的专家中心里搜一下就能找到"Ardot 设计专家"（作者林觉初），点击"召唤"按钮。这个专家已经预设好了完整的 Ardot 设计 workflow（9 步标准流程、Agent Team 模式、设计规则等），不需要自己写复杂的操作指令，直接描述需求就行。
**关键步骤**：专家中心搜索"Ardot 设计专家"（作者：林觉初）并召唤。

### 步骤 5：提需求（30 秒）
跟 WorkBuddy 说："帮我设计一个记账 App，要 5 个页面（首页/记一笔/统计/账户/我的），现代简约风格，通用移动端（不要 iOS 或 Android 专属）。"然后它就开始了。
**关键步骤**：一句话描述清楚 5 个页面 + 风格 + 平台 + 尺寸要求。

### 步骤 6：AI 自动生成 5 个页面设计
WorkBuddy 调用 Ardot 的设计能力，自动创建了 5 个 iPhone 尺寸的画面（375×812），每个页面对应一个功能模块。1. 首页 Dashboard——总览当月收支，绿色主题（#2DB87B），顶部显示当月总支出和总收入，下方是最近交易记录，底部 4 个 Tab；2. 记一笔 Add Record——快速添加交易，顶部支出/收入切换按钮（红色/绿色），下方 10 个常用分类（餐饮/交通/购物/娱乐/居住/医疗/教育/旅行/通讯/其他）；3. 统计 Statistics——数据可视化，SVG 环形图展示各类支出占比（餐饮 35%/交通 20%/购物 15%...），中间显示总支出，下方分类排行榜；4. 账户 Accounts——多账户管理，3 种账户类型（现金/招商银行/支付宝），每个账户用卡片展示；5. 我的 Profile——设置和个人信息，顶部用户信息卡片（头像+昵称），下方设置菜单（分类管理/月度预算/数据导出/记账提醒）。
**关键步骤**：自动创建 5 个 375×812 页面，含绿色主题/10 个分类/SVG 环形图/3 种账户/设置菜单。

### 步骤 7：调试和优化（踩 6 个坑）
坑 1 字体不匹配——AI 用了"Inter / Semi Bold"但系统里实际是"Inter / SemiBold"（少了个空格），用 get_available_fonts 工具查询可用字体再用 Update 修正。坑 2 分类图标布局错乱——"餐饮🍔"图标和文字排成横排应该是上下排列，原因是 AI 默认用了 layout:"horizontal"，改成 layout:"vertical" 的 Frame。坑 3 SVG 环形图显示不出来——直接插入 SVG 代码不生效，需用 type:"frame" + svg 属性方式嵌入。坑 4 颜色格式写错了——AI 把 alpha 值写在了 color 里面 `fills: [{type: "SOLID", color: {r:0, g:0, b:0, a:0.1}}]`，正确格式是 `fills: [{type: "SOLID", color: {r:0, g:0, b:0}, opacity: 0.1}]`。坑 5 交易记录日期重复——每条记录都显示了日期导致页面上一堆重复文本，删除多余的日期节点（按日期分组）。坑 6 Binding 名称过期——每次调用 batch_edit 时复用之前的 binding 名称会报"expiredBindings"警告，binding 名称是一次性的，下次调用必须用新的 binding 名称（header1/header2/header3...）。
**关键步骤**：6 个坑——字体/布局/SVG/颜色/日期/binding，逐个用对应工具修正。

### 步骤 8：让 AI 自己评价设计效果
设计做完后让 WorkBuddy 自己看看效果评价一下。做得不错的地方：配色体系统一（绿色主题+红色支出/绿色收入）、5 个页面结构完整信息层级基本清晰、记一笔页面的分类网格布局整洁、统计页的环形图+排行榜组合实用、底部 Tab 栏一致性保持得好。需要改进的问题：首页那个大绿圆圈是什么鬼（应该是快捷记账按钮但看起来像个没加载完的占位符）、首页缺少快速操作入口（好的记账 App 首页通常会有明显的"+"号按钮）、图标太简陋（底部 Tab 栏和设置项用的都是基础 emoji 或简单图标）、缺少数据可视化细节（统计页环形图可以更好看）、卡片阴影/圆角不够精致。总结：功能完整度 75 分，视觉精致度 60 分，作为第一版可用但如果要达到"好看"的标准还需要打磨。
**关键步骤**：AI 自评功能完整度 75 分/视觉精致度 60 分，给出 5 项改进建议。

### 步骤 9：最终 5 个页面全部完成
经过几轮调试，5 个页面全部完成：首页（绿色主题清晰显示当月收支）、记一笔（10 个常用分类红绿配色区分收支）、统计（SVG 环形图+分类排行）、账户（3 种账户类型现金/银行卡/支付宝）、我的（设置菜单+关于页面）。
**关键步骤**：5 个页面全部完成，配色统一/布局合理/交互逻辑清晰。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `帮我设计一个记账App，要5个页面（首页/记一笔/统计/账户/我的），现代简约风格，通用移动端（不要iOS或Android专属）。` | 一句话描述 5 个页面+风格+平台需求 |
| 2 | `设计一个记账App，包含：\n- 5个页面：首页/记一笔/统计/账户/我的\n- 风格：现代简约\n- 平台：通用移动端（375×812）\n- 配色：主色#2DB87B，支出红#FF3B30，收入绿#2DB87B` | 详细版需求模板（含尺寸和色值） |
| 3 | `描述清楚你的需求，剩下的交给WorkBuddy。` | 设计哲学总结 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 5 个 iPhone 尺寸（375×812）的记账 App 设计页面
2. 首页 Dashboard（绿色主题 #2DB87B，当月收支总览+最近交易记录+底部 4 Tab）
3. 记一笔 Add Record（10 个常用分类 emoji+文字垂直排列，支出/收入红绿切换）
4. 统计 Statistics（SVG 环形图+分类排行榜，餐饮 35%/交通 20%/购物 15%）
5. 账户 Accounts（3 种账户：现金 ¥2,580/招商银行 ¥8,000/支付宝 ¥2,000）
6. 我的 Profile（用户信息卡片+设置菜单+关于 section）
7. 6 个坑的解决方案文档（字体/布局/SVG/颜色/日期/binding）
8. AI 自评报告（功能完整度 75 分，视觉精致度 60 分）

### 结果证明

![Ardot 官网下载客户端](/images/workbuddy-cases/case-50/01.jpg)

![微信扫码登录 Ardot](/images/workbuddy-cases/case-50/02.jpg)

![Ardot 主界面](/images/workbuddy-cases/case-50/03.png)

![MCP 集成窗口打开 WorkBuddy 开关](/images/workbuddy-cases/case-50/04.png)

![WorkBuddy 里点信任 Ardot MCP](/images/workbuddy-cases/case-50/05.png)

![专家中心召唤 Ardot 设计专家](/images/workbuddy-cases/case-50/06.png)

![生成的首页 Dashboard（绿色主题当月收支总览）](/images/workbuddy-cases/case-50/07.png)

![生成的记一笔 Add Record（10 个分类红绿切换）](/images/workbuddy-cases/case-50/08.png)

![生成的统计 Statistics（SVG 环形图+分类排行榜）](/images/workbuddy-cases/case-50/09.png)

![生成的账户 Accounts（3 种账户类型卡片展示）](/images/workbuddy-cases/case-50/10.png)

![生成的我的 Profile（设置菜单+关于页面）](/images/workbuddy-cases/case-50/11.png)

### 5 个页面功能清单表

| 页面 | 主题色 | 核心元素 |
|---|---|---|
| 首页 Dashboard | #2DB87B 绿色 | 总资产+收支+最近交易+底部 4 Tab |
| 记一笔 Add Record | 红/绿切换 | 10 个分类 emoji+文字垂直排列 |
| 统计 Statistics | 多色环形图 | SVG 环形图+分类排行榜 |
| 账户 Accounts | 白色卡片 | 现金/招商银行/支付宝 3 种 |
| 我的 Profile | 灰白菜单 | 用户信息+设置菜单+关于 |

### 6 个坑及解决方案表

| 坑 | 现象 | 原因 | 解决方案 |
|---|---|---|---|
| 坑 1 字体不匹配 | Inter/Semi Bold 写法错误 | AI 猜字体名称不知道本地系统 | get_available_fonts 查询+Update 修正 |
| 坑 2 分类图标布局错乱 | 餐饮🍔图标文字排成横排 | AI 默认用 layout:"horizontal" | 改成 layout:"vertical" 的 Frame |
| 坑 3 SVG 环形图显示不出 | 直接插入 SVG 代码不生效 | Ardot 不支持文本节点写 SVG | 用 type:"frame" + svg 属性嵌入 |
| 坑 4 颜色格式写错 | alpha 写在 color 里面 | AI 混淆 CSS rgba() 和 Ardot fills | alpha 写在 opacity 字段 |
| 坑 5 交易记录日期重复 | 每条记录都显示日期 | AI 给每条都加日期文本 | 删除多余日期节点（按日期分组） |
| 坑 6 Binding 名称过期 | 报 expiredBindings 警告 | binding 名称一次性只当前 batch 有效 | 每次用新变量名（header1/header2...） |

### Ardot 属性名易错对照表

| 错误写法 | 正确写法 |
|---|---|
| textColor | fill |
| justifyContent: "center" | primaryAxisAlignItems: "CENTER" |
| borderRadius | cornerRadius |
| color: {r,g,b,a} | color: {r,g,b} + opacity: a |

### AI 自评表

| 维度 | 评价 | 分数 |
|---|---|---|
| 功能完整度 | 5 个页面结构完整，信息层级基本清晰 | 75 分 |
| 视觉精致度 | 配色统一但图标简陋/卡片不够精致 | 60 分 |

## 八、验收标准

- [ ] 从 ardot.tencent.com 下载安装 Ardot 桌面版并微信扫码登录
- [ ] 在 Ardot "MCP 集成"窗口打开 WorkBuddy 开关
- [ ] 在 WorkBuddy 连接器页面找到 Ardot MCP 并点"信任"按钮
- [ ] 在技能市场安装 ardot-design-assistant 技能
- [ ] 在专家中心召唤"Ardot 设计专家"（作者：林觉初）
- [ ] 一句话描述需求（5 个页面+现代简约+通用移动端）
- [ ] WorkBuddy 调用 batch_edit 自动创建 5 个 375×812 页面
- [ ] 首页 Dashboard 生成（绿色主题 #2DB87B，当月收支+最近交易+底部 4 Tab）
- [ ] 记一笔 Add Record 生成（10 个分类 emoji+文字垂直排列，红绿切换）
- [ ] 统计 Statistics 生成（SVG 环形图+分类排行榜，餐饮 35%/交通 20%/购物 15%）
- [ ] 账户 Accounts 生成（3 种账户：现金 ¥2,580/招商银行 ¥8,000/支付宝 ¥2,000）
- [ ] 我的 Profile 生成（用户信息卡片+设置菜单+关于 section）
- [ ] 修正坑 1：用 get_available_fonts 查询+Update 修正字体名称
- [ ] 修正坑 2：把分类项改成 layout:"vertical" 的 Frame
- [ ] 修正坑 3：SVG 用 type:"frame" + svg 属性方式嵌入
- [ ] 修正坑 4：alpha 值写在 opacity 字段而非 color 里面
- [ ] 修正坑 5：删除多余日期节点（按日期分组）
- [ ] 修正坑 6：每次 batch_edit 用新的 binding 名称（header1/header2/header3...）
- [ ] AI 自评功能完整度 75 分/视觉精致度 60 分
- [ ] 全程不到 2 小时完成 5 个页面（含环境配置+调试）
