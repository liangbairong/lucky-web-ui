import React, { useEffect, useState } from 'react';
//removeIf(!production)
import './index.less';
//endRemoveIf(!production)

type LanguageMap = 'zh-CN' | 'zh-TW' | 'en' | 'vi' | 'id' | 'ms';

type IImg = {
  /**
   * @description  图片路径，可传多语言图片
   * @default
   */
  src: string | any;
  /**
   * @description  自定义兜底图
   * @default
   */
  seatImg?: React.ReactNode;
  /**
   * @description  picture兼容图片模式
   * @default true
   */
  picture?: boolean;
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
  language?: LanguageMap;
  /**
   * @description  头像改为使用oss裁剪参数 传 2x 或  1x
   * @default 1x
   */
  xOssProcess?: string;
  /**
   * @description  占位图
   * @default
   */
  defaultImg?: string;
  /**
   * @description  图片加载方式
   * @default lazy
   */
  loading?: 'eager' | 'lazy' | undefined;
  /**
   * @description  点击事件
   * @default
   */
  onClick?: () => void;
};

const transUrl = (origUrl: string, type: string) => {
  const reg = /.png|.jpg/g;
  return origUrl.replace(reg, type);
};
const typeFn: any = {
  avif: (origUrl: string) => {
    return transUrl(origUrl, '.avif');
  },
  webp: (origUrl: string) => {
    return transUrl(origUrl, '.webp');
  },
};

const Img = ({
  src = '',
  className = '',
  style = {},
  picture = true,
  language = 'zh-CN',
  loading = 'lazy',
  xOssProcess = '',
  defaultImg = '',
  onClick = () => {},
  ...props
}: IImg) => {
  const defaultSrc =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAG1BMVEUAAAD////////////////////////////////rTT7CAAAACXRSTlMAGRsFCAwQFhPbIksmAAAB2UlEQVRYw+3Wz0/qQBDA8U1K9R3f7IvvveuMVDxS1MRjwcR4REyMR0I0elSi4lHx179tEcpMOtplbh76PRBS+KTdbXfB1dXV1XGH75PJW9siYiIkarqV2j3t568pQl4rfxddXWSVIDrzNPtiDz5r55iodV4hGk8E4PPTdJdklB/A1+/FFAHAXwsSwSy6qxJ5TUFirDQjhM8SQdYWx+j2K3GMMG9bkPXiIA212CcoEiSFolZbDcTDsjaTLhT5pEwGyB9mTHpQpC4tJmDSZzIAbrt0EggT/yhFjPKjIZMRiLYk6ZRIKokcJDeFANFXBlWE+y3IeLWzXKsJM41lPTR8fWMiL0mfyaB8XVyKYdIqLfrx16SnppjbF6fJmHRZ8L3XjzIvE7leMNMrf3lp/xwTXpXPTrdGPJdpee37DcfppZwIEuNiIN/sz0dzsylINBf/C6GNx9lkMpk/4/SXhWpvTECZJB0ivBNC17i62XCSNCYPJy7QjpNktX406dpJz04Gi+fT0FQtw1CR2lBDFY98Yp/jpgukt6g/hruCaksJdETLzSkY/wYa72SKYJxj3iA3zcQPzQSdmTTNxPetxCfOSjCzEnp2hjrqT16wX0T44mxd3h+4urq6unIfL5d/vhcnmkwAAAAASUVORK5CYII=';
  const [url, setUrl] = useState('');

  const checkImgSuffix = (img: string): boolean => {
    if (!img || typeof img !== 'string') return false;
    return !(
      img.toLocaleLowerCase().includes('.webp') ||
      img.toLocaleLowerCase().includes('.gif')
    );
  };

  useEffect(() => {
    if (src) {
      const origUrl = typeof src === 'object' ? src[language] : src;
      if (origUrl) {
        if (origUrl.includes('https://') || origUrl.includes('http://')) {
          if (xOssProcess) {
            // setUrl(`${origUrl}!${xOssProcess}`);
            const a = origUrl
              .split('?')
              .map((item: string) =>
                item.includes('https://') && checkImgSuffix(item)
                  ? `${item}!${xOssProcess}`
                  : item,
              )
              .join('?');
            setUrl(a);
          } else {
            setUrl(origUrl);
          }
        } else {
          const tWebp: any = window.localStorage.getItem('compatibilityImg');
          // @ts-ignore
          if (typeFn[tWebp] && picture && window.contextBuild) {
            setUrl(typeFn[tWebp](origUrl));
          } else {
            setUrl(origUrl);
          }
        }
      }
    }
  }, [src]);

  const onError = () => {
    setUrl(defaultImg || defaultSrc);
  };

  if (!url) return;

  return (
    <img
      src={url}
      style={style}
      className={className}
      onError={onError}
      onClick={onClick}
      {...props}
    />
  );
};

export default Img;
