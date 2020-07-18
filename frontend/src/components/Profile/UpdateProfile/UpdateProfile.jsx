import React, { useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { REGEX } from '../../../constants';
import { useForm } from '../../../hooks';
import './UpdateProfile.css';
import { apiService } from '../../../services';
import AuthContext from '../../../context/authContext';
import PhotoInput from '../../common/PhotoInput';
import Input from '../../common/Input';
import Button from '../../common/Button';

const UpdateProfile = ({ cls, user }) => {
  const formSchema = {
    photo: {
      validate: (value) => value === '',
      required: false,
    },
    username: {
      validate: (value) => !(REGEX.USERNAME.test(value)),
      value: user.login,
      required: true,
    },
    email: {
      validate: (value) => !REGEX.EMAIL.test(value),
      value: user.email,
      required: true,
    },
    first_name: {
      validate: (value) => value === '',
      value: user.first_name,
      required: true,
    },
    last_name: {
      validate: (value) => value === '',
      value: user.last_name,
      required: true,
    },
    password: {
      required: false,
      validate: (value) => {
        if (value) {
          return !REGEX.PASSWORD.test(value);
        }
        return false;
      },
    },
    confirm_password: {
      required: false,
      validate: (value, userObj) => {
        if (userObj.password.value) {
          return value !== userObj.password.value;
        }
        return false;
      },
    },
  };
  const { stateAuthReducer } = useContext(AuthContext);
  const submitForm = async (data) => {
    // eslint-disable-next-line no-param-reassign
    data.userId = stateAuthReducer.user.userId;
    await apiService.post('/api/user/updateUser', data);
  };
  const {
    state,
    handleChange,
    handleSubmit,
    fetchUser,
  } = useForm(formSchema, submitForm, user.user_id);
  const { t } = useTranslation();
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
    <div>
      <form name="scroll-to-element" autoComplete="off" onSubmit={handleSubmit}>
        <PhotoInput name="photo" error={state.photo.error} />
        <Input
          size="m"
          type="text"
          name="username"
          placeholder={t('regform.username.placeholder')}
          value={state.username.value}
          error={state.username.error}
          message={state.username.message || t('regform.username.error')}
          onChange={handleChange}
          className={cls('UpdateInputBox')}
          inputClassName={cls('UpdateInput')}
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
          className={cls('UpdateInputBox')}
          inputClassName={cls('UpdateInput')}
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
          className={cls('UpdateInputBox')}
          inputClassName={cls('UpdateInput')}
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
          className={cls('UpdateInputBox')}
          inputClassName={cls('UpdateInput')}
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
          className={cls('UpdateInputBox')}
          inputClassName={cls('UpdateInput')}
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
          className={cls('UpdateInputBox')}
          inputClassName={cls('UpdateInput')}
        />
        <Button className={cls('UpdateButton')} type="submit">{t('profile.update')}</Button>
      </form>
    </div>
  );
};

export default UpdateProfile;
