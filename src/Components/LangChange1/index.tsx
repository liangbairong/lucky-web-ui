import React, { useEffect, useState } from 'react';

//removeIf(!production)
import './index.less';
//endRemoveIf(!production)
import classNames from 'classnames';
type ILangChange = {
  /**
   * @description  语言数组,展示设置
   * @default
   */
  langSet?: Record<string, any>;
  /**
   * @description  默认语言
   * @default false
   */
  defaultLang?: string;
  /**
   * @description  className
   * @default ''
   */
  className?: string;

  /**
   * @description  按钮文字
   * @default ''
   */
  btnText?: string;
  /**
   * @description  选中语言事件
   * @default
   */
  chooseLang?: (data: Record<string, any>) => void;
  /**
   * @description  显示隐藏列表事件
   * @default
   */
  showClickHandle?: (data: boolean) => void;
};

const LangChange1: React.FC<ILangChange> = ({
  langSet = [
    { name: '简体中文', value: 'zh-CN' },
    { name: '繁體中文', value: 'zh-TW' },
    { name: 'English', value: 'en' },
    { name: 'Tiếng Việt', value: 'vi' },
    { name: 'Bahasa Indonesia', value: 'id' },
  ],
  chooseLang = () => {},
  showClickHandle = () => {},
  defaultLang = 'en',
  className = '',
  btnText = '',
}: ILangChange) => {
  const [curLang, setCurLang] = useState<Record<string, any>>({
    name: 'English',
    value: 'en',
  });
  const [showList, setShowList] = useState(false);
  useEffect(() => {}, []);
  const showClick = () => {
    setShowList(!showList);
  };

  const handleClickItem = (lang: Record<string, any>) => {
    setCurLang(lang);
    setShowList(false);
    chooseLang(lang);
  };

  useEffect(() => {
    showClickHandle(showList);
  }, [showList]);

  useEffect(() => {
    const temp = langSet.find((item: any) => item.value === defaultLang) || {
      name: 'English',
      value: 'en',
    };
    setCurLang(temp);
  }, [defaultLang]);
  return (
    <div className={classNames('elelive-langChange', className)}>
      <button type={'button'} onClick={showClick} className={'lang-btn'}>
        {btnText || curLang?.name}
      </button>
      {showList && (
        <div className={'lang-list'}>
          {langSet.map((item: any, index: number) => {
            return (
              <div
                onClick={() => handleClickItem(item)}
                className={classNames(
                  'lang-item',
                  curLang?.value === item?.value ? 'selected' : '',
                )}
                key={index}
              >
                {item?.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default LangChange1;
