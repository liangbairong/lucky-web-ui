---
title: LangChange 语言切换
order: 1
group:
  path: /business
  title: 业务组件
  order: 3
---

# LangChange 语言切换

语言切换组件，方便调试国际化

```tsx
import React, { useState } from 'react';
import { LangChange } from 'elelive-ui';

export default () => {
  // const [langSet, setLangSet] = useState([
  //   { label: '简体中文', value: 'zh-CN' },
  //   { label: '繁體中文', value: 'zh-TW' },
  //   { label: 'English', value: 'en' },
  //   { label: 'Tiếng Việt', value: 'vi' },
  //   { label: 'Bahasa Indonesia', value: 'id' },
  //   { label: 'Melayu', value: 'ms' },
  // ]); 默认为上述数组,可不填
  const [defaultLang, setDefaultLang] = useState('en');
  const chooseLang = (lang) => {
    console.log('选择语言', lang);
  };
  return (
    <div>
      <LangChange
        defaultLang={defaultLang}
        chooseLang={(lang) => chooseLang(lang)}
      ></LangChange>
    </div>
  );
};
```

<API src="./index.tsx"></API>
