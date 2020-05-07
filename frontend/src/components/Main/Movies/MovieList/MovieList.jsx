import React, { useCallback, useContext, useRef } from 'react';
import { cn } from '@bem-react/classname';
import { animateScroll as scroll } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import Movie from './Movie/Movie';
import MovieContext from '../../../../context/moviesContext';
import './MovieList.css';

const MovieList = () => {
  const {
    isLoading,
    error,
    movies,
    setPageNumber,
    hasMore,
  } = useContext(MovieContext);
  const { t } = useTranslation();
  const movieListCss = cn('MovieList');
  const scrollUpCss = cn('ScrollUp');
  const iconCss = cn('material-icons');
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
  return (
    <div className={movieListCss('Container')}>
      <div
        className={scrollUpCss()}
        tabIndex={0}
        role="button"
        onClick={() => {
          scroll.scrollToTop();
        }}
        onKeyDown={(e) => {
          if (e.code === 'KeyW') {
            scroll.scrollToTop();
          }
        }}
      >
        <span className={iconCss({}, ['ScrollUp-Icon'])}>
          double_arrow
        </span>
      </div>
      <ul className={movieListCss()}>
        {movies.map((movie, index) => (
          <Movie
            cls={movieListCss}
            key={movie.id}
            movie={movie}
            last={movies.length === index + 1}
            lastMovieRef={lastMovieRef}
          />
        ))}
        {isLoading && <li className={movieListCss('Message')}>{t('main.movieList.loading')}</li>}
        {error && <li className={movieListCss('Message')}>{t('main.movieList.error')}</li>}
      </ul>
    </div>
  );
};

export default MovieList;
