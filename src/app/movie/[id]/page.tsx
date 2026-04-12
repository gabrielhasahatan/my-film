import ErrorContainer from "@/components/ui/ErrorContainer"
import MovieDetailHead from "@/modules/MovieDetail/components/movie-detail-head"
import MovieDetailProvider from "@/modules/MovieDetail/components/movie-detail-provider"
import { MovieListDao } from "@/shared/lib/dao"

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  const detail = await MovieListDao.detail(id)

  if (!detail.success) {
    return (<ErrorContainer />)
  }

  console.log({ detail })

  return (
    <MovieDetailProvider detail={detail.data}>
      <div className="">
        {/*<MoviePlayer/>*/}
        <MovieDetailHead />
      </div>
    </MovieDetailProvider>
  )

}

export default page
