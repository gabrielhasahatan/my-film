"use client"
import { Button } from '@/components/ui/button';
import { MediaPlayer, MediaPlayerInstance, MediaProvider, useMediaRemote, useMediaState } from '@vidstack/react';
import { Volume2, VolumeOff } from 'lucide-react';
import { RefObject } from 'react';

const MuteButton = () => {
  const remote = useMediaRemote()
  const muted = useMediaState('muted')

  const toggleMuted = () => {
    muted ? remote.unmute() : remote.mute()
  }
  return (
    <>
      <Button onClick={toggleMuted} className='absolute bottom-3 z-5 w-fit right-3 p-2 md:p-4 bg-white/20 rounded-full m-2 2xl:p-6 md:m-6'>
        {muted ? <VolumeOff className='size-5 md:size-8 2xl:size-16' /> : <Volume2 className='size-5 md:size-8 2xl:size-16' />}
      </Button>
    </>
  )
}

const TvSeasonTrailerHeadless = ({ href, playerRef }: { href: string, playerRef?: RefObject<MediaPlayerInstance | null> }) => {


  return (
    <MediaPlayer
      ref={playerRef}
      style={{ aspectRatio: "16/7", width: "100%", }}
      muted
      title="Trailer"
      src={{
        src: `youtube/${href}`,
        type: "video/youtube"
      }}
      autoPlay
      loop
      playsInline
    >
      <MediaProvider />
      <MuteButton />
    </MediaPlayer>
  )
}

export default TvSeasonTrailerHeadless
