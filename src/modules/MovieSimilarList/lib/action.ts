"use server"
import { MovieListDao } from "@/shared/lib/dao"

export const SimilarMovieList = async ({ movie_id, params }: { movie_id: string, params?: string }) => {
  return await MovieListDao.similar({ movie_id, params })
}
