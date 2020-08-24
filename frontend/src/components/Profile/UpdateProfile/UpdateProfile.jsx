import React, { useEffect, useContext, useState } from 'react';
import he from 'he';
import { scroller } from 'react-scroll';
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
  const [updated, setUpdated] = useState(false);
  const isOauth = user.githubid || user.googleid || user.fortytwoid || user.spotifyid || user.vkid;
  function scrollTo() {
    scroller.scrollTo('scroll-to-update', {
      duration: 1000,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  }
  const formSchema = {
    photo: {
      validate: (value) => value === '',
      value: `/api/public/photo/${user.photo}`,
      required: false,
    },
    username: {
      validate: (value) => !(REGEX.USERNAME.test(value)),
      value: user.login,
      required: true,
    },
    first_name: {
      validate: (value) => value === '',
      value: user.first_name || '',
      required: true,
    },
    last_name: {
      validate: (value) => value === '',
      value: user.last_name || '',
      required: true,
    },
    info: {
      validate: (value) => value.length > 250,
      value: (user.info && he.decode(user.info)) || '',
      required: false,
    },
  };
  if (!isOauth) {
    formSchema.email = {
      validate: (value) => !REGEX.EMAIL.test(value),
      value: user.email,
      required: true,
    };
    formSchema.confirm_password = {
      required: false,
      validate: (value, userObj) => value !== userObj.password.value,
    };
    formSchema.password = {
      required: false,
      validate: (value) => {
        if (value) {
          return !REGEX.PASSWORD.test(value);
        }
        return false;
      },
    };
  }
  const { stateAuthReducer, authDispatch } = useContext(AuthContext);
  const submitForm = async (data) => {
    // eslint-disable-next-line no-param-reassign
    data.userId = stateAuthReducer.user.userId;
    const res = await apiService.post('/api/user/updateUser', data);
    if (res.message === 'User updated') {
      res.user.token = stateAuthReducer.user.token;
      authDispatch({ type: 'USER_UPDATE', payload: res.user });
      setUpdated(true);
      scrollTo();
    }
  };
  const {
    state,
    handleChange,
    handleSubmit,
    fetchUser,
  } = useForm(formSchema, submitForm, user.user_id);
  const { t } = useTranslation();
  if (!isOauth) {
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
  }
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
  if (state.confirm_password && state.password) {
    state.confirm_password.error = state.confirm_password.value !== state.password.value;
    if (!state.password.value && !state.confirm_password.value) {
      state.confirm_password.error = false;
    }
  }
  return (
    <div>
      <form name="scroll-to-element" autoComplete="off" onSubmit={handleSubmit}>
        <PhotoInput
          className={cls('UpdatePhoto')}
          onChange={handleChange}
          photo={state.photo.value}
          name="photo"
          error={state.photo.error}
        />
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
        {!isOauth && (
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
        )}
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
          type="text"
          name="info"
          placeholder={t('regform.info.placeholder')}
          value={state.info.value}
          error={state.info.error && t('regform.info.error')}
          message={t('regform.info.error')}
          onChange={handleChange}
          className={cls('UpdateInputBox')}
          inputClassName={cls('UpdateInput')}
        />
        {!isOauth && (
          <div>
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
          </div>
        )}
        <Button
          disabled={(state.confirm_password && state.confirm_password.value
            && !state.password.value)
          || (state.password && state.password.value && !state.confirm_password.value)}
          className={cls('UpdateButton')}
          type="submit"
        >
          {t('profile.update')}
        </Button>
        {updated && <div name="scroll-to-update" className={cls('UpdateMessage')}>{t('profile.updateMessage')}</div>}
      </form>
    </div>
  );
};

export default UpdateProfile;
