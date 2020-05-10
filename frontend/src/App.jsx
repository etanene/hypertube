import React, { useReducer, useState } from 'react';
import { Route } from 'react-router-dom';
import MovieSearchContext from './context/movieSearchContext';
import Header from './components/Header/Header';
import Movies from './components/Main/Movies/Movies';
import RegForm from './components/RegForm';
import MoviePage from './components/Main/MoviePage/MoviePage';
import queryReducer from './reducers/query';

const App = () => {
  const [queryOptions, dispatch] = useReducer(queryReducer, {});
  const [movies, setMovies] = useState([]);

  return (
    <MovieSearchContext.Provider
      value={{ movies, dispatch }}
    >
      <Header />
      <Route path="/movie/:imdbId/:ytsId" component={MoviePage} />
      <Route path="/" exact>
        <Movies queryOptions={queryOptions} setMovies={setMovies} />
      </Route>
      <Route path="/signup">
        <RegForm />
      </Route>
    </MovieSearchContext.Provider>
  );
};

export default App;
