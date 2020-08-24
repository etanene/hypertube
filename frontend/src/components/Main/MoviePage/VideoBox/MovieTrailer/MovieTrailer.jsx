import React, { useContext } from 'react';
import useGetMovieTrailer from '../../../../../services/useGetMovieTrailer';
import getVideoDimensions from '../../../../../lib/getVideoDimensions';
import useWindowDimensions from '../../../../../lib/useWindowDimensions';
import MovieInfoContext from '../../../../../context/MovieInfoContext';
import './MovieTrailer.css';

const MovieTrailer = ({ cls, hidden }) => {
  const { height, width } = useWindowDimensions();
  const { YTSInfo } = useContext(MovieInfoContext);
  const { trailerId } = useGetMovieTrailer(YTSInfo.title_long);
  const trailerDimensions = getVideoDimensions(height, width);
  return (
    <div className={cls('Trailer', { hidden })}>
      {trailerId && (
        <iframe
          width={trailerDimensions.width}
          height={trailerDimensions.height}
          src={`https://www.youtube.com/embed/${trailerId}`}
          frameBorder="0"
          allowFullScreen
          title="video"
        />
      )}
    </div>
  );
};

export default MovieTrailer;
