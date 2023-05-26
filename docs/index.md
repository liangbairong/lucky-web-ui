---
title: 介绍
order: 1
---

# lucky-web

lucky-web 是个使用 Flexbox 的布局引擎和 React，来绘制 canvas 的渲染框架，支持 react 17 以上的 hook

# lucky-web-ui

lucky-web-ui 是基于 lucky-web 封装的一些列常用组件库

### 使用方法

```bash
$ npm i lucky-web lucky-web-ui -S
```

### 按需加载

```tsx | pure
import Img from 'lucky-web-ui/es/Components/Img';

<Img />;
```

### 全部引入

```tsx | pure
import { Img } from 'lucky-web-ui';
<Img />;
```
