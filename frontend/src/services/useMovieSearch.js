import { useEffect, useReducer, useState } from 'react';
import moviesReducer from '../reducers/movies';

const request = require('superagent');

export default function useMovieSearch(queryOptions, pageNumber) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [movies, dispatch] = useReducer(moviesReducer, []);

  const url = 'https://yts.mx/api/v2/list_movies.jsons';

  useEffect(() => {
    dispatch({ type: 'REMOVE_MOVIES' });
  }, [queryOptions]);

  // eslint-disable-next-line max-len
  const checkHasMore = (data) => data.movie_count > data.limit * (data.page_number - 1) + data.movies.length;

  useEffect(() => {
    async function searchMovies() {
      try {
        setIsLoading(true);
        setError(false);

        const response = await request.get(url).query({ ...queryOptions, page: pageNumber });
        if (response.body.data.movie_count !== 0) {
          const { data } = response.body;
          console.log('RESPONSE', response);
          console.log('PAGE', pageNumber);
          console.log('QUERY', queryOptions);
          setHasMore(checkHasMore(data));
          const dataMovies = data.movies;
          dispatch({ type: 'ADD_MOVIES', movies: dataMovies });
        }
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setError(true);
        console.log(e);
      }
    }
    searchMovies();
  }, [queryOptions, pageNumber]);

  return {
    isLoading,
    error,
    movies,
    hasMore,
  };
}
