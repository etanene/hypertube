const getTorrentInfo = (yts, movieId, name) => {
  const { torrents } = yts;
  let maxPeers = 0;
  let url;
  let quality;
  torrents.forEach((torrent) => {
    if (torrent.peers > maxPeers) {
      maxPeers = torrent.peers;
      url = torrent.url;
      quality = torrent.quality;
    }
  });
  if (maxPeers < 10 || !url || !quality) {
    return { error: 'Not enough peers' };
  }
  return {
    url,
    name,
    quality,
    movie_id: movieId,
  };
};

export default getTorrentInfo;
