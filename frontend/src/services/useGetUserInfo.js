import { useEffect, useState } from 'react';

const request = require('superagent');

export default function useGetUserInfo(userId, isUserProfile) {
  const url = '/api/user/get';
  const [user, setUser] = useState([]);
  useEffect(() => {
    async function getMovieInfo() {
      try {
        const response = await request.get(url).query({ user_id: userId });
        if (response.ok) {
          const userInfo = response.body[0];
          if (!isUserProfile && userInfo) {
            setUser({ login: userInfo.login, photo: userInfo.photo, info: userInfo.info });
          } else {
            setUser(userInfo);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
    getMovieInfo();
  }, [userId]);
  return { user };
}
