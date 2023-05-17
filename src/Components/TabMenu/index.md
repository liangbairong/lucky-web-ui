---
title: TabMenu tab菜单
order: 7
group:
  title: 基本组件
  order: 1
---

# TabMenu tab 菜单

#### Tabs:

```tsx
import React, { useEffect, useState } from 'react';
import { TabMenu } from 'lucky-web-ui';

export default () => {
  const [list, setList] = useState([
    {
      label: 'nav1',
      value: 1,
      path: '/home',
    },
    {
      label: 'nav2',
      value: 2,
      path: '/index',
    },
    {
      label: 'nav3',
      value: 3,
      path: '/user',
    },
    {
      label: 'nav4',
      value: 4,
      path: '/live',
    },
    {
      label: 'nav5',
      value: 5,
      path: '/loot',
    },
    {
      label: 'nav6',
      value: 6,
      path: '/box',
    },
  ]);

  return (
    <div>
      <TabMenu menuList={list} />
      <div style={{ marginTop: '30px' }}></div>
      <TabMenu menuList={list} className={'elelive-tabs-2'} />

      <div style={{ marginTop: '30px' }}></div>
      <TabMenu menuList={list} path="/loot" value={5} />
    </div>
  );
};
```

<API src="./index.tsx"></API>
