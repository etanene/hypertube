import React, { useContext, useEffect } from 'react';
import { cn } from '@bem-react/classname';
import { useParams } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import MovieInfo from './MovieInfo/MovieInfo';
import useGetMovieInfo from '../../../services/useGetMovieInfo';
import useGetMovieSuggestions from '../../../services/useGetMovieSuggestions';
import MovieSearchContext from '../../../context/movieSearchContext';
import MovieSuggestions from './MovieSuggestions/MovieSuggestions';
import MovieComments from './MovieComments/MovieComments';

const MoviePage = () => {
  const { movies } = useContext(MovieSearchContext);
  const { imdbId, ytsId } = useParams();
  const movieTorrent = movies.filter((movie) => movie.imdb_code === imdbId)[0];
  const moviePageCss = cn('MoviePage');
  useEffect(() => {
    scroll.scrollToTop();
  }, [imdbId]);
  const {
    error,
    movieInfo,
  } = useGetMovieInfo(imdbId);
  const {
    errorSuggestions,
    movieSuggestions,
  } = useGetMovieSuggestions(ytsId);
  return (
    <div>
      {errorSuggestions && <div>Error suggestions</div>}
      {error && <div>{error}</div>}
      {movieInfo && <MovieInfo cls={moviePageCss} info={movieInfo} movieTorrent={movieTorrent} />}
      {movieSuggestions.length > 0 && <MovieSuggestions movies={movieSuggestions} />}
      {movieInfo && <MovieComments title={movieInfo.Title} />}
    </div>
  );
};

export default MoviePage;
