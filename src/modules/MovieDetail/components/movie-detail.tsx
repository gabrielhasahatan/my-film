"use client"
import { MovieListDao } from "@/shared/lib/dao"
import MovieDetailHead from "./movie-detail-head"
import MovieDetailProvider from "./movie-detail-provider"
import ErrorContainer from "@/components/ui/ErrorContainer"

const MovieDetail = async ({ id }: { id: string }) => {
  const detail = await MovieListDao.detail(id)


  if (!detail.success) {
    return (<ErrorContainer />)
  }


  return (
    <>
      <MovieDetailProvider detail={detail.data}>
        <div className="">
          {/*<MoviePlayer/>*/}
          <MovieDetailHead />
        </div>
      </MovieDetailProvider>
    </>
  )
}

export default MovieDetail
