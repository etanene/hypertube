import React, { useState, useEffect } from 'react';
import { cn } from '@bem-react/classname';
import { useTranslation } from 'react-i18next';
import { NavLink, Redirect, useParams } from 'react-router-dom';

import { useForm } from '../../hooks';
import { apiService } from '../../services';

import Input from '../common/Input';
import Button from '../common/Button';
import LangSwitcher from '../Header/LangSwitcher/LangSwitcher';
import './ChangepwForm.css';
import { REGEX } from '../../constants';

const changepwFormCss = cn('ResetpwForm');
const inputCss = changepwFormCss('Input');

const formSchema = {
  password: {
    // доступны: большие/маленькие буквы, цифры
    // обязательно: большая и маленькая буква, цифра
    // длина: 4 - 12
    validate: (value) => (!REGEX.PASSWORD.test(value)),
  },
  confirm_password: {
    validate: (value, userObj) => (value !== userObj.password.value),
  },
};

function ChangepwForm(props) {
  const { className } = props;
  const { uuid } = useParams();
  const { t } = useTranslation();
  const [redirect, setRedirect] = useState(false);

  const submitForm = async (data) => {
    try {
      await apiService.post(`/api/user/changepw/${uuid}`, data);
      setRedirect(true);
    } catch (e) {
      console.log(e.message);
    }
  };

  const {
    state,
    handleChange,
    handleSubmit,
  } = useForm(formSchema, submitForm);

  useEffect(() => {
    async function fetchUser() {
      try {
        const users = await apiService.get(`/api/user/get?unique_link=${uuid}`);
        if (!users.length) {
          setRedirect(true);
        }
      } catch (e) {
        console.log(e.message);
      }
    }

    fetchUser();
  }, [uuid]);

  if (redirect) {
    return (<Redirect to="/" />);
  }

  return (
    <div className={changepwFormCss('Modal')}>
      <form autoComplete="off" onSubmit={handleSubmit} className={changepwFormCss({}, [className])}>
        <div className={changepwFormCss('Links')}>
          <NavLink to="/signup" className={changepwFormCss('Link')} activeClassName={changepwFormCss('Link_link_selected')}>
            {t('changepwform.links.register')}
          </NavLink>
          <div className={changepwFormCss('Controls')}>
            <LangSwitcher cls={changepwFormCss('Lang')} />
            <NavLink to="/login" className={changepwFormCss('Link')} activeClassName={changepwFormCss('Link_link_selected')}>
              {t('changepwform.links.login')}
            </NavLink>
          </div>
        </div>
        <Input
          size="m"
          type="password"
          name="password"
          placeholder={t('changepwform.password.placeholder')}
          value={state.password.value}
          error={state.password.error}
          message={t('changepwform.password.error')}
          onChange={handleChange}
          className={inputCss}
        />
        <Input
          size="m"
          type="password"
          name="confirm_password"
          placeholder={t('changepwform.confirmpassword.placeholder')}
          value={state.confirm_password.value}
          error={state.confirm_password.error}
          message={t('changepwform.confirmpassword.error')}
          onChange={handleChange}
          className={inputCss}
        />
        <Button type="submit" className={changepwFormCss('Submit')}>{t('changepwform.button')}</Button>
      </form>
    </div>
  );
}

export default ChangepwForm;
