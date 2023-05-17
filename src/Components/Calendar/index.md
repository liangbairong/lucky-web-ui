---
title: Calendar 日历
order: 66
group:
  title: 基本组件
  order: 1
---

# Calendar 日历

```tsx
import React, { useState, useCallback } from 'react';
import { Calendar } from 'elelive-ui';

export default () => {
  const [isVisible, setIsVisible] = useState<Boolean>(false);

  const onClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <div>
      <div
        onClick={() => {
          setIsVisible(true);
        }}
      >
        click open
      </div>
      <Calendar
        open={isVisible}
        onClose={onClose}
        minDate="2022/03/01"
        maxDate="2022/05/28"
        locale="zh"
        onSelect={(v) => console.log(v)}
      />
    </div>
  );
};
```

<API src="./index.tsx"></API>
