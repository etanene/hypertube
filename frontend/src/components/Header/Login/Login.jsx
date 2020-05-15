import React, { useState } from 'react';
import { cn } from '@bem-react/classname';
import './Login.css';

const Login = (props) => {
  const { cls } = props;
  const loginCss = cn('Login');
  const listCss = cn('LoginList');
  const [visible, setVisible] = useState(false);
  const handleClickLogin = () => {
    setVisible((prevState) => !prevState);
  };

  return (
    <div className={cls}>
      <span
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.code === 'KeyL') {
            handleClickLogin();
          }
        }}
        onClick={handleClickLogin}
        className={loginCss('Icon', ['material-icons'])}
      >
        person
      </span>
      {visible
      && (
        <ul className={loginCss('List')}>
          <li className={listCss('Item')}>
            <span className={listCss('ItemTitle')}>Profile</span>
          </li>
          <li className={listCss('Item')}>
            <span className={listCss('ItemTitle')}>Logout</span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Login;
