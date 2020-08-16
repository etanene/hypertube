import React, { useState } from 'react';
import { cn } from '@bem-react/classname';
import GenresContext from '../../../../context/genresContext';
import MovieSort from './MovieSort/MovieSort';
import GenreSearch from './GenreSearch/GenreSearch';
import GenreList from './GenreList/GenreList';
import MovieFilter from './MovieFilter/MovieFilter';
import './MovieMenu.css';

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
        <MovieFilter />
        <GenreSearch cls={movieMenuCss} />
      </div>
      <GenreList cls={genreListCss} />
    </GenresContext.Provider>
  );
};
export default MovieMenu;
