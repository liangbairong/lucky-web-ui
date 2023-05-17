---
title: Dropdown 下拉框
order: 12
group:
  title: 基本组件
  order: 1
---

# Dropdown 下拉框

#### 下拉选择:

```tsx
import React, { useState } from 'react';
import { Dropdown } from 'elelive-ui';

export default () => {
  const [list] = useState([
    { label: '选项1', value: '1' },
    { label: '选项2', value: '2' },
    { label: '选项3', value: '3' },
  ]);
  const onTrigger = (status) => {
    console.log('菜单状态', status);
  };
  const onChange = (item) => {
    console.log('点击事件状态', item);
  };
  return (
    <div>
      <Dropdown
        list={list}
        disabled={false}
        onTrigger={onTrigger}
        onChange={onChange}
      />
    </div>
  );
};
```

<API src="./index.tsx"></API>
