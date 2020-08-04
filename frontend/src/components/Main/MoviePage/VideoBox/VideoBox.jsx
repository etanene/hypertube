import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@bem-react/classname';
import MovieTrailer from './MovieTrailer/MovieTrailer';
import Video from './Video/Video';
import './VideoBox.css';

const VideoBox = ({ cls }) => {
  const movieVideoCss = cn('VideoBox');
  const { t } = useTranslation();
  const playerParams = t('movie.moviePlayer.params', { returnObjects: true });
  const [playerParam, setPlayerParam] = useState(playerParams[0]);
  return (
    <div className={cls('VideoBox', ['VideoBox'])}>
      <div className={movieVideoCss('Menu')}>
        <div
          className={movieVideoCss('MenuItem', { active: playerParam === playerParams[0] })}
          tabIndex={0}
          role="button"
          onClick={() => {
            setPlayerParam(playerParams[0]);
          }}
        >
          <span className={movieVideoCss('MenuText')}>{playerParams[0]}</span>
        </div>
        <div
          className={movieVideoCss('MenuItem', { active: playerParam === playerParams[1] })}
          tabIndex={0}
          role="button"
          onClick={() => {
            setPlayerParam(playerParams[1]);
          }}
        >
          <span className={movieVideoCss('MenuText')}>{playerParams[1]}</span>
        </div>
      </div>
      <MovieTrailer hidden={playerParam !== playerParams[0]} cls={movieVideoCss} />
      <Video hidden={playerParam !== playerParams[1]} cls={movieVideoCss} />
    </div>
  );
};

export default VideoBox;
