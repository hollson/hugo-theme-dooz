---
# ===== 一、基础信息（必填）=====
title: "{{with slicestr .Name (len (index (split .Name "-") 0))}}{{replace . "-" " "|strings.TrimLeft " "|title}}{{end}}"
slug: "{{ now.Unix }}"                 # URL 标识，生成 /post/<slug>
description: "文章简介，用于列表摘要、SEO和搜索摘要"
keywords: ""                           # 搜索关键词，多个用逗号分隔
date: {{ now.Format "2006-01-02T15:04:05Z07:00" }}
draft: true                          # 📢 设为 false 才会发布

# ===== 二、分类归档（常用）=====
tags: []                             # 标签，如 ["Hugo", "教程"]
categories: []                       # 分类，如 ["技术"]

# ===== 三、可选字段（按需取消注释）=====
# author: "{{ .Site.Params.author | default "Mafool" }}"
# subtitle: "副标题"
# hero_image: "/post/cover.jpg"       # 文章头图（og:image）；不填用站点默认图
# cover_image: "/post/cover.jpg"      # 列表缩略图，显示在首页文章列表
# archives: ["2026"]                 # 不填按 date 自动归档
# pinned: true                       # 置顶显示
# enable_toc: true                    # 生成目录
# libraries: ["mermaid", "katex"]    # 流程图 / 数学公式
# weight: 100                        # 排序权重，越小越靠前；不写默认 100
# lastmod: {{ now.Format "2006-01-02T15:04:05Z07:00" }}
---


今天是{{ now.Format "2006-01-02" }}，欢迎开启新的博客。

> 写作说明：把 `description`、`tags`、`categories` 填好，正文用 Markdown 写（段落之间空一行），预览用 `hugo server -D`，写完把 `draft` 改为 `false` 即可发布。需要流程图或数学公式时取消 front matter 里 `libraries` 的注释。
