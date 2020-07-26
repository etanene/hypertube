import React, { useState } from 'react';
import io from 'socket.io-client';
import './Video.css';

const Video = () => {
  const [showVideo, setShowVideo] = useState(false);
  const streaming = (stream) => {
    console.log(stream);
    const path = `http://192.168.99.104:8080/api/video/${stream.path.substring(stream.path.indexOf('video/') + 'video/'.length)}`;
    setShowVideo(true);
    // eslint-disable-next-line no-undef
    const hls = new Hls();
    hls.loadSource(path + stream.playlist);
    // eslint-disable-next-line no-undef
    hls.attachMedia(video);
    // eslint-disable-next-line no-undef
    hls.on(Hls.Events.ERROR, (event, data) => console.log(event, data));
  };

  const socket = io('http://192.168.99.104:8000', { query: { movie: window.location.pathname, torrentFile: 'public/torrent-files/forrest-gump.torrent' } });
  console.log(socket);
  socket.on('stream', (stream) => {
    streaming(stream);
    socket.off('stream');
  });
  return (
    <div
      tabIndex={0}
      role="button"
      id="container"
      className="player player_empty"
      onClick={() => {
        socket.emit('play');
      }}
    >
      <div className="player__button">
        {showVideo && (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video id="video" controls width="640" height="360" />
        )}
        <div />
        <div />
        <div />
        <div />
      </div>
      <div className="player__errors" />
    </div>
  );
};

export default Video;
