import React, { useReducer, useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MovieSearchContext from './context/movieSearchContext';
import AuthContext from './context/authContext';
import Header from './components/Header/Header';
import Movies from './components/Main/Movies/Movies';
import RegForm from './components/RegForm';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile/Profile';
import ResetpwForm from './components/ResetpwForm';
import ChangepwForm from './components/ChangepwForm';
import Spinner from './components/common/Spinner';
import MoviePage from './components/Main/MoviePage/MoviePage';
import queryReducer from './reducers/query';
import authReducer from './reducers/auth';
import { userService, apiService } from './services';

const App = () => {
  const [queryOptions, dispatch] = useReducer(queryReducer, {});
  const [stateAuthReducer, authDispatch] = useReducer(authReducer, {});
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = userService.getUser();
    if (user && !stateAuthReducer.isAuth) {
      authDispatch({ type: 'LOGIN', payload: user });
      setLoading(false);
    } else if (!user) {
      try {
        const GetUser = async () => {
          const {
            username,
            token,
            userId,
            photo,
          } = await apiService.post('/api/auth/user');
          if (token) {
            userService.setUser({
              username,
              token,
              userId,
              photo,
            });
            authDispatch({
              type: 'LOGIN',
              payload: {
                username,
                token,
                userId,
                photo,
              },
            });
          }
        };
        GetUser();
        setLoading(false);
      } catch (e) {
        console.log('no user');
      }
    }
  }, []);

  console.log('loading', loading);

  return (
    <AuthContext.Provider
      value={{ stateAuthReducer, authDispatch }}
    >
      <MovieSearchContext.Provider
        value={{ movies, dispatch }}
      >
        <Header />
        <Switch>
          <Route path="/movie/:imdbId/:ytsId">
            {stateAuthReducer.isAuth ? <MoviePage /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/">
            {loading
              ? <Spinner /> : <Movies queryOptions={queryOptions} setMovies={setMovies} />}
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
