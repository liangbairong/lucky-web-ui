---
title: LangChange1 语言切换1
order: 1
group:
  path: /business
  title: 业务组件
  order: 4
---

# LangChange1 语言切换 1

语言切换组件，方便调试国际化

```tsx
import React, { useState } from 'react';
import { LangChange1 } from 'lucky-web-ui';

export default () => {
  const [langSet, setLangSet] = useState([
    { name: '简体中文', value: 'zh-CN' },
    { name: '繁體中文', value: 'zh-TW' },
    { name: 'English', value: 'en' },
    { name: 'Tiếng Việt', value: 'vi' },
    { name: 'Bahasa Indonesia', value: 'id' },
  ]);
  const [defaultLang, setDefaultLang] = useState('en');
  const chooseLang = (lang) => {
    console.log(lang);
  };
  const showClickHandle = (show) => {
    console.log(show);
  };
  return (
    <div>
      <LangChange1
        className={'test'}
        langSet={langSet}
        defaultLang={defaultLang}
        chooseLang={(lang) => chooseLang(lang)}
        showClickHandle={(show) => showClickHandle(show)}
      />
    </div>
  );
};
```

<API src="./index.tsx"></API>
