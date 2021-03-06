import { useEffect, useReducer, useState } from 'react';
import moviesReducer from '../reducers/movies';
import getTorrentInfo from '../lib/getTorrentInfo';

const axios = require('axios');

export default function useMovieSearch(queryOptions, pageNumber) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [movies, dispatch] = useReducer(moviesReducer, []);

  const url = 'https://yts.mx/api/v2/list_movies.json';

  useEffect(() => {
    dispatch({ type: 'REMOVE_MOVIES' });
  }, [queryOptions]);

  const checkHasMore = (data) => {
    if (data.movies.length < data.limit) {
      return false;
    }
    return data.movie_count > data.limit * (data.page_number - 1) + data.movies.length;
  };

  const hasPeers = (movie) => {
    const info = getTorrentInfo(movie);
    return !info.error;
  };

  useEffect(() => {
    let cleanUpFn = false;
    const signal = axios.CancelToken.source();
    async function searchMovies() {
      try {
        if (!cleanUpFn) setIsLoading(true);
        if (!cleanUpFn) setError(false);
        const response = await axios.get(url,
          { params: { page: pageNumber, ...queryOptions }, cancelToken: signal.token });
        if (response.data.data.movie_count !== 0) {
          const { data } = response.data;
          if (!cleanUpFn) setHasMore(checkHasMore(data));
          const dataMovies = data.movies;
          const filteredMovies = dataMovies.filter((movie) => hasPeers(movie));
          // eslint-disable-next-line prefer-destructuring
          if (!filteredMovies.length) filteredMovies[0] = dataMovies[0];
          dispatch({ type: 'ADD_MOVIES', movies: filteredMovies });
        }
        if (!cleanUpFn) setIsLoading(false);
      } catch (e) {
        if (!cleanUpFn) setIsLoading(false);
        if (!cleanUpFn) setError(true);
      }
    }
    if (!cleanUpFn) searchMovies();
    return () => {
      signal.cancel('Api has been canceled');
      cleanUpFn = true;
    };
  }, [queryOptions, pageNumber]);

  return {
    isLoading,
    error,
    movies,
    hasMore,
  };
}
