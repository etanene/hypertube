const fs = require('fs');
const https = require('https');
const { InternalError } = require('../errors');
const { validateService } = require('../services');

const download = async (req, res) => {
  try {
    const torrent = req.body;
    validateService.validateTorrent(torrent);
    const name = `${torrent.name}_${torrent.movie_id}_${torrent.quality}.torrent`;
    const file = fs.createWriteStream(`./public/torrent-files/${name}`);
    https.get(torrent.url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          res.send({ name });
        });
      });
    }).on('error', (e) => {
      fs.unlink(`./public/torrent-files/${name}`);
      res.send(e.message);
    });
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
