import React from 'react';
import YouTube from 'react-youtube';
import { cn } from '@bem-react/classname';
import './MovieInfo.css';
import MoviePoster from './MoviePoster/MoviePoster';
import MovieRating from './MovieRating/MovieRating';
import MovieCast from './MovieCast/MovieCast';
import useGetMovieTrailer from '../../../../services/useGetMovieTrailer';

const MovieInfo = ({ YTSInfo, cls, OMDBInfo }) => {
  const movieInfoCss = cn('MovieInfo');
  const { trailerId } = useGetMovieTrailer(YTSInfo.title_long);
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
      {trailerId && <YouTube videoId={trailerId} />}
    </div>
  );
};

export default MovieInfo;
