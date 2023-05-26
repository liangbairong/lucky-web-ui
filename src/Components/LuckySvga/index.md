---
title: LuckySvga 图片
order: 2
group:
  title: lucky-web-ui
  order: 30
---

# LuckySvga

播放 svga

Demo:

```tsx
import React, { useEffect, useState } from 'react';
import Canvas from '../../uilts/canvas';
import { View, Text, lpx } from 'lucky-web';
import { LuckySvga } from 'lucky-web-ui';
import svgaimg from './draw.svga';
export default () => {
  return (
    <Canvas>
      <LuckySvga
        onInit={(player) => {
          player.start();
        }}
        src={svgaimg}
        style={{
          width: lpx(688),
          height: lpx(1087),
        }}
      />
    </Canvas>
  );
};
```

<API src="./index.tsx"></API>
