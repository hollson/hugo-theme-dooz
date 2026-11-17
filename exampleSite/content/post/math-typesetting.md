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
Hugo 不会直接渲染 LaTeX 公式。需要启用 Goldmark 的 passthrough 扩展，保留公式定界符供浏览器中的 KaTeX 渲染。
{{< /box >}}

在 Hugo 项目中，可以借助第三方 JavaScript 库启用数学公式。
<!--more-->

本示例使用 [KaTeX](https://katex.org/)。

- 示例主题已内置 KaTeX Auto-render。单篇文章在 front matter 中启用：

```yaml
libraries:
  - katex
```

- 也可以为单篇文章设置 `math: true`，或在站点配置中设置 `params.math = true` 全站启用。
- 在站点配置中启用 Goldmark passthrough，并配置与 KaTeX 相同的公式定界符：

```toml
[markup.goldmark.extensions.passthrough]
  enable = true
  [markup.goldmark.extensions.passthrough.delimiters]
    block = [['\[', '\]'], ['$$', '$$']]
    inline = [['\(', '\)'], ['$', '$']]
```

**提示：** 可参考 [KaTeX 支持的 TeX 函数](https://katex.org/docs/supported.html)。

### 示例

行内公式：$$ \varphi = \dfrac{1+\sqrt5}{2}= 1.6180339887… $$

块级公式：

$$
 \varphi = 1+\frac{1} {1+\frac{1} {1+\frac{1} {1+\cdots} } } 
$$
