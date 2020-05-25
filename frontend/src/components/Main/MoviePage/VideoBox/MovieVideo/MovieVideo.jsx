import React from 'react';
import useWindowDimensions from '../../../../../lib/useWindowDimensions';
import getVideoDimensions from '../../../../../lib/getVideoDimensions';
import './MovieVideo.css';

const MovieVideo = ({ cls, hidden }) => {
  const { height, width } = useWindowDimensions();
  const videoDimensions = getVideoDimensions(height, width);
  return (
    <div className={cls('Movie', { hidden })}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video id="videoPlayer" controls width={videoDimensions.width} height={videoDimensions.height} className={cls('Video')}>
        <source src="http://localhost:3002/video" type="video/mp4" />
      </video>
    </div>
  );
};

export default MovieVideo;
