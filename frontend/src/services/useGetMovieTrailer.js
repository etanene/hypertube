import { useEffect, useState } from 'react';

const axios = require('axios');

export default function useGetMovieInfo(movieTitle) {
  const [trailerId, setTrailerId] = useState(false);
  const q = `${movieTitle} trailer`;
  const key = 'AIzaSyDaCGuNDpkWrnegd6eYyZfzAjhxZp9ZmcY';
  const url = 'https://www.googleapis.com/youtube/v3/search';

  useEffect(() => {
    let cleanUpFn = false;
    const signal = axios.CancelToken.source();
    async function getMovieTrailer() {
      try {
        const response = await axios.get(url,
          {
            params: {
              part: 'snippet',
              q,
              type: 'video',
              key,
              maxResults: 1,
            },
            cancelToken: signal.token,
          });
        if (response.data && response.data.items.length) {
          setTrailerId(response.data.items[0].id.videoId);
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (!cleanUpFn) getMovieTrailer();
    return () => {
      signal.cancel('Api has been canceled');
      cleanUpFn = true;
    };
  }, [movieTitle]);
  return { trailerId };
}
