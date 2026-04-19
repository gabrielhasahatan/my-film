import TvDetailEpisodeList from "@/modules/TvDetail/components/tv-detail-episode-list"
import TvDetailProvider from "@/modules/TvDetail/components/tv-detail-provider"
import TvEpisode from "@/modules/TvEpisodeDetail/components/tv-episode"
import TvEpisodeProvider from "@/modules/TvEpisodeDetail/components/tv-episode-provider"
import ErrorContainer from "@/shared/components/ErrorContainer"
import { TvListDao } from "@/shared/lib/dao"

const page = async (
  { params }: {
    params: Promise<{
      id: string,
      seasonId: string,
      episodeId: string
    }>
  }) => {
  const pageParams = await params

  const episodeDetail = await TvListDao.episode({ seriesId: pageParams.id, season: pageParams.seasonId, episode: pageParams.episodeId })
  const detailSeries = await TvListDao.detail(pageParams.id)

  if (!episodeDetail.success || !detailSeries.success) {
    return <ErrorContainer />
  }

  return (
    <TvEpisodeProvider detail={episodeDetail.data}>
      <TvDetailProvider detail={detailSeries.data}>
        <TvEpisode />
        {detailSeries.data.seasons.length > 0 && <TvDetailEpisodeList />}
      </TvDetailProvider>
    </TvEpisodeProvider>
  )
}

export default page
