# Case 09｜每天忘签到？AI写脚本自动签到领积分

> **WorkBuddy 案例集 · 第 9 篇**
> 分类：办公协同与效率提升

---

## 一、场景描述

WorkBuddy 有日常签到领积分活动：每天签到 100 积分，连续签到 7 天直接领 1000 积分。但平时一忙就容易忘签，断签很可惜。

群里看到有小伙伴用 WorkBuddy 写了自动签到脚本，给了我很大启发。于是我也折腾了一下，全程让 WorkBuddy 辅助写脚本、调试、踩坑。

试错过程中发现：图像识别方案分辨率一变就失效、窗口一动就点歪；系统 API 定位方案读不到 WorkBuddy 自定义控件；最终用「手动测坐标 + 固定位置点击」的方案，最稳、最简单。脚本写完后，再配置定时任务和微信推送，实现每天 8 点自动签到、签到结果实时推送到微信。

## 二、想要完成的任务

让 WorkBuddy 辅助编写自动签到脚本，并配置每天定时执行 + 微信推送结果，彻底解决忘签到断签的问题。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| 代码编写能力 | 编写 Python 自动签到脚本、坐标检测脚本 | WorkBuddy 内置 | 本地文件写入 |
| Bash 执行能力 | 运行 Python 脚本、调试脚本 | WorkBuddy 内置 | 命令执行 |
| 定时任务（自动化） | 每天早上 8 点自动运行签到脚本 | WorkBuddy 内置 | 任务调度 |
| PushPlus 推送 Skill | 签到执行结果实时推送到微信 | 第 8 篇创建的 Skill | PushPlus Token |

## 四、前置条件

1. 已安装 WorkBuddy 客户端并登录（脚本只负责点击，不负责登录）
2. 操作系统为 macOS（脚本使用 osascript 调用系统 API）
3. 已开启终端的辅助功能权限：系统设置 → 隐私与安全性 → 终端打勾
4. 已创建 PushPlus 推送 Skill（参考 Case 08）
5. 电脑需保持开机、不能休眠，否则定时任务无法执行
6. WorkBuddy 窗口位置需固定，避免坐标失效

## 五、在 WorkBuddy 中的操作

### 步骤 1：尝试图像识别方案（失败）

直接跟 WorkBuddy 说：「帮我写一个自动签到的 Python 脚本」。它给出第一版用 `pyautogui` 图像识别，通过截图找按钮、自动点击位置。

**关键步骤**：运行脚本后发现分辨率一变就失效、窗口一动就点歪，稳定性太差，没法长期用。WorkBuddy 解释：截图是在用户屏幕上截的，它的环境没有 WorkBuddy 窗口，所以找不到这些元素。

### 步骤 2：尝试系统 API 定位方案（失败）

让 WorkBuddy 换思路：能不能精准定位界面元素？它尝试用 macOS 辅助功能 API 获取位置。

**关键步骤**：发现 WorkBuddy 界面是自定义控件，层级太深，根本读不到，这条路也走不通。

### 步骤 3：手动测坐标方案（最终方案）

WorkBuddy 给了一个最「土」但最稳的方案：用户自己测坐标，脚本直接点固定位置。

**关键步骤**：
1. 让 WorkBuddy 先写一个检测鼠标坐标的脚本
2. 执行脚本，打开 WorkBuddy，把鼠标移到按钮上
3. 获取坐标，发给 WorkBuddy
4. WorkBuddy 生成最终签到脚本

坐标检测脚本（复制就能用）：

```python
import subprocess
import time

print("移动鼠标，按 Ctrl+C 退出")
while True:
    result = subprocess.run(
        ["osascript", "-e", "tell application \"System Events\" to get position of (process \"WorkBuddy\"'s first window)"],
        capture_output=True,
        text=True
    )
    print(result.stdout)
    time.sleep(0.1)
```

运行后把鼠标移到对应按钮，记录坐标：

```python
HEADSHOT_X = 140    # 头像位置
HEADSHOT_Y = 1010   # 头像位置
CHECKIN_CARD_X = 180  # 签到卡片
CHECKIN_CARD_Y = 550   # 签到卡片
```

把坐标发给 WorkBuddy，它直接生成最终稳定版脚本。只要窗口位置不变，永远不失效。

### 步骤 4：配置定时任务：每天 8 点自动执行

脚本写完，直接让 WorkBuddy 帮我配置定时任务：每天早上 8 点，自动运行签到脚本。

**关键步骤**：在 WorkBuddy 的「编辑自动化任务」中一键填好任务名称（WorkBuddy 每日签到）、执行时间（每天 08:00）、执行命令（`python3 /Users/zgedu/WorkBuddy/Claw/workbuddy_checkin_v2.py`）、工作目录，保存即生效。

### 步骤 5：开启微信推送结果

执行成功/失败，直接推送到微信，使用第 8 篇的 PushPlus 方案，消息秒到。

**关键步骤**：在签到脚本最后调用 `push_wechat("WorkBuddy 签到完成", "签到执行成功！")`，将结果实时推送到微信。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `帮我写一个自动签到的Python脚本` | 让 WorkBuddy 生成第一版图像识别签到脚本（失败） |
| 2 | `能不能精准定位界面元素？` | 让 WorkBuddy 尝试系统 API 方案（失败） |
| 3 | `先写一个检测鼠标坐标的脚本` | 让 WorkBuddy 生成坐标检测工具脚本 |
| 3 | `头像坐标(140,1010)，签到卡片坐标(180,550)` | 把测得的坐标发给 WorkBuddy，生成最终签到脚本 |
| 4 | `帮我配置每天早上8点自动运行签到脚本` | 让 WorkBuddy 自动配置定时任务 |

## 七、在 WorkBuddy 中的效果

### 交付物

1. 鼠标坐标检测脚本 `get_coordinates.py`
2. 最终稳定版签到脚本 `workbuddy_checkin_v2.py`
3. 每天早上 8 点自动执行的定时任务
4. 签到结果微信实时推送

### 结果证明

![WorkBuddy 签到活动页面：连续签到领积分](/images/workbuddy-cases/case-09/01.png)

![图像识别方案失败：WorkBuddy 找不到界面元素](/images/workbuddy-cases/case-09/02.png)

![运行坐标检测脚本实时显示鼠标位置](/images/workbuddy-cases/case-09/03.png)

![WorkBuddy 编辑自动化任务页面配置每天 8 点执行](/images/workbuddy-cases/case-09/04.png)

![微信收到 WorkBuddy 签到完成推送消息](/images/workbuddy-cases/case-09/05.jpg)

### 三种方案对比

| 方案 | 思路 | 结果 | 问题 |
|---|---|---|---|
| 方案 1：图像识别 | pyautogui 截图找按钮点击 | 失败 | 分辨率变化就失效，窗口移动就点歪 |
| 方案 2：系统 API | macOS 辅助功能 API 获取元素位置 | 失败 | WorkBuddy 自定义控件层级太深读不到 |
| 方案 3：手动测坐标 | 用户测坐标，脚本点固定位置 | 成功 | 最稳最简单，窗口位置不变永远不失效 |

## 八、验收标准

- [ ] 坐标检测脚本 `get_coordinates.py` 可正常运行，实时显示鼠标坐标
- [ ] 测得头像坐标和签到卡片坐标，发给 WorkBuddy
- [ ] WorkBuddy 生成最终稳定版签到脚本 `workbuddy_checkin_v2.py`
- [ ] 在 WorkBuddy「编辑自动化任务」中配置好每天 08:00 执行的任务
- [ ] 任务名称为「WorkBuddy 每日签到」，执行命令指向签到脚本路径
- [ ] 已开启 Mac 终端的辅助功能权限（系统设置 → 隐私与安全性 → 终端打勾）
- [ ] 定时任务测试运行成功，签到执行成功
- [ ] 微信收到 PushPlus 推送的「WorkBuddy 签到完成」消息
- [ ] WorkBuddy 窗口位置固定，避免坐标失效
- [ ] 电脑保持开机、未休眠时，定时任务按时执行
