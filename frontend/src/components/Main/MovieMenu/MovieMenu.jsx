import React, { useState } from 'react';
import { cn } from '@bem-react/classname';
import MovieSort from './MovieSort/MovieSort';
import GenreSearch from './GenreSearch/GenreSearch';
import ShowWatched from './ShowWatched/ShowWatched';
import GenreList from './GenreList/GenreList';
import './MovieMenu.css';
import GenresContext from '../../../context/genresContext';

const MovieMenu = () => {
  const movieMenuCss = cn('MovieMenu');
  const genreListCss = cn('GenreList');
  const [visibleGenres, setVisibleGenres] = useState(false);
  const [genreIndex, setGenreIndex] = useState(null);

  return (
    <GenresContext.Provider
      value={{
        visible: visibleGenres,
        setVisible: setVisibleGenres,
        genreIndex,
        setGenreIndex,
      }}
    >
      <div className={movieMenuCss()}>
        <MovieSort cls={movieMenuCss} />
        <GenreSearch cls={movieMenuCss} />
      </div>
      <ShowWatched cls={movieMenuCss} />
      <GenreList cls={genreListCss} />
    </GenresContext.Provider>
  );
};
export default MovieMenu;
