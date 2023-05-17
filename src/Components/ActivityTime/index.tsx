import React from 'react';

type ILoading = {
  /**
   * @description  时间列表
   * @default
   */
  timeList?: Array<{
    label: string;
    value: number;
    time: Date;
  }>;
  /**
   * @description  日期切换事件
   * @default
   */
  onChange?: (value: number) => void;
};

const Loading = ({}: ILoading) => {
  return <div className="index-loading">dd</div>;
};
export default Loading;
