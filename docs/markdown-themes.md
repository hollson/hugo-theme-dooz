# 正文排版主题（markdown.com.cn/wechat）

`themes.wx.css` 把 [markdown.com.cn/wechat](https://markdown.com.cn/wechat/) 的十套正文风格搬进了 Dooz。颜色、字号、行高、间距、边框逐项取自该站 `js/themes.js` 的 `buildStyles()`，没有改写数值。

## 用法

单篇文章在 front matter 里指定：

```toml
+++
title = "示例"
mdTheme = "editorial-sspai"
mdThemeNumbering = false   # 可选，默认 true
+++
```

站点级默认：

```toml
[params]
  markdownTheme = "dev-linear"   # 留空 = 不覆盖站点正文样式
```

优先级：`mdTheme`（文章） > `markdownTheme`（站点） > 不启用。未启用时正文完全走 Dooz 原有排版，不会多出任何规则。

## 主题一览

| id | 名称 | 结构特征 |
| --- | --- | --- |
| `editorial-sspai` | 数字生活·少数派风 | 下划线 H2、胶囊序号、2px 标题粗线 |
| `editorial-latepost` | 商业深度·晚点风 | 同上，正文行高 1.9（衬线阅读节奏） |
| `essay-songyan` | 人文随笔·松烟墨 | H1 居中、虚线分隔 |
| `dev-linear` | 极简科技·Linear 风 | 下划线 H2、直角序号 |
| `dev-tech-blue` | 开发者·极客蓝 | H2 左侧 4px 色块 + 浅底色 |
| `dev-wechat-green` | 开发者·开源绿 | 同上 |
| `meetup-vibrant` | Meetup·活力橙 | H1 色底、H2 居中胶囊、表头反白 |
| `meetup-aurora` | Meetup·极光紫 | 同上 |
| `daily-festive-red` | 节日·喜庆红 | 同上，H1/H2 加金色描边 |
| `plain-github` | 极简·GitHub 原生 | 全灰阶、无装饰、左对齐段落 |

## 与来源的对应关系

| 源站元素 | Dooz 实现 | 说明 |
| --- | --- | --- |
| 正文 `section` 内联样式 | `.md-body[data-md-theme]` | 只作用于 Markdown 输出，不动文章头、评论 |
| H1 / H2 / H3 / H4 | `h1`–`h4` | 胶囊主题的 H2 用 `width: fit-content` 复刻内联 span |
| 引用、GitHub Alert | `blockquote`、`.callout-*` | Alert 六种语义色照搬；Dooz 的 callout 标记沿用 |
| 表格 | `table / th / td` | editorial 系列保留「粗顶线 + 细底线」，其余全边框 |
| 代码块 | `.code-block` | 固定用「微信代码主题」：`#f7f7f7` 底、`#ededed` 头、关键字 `#07c160` |
| H2 自动序号 | CSS `counter` + `::before` | 用 `01`、`02` 前导零，不再注入 DOM |

源站的三项交互式增强没有对应的纯 CSS 形式，未纳入：`[TOC]`、外链转文末引用（`linkToFootnote`）、`<ruby>` 注音。

## 定制

所有颜色都收敛成 `.md-body[data-md-theme="<id>"]` 上的 CSS 变量：

```css
--md-accent      /* 主题色：链接、H3 竖线、表头 */
--md-strong      /* 加粗、行内代码文字 */
--md-text        /* 正文 */
--md-heading     /* 标题 */
--md-soft        /* 引用/表头/斑马纹底色 */
--md-border      /* 分隔线与边框 */
```

站点想改某一套配色，在 `assets/css/dooz.override.css`（无层样式，天然优先）里重写这些变量即可，例如：

```css
.md-body[data-md-theme="dev-linear"] {
    --md-accent: #0ea5e9;
}
```

结构类开关用变量控制：`--md-line`（solid/dashed）、`--md-p-lh`、`--md-p-align`、`--md-bq-radius`、`--md-h1-bw`、`--md-h1-align`、`--md-th-bg`、`--md-th-color`、`--md-strong-bg`、`--md-num-*`。

## 代码块为什么需要 Chroma 类名

主题文章的代码块通过 `render-codeblock.html` 额外传入 `noClasses=false`，让 Chroma 输出 `.chroma` 类，从而在 CSS 里按「微信代码主题」的五个色值着色；同时传 `lineNos=false` 隐藏行号。非主题文章仍走原来的内联样式深色代码块，互不影响。

## 提示框（callout）类型

`NOTE` / `TIP` / `IMPORTANT` / `WARNING` / `CAUTION` 五类沿用主题内置配色；主题文章另补 `SPEAKER`（活动嘉宾）配色。写法与 Hugo 原生一致：

```markdown
> [!SPEAKER] 议题标题
> - 嘉宾：某某
> 正文段落
```

## 示例文章

`exampleSite/content/post/` 下有四篇对应源站示例模板的演示文章，可直接对照查看各主题的真实排版：

| 文章 | 主题 |
| :--- | :--- |
| `wechat-markdown-basic.md` | `editorial-sspai` |
| `wechat-editorial-workflow.md` | `editorial-latepost` |
| `wechat-tech-backpressure.md` | `dev-linear` |
| `wechat-meetup-notice.md` | `meetup-vibrant` |

另有六篇统一内容的排版样张，覆盖标题层级、行内元素、五类提示框、列表（含嵌套/任务清单/定义列表）、表格、代码块、图片、脚注与分隔线，用来横向对比各套主题：

| 文章 | 主题 |
| :--- | :--- |
| `md-demo-songyan.md` | `essay-songyan` |
| `md-demo-tech-blue.md` | `dev-tech-blue` |
| `md-demo-wechat-green.md` | `dev-wechat-green` |
| `md-demo-aurora.md` | `meetup-aurora` |
| `md-demo-festive-red.md` | `daily-festive-red` |
| `md-demo-plain-github.md` | `plain-github` |

四篇模板文章与六篇样张合起来正好覆盖十套主题。
