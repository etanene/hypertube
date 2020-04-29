import React, { useReducer, useState } from 'react';
import { cn } from '@bem-react/classname';
import MoviesContext from './context/moviesContext';
import useMovieSearch from './services/useMovieSearch';
import Header from './components/Header/Header';
import MovieMenu from './components/Main/MovieMenu/MovieMenu';
import MovieList from './components/Main/MovieList/MovieList';
import queryReducer from './reducers/query';

const App = () => {
  const [queryOptions, dispatch] = useReducer(queryReducer, {});
  const [pageNumber, setPageNumber] = useState(1);
  const {
    isLoading,
    error,
    movies,
    hasMore,
  } = useMovieSearch(queryOptions, pageNumber);
  const movieListCss = cn('MovieList');

  return (
    <MoviesContext.Provider
      value={
        {
          isLoading,
          movies,
          error,
          dispatch,
          setPageNumber,
          hasMore,
        }
      }
    >
      <Header />
      <MovieMenu />
      <MovieList cls={movieListCss} />
    </MoviesContext.Provider>
  );
};

export default App;
