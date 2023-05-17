---
title: Img 图片
order: 1
group:
  title: 基本组件
  order: 1
---

# Img 图片

兜底图，国际化图片

Demo:

```tsx
import React, { useEffect, useState } from 'react';
import { Img } from 'lucky-web-ui';

export default () => {
  const [url, setUrl] = useState(null);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setUrl('http://www.elelive.tv/img/Elelive_logo.png');
  //   }, 1000);
  // }, []);

  return (
    <div>
      <h1 style={{ fontSize: '0.4rem' }}>基本</h1>
      <Img
        src={require('../../assets/demos/images/demo.jpg')}
        style={{ width: '5rem', height: '5rem' }}
        isSkeleton={true}
      />
      <h1 style={{ fontSize: '0.4rem' }}>兜底图</h1>
      <Img
        src={'./不存在图片.png'}
        style={{ width: '5rem', height: '5rem', backgroundColor: '#38216f' }}
      />
      ddd
      <Img
        src={url}
        style={{ width: '5rem', height: '5rem', backgroundColor: '#38216f' }}
      />
      <h1 style={{ fontSize: '0.4rem' }}>国际化图片</h1>
      <Img
        src={{
          'zh-CN': require('../../assets/demos/images/into.png'),
          'zh-TW': require('../../assets/demos/images/into.png'),
          en: require('../../assets/demos/images/into-en.png'),
          id: require('../../assets/demos/images/into-id.png'),
          vi: require('../../assets/demos/images/into-vi.png'),
        }}
        language="en"
        className="menu-main-title"
      />
      <h1 style={{ fontSize: '0.4rem' }}>头像x1 x2 </h1>
      <Img
        src={
          'https://showme-livecdn.elelive.net/avatar/11617384?1=1&t=1644497836548'
        }
        xOssProcess="1x"
      />
      <h1 style={{ fontSize: '0.4rem' }}>webp格式 </h1>
      <Img
        src={require('../../assets/demos/images/demo.jpg')}
        webp={require('../../assets/demos/images/demo.webp')}
      />
    </div>
  );
};
```

<API src="./index.tsx"></API>
