import React, { CSSProperties } from 'react';
import SkeletonLib, { SkeletonTheme } from 'react-loading-skeleton';
//removeIf(!production)
import './index.less';
//endRemoveIf(!production)

type ISkeleton = {
  /**
   * @description  行数
   * @default
   */
  count?: number;
  /**
   * @description  动画持续时间
   * @default  1.2
   */
  duration?: number;
  /**
   * @description  延迟
   * @default  0
   */
  delay?: number;
  /**
   * @description  宽度
   * @default
   */
  width?: string | number;
  /**
   * @description  高度
   * @default
   */
  height?: string | number;
  /**
   * @description  包裹
   * @default
   */
  wrapper?: React.ReactNode;
  /**
   * @description  圆形
   * @default false
   */
  circle?: boolean;
  /**
   * @description  样式
   * @default
   */
  style?: CSSProperties;
  /**
   * @description  class
   * @default
   */
  className?: string;
  /**
   * @description  颜色
   * @default
   */
  color?: string;
  /**
   * @description  动画条颜色
   * @default
   */
  highlightColor?: string;
};

const Skeleton = ({
  count = 1,
  duration = 1.2,
  width = '',
  wrapper = null,
  height = '',
  circle = false,
  delay = 0,
  style = {},
  className = '',
  color = '',
  highlightColor = '',
}: ISkeleton) => {
  return (
    <SkeletonTheme color={color} highlightColor={highlightColor}>
      <SkeletonLib
        count={count}
        duration={duration}
        width={width}
        height={height}
        wrapper={wrapper}
        circle={circle}
        style={style}
        className={className}
      />
    </SkeletonTheme>
  );
};

export default Skeleton;
