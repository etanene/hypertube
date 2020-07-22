import React from 'react';
import './MovieVideo.css';

const MovieVideo = ({ cls, hidden }) => {
  console.log('movie');
  return (
    <div className={cls('Movie', { hidden })}>
      movie
    </div>
  );
};

export default MovieVideo;
