import React, { useContext } from 'react';
import { cn } from '@bem-react/classname';
import MovieInfo from './MovieInfo/MovieInfo';
import useGetMovieInfo from '../../../services/useGetMovieInfo';
import MovieSearchContext from '../../../context/movieSearchContext';

const MoviePage = ({ match }) => {
  const { movies } = useContext(MovieSearchContext);
  const { movieId } = match.params;
  const movieTorrent = movies.filter((movie) => movie.imdb_code === movieId)[0];
  const {
    isLoading,
    error,
    movieInfo,
  } = useGetMovieInfo(movieId);
  console.log(movieTorrent);
  const moviePageCss = cn('MoviePage');
  return (
    <div>
      {isLoading && <div>Loading</div>}
      {error && <div>{error}</div>}
      {movieInfo && <MovieInfo cls={moviePageCss} info={movieInfo} movieTorrent={movieTorrent} />}
    </div>
  );
};

export default MoviePage;
