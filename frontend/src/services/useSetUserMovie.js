import { useEffect } from 'react';

const request = require('superagent');

export default function useSetUserMovie(userId, movieId) {
  const url = '/api/userMovie/add';
  useEffect(() => {
    async function setUserMovie() {
      try {
        await request.post(url).send({ user_id: userId, movie_id: movieId });
      } catch (e) {
        console.log(e);
      }
    }
    setUserMovie();
  }, [userId]);
}
