import React from 'react';
import YouTube from 'react-youtube';
import useGetMovieTrailer from '../../../../services/useGetMovieTrailer';
import getVideoDimensions from '../../../../lib/getVideoDimensions';
import useWindowDimensions from '../../../../lib/useWindowDimensions';
import './MovieVideo.css';

const MovieVideo = ({ YTSInfo, cls }) => {
  const { height, width } = useWindowDimensions();
  const { trailerId } = useGetMovieTrailer(YTSInfo.title_long);
  const trailerDimensions = getVideoDimensions(height, width);
  const trailerOptions = {
    ...trailerDimensions,
    playerVars: {
      color: 'white',
      modestbranding: 1,
      rel: 0,
    },
  };
  return (
    <div className={cls('Trailer', ['Trailer'])}>
      {trailerId && <YouTube videoId={trailerId} opts={trailerOptions} />}
    </div>
  );
};

export default MovieVideo;
