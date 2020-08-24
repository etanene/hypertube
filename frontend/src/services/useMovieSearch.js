import { useEffect, useReducer, useState } from 'react';
import moviesReducer from '../reducers/movies';
import getTorrentInfo from '../lib/getTorrentInfo';

const request = require('superagent');

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
    async function searchMovies() {
      try {
        setIsLoading(true);
        setError(false);

        const response = await request.get(url).query({ page: pageNumber, ...queryOptions });
        if (response.body.data.movie_count !== 0) {
          const { data } = response.body;
          setHasMore(checkHasMore(data));
          const dataMovies = data.movies;
          const filteredMovies = dataMovies.filter((movie) => hasPeers(movie));
          dispatch({ type: 'ADD_MOVIES', movies: filteredMovies });
        }
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setError(true);
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
