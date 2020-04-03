---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
---

+++
title= "{{with slicestr .Name (len (index (split .Name "-") 0))}}{{replace . "-" " "|strings.TrimLeft " "|title}}{{end}}"
url= "/post/{{now.Unix}}/"
#aliases = ["/posts/{{md5 now}}/"]
keywords= "关键字1,关键字2"
description= "用于SEO的内容说明"
image= "/img/res/blog.jpg"
date= {{ slicestr .Date 0 10 }}
categories= ["{{index (split .Name "-") 0|title}}"]
tags= ["tag1", "tag2"]
archives= "{{ now.Format "2006" }}"
author= "{{.Site.Params.Author}}"
height= {{now.Unix}}
draft= false
+++


