import React from 'react';
import { cn } from '@bem-react/classname';
import './MovieCast.css';

const MovieCast = ({ info, cls }) => {
  const movieCastCss = cn('MovieCast');
  return (
    <div className={cls('MovieCast', ['MovieCast'])}>
      <h2 className={movieCastCss('Title')}>
        {`${info.Title} (${info.Year})`}
      </h2>
      <h4 className={movieCastCss('Genre')}>
        {info.Genre}
      </h4>
      <h4 className={movieCastCss('Genre')}>
        {`Director: ${info.Director}`}
      </h4>
      <h4 className={movieCastCss('Genre')}>
        {`Main cast: ${info.Actors}`}
      </h4>
      <h4 className={movieCastCss('Genre')}>
        {info.Plot}
      </h4>
      <h4 className={movieCastCss('Genre')}>
        {info.Runtime}
      </h4>
    </div>
  );
};

export default MovieCast;
