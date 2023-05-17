---
title: Toast 全局提示
order: 10
group:
  title: 基本组件
  order: 1
---

# Toast 全局提示

js 调用

#### 全屏 loaidng:

```tsx
import React from 'react';
import { Toast } from 'lucky-web-ui';

export default () => {
  const onclikcs = () => {
    console.log(Toast);
    Toast.open({
      content:
        '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
      time: 2000,
    });
  };
  return (
    <div>
      <div onClick={onclikcs}>click</div>
    </div>
  );
};
```

<API src="./index.tsx"></API>
