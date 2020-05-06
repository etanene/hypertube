import React, { useState, useEffect } from 'react';
import MovieMenu from './MovieMenu/MovieMenu';
import MovieList from './MovieList/MovieList';
import useMovieSearch from '../../../services/useMovieSearch';
import MoviesContext from '../../../context/moviesContext';

const Movies = ({ queryOptions, setMovies }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const {
    isLoading,
    error,
    movies,
    hasMore,
  } = useMovieSearch(queryOptions, pageNumber);
  useEffect(() => {
    setMovies(movies);
  }, [movies]);
  return (
    <MoviesContext.Provider
      value={{
        isLoading,
        error,
        movies,
        hasMore,
        setPageNumber,
      }}
    >
      <MovieMenu />
      <MovieList />
    </MoviesContext.Provider>
  );
};

export default Movies;
