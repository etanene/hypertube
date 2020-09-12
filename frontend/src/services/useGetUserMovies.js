import { useEffect, useState } from 'react';

const axios = require('axios');

export default function useGetUserMovies(userId) {
  const url = '/api/userMovie/get';
  const [userMovies, setUserMovies] = useState([]);
  useEffect(() => {
    let cleanUpFn = false;
    const signal = axios.CancelToken.source();
    async function getMovieInfo() {
      try {
        const response = await axios.post(url, { user_id: userId }, { cancelToken: signal.token });
        if (!cleanUpFn) setUserMovies(response.data);
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
  return {
    userMovies,
  };
}
