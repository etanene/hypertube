import React from 'react';
import { cn } from '@bem-react/classname';
import './MoviePoster.css';

const MoviePoster = ({ poster }) => {
  const moviePosterCss = cn('MoviePoster');
  return (
    <img
      src={poster}
      alt="Movie Poster"
      className={moviePosterCss()}
      onError={(e) => {
        e.target.src = `http://${document.location.host}/image.png`;
      }}
    />
  );
};

export default MoviePoster;
