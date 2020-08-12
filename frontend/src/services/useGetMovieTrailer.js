import { useEffect, useState } from 'react';

const request = require('superagent');

export default function useGetMovieInfo(movieTitle) {
  const [trailerId, setTrailerId] = useState(false);
  const q = `${movieTitle} trailer`;
  const key = 'AIzaSyDaCGuNDpkWrnegd6eYyZfzAjhxZp9ZmcY';
  const url = 'https://www.googleapis.com/youtube/v3/search';

  useEffect(() => {
    async function getMovieInfo() {
      try {
        const response = await request.get(url).query(
          {
            part: 'snippet',
            q,
            type: 'video',
            key,
            maxResults: 1,
          },
        );
        if (response.ok && response.body.items.length) {
          setTrailerId(response.body.items[0].id.videoId);
        }
      } catch (e) {
        console.log(e);
      }
    }
    getMovieInfo();
  }, [movieTitle]);
  return {
    trailerId,
  };
}
