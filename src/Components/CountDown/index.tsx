import React, { EventHandler, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import padStart from 'lodash/padStart';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

type IProps = {
  /**
   * @description  当前时间，使用endTime必传
   * @default
   */
  eventTime?: number;
  /**
   * @description  结束时间，使用endTime必传
   * @default
   */
  endTime?: number;
  /**
   * @description  请求服务器接口地址
   * @default  https://showmetest-2011.elelive.cn
   */
  ROOT_BASE?: string;
  /**
   * @description  时间格式，传递mm:ss则转化为mm:ss格式; [传递DD,只返回天]
   * @default  HH:mm:ss
   */
  timeFormat?: string; // 不传默认转为时分秒HH:mm:ss ,传递mm:ss则转化为mm:ss格式, 传递ss则转化为${s}s格式
  /**
   * @description  时间格式单位，[':']
   * @default  [':',':',':','']
   */
  unit?: Array<string>;

  /**
   * @description  倒计时毫秒数，使用此字段不能使用服务器校验
   * @default
   */
  secondsParam?: number;
  /**
   * @description  倒计时结束回调函数
   * @default
   */
  onHandCountDownEvent?: Function;

  /**
   * @description  固定倒计时结束时间,倒计时达到某个时间(如30s)的时候触发回调(一次)onFixedTimeCountDownEvent
   * @default
   */
  fixedTime?: number;
  /**
   * @description  距离倒计时还有fixedTime才触发的回调函数
   * @default
   */
  onFixedTimeCountDownEvent?: Function;

  /**
   * @description  当格式化为D, H, M 倒计时结束时提供处理的回调函数
   * @default
   */
  onFormatCountDownEvent?: EventHandler<any>;
};

function work() {
  let timer: any = null;
  onmessage = ({ data: { endTime, gapTime, seconds } }) => {
    // console.log(endTime);
    // console.log(gapTime);
    // console.log(seconds);

    function cd() {
      let val: number = 0;
      if (seconds) {
        seconds -= 1000;
        val = seconds;
      } else {
        val = endTime - (Date.now() + gapTime);
      }

      if (val > 0) {
        // @ts-ignore
        postMessage(val);
      } else {
        // @ts-ignore
        postMessage(val);
        clearInterval(timer);
        timer = null;
      }
    }

    if ((gapTime && endTime) || seconds) {
      timer && clearInterval(timer);
      cd();
      timer = setInterval(cd, 1000);
    }
  };
}

const runWorker = (f: Function) => {
  const worker = new Worker(
    URL.createObjectURL(new Blob([`(${f.toString()})()`])),
  );
  return worker;
};

const CountDown = ({
  endTime,
  eventTime,
  ROOT_BASE = 'https://showme.elelive.net',
  secondsParam = 0,
  timeFormat = 'hh:mm:ss',
  unit = [':', ':', ':'],
  onHandCountDownEvent,
  fixedTime = 0,
  onFixedTimeCountDownEvent,
  onFormatCountDownEvent,
}: IProps) => {
  //倒计时毫秒
  const [seconds, setSeconds] = useState<number>(-10);
  //web worker
  const workerRef = useRef<Worker | any>(null);
  //服务器时间和客户端时间的间隔
  const [gapTime, setGapTime] = useState<number>(0);

  const [format, setFormat] = useState<string | any>(timeFormat);
  useEffect(() => {
    let fixedTimeEndStatus = true;
    workerRef.current = runWorker(work);
    workerRef.current.onmessage = ({ data }: any) => {
      setSeconds(data);
      if (data <= fixedTime && fixedTimeEndStatus) {
        fixedTimeEndStatus = false;
        onFixedTimeCountDownEvent && onFixedTimeCountDownEvent();
      }
      if (data <= 0) {
        fixedTimeEndStatus = true;
        onHandCountDownEvent && onHandCountDownEvent();
      }
    };
    workerRef.current.onerror = function (err: Error) {
      console.log(err);
    };
    return () => {
      workerRef.current.terminate();
    };
  }, []);

  useEffect(() => {
    if (endTime && endTime > 0 && !gapTime) {
      //设置间隔时间
      getGapTime();
    }

    workerRef.current.postMessage({ endTime, gapTime });
  }, [endTime, gapTime]);

  useEffect(() => {
    if (secondsParam) {
      // setSeconds(secondsParam);
      workerRef.current.postMessage({ seconds: secondsParam });
    }
  }, [secondsParam]);

  const getGapTime = () => {
    const now = Date.now(); // 接口请求之前的时间
    //传入当前时间，不需要去请求服务端时间
    if (eventTime) {
      setGapTime(eventTime - Date.now());
      return;
    }
    axios
      .request({
        method: 'get',
        url: ROOT_BASE + '/system-service/sysinfo/now',
      })
      .then((res: any) => {
        const serverTime =
          Number(res?.timestamp || res?.data?.timestamp) * 1000;
        const httpTime = Date.now() - now;
        setGapTime(serverTime + httpTime - Date.now());
      })
      .catch((err) => {
        console.error(err);
      });
  };

  function secondsToTime(secs: number) {
    const timeFormatMap: any = {
      DD: () => {
        const days: number = Math.floor(secs / 1000 / 60 / 60 / 24);
        if (onFormatCountDownEvent) {
          if (days <= 0) {
            setFormat('hh');
            onFormatCountDownEvent('hh');
          }
        }
        return <span>{days}</span>;
      },
      hh: () => {
        const days: number = Math.floor(secs / 1000 / 60 / 60 / 24);
        const H: number = dayjs.utc(secs).get('hour');
        const hours = H + days * 24;
        if (onFormatCountDownEvent) {
          if (H + days * 24 <= 0) {
            setFormat('mm');
            onFormatCountDownEvent && onFormatCountDownEvent('mm');
          }
        }
        return <span>{hours}</span>;
      },
      mm: () => {
        const days: number = Math.floor(secs / 1000 / 60 / 60 / 24);
        const H: number = dayjs.utc(secs).get('hour');
        const M: number = dayjs.utc(secs).get('minute');
        if (onFormatCountDownEvent) {
          if ((H + days * 24) * 60 + M <= 0) {
            setFormat('ss');
            onFormatCountDownEvent && onFormatCountDownEvent('ss');
          }
        }
        return <span>{(H + days * 24) * 60 + M}</span>;
      },
      ss: () => {
        return `${Math.floor(secs / 1000)}`;
      },
      'mm:ss': () => {
        const days: number = Math.floor(secs / 1000 / 60 / 60 / 24);
        const H: number = dayjs.utc(secs).get('hour');
        const M: number = dayjs.utc(secs).get('minute');
        const mines = padStart(((H + days * 24) * 60 + M).toString(), 2, '0');
        const ss = padStart(dayjs.utc(secs).get('second').toString(), 2, '0');
        return (
          <>
            <span>{mines}</span>:<span>{ss}</span>
          </>
        );
      },
      'hh:mm:ss': () => {
        const H: number = dayjs.utc(secs).get('hour');
        const days: number = Math.floor(secs / 1000 / 60 / 60 / 24);
        const M: number = dayjs.utc(secs).get('minute');
        const hours = padStart((H + days * 24).toString(), 2, '0');
        const S: number = dayjs.utc(secs).get('second');
        const ss = padStart(S.toString(), 2, '0');
        const mines = padStart(M.toString(), 2, '0');
        return (
          <>
            <span>{hours}</span>:<span>{mines}</span>:<span>{ss}</span>
          </>
        );
      },
      'dd:hh:mm': () => {
        const H: number = dayjs.utc(secs).get('hour');
        const days: number = Math.floor(secs / 1000 / 60 / 60 / 24);
        const M: number = dayjs.utc(secs).get('minute');
        const hours = padStart(H.toString(), 2, '0');
        const mines = padStart(M.toString(), 2, '0');
        return (
          <>
            <span>{days}d</span>:<span>{hours}h</span>:<span>{mines}m</span>
          </>
        );
      },
      'dd:hh:mm:ss': () => {
        const D: number = Math.floor(secs / 1000 / 60 / 60 / 24);
        const days = padStart(D.toString(), 2, '0');
        const H: number = dayjs.utc(secs).get('hour');
        const hours = padStart(H.toString(), 2, '0');
        const M: number = dayjs.utc(secs).get('minute');
        const mines = padStart(M.toString(), 2, '0');
        const S: number = dayjs.utc(secs).get('second');
        const ss = padStart(S.toString(), 2, '0');
        return (
          <>
            <span>{days}</span>
            {unit[0] ? unit[0] : ''}
            <span>{hours}</span>
            {unit[1] ? unit[1] : ''}
            <span>{mines}</span>
            {unit[2] ? unit[2] : ''}
            <span>{ss}</span>
            {unit[3] ? unit[3] : ''}
          </>
        );
      },
    };

    // 当都处理secs < 0
    if (secs < 0) {
      secs = 0;
    }

    return timeFormatMap[format]();
  }

  if (seconds === -10) {
    return '';
  }
  return secondsToTime(seconds);
};
export default CountDown;
