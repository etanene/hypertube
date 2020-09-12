import React, { useEffect, useContext } from 'react';
import { cn } from '@bem-react/classname';
import MovieMenu from './MovieMenu/MovieMenu';
import MovieList from './MovieList/MovieList';
import MovieScrollUp from './MovieScrollUp/MovieScrollUp';
import useMovieSearch from '../../../services/useMovieSearch';
import useGetUserMovies from '../../../services/useGetUserMovies';
import MoviesContext from '../../../context/moviesContext';
import AuthContext from '../../../context/authContext';
import MovieSearchContext from '../../../context/movieSearchContext';
import './Movies.css';

const Movies = ({ queryOptions, setMovies }) => {
  const movieBoxCss = cn('MovieBox');
  const { stateAuthReducer } = useContext(AuthContext);
  const { pageNumber } = useContext(MovieSearchContext);
  const {
    isLoading,
    error,
    movies,
    hasMore,
  } = useMovieSearch(queryOptions, pageNumber);

  const { userMovies } = useGetUserMovies(stateAuthReducer.user.userId);

  useEffect(() => {
    let cleanUpFn = false;
    if (!cleanUpFn) setMovies(movies);
    return () => {
      cleanUpFn = true;
    };
  }, [movies]);

  return (
    <MoviesContext.Provider
      value={{
        isLoading,
        userMovies,
        error,
        movies,
        hasMore,
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
