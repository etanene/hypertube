import { useEffect, useState } from 'react';

const request = require('superagent');

export default function useGetMovieSuggestions(movieId) {
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [errorSuggestions, setErrorSuggestions] = useState(false);
  const [movieSuggestions, setMovieSuggestions] = useState([]);

  const url = 'https://yts.mx/api/v2/movie_suggestions.json';

  useEffect(() => {
    async function getSuggestions() {
      try {
        setIsLoadingSuggestions(true);
        setErrorSuggestions(false);

        const response = await request.get(url).query({ movie_id: movieId });
        if (response.body.data.movie_count !== 0) {
          console.log('SUGGESTIONS', response.body.data.movies);
          setMovieSuggestions(response.body.data.movies);
        }
        setIsLoadingSuggestions(false);
      } catch (e) {
        setIsLoadingSuggestions(false);
        setErrorSuggestions(true);
        console.log(e);
      }
    }
    getSuggestions();
  }, [movieId]);

  return {
    isLoadingSuggestions,
    errorSuggestions,
    movieSuggestions,
  };
}
