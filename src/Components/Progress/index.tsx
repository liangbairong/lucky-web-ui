import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
//removeIf(!production)
import './index.less';
//endRemoveIf(!production)

type IProgress = {
  /**
   * @description  总值
   * @default
   */
  allValue: number;
  /**
   * @description  已有
   * @default
   */
  haveValue: number;
  /**
   * @description  class
   * @default
   */
  className?: string;
  children: React.ReactNode;
};

const Progress = ({
  allValue = 100,
  haveValue = 0,
  className = '',
  children,
}: IProgress): JSX.Element => {
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    setPercentage((haveValue / allValue) * 100);
  }, [haveValue, allValue]);

  return (
    <div className={classNames('elelive-progress', className)}>
      <div
        className="elelive-progress-content"
        style={{ width: percentage + '%' }}
      />
      <div className="elelive-progress-children"> {children}</div>
    </div>
  );
};
export default Progress;
