import { useEffect, useState } from 'react';

const request = require('superagent');

export default function useGetMovieInfo(movieID) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorOMDB, setErrorOMDB] = useState(false);
  const [OMDBInfo, setOMDBInfo] = useState(null);
  const OMDB_API_KEY = '69855aa7';
  const url = 'http://www.omdbapi.com/';

  useEffect(() => {
    async function getMovieInfo() {
      try {
        setIsLoading(true);
        setErrorOMDB(false);
        const response = await request.get(url).query({ i: movieID, apikey: OMDB_API_KEY, plot: 'full' });
        if (!response.body.Error) {
          const data = response.body;
          setOMDBInfo(data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setErrorOMDB(response.body.Error);
        }
      } catch (e) {
        setIsLoading(false);
        setErrorOMDB(true);
      }
    }
    getMovieInfo();
  }, [movieID]);
  return {
    isLoading,
    errorOMDB,
    OMDBInfo,
  };
}
