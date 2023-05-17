---
title: SwipeMenu 右滑菜单
order: 44
group:
  title: 基本组件
  order: 1
---

# SwipeMenu 右滑菜单

#### 右滑菜单:

```tsx
import React from 'react';
import { SwipeMenu } from 'elelive-ui';

export default () => (
  <div>
    <h2>禁止</h2>
    <SwipeMenu
      disabled={true}
      menu={[
        {
          name: '删除',
          onClick: (data) => {
            alert('点击删除' + JSON.stringify(data));
          },
        },
        {
          name: '确认',
          onClick: (data) => {
            alert('点击确认' + JSON.stringify(data));
          },
        },
      ]}
    >
      <div style={{ height: '100px', background: '#eee' }}>ssss</div>
    </SwipeMenu>
    <SwipeMenu
      menu={[
        {
          name: '删除',
          onClick: (data) => {
            alert('点击删除' + JSON.stringify(data));
          },
        },
        {
          name: '确认',
          onClick: (data) => {
            alert('点击确认' + JSON.stringify(data));
          },
        },
      ]}
    >
      <div style={{ height: '100px', background: '#eee' }}>ssss</div>
    </SwipeMenu>
  </div>
);
```

<API src="./index.tsx"></API>
