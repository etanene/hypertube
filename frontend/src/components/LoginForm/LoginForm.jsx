import React, { useContext, useEffect } from 'react';
import { cn } from '@bem-react/classname';
import { useTranslation } from 'react-i18next';
import { NavLink, Redirect } from 'react-router-dom';

import { useForm } from '../../hooks';
import { apiService, userService } from '../../services';

import Input from '../common/Input';
import Button from '../common/Button';
import LangSwitcher from '../Header/LangSwitcher/LangSwitcher';
import './LoginForm.css';
import AuthContext from '../../context/authContext';

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
  const { stateAuthReducer, authDispatch } = useContext(AuthContext);

  const submitForm = async (data) => {
    const { username, password } = data;
    try {
      const { token, userId, photo } = await apiService.post('/api/auth/login', { username, password });
      if (token) {
        userService.setUser({
          username,
          token,
          userId,
          photo,
        });
        authDispatch({
          type: 'LOGIN',
          payload: {
            username,
            token,
            userId,
            photo,
          },
        });
      }
    } catch (e) {
      authDispatch({ type: 'LOGIN_ERROR', payload: e.message });
    }
  };

  useEffect(() => (
    () => {
      authDispatch({ type: 'USER_RESET_ERROR' });
    }
  ), [authDispatch]);

  const { state, handleChange, handleSubmit } = useForm(formSchema, submitForm);

  if (stateAuthReducer.isAuth) {
    return (<Redirect to="/" />);
  }

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
          <NavLink to="/reset" className={loginFormCss('Link')} activeClassName={loginFormCss('Link_link_selected')}>
            {t('loginform.links.reset')}
          </NavLink>
        </div>
        <Button type="submit" className={loginFormCss('Submit')}>{t('loginform.button')}</Button>
      </form>
    </div>
  );
}

export default LoginForm;