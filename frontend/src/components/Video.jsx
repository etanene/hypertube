/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { cn } from '@bem-react/classname';
import io from 'socket.io-client';
import './Video.css';
import Loader from "react-loader-spinner";

const superagent = require('superagent');

const Video = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [showPlay, setShowPlay] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [sendPlay, setSendPlay] = useState(false);
  const playerCss = cn('Player');
  const streaming = (stream) => {
    const path = `http://${document.location.host}/api/video/${stream.path.substring(stream.path.indexOf('video/') + 'video/'.length)}`;
    setShowVideo(true);
    const hls = new Hls();
    hls.loadSource(path + stream.playlist);
    hls.attachMedia(video);
    hls.on(Hls.Events.ERROR, (event, data) => console.log(event, data));
  };
  const playVideo = () => {
    // const url = 'https://yts.mx/torrent/download/5E915039C619366E490D08DB3FFED21F3A3AE84A';
    // const quality = '720p';
    // const name = 'Godfather';
    // console.log(`http://${document.location.hostname}:8080/api/torrent/download`);
    // superagent.post(`http://${document.location.hostname}:8080/api/torrent/download`).send({
    //   movie_id: 'tt041094',
    //   name,
    //   quality,
    //   url,
    // }).then((res) => {
    //   const torrentName = res.body.name;
      const socket = io(`${document.location.hostname}:8000`, { query: { movie: window.location.pathname, torrentFile: `public/torrent-files/forrest-gump.torrent` } });
      if (!sendPlay) socket.emit('play');
      setSendPlay(true);
      setShowPlay(false);

      setIsLoading(true);
      socket.on('stream', (stream) => {
        streaming(stream);
        socket.off('stream');
      });
    // }).catch((e) => console.log(e));
  };
  return (
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
            <video id="video" className={playerCss('Movie')} controls width="640" height="360" />
        )}
      </div>
  );
};

export default Video;
