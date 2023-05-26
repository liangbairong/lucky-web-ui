---
title: Loading
order: 4
group:
  title: lucky-web-ui
  order: 1
---

# Loading

#### demo:

```tsx
import React, { useState } from 'react';
import { Loading } from 'lucky-web-ui';

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {/*页面loading*/}
      <h1 style={{ fontSize: '0.4rem' }}>页面loading</h1>
      <Loading open={true} />

      {/*全屏loading*/}
      <h1
        style={{ fontSize: '0.4rem' }}
        onClick={() => {
          setOpen(true);
        }}
      >
        点击全屏loading
      </h1>
      <Loading open={open} fullScreen />
    </div>
  );
};
```

<API src="./index.tsx"></API>
