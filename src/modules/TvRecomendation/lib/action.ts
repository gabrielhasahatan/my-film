"use server"

import { TvListDao } from "@/shared/lib/dao"

export const RecommendationListTv = async ({ seriesId, params }: { seriesId: string, params: string }) => {
  return await TvListDao.recommendation_list({ id: seriesId, params: params })
}
