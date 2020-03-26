[中文文档](./README-ZH.md)

# Dooz Theme for Hugo

Dooz is a simple and elegant hugo theme specially designed for programmers or columnists.

![screenshot](/static/tmp/screenshot.jpg)

# Features

* Responsive design
* Customizable markdown
* Google search
* ~~Disqus comments~~
* ~~Google Analytics~~
* ~~Announcement promotion~~

Some features are being improved ...

# Installation
When you finish installing the [Hugo](https://gohugo.io/getting-started/installing/),You can create your own blog site：

```shell
$ hugo new site myblog 
$ cd myblog
$ git clone git@github.com:hollson/hugo-theme-dooz.git themes/dooz

# If already in a git project，you can execute the following command
$ git submodule add git@github.com:hollson/hugo-theme-dooz.git themes/dooz
```

# Quick Start
You can use `./themes/dooz/exampleSite` to experience this theme:
```shell
$ cp -rp ./themes/dooz/exampleSite/* ./
$ hugo server -w
```
Enter [`http://localhost:1313`](http://localhost:1313) in the browser's address bar,then see an example of the picture above.

For more information check out the official [Hugo documentation](http://gohugo.io/overview/usage/).


# Configuration

After installing the Universal theme successfully, we recommend you to take a look at the [exampleSite](//github.com/devcows/hugo-universal-theme/tree/master/exampleSite) directory. You will find a working Hugo site configured with the Universal theme that you can use as a starting point for your site.

First, let's take a look at the [config.toml](//github.com/devcows/hugo-universal-theme/tree/master/exampleSite/config.toml). It will be useful to learn how to customize your site. Feel free to play around with the settings.


### Language

Available translations are in the `/i18n` directory. You can configure the language modifying the following key.

```toml
defaultContentLanguage = "en"
```


### Comments

The optional comments system is powered by [Disqus](https://disqus.com). If you want to enable comments, create an account in Disqus and write down your shortname.

```toml
disqusShortname = "devcows"
```

You can disable the comments system by leaving the `disqusShortname` empty.


### Google Analytics

You can optionally enable Google Analytics. Type your tracking code in the ``.

```toml
googleAnalytics = "UA-XXXXX-X"
```

Leave the `googleAnalytics` key empty to disable it.


### Recent posts

The recent posts sections shows the four latest published blog posts, with their featured image and a summary. It defaults to show recent posts from all [main sections](https://gohugo.io/functions/where/#mainsections). This is either the section with the most posts or can be set explicitly in the configuration file (see linked docs).

You can enable it in the configuration file.

```toml
[params.recent_posts]
    enable = true
    title = "From our blog"
    subtitle = "Pellen
```


### Meta tags

The following [HTML metadata](https://www.w3schools.com/tags/tag_meta.asp) can be set for every page. While the default value for some of them can be defined in `config.toml`, all of these properties can also be set through the respective [Hugo front matter variables](https://gohugo.io/content-management/front-matter/#front-matter-variables):

| HTML meta `name`/`property`                              | Hugo front matter variable | Default variable in `config.toml` |
| :------------------------------------------------------- | :------------------------- | :-------------------------------- |
| `article:author`                                         | `facebook_author`          | -                                 |
| `article:publisher`                                      | `facebook_site`            | `facebook_site`                   |
| `author`                                                 | `author`                   | -                                 |
| `description` / `og:description` / `twitter:description` | `description`              | `defaultDescription`              |
| `keywords`                                               | `keywords`                 | `defaultKeywords`                 |
| `og:image` / `twitter:image`                             | `banner`                   | `default_sharing_image`           |
| `title` / `og:title` / `twitter:title`                   | `title`                    | -                                 |
| `twitter:creator`                                        | `twitter_author`           | -                                 |
| `twitter:site`                                           | `twitter_site`             | `twitter_site`                    |

Besides, certain [Open Graph](http://ogp.me/) metadata is automatically set:

- `article:published_time`, `article:modified_time`, `og:updated_time` and `article:expiration_time` are set based on [Hugo's (predefined) front matter variables `date`, `publishDate`, `lastmod` and `expiryDate`](https://gohugo.io/content-management/front-matter/#predefined).
- `article:section` and `article:tag` are set based on [Hugo's `categories` and `tags` taxonomies](https://gohugo.io/content-management/taxonomies/#default-taxonomies). Since there can only be one `article:section`, only the first element of the `categories` array is used as `article:section`.

You can set default values for all pages in the `config.toml` file as below:

```toml
[params]
    defaultKeywords = ["devcows", "hugo", "go"]
    defaultDescription = "Site template made by Devcows using Hugo"
    default_sharing_image = "img/sharing-default.png"
    facebook_site = "https://www.facebook.com/GolangSociety/"
    twitter_site = "GoHugoIO"
```

The resulting HTML will be the following:

```html
<meta name="keywords" content="devcows, hugo, go">
<meta name="description" content="Site template made by Devcows using Hugo">
<meta property="og:description" content="Site template made by Devcows using Hugo">
<meta property="og:image" content="img/sharing-default.png">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="800">
<meta property="og:image:height" content="420">
<meta property="article:publisher" content="https://www.facebook.com/GolangSociety/">
<meta name="twitter:description" content="Site template made by Devcows using Hugo">
<meta name="twitter:site" content="@GoHugoIO">
```

You can also override the default values from the `config.toml` by setting the respective keys in the individual pages front matter. As an example, here's the front matter from the [`faq.md` file](exampleSite/content/faq.md) in the [`exampleSite` directory](exampleSite):

```yaml
+++
title = "FAQ"
description = "Frequently asked questions"
keywords = ["FAQ","How do I","questions","what if"]
+++
```

Which results in the following HTML:

```html
<title>FAQ</title>
<meta name="keywords" content="FAQ,How do I,questions,what if">
<meta name="description" content="Frequently asked questions">
<meta property="og:description" content="Frequently asked questions">
<meta name="twitter:description" content="Frequently asked questions">
```


### Contributing

Did you found a bug or got an idea for a new feature? Feel free to use the [issue tracker](https://github.com/hollson/hugo-theme-dooz/issues) to let us know. Or make directly a [pull request](https://github.com/hollson/hugo-theme-dooz/pulls).
