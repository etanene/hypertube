import React from 'react';
import { cn } from '@bem-react/classname';
import './MovieCast.css';

const MovieCast = ({ info, cls }) => {
  const movieCastCss = cn('MovieCast');
  const isAvailable = (param) => param !== 'N/A';
  return (
    <div className={cls('MovieCast', ['MovieCast'])}>
      <h2 className={movieCastCss('Title')}>
        {`${info.Title} (${info.Year})`}
      </h2>
      <h4 className={movieCastCss('Info')}>
        {info.Genre}
      </h4>
      <h4 className={movieCastCss('Info')}>
        {`Director: ${info.Director}`}
      </h4>
      <h4 className={movieCastCss('Info')}>
        {`Main cast: ${info.Actors}`}
      </h4>
      <h4 className={movieCastCss('Info')}>
        {isAvailable(info.Plot) && info.Plot}
      </h4>
      <h4 className={movieCastCss('Info')}>
        {isAvailable(info.Runtime) && info.Runtime}
      </h4>
    </div>
  );
};

export default MovieCast;
