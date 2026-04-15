import { Separator } from "@/components/ui/separator"
import MovieActorList from "@/modules/MovieActorList/components/movie-actor-list"
import MovieDetailHead from "@/modules/MovieDetail/components/movie-detail-head"
import MovieDetailProvider from "@/modules/MovieDetail/components/movie-detail-provider"
import MovieRecommendationsList from "@/modules/MovieRecomendation/components/movie-recommendations-list"
import MovieSimilarList from "@/modules/MovieSimilarList/components/movie-similar-list"
import ErrorContainer from "@/shared/components/ErrorContainer"
import { MovieListDao } from "@/shared/lib/dao"

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  const detail = await MovieListDao.detail(id)

  if (!detail.success) {
    return (<ErrorContainer />)
  }


  return (
    <MovieDetailProvider detail={detail.data}>
      <MovieDetailHead />
      <MovieActorList />
      <MovieSimilarList />
      <MovieRecommendationsList />
    </MovieDetailProvider>
  )

}

export default page
