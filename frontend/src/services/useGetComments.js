import { useEffect, useState } from 'react';

const axios = require('axios');

export default function useGetComments(imdbId) {
  const url = '/api/comment/get';
  const [comment, setComment] = useState([]);
  useEffect(() => {
    let cleanUpFn = false;
    const signal = axios.CancelToken.source();
    async function getComments() {
      try {
        const response = await axios.post(url, { movie_id: imdbId }, { cancelToken: signal.token });
        if (!cleanUpFn) setComment(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    if (!cleanUpFn) getComments();
    return () => {
      signal.cancel('Api has been canceled');
      cleanUpFn = true;
    };
  }, [imdbId]);
  return { comment };
}
