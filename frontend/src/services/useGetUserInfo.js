import { useEffect, useState } from 'react';

const axios = require('axios');

export default function useGetUserInfo(userId, isUserProfile) {
  const url = '/api/user/get';
  const [user, setUser] = useState([]);
  useEffect(() => {
    let cleanUpFn = false;
    const signal = axios.CancelToken.source();
    async function getMovieInfo() {
      try {
        const response = await axios.get(url,
          { params: { user_id: userId }, cancelToken: signal.token });
        if (response.data.length) {
          const userInfo = response.data[0];
          if (!isUserProfile && userInfo) {
            if (!cleanUpFn) {
              setUser({
                login: userInfo.login,
                photo: userInfo.photo,
                info: userInfo.info,
                last_name: userInfo.last_name,
                first_name: userInfo.first_name,
              });
            }
          } else if (!cleanUpFn) setUser(userInfo);
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (!cleanUpFn) getMovieInfo();
    return () => {
      signal.cancel('Api has been canceled');
      cleanUpFn = true;
    };
  }, [userId]);
  return { user };
}
