---
title: "Chart support"
date: 2019-11-18T12:00:06+09:00
description: "Simple yet flexible JavaScript charting for designers & developers"
draft: false
enableToc: false
enableTocContent: false
tags: 
- chart
- diagram
series:
-
categories:
- hugo
libraries:
- chart
image: img/res/coder.jpg
archives: 
- 2019
---

```chart
{
    "type": "bar",
    "data": 
       {
        "labels": ["One", "Two", "Three", "Four", "Five", "Six"],
        "datasets": [{
            "label": "# of Votes",
            "data": [12, 19, 3, 5, 3, 8]
        }]
    }
}
```

```chart
    {
    "type": "line",
        "data": {
            "labels": ["One", "Two", "Three", "Four", "Five", "Six"],
            "datasets": [
            {
                "label": "# of Votes",
                "data": [12, 19, 3, 5, 2, 3],
                "backgroundColor":"transparent",
                "borderColor":"orange"
            },
            {
                "label": "Some other set",
                "data": [15, 8, 13, 5, 5, 9],
                "backgroundColor":"transparent",
                "borderColor":"#44ccff"
            }
            ]
        }
    }
```
