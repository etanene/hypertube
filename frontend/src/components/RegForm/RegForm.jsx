import React, { useEffect } from 'react';
import { cn } from '@bem-react/classname';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useForm } from '../../hooks';
import { apiService } from '../../services';
import { REGEX } from '../../constants';

import Input from '../common/Input';
import PhotoInput from '../common/PhotoInput';
import Button from '../common/Button';
import LangSwitcher from '../Header/LangSwitcher/LangSwitcher';
import './RegForm.css';

const regFormCss = cn('RegForm');
const inputCss = regFormCss('Input');

const formSchema = {
  photo: {
    required: true,
    validate: (value) => value === '',
  },
  username: {
    // доступны: большие/маленькие буквы, цифры
    // длина: 4 - 12
    required: true,
    validate: (value) => !(REGEX.USERNAME.test(value)),
  },
  email: {
    // доступны: любые символы
    // обязательно: @ и точка
    required: true,
    validate: (value) => !REGEX.EMAIL.test(value),
  },
  first_name: {
    required: true,
    validate: (value) => value === '',
  },
  last_name: {
    required: true,
    validate: (value) => value === '',
  },
  password: {
    // доступны: большие/маленькие буквы, цифры
    // обязательно: большая и маленькая буква, цифра
    // длина: 4 - 12
    required: true,
    validate: (value) => (!REGEX.PASSWORD.test(value)),
  },
  confirm_password: {
    required: true,
    validate: (value, userObj) => (value !== userObj.password.value),
  },
};

const RegForm = React.memo((props) => {
  const { className } = props;
  const { t } = useTranslation();

  const submitForm = async (data) => {
    await apiService.post('/api/auth/signup', data);
  };
  const {
    state,
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
    <div className={regFormCss('Modal')}>
      <form autoComplete="off" onSubmit={handleSubmit} className={regFormCss({}, [className])}>
        <div className={regFormCss('Links')}>
          <NavLink to="/signup" className={regFormCss('Link')} activeClassName={regFormCss('Link_link_selected')}>
            {t('regform.links.register')}
          </NavLink>
          <div className={regFormCss('Controls')}>
            <LangSwitcher cls={regFormCss('Lang')} />
            <NavLink to="/login" className={regFormCss('Link')} activeClassName={regFormCss('Link_link_selected')}>
              {t('regform.links.login')}
            </NavLink>
          </div>
        </div>
        <PhotoInput name="photo" error={state.photo.error} onChange={handleChange} className={regFormCss('Photo')} />
        <Input
          size="m"
          type="text"
          name="username"
          placeholder={t('regform.username.placeholder')}
          value={state.username.value}
          error={state.username.error}
          message={state.username.message || t('regform.username.error')}
          onChange={handleChange}
          className={inputCss}
        />
        <Input
          size="m"
          type="text"
          name="email"
          placeholder={t('regform.email.placeholder')}
          value={state.email.value}
          error={state.email.error}
          message={state.email.message || t('regform.email.error')}
          onChange={handleChange}
          className={inputCss}
        />
        <Input
          size="m"
          type="text"
          name="first_name"
          placeholder={t('regform.firstname.placeholder')}
          value={state.first_name.value}
          error={state.first_name.error}
          message={t('regform.firstname.error')}
          onChange={handleChange}
          className={inputCss}
        />
        <Input
          size="m"
          type="text"
          name="last_name"
          placeholder={t('regform.lastname.placeholder')}
          value={state.last_name.value}
          error={state.last_name.error && t('regform.lastname.error')}
          message={t('regform.firstname.error')}
          onChange={handleChange}
          className={inputCss}
        />
        <Input
          size="m"
          type="password"
          name="password"
          placeholder={t('regform.password.placeholder')}
          value={state.password.value}
          error={state.password.error}
          message={t('regform.password.error')}
          onChange={handleChange}
          className={inputCss}
        />
        <Input
          size="m"
          type="password"
          name="confirm_password"
          placeholder={t('regform.confirmpassword.placeholder')}
          value={state.confirm_password.value}
          error={state.confirm_password.error}
          message={t('regform.confirmpassword.error')}
          onChange={handleChange}
          className={inputCss}
        />
        <Button type="submit" className={regFormCss('Submit')}>{t('regform.button')}</Button>
      </form>
    </div>
  );
});

export default RegForm;
