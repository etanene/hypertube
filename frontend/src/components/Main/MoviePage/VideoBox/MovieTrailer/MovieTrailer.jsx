import React, { useContext } from 'react';
import YouTube from 'react-youtube';
import useGetMovieTrailer from '../../../../../services/useGetMovieTrailer';
import getVideoDimensions from '../../../../../lib/getVideoDimensions';
import useWindowDimensions from '../../../../../lib/useWindowDimensions';
import MovieInfoContext from '../../../../../context/MovieInfoContext';
import './MovieTrailer.css';

window.YTConfig = {
  host: 'http://www.youtube.com',
};

const MovieTrailer = ({ cls, hidden }) => {
  const { height, width } = useWindowDimensions();
  const { YTSInfo } = useContext(MovieInfoContext);
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
    <div className={cls('Trailer', { hidden })}>
      {trailerId && <YouTube videoId={trailerId} opts={trailerOptions} />}
    </div>
  );
};

export default MovieTrailer;
