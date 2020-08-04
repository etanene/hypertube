import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import MovieMenu from './MovieMenu/MovieMenu';
import MovieList from './MovieList/MovieList';
import useMovieSearch from '../../../services/useMovieSearch';
import MoviesContext from '../../../context/moviesContext';
import AuthContext from '../../../context/authContext';
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
  const { stateAuthReducer } = useContext(AuthContext);
  useEffect(() => {
    setMovies(movies);
  }, [movies]);

  if (!stateAuthReducer.isAuth) {
    return (<Redirect to="/login" />);
  }

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
