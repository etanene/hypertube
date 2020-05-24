import React, { useReducer, useState } from 'react';
import { Route } from 'react-router-dom';
import MovieSearchContext from './context/movieSearchContext';
import Header from './components/Header/Header';
import Movies from './components/Main/Movies/Movies';
import MoviePage from './components/Main/MoviePage/MoviePage';
import queryReducer from './reducers/query';
import userReducer from './reducers/user';

// удалить, когда будет авторизация
const userDefault = {
  id: 1,
  username: 'root',
  logged: true,
  photo: '/api/public/photo/root',
};

const App = () => {
  const [queryOptions, dispatch] = useReducer(queryReducer, {});
  const [movies, setMovies] = useState([]);
  const [user, userDispatch] = useReducer(userReducer, userDefault);

  return (
    <MovieSearchContext.Provider
      value={{
        movies,
        dispatch,
        user,
        userDispatch,
      }}
    >
      <Header />
      <Route path="/movie/:imdbId/:ytsId" component={MoviePage} />
      <Route path="/" exact>
        <Movies queryOptions={queryOptions} setMovies={setMovies} />
      </Route>
    </MovieSearchContext.Provider>
  );
};

export default App;
