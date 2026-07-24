# Case 70｜楼下瑞幸点咖啡，一句话的事

> **WorkBuddy 案例集 · 第 70 篇**
> 分类：办公协同与效率提升

---

## 一、场景描述

晚上突发奇想：楼下就是瑞幸，能不能让 WorkBuddy 帮我点杯咖啡？一开始觉得不可能——AI 助手怎么能帮我点咖啡？涉及真实付款和到店取餐，总感觉有堵墙。但转念一想，之前已经用 WorkBuddy 点过麦当劳了，瑞幸会不会也有？试着搜了一下，结果真的找到了。2026 年 6 月 1 日瑞幸咖啡正式上线 AI 开放平台 open.lkcoffee.com，提供 MCP Server、Skill 离线包和 CLI 工具三种接入方式。在 WorkBuddy 里用 MCP Server 最简单，远程连接不用装任何东西，配置好 Token 后查门店、看优惠、下单、取餐码全程跟 WorkBuddy 聊就行。

## 二、想要完成的任务

在瑞幸 AI 开放平台登录获取 MCP Token，把配置粘贴到 WorkBuddy MCP 服务管理并信任连接器，然后通过一句话对话完成查找附近门店、查询门店优惠、了解 8 个 MCP 工具能力等操作。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| 瑞幸咖啡 MCP（my-coffee） | 8 个工具覆盖点咖啡全流程：查门店/搜商品/看详情/调属性/订单预览/创建订单/查订单/取消订单 | 瑞幸官方（open.lkcoffee.com） | 瑞幸会员账号 + MCP Token |
| MCP 配置能力 | 把瑞幸 MCP 配置 JSON 粘贴到 WorkBuddy 连接器管理 | WorkBuddy 内置 | WorkBuddy 账号 |
| 连接器信任管理 | 首次连接 MCP 服务需手动信任确认 | WorkBuddy 内置 | WorkBuddy 账号 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 拥有瑞幸咖啡会员账号（手机号即可注册）
3. 能访问 https://open.lkcoffee.com/mcp 获取 MCP Token

## 五、在 WorkBuddy 中的操作

### 步骤 1：去官网登录拿 Token
打开 open.lkcoffee.com/mcp，页面显示 MCP/CLI/Skill 三种接入方式和工具文档。点右上角「登录」，用手机号 + 6 位短信验证码登录。登录成功后右上角变成「AI控制台」，点开后选择「点击创建或者查看 Token」。Token 生成后有效期一个月，页面有「复制 MCP 配置 JSON」按钮直接复制。
**关键步骤**：Token 有效期一个月，复制 MCP 配置 JSON 按钮一键复制。

### 步骤 2：在 WorkBuddy 里配置 MCP
把复制的 MCP 配置粘贴到 WorkBuddy → 专家→连接器→自定义连接器 → MCP 服务管理 → 配置 MCP。列表里多了一个叫 my-coffee 的服务，首次连接需要点「信任」。点完信任服务激活，整个过程不到 2 分钟。
**关键步骤**：粘贴配置 JSON → 信任 my-coffee 服务，2 分钟搞定。

### 步骤 3：查找附近门店
直接说「查找附近门店」。WorkBuddy 立刻调用 MCP，几秒钟后回复附近 8 家瑞幸门店信息：哪家营业中、哪家打烊了、营业时间、距离多少米。最近的是楼下的时代盛华店（21:00 已关门），最近还在营业的是王府井百货中心店（665 米，走路 7 分钟）。
**关键步骤**：一句话查门店，返回营业状态/时间/距离。

### 步骤 4：查门店优惠
问「楼下那家有什么优惠？」。WorkBuddy 直接搜这家店菜单，告知有两款 9.9 元特价饮品：Hello苹果茉莉和小青桔茉莉冰奶，原价都是 16 元，省 6.1 元。其他美式、拿铁都是原价没活动。

### 步骤 5：了解 8 个 MCP 工具能力
瑞幸 MCP 提供 8 个工具覆盖点咖啡全流程：queryShopList（查门店，「我家附近有哪些瑞幸？」）、searchProductForMcp（搜商品，「我想喝生椰拿铁」）、queryProductDetailInfo（看详情，「这杯咖啡有哪些选项？」）、switchProduct（调属性，「换少冰、半糖」）、previewOrder（订单预览，「看看这单多少钱」）、createOrder（创建订单，「帮我下单」）、queryOrderDetailInfo（查订单，「我的取餐码是多少？」）、cancelOrder（取消订单，「我不要了」）。从查门店到下单到取餐码全程不用打开瑞幸 App，还会自动匹配优惠券和咖啡库券。

### 步骤 6：定位小插曲
聊天过程中 WorkBuddy 不知道我在哪里，用默认坐标查出门店不对。IP 定位、macOS 定位服务都试了，网络环境和权限问题导致不准。最后直接告诉它「我在xn时代盛华」，才精准定位到楼下门店。AI 工具再厉害，有些基础信息还得人来提供。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | （把复制的 MCP 配置 JSON 粘贴到 WorkBuddy MCP 服务管理） | 配置 my-coffee 服务 |
| 2 | `查找附近门店` | 调用 queryShopList 查附近 8 家瑞幸门店 |
| 3 | `楼下那家有什么优惠？` | 调用 searchProductForMcp 查门店特价饮品 |
| 4 | `我在xn时代盛华` | 手动提供位置信息精准定位楼下门店 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 瑞幸 MCP 连接器配置成功（my-coffee 服务已信任激活）
2. 附近 8 家瑞幸门店清单（营业状态/营业时间/距离米数）
3. 时代盛华店优惠信息（Hello苹果茉莉 9.9 元原价 16 元、小青桔茉莉冰奶 9.9 元原价 16 元，省 6.1 元）
4. 8 个 MCP 工具能力清单（查门店/搜商品/看详情/调属性/订单预览/创建订单/查订单/取消订单）

### 结果证明

![瑞幸 MCP 官网](/images/workbuddy-cases/case-70/01.png)

![手机号验证码登录](/images/workbuddy-cases/case-70/02.png)

![AI控制台创建 Token](/images/workbuddy-cases/case-70/03.png)

![复制 MCP 配置 JSON](/images/workbuddy-cases/case-70/04.png)

![信任 my-coffee 服务](/images/workbuddy-cases/case-70/05.png)

## 八、验收标准

- [ ] 访问 open.lkcoffee.com/mcp 看到三种接入方式（MCP Server/Skill 离线包/CLI 工具）
- [ ] 手机号 + 6 位短信验证码登录成功
- [ ] AI控制台创建 Token（有效期一个月）
- [ ] 复制 MCP 配置 JSON 按钮可用
- [ ] 粘贴配置到 WorkBuddy MCP 服务管理，列表出现 my-coffee 服务
- [ ] 点「信任」后服务激活，整个过程不到 2 分钟
- [ ] 「查找附近门店」返回 8 家瑞幸门店信息（营业状态/时间/距离）
- [ ] 时代盛华店 21:00 关门，王府井百货中心店 665 米营业中
- [ ] 「楼下那家有什么优惠？」返回两款 9.9 元特价饮品（Hello苹果茉莉/小青桔茉莉冰奶，原价 16 元省 6.1 元）
- [ ] 8 个 MCP 工具：queryShopList/searchProductForMcp/queryProductDetailInfo/switchProduct/previewOrder/createOrder/queryOrderDetailInfo/cancelOrder
- [ ] 自动匹配优惠券和咖啡库券
- [ ] 下单后返回微信支付链接
- [ ] AI 不知道位置时需手动告知「我在xn时代盛华」精准定位
