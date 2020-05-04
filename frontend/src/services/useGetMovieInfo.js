import { useEffect, useState } from 'react';

const request = require('superagent');

export default function useGetMovieInfo(movieID) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movieInfo, setMovieInfo] = useState(null);
  const OMDB_API_KEY = '69855aa7';
  const url = 'http://www.omdbapi.com/';

  useEffect(() => {
    async function getMovieInfo() {
      try {
        setIsLoading(true);
        setError(false);
        const response = await request.get(url).query({ i: movieID, apikey: OMDB_API_KEY });
        console.log(response);
        if (!response.body.Error) {
          const data = response.body;
          setMovieInfo(data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setError(response.body.Error);
        }
      } catch (e) {
        setIsLoading(false);
        setError(true);
        console.log(e);
      }
    }
    getMovieInfo();
  }, [movieID]);
  return {
    isLoading,
    error,
    movieInfo,
  };
}
