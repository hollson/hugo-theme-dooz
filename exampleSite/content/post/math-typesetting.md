---
title: "数学公式排版"
date: 2023-12-17T12:00:06+09:00
description: "用 KaTeX 在 Hugo 中排版数学公式的简要指南"
draft: false
hideToc: false
enableToc: true
enableTocContent: false
author: "Hollson"
authorEmoji: 👽
libraries:
- katex
tags:
- 数学公式
categories:
- Hugo
archives:
- 2019
---

{{< box >}}
Hugo 目前还需要 goldmark 的 KaTeX 扩展支持，相关进展见：
[https://github.com/gohugoio/hugo/issues/6544](https://github.com/gohugoio/hugo/issues/6544)
{{< /box >}}

在 Hugo 项目中，可以借助第三方 JavaScript 库启用数学公式。
<!--more-->

本示例使用 [KaTeX](https://katex.org/)。

- 在 `/layouts/partials/math.html` 下创建一个局部模板。
- 在模板中引用 [Auto-render 扩展](https://katex.org/docs/autorender.html)，或把这些脚本放到本地托管。
- 在页面模板中引入这个局部模板：

```
{{ if or .Params.math .Site.Params.math }}
{{ partial "math.html" . }}
{{ end }}
```

- 如果要在全站启用 KaTeX，在项目配置中把 `math` 设为 `true`。
- 如果只想在单篇文章启用，在文章 front matter 中加上 `math: true`。

**提示：** 可参考 [KaTeX 支持的 TeX 函数](https://katex.org/docs/supported.html)。

### 示例

行内公式：$$ \varphi = \dfrac{1+\sqrt5}{2}= 1.6180339887… $$

块级公式：

$$
 \varphi = 1+\frac{1} {1+\frac{1} {1+\frac{1} {1+\cdots} } } 
$$
