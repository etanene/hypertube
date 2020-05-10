import React from 'react';
import { cn } from '@bem-react/classname';
import { useTranslation } from 'react-i18next';
import Movie from '../../Movies/MovieList/Movie/Movie';
import '../../Movies/MovieList/MovieList.css';
import './MovieSuggestions.css';

const MovieSuggestions = (props) => {
  const { movies } = props;
  const { t } = useTranslation();
  const movieListCss = cn('MovieList');
  const movieSuggestionsCss = cn('MovieSuggestions');
  return (
    <div className={movieSuggestionsCss()}>
      <span className={movieSuggestionsCss('Message')}>{t('movie.movieSuggestions')}</span>
      <ul className={movieListCss()}>
        {movies.map((movie, index) => (
          index < 3
          && (
            <Movie
              cls={movieListCss}
              key={movie.id}
              movie={movie}
            />
          )
        ))}
      </ul>
    </div>
  );
};

export default MovieSuggestions;
