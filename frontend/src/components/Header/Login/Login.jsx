import React, { useState, useContext } from 'react';
import { cn } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './Login.css';

import { userService, apiService } from '../../../services';
import AuthContext from '../../../context/authContext';

const Login = (props) => {
  const { cls } = props;
  const loginCss = cn('Login');
  const listCss = cn('LoginList');
  const [visible, setVisible] = useState(false);
  const { authDispatch } = useContext(AuthContext);

  const handleClickLogin = () => {
    setVisible((prevState) => !prevState);
  };
  const handleLogout = () => {
    apiService.get('/api/auth/logout');
    authDispatch({ type: 'LOGIN_LOGOUT' });
    userService.delUser();
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
            <span className={listCss('ItemTitle')}>
              <Link className={listCss('Link', ['Link'])} to="/profile">
                Profile
              </Link>
            </span>
          </li>
          <li className={listCss('Item')}>
            <span
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.code === 'KeyL') {
                  handleLogout();
                }
              }}
              className={listCss('ItemTitle')}
              onClick={handleLogout}
            >
              Logout
            </span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Login;
