/* eslint-disable */
import React, { useContext, useState, useEffect } from 'react';
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
  const [socket, setSocket] = useState(false);
  const [showPlay, setShowPlay] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [sendPlay, setSendPlay] = useState(false);
  const [torrentError, setTorrentError] = useState(false);
  const [torrentInfo, setTorrentInfo] = useState(false);
  const { YTSInfo, imdbId } = useContext(MovieInfoContext);
  const { t } = useTranslation();

  useEffect(() => {
    const torrent = getTorrentInfo(YTSInfo, imdbId, YTSInfo.title_long);
    if (torrent.error) {
      setTorrentError(torrent.error);
    } else {
      setTorrentInfo(torrent);
      superagent.post(`http://${document.location.hostname}:8080/api/torrent/download`)
        .send(torrent)
        .then((res) => {
          const torrentName = res.body.name;
          const sockets = io(`${document.location.hostname}:8000`, {
            query: {
              movie: window.location.pathname,
              torrentFile: `public/torrent-files/${torrentName}`
            }
          });
          sockets.on('errors', err => console.log(err) );
          setSocket(sockets);

          sockets.on('stream', (stream) => {
            streaming(stream);
            sockets.off('stream');
          });
        }).catch((e) => console.log(e));
    }
  }, []);

  const playerCss = cn('Player');

  const streaming = (stream) => {
    console.log('stream', stream);
    const path = `http://${document.location.host}/api/video/${stream.path.substring(stream.path.indexOf('video/') + 'video/'.length)}`;
    if (stream.subtitles) setSubtitles(path + stream.subtitles);
    setShowVideo(true);
    const hls = new Hls();
    hls.loadSource(path + stream.playlist);
    hls.attachMedia(video);
    hls.on(Hls.Events.ERROR, (event, data) => console.log(event, data));
  };

  const playVideo = () => {
    if (sendPlay) return ;
    socket.emit('play');
    setSendPlay(true);
    setShowPlay(false);
    setIsLoading(true);
  }

  return (
    <div>
      {torrentError && !hidden && (
        <div>
          {t('movie.movieError')}
        </div>
      )}
      {torrentInfo && !hidden && (
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
