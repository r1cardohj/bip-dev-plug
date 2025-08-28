# bip-dev-plug

提供给用友BIP高级版二次开发人员的Chrome插件，经测试可以有效延长程序员寿命❤

## ScreenShot

https://github.com/user-attachments/assets/2f6c26c2-098e-47e7-9480-ead4d7fd0d15

## Features

* ✨一键修复本地开发时经常错误的前端路径，自动去匹配NCHOME中的静态文件
* 如果没跑路还会有其他feature

## 安装方法

### 通过源码安装

1. 克隆本仓库或下载源码到本地：
   ```bash
   git clone https://github.com/r1cardohj/bip-dev-plug.git
   ```
   或点击右上角 "Code" 按钮，选择 "Download ZIP" 下载并解压到本地。

2. 打开 Chrome 浏览器，输入 `chrome://extensions/` 并回车，进入扩展管理页面。

3. 右上角打开「开发者模式」。

4. 点击左上角「加载已解压的扩展程序」（或“Load unpacked”），选择刚才下载或解压的 bip-dev-plug 文件夹。

5. 安装完成后，即可在浏览器工具栏看到插件图标，点击即可使用插件功能。

### 注意事项

- 如遇到无法加载或功能异常，请确保使用最新版 Chrome 浏览器，或尝试重新下载/安装插件。
- 插件仅在本地生效，不会上传或收集任何个人信息。

---

如需进一步帮助或有建议，欢迎提交 Issue 交流！

## About

最近公司在进行ERP系统升级，准备切到用友的BIP高级版，开发体验真是一言难尽，在本地开发前端的时候甚至需要手动去改dom节点的src属性，简直反人类。

所以这个repo解决的第一个问题是用一次单击可以切换dom节点中找不到的静态页面，直接到NCHOME中去寻找。这可以在每次打开页面时省去你一次F12，然后自己去粘贴路径的痛苦。

后续可能会加入数据字典跳转功能，但是谁说的准呢？说不定就跑路了。如果有人希望一起做这个repo，可以开issue咱们讨论一波。

如果你感觉这个项目帮到你了，可以给我个Star,或者可以请我喝一杯9.9的瑞幸咖啡。

![b2df9be5ce02d2f75bbd7f53c2a2319d](https://github.com/user-attachments/assets/34e245f5-d4a7-4719-a8a2-845fd9dcdf76)