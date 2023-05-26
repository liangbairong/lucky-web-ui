---
title: Dialog 弹窗
order: 3
group:
  title: lucky-web-ui
  order: 1
---

# Dialog 弹窗

Demo:

```tsx
import React, { useCallback, useState } from 'react';
import { Dialog } from 'lucky-web-ui';

export default () => {
  const [isVisible, setIsVisible] = useState<Boolean>(false);

  const onClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  const onOpen = useCallback(() => {
    setIsVisible(true);
  }, []);

  const onAnimateEnd = () => {
    console.log('关闭动画结束了');
  };

  return (
    <>
      <div style={{ background: 'red', height: '1000px' }}>内容</div>
      <div style={{ background: 'blue', height: '1000px' }}>内容2</div>
      <Dialog
        open={isVisible}
        onClose={onClose}
        onOpen={onOpen}
        onAnimateEnd={onAnimateEnd}
        showCloseButton={true}
        showMask={true}
        // isBescroll
      >
        <div
          style={{
            width: '90vw',
            height: '30vh',
            background: 'blue',
            overflow: 'auto',
          }}
        >
          This is a Dialog Pages！
          <div style={{ height: '100px', background: 'cadetblue' }}>ssss</div>
          <div style={{ height: '100px', background: 'wheat' }}>ssss</div>
          <div style={{ height: '100px', background: 'center' }}>ssss</div>
          <div style={{ height: '100px', background: 'violet' }}>ssss</div>
          <div style={{ height: '100px', background: 'violet' }}>ssss</div>
          <div style={{ height: '100px', background: 'violet' }}>ssss</div>
        </div>
      </Dialog>
      <button
        onClick={() => setIsVisible(true)}
        style={{ width: '200px', height: '100px' }}
      >
        click me!
      </button>
      <div style={{ background: 'gold', height: '1000px' }}>内容3</div>
    </>
  );
};
```

<API src="./index.tsx"></API>
