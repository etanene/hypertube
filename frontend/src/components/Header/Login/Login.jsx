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
  const { authDispatch, stateAuthReducer } = useContext(AuthContext);
  const profileUrl = stateAuthReducer.user ? `/profile/${stateAuthReducer.user.userId}` : '/login';
  const handleClickLogin = () => {
    setVisible((prevState) => !prevState);
  };
  const handleLogout = () => {
<<<<<<< HEAD
    async function logout() {
      await apiService.get('/api/auth/logout');
      userService.delUser();
      authDispatch({ type: 'LOGIN_LOGOUT' });
    }
    logout();
=======
    userService.delUser();
    handleClickLogin();
    authDispatch({ type: 'LOGIN_LOGOUT' });
>>>>>>> master
  };

  return (
    <div className={cls}>
      <span
        role="button"
        tabIndex={0}
        onClick={handleClickLogin}
        className={loginCss('Icon', ['material-icons'])}
      >
        person
      </span>
      {visible && (
        <ul className={loginCss('List')}>
          <li className={listCss('Item')}>
            <span className={listCss('ItemTitle')}>
              <Link onClick={handleClickLogin} className={listCss('Link', ['Link'])} to={profileUrl}>
                Profile
              </Link>
            </span>
          </li>
          <li className={listCss('Item')}>
            <span
              role="button"
              tabIndex={0}
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
