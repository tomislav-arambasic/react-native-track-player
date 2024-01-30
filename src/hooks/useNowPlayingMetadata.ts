import { useEffect, useState } from 'react';

import { Event } from '../constants';

import { useTrackPlayerEvents } from './useTrackPlayerEvents';
import { NowPlayingMetadata } from '../interfaces';
import TrackPlayer from '..';



export const useNowPlayingMetadata = (): NowPlayingMetadata | undefined => {
  const [metadata, setMetadata] = useState<NowPlayingMetadata | undefined>();

  useEffect(() => {
    let unmounted = false;
    console.log('----INIT--123---')
    TrackPlayer.getNowPlayingMetadata()
    .then(res => 
      {
        console.log('promise')
        if (unmounted) return;
        console.log('----INIT--23424234---'); setMetadata(res); console.log("INIT-----", res)
      }).catch(e => console.log("ERROR-----",e))
      return () => {
        unmounted = true;
      };
  }, [])

  useTrackPlayerEvents(
    [Event.NowPlayingMetadataChanged],
    async (event) => {
      console.log("EVENT---", metadata)
      setMetadata(event.metadata);
    }
  );

  return metadata;
};
