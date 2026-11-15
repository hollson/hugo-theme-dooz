# 主题功能与配置

本文记录 Dooz 当前已经实现、且在示例站中可验证的功能。它是主题的“使用说明书”，也是后续继续迭代时的行为基线。

## 1. 站内搜索

搜索索引来自首页 JSON 输出，因此站点配置必须包含：

```toml
[outputs]
  home = ["HTML", "RSS", "JSON"]
```

行为约定：

- 输入少于 2 个字符时，只提示继续输入，不执行搜索
- 标题完全匹配：最高优先级
- 标题以关键词开头：次高优先级
- 标题包含关键词：再次之
- 正文命中：基础优先级
- 同分时短标题优先
- 所有命中都会展示，不截断结果；结果面板固定高度，超出后滚动
- 结果摘要最多两行

搜索面板宽约 `390px`，最大高度 `min(540px, 76vh)`。层级上 Hero 为 `10`、搜索面板为 `20`、导航栏为 `30`，避免下拉结果被 Hero 遮住。

## 2. 代码块

代码块由 `layouts/_markup/render-codeblock.html` 渲染，结构大致为：

```text
.code-block
├── .code-head    语言名、状态点、复制/展开按钮
└── .code-body    代码正文
```

- 语言名从代码围栏的语言标识读取
- 代码超过 20 行时默认折叠，可展开/收起
- 复制按钮会给出“已复制”反馈
- 深色代码区使用 `#282a36`，工具栏为深色渐变，状态点为铜色 `#b87333`

这些行为由 `static/js/copy-code.js` 驱动，不依赖 jQuery。

## 3. 文章目录与侧栏

详情页模板会给 `<body>` 加上 `is-article`，因此：

- 详情页左侧目录在页面滚动时固定在顶部
- 侧栏内容完整展开，不折叠隐藏；内容超出时可单独滚动
- 列表页侧栏保持普通文档流，不固定

对应样式在 `static/css/theme.css` 的 `body.is-article .content-columns > .sidebar-column` 规则中。

## 4. Logo

Logo 文本和字体由站点参数控制：

```toml
[params]
  logoText = "Dooz"
  logoFontFamily = '"Fraunces", "Bodoni 72", Didot, Georgia, serif'
  logoFontWeight = 700
  logoFontUrl = ""
```

- `logoText` 同时用于导航、页脚和默认 `aria-label`
- `logoFontFamily`、`logoFontWeight` 通过 CSS 变量注入
- `logoFontUrl` 可选；留空时不加载远程字体
- 不配置 `logoText` 时回退到站点标题

## 5. H2 图标

在 `markup.goldmark.parser.attribute = true` 的前提下，可以给 H2 加图标：

```markdown
## 概述 {data-icon="book"}
## 准备工作 {data-icon="tools"}
```

内置图标：

| 值 | 用途 |
| --- | --- |
| `book` | 概念、概述、背景 |
| `tools` | 准备、环境、工具 |
| `file` | 文件、格式、素材 |
| `code` | 代码、脚本、实现 |
| `play` | 运行、使用、演示 |
| `link` | 参考、链接、延伸阅读 |

## 6. 社交与二维码

作者卡片和页脚都按配置渲染，不配置就不显示：

```toml
[params]
  github = "https://github.com/example"
  csdn = "https://blog.csdn.net/example"
  cnblog = "https://www.cnblogs.com/example/"
  email = "hello@example.com"
  # wechat = "img/wechat.png"
```

微信二维码是可选能力：只有配置了 `wechat` 图片地址，才会出现微信入口和二维码弹窗。公开示例站不放置真实二维码。

## 7. 页脚

页脚包含品牌区、社交入口、RSS、邮箱、资源导航和统计信息。资源导航可以用 `footerGroups` 覆盖：

```toml
[[params.footerGroups]]
  title = "技术社区"
  [[params.footerGroups.items]]
    name = "GitHub"
    url = "https://github.com"
```

不配置时使用主题内置的通用技术资源列表。

## 8. 本地预览

如果站点 `baseURL` 是线上域名，本地预览建议显式指定本地地址：

```bash
hugo server -D \
  --bind 127.0.0.1 \
  --baseURL http://localhost:1313/ \
  --appendPort=false
```

否则 Hugo 可能继承线上 `baseURL` 和默认端口追加规则，导致本地访问被判定为 404。

## 9. 已移除的能力

打赏/赞赏相关模板、配置、脚本、样式和二维码素材已从主题中移除，不再提供 `Reward` 参数。主题只保留内容展示与阅读体验相关的功能。
