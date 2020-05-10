import React, { useState, useEffect } from 'react';
import { cn } from '@bem-react/classname';
import MovieMenu from './MovieMenu/MovieMenu';
import MovieList from './MovieList/MovieList';
import useMovieSearch from '../../../services/useMovieSearch';
import MoviesContext from '../../../context/moviesContext';
import MovieScrollUp from './MovieScrollUp/MovieScrollUp';
import './Movies.css';

const Movies = ({ queryOptions, setMovies }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const movieBoxCss = cn('MovieBox');
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
      <div className={movieBoxCss()}>
        <MovieScrollUp />
        <div className={movieBoxCss('Container')}>
          <MovieMenu />
          <MovieList />
        </div>
      </div>
    </MoviesContext.Provider>
  );
};

export default Movies;
