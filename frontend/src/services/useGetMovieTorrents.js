import { useEffect, useState } from 'react';

const request = require('superagent');

export default function useGetMovieTorrents(movieId) {
  const [errorYTS, setErrorYTS] = useState(false);
  const [YTSInfo, setYTSInfo] = useState(null);

  const url = 'https://yts.mx/api/v2/movie_details.json';

  useEffect(() => {
    async function searchMovies() {
      try {
        setErrorYTS(false);
        const response = await request.get(url).query({ movie_id: movieId, with_cast: true });
        if (response.body.data) {
          const data = response.body.data.movie;
          setYTSInfo(data);
        }
      } catch (e) {
        setErrorYTS(true);
        console.log(e);
      }
    }
    searchMovies();
  }, [movieId]);

  return {
    errorYTS,
    YTSInfo,
  };
}
