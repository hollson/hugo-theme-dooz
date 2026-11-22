---
# ===== 基础信息（必填）=====
title: "{{ .Name }}"
slug: "{{ now.Unix }}"                 # URL 标识，生成 /post/<slug>
description: "一句话说清这篇指南解决什么问题、给谁用"
keywords: ""                           # 搜索关键词，多个用逗号分隔
date: {{ now.Format "2006-01-02T15:04:05Z07:00" }}
draft: true                          # 📢 设为 false 才会发布
tags: []                             # 标签，如 ["教程", "工具"]
categories: []                       # 分类，如 ["教程指南"]

# ===== 可选字段（按需取消注释）=====
# hero_image: "/post/cover.jpg"
# libraries: ["mermaid", "katex"]    # 流程图 / 数学公式
---

> 一篇好指南的标准：**场景清楚、步骤可照抄、结果可验证**。下面的示例文字与命令在正式发布前替换掉即可。

<br/>

## 🧭 一. 适用场景

一句话说明什么情况下需要照这篇执行，让读者先判断"这篇是不是我要找的"。

> 当你需要 **XXX** 且不希望踩坑时，照本文步骤操作即可，预计耗时 10 分钟。

<br/>

## ✅ 二. 前置条件

先列清楚环境与依赖，避免读者做到一半才发现问题：

- **环境**：如 Hugo v0.169.0、Node.js 20+
- **已有条件**：如一个可运行的 Git 仓库
- **基础知识**：了解基本的命令行操作

> 版本不一致时，先执行 `hugo version` 确认。

<br/>

## 🛠️ 三. 操作步骤

### 3.1 第一步：初始化

一句话说清做什么，紧跟可复制的命令：

```bash
hugo new content --kind guide content/guide/your-guide.md
```

### 3.2 第二步：修改关键配置

说明关键参数怎么改，用加粗强调重点：

```toml
baseURL = "https://example.com/"   # 改成你的真实域名
theme = "hugo-theme-dooz"          # 主题名
```

### 3.3 第三步：启动预览

```bash
hugo server -D
```

打开 `http://localhost:1313` 看到效果即可。

<br/>

## 🔍 四. 验证方式

看到如下输出即表示成功：

```bash
$ hugo version
hugo v0.169.0 darwin/amd64 BuildDate=unknown
```

| 检查项 | 期望结果 |
| --- | --- |
| 命令执行 | 无报错输出 |
| 页面访问 | 能正常打开，样式完整 |
| 产物生成 | `public/` 下有对应 HTML |

<br/>

## ❓ 五. 常见问题

| 现象 | 原因 | 处理 |
| --- | --- | --- |
| 命令不存在 | 未安装或未加入 PATH | 重新安装并配置环境变量 |
| 产物没更新 | 缓存未清理 | 执行 `hugo build --gc --minify` |
| 页面 404 | baseURL 不匹配 | 检查 config 里的 `baseURL` |
| 样式丢失 | 主题未加载 | 确认 `theme` 配置与 themes 目录名一致 |

---

*有问题欢迎留言，本文会持续更新。*
