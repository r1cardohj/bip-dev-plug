# bip-dev-plug

提供给用友BIP高级版二次开发人员的Chrome插件，经测试可以有效延长程序员寿命❤

## ScreenShot

https://github.com/user-attachments/assets/2f6c26c2-098e-47e7-9480-ead4d7fd0d15

## Features

* ✨一键修复本地开发时经常错误的前端路径，自动去匹配NCHOME中的静态文件
* 如果没跑路还会有其他feature

## About

最近公司在进行ERP系统升级，准备切到用友的BIP高级版，开发体验真是一言难尽，在本地开发前端的时候甚至需要手动去改dom节点的src属性，简直反人类！

所以这个repo解决的第一个问题是用一次单击可以切换dom节点中找不到的静态页面，直接到NCHOME中去寻找。这可以在每次打开页面时省去你一次F12，然后鼠标左键单击，然后选中对应的dom节点然后敲下`/nccloud/resource`这一段文字。


后续可能会加入数据字典跳转功能，但是谁说的准呢？说不定就跑路了。如果有人希望一起做这个repo，可以开issue咱们讨论一波。

