import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';

import './index.less';

type IAutoPlay = {
  delay: number;
  count?: number;
};

type ISwipeMenu = {
  /**
   * @description  类名
   * @default
   */
  className?: string;
  /**
   * @description  子内容
   * @default
   */
  children?: React.ReactNode | any;
  /**
   * @description 是否禁止左滑
   * @default false
   */
  disabled: boolean;
  /**
   * @description 菜单
   * @default []
   */
  menu: Array<any>;
};

export const SwipeMenu = ({
  className,
  disabled = false,
  children,
  menu = [],
}: ISwipeMenu) => {
  const menuRef = useRef<any>(null);
  const [menuW, setMenuW] = useState(0);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [moveX, setMoveX] = useState(0);
  const [trans, setTrans] = useState('none');
  const [moveEndX, setMoveEndX] = useState(0);
  const [isSwipeing, setIsSwipeing] = useState(false);

  useEffect(() => {
    if (menuRef.current) {
      setMenuW(menuRef.current.clientWidth);
    }
  }, [menuRef]);

  const onTouchStart = (e: any) => {
    if (disabled) return;
    setTrans('none');
    const a = e.changedTouches[0];
    const x = a.pageX;
    const y = a.pageY;
    setStartY(y);
    setStartX(x);
  };
  const onTouchMove = (e: any) => {
    if (disabled) return;
    e.stopPropagation();
    setIsSwipeing(true);
    const a = e.changedTouches[0];
    const move = (a.pageX - startX) * 0.8 + moveEndX;
    // const my = a.pageY - startY;
    // if ((my > 10 || my < -10) && (move<=-5)) {
    //   return;
    // }
    if (move > 0) {
      return;
    }

    // if (move > 0 || -move >= menuW) {
    //   return;
    // }
    setMoveX(move);
  };
  const onTouchEnd = (e: any) => {
    if (disabled) return;
    if (!isSwipeing) return;
    setTrans('all');

    if (moveX < -menuW / 2) {
      console.log('right');
      setMoveX(-menuW);
      setMoveEndX(-menuW);
    } else {
      setMoveX(0);
      setMoveEndX(0);
    }

    setIsSwipeing(false);
  };

  return (
    <div
      className={classnames('swipeMenu', className)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="swipeMenu-con"
        style={{
          transform: `translate3d(${moveX}px,0,0)`,
          // @ts-ignore
          WebkitTransform: `translate3d(${moveX}px,0,0)`,
          transitionProperty: trans,
          WebkitTransitionProperty: trans,
        }}
      >
        {children}
      </div>
      <ul className="swipeMenu-menu" ref={menuRef}>
        {menu.map((item: any, i: number) => {
          return (
            <li
              key={`swipeMenu-menu-li-${i}`}
              onClick={() => {
                item.onClick(item);
              }}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default SwipeMenu;
