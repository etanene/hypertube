/* eslint-disable */
import React, { useContext, useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Loader from 'react-loader-spinner';
import { cn } from '@bem-react/classname';
import { useTranslation } from 'react-i18next';
import MovieInfoContext from '../../../../../context/MovieInfoContext';
import getTorrentInfo from '../../../../../lib/getTorrentInfo';
import './Video.css';
import Movie from "../../../Movies/MovieList/Movie/Movie";
import useWindowDimensions from "../../../../../lib/useWindowDimensions";
import getVideoDimensions from "../../../../../lib/getVideoDimensions";

const superagent = require('superagent');

const Video = ({ hidden }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [subtitles, setSubtitles] = useState(false);
  const [showPlay, setShowPlay] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [sendPlay, setSendPlay] = useState(false);
  const [torrentError, setTorrentError] = useState(false);
  const [playError, setPlayError] = useState(false);
  const [torrentInfo, setTorrentInfo] = useState(false);
  const currentSocket = useRef(false);
  const initSocket = useRef(false);
  const hls = useRef(false);
  const { YTSInfo, imdbId } = useContext(MovieInfoContext);
  const { t } = useTranslation();
  const { height, width } = useWindowDimensions();
  const trailerDimensions = getVideoDimensions(height, width);
  const playerStyle = { width: trailerDimensions.width, height: trailerDimensions.height};

  initSocket.current = (res) => {
    const torrentName = res.body.name;
    const sockets = io(`${document.location.hostname}:8000`, {
      query: {
        movie: window.location.pathname,
        torrentFile: `public/torrent-files/${torrentName}`
      }
    });
    sockets.on('errors', err => setPlayError(err) );
    currentSocket.current = sockets;

    sockets.on('stream', (stream) => {
      streaming(stream);
      sockets.off('stream');
    });
  };

  useEffect(() => {
    const torrent = getTorrentInfo(YTSInfo, imdbId, YTSInfo.title_long);
    if (torrent.error) {
      setTorrentError(torrent.error);
    } else if (torrent.name) {
      setTorrentError(false);
      superagent.post(`http://${document.location.hostname}:8080/api/torrent/download`)
        .send(torrent)
        .then((res) => {
          initSocket.current(res);
          setTorrentInfo(torrent);
        })
        .catch((e) => setPlayError(true));
    }
  }, [imdbId, YTSInfo]);

  useEffect(() => () => {
    setShowVideo(false);
    setSubtitles(false);
    setShowPlay(true);
    setIsLoading(false);
    setSendPlay(false);
    setTorrentError(false);
    setPlayError(false);
    setTorrentInfo(false);
    initSocket.current = () => {};
    if (hls.current) hls.current.destroy();
    if (currentSocket.current) currentSocket.current.close();
  }, [imdbId]);

  const playerCss = cn('Player');

  const streaming = (stream) => {
    const path = `http://${document.location.host}/api/video/${stream.path.substring(stream.path.indexOf('video/') + 'video/'.length)}`;
    if (stream.subtitles) {
      const subs = stream.subtitles.map((sub) => {
        return `http://${document.location.host}/api/${sub}`;
      });
      setSubtitles(subs);
    }
    setShowVideo(true);
    hls.current = new Hls({
      maxMaxBufferLength: 200
    });
    hls.current.loadSource(path + stream.playlist);
    hls.current.attachMedia(video);
    hls.current.on(Hls.Events.MEDIA_ATTACHED, () => {
      video.oncanplay = () => {
        video.currentTime = 0;
        video.oncanplay = null;
        setTimeout(() => {
          setIsLoading(false);
          video.classList.remove('d-none');
        }, 100);
      }
    });
  };

  const playVideo = () => {
    if (sendPlay) return ;
    currentSocket.current.emit('play');
    setSendPlay(true);
    setShowPlay(false);
    setIsLoading(true);
  };

  return (
    <div>
      {torrentError && !hidden && (
        <div>
          {t('movie.movieError')}
        </div>
      )}
      {playError && (
        <div>
          {playError === 'CNTCNNCT' && t('movie.unavailable')}
          {playError !== 'CNTCNNCT' && t('movie.playError')}
        </div>
      )}
      {!torrentError && !playError && !hidden && !torrentInfo && (
        <div>
          <Loader type="Circles" color="#551A8B" />
        </div>
      )}
      {!playError && torrentInfo && !hidden && !torrentError && (
        <div
          tabIndex={0}
          role="button"
          id="container"
          className={playerCss()}
          style={playerStyle}
          onClick={() => playVideo()}
        >
          {showPlay && (
            <div className={playerCss('PlayBox')}>
              <span className={playerCss('PlayIcon', ['material-icons'])}>
                play_circle_outline
              </span>
            </div>
          )}
          {isLoading && (
            <div className={playerCss('PlayBox')}>
              <Loader type="Circles" color="#551A8B" />
            </div>
          )}
          {showVideo && (
            <video id="video" className={playerCss('Movie' + ' d-none')} controls
                   width={trailerDimensions.width} height={trailerDimensions.height}>
              {subtitles.length && subtitles.map((sub, index) => (
                <track key={index} src={sub} label={`${YTSInfo.title_long} ${index}`} />
              ))}
            </video>
          )}
        </div>
      )}
    </div>
  );
};

export default Video;
