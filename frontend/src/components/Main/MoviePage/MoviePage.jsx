import React from 'react';
import { cn } from '@bem-react/classname';
import MovieInfo from './MovieInfo/MovieInfo';
import useGetMovieInfo from '../../../services/useGetMovieInfo';

const MoviePage = ({ match }) => {
  const { movieId } = match.params;
  const {
    isLoading,
    error,
    movieInfo,
  } = useGetMovieInfo(movieId);
  const moviePageCss = cn('MoviePage');
  return (
    <div>
      {isLoading && <div>Loading</div>}
      {error && <div>{error}</div>}
      {movieInfo && <MovieInfo cls={moviePageCss} info={movieInfo} />}
    </div>
  );
};

export default MoviePage;
