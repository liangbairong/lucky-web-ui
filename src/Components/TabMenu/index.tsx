import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
//removeIf(!production)
import './index.less';
//endRemoveIf(!production)

type ITabMenu = {
  /**
   * @description  菜单数组
   * @default
   */
  menuList?: Array<{
    label: string;
    value: number;
    disable: boolean; //是否可点击
    path: string;
  }>;
  /**
   * @description  当前路径
   * @default
   */
  path?: string;

  /**
   * @description  当前value
   * @default -1
   */
  value?: number;

  /**
   * @description  class
   * @default
   */
  className?: string;
  /**
   * @description  tab切换回调
   * @default
   */
  onMenuChange?: (value: number) => void;
};

const TabMenu = ({
  menuList = [],
  path = '',
  value = -1,
  className = '',
  onMenuChange = () => {},
}: ITabMenu) => {
  const [actionPath, setActionPath] = useState('');

  useEffect(() => {
    setActionPath(path);
  }, [path]);

  const cutMenu = (data: any) => {
    if (data.disable) return;
    setActionPath(data.path);
    onMenuChange(data);
  };
  return (
    <div className={classNames('elelive-tabs-wrap', `${className}-wrap`)}>
      <div className={classNames('elelive-tabs', className)}>
        {menuList.map((item, index) => (
          <div
            className={classNames(
              'elelive-tabs-li',
              value >= item.value ? 'elelive-tabs-exi' : '',
              actionPath === item.path || (!actionPath && index === 0)
                ? 'elelive-tabs-action'
                : '',
            )}
            key={item.value + '-' + index}
            onClick={() => {
              cutMenu(item);
            }}
          >
            <span data-text={item.label}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TabMenu;
