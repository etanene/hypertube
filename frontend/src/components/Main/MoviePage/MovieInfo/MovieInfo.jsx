import React from 'react';
import { cn } from '@bem-react/classname';
import './MovieInfo.css';
import MoviePoster from './MoviePoster/MoviePoster';
import MovieRating from './MovieRating/MovieRating';
import MovieCast from './MovieCast/MovieCast';

const MovieInfo = ({ info, cls }) => {
  const movieInfoCss = cn('MovieInfo');
  console.log(info);
  return (
    <div className={cls('MovieInfo', ['MovieInfo', movieInfoCss])}>
      <div>
        <MoviePoster cls={movieInfoCss} poster={info.Poster} />
        <MovieRating rating={info.imdbRating} />
      </div>
      <MovieCast info={info} cls={movieInfoCss} />
    </div>
  );
};

export default MovieInfo;
