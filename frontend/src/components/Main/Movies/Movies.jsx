import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import MovieMenu from './MovieMenu/MovieMenu';
import MovieList from './MovieList/MovieList';
import MovieScrollUp from './MovieScrollUp/MovieScrollUp';
import useMovieSearch from '../../../services/useMovieSearch';
import useGetUserMovies from '../../../services/useGetUserMovies';
import MoviesContext from '../../../context/moviesContext';
import AuthContext from '../../../context/authContext';
import './Movies.css';

const Movies = ({ queryOptions, setMovies }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const movieBoxCss = cn('MovieBox');
  const { stateAuthReducer } = useContext(AuthContext);
  const {
    isLoading,
    error,
    movies,
    hasMore,
  } = useMovieSearch(queryOptions, pageNumber);

  if (!stateAuthReducer.isAuth) {
    return (<Redirect to="/login" />);
  }

  const { userMovies } = useGetUserMovies(stateAuthReducer.user.userId);
  useEffect(() => {
    setMovies(movies);
  }, [movies]);

  return (
    <MoviesContext.Provider
      value={{
        isLoading,
        userMovies,
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
