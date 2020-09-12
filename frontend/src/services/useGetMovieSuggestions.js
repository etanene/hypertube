import { useEffect, useState } from 'react';

const axios = require('axios');

export default function useGetMovieSuggestions(movieId) {
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [errorSuggestions, setErrorSuggestions] = useState(false);
  const [movieSuggestions, setMovieSuggestions] = useState([]);

  const url = 'https://yts.mx/api/v2/movie_suggestions.json';

  useEffect(() => {
    let cleanUpFn = false;
    const signal = axios.CancelToken.source();
    async function getSuggestions() {
      try {
        if (!cleanUpFn) setIsLoadingSuggestions(true);
        if (!cleanUpFn) setErrorSuggestions(false);
        const response = await axios.get(url,
          { params: { movie_id: movieId }, cancelToken: signal.token });
        if (response.data.data.movie_count !== 0) {
          if (!cleanUpFn) setMovieSuggestions(response.data.data.movies);
        }
        if (!cleanUpFn) setIsLoadingSuggestions(false);
      } catch (e) {
        if (!cleanUpFn) setIsLoadingSuggestions(false);
        if (!cleanUpFn) setErrorSuggestions(true);
      }
    }
    if (!cleanUpFn) getSuggestions();
    return () => {
      signal.cancel('Api has been canceled');
      cleanUpFn = true;
    };
  }, [movieId]);

  return {
    isLoadingSuggestions,
    errorSuggestions,
    movieSuggestions,
  };
}
