"use client"

const TvEpisodePlayer = ({ seriesId, season, episode }: { seriesId: string, season: string, episode: string }) => {
  return (
    <>
      <iframe
        src={`https://vidsrcme.ru/embed/tv?tmdb=${seriesId}&season=${season}&episode=${episode}`}
        style={{ width: "100%", aspectRatio: "16/7" }}
        referrerPolicy="origin"
        allowFullScreen
        title={seriesId}
      >
      </iframe>
    </>
  )
}

export default TvEpisodePlayer
