import { useEffect, useState } from 'react';

const request = require('superagent');

export default function useGetUserMovies(userId) {
  const url = '/api/userMovie/get';
  const [userMovies, setUserMovies] = useState([]);
  useEffect(() => {
    async function getMovieInfo() {
      try {
        const response = await request.post(url).send({ user_id: userId });
        if (response.ok) {
          console.log('UserMovies', response.body);
          setUserMovies(response.body);
        }
      } catch (e) {
        console.log(e);
      }
    }
    getMovieInfo();
  }, [userId]);
  return {
    userMovies,
  };
}
