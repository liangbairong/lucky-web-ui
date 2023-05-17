import React, { FC, useState, useEffect, useCallback, useRef } from 'react';
import classnames from 'classnames';
import ReactDOM from 'react-dom';
//removeIf(!production)
import './index.less';
import { doc } from 'prettier';

//endRemoveIf(!production)

interface IDialog {
  /**
   * @description  是否打开弹窗
   * @default false
   */
  open: Boolean;
  /**
   * @description  class
   * @default
   */
  className?: String;
  /**
   * @description  children
   * @default
   */
  children: React.ReactNode;
  /**
   * @description  头部
   * @default
   */
  header?: React.ReactNode;
  /**
   * @description  底部
   * @default
   */
  footer?: React.ReactNode;
  /**
   * @description  关闭后回调
   * @default
   */
  onClose: () => void;
  /**
   * @description  关闭动画结束后回调
   * @default
   */
  onAnimateEnd?: () => void;
  /**
   * @description  是否显示关闭按钮
   * @default false
   */
  showCloseButton?: Boolean;
  /**
   * @description  是否显示遮罩层
   * @default false
   */
  showMask?: Boolean;
  /**
   * @description  内容是否可以滚动，默认禁止滚动
   * @default false
   */
  isBescroll?: Boolean;
  /**
   * @description  是否开启动画
   * @default true
   */
  animate?: Boolean;
  /**
   * @description  弹窗打开方式 [center/bottom]
   * @default center
   */
  dialogType?: string;

  /**
   * @description  是否点击背景关闭弹窗
   * @default false
   */
  isMaskClick?: boolean;
}

const Dialog = ({
  open = false,
  children,
  isMaskClick = false,
  onClose = () => {},
  onAnimateEnd = () => {},
  showCloseButton = false,
  showMask = false,
  animate = true,
  className = '',
  isBescroll = false,
  dialogType = 'center',
}: IDialog) => {
  const modalEl = useRef<any>('');
  const boxEl = useRef<any>();

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (isMaskClick) {
      if (
        !modalEl.current.contains(e.target as Node) &&
        modalEl.current.current !== e.target
      ) {
        onClose();
      }
    }
  }, []);

  const [show, setShow] = useState(false);
  const [bgAnimateClass, setBgAnimateClass] = useState('');
  const [animateClass, setAnimateClass] = useState('');
  useEffect(() => {
    if (!open) {
      outFn();
    } else {
      if (animate) {
        setBgAnimateClass('animated opAnimatedIn');
        setAnimateClass(
          `animated ${dialogType === 'bottom' ? 'bounceUp' : 'bounceIn'}`,
        );
      }
      setShow(true);
      if (!isBescroll) {
        touchmove();
      }
    }
  }, [open]);

  const outFn = () => {
    if (show) {
      if (animate) {
        setBgAnimateClass('animated opAnimatedOut');
        setAnimateClass(
          `animated ${dialogType === 'bottom' ? 'bounceDown' : 'bounceOut'}`,
        );
        setTimeout(() => {
          setShow(false);
          onAnimateEnd();
        }, 300);
      } else {
        setShow(false);
        onAnimateEnd();
      }
      if (!isBescroll) {
        unTouchmove();
      }
    }
  };
  useEffect(() => {
    return () => {
      document.body.classList.remove('static');
    };
  }, []);

  if (!show) {
    return <></>;
  }

  function touchmove() {
    // @ts-ignore
    const scrollTop = document.scrollingElement
      ? document.scrollingElement.scrollTop
      : window.pageYOffset || document.body.scrollTop;
    document.body.classList.add('static');
    document.body.style.top = `-${scrollTop}px`;

    // document.documentElement.style.overflow='hidden';
    // document.body.style.height = `${
    //   document.documentElement.clientHeight + scrollTop
    // }px`;
  }
  function unTouchmove() {
    const top = document.body.style.top;
    document.body.classList.remove('static');
    window.scrollTo(0, -parseInt(top));
    document.body.style.top = '';
    // document.documentElement.style.overflow='auto';
  }

  const dom = (
    <div
      onClick={(event) => handleClick(event)}
      className={classnames('ele-dialog-wrap', className)}
      ref={boxEl}
    >
      {showMask && (
        <div
          className={classnames('ele-dialog-mask', bgAnimateClass)}
          onTouchMove={(e) => {
            e.stopPropagation();
          }}
        />
      )}
      <div className={classnames(animateClass)} ref={modalEl}>
        <div className="ele-dialog-content">
          {children}
          {showCloseButton ? (
            <div onClick={onClose} className="ele-dialog-close" />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
  return ReactDOM.createPortal(dom, document.body);
};

export default Dialog;
