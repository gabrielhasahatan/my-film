"use server"
import { TvListDao } from "@/shared/lib/dao"

export const SimilarSeriesList = async ({ seriesId, params }: { seriesId: string, params: string }) => {
  return await TvListDao.similar({ seriesId: seriesId, params: params })
}
