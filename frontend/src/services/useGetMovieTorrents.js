import { useEffect, useState } from 'react';

const axios = require('axios');

export default function useGetMovieTorrents(movieId) {
  const [errorYTS, setErrorYTS] = useState(false);
  const [YTSInfo, setYTSInfo] = useState(null);
  const url = 'https://yts.mx/api/v2/movie_details.json';

  useEffect(() => {
    let cleanUpFn = false;
    const signal = axios.CancelToken.source();
    async function searchMovies() {
      try {
        setErrorYTS(false);
        const response = await axios.get(url,
          { params: { movie_id: movieId, with_cast: true }, cancelToken: signal.token });
        if (response.data.data) {
          const data = response.data.data.movie;
          if (!cleanUpFn) setYTSInfo(data);
        }
      } catch (e) {
        if (!cleanUpFn) setErrorYTS(true);
        console.log(e);
      }
    }
    if (!cleanUpFn) searchMovies();
    return () => {
      signal.cancel('Api has been canceled');
      cleanUpFn = true;
    };
  }, [movieId]);

  return {
    errorYTS,
    YTSInfo,
  };
}
