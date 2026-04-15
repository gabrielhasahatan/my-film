"use server"
import { MovieListDao } from "@/shared/lib/dao"

export const RecommendationListMovie = async ({ id, page }: { id: string, page: string }) => {
  return MovieListDao.recommendation_list({ id: id, page: page })
}
