import { useEffect, useState } from 'react';

import { Event } from '../constants';

import { useTrackPlayerEvents } from './useTrackPlayerEvents';
import { TrackMetadataBase } from '../interfaces';
import TrackPlayer from '..';



export const useNowPlayingMetadata = (): TrackMetadataBase | undefined => {
  const [metadata, setMetadata] = useState<TrackMetadataBase | undefined>();

  useEffect(() => {
    TrackPlayer.getActiveTrack()
    .then(activeTrack => {
      setMetadata({
        artist: activeTrack?.artist,
        title: activeTrack?.title,
        artwork: activeTrack?.artwork,
        album:activeTrack?.album,
        date:activeTrack?.date,
        description:activeTrack?.description,
        duration:activeTrack?.duration,
        genre:activeTrack?.genre,
        isLiveStream:activeTrack?.isLiveStream,
        rating:activeTrack?.rating,
      })
    })
  }, [])

  useTrackPlayerEvents(
    [Event.NowPlayingMetadataChanged],
    async (metadata) => {
      setMetadata(metadata ?? undefined);
    }
  );

  return metadata;
};
