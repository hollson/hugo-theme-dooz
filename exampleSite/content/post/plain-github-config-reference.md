---
title: "🎨 主题示例 - GitHub 原生：hugo-theme-dooz 配置参考"
slug: "plain-github-config-reference"
date: 2026-11-17T09:00:00+08:00
description: "主题示例（plain-github GitHub 原生）：一篇 README 式配置手册，演示参数表格、目录树、代码块、术语表与检查清单。"
keywords: "GitHub 原生, 配置参考, README, Hugo 主题, 主题示例"
draft: false
hide_toc: false
enable_toc: true
enable_toc_content: false
author: "Hollson"
categories:
- 主题示例
tags:
- Hugo
- 文档
mdTheme: "plain-github"
series: "主题示例"
archives:
- 2026
---
# 主题示例 - GitHub 原生：hugo-theme-dooz 配置参考

一份按「仓库文档」写的配置手册：左对齐、直角、无多余装饰，所有参数一张表说完。示例值以 `hugo-theme-dooz` 为准[^1]。

## 安装

```bash
git submodule add https://github.com/hollson/hugo-theme-dooz themes/hugo-theme-dooz
```

在站点配置里声明主题：

```toml
theme = "hugo-theme-dooz"
```

## 目录结构

```text
themes/hugo-theme-dooz/
├── assets/            # 会被 Hugo Pipes 处理的 CSS / JS
├── layouts/           # 模板与 partial
├── i18n/              # 多语言文案
├── archetypes/        # hugo new 的默认 front matter
└── exampleSite/       # 可直接运行的示例站
```

## 站点参数

| 参数 | 类型 | 默认 | 说明 |
| :--- | :--- | :--- | :--- |
| `params.markdownTheme` | string | `""` | 全站默认正文主题，空表示不启用 |
| `params.sidebarTags` | array | `["categories","archives"]` | 侧边栏组件顺序 |
| `params.logoFontWeight` | int | `700` | 站点标题字重 |
| `params.giscus.repo` | string | — | 评论仓库，留空则显示预览占位 |

```toml
[params]
  markdownTheme = "dev-linear"
  sidebarTags = ["categories", "tags", "archives"]
  logoFontWeight = 700
```

## 文章参数

| 参数 | 类型 | 说明 |
| :--- | :--- | :--- |
| `mdTheme` | string | 单篇覆盖正文主题 |
| `mdThemeNumbering` | bool | 是否给 H2 加序号，默认 `true` |
| `weight` | int | 排序权重，不写按 100 处理 |
| `pinned` | bool | 置顶，优先于权重 |
| `libraries` | array | 按需加载 `mermaid`、`katex` |

![主题截图](/post/dooz_theme.png)

## 常见问题

正文主题不生效
: 检查文章是否写了 `mdTheme`，或站点 `markdownTheme` 是否为空；两者都为空时不会加载主题样式。

代码块没有颜色
: 主题文章会强制 Chroma 输出类名，非主题文章走内联样式；确认文章确实启用了 `mdTheme`。

H2 序号从哪里来
: CSS 计数器生成，不写进正文文本，关闭时传 `mdThemeNumbering: false` 即可。

- [x] 主题仓库以 submodule 方式引入
- [x] 站点参数与文章参数分开配置
- [ ] 升级前先跑一遍 `hugo --quiet`

[^1]: 示例脚注：README 类文档的注释通常放版本要求或兼容说明。
