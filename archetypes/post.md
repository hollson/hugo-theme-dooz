+++
title= "{{with slicestr .Name (len (index (split .Name "-") 0))}}{{replace . "-" " "|strings.TrimLeft " "|title}}{{end}}"
#subtitle:    "<this is my subtitle>"
url= "/posts/{{now.Unix}}/"
#aliases = ["/posts/{{md5 now}}/"]
description= "<this is post's description>"
image= "/img/res/blog.jpg"
date= {{ slicestr .Date 0 10 }}
categories= ["{{index (split .Name "-") 0|title}}"]
tags= ["<tag1>", "<tag2>"]
archives= "{{ now.Format "2006.1" }}"
author= "{{.Site.Params.Author}}"
height= {{now.Unix}}
draft= false
+++
