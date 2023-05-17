import React, { useEffect, useRef, memo, HTMLAttributes } from 'react';

// @ts-ignore
import Vap from 'video-animation-player';

export interface VapPlayerOptions {
  /**
   * @description  资源路径
   * @default ''
   */
  src: string;
  /**
   * @description  资源配置
   * @default ''
   */
  config: string | { [key: string]: any };
  /**
   * @description  宽度
   * @default 750
   */
  width: number;
  /**
   * @description  高度
   * @default 900
   */
  height: number;
  /**
   * @description  动画帧数（生成素材时在工具中填写的fps值）
   * @default 20
   */
  fps?: number;
  /**
   * @description  是否对视频静音
   * @default false
   */
  mute?: boolean;
  /**
   * @description  是否循环播放
   * @default false
   */
  loop?: boolean;
  /**
   * @description  组件基于type字段做了实例化缓存，不同的VAP实例应该使用不同的type值（如0、1、2等）
   * @default undefined
   */
  type?: 0 | 1 | 2;
  /**
   * @description  起始播放时间点(单位秒),在一些浏览器中可能无效
   * @default 0
   */
  beginPoint?: number;
  /**
   * @description  融合字体样式用法参考
   * @default ''
   */
  fontStyle?: string;
  /**
   * @description  是否启用精准模式（使用requestVideoFrameCallback提升融合效果，浏览器不兼容时自动降级）
   * @default false
   */
  accurate?: boolean;
  /**
   * @description  是否预加载视频资源（默认关闭，即边下边播）
   * @default false
   */
  precache?: boolean;
  /**
   * @description  组件销毁时回调
   * @default undefined
   */
  onDestory?: () => void; //
  /**
   * @description  无固定名融合参数（和json配置文件中保持一致）
   * @default ''
   */
  ext?: string;
  /**
   * @description  加载失败回调
   * @default undefined
   */
  onLoadError?: (e: ErrorEvent) => void;
  /**
   * @description  自定义参数
   * @default {}
   */
  [key: string]: any;
}

export interface VapPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @description  播放器参数
   * @default {}
   */
  options?: VapPlayerOptions;
  /**
   * @description  播放中回调
   * @default () => {}
   */
  // onPlaying?: (e: Event) => void;
  /**
   * @description  播放完成回调
   * @default () => {}
   */
  // onEnded?: (e: Event) => void;
  /**
   * @description  播放帧回调
   * @default () => {}
   */
  onFrame?: (e: Event) => void;
}

const VapPlayer: React.FC<VapPlayerProps> = memo(
  ({
    options = {
      src: '',
      config: {},
      width: 750, // 宽度	375
      height: 900, // 高度	375
    },
    onPlaying = () => {},
    onEnded = () => {},
    onFrame = () => {},
    ...props
  }: VapPlayerProps) => {
    const ref = useRef(null);

    useEffect(() => {
      const defaultOptions = {
        container: ref.current,
        src: '',
        config: {},
        width: 750, // 宽度	375
        height: 900, // 高度	375
        fps: 20, // 动画帧数（生成素材时在工具中填写的fps值）	20
        mute: true, // 是否对视频静音	false
        loop: true, // 是否循环播放	false
        type: 2, // 组件基于type字段做了实例化缓存，不同的VAP实例应该使用不同的type值（如0、1、2等）	undefined
        beginPoint: 0, // 起始播放时间点(单位秒),在一些浏览器中可能无效	0
        fontStyle: '', // 融合字体样式用法参考	''
        accurate: false, // 是否启用精准模式（使用requestVideoFrameCallback提升融合效果，浏览器不兼容时自动降级）	false
        precache: false, // 是否预加载视频资源（默认关闭，即边下边播）	false
        onDestory: () => {}, // 组件销毁时回调	undefined
        ext: '', // （无固定名）	融合参数（和json配置文件中保持一致）	''
        onLoadError: () => {}, // 加载失败回调	undefined
      };
      const vap = new Vap({ ...defaultOptions, ...options });
      vap
        .play()
        .on('playing', onPlaying)
        .on('ended', onEnded)
        .on('frame', onFrame);
    }, []);

    return <div {...props} ref={ref} />;
  },
);

export default VapPlayer;
