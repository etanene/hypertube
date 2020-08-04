/* eslint-disable */
import React, { useContext, useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Loader from 'react-loader-spinner';
import { cn } from '@bem-react/classname';
import { useTranslation } from 'react-i18next';
import MovieInfoContext from '../../../../../context/MovieInfoContext';
import getTorrentInfo from '../../../../../lib/getTorrentInfo';
import './Video.css';

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
    console.log(`imdbId = ${imdbId}, YtsTitle = ${YTSInfo.title_long}`)
    const torrent = getTorrentInfo(YTSInfo, imdbId, YTSInfo.title_long);
    if (torrent.error) {
      setTorrentError(torrent.error);
    } else if (torrent.name) {
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
    initSocket.current = () => {};
    if (hls.current) hls.current.destroy();
    if (currentSocket.current) currentSocket.current.close();
  }, [imdbId]);

  const playerCss = cn('Player');

  const streaming = (stream) => {
    console.log('stream', stream);
    const path = `http://${document.location.host}/api/video/${stream.path.substring(stream.path.indexOf('video/') + 'video/'.length)}`;
    if (stream.subtitles) setSubtitles(path + stream.subtitles);
    setShowVideo(true);
    hls.current = new Hls();
    hls.current.loadSource(path + stream.playlist);
    hls.current.attachMedia(video);
    hls.current.on(Hls.Events.ERROR, (event, data) => console.log(event, data));
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
      {!playError && torrentInfo && !hidden && (
        <div
          tabIndex={0}
          role="button"
          id="container"
          className={playerCss()}
          onClick={() => playVideo()}
        >
          {showPlay && (
            <div className={playerCss('PlayBox')}>
              <span className={playerCss('PlayIcon', ['material-icons'])}>
                play_circle_outline
              </span>
            </div>
          )}
          {isLoading && !showVideo && (
            <div className={playerCss('PlayBox')}>
              <Loader type="Circles" color="#551A8B" />
            </div>
          )}
          {showVideo && (
            <video id="video" className={playerCss('Movie')} controls width="640" height="360">
              {subtitles && (
                <track src={subtitles} label="English" />
              )}
            </video>
          )}
        </div>
      )}
    </div>
  );
};

export default Video;
