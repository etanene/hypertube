import React, { useReducer, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MovieSearchContext from './context/movieSearchContext';
import AuthContext from './context/authContext';
import Header from './components/Header/Header';
import Movies from './components/Main/Movies/Movies';
import RegForm from './components/RegForm';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile/Profile';
import Video from './components/Video';
import ResetpwForm from './components/ResetpwForm';
import ChangepwForm from './components/ChangepwForm';
import MoviePage from './components/Main/MoviePage/MoviePage';
import queryReducer from './reducers/query';
import authReducer from './reducers/auth';
import { userService } from './services';

const App = () => {
  const [queryOptions, dispatch] = useReducer(queryReducer, {});
  const [stateAuthReducer, authDispatch] = useReducer(authReducer, {});
  const [movies, setMovies] = useState([]);

  const user = userService.getUser();
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
          <Route path="/video" component={Video} />
          <Route exact path="/">
            {stateAuthReducer.isAuth
              ? <Movies queryOptions={queryOptions} setMovies={setMovies} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/profile/:userId">
            {stateAuthReducer.isAuth ? <Profile /> : <Redirect to="/login" />}
          </Route>
          <Switch>
            <Route path="/signup">
              {stateAuthReducer.isAuth ? <Redirect to="/" /> : <RegForm />}
            </Route>
            <Route path="/login">
              {stateAuthReducer.isAuth ? <Redirect to="/" /> : <LoginForm />}
            </Route>
            <Route path="/reset">
              {stateAuthReducer.isAuth ? <Redirect to="/" /> : <ResetpwForm />}
            </Route>
            <Route path="/changepw/:uuid">
              <ChangepwForm />
            </Route>
          </Switch>
        </Switch>
      </MovieSearchContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
