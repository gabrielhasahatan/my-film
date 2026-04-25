import TvCurrentEpisodeList from "@/modules/TvEpisodeDetail/components/tv-current-episode-list"
import TvEpisode from "@/modules/TvEpisodeDetail/components/tv-episode"
import TvEpisodeProvider from "@/modules/TvEpisodeDetail/components/tv-episode-provider"
import TvRecommendationsList from "@/modules/TvRecomendation/components/tv-recommendations-list"
import TvSeasonDetailProvider from "@/modules/TvSeasonDetail/components/tv-season-detail-provider"
import TvSeasonSimilarList from "@/modules/TvSeasonSimilar/components/tv-season-similar-list"
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
  console.log({ episodeDetail })

  if (!episodeDetail.success || !detailSeries.success) {
    return <ErrorContainer />
  }

  return (
    <TvEpisodeProvider detail={episodeDetail.data}>
      <TvSeasonDetailProvider detail={detailSeries.data}>
        <TvEpisode />
        {detailSeries.data.seasons.length > 0 && <TvCurrentEpisodeList />}
        <TvSeasonSimilarList />
        <TvRecommendationsList />
      </TvSeasonDetailProvider>
    </TvEpisodeProvider>
  )
}

export default page
