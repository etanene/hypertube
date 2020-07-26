const express = require('express');
const cors = require('cors');
const session = require('express-session');
const sock = require('socket.io');
const path = require('path');
const http = require('http');
const router = require('./routes');
const TorrentClient = require('./TorrentClient/TorrentClient');
const Stream = require('./Stream/Stream');

const app = express();
const port = process.env.PORT || 8000;
const server = http.createServer(app);
const io = sock(server);
app.use('/public', express.static(path.resolve(__dirname, '../public')));
app.use('/video', express.static(path.resolve(__dirname, '../video')));
app.use(cors());
app.use(session({
  secret: 'hypertube',
  saveUninitialized: false,
  resave: false,
}));
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const torrents = [];
const streams = [];

io.on('connection', async (socket) => {
  const { movie } = socket.handshake.query;
  const { torrentFile } = socket.handshake.query;

  console.log(movie);

  if (!torrents[movie]) torrents[movie] = new TorrentClient('video');
  if (!streams[movie]) streams[movie] = new Stream();

  socket.join(movie);

  socket.on('play', async () => {
    if (torrents[movie].status === 'idle') {
      torrents[movie].initialize(torrentFile)
      // eslint-disable-next-line max-len
        .then(() => streams[movie].initialize(torrents[movie].files.path, torrents[movie].downloads))
        .then(() => streams[movie].createPlaylist())
        .then(() => {
          // eslint-disable-next-line max-len
          const subtitlesFile = streams[movie].files.subtitles.length ? streams[movie].files.subtitles[0] : null;
          if (subtitlesFile) return torrents[movie].download(subtitlesFile);
          return Promise.resolve();
        })
        .then(() => streams[movie].convertSubtitles())
        .then(() => {
          torrents[movie].events.on('piece-written', () => { streams[movie].downloaded += torrents[movie].parser.BLOCK_SIZE; });
          torrents[movie].events.on('files-checked', (size) => { streams[movie].downloaded += size; });
          streams[movie].events.on('manifest-created', () => {
            socket.emit('stream', { path: streams[movie].path, playlist: streams[movie].playlist, subtitles: streams[movie].subtitles });
            torrents[movie].events.removeAllListeners('piece-written');
            torrents[movie].events.removeAllListeners('files-checked');
          });

          streams[movie].convertVideo();

          return torrents[movie].download(streams[movie].files.movie);
        })
        .then(() => {
          streams[movie].slowConversion = false;
          streams[movie].restart = false;
        })
        .catch((error) => {
          if (torrents[movie]) torrents[movie].close();
          if (streams[movie]) streams[movie].close();
          console.log(`emit error: ${error}`);
          socket.in(movie).emit('errors', error);
          // for some reason socket.in doesn't send to self
          socket.emit('errors', error);
        });
    } else if (streams[movie].ready) socket.emit('stream', { path: streams[movie].path, playlist: streams[movie].playlist, subtitles: streams[movie].subtitles });
    else {
      streams[movie].events.on('manifest-created', () => {
        socket.emit('stream', { path: streams[movie].path, playlist: streams[movie].playlist, subtitles: streams[movie].subtitles });
      });
    }
  });

  socket.on('disconnect', () => {
    if (io.sockets.adapter.rooms[movie] === undefined) {
      if (torrents[movie]) torrents[movie].close();
      if (streams[movie]) streams[movie].close();
    }
  });
});

app.use('/', router);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
