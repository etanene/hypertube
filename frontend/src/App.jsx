import React, { useReducer, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import MovieSearchContext from './context/movieSearchContext';
import Header from './components/Header/Header';
import Movies from './components/Main/Movies/Movies';
import RegForm from './components/RegForm';
import MoviePage from './components/Main/MoviePage/MoviePage';
import queryReducer from './reducers/query';
import Profile from './components/Main/Profile/Profile';

const App = () => {
  const [queryOptions, dispatch] = useReducer(queryReducer, {});
  const [movies, setMovies] = useState([]);

  return (
    <MovieSearchContext.Provider
      value={{ movies, dispatch }}
    >
      <Header />
      <Switch>
        <Route path="/profile" component={Profile} />
        <Route path="/movie/:imdbId/:ytsId" component={MoviePage} />
        <Route path="/">
          <Movies queryOptions={queryOptions} setMovies={setMovies} />
          <Route path="/signup">
            <RegForm />
          </Route>
        </Route>
      </Switch>
    </MovieSearchContext.Provider>
  );
};

export default App;
