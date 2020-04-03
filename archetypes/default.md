+++
title= "{{with slicestr .Name 10}}{{replace . "-" " "|strings.TrimLeft " "|title}}{{end}}"
subtitle= "这里是子标题"
description= "这里是内容该要信息"
date= {{ slicestr .Date 0 10 }}
author= "hollson"
image= "/img/bg-blog.jpg"
tags= ["tag1", "tag2"]
categories= ["mycategory"]
archives= {{ slicestr .Date 0 4}}
+++
