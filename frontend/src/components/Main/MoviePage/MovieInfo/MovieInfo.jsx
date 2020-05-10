import React from 'react';
import { cn } from '@bem-react/classname';
import './MovieInfo.css';
import MoviePoster from './MoviePoster/MoviePoster';
import MovieRating from './MovieRating/MovieRating';
import MovieCast from './MovieCast/MovieCast';

const MovieInfo = ({ info, cls, movieTorrent }) => {
  const movieInfoCss = cn('MovieInfo');
  return (
    <div className={cls('MovieInfo', [movieInfoCss])}>
      <div>
        <MoviePoster
          cls={movieInfoCss}
          poster={movieTorrent ? movieTorrent.large_cover_image : info.Poster}
        />
        {info.imdbRating !== 'N/A' && <MovieRating rating={info.imdbRating} />}
      </div>
      <MovieCast info={info} cls={movieInfoCss} />
    </div>
  );
};

export default MovieInfo;
