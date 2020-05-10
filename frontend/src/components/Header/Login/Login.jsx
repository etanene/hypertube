import React from 'react';
import { cn } from '@bem-react/classname';
import { useTranslation } from 'react-i18next';

const Login = (props) => {
  const { cls } = props;
  const linkCss = cn('Link');
  const loginCss = cn('Login');
  const { t } = useTranslation();

  return (
    <div className={cls}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a href="#" className={loginCss('Link', [linkCss()])}>
        {t('header.login')}
      </a>
    </div>
  );
};

export default Login;
