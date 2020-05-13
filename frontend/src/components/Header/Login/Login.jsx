import React from 'react';
import { cn } from '@bem-react/classname';
import { useTranslation } from 'react-i18next';
import useWindowDimensions from '../../../lib/useWindowDimensions';
import './Login.css';

const Login = (props) => {
  const { cls } = props;
  const linkCss = cn('Link');
  const loginCss = cn('Login');
  const { t } = useTranslation();
  const { width } = useWindowDimensions();

  return (
    <div className={cls}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a href="#" className={loginCss('Link', [linkCss()])}>
        {width > 720 ? t('header.login')
          : (
            <span className={loginCss('Icon', ['material-icons'])}>
              person
            </span>
          )}
      </a>
    </div>
  );
};

export default Login;
