> [English Doc](./README.md)

<br/>

## Hugo主题 - Dooz     
**Dooz是一个简单优雅的hugo主题，专门为`程序员`或`专栏作家`设计。**

![screenshot](images/tn.png)

<br/>

## 示例站点
http://www.mafool.com


<br/>

## 安装主题
提前安装好Hugo，具体可参考[官方安装文档](https://gohugo.io/getting-started/installing/)。
在完成Hugo的安装后，接下来我们创建并运行这个示例站点：

```shell
$ hugo new site myblog 
$ cd myblog
$ git clone git@github.com:hollson/hugo-theme-dooz.git themes/dooz

# 也可以在现有的站点下添加git子模块
$ git submodule add git@github.com:hollson/hugo-theme-dooz.git themes/dooz
```

<br/>


## 快速演示

在`hugo-theme-dooz`目录下又一个`exampleSite`文件，将里面的内容拷贝到站点根目录：
```shell
$ cp -rp ./themes/dooz/exampleSite/* ./
$ hugo server -w  # 启动服务
```
这时候，就可以在浏览器打开[`http://localhost:1313`](http://localhost:1313)， 看到上图的演示界面了。

<br/>

## 创建文章
```shell
hugo new post/mycategory-我的博客标题.md
```
创建文章命令非常简单，但是如果想让自动填写`归档`、`分类`、`自定义url`、`自定义SEO`等信息，你可以自行改动`archetypes/post.md`模版文件，如下所示：

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

<br/>

## 配置文件
配置文件位于根目录下的`config.toml`文件中，配置示例如下：
```toml
baseURL = "http://www.mafool.com"
title = "码夫庄园"
theme = "hugo-theme-dooz"         #主题
languageCode = "zh"
defaultContentLanguage = "zh"    # 选择语言环境
hasCJKLanguage = true
enableEmoji= true
copyright="版权所有"
googleAnalytics = "G-DKXXXXXX2J"  #谷歌内置的统计分析模块
canonifyurls = true
paginate = 10       #分页数
metaDataFormat = "toml"

[languages]
  [languages.zh]
    # baseURL = "http://www.mafool.com"
    languagedirection = "zh"
    title = "码夫庄园"
    languageName = "Chinese"
    weight = 1
  [languages.en]            # 纯中文环境可以忽略这段
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
  aphorism="我的箴言我的箴言"
  github="https://github.com/hollson"  #我的博客链接
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
  analyze_baidu="f185359ec6b8XXXXXXXX597f6d9"  # https://tongji.baidu.com/web/welcome/login

  #SEO信息(meta中的信息)
  homeTitle = "码农的专属博客"
  keywords = "码农,hugo,theme,blog,developer,programmer,coder,geek,程序员,主题,个人博客,github博客,golang,微服务"
  description = "码夫庄园是一个使用hugo搭建的程序员专属博客站点，以优美的博客风格，丰富的展现方式向广大程序员们传播最新的golang、docker、k8s、微服务、大数据、人工智能、等技术。"

[permalinks]
    post = "/:year/:month/:title"

# 分类依据，如：tags、categories、archives...
[taxonomies]
    tag = "tags"
    category = "categories"
    archive = "archives"
    # series = "series"

# 导航目录
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

# Markdown样式风格
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
    style = "monokai"     #代码风格，可根据喜好调整
    tabWidth = 8
  [markup.tableOfContents] #文档目录，H1作为SEO的关键字
    startLevel = 2         #开始级别：H2  
    endLevel = 3           #结束级别：H3
    ordered = false        #是否排序
```
**一些重要的配置参考：**
>  https://gohugo.io/getting-started/configuration-markup#highlight  # Markdown配置

>  https://gohugo.io/content-management/syntax-highlighting/   # 代码高亮

>  https://xyproto.github.io/splash/docs/longer/all.html  # 代码风格


<br/>

## 贡献
您是否发现了错误或对新功能有想法？随时使用[问题跟踪工具](https://github.com/hollson/hugo-theme-dooz/issues)让我知道。或直接[提出请求](https://github.com/hollson/hugo-theme-dooz/pulls)。 你也可以添加微信向我咨询一切问题：

![hollson](/static/img/reward/wechat.png)
