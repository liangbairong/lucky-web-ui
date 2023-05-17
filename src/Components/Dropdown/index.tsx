import React, { useEffect, useState } from 'react';

//removeIf(!production)
import './index.less';
//endRemoveIf(!production)
import classNames from 'classnames';

interface DropItemOption {
  label: string | number;
  value: string | number;
}
type IDropdown = {
  /**
   * @description  下拉框选择列表
   * @default
   */
  list: DropItemOption[];
  /**
   * @description  默认值
   * @default
   */
  defaultValue?: string | number;
  /**
   * @description  标题固定文案
   * @default
   */
  FixedCopy?: string | number | React.ReactNode;
  /**
   * @description  是否禁用
   * @default ''
   */
  disabled?: boolean;
  /**
   * @description  下拉框显示隐藏事件，status:true 显示
   * @default ()=>{}
   */
  onTrigger?: (status: boolean) => void;
  /**
   * @description  点击事件，obj当前点击对象
   * @default ()=>{}
   */
  onChange?: (obj1: object) => void;
};

const Dropdown: React.FC<IDropdown> = ({
  list = [{ value: '', label: '' }],
  defaultValue = '',
  FixedCopy = '',
  disabled = false,
  onTrigger = () => {},
  onChange = () => {},
}: IDropdown) => {
  const [showList, setShowList] = useState(false);
  const [curItem, setCurItem] = useState<Record<string, any>>({});

  useEffect(() => {
    if (Array.isArray(list)) {
      if (defaultValue) {
        let temp = list.filter((item) => {
          return item.value && item.value === defaultValue;
        });
        console.log('temp', temp, defaultValue);
        setCurItem(temp[0]);
      } else {
        setCurItem(list[0]);
      }
    }
  }, []);
  useEffect(() => {
    onTrigger(showList);
  }, [showList]);
  const handleClick = () => {
    setShowList(!showList);
  };
  const handleClickItem = (
    data: object,
    item: { label: string | number; value: string | number },
  ) => {
    // const { label } = item;
    setShowList(false);
    setCurItem(item);
    onChange(item);
  };
  if (!Array.isArray(list)) {
    return <></>;
  }
  return (
    <div className={classNames('eleLive-Dropdown', disabled ? 'disabled' : '')}>
      <div onClick={() => handleClick()} className={'eleLive-Dropdown-title'}>
        {FixedCopy || (
          <div className={'eleLive-Dropdown-title-inner'}>{curItem?.label}</div>
        )}
      </div>
      {showList && (
        <div className={'eleLive-Dropdown-list'}>
          {list.map(({ value, label }, index) => {
            return (
              <div
                onClick={(data) => handleClickItem(data, { value, label })}
                key={index}
                className={classNames(
                  curItem?.value === value ? 'selected' : '',
                  'eleLive-Dropdown-item',
                )}
              >
                {label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// type IDropdownItem = {
//   /**
//    * @description  是否禁用
//    * @default ''
//    */
//   disabled?: boolean;
//   /**
//    * @description  点击事件，obj当前点击对象
//    * @default ()=>{}
//    */
//   onClick?: (value: object) => void;
//
//   /**
//    * @description  展示字段
//    * @default ''
//    */
//   label?: string;
//
//   /**
//    * @description  value
//    * @default ''
//    */
//   value?: any;
// };
//
// export const DropdownItem: React.FC<IDropdownItem> = ({
//   label = '',
//   value = '',
//   onClick = () => {},
// }: IDropdownItem) => {
//   return (
//     <div
//       className={classNames('eleLive-Dropdown-item')}
//       onClick={() => onClick(value)}
//     >
//       {label}
//     </div>
//   );
// };

export default Dropdown;
