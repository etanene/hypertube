import React, { useReducer, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MovieSearchContext from './context/movieSearchContext';
import AuthContext from './context/authContext';
import Header from './components/Header/Header';
import Movies from './components/Main/Movies/Movies';
import RegForm from './components/RegForm';
import LoginForm from './components/LoginForm';
import MoviePage from './components/Main/MoviePage/MoviePage';
import queryReducer from './reducers/query';
import authReducer from './reducers/auth';
import { userService } from './services';

const App = () => {
  const [queryOptions, dispatch] = useReducer(queryReducer, {});
  const [stateAuthReducer, authDispatch] = useReducer(authReducer, {});
  const [movies, setMovies] = useState([]);

  const user = userService.getUser();
  console.log('user localeStorage', user);
  if (user && !stateAuthReducer.isAuth) {
    authDispatch({ type: 'LOGIN', payload: user });
  }

  console.log('user', stateAuthReducer);

  return (
    <AuthContext.Provider
      value={{ stateAuthReducer, authDispatch }}
    >
      <MovieSearchContext.Provider
        value={{ movies, dispatch }}
      >
        <Header />
        <Switch>
          <Route path="/movie/:imdbId/:ytsId" component={MoviePage} />
          <Route path="/">
            {stateAuthReducer.isAuth ? <Movies queryOptions={queryOptions} setMovies={setMovies} /> : <Redirect to="/login" />}
            <Switch>
              <Route path="/signup">
                {stateAuthReducer.isAuth ? <Redirect to="/" /> : <RegForm />}
              </Route>
              <Route path="/login">
                {stateAuthReducer.isAuth ? <Redirect to="/" /> : <LoginForm />}
              </Route>
            </Switch>
          </Route>
        </Switch>
      </MovieSearchContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
