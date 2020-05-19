import React, { useEffect } from 'react';
import { cn } from '@bem-react/classname';
import { useTranslation } from 'react-i18next';
// import { useSelector } from 'react-redux';

import { useForm } from '../../hooks';
import { apiService } from '../../services';
import { REGEX } from '../../constants';

import Input from '../common/Input';
import NavLink from '../common/NavLink';
import PhotoInput from '../common/PhotoInput';
import Button from '../common/Button';
import LangSwitcher from '../Header/LangSwitcher/LangSwitcher';
import './RegForm.css';

const regFormCss = cn('reg-form');
const inputCss = regFormCss('input');


const RegForm = React.memo((props) => {
  const { className } = props;
  const { t } = useTranslation();

  const formSchema = {
    photo: {
      message: t('regform.photo.error'),
    },
    username: {
      // доступны: большие/маленькие буквы, цифры
      // длина: 4 - 12
      regex: REGEX.USERNAME,
      message: t('regform.username.error'),
    },
    email: {
      // доступны: любые символы
      // обязательно: @ и точка
      regex: REGEX.EMAIL,
      message: t('regform.email.error'),
    },
    first_name: {
      message: t('regform.firstname.error'),
    },
    last_name: {
      message: t('regform.lastname.error'),
    },
    password: {
      // доступны: большие/маленькие буквы, цифры
      // обязательно: большая и маленькая буква, цифра
      // длина: 4 - 12
      regex: REGEX.PASSWORD,
      message: t('regform.password.error'),
    },
    confirm_password: {
      message: t('regform.confirmpassword.error'),
    },
  };

  const submitForm = async (data) => {
    await apiService.post('/api/auth/signup', data);
  };
  const {
    state,
    handleChangeFile,
    handleChange,
    handleSubmit,
    fetchUser,
  } = useForm(formSchema, submitForm);

  useEffect(() => {
    fetchUser({
      name: 'email',
      value: state.email.value,
      field: 'email',
      message: t('regform.email.errorexist'),
      error: state.email.error,
      exists: true,
    });
  }, [state.email.value, state.email.error, fetchUser]);

  useEffect(() => {
    fetchUser({
      name: 'username',
      value: state.username.value,
      field: 'login',
      message: t('regform.username.errorexist'),
      error: state.username.error,
      exists: true,
    });
  }, [state.username.value, state.username.error, fetchUser]);
  return (
    <div className={regFormCss('modal')}>
      <form autoComplete="off" onSubmit={handleSubmit} className={regFormCss({}, [className])}>
        <div className={regFormCss('links')}>
          <NavLink to="/signup" className={regFormCss('link')}>
            {t('regform.links.register')}
          </NavLink>
          <div className={regFormCss('loginandlang')}>
            <LangSwitcher cls={regFormCss('lang')} />
            <NavLink to="/login" className={regFormCss('link')}>
              {t('regform.links.login')}
            </NavLink>
          </div>
        </div>
        <PhotoInput name="photo" error={state.photo.error} onChange={handleChangeFile} className={regFormCss('photo')}> </PhotoInput>
        <Input
          type="text"
          name="username"
          placeholder={t('regform.username.placeholder')}
          value={state.username.value}
          error={state.username.error}
          onChange={handleChange}
          className={inputCss}
        >
          {state.username.message}
        </Input>
        <Input
          type="text"
          name="email"
          placeholder={t('regform.email.placeholder')}
          value={state.email.value}
          error={state.email.error}
          onChange={handleChange}
          className={inputCss}
        >
          {state.email.message}
        </Input>
        <Input
          type="text"
          name="first_name"
          placeholder={t('regform.firstname.placeholder')}
          value={state.first_name.value}
          error={state.first_name.error}
          onChange={handleChange}
          className={inputCss}
        >
          {state.first_name.message}
        </Input>
        <Input
          type="text"
          name="last_name"
          placeholder={t('regform.lastname.placeholder')}
          value={state.last_name.value}
          error={state.last_name.error}
          onChange={handleChange}
          className={inputCss}
        >
          {state.last_name.message}
        </Input>
        <Input
          type="password"
          name="password"
          placeholder={t('regform.password.placeholder')}
          value={state.password.value}
          error={state.password.error}
          onChange={handleChange}
          className={inputCss}
        >
          {state.password.message}
        </Input>
        <Input
          type="password"
          name="confirm_password"
          placeholder={t('regform.confirmpassword.placeholder')}
          value={state.confirm_password.value}
          error={state.confirm_password.error}
          onChange={handleChange}
          className={inputCss}
        >
          {state.confirm_password.message}
        </Input>
        <Button type="submit" className={regFormCss('submit')}>{t('regform.button')}</Button>
      </form>
    </div>
  );
});

export default RegForm;
