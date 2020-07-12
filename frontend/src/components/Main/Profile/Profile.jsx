import React, { useContext, useState } from 'react';
import { cn } from '@bem-react/classname';
import { useParams } from 'react-router-dom';
// import PhotoInput from '../../common/PhotoInput';
import AuthContext from '../../../context/authContext';
import useGetUserInfo from '../../../services/useGetUserInfo';
import './Profile.css';

const Profile = () => {
  const { userId } = useParams();
  const profileCss = cn('Profile');
  const { stateAuthReducer } = useContext(AuthContext);
  const isUserProfile = Number(userId) === stateAuthReducer.user.userId;
  const { user } = useGetUserInfo(userId, isUserProfile);
  const [hiddenInput, setHiddenInput] = useState(false);
  const changeHiddenInput = () => setHiddenInput((hidden) => !hidden);
  return (
    <div className={profileCss()}>
      <div className={profileCss('Box')}>
        {!user && (<span>User does not exist</span>)}
        {user && (
          <div>
            <img className={profileCss('Avatar')} src="http://192.168.99.104:8080/image.png" alt="User" />
            <div className={profileCss('Login')}>{user.login}</div>
            {user.info && (<div className={profileCss('Info')}>{user.info}</div>)}
          </div>
        )}
        {user && isUserProfile && (
          <div>
            <button onClick={changeHiddenInput} className={profileCss('ChangeButton')}>
              <span>
                Edit profile
              </span>
              <span className="material-icons">
                lock
              </span>
            </button>
            {hiddenInput && (
              <div>
                <input className={profileCss('Input')} type="password" placeholder="Enter your password" />
                <span className="material-icons">
                  arrow_right_alt
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
