import { CommentsUser } from "@/modules/Comments/components/CommentsUser"
import TvRecommendationsList from "@/modules/TvRecomendation/components/tv-recommendations-list"
import TvSeasonDetailEpisodeList from "@/modules/TvSeasonDetail/components/tv-season-detail-episode-list"
import TvSeasonDetailList from "@/modules/TvSeasonDetail/components/tv-season-detail-list"
import TvSeasonDetailProvider from "@/modules/TvSeasonDetail/components/tv-season-detail-provider"
import TvSeasonSimilarList from "@/modules/TvSeasonSimilar/components/tv-season-similar-list"
import ErrorContainer from "@/shared/components/ErrorContainer"
import { TvListDao } from "@/shared/lib/dao"

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  const detail = await TvListDao.detail(id)

  if (!detail.success) {
    return <ErrorContainer />
  }


  return (
    <TvSeasonDetailProvider detail={detail.data}>
      <TvSeasonDetailList />
      {detail.data.seasons.length > 0 && <TvSeasonDetailEpisodeList />}
      <CommentsUser backdrop={detail.data.backdrop_path} media_type="tv" media_id={id} />
      <TvSeasonSimilarList />
      <TvRecommendationsList />
    </TvSeasonDetailProvider>
  )
}

export default page
