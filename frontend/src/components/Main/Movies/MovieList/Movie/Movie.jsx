import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import './Movie.css';

const Movie = ({
  movie,
  last,
  lastMovieRef,
  cls,
}) => {
  const movieCss = cn('Movie');
  const overlayCss = cn('Overlay');
  const iconCss = cn('material-icons');

  return (
    <li className={cls('Item')} ref={last ? lastMovieRef : null}>
      <Link to={`/movie/${movie.imdb_code}/${movie.id}`} className={movieCss('Link')}>
        <div className={movieCss()}>
          <img
            onError={(e) => {
              e.target.src = './image.png';
            }}
            src={movie.large_cover_image ? movie.large_cover_image : movie.medium_cover_image}
            alt="Movie poster"
            className={movieCss('Image')}
          />
          <div className={movieCss('Rating')}>
            { movie.rating }
            /10
          </div>
          <div className={(overlayCss())}>
            <i className={iconCss({}, ['PlayIcon'])}>
              play_circle_outline
            </i>
          </div>
          <h1 className={movieCss('Title')}>
            {`${movie.title} (${movie.year})`}
          </h1>
        </div>
      </Link>
    </li>
  );
};

export default Movie;
