---
title: Img2 图片
order: 2
group:
  title: 基本组件
  order: 1
---

# Img2 图片

兜底图，国际化图片

Demo:

```tsx
import React, { useEffect, useState } from 'react';
import Canvas from '../../uilts/canvas';
import { View, Text } from 'lucky-web';
import { Img } from 'lucky-web-ui';

export default () => {
  const [url, setUrl] = useState(null);

  return (
    <Canvas>
      <Img
        src={
          'https://showme-livecdn.elelive.net/avatar/10104201?1=1&t=1667002858358'
        }
      />
    </Canvas>
  );
};
```

<API src="./index.tsx"></API>
