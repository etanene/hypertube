import React from 'react';
import useWindowDimensions from '../../../../../lib/useWindowDimensions';
import getVideoDimensions from '../../../../../lib/getVideoDimensions';
import './MovieVideo.css';

const MovieVideo = ({ cls, hidden }) => {
  const { height, width } = useWindowDimensions();
  const videoDimensions = getVideoDimensions(height, width);
  console.log(videoDimensions);
  return (
    <div className={cls('Movie', { hidden })}>
      movie
    </div>
  );
};

export default MovieVideo;
