
import TvEpisode from "@/modules/TvEpisodeDetail/components/tv-episode"
import TvEpisodeProvider from "@/modules/TvEpisodeDetail/components/tv-episode-provider"
import TvSeasonDetailEpisodeList from "@/modules/TvSeasonDetail/components/tv-season-detail-episode-list"
import TvSeasonDetailProvider from "@/modules/TvSeasonDetail/components/tv-season-detail-provider"
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
      <TvSeasonDetailProvider detail={detailSeries.data}>
        <TvEpisode />
        {detailSeries.data.seasons.length > 0 && <TvSeasonDetailEpisodeList />}
      </TvSeasonDetailProvider>
    </TvEpisodeProvider>
  )
}

export default page
