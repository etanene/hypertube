import React, { useReducer, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MoviesContext from './context/moviesContext';
import useMovieSearch from './services/useMovieSearch';
import Header from './components/Header/Header';
import MoviePage from './components/Main/MoviePage/MoviePage';
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

  return (
    <BrowserRouter>
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
        <Route path="/movie/:movieId" component={MoviePage} />
        <Route path="/" component={MovieMenu} exact />
        <Route path="/" component={MovieList} exact />
      </MoviesContext.Provider>
    </BrowserRouter>
  );
};

export default App;
