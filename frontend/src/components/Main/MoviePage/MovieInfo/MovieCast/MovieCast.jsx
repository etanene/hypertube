import React, { useContext } from 'react';
import { cn } from '@bem-react/classname';
import MovieInfoContext from '../../../../../context/MovieInfoContext';
import './MovieCast.css';

const MovieCast = ({ cls }) => {
  const movieCastCss = cn('MovieCast');
  const { YTSInfo, OMDBInfo } = useContext(MovieInfoContext);
  const isAvailable = (param) => param !== 'N/A';
  return (
    <div className={cls('MovieCast', ['MovieCast'])}>
      <h2 className={movieCastCss('Title')}>
        {YTSInfo.title_long}
      </h2>
      <h4 className={movieCastCss('Info')}>
        {OMDBInfo && OMDBInfo.Genre}
        {!OMDBInfo && YTSInfo.genres.join(' ')}
      </h4>
      {OMDBInfo && (
      <h4 className={movieCastCss('Info')}>
        {`Director: ${OMDBInfo.Director}`}
      </h4>
      )}
      {OMDBInfo && (
      <h4 className={movieCastCss('Info')}>
        {`Main cast: ${OMDBInfo.Actors}`}
      </h4>
      )}
      <h4 className={movieCastCss('Info')}>
        {OMDBInfo && isAvailable(OMDBInfo) && OMDBInfo.Plot}
        {(!OMDBInfo || !isAvailable(OMDBInfo.Plot)) && YTSInfo.description_full
        && YTSInfo.description_full}
      </h4>
      {OMDBInfo && (
        <h4 className={movieCastCss('Info')}>
          {isAvailable(OMDBInfo.Runtime) && OMDBInfo.Runtime}
        </h4>
      )}
    </div>
  );
};

export default MovieCast;
