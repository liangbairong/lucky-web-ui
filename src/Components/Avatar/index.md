---
title: Avatar 头像
order: 8
group:
  title: 基本组件
  order: 1
---

# Avatar 主播头像

点击头像跳转直播间或个人中心

#### 全屏 loaidng:

```tsx
import React from 'react';
import { Avatar } from 'lucky-web-ui';

export default () => (
  <Avatar
    name={'hello'}
    xOssProcess={'1x'}
    imgUrl="https://showme-livecdn.elelive.net/avatar/12119529"
  />
);
```

<API src="./index.tsx"></API>
