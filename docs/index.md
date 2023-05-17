---
title: 介绍
order: 1
---

# elelive-ui

本组件库依赖 react 版本 17.0.2 以上

安装依赖

```bash
$ npm i
```

启动文档

```bash
$ npm start
```

打包文档

```bash
$ npm run docs:build
```

打包组件库

```bash
$ npm run build
```

打包使用 babel 模式：

babel 模式下一些文件不会被编译到 es 和 lib 下，包含：

`__test__` 目录  
`fixtures` 目录  
`demos` 目录  
`mdx` 文件  
`md` 文件  
测试文件，比如 test.js、spec.js、e2e.js，后缀还支持 jsx、ts 和 tsx

### 按需加载

```tsx | pure
import Skeleton from 'elelive-ui/es/Components/Skeleton';
import 'elelive-ui/es/Components/Skeleton/index.css';
<Skeleton />;
```

### 全部引入

```tsx | pure
import { Skeleton } from 'elelive-ui';
import 'elelive-ui/es/index-all.min.css';
<Skeleton />;
```
