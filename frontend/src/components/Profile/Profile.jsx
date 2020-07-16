import React, { useContext, useState } from 'react';
import { cn } from '@bem-react/classname';
import { useParams } from 'react-router-dom';
import AuthContext from '../../context/authContext';
import useGetUserInfo from '../../services/useGetUserInfo';
import './Profile.css';
import UpdateProfile from './UpdateProfile/UpdateProfile';

const superagent = require('superagent');

const Profile = () => {
  const { userId } = useParams();
  const profileCss = cn('Profile');
  const { stateAuthReducer } = useContext(AuthContext);
  const isUserProfile = Number(userId) === stateAuthReducer.user.userId;
  const { user } = useGetUserInfo(userId, isUserProfile);
  const [hiddenInput, setHiddenInput] = useState(false);
  const changeHiddenInput = () => setHiddenInput((hidden) => !hidden);
  const [passwdInput, setPasswdInput] = useState('');
  const [passwdCheck, setPasswdCheck] = useState(2);
  const checkPassword = (e) => {
    e.preventDefault();
    superagent.post('/api/auth/validatePass').send({
      user_id: stateAuthReducer.user.userId,
      password: passwdInput,
    })
      .then((res) => {
        if (!res.body.isValid) {
          setPasswdCheck(1);
        } else {
          setPasswdCheck(2);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={profileCss()}>
      <div className={profileCss('Box')}>
        {!user && (<span>User does not exist</span>)}
        {user && (
          <div>
            {user.photo && <img className={profileCss('Avatar')} src={`/api/public/photo/${user.photo}`} alt="User" />}
            <div className={profileCss('Login')}>{user.login}</div>
            {user.info && (<div className={profileCss('Info')}>{user.info}</div>)}
          </div>
        )}
        {user && isUserProfile && (
          <div>
            <button onClick={changeHiddenInput} className={profileCss('ChangeButton')}>
              <span className={profileCss('ButtonText')}>Edit profile</span>
              <span className={profileCss('ButtonText', ['material-icons'])}>lock</span>
            </button>
            {hiddenInput && (
              <div>
                <form>
                  <input
                    autoComplete="password"
                    className={profileCss('Input')}
                    type="password"
                    placeholder="Enter your password"
                    value={passwdInput}
                    onChange={(e) => {
                      setPasswdInput(e.target.value);
                    }}
                  />
                  <button onClick={(e) => checkPassword(e)} className={profileCss('InputButton')}>
                    <span className="material-icons">
                      arrow_right_alt
                    </span>
                  </button>
                </form>
                {passwdCheck === 1 && <div className={profileCss('InputError')}>Wrong password</div>}
              </div>
            )}
          </div>
        )}
        {passwdCheck === 2 && <UpdateProfile cls={profileCss} user={user} />}
      </div>
    </div>
  );
};

export default Profile;
