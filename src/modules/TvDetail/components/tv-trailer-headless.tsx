"use client"
import { MediaPlayer, MediaProvider, useMediaRemote, useMediaState } from '@vidstack/react';
import { Volume2, VolumeOff } from 'lucide-react';

const MuteButton = () => {
  const remote = useMediaRemote()
  const muted = useMediaState('muted')

  const toggleMuted = () => {
    muted ? remote.unmute() : remote.mute()
  }
  return (
    <>
      <div className='absolute bottom-0 w-fit right-3 p-2 md:p-4 bg-white/30 rounded-full m-2 2xl:p-6 md:m-6'>
        {muted ? <VolumeOff className='size-5 md:size-8 2xl:size-16' /> : <Volume2 className='size-5 md:size-8 2xl:size-16' />}
      </div>
    </>
  )
}

const TvTrailerHeadless = ({ href }: { href: string }) => {

  return (
    <MediaPlayer
      className='object-cover absolute inset-0 h-full'
      title="Trailer"
      src={`youtube/${href}`}
      autoPlay
      loop
      playsInline
    >
      <MediaProvider />
      <MuteButton />
    </MediaPlayer>
  )
}

export default TvTrailerHeadless
