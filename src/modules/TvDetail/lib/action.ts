"use server"
import { TvListDao } from "@/shared/lib/dao"

export const TvTrailerList = async (id: string) => {
  return await TvListDao.trailer(id)
}

export const TvEpisodesList = async ({ seriesId, seasonId }: { seriesId: string, seasonId: string }) => {
  return await TvListDao.season({ seriesId: seriesId, season: seasonId })
}
