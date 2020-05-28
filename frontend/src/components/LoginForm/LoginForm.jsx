import React from 'react';
import { cn } from '@bem-react/classname';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { useForm } from '../../hooks';
import { apiService } from '../../services';

import Input from '../common/Input';
import Button from '../common/Button';
import LangSwitcher from '../Header/LangSwitcher/LangSwitcher';
import './LoginForm.css';

const loginFormCss = cn('LoginForm');
const inputCss = loginFormCss('Input');

const formSchema = {
  username: {
    validate: (value) => value === '',
  },
  password: {
    validate: (value) => value === '',
  },
};

function LoginForm(props) {
  const { className } = props;
  const { t } = useTranslation();

  const submitForm = async (data) => {
    await apiService.post('/api/auth/login', data);
  };

  const { state, handleChange, handleSubmit } = useForm(formSchema, submitForm);

  return (
    <div className={loginFormCss('Modal')}>
      <form autoComplete="off" onSubmit={handleSubmit} className={loginFormCss({}, [className])}>
        <div className={loginFormCss('Links')}>
          <NavLink to="/signup" className={loginFormCss('Link')} activeClassName={loginFormCss('Link_link_selected')}>
            {t('loginform.links.register')}
          </NavLink>
          <div className={loginFormCss('Controls')}>
            <LangSwitcher cls={loginFormCss('Lang')} />
            <NavLink to="/login" className={loginFormCss('Link')} activeClassName={loginFormCss('Link_link_selected')}>
              {t('loginform.links.login')}
            </NavLink>
          </div>
        </div>
        <Input
          size="m"
          type="text"
          name="username"
          placeholder={t('loginform.username.placeholder')}
          value={state.username.value}
          error={state.username.error}
          message={state.username.message || t('loginform.username.error')}
          onChange={handleChange}
          className={inputCss}
        />
        <Input
          size="m"
          type="password"
          name="password"
          placeholder={t('loginform.password.placeholder')}
          value={state.password.value}
          error={state.password.error}
          message={t('loginform.password.error')}
          onChange={handleChange}
          className={inputCss}
        />
        <div className={loginFormCss('ResetLink')}>
          <NavLink to="#" className={loginFormCss('Link')} activeClassName={loginFormCss('Link_link_selected')}>
            {t('loginform.links.reset')}
          </NavLink>
        </div>
        <Button type="submit" className={loginFormCss('Submit')}>{t('loginform.button')}</Button>
      </form>
    </div>
  );
}

export default LoginForm;
