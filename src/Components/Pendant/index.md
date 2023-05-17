---
title: Pendant 挂件公共部分
order: 2
group:
  path: /business
  title: 业务组件
  order: 3
---

# Pendant 挂件公共部分

#### 挂件公共部分 Pendant:

```tsx
import React, { useEffect, useState } from 'react';
import { Pendant } from 'elelive-ui';

const boxHeight: number = 129; // 挂件高度
let fansScore: number = 0; // 业务代码用于数据丢弃

window.appPendantMsg = {};
window['appInitTrigger'] = function (res) {
  console.log('--appInitTrigger--');
  try {
    window.appPendantMsg = eval(`(${res})`);
  } catch (err) {
    console.log('appPendantMsg-报错');
    window.appPendantMsg = JSON.parse(res);
  }

  console.log(window.appPendantMsg);
};

let a = true;

const Demo = () => {
  let pendant: any = null;

  const [score, setScore] = useState<number>(0);

  const getData = (info: any) => {
    // 模拟请求接口
    window.setTimeout(() => {
      // 模拟接口返回
      const res = {
        data: {
          boxEndTime: Date.now() + 1000000, // 活动结束时间
          score: 100, // 数值
        },
        msg: '',
        status: 0,
        timestamp: Date.now(),
        traceId: '',
      };
      // 结合业务代码显示隐藏挂件
      if (
        res.timestamp < info.endTime &&
        res.timestamp >= info.startTime &&
        res.data.boxEndTime &&
        res.timestamp < res.data.boxEndTime
      ) {
        pendant.controlPendantShow();
        fansScore = res.data.score || 0; // 记录数值，用于做数据丢弃
        // 更新数据
        setScore(fansScore);
      } else {
        pendant.controlPendantHide();
      }
    }, 1000);
  };

  useEffect(() => {
    if (a) {
      console.log('@333');
      a = false;
      pendant = new Pendant({
        height: boxHeight,
        key: 'demo',
        type: 'img',
        onRefresh: (data: any) => {
          // 返回来的im数据需要根据业务判断显示隐藏
          console.log('刷新', data);
          if (data && data.resource) {
            const { resource } = data;
            if (
              data.currentTime > data.startTime &&
              data.currentTime < data.endTime &&
              resource.boxEndTime &&
              resource.timestamp < resource.boxEndTime
            ) {
              pendant.controlPendantShow();
            } else {
              pendant.controlPendantHide();
            }

            // 返回的数据需要根据业务数据做数据丢弃
            let { score } = resource;
            if (fansScore < score) {
              fansScore = score;
              // 更新数据
              setScore(score);
            }
          }
        },
        onInit: (info) => {
          getData(info);
        },
        onHide: () => {},
      });
    }

    /* # test */
    setTimeout(() => {
      const data_str = `
      {
        "status": 200,
        "data": [{
          "status": 0,
          "pageSource": 2,
          "position": 3,
          "endTime": ${new Date().getTime() + 200000},
          "pendantName": "demo",
          "width": 105,
          "height": 69,
          "tag": 9,
          "startTime": 1637035332220,
          "url": "https:\/\/home.elelive.net\/activity\/2021\/personal_battle\/dist\/anchor.html"
        }],
        "timestamp": 1635160324597,
        "traceId": "jfucirif1c1d7j",
        "msg": ""
      }
      `;
      window.appInitTrigger && window.appInitTrigger(data_str);
    }, 1000);

    // setTimeout(() => {
    //   setInterval(() => {
    //     let now = Date.now();
    //     const data_str = `
    //     {
    //       "id": "fce7cdb0932f413f885106fb85ab5cce",
    //       "groupType": "Pendant",
    //       "subType": "PendantValue",
    //       "eventTime": 1634986810,
    //       "resource": {
    //         "score": ${now - 10000},
    //         "timestamp": ${now},
    //         "boxEndTime": 1637078400000,
    //         "endTime": ${new Date().getTime() + 200000},
    //         "startTime": ${now - 5000},
    //       },
    //       "anchorId": "10503657",
    //       "groupId": ["10503657_LI2369877"],
    //       "androidAppVersion": "4.16.0",
    //       "iosAppVersion": "4.16.0",
    //       "bizKey": "demo",
    //       "startTime": ${now - 5000},
    //       "endTime": ${new Date().getTime() + 200000},
    //       "currentTime": ${now}
    //     }
    //     `;
    //     window.appRefreshTrigger && window.appRefreshTrigger(data_str);
    //   }, 2000);
    // }, 2000);
    /* # test */
  }, []);

  return <div>分数{score}</div>;
};

export default Demo;
```

<API src="./index.tsx"></API>
