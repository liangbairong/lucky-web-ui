import React, { useMemo, useEffect, useState, useRef, useReducer } from 'react';
import classNames from 'classnames';
// import Skeleton from '../Skeleton';
import Utils from '../Utils';

//removeIf(!production)
import './index.less';
//endRemoveIf(!production)

type LanguageMap = 'zh-CN' | 'zh-TW' | 'en' | 'vi' | 'id' | 'ms';

type IImg = {
  /**
   * @description  图片路径，可传多语言图片
   * @default
   */
  src: string | Record<LanguageMap, any>;
  /**
   * @description  自定义兜底图
   * @default
   */
  seatImg?: React.ReactNode;
  /**
   * @description  webp图片路径
   * @default true
   */
  webp?: boolean;
  /**
   * @description  class
   * @default
   */
  className?: string;
  /**
   * @description  图片样式
   * @default
   */
  style?: object;
  /**
   * @description  兜底图样式
   * @default
   */
  seatStyle?: object;
  /**
   * @description  兜底图class
   * @default
   */
  seatClassName?: string;
  /**
   * @description  是否使用骨架，默认不使用
   * @default
   */
  isSkeleton?: boolean;
  /**
   * @description  骨架宽度，可使用px rem % vw 等单位
   * @default 100%
   */
  skeWidth?: number | string;
  /**
   * @description  骨架高度
   * @default
   */
  skeHeight?: number | string;
  /**
   * @description  当前语言
   * @default   zh-CN
   */
  language?: LanguageMap;
  /**
   * @description  头像改为使用oss裁剪参数 传 2x 或  1x
   * @default 1x
   */
  xOssProcess?: string;
  /**
   * @description  点击事件
   * @default
   */
  onClick?: () => void;
};

interface ImgStateProps {
  url?: string;
  type?: 0 | 1 | 2 | 3; // 0: 未初始化，1：初始化并使用webp图，2：初始化并使用原图格式，3：报错使用兜底图片
}

const Img: React.FC<IImg> = ({
  src = '',
  className = '',
  style = {},
  webp = false,
  seatImg,
  seatStyle = {},
  seatClassName = '',
  isSkeleton = false,
  skeWidth = '100%',
  skeHeight = '100%',
  language = 'zh-CN',
  xOssProcess = '1x',
  onClick = () => {},
  ...props
}: IImg) => {
  const defaultSrc =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFMAAAA+BAMAAACl9jq3AAAAFVBMVEUAAAD///////////////////////9Iz20EAAAAB3RSTlMAGw4SChYGgTmsQQAAAYdJREFUSMfN1LFuwjAQBuBrEzL3GswcpKozULVzItTOsYqYDbTv/wqNq3BnX+L6hg78AwHn42w5OcM0+1c0ny0oUqDP49/o68kNnx3+xn+97OaLl1vE43AdLj7tMDJcDm4qzxYR64gu0A9NCl9oWqLjUkw7K7FhSt9iW+CYPqR2HKwdy9Je6Sqglb/IndvS4DKgJVKOV/mO/P+A3iNnXG44VAe0CMdpeoph6rdVLKHABL2LbrixKId+NzHFnooyXYuqvNouQRs4YZRWzI+OqkraAwqarPoAVl91na9KG63fgcpKmtxX+E7RhXiMoqxJ0Q01C6+I6fTNopuCivdV9gsumc52QTDViqnsLdkyPVPZsdJumMpzQNo2pCekk2hqDYR0QbOLXCziMqIVnYQy1f6ljSicdx+QTER9bpvS6fKv1KppRa2bCZ+2eXntKKPfqzovS+qcbDrqnFz23DmZcD82iiel3VZxmqjoSk8bNTWgpkc9dWp6AC01Tk0b0DbLG2jSIZrn1M0flS9yZtc6beUAAAAASUVORK5CYII=';
  const [origUrl, setOrigUrl] = useState('');
  // 图片前缀判断
  const checkImgSuffix = (img: string): boolean => {
    if (!img || typeof img !== 'string') return false;
    return !(
      img.toLocaleLowerCase().includes('.webp') ||
      img.toLocaleLowerCase().includes('.gif')
    );
  };

  // 图片处理reduce
  const reducer: React.Reducer<ImgStateProps, ImgStateProps> = (
    state,
    action,
  ) => {
    // type === 3，或者图片为空直接显示兜底图
    if (action.type === 3 || !src) {
      return { type: 3, url: defaultSrc };
    }

    // 处理国际化图片，和图片为空的情况
    //原始url
    const origUrl = typeof src === 'object' ? src[language] : src;
    //合成处理url
    let comUrl = origUrl;

    // 处理图片后缀
    if (xOssProcess) {
      comUrl = comUrl
        .split('?')
        .map((item: string) =>
          item.includes('https://') && checkImgSuffix(item)
            ? `${item}!${xOssProcess}`
            : item,
        )
        .join('?');
    }

    // 如果type为1或者允许webp，则直接返回webp图片
    if (action.type === 1) {
      const t = comUrl.replace(/\.(jpg|jpeg|png)$/, '.webp');
      return {
        type: action.type,
        url: t,
      };
    }
    // 如果type为2则直接返回原图
    return { type: 2, url: origUrl };
  };

  // 定义图片参数
  const [config, dispatch] = useReducer<
    React.Reducer<ImgStateProps, ImgStateProps>
  >(reducer, { type: 0, url: '' });

  // 解构图片参数
  const { type = 0, url = '' } = config;

  // 图片错误处理
  const onError = () => {
    // 如果是使用了webp，则先尝试请求原图
    console.log('请求失败图片---' + url);
    if (webp) {
      switch (config.type) {
        case 1:
          dispatch({ type: 2 });
          break;
        case 2:
          dispatch({ type: 3 });
      }
    } else {
      dispatch({ type: 3 });
    }
  };

  // 图片属性
  const imageProps = {
    style,
    onClick,
    src: url,
    className: classNames(className || 'eleimg-img'),
    alt: '',
    onError,
    ...props,
  };

  // 图片更新
  useEffect(() => {
    // 如果是使用了webp，则先转换为webp
    if (webp) {
      dispatch({ type: 1 });
    } else {
      dispatch({ type: 2 });
    }
  }, [language, src]);

  // 阻塞，避免报错
  if (!url || type === 0) {
    return <></>;
  }

  return <img {...imageProps} />;
};

export default Img;
