import React, { useContext } from 'react';
import { cn } from '@bem-react/classname';
import './MovieInfo.css';
import MoviePoster from './MoviePoster/MoviePoster';
import MovieRating from './MovieRating/MovieRating';
import MovieCast from './MovieCast/MovieCast';
import MovieInfoContext from '../../../../context/MovieInfoContext';

const MovieInfo = ({ cls }) => {
  const movieInfoCss = cn('MovieInfo');
  const { YTSInfo } = useContext(MovieInfoContext);
  return (
    <div className={cls('MovieInfo')}>
      <div className={cls('PosterContainer')}>
        <MoviePoster
          cls={movieInfoCss}
          poster={YTSInfo.large_cover_image}
        />
        {YTSInfo.rating !== 0 && <MovieRating rating={YTSInfo.rating} />}
      </div>
      <MovieCast cls={movieInfoCss} />
    </div>
  );
};

export default MovieInfo;
