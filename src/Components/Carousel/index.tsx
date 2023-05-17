import React, {
  EventHandler,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
} from 'react';
import classnames from 'classnames';

import './index.less';

type IAutoPlay = {
  delay: number;
  count?: number;
};

type ICarousel = {
  /**
   * @description  类名
   * @default
   */
  className?: string;

  /**
   * @description 自动轮播秒数
   * @default 0
   */
  autoplay?: IAutoPlay | number;

  /**
   * @description 下标
   * @default false
   */
  tabbar?: boolean;

  /**
   * @description 默认展示index
   * @default 0
   */
  defaultIndex?: number;

  /**
   * @description 当前处于那个tab
   * @default ()=>{}
   */
  onChange?: EventHandler<any>;

  /**
   * @description  子内容
   * @default
   */
  children?: React.ReactNode | any;

  /**
   * @description 暴露的ref方法
   * @default null
   */
  onCarouselRef?: any;
};

interface ITimerInfo {
  timer: null | number;
  auto?: boolean;
  direction?: string;
  delay?: number;
  count?: number;
  customCount?: number;
}

export const Carousel = ({
  className,
  children,
  autoplay,
  tabbar,
  defaultIndex = 0,
  onChange = () => {},
  onCarouselRef = null,
}: ICarousel) => {
  const boxRef = useRef<any>(null);
  const [allW, setAllW] = useState(0);
  const [liW, setLiW] = useState(0);
  const [index, setIndex] = useState(defaultIndex || 0);
  const [startX, setStartX] = useState(0);
  const [moveX, setMoveX] = useState(0);
  const [trans, setTrans] = useState('none');

  const TimerInfo = useRef<ITimerInfo>({
    timer: null,
    direction: 'right',
    auto: true,
    delay: 0,
    count: 0,
    customCount: 0,
  });

  const clearAutoTimer = () => {
    TimerInfo.current.timer && window.clearTimeout(TimerInfo.current.timer);
  };
  const autoPlayFn = () => {
    // console.log('index===',index)
    // console.log('TimerInfo===',JSON.parse(JSON.stringify(TimerInfo)))
    if (TimerInfo?.current?.delay) {
      // console.log('执行清除定时器外部====.',TimerInfo.current.count)
      clearAutoTimer();
      TimerInfo.current.timer = window.setTimeout(() => {
        if (
          TimerInfo.current.customCount &&
          TimerInfo.current.count >= TimerInfo.current.customCount
        ) {
          // console.log('执行清除定时器.',TimerInfo.current.count)
          window.clearTimeout(TimerInfo.current.timer);
        } else {
          setTrans('all');
          TimerInfo.current.count += 1;
          // console.log('执行加时间操作....',TimerInfo.current.count)
          if (
            TimerInfo.current.direction === 'right' &&
            index <= children.length - 1
          ) {
            // console.log('执行向右轮播===right',children.length - 1, index + 1)
            setIndex(index + 1);
            TimerInfo.current.direction =
              index + 1 > children.length - 1 ? 'left' : 'right';
            autoPlayFn();
          }
          if (TimerInfo.current.direction === 'left' && index > 0) {
            // console.log('执行向左轮播===left',)
            setIndex(index - 1);
            TimerInfo.current.direction = index - 1 <= 0 ? 'right' : 'left';
            autoPlayFn();
          }
        }
      }, TimerInfo.current.delay);
    }
  };

  useEffect(() => {
    if (boxRef.current) {
      // console.log(boxRef.current.clientWidth);
      setLiW(boxRef.current.clientWidth);
      setAllW(boxRef.current.clientWidth * children.length);
    }
  }, [boxRef]);

  useEffect(() => {
    if (TimerInfo?.current && autoplay) {
      TimerInfo.current.delay =
        typeof autoplay === 'number' ? autoplay * 1000 : autoplay?.delay;
      TimerInfo.current.customCount =
        typeof autoplay === 'number' ? 0 : autoplay?.count;
      if (TimerInfo.current.auto) autoPlayFn();
    }
    onChange(index);
  }, [index, autoplay]);

  // useEffect(()=>{
  //   // TimerInfo.current.count = defaultIndex
  //   // setIndex(defaultIndex)
  //   // tabHandleClick(defaultIndex)
  // },[defaultIndex])
  // 暴露子组件方法
  useImperativeHandle(onCarouselRef, () => {
    return {
      chooseIndex: chooseIndex,
    };
  });
  const onTouchStart = (e: any) => {
    setTrans('none');
    const a = e.changedTouches[0];
    const x = a.pageX;
    setStartX(x);
    TimerInfo.current.auto = false;
    clearAutoTimer();
  };
  const onTouchMove = (e: any) => {
    const a = e.changedTouches[0];
    const move = a.pageX - startX;
    setMoveX(move);
    // console.log(move);
    TimerInfo.current.auto = false;
  };
  const onTouchEnd = () => {
    setTrans('all');
    if (moveX < -50) {
      // console.log('right');
      if (index < children.length - 1) {
        setIndex(index + 1);
      }
      TimerInfo.current.direction =
        index + 1 >= children.length - 1 ? 'left' : 'right';
    }
    if (moveX > 50) {
      // console.log('left');
      if (index > 0) {
        setIndex(index - 1);
      }
      TimerInfo.current.direction = index - 1 <= 0 ? 'right' : 'left';
    }
    setMoveX(0);
    TimerInfo.current.auto = true;
    autoPlayFn();
  };
  const chooseIndex = (idx: number) => {
    // console.log('执行chooseIndex', idx, autoplay);
    if (autoplay) {
      tabHandleClick(idx);
    } else {
      clearAutoTimer();
      setTrans('all');
      setIndex(idx);
      TimerInfo.current.auto = false;
    }
  };

  const tabHandleClick = (idx: number) => {
    clearAutoTimer();
    setIndex(idx);
    // 重新开始自动轮播
    TimerInfo.current.direction =
      index + 1 >= children.length - 1 ? 'left' : 'right';
    TimerInfo.current.auto = true;
    autoPlayFn();
  };

  if (!Array.isArray(children)) {
    return <div>多个轮播图</div>;
  }

  return (
    <div
      className={classnames('carousel', className)}
      ref={boxRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {tabbar && (
        <div className="carousel-bar">
          {children.map((item, i) => (
            <div
              key={`bar-${i}`}
              className={classnames('bar-icon', index === i ? 'active' : '')}
              onClick={() => {
                tabHandleClick(i);
              }}
            ></div>
          ))}
        </div>
      )}
      <div
        className="carousel-con"
        style={{
          width: `${allW}px`,
          transform: `translate3d(${-liW * index + moveX}px,0,0)`,
          // @ts-ignore
          WebkitTransform: `translate3d(${-liW * index + moveX}px,0,0)`,
          transitionProperty: trans,
          WebkitTransitionProperty: trans,
        }}
      >
        {children.map((item, i) => {
          return (
            <div
              key={`carousel-${i}`}
              className="carousel-li"
              style={{ width: `${liW}px` }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Carousel;
