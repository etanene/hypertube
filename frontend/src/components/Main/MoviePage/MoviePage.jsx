import React, { useEffect, useContext } from 'react';
import { cn } from '@bem-react/classname';
import { useParams } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { animateScroll as scroll } from 'react-scroll';
import MovieInfo from './MovieInfo/MovieInfo';
import useGetMovieInfo from '../../../services/useGetMovieInfo';
import useGetMovieSuggestions from '../../../services/useGetMovieSuggestions';
import useSetUserMovie from '../../../services/useSetUserMovie';
import MovieSuggestions from './MovieSuggestions/MovieSuggestions';
import MovieComments from './MovieComments/MovieComments';
import useGetMovieTorrents from '../../../services/useGetMovieTorrents';
import VideoBox from './VideoBox/VideoBox';
import MovieInfoContext from '../../../context/MovieInfoContext';
import AuthContext from '../../../context/authContext';
import './MoviePage.css';

const MoviePage = () => {
  const { imdbId, ytsId } = useParams();
  const moviePageCss = cn('MoviePage');
  useEffect(() => {
    scroll.scrollToTop();
  }, [imdbId]);
  const { stateAuthReducer } = useContext(AuthContext);
  const { errorOMDB, OMDBInfo } = useGetMovieInfo(imdbId);
  const { errorSuggestions, movieSuggestions } = useGetMovieSuggestions(ytsId);
  const { errorYTS, YTSInfo } = useGetMovieTorrents(ytsId);
  const isReady = OMDBInfo && YTSInfo && movieSuggestions.length > 0;
  const isError = errorOMDB || errorYTS;
  useSetUserMovie(stateAuthReducer.user.userId, imdbId);
  return (
    <MovieInfoContext.Provider value={{ YTSInfo, OMDBInfo, imdbId }}>
      {errorSuggestions && <div>Error suggestions</div>}
      {isError && <div>An error occurred. Please refresh the page</div>}
      {!isReady && (
        <div className={moviePageCss('LoaderBox')}>
          <div className={moviePageCss('Loader')}>
            <Loader type="Circles" color="#551A8B" />
          </div>
        </div>
      )}
      {isReady && <MovieInfo cls={moviePageCss} />}
      {isReady && <VideoBox cls={moviePageCss} />}
      {isReady && <MovieSuggestions movies={movieSuggestions} />}
      {isReady && <MovieComments title={OMDBInfo.Title} imdbId={imdbId} />}
    </MovieInfoContext.Provider>
  );
};

export default MoviePage;
