+++
title= "{{with slicestr .Name 10}}{{replace . "-" " "|strings.TrimLeft " "|title}}{{end}}"
#subtitle:    "这里是子标题"
description= "这里是内容该要信息"
date= {{ slicestr .Date 0 10 }}
author= "布史"
image= "/img/bg-blog.jpg"
tags= ["标签1", "标签2"]
categories= ["分类"]
archives= {{ slicestr .Date 0 4}}
+++
