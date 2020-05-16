import React from 'react';
import { cn } from '@bem-react/classname';
import './MovieCast.css';

const MovieCast = ({ OMDBInfo, YTSInfo, cls }) => {
  const movieCastCss = cn('MovieCast');
  const isAvailable = (param) => param !== 'N/A';
  return (
    <div className={cls('MovieCast', ['MovieCast'])}>
      <h2 className={movieCastCss('Title')}>
        {YTSInfo.title_long}
      </h2>
      <h4 className={movieCastCss('Info')}>
        {OMDBInfo.Genre}
      </h4>
      <h4 className={movieCastCss('Info')}>
        {`Director: ${OMDBInfo.Director}`}
      </h4>
      <h4 className={movieCastCss('Info')}>
        {`Main cast: ${OMDBInfo.Actors}`}
      </h4>
      <h4 className={movieCastCss('Info')}>
        {isAvailable(OMDBInfo.Plot) && OMDBInfo.Plot}
      </h4>
      <h4 className={movieCastCss('Info')}>
        {isAvailable(OMDBInfo.Runtime) && OMDBInfo.Runtime}
      </h4>
    </div>
  );
};

export default MovieCast;
