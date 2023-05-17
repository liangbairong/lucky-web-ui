---
title: VapPlayer 播放器
order: 8
group:
  title: 基本组件
  order: 1
---

# VapPlayer 播放器

播放 vap 动画

#### 全屏 loaidng:

```tsx
import React from 'react';
import { VapPlayer } from 'lucky-web-ui';
import vapSource from '../../assets/demos/video/200k.mp4';
import config from '../../assets/demos/video/vapc.json';

export default () => {
  const options = {
    src: vapSource,
    config,
    width: 750, // 宽度	375
    height: 900, // 高度	375
    loop: true,
    muted: true,
  };

  return (
    <VapPlayer
      className="vap"
      options={options}
      onPlaying={(event) => {
        // console.log(event);
      }}
      onEnded={(event) => {
        // console.log(event);
      }}
      onFrame={(event) => {
        // console.log(event);
      }}
    />
  );
};
```

<API src="./index.tsx"></API>
