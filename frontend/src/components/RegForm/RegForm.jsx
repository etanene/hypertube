import React, { useEffect } from 'react';
import { cn } from '@bem-react/classname';
// import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { useForm } from '../../hooks';
import { apiService } from '../../services';
import { REGEX } from '../../constants';

import Input from '../common/Input';
import PhotoInput from '../common/PhotoInput';
import Button from '../common/Button';
import CloseButton from '../common/CloseButton';
import './RegForm.css';

const regFormCss = cn('reg-form');
const inputCss = regFormCss('input');

const formSchema = {
  photo: {
    message: 'Required field.',
  },
  username: {
    // доступны: большие/маленькие буквы, цифры
    // длина: 4 - 12
    regex: REGEX.USERNAME,
    message: 'You can use a-z, A-Z, 0-9. Length from 4 to 12.',
  },
  email: {
    // доступны: любые символы
    // обязательно: @ и точка
    regex: REGEX.EMAIL,
    message: 'Invalid email layout.',
  },
  first_name: {
    message: 'Required field.',
  },
  last_name: {
    message: 'Required field.',
  },
  password: {
    // доступны: большие/маленькие буквы, цифры
    // обязательно: большая и маленькая буква, цифра
    // длина: 4 - 12
    regex: REGEX.PASSWORD,
    message: 'Password must contain upper and lower letter, number. Length from 4 to 12.',
  },
  confirm_password: {
    message: 'Passwords do not match.',
  },
};

const RegForm = React.memo((props) => {
  const { className } = props;

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
      message: 'Email already exists!',
      error: state.email.error,
      exists: true,
    });
  }, [state.email.value, state.email.error, fetchUser]);

  useEffect(() => {
    fetchUser({
      name: 'username',
      value: state.username.value,
      field: 'login',
      message: 'Login already exists!',
      error: state.username.error,
      exists: true,
    });
  }, [state.username.value, state.username.error, fetchUser]);
  function close() {
    return (<Redirect to="/" />);
  }
  return (
    <div className={regFormCss('modal')}>
      <CloseButton onClick={close} className={regFormCss('close-button')}> </CloseButton>
      <form onSubmit={handleSubmit} className={regFormCss({}, [className])}>
        <span className={regFormCss('form-name')}>Sign Up</span>
        <PhotoInput name="photo" error={state.photo.error} onChange={handleChangeFile} className={regFormCss('photo')}> </PhotoInput>
        <Input
          type="text"
          name="username"
          placeholder="Username"
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
          placeholder="Email"
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
          placeholder="First name"
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
          placeholder="Last name"
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
          placeholder="Password"
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
          placeholder="Confirm password"
          value={state.confirm_password.value}
          error={state.confirm_password.error}
          onChange={handleChange}
          className={inputCss}
        >
          {state.confirm_password.message}
        </Input>
        <Button type="submit" className={regFormCss('submit')}>Sign up</Button>
      </form>
    </div>
  );
});

export default RegForm;
