---
title: Skeleton 骨架屏
order: 11
group:
  title: 基本组件
  order: 1
---

# Skeleton 骨架屏

#### demo:

```tsx
import React from 'react';
import { Skeleton } from 'lucky-web-ui';

const Box = ({ children }) => (
  <a
    style={{
      border: '1px solid #ccc',
      display: 'block',
      fontSize: 16,
      lineHeight: 2,
      padding: 20,
      marginBottom: 10,
      width: 100,
    }}
  >
    {children}
  </a>
);

export default () => (
  <div>
    <h1 style={{ fontSize: '0.4rem' }}>基本</h1>
    <Skeleton />

    <h1 style={{ fontSize: '0.4rem' }}>多行</h1>
    <Skeleton count={3} />

    <h1 style={{ fontSize: '0.4rem' }}>持续时间</h1>
    <Skeleton duration={4} />

    <h1 style={{ fontSize: '0.4rem' }}>宽高</h1>
    <Skeleton width={100} height={100} />

    <h1 style={{ fontSize: '0.4rem' }}>包裹</h1>
    <Skeleton wrapper={Box} />

    <h1 style={{ fontSize: '0.4rem' }}>颜色</h1>
    <Skeleton color="#000" highlightColor="red" />
  </div>
);
```

<API src="./index.tsx"></API>
