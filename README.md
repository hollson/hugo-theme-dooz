
> #### [**Hugo Dooz主题中文文档**](./README-ZH.md)  - 码农的专属博客

<br/>

## Dooz Theme for Hugo

Dooz is a simple and elegant hugo theme specially designed for programmers or columnists.

![screenshot](images/tn.png)


<br/>

## Sample Site
http://www.mafool.com

<br/>


## Installation
When you finish installing the [Hugo](https://gohugo.io/getting-started/installing/),You can create your own blog site：

```shell
$ hugo new site myblog 
$ cd myblog
$ git clone git@github.com:hollson/hugo-theme-dooz.git themes/dooz

# If already in a git project，you can execute the following command
$ git submodule add git@github.com:hollson/hugo-theme-dooz.git themes/dooz
```

<br/>

## Quick Start
You can use the example given for a quick experience：
```shell
$ cp -rp ./themes/dooz/exampleSite/* ./
$ hugo server -w
```
Enter [`http://localhost:1313`](http://localhost:1313) in the browser's address bar,then see an example of the picture above.

For more information check out the official [Hugo documentation](http://gohugo.io/overview/usage/).

<br/>

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

<br/>

## Configuration
```toml
baseURL = "http://www.mafool.com"
title = "Mafool"
theme = "hugo-theme-dooz"
languageCode = "en"
defaultContentLanguage = "en"
hasCJKLanguage = true
enableEmoji= true
copyright="Copyright Reservation"
googleAnalytics = "G-DKXXXXXX2J"

canonifyurls = true
paginate = 10
metaDataFormat = "toml"

[languages]
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
  author = "Sybs"
  city = "Beijing"
  avatar = "img/my/avatar.png"
  aphorism="Here is my motto"
  github="https://github.com/hollson"
  csdn="https://blog.csdn.net/gusand"
  cnblog="https://www.cnblogs.com/hollson/"

  #Rewords
  reward= true
  rewardTitle="hint"
  rewardPrompt="Words of thanks~"


  #Notice
  notice="**[Dooz theme](https://github.com/hollson/hugo-theme-dooz)** updated, hurry up and experience it! `2020.03.22`"
 
  #Default Site Config of 
  timeOfMonth="2006.01"
  timeOfDay="2006-01-02"
  hero = "img/res/hero.jpg"
  slogan = "A Hugo theme for programmers."
  image_404 = "img/res/404.jpg"
  title_404 = "Sorry, page was not found. :("
  openShare= true

  #SEO Info(meta info)
  homeTitle = "Programmer's Exclusive Blog"
  keywords = "keyword1,keyword2,keyword3"
  description = "Here is description for seo"

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
  [markup.highlight]      
    codeFences = true     
    guessSyntax = true   
    lineNoStart = 1      
    lineNos = true        #line number
    lineNumbersInTable = true
    style = "monokai"     #code style
    tabWidth = 8
  [markup.tableOfContents]  
    startLevel = 2         #start from：H2
    endLevel = 3           #end from：H3
    ordered = false        
```
**Some important references：**
>  https://gohugo.io/getting-started/configuration-markup#highlight  # Markdown Config

>  https://gohugo.io/content-management/syntax-highlighting/   # High lighting

>  https://xyproto.github.io/splash/docs/longer/all.html  # Code Style


<br/>

## Contributing

Did you found a bug or got an idea for a new feature? Feel free to use the [issue tracker](https://github.com/hollson/hugo-theme-dooz/issues) to let us know. Or make directly a [pull request](https://github.com/hollson/hugo-theme-dooz/pulls).
