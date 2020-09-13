import { useEffect, useState } from 'react';

const axios = require('axios');

export default function useGetMovieInfo(movieID) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorOMDB, setErrorOMDB] = useState(false);
  const [OMDBInfo, setOMDBInfo] = useState(null);
  const OMDB_API_KEY = '69855aa7';
  const url = 'http://www.omdbapi.com/';

  useEffect(() => {
    let cleanUpFn = false;
    const signal = axios.CancelToken.source();
    async function getMovieInfo() {
      try {
        if (!cleanUpFn) setIsLoading(true);
        if (!cleanUpFn) setErrorOMDB(false);
        const response = await axios.get(url, { params: { i: movieID, apikey: OMDB_API_KEY, plot: 'full' }, cancelToken: signal.token });
        if (response.data.Error) {
          const { data } = response;
          if (!cleanUpFn) setOMDBInfo(data);
          if (!cleanUpFn) setIsLoading(false);
        } else {
          if (!cleanUpFn) setIsLoading(false);
          if (!cleanUpFn) setErrorOMDB(response.data.Error);
        }
      } catch (e) {
        if (!cleanUpFn) setIsLoading(false);
        if (!cleanUpFn) setErrorOMDB(true);
      }
    }
    if (!cleanUpFn) getMovieInfo();
    return () => {
      signal.cancel('Api has been canceled');
      cleanUpFn = true;
    };
  }, [movieID]);
  return {
    isLoading,
    errorOMDB,
    OMDBInfo,
  };
}
