import React from 'react';
import classnames from 'classnames';
//removeIf(!production)
import './index.less';
//endRemoveIf(!production)

type IEmpty = {
  /**
   * @description  空状态图片
   * @default
   */
  image?: string;

  /**
   * @description  class
   * @default
   */
  className?: string;
  /**
   * @description  样式
   * @default
   */
  emptyStyle?: Record<string, any>;
  /**
   * @description  说明内容
   * @default
   */
  description?: JSX.Element;
  /**
   * @description  子内容
   * @default
   */
  children?: React.ReactNode;
};

const Empty = ({
  image = '',
  className = '',
  emptyStyle,
  description,
  children,
}: IEmpty) => (
  <div style={emptyStyle} className={classnames('empty', className)}>
    <img className="empty-image" src={image} alt="empty" />
    <span className="empty-span">{description}</span>
    {children}
  </div>
);
export default Empty;
