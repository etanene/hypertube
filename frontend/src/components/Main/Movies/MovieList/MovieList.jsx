import React, { useCallback, useContext, useRef } from 'react';
import Loader from 'react-loader-spinner';
import { cn } from '@bem-react/classname';
import { useTranslation } from 'react-i18next';
import Movie from './Movie/Movie';
import MovieContext from '../../../../context/moviesContext';
import MovieSearchContext from '../../../../context/movieSearchContext';
import './MovieList.css';

const MovieList = () => {
  const {
    error,
    movies,
    isLoading,
    hasMore,
    userMovies,
  } = useContext(MovieContext);
  const { setPageNumber } = useContext(MovieSearchContext);
  const { t } = useTranslation();
  const movieListCss = cn('MovieList');
  const observer = useRef();
  const lastMovieRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [hasMore, setPageNumber]);
  const isMovieWatched = (imdbId) => {
    let watched = false;
    userMovies.forEach((movie) => {
      if (movie.movie_id === imdbId) watched = true;
    });
    return watched;
  };
  return (
    <div className={movieListCss('Container')}>
      <ul className={movieListCss()}>
        {movies.map((movie, index) => (
          <Movie
            cls={movieListCss}
            key={movie.id}
            movie={movie}
            last={movies.length === index + 1}
            lastMovieRef={lastMovieRef}
            watched={isMovieWatched(movie.imdb_code)}
          />
        ))}
        {isLoading && (
          <li className={movieListCss('Loader')}>
            <div className={movieListCss('LoaderBox')}>
              <Loader type="Circles" color="#551A8B" />
            </div>
          </li>
        )}
        {error && <li className={movieListCss('Message')}>{t('main.movieList.error')}</li>}
        {!isLoading && !error && !movies.length && <li className={movieListCss('Message')}>{t('main.movieList.notFound')}</li>}
      </ul>
    </div>
  );
};

export default MovieList;
