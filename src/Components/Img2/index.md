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
import { Img2 } from 'lucky-web-ui';

export default () => {
  const [url, setUrl] = useState(null);

  return (
    <div>
      <h1 style={{ fontSize: '0.4rem' }}>基本</h1>
      <Img2
        src={require('../../assets/demos/images/demo.jpg')}
        // src={'../../assets/demos/images/demo.jpg'}
        style={{ width: '5rem', height: '5rem' }}
        // picture={false}
      />
      <Img2
        src={
          'https://showme-livecdn.elelive.net/avatar/10104201?1=1&t=1667002858358'
        }
        style={{ width: '5rem', height: '5rem' }}
        xOssProcess={'1x'}
      />
      <Img2
        src={'https://showme-livecdn.elelive.net/avatar/10104201'}
        style={{ width: '5rem', height: '5rem' }}
        xOssProcess={'1x'}
      />
    </div>
  );
};
```

<API src="./index.tsx"></API>
