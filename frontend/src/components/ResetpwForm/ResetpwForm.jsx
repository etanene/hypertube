import React, { useContext, useEffect } from 'react';
import { cn } from '@bem-react/classname';
import { useTranslation } from 'react-i18next';
import { NavLink, Redirect } from 'react-router-dom';

import { useForm } from '../../hooks';
import { apiService } from '../../services';

import Input from '../common/Input';
import Button from '../common/Button';
import LangSwitcher from '../Header/LangSwitcher/LangSwitcher';
import './ResetpwForm.css';
import AuthContext from '../../context/authContext';
import { REGEX } from '../../constants';

const resetpwFormCss = cn('ResetpwForm');
const inputCss = resetpwFormCss('Input');

const formSchema = {
  email: {
    validate: (value) => !REGEX.EMAIL.test(value),
  },
};

function ResetpwForm(props) {
  const { className } = props;
  const { t } = useTranslation();
  const { stateAuthReducer } = useContext(AuthContext);

  const submitForm = async (data) => {
    await apiService.post('/api/user/resetpw', data);
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
      message: t('resetpwform.email.errorexist'),
      error: state.email.error,
      exists: false,
    });
  }, [state.email.value, state.email.error, fetchUser]);

  if (stateAuthReducer.isAuth) {
    return (<Redirect to="/" />);
  }

  return (
    <div className={resetpwFormCss('Modal')}>
      <form autoComplete="off" onSubmit={handleSubmit} className={resetpwFormCss({}, [className])}>
        <div className={resetpwFormCss('Links')}>
          <NavLink to="/signup" className={resetpwFormCss('Link')} activeClassName={resetpwFormCss('Link_link_selected')}>
            {t('resetpwform.links.register')}
          </NavLink>
          <div className={resetpwFormCss('Controls')}>
            <LangSwitcher cls={resetpwFormCss('Lang')} />
            <NavLink to="/login" className={resetpwFormCss('Link')} activeClassName={resetpwFormCss('Link_link_selected')}>
              {t('resetpwform.links.login')}
            </NavLink>
          </div>
        </div>
        <Input
          size="m"
          type="text"
          name="email"
          placeholder={t('resetpwform.email.placeholder')}
          value={state.email.value}
          error={state.email.error}
          message={state.email.message || t('resetpwform.email.error')}
          onChange={handleChange}
          className={inputCss}
        />
        <Button type="submit" className={resetpwFormCss('Submit')}>{t('resetpwform.button')}</Button>
      </form>
    </div>
  );
}

export default ResetpwForm;
