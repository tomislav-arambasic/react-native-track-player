import { useState } from 'react';

import { Event } from '../constants';

import { useTrackPlayerEvents } from './useTrackPlayerEvents';
import { TrackMetadataBase } from '../interfaces';

export const useMetadata = (): TrackMetadataBase | undefined => {
  const [metadata, setMetadata] = useState<TrackMetadataBase | undefined>();



  useTrackPlayerEvents(
    [Event.NowPlayingMetadataChanged],
    async (metadata) => {
      setMetadata(metadata ?? undefined);
    }
  );

  return metadata;
};
