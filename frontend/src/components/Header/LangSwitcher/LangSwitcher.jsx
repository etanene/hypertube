import React from 'react';
import { cn } from '@bem-react/classname';
import { useTranslation } from 'react-i18next';

const LangSwitcher = (props) => {
  const { cls } = props;
  const langCss = cn('Lang');
  const { t, i18n } = useTranslation();
  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <div
      className={cls}
      role="button"
      onClick={changeLanguage}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.code === 'KeyL') {
          changeLanguage();
        }
      }}
    >
      <span className={langCss()}>
        {t('header.lang')}
      </span>
    </div>
  );
};

export default LangSwitcher;
