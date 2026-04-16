import { YouTubeEmbed } from '@next/third-parties/google'

const TvTrailerPlayer = ({ videoId }: { videoId: string }) => {
  return <YouTubeEmbed videoid={videoId} height={400} />
}


export default TvTrailerPlayer
