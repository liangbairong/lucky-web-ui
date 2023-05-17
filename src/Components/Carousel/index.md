---
title: Carousel 轮播图
order: 22
group:
  title: 基本组件
  order: 1
---

# Carousel 轮播图

#### 轮播图:

```tsx
import React, { useRef } from 'react';
import { Carousel } from 'lucky-web-ui';

export default () => {
  const CarouselRefAuto = React.createRef(null);
  const CarouselRef = React.createRef(null);
  const changeAutoChildIndex = (idx) => {
    CarouselRef.current.chooseIndex(idx);
  };
  const changeChildIndex = (idx) => {
    CarouselRef.current.chooseIndex(idx);
  };
  return (
    <>
      <div>
        <button onClick={() => changeAutoChildIndex(0)}>切换0</button>
        <button onClick={() => changeAutoChildIndex(1)}>切换1</button>
      </div>
      <Carousel
        defaultIndex={1}
        autoplay={2}
        onChange={(index) => {
          console.warn('当前index==自动轮播', index);
        }}
        onCarouselRef={CarouselRefAuto}
      >
        <div>assa11</div>
        <div>as2222</div>
        <div>as2233</div>
        {/*<div>as2244</div>*/}
      </Carousel>

      <div>
        <button onClick={() => changeChildIndex(0)}>切换0</button>
        <button onClick={() => changeChildIndex(1)}>切换1</button>
      </div>
      <Carousel
        defaultIndex={1}
        onChange={(index) => {
          console.warn('当前index', index);
        }}
        onCarouselRef={CarouselRef}
      >
        <div>assa11</div>
        <div>as2222</div>
        <div>as2233</div>
        <div>as2244</div>
      </Carousel>
    </>
  );
};
```

<API src="./index.tsx"></API>
