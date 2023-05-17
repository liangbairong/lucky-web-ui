import React, { useEffect, useState, useImperativeHandle } from 'react';
import { debounce } from '../../uilts';
import classnames from 'classnames';
import Loading from '../Loading/index';
//removeIf(!production)
import './index.less';
//endRemoveIf(!production)

type ILoadMore = {
  /**
   * @description  class
   * @default
   */
  className?: string;
  /**
   * @description  滚动高度
   * @default
   */
  height?: string | number;

  /**
   * @description  内容
   * @default
   */
  children: React.ReactNode;

  /**
   * @description  组件实例
   * @default
   */
  cRef?: any;
  /**
   * @description  自定义loading
   * @default
   */
  customLoading: React.ReactNode;

  /**
   * @description  滚动到底部函数
   * @default
   */
  onLoadMore?: () => void;
};

const LoadMore = ({
  className = '',
  height = 4,
  children,
  onLoadMore = () => {},
  cRef,
  customLoading,
}: ILoadMore) => {
  const [loading, setLoading] = useState(false);
  useImperativeHandle(cRef, () => ({
    loading,
    loadingControl: (state: boolean) => {
      setLoading(state);
    },
  }));
  const getDistance = (event: any) => {
    event.stopPropagation();
    if (loading) return;
    const dom = event.target;
    const scrollDistance = dom.scrollHeight - dom.scrollTop - dom.clientHeight;
    if (scrollDistance <= 1) {
      onLoadMore();
    }
  };

  return (
    <div
      className={classnames('elelive-loadMore', className)}
      style={{ height: typeof height === 'number' ? height + 'rem' : height }}
      onScroll={(event) => debounce(getDistance(event), 300)}
    >
      {children}
      {customLoading ? (
        loading ? (
          customLoading
        ) : (
          ''
        )
      ) : (
        <Loading open={loading} className="elelive-loadMore-loading" />
      )}
    </div>
  );
};

export default LoadMore;
