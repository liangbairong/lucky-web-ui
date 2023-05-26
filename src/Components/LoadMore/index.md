---
title: LoadMore 加载更多
order: 5
group:
  title: lucky-web-ui
  order: 1
---

# LoadMore 加载更多

#### 全屏 loaidng:

```tsx
import React, { useEffect, useState, useRef } from 'react';
import { LoadMore } from 'lucky-web-ui';

export default () => {
  const [list, setList] = useState([1, 2, 3, 4, 5]);
  const childRef = useRef();

  function load() {
    //模拟接口请求
    new Promise((resolve) => {
      setTimeout(() => {
        resolve([10, 11, 12, 13, 14, 15]);
      }, 2000);
    }).then((data) => {
      const temp = list.concat(data);
      setList(temp);
      // 关闭loading
      childRef.current.loadingControl(false);
    });
  }

  return (
    <div>
      <h1 style={{ fontSize: '0.4rem' }}>基本</h1>
      <LoadMore height={6} onLoadMore={load} cRef={childRef}>
        <ul>
          {list.map((item, i) => {
            return <li key={i}>列表{item}</li>;
          })}
        </ul>
      </LoadMore>

      {/*自定义loading*/}
      <h1 style={{ fontSize: '0.4rem' }}>自定义loading</h1>
      <LoadMore
        height={6}
        onLoadMore={load}
        cRef={childRef}
        customLoading={<div>自定义loading</div>}
      >
        <ul>
          {list.map((item, i) => {
            return <li key={i}>列表{item}</li>;
          })}
        </ul>
      </LoadMore>
    </div>
  );
};
```

<API src="./index.tsx"></API>
