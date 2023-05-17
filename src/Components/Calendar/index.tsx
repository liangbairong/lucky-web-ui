import React, { useCallback, useEffect, useState } from 'react';
import Img from '../Img';
import JSBridge from '../../uilts/JSBridge';
import CalendarContent from './Calendar';
import Dialog from '../Dialog';
//removeIf(!production)
import './index.less';
//endRemoveIf(!production)

type ICalendar = {
  /**
   * @description  是否显示
   * @default false
   */
  open: boolean;
  /**
   * @description  关闭方法
   * @default
   */
  onClose: () => void;
  /**
   * @description  当前日期
   * @default ''
   */
  value?: string;
  /**
   * @description  最小日期，可传2022-02-22  或 数字
   * @default 30
   */
  minDate?: string;
  /**
   * @description  最大日期，可传2022-02-22  或 数字
   * @default 30
   */
  maxDate?: string;
  /**
   * @description  选择日期回调
   * @default
   */
  onSelect?: (v: any) => void;
};

const Calendar = ({
  open = false,
  onClose = () => {},
  value = '',
  minDate = '1993/01/01',
  maxDate = '2030/02/01',
  onSelect = (v: string) => {},
}: ICalendar) => {
  const getValue = (v: string) => {
    onSelect(v);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      showCloseButton={false}
      showMask={true}
    >
      <CalendarContent
        value={value}
        minDate={minDate}
        maxDate={maxDate}
        locale="zh"
        onSelect={getValue}
      />
    </Dialog>
  );
};
export default Calendar;
