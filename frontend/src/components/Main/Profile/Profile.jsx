import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
// import PhotoInput from '../../common/PhotoInput';
import AuthContext from '../../../context/authContext';
import useGetUserInfo from '../../../services/useGetUserInfo';
import './Profile.css';

const Profile = () => {
  const { userId } = useParams();
  const { stateAuthReducer } = useContext(AuthContext);
  const isUserProfile = userId === stateAuthReducer.user.user_id;
  const { user } = useGetUserInfo(userId, isUserProfile);
  console.log(user);
  return (
    <div>
      {!user && (<span>User does not exist</span>)}
      {user
      && (
        <div>
          <img src={user.photo} alt="User" />
        </div>
      )}
    </div>
  );
};

export default Profile;
