const fs = require('fs');
const https = require('https');
const { InternalError } = require('../errors');
const { validateService } = require('../services');

const download = async (req, res) => {
  try {
    const torrent = req.body;
    validateService.validateTorrent(torrent);
    const file = fs.createWriteStream(`./public/torrents/${torrent.name}_${torrent.movie_id}_${torrent.quality}.torrent`);
    https.get(torrent.url, (response) => {
      response.pipe(file);
    }).on('error', (e) => {
      fs.unlink('./public/torrents/test.torrent');
      res.send(e.message);
    });
    res.send('ok');
  } catch (e) {
    if (e instanceof Error) {
      console.log(e);
      console.log(e);
      res.status(e.status || 500).send(new InternalError());
    } else {
      console.log(e);
      console.log(e);
      res.status(e.status || 500).send(e);
    }
  }
};

module.exports = {
  download,
};
