---
title: Countdown 倒计时
order: 3
group:
title: 基本组件
order: 1
---

# Countdown 倒计时

Demo:

```tsx
import React, { useEffect, useState } from 'react';
import { CountDown } from 'elelive-ui';
let b = new Date('2023/03/10 19:09:00').getTime();
let c = Date.now() + 60000;
export default () => {
  const [time, setTime] = useState(0);
  const [time1, setTime1] = useState(0);

  const [ss, setSs] = useState(1);

  useEffect(() => {
    setTime(b);
    setTime1(Date.now() + 10000);

    // setTimeout(() => {
    //   setTime(Date.now() + 1000000);
    // }, 3000);
  }, []);

  return (
    <div>
      <h5>普通倒计时</h5>
      {/*    eventTime={Date.now()}*/}
      <CountDown
        endTime={time}
        onHandCountDownEvent={() => console.log('倒计时结束')}
      />

      <h5>秒倒计时</h5>
      <CountDown
        secondsParam={10000}
        fixedTime={3000}
        onFixedTimeCountDownEvent={() => {
          console.log('我触发了');
        }}
        timeFormat={'ss'}
        onHandCountDownEvent={() => console.log('倒计时结束2')}
      />

      <h5>小时倒计时</h5>
      <CountDown
        endTime={time}
        timeFormat={'hh'}
        onHandCountDownEvent={() => console.log('倒计时结束3')}
      />

      <h5>固定时间倒计时</h5>
      <CountDown
        endTime={time1}
        timeFormat={'mm:ss'}
        fixedTime={30000}
        onFixedTimeCountDownEvent={() => console.log('固定时间倒计时触发')}
        onHandCountDownEvent={() => {
          console.log('倒计时结束4');
          setTimeout(() => {
            setTime1(Date.now() + 12000);
          }, 3000);
        }}
      />

      <h5>dd:hh:mm</h5>
      <CountDown
        endTime={time}
        timeFormat={'dd:hh:mm'}
        onHandCountDownEvent={() => console.log('倒计时结束5')}
      />

      <h5>dd:hh:mm:ss</h5>
      <CountDown
        endTime={time}
        timeFormat={'dd:hh:mm:ss'}
        onHandCountDownEvent={() => console.log('倒计时结束5')}
      />
    </div>
  );
};
```

<API src="./index.tsx"></API>
