import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import ReactTooltip from 'react-tooltip';
import { useTranslation } from 'react-i18next';
import './Movie.css';

const Movie = ({
  movie,
  last,
  lastMovieRef,
  cls,
  watched,
}) => {
  const movieCss = cn('Movie');
  const overlayCss = cn('Overlay');
  const iconCss = cn('material-icons');
  const { t } = useTranslation();

  return (
    <li className={cls('Item')} ref={last ? lastMovieRef : null}>
      <Link to={`/movie/${movie.imdb_code}/${movie.id}`} className={movieCss('Link')}>
        <div className={movieCss()}>
          <img
            onError={(e) => {
              e.target.src = `http://${document.location.host}/image.png`;
            }}
            src={movie.large_cover_image ? movie.large_cover_image : movie.medium_cover_image}
            alt="Movie poster"
            className={movieCss('Image')}
          />
          {watched && (
            <div className="WatchedMovie" data-tip="test" data-for="tip">
              <ReactTooltip id="tip" place="top" effect="solid">
                {t('main.menu.showWatched')}
              </ReactTooltip>
              <i className={iconCss({}, ['WatchedMovie'])}>
                visibility
              </i>
            </div>
          )}
          {movie.rating && (
            <div className={movieCss('Rating')}>
              {`${movie.rating}\\10`}
            </div>
          )}
          <div className={(overlayCss())}>
            {movie.genres.length && (
              <div className={overlayCss('InfoBox')}>
                <div className={overlayCss('Genres')}>
                  {movie.genres.map((genre, index) => (index < 3 ? `${genre} ` : ''))}
                </div>
              </div>
            )}
            {movie.summary && (
              <div className={overlayCss('InfoBox')}>
                <div className={overlayCss('Info')}>
                  {movie.summary.length > 400 ? `${movie.summary.substring(0, 400)}...` : movie.summary}
                </div>
              </div>
            )}
            {movie.runtime !== 0 && (
              <div className={overlayCss('TimeBox')}>
                <div className={overlayCss('Info')}>
                  <span className={overlayCss('Icon', ['material-icons'])}>
                    schedule
                  </span>
                  <span className={overlayCss('Time')}>
                    {` ${movie.runtime} min`}
                  </span>
                </div>
              </div>
            )}
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
