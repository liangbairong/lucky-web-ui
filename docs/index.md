---
title: 介绍
order: 1
---

# lucky-web

lucky-web 是个使用 yoga 的布局引擎和 React，来绘制 canvas 的渲染框架，支持 react 17 以上的 hook

### 使用方法

```bash
$ npm i lucky-web lucky-web -S
```

```tsx | pure
import React from 'react';
import { render, View, ScrollView } from 'lucky-web';

const style = {
  main: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(49, 24, 124, 1)',
  },
};
const App = () => {
  return (
    <ScrollView style={style.main}>
      <Text>HELLO WORLD </Text>
    </ScrollView>
  );
};
const app = render(<App />, document.getElementById('app'), {});
```

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
