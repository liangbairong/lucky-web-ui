import React, { useEffect, useState } from 'react';
import Dropdown from '../Dropdown/index';

//removeIf(!production)
import './index.less';
//endRemoveIf(!production)
import classNames from 'classnames';
interface langOption {
  label: string | number;
  value: string | number;
}

interface ILangChange {
  /**
   * @description  语言数组,展示设置
   * @default
   */
  langSet?: langOption[];
  /**
   * @description  默认语言
   * @default false
   */
  defaultLang?: string;
  /**
   * @description  选中语言
   * @default
   */
  chooseLang?: (data: string) => void;
  children?: React.ReactNode;
}

const LangChange: React.FC<ILangChange> = ({
  langSet = [
    { label: '简体中文', value: 'zh-CN' },
    { label: '繁體中文', value: 'zh-TW' },
    { label: 'English', value: 'en' },
    { label: 'Tiếng Việt', value: 'vi' },
    { label: 'Bahasa Indonesia', value: 'id' },
    { label: 'Melayu', value: 'ms' },
  ],
  chooseLang = () => {},
  defaultLang = 'zh-CN',
}: ILangChange) => {
  const onChange = (data: Record<string, any>) => {
    chooseLang(data?.value);
  };
  return (
    <div className={'elelive-langChange'}>
      <Dropdown
        list={langSet}
        defaultValue={defaultLang}
        onChange={onChange}
      ></Dropdown>
    </div>
  );
};
export default LangChange;
