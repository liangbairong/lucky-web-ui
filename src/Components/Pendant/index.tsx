import React, { useEffect, useReducer, useImperativeHandle } from 'react';

export interface InitData {
  status: number;
  pageSource: number;
  position: number;
  endTime: number;
  height: number;
  width: number;
  pendantName: string;
  tag: number;
  startTime: number;
  url: string;
}

type requestConfig = {
  url: string;
  data?: Record<string, unknown>;
  method?: string;
  params?: Record<string, unknown>;
  noToast?: boolean;
  config?: any;
};

export interface IPendantAutoFormat {
  pendantKey?: string;
  requestConfig?: requestConfig;
  type?: string;
  cRef?: any;
  children?: React.ReactNode;
  request: any;
  ROOT?: string;
  callback?: (data: any) => void;
}

export interface InitData {
  status: number;
  pageSource: number;
  position: number;
  endTime: number;
  height: number;
  width: number;
  pendantName: string;
  tag: number;
  startTime: number;
  url: string;
}

class JudgeAppPendantMsg {
  index = 20; // 用于检测初始化数据达到倒计时计数器
  timer: number | undefined = undefined;
  /**
   * @param type 监听类型 pendant: 挂件 dialog: 弹窗
   * @param callback 回调函数
   */
  trigger(type: string, callback: Function) {
    this.timer && window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      console.log(this.index);
      if (this.index < 0) {
        return;
      }
      console.log(window.appPendantMsg);

      if (
        (type === 'pendant' && window.appPendantMsg?.status === 200) ||
        (type === 'dialog' && window.appPendantMsg?.resource)
      ) {
        callback(window.appPendantMsg);
        window.clearTimeout(this.timer);
      } else {
        this.index--;
        this.trigger(type, callback);
      }
    }, 200);
  }
}

const Pendant = (props: IPendantAutoFormat): JSX.Element | null => {
  const {
    pendantKey,
    requestConfig = {
      method: '',
    },
    type = 'live',
    cRef,
    request,
    ROOT = '',
    children,
    callback = () => {},
  } = props;
  if (typeof pendantKey !== 'string' || pendantKey === '') return null;

  // 计算表达式的值
  const evalSelf = (fn: any) => {
    const Fn = Function; // 一个变量指向Function，防止有些前端编译工具报错
    return new Fn(`return ${fn}`)();
  };

  // 获取当前挂件数据，并和旧数据对比
  const formatReducer = (state: any, action: any) => {
    // 判断返回的roundId，并插入到相应的tab
    if (action.currentTime > state.currentTime) {
      return action;
    }
    return state;
  };

  const [formatData, setFormatData] = useReducer(formatReducer, {
    currentTime: 0,
  });

  // 获取当前挂件数据，并和旧数据对比
  const reducer = (state: any, action: any) => {
    console.log('InitDatareducer', state, action);
    // 判断返回的roundId，并插入到相应的tab
    if (action) {
      if (action.data && Array.isArray(action.data)) {
        return action.data.find(
          (ctxItem: InitData) => ctxItem.pendantName === pendantKey,
        );
      }
    }

    return state;
  };

  const [initData, setInitData] = useReducer(reducer, {});

  const getPendantData = () => {
    if (initData?.pendantName) {
      request({ ...requestConfig }, requestConfig.method || 'get').then(
        (res: any) => {
          console.log(`组件内部请求接口========${JSON.stringify(res)}`);
          setFormatData({
            ...res,
            currentTime: res.data?.eventTime || res.timestamp,
          });
        },
      );
    }
  };
  // 暴露刷新方法
  useImperativeHandle(cRef, () => ({
    onRefresh: () => {
      getPendantData();
    },
  }));

  useEffect(() => {
    console.log('回传数据=======------------------');
    console.log({ formatData, initData });
    if (initData?.pendantName) {
      callback({ formatData, initData });
    }
  }, [formatData, initData]);

  useEffect(() => {
    if (type === 'live') {
      getPendantData();
    } else if (type === 'home') {
      if (initData?.pendantName) {
        request({ url: `${ROOT}/system-service/sysinfo/now` }, 'get').then(
          (res: any) => {
            setFormatData({ currentTime: res?.timestamp * 1000 });
          },
        );
      }
    }
  }, [initData]);

  useEffect(() => {
    window['appRefreshTrigger'] = (res: any) => {
      const data = evalSelf(`(${res})`);
      console.log('im数据');
      console.log(data);
      if (initData?.pendantName && data.bizKey === pendantKey) {
        setFormatData({
          ...data.resource,
          pendantStartTime: data.statestartTime,
          pendantEndTime: data.endTime,
          currentTime: data.currentTime,
        });
      }
    };
    return () => {
      window.appRefreshTrigger = null;
    };
  }, [initData]);

  useEffect(() => {
    new JudgeAppPendantMsg().trigger('pendant', setInitData);

    return () => {
      window['appInitTrigger'] = null;
    };
  }, []);

  return <div>{children}</div>;
};

export default Pendant;
