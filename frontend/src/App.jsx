import React, { useReducer, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import MovieSearchContext from './context/movieSearchContext';
import Header from './components/Header/Header';
import Movies from './components/Main/Movies/Movies';
import RegForm from './components/RegForm';
import LoginForm from './components/LoginForm';
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
      <Switch>
        <Route path="/movie/:imdbId/:ytsId" component={MoviePage} />
        <Route path="/">
          <Movies queryOptions={queryOptions} setMovies={setMovies} />
          <Switch>
            <Route path="/signup">
              <RegForm />
            </Route>
            <Route path="/login">
              <LoginForm />
            </Route>
          </Switch>
        </Route>
      </Switch>
    </MovieSearchContext.Provider>
  );
};

export default App;
