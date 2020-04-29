import React from 'react';
import { cn } from '@bem-react/classname';
import { useTranslation } from 'react-i18next';

const Register = (props) => {
  const { cls } = props;
  const linkCss = cn('Link');
  const registerCss = cn('Register');
  const { t } = useTranslation();

  return (
    <div className={cls}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a href="#" className={registerCss('Link', [linkCss()])}>
        {t('header.register')}
      </a>
    </div>
  );
};

export default Register;
