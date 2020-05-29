import React from 'react';
import './Profile.css';
import PhotoInput from '../../common/PhotoInput';

const Profile = () => (
  <div>
    <PhotoInput name="photo" />
    <span>Имя</span>
    <span>Фамилия</span>
    <span>Почта</span>
    <span>Пароль</span>
  </div>
);

export default Profile;
