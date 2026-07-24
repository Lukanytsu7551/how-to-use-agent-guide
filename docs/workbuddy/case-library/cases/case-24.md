# Case 24｜踩坑无数，我终于把 ChatGPT Image 2 接入了 WorkBuddy

> **WorkBuddy 案例集 · 第 24 篇**
> 分类：AI 能力扩展

---

## 一、场景描述

最近 ChatGPT Image 2 特别火，网上一大堆教程教你怎么调用。我正好想把 AI 绘图能力接到 WorkBuddy 里，就跟着教程试了一遍。结果踩了一路坑。网上的教程我试了好几个，发现一个共同问题：他们大多没真正跑通过，代码是拼凑的，步骤是缺失的。你按他们的流程走，大概率卡在半路，还不知道怎么解决。

我把完整踩过的四个坑记下来，帮你直接省时间：坑一先创建 API Key（不是注册就能调用，必须手动创建）；坑二账号必须先绑卡再充值（余额至少 10 美元）；坑三接口调用一直报"未验证"（需要完成 KYC 身份认证）；坑四 KYC 认证等审核（不是立即生效）。

这四个坑我逐个踩完，API 终于调通了。但问题也来了——每次想用的时候都要翻代码、改参数、重新跑脚本，太麻烦。如果分享给朋友用，他们还得懂 Python、会配环境，门槛太高。最终我把 API 调用封装成了一个通用的 WorkBuddy Skill，像安装 App 一样，别人拿到就能用。

## 二、想要完成的任务

把 ChatGPT Image 2 API 调用代码按照 WorkBuddy Skill 规范封装成一个可安装、可配置、可复用的组件，包含完整的参数体系、三级 API Key 配置优先级与使用文档。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| WorkBuddy Skill 机制 | 标准化目录结构+主程序+说明文档，将脚本封装为可复用组件 | 内置能力 | WorkBuddy 账号 |
| OpenAI Python SDK | 调用 gpt-image-2 模型生成图片 | 第三方库 | OpenAI API Key |
| 命令行参数解析 | 支持 prompt、--api-key、--size、--quality、--n、--background 等参数 | Python argparse | 本地 Python 环境 |
| SKILL.md 配置文件 | WorkBuddy 识别 Skill 的配置入口 | 内置规范 | WorkBuddy 账号 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 已注册 OpenAI 账号并完成 API Key 创建（platform.openai.com → API keys → Create new secret key）
3. OpenAI 账号已绑定信用卡/借记卡（Settings → Billing → Add payment method）
4. 账户余额至少 10 美元（Credit balance → Add to credit balance）
5. 账号已完成 KYC 身份认证（Settings → Organization → Verifications → Individual → Start）
6. 本机已安装 Python3 与 openai 库（`pip install openai`）
7. 已开通 WorkBuddy Skill 目录的读写权限（~/.workbuddy/skills/）

## 五、在 WorkBuddy 中的操作

### 步骤 1：创建 OpenAI API Key
访问 platform.openai.com，登录后进入 Settings → API keys，点击"Create new secret key"创建 API Key。⚠️ 重要：API Key 创建后只会显示一次，必须立即点击"Copy"复制保存。如果忘记保存，只能删除旧 Key 后重新创建。没有 Key，代码写得再对也调不通。
**关键步骤**：在 OpenAI 后台 API Keys 页面手动创建 API Key 并立即复制保存。

### 步骤 2：绑定信用卡并充值
调用 Image 2 API 不是免费试用的。OpenAI 账号必须先绑定一张信用卡或借记卡（Settings → Billing → Add payment method，填写 Card number、MM/YY、CVC、Name on card、Billing address），完成绑卡后才能往账户里充值。余额里至少要有 10 美元，接口才会正常响应。没绑卡、没充值的话，接口直接报额度不足。
**关键步骤**：先绑卡再充值，余额至少 10 美元（Estimated total $10.64）。

### 步骤 3：完成 KYC 身份认证
按文档写好代码调接口，结果返回的错误是"organization not verified"（组织未验证）。调用 Image 2 这个模型，账号必须完成身份认证，不是普通的邮箱验证，是要在 OpenAI 后台提交个人或开发者身份认证（KYC）。进入 Settings → Organization → Verifications，选择 Individual（个人）或 Business（企业），提交身份信息。提交认证资料后不是立即生效的，要等审核通过（Identity in review → Start）。
**关键步骤**：完成 KYC 身份认证并等待审核通过（最多 15 分钟生效）。

### 步骤 4：测试 API 调用生成图片
KYC 审核通过后，使用 Python 测试 API 调用：

```python
from openai import OpenAI
import base64

client = OpenAI(api_key='sk-proj-xxxxx')
print('使用 gpt-image-2 模型生成...')
response = client.images.generate(
    model='gpt-image-2',
    prompt='一只橘猫坐在赛博朋克风格的霓虹灯街道上，招牌写着「深夜食堂」文字清晰可见',
    size='1024x1024',
    quality='medium',
    n=1
)
image_data = base64.b64decode(response.data[0].b64_json)
with open('test-gpt-image2.png', 'wb') as f:
    f.write(image_data)
print('完成!')
```

测试成功生成了一只戴着宇航员头盔的橘猫坐在火星上的图片。

**关键步骤**：使用 openai 库调用 gpt-image-2 模型，base64 解码并保存图片。

### 步骤 5：设计命令行接口与参数体系
为了让 Skill 真正通用，设计完整的参数体系：prompt（必填，图片描述支持中文）、--api-key（三种方式传入）、--size（图片尺寸，支持 1024x1024/1024x1536/1536x1024 三种比例）、--quality（生成质量 low/medium/high 三档）、--n（批量生成数量 1-10）、--background（是否透明背景 transparent）、--output-dir（输出目录）、--output-name（自定义文件名）。
**关键步骤**：设计 8 个参数，覆盖图片描述、API Key、尺寸、质量、数量、透明背景、输出目录、文件名。

### 步骤 6：实现三级 API Key 配置优先级
为了让 Skill 通用，API Key 设置设计了三级优先级：① 命令行参数（最高优先级，适合临时调用）；② 配置文件（适合个人长期使用，config.example.txt）；③ 环境变量（适合服务器部署）。无论在什么场景下使用，都能找到合适的配置方式。
**关键步骤**：实现命令行参数 > 配置文件 > 环境变量三级 API Key 优先级。

### 步骤 7：按 Skill 规范组织目录结构并写文档
封装完成后，整个 Skill 的目录结构：

```
gpt-image/
├── README.md              # 完整使用文档
├── SKILL.md               # WorkBuddy识别配置
├── config.example.txt     # 配置文件模板
├── scripts/
│   └── generate_image.py  # 主程序
└── references/            # API参考文档
```

README 包含：安装依赖、三种 API Key 配置方式的详细步骤、从简单到复杂的 6 个使用示例、Python 代码调用示例、完整的参数说明表、常见问题解答、质量与价格参考（low 约 1000-2000 tokens/张、medium 约 2000-4000 tokens/张、high 约 4000-8000 tokens/张）。

用户安装依赖、设置 API Key 后，一行命令就能生成图片：

```bash
python3 generate_image.py "一只戴着宇航员头盔的橘猫坐在火星上" --quality high --n 3
```

**关键步骤**：按 Skill 规范组织 gpt-image/ 目录，包含 README、SKILL.md、config.example.txt、scripts、references。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | （OpenAI 后台）`API keys → Create new secret key → Copy` | 创建并保存 API Key |
| 2 | （OpenAI 后台）`Billing → Add payment method → Add to credit balance $10` | 绑卡并充值 10 美元 |
| 3 | （OpenAI 后台）`Organization → Verifications → Individual → Start` | 完成 KYC 身份认证 |
| 4 | `python3 -c "from openai import OpenAI; client = OpenAI(api_key='sk-xxx'); response = client.images.generate(model='gpt-image-2', prompt='...', size='1024x1024', quality='medium', n=1)"` | 测试 API 调用生成图片 |
| 5 | `python3 generate_image.py "一只戴着宇航员头盔的橘猫坐在火星上" --quality high --n 3` | 使用封装好的 Skill 一行命令生成图片 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 一个可安装、可配置、可复用的 gpt-image Skill 目录
2. 主程序 generate_image.py（支持 8 个参数）
3. 完整的 README.md 使用文档（安装、配置、示例、FAQ、价格参考）
4. SKILL.md WorkBuddy 识别配置文件
5. config.example.txt 配置文件模板
6. references/ API 参考文档
7. 一行命令生成图片的能力（支持批量、透明背景、自定义尺寸质量）

### 结果证明

![OpenAI 后台 API Keys 页面创建 Key](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRP5QW2U3CXEc44pMLbalQZrvib8hYnkfRBo4LwtSOtyobKPMAJGCz46vgpDzcNic9K5yR8VYGCFDeWthjbPUermXbTAsDxPyIfCo/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

![绑卡充值页面 Add payment method](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRM5lqdZM9F92nF5ekmicg0hD8KZGg97AF2AMokVaYf3njJ8FckXaT7NxTgmVHIscvj8uYNZwJNzBXTbibT8QaXozSw5eYw6Dv3DQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

![充值 10 美元确认支付页面](https://mmbiz.qpic.cn/sz_mmbiz_jpg/s516EMWvbRNWDMpWNjJbP9HuCuK3o9WiaMSXRZDWtEgAOC4kyDVZoVtOkDH1jB5xRemJDBDp7jGw3ZC1KLuw4Vj01HhvzKm6rTsVqZq763CM/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=2)

![接口报错 organization not verified](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRPRYoBWgbwQIB1DgI8K0mySdArYSI08J2FPTtw4YP1tuZYiaOG6rF5R8GQA7RZkHB3Tiap2shgMIcgSHja9SkjgxvBDIeH55kdYs/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

![KYC 身份认证 Verifications 页面](https://mmbiz.qpic.cn/mmbiz_jpg/s516EMWvbRPYU8yWgQxzg35z9ZIic5oauXPMRucRsPSvt0KUkbZic49mYspgUibPm3iavoZ9x5CXO44XuCp9u5QyKQc5YbFJzRk5iaKmXIHqCoYI/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=4)

![Organization 详情页与 Verifications 状态](https://mmbiz.qpic.cn/mmbiz_jpg/s516EMWvbRNnEz8TkfMsacp5WBWGxgJlZCngoTKIiayW6fhfDBO47YyGfpESqQpJ1HrMPVUemBkEd7cRCn5KHldkpuqIsKHRcDibD5b9ibmTZ0/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=5)

![测试成功生成的橘猫宇航员图片](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRMITyfAuwca5EbFDj0TxLBhOMJBAVK7Hb9slnScxmV1KvZ7z1GfyNiatW2qibiaAVVheHGq6lZBibvWkymJq0xTdCQwf4Oh62nw8sw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

![gpt-image Skill 目录结构与 SKILL.md](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbROylBsKga6na8fHSPUXGhxHRfFZ0kQVuh9NcH8RfI3qIch4z4hYX2gfibF8849BpTInzpHvG5rGwTlwkjqHjsebd7K1T24icsiaO8/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

![Finder 中 gpt-image Skill 完整目录结构](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRMvhkibUt1oiaicvY5P1YAkRd8IbwzxAolrgtgNriarysCtWMNvoGYDTGvHR9YlzOuJRqBMkl2KdGperq4yoK5bftjMM1V2NNMkMJ0/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)

### 从脚本到 Skill 的三步封装对比表

| 维度 | 个人脚本 | 封装为 Skill |
|---|---|---|
| 安装方式 | 手动复制代码、配环境 | 像安装 App 一样，放到 ~/.workbuddy/skills/ |
| API Key 配置 | 硬编码或单一环境变量 | 三级优先级（命令行 > 配置文件 > 环境变量） |
| 参数灵活性 | 固定参数 | 8 个参数可组合（prompt/size/quality/n/background/output-dir/output-name） |
| 文档 | 无或简陋 | 完整 README（安装、配置、示例、FAQ、价格参考） |
| 复用性 | 仅自己能用 | 可分享给他人，零门槛使用 |
| 调用方式 | 翻代码改参数跑脚本 | 一行命令：`python3 generate_image.py "描述" --quality high --n 3` |

## 八、验收标准

- [ ] OpenAI 账号已创建 API Key 并保存（platform.openai.com → API keys）
- [ ] 账号已绑定信用卡/借记卡（Billing → Add payment method）
- [ ] 账户余额至少 10 美元（Credit balance ≥ $10）
- [ ] 账号已完成 KYC 身份认证（Verifications → Individual → 通过审核）
- [ ] API 调用能正常生成图片（不再报 organization not verified 错误）
- [ ] gpt-image Skill 目录结构完整（README.md、SKILL.md、config.example.txt、scripts/、references/）
- [ ] 主程序 generate_image.py 支持 8 个参数（prompt、--api-key、--size、--quality、--n、--background、--output-dir、--output-name）
- [ ] API Key 实现三级优先级（命令行参数 > 配置文件 > 环境变量）
- [ ] README 包含安装依赖、三种配置方式、6 个示例、Python 调用示例、参数说明表、FAQ、价格参考
- [ ] 一行命令可生成图片：`python3 generate_image.py "描述" --quality high --n 3`
- [ ] Skill 已放置到 ~/.workbuddy/skills/gpt-image/ 目录
- [ ] 支持 3 种尺寸（1024x1024/1024x1536/1536x1024）、3 档质量（low/medium/high）、批量 1-10 张
