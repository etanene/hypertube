import React, { useContext } from 'react';
import { cn } from '@bem-react/classname';
import MovieInfo from './MovieInfo/MovieInfo';
import useGetMovieInfo from '../../../services/useGetMovieInfo';
import useGetMovieSuggestions from '../../../services/useGetMovieSuggestions';
import MovieSearchContext from '../../../context/movieSearchContext';
import MovieSuggestions from './MovieSuggestions/MovieSuggestions';

const MoviePage = ({ match }) => {
  const { movies } = useContext(MovieSearchContext);
  const { imdbId, ytsId } = match.params;
  const movieTorrent = movies.filter((movie) => movie.imdb_code === imdbId)[0];
  const {
    error,
    movieInfo,
  } = useGetMovieInfo(imdbId);
  const {
    errorSuggestions,
    movieSuggestions,
  } = useGetMovieSuggestions(ytsId);
  const moviePageCss = cn('MoviePage');
  return (
    <div>
      {errorSuggestions && <div>Error suggestions</div>}
      {error && <div>{error}</div>}
      {movieInfo && <MovieInfo cls={moviePageCss} info={movieInfo} movieTorrent={movieTorrent} />}
      {movieSuggestions && <MovieSuggestions movies={movieSuggestions} />}
    </div>
  );
};

export default MoviePage;
