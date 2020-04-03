
> [**中文文档**](./README-ZH.md)  

## Sample Site
http://hollson.mafool.com

## Dooz Theme for Hugo

Dooz is a simple and elegant hugo theme specially designed for programmers or columnists.

![screenshot](/tmp/screenshot.jpg)


## Installation
When you finish installing the [Hugo](https://gohugo.io/getting-started/installing/),You can create your own blog site：

```shell
$ hugo new site myblog 
$ cd myblog
$ git clone git@github.com:hollson/hugo-theme-dooz.git themes/dooz

# If already in a git project，you can execute the following command
$ git submodule add git@github.com:hollson/hugo-theme-dooz.git themes/dooz
```

## Quick Start
You can use the example given for a quick experience：
```shell
$ cp -rp ./themes/dooz/exampleSite/* ./
$ hugo server -w
```
Enter [`http://localhost:1313`](http://localhost:1313) in the browser's address bar,then see an example of the picture above.

For more information check out the official [Hugo documentation](http://gohugo.io/overview/usage/).

## Create Posts
```shell
hugo new post/mycategory-my-blog-title.md
```
You can customize your template in the “archetypes” directory ,As follows：
```toml
+++
title= "{{with slicestr .Name (len (index (split .Name "-") 0))}}{{replace . "-" " "|strings.TrimLeft " "|title}}{{end}}"
url= "/post/{{now.Unix}}/"
#aliases = ["/posts/{{md5 now}}/"]
keywords= "keyword1,keyword2"  #SEO keywords
description= "Content description for SEO"
image= "/img/res/blog.jpg"
date= {{ slicestr .Date 0 10 }}
categories= ["{{index (split .Name "-") 0|title}}"]
tags= ["tag1", "tag2"]
archives= "{{ now.Format "2006" }}"
author= "{{.Site.Params.Author}}"
height= {{now.Unix}}
draft= false
+++
```

## Configuration
```toml

baseURL = "http://www.mafool.com"
title = "码夫庄园"
theme = "hugo-theme-dooz"
languageCode = "en"
defaultContentLanguage = "en"
hasCJKLanguage = true
enableEmoji= true
copyright="版权所有"
googleAnalytics = "G-DKXXXXXX2J"

canonifyurls = true
paginate = 10
metaDataFormat = "toml"

[languages]
  [languages.zh]
    # baseURL = "http://www.mafool.com"
    languagedirection = "zh"
    title = "码夫庄园"
    languageName = "Chinese"
    weight = 1
  [languages.en]
    # baseURL = "https://hollson.github.io"
    # contentDir = "content/english"
    title = "Mafool"
    languageName = "English"
    copyright="All Rights Reserved"
    weight = 1
    [languages.en.params]
      #author= "shongsheng" #replace the dedault param
      homeTitle="Programmer's Exclusive Blog" 
      slogan="A Hugo theme for programmers."
      title_404="Sorry, page was not found."

[outputs]
home = ["HTML", "RSS", "JSON"]

[params]
  #Author
  author = "史布斯"
  city = "Beijing"
  avatar = "img/my/avatar.png"
  aphorism="生活，是一种态度，请善待她"
  github="https://github.com/hollson"
  csdn="https://blog.csdn.net/gusand"
  cnblog="https://www.cnblogs.com/hollson/"

  #打赏功能 
  reward= true
  rewardTitle="真诚赞赏，手留余香"
  rewardPrompt="嗯，我的梦想是被读者的稿费包养~"


  #公告信息(支持markdown语法)
  notice="**[Dooz theme](https://github.com/hollson/hugo-theme-dooz)** updated, hurry up and experience it! `2020.03.22`"
 
  #站点设置
  timeOfMonth="2006年1月"
  timeOfDay="2006年1月2日"
  hero = "img/res/hero.jpg"
  slogan = "提升码农亩产，掰直码农方向，授人以渔，功德无量，利在千秋 。"
  image_404 = "img/res/404.jpg"
  title_404 = "你来到了没有知识的荒原 :("
  openShare= true
  
  #百度统计
  analyze_baidu="f185359ec6b8XXXXXXXX597f6d9"  #Mafool

  #SEO Info(meta中的信息)
  homeTitle = "码农的专属博客"
  keywords = "码农,hugo,theme,blog,developer,programmer,coder,geek,程序员,主题,个人博客,github博客,golang,微服务"
  description = "码夫庄园是一个使用hugo搭建的程序员专属博客站点，以优美的博客风格，丰富的展现方式向广大程序员们传播最新的golang、docker、k8s、微服务、大数据、人工智能、等技术。"

[permalinks]
    post = "/:year/:month/:title"

# Classification basis：e.g.：tags、categories、archives...
[taxonomies]
    tag = "tags"
    category = "categories"
    archive = "archives"
    # series = "series"

# nav menu
[[menu.friendly]]
    name="Mafool"
    url="http://www.mafool.com"
    weight="1"
[[menu.friendly]]
    name="Mafool"
    url="http://www.mafool.com"
    weight="2"
[[menu.friendly]]
    name="Mafool"
    url="http://www.mafool.com"
    weight="3"    
[[menu.friendly]]
    name="Mafool"
    url="http://www.mafool.com"
    weight="4"
[[menu.friendly]]
    name="Mafool"
    url="http://www.mafool.com"
    weight="5"

[markup]
  defaultMarkdownHandler = "goldmark"
  [markup.goldmark]
    [markup.goldmark.extensions]
      definitionList = true
      footnote = true
      linkify = true
      strikethrough = true
      table = true
      taskList = true
      typographer = true
    [markup.goldmark.parser]
      attribute = true
      autoHeadingID = true
      autoHeadingIDType = "github"
    [markup.goldmark.renderer]
      hardWraps = true
      unsafe = false
      xHTML = false
  [markup.highlight]      #Hugo使用Chroma作为其代码突出显示器
    codeFences = true     #代码栅栏
    guessSyntax = true    #猜测
    lineNoStart = 1       #行号初始值
    lineNos = true        #显示行号
    lineNumbersInTable = true
    style = "monokai"     #代码风格
    tabWidth = 8
  [markup.tableOfContents] #文档目录，H1作为SEO的关键字
    startLevel = 2         #开始级别：H2
    endLevel = 3           #结束级别：H3
    ordered = false        #是否排序
```
**Some important references：**
>  https://gohugo.io/getting-started/configuration-markup#highlight  # Markdown Config
>  https://gohugo.io/content-management/syntax-highlighting/   # High lighting
>  https://xyproto.github.io/splash/docs/longer/all.html  # Code Style



## Contributing

Did you found a bug or got an idea for a new feature? Feel free to use the [issue tracker](https://github.com/hollson/hugo-theme-dooz/issues) to let us know. Or make directly a [pull request](https://github.com/hollson/hugo-theme-dooz/pulls).