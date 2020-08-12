import { useEffect, useState } from 'react';

const request = require('superagent');

export default function useGetComments(imdbId) {
  const url = '/api/comment/get';
  const [comment, setComment] = useState([]);
  useEffect(() => {
    async function getMovieInfo() {
      try {
        const response = await request.post(url).send({ movie_id: imdbId });
        if (response.ok) {
          setComment(response.body);
        }
      } catch (e) {
        console.log(e);
      }
    }
    getMovieInfo();
  }, [imdbId]);
  return {
    comment,
  };
}
