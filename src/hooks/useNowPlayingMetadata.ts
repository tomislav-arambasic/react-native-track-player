import { useEffect, useState } from 'react';

import { Event } from '../constants';

import { useTrackPlayerEvents } from './useTrackPlayerEvents';
import { TrackMetadataBase } from '../interfaces';
import TrackPlayer from '..';



export const useNowPlayingMetadata = (): TrackMetadataBase | undefined => {
  const [metadata, setMetadata] = useState<TrackMetadataBase | undefined>();

  useEffect(() => {
    TrackPlayer.getNowPlayingMetadata()
    .then(setMetadata)
  }, [])

  useTrackPlayerEvents(
    [Event.NowPlayingMetadataChanged],
    async (metadata) => {
      setMetadata(metadata ?? undefined);
    }
  );

  return metadata;
};
