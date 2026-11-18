---
title: "Markdown 语法指南与示例"
date: 2024-03-22T09:00:00+08:00
description: "一份通俗易懂的 Markdown 语法中文教程，用丰富示例讲清标题、段落、文字强调、引用、列表、代码块、链接、图片、转义和 HTML 等常用写法，新手也能快速上手，适合作为日常写作的速查手册。"
keywords: "Markdown, 基础语法, 写作"
draft: false
hideToc: false
enableToc: true
enableTocContent: false
pinned: true
featured: true
author: "Hollson"
cover: "https://markdown.com.cn/hero.png"
categories:
- 教程指南
tags:
- markdown
archives:
- 2026
libraries:
- mermaid
- katex
url: "/post/markdown-syntax/"
---


# Markdown 语法指南与示例

## 功能特性

- 📝 **实时预览** — 左侧编辑，右侧即时渲染
- 🌙 **深色模式** — 一键切换主题
- 💾 **自动保存** — 内容保存在浏览器本地
- 🎨 **代码高亮** — 支持多种编程语言
- 📊 **Mermaid 图表** — 流程图、时序图等
- 🧮 **数学公式** — 支持 KaTeX 渲染
- 📋 **目录生成** — 使用 [TOC] 插入目录



## 语法示例

### 文本样式

**粗体**、*斜体*、~~删除线~~、==高亮==、`行内代码`

### 标题

不同数量的`#`可以完成不同的标题，如下：

```
# 一级标题

## 二级标题

### 三级标题
```

### 链接

使用方括号和圆括号创建链接：[Markdown 入门教程](https://markdown.com.cn/intro.html)。
### 图片

插入图片，格式如下：

![圣胡安山脉](../san-juan-mountains.jpg)


### 无序列表

无序列表的使用，在符号`-`后加空格使用。如下：

- 无序列表 1
- 无序列表 2
- 无序列表 3

如果要控制列表的层级，则需要在符号`-`前使用空格。如下：

- 无序列表 1
- 无序列表 2
  - 无序列表 2.1
  - 无序列表 2.2


### 有序列表

有序列表的使用，在数字及符号`.`后加空格后输入内容，如下：

1. 有序列表 1
2. 有序列表 2
3. 有序列表 3

### 代码块

```javascript
function hello() {
  console.log('Hello, Markdown!');
}
```

### 任务列表

- [x] 已完成的项目
- [ ] 待办事项
- [ ] 另一个任务

### 表格

| 功能 | 状态 | 说明 |
|------|------|------|
| 实时预览 | ✅ | 左侧编辑右侧渲染 |
| 自动保存 | ✅ | localStorage 存储 |
| 导出文件 | ✅ | 支持 Markdown / HTML |

### 引用

> "Markdown 是一种轻量级标记语言，让你专注于写作本身。"

### 脚注

这里有一个脚注引用[^1]。

[^1]: 这是脚注的内容。

### 数学公式

**质能公式：** $E = mc^2$

**黄金分割：** $$ \varphi = \dfrac{1+\sqrt5}{2}= 1.6180339887… $$


**微积分：**
$$
\int_{a}^{b} f(x) \, dx = F(b) - F(a)
$$

**无穷：**
$$
 \varphi = 1+\frac{1} {1+\frac{1} {1+\frac{1} {1+\cdots} } } 
$$


### Mermaid 图表


```mermaid
graph TD;
  A[开始]-->B[处理];
  A-->C[审核];
  B-->D[完成];
  C-->D;
```

```mermaid
sequenceDiagram
  participant 张三
  participant 李四
  张三->李四: 你好，最近怎么样？
  loop 健康检查
      李四->李四: 别再胡思乱想了
  end
  Note right of 李四: 理性思考<br/>占上风……
  李四-->张三: 挺好的！
  李四->王五: 你呢？
  王五-->李四: 一切都好！
```

```mermaid
graph TD
A[困难] -->|文字| B(选择)
B --> C{判断}
C -->|方案一| D[结果一]
C -->|方案二| E[结果二]
```

```mermaid
gantt
section 阶段
已完成     :done,    des1, 2014-01-06,2014-01-08
进行中     :active,  des2, 2014-01-07, 3d
并行任务 1 :         des3, after des1, 1d
并行任务 2 :         des4, after des1, 1d
并行任务 3 :         des5, after des3, 1d
并行任务 4 :         des6, after des4, 1d
```

```mermaid
classDiagram
Class01 <|-- AveryLongClass : Cool
<<interface>> Class01
Class09 --> C2 : Where am i?
Class09 --* C3
Class09 --|> Class07
Class07 : equals()
Class07 : Object[] elementData
Class01 : size()
Class01 : int chimp
Class01 : int gorilla
class Class10 {
  <<service>>
  int id
  size()
}
```

```mermaid
stateDiagram
[*] --> 静止
静止 --> [*]
静止 --> 移动
移动 --> 静止
移动 --> 崩溃
崩溃 --> [*]
```

```mermaid
pie
"狗" : 386
"猫" : 85
"老鼠" : 15
```

### Callout

> [!INFO]
> 这是一个信息提示框。

> [!WARNING]
> 这是一个警告提示框。

## 快捷键

| 快捷键 | 功能 |
|--------|------|
| Ctrl+B | 粗体 |
| Ctrl+I | 斜体 |
| Ctrl+K | 链接 |
| Ctrl+S | 手动保存 |
| Ctrl+/ | 注释 |

---

**开始你的写作之旅吧！** ✨

---

## 参考资料
> [Markdown 语法速查表](https://markdown.com.cn/cheat-sheet.html)
>
> [Markdown Guide: Basic Syntax](https://www.markdownguide.org/basic-syntax/)，原文按 CC BY-SA 4.0 许可发布；示例站中的图片已下载到本地。
