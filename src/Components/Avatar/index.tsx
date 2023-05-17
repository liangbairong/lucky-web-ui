import React from 'react';
import classnames from 'classnames';
import Img2 from '../Img';
//removeIf(!production)
import './index.less';
//endRemoveIf(!production)

type IAvatar = {
  /**
   * @description  主播昵称
   * @default
   */
  name: string;
  /**
   * @description  主播头像
   * @default
   */
  imgUrl: string;
  /**
   * @description  是否在直播 1：直播  0：不在直播
   * @default
   */
  living: number;
  /**
   * @description  主播uid
   * @default
   */
  uid: string;

  /**
   * @description  是否可以点击跳转
   * @default false
   */
  isClick?: boolean;

  /**
   * @description  class 覆盖样式
   * @default
   */
  className?: string;
  /**
   * @description  xOssProcess
   * @default
   */
  xOssProcess?: string;
  /**
   * @description  虚位以待 文案
   * @default
   */
  waiting?: string;

  /**
   * @description  没有图片的预设图
   * @default
   */
  noImg?: string;

  children?: React.ReactNode;
};
const JSBridge = {
  // 跳转app个人中心
  toAppPersonal: function (uid: string) {
    console.log('toAppPersonal');
    try {
      if (window.YWJSBridge) window.YWJSBridge.goHomePage(uid);
    } catch (err) {
      console.error('Android topersonal err', err);
    }
    try {
      if (window.webkit) {
        window.webkit.messageHandlers.ewnativeCookies.postMessage({
          type: 'goHomePage',
          userId: uid,
        });
      }
    } catch (err) {
      console.error('ios topersonal err', err);
    }
  },
  // 跳转指定直播间
  toAppLive: function (uid: string, avt: string) {
    console.log('toAppLive');
    try {
      if (window.YWJSBridge) window.YWJSBridge.enterLiveRoom(uid, avt);
    } catch (err) {
      console.error('Android toliveRoom err', err);
    }
    try {
      if (window.webkit) {
        window.webkit.messageHandlers.ewnativeCookies.postMessage({
          type: 'enterLiveRoom',
          userId: uid,
          avatar: avt,
        });
      }
    } catch (err) {
      console.error('ios toliveRoom err', err);
    }
  },
};

const Avatar = ({
  className = '',
  name = '',
  imgUrl = '',
  living = 0,
  uid = '',
  isClick = true,
  xOssProcess = '1x',
  waiting = '虚位以待',
  noImg = '',
  children,
}: IAvatar) => {
  const clickTrigger = () => {
    if (isClick) {
      if (living === 1) {
        JSBridge.toAppLive(uid, imgUrl);
      } else {
        JSBridge.toAppPersonal(uid);
      }
    }
  };
  return (
    <div className={classnames('Avatar', className)} onClick={clickTrigger}>
      <div className="Avatar-img">
        {imgUrl ? (
          <Img2
            src={imgUrl}
            className="Avatar-img-has"
            xOssProcess={xOssProcess}
          />
        ) : (
          noImg
        )}
        {living === 1 ? <div className="Avatar-type">LIVE</div> : ''}
      </div>
      <div className="Avatar-content">
        <div className="Avatar-name">{name || waiting}</div>
        {children}
      </div>
    </div>
  );
};
export default Avatar;
