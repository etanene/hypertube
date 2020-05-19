import React from 'react';
import { cn } from '@bem-react/classname';
import './MovieInfo.css';
import MoviePoster from './MoviePoster/MoviePoster';
import MovieRating from './MovieRating/MovieRating';
import MovieCast from './MovieCast/MovieCast';

const MovieInfo = ({ YTSInfo, cls, OMDBInfo }) => {
  const movieInfoCss = cn('MovieInfo');
  return (
    <div className={cls('MovieInfo')}>
      <div className={cls('PosterContainer')}>
        <MoviePoster
          cls={movieInfoCss}
          poster={YTSInfo.large_cover_image}
        />
        <MovieRating rating={YTSInfo.rating} />
      </div>
      <MovieCast OMDBInfo={OMDBInfo} cls={movieInfoCss} YTSInfo={YTSInfo} />
    </div>
  );
};

export default MovieInfo;
