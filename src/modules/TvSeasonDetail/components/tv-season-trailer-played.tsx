import { YouTubeEmbed } from '@next/third-parties/google'

const TvSeasonTrailerPlayer = ({ videoId }: { videoId: string }) => {
  return <YouTubeEmbed videoid={videoId} height={400} />
}


export default TvSeasonTrailerPlayer
