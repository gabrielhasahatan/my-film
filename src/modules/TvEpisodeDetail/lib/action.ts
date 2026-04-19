"use server"

import { TvListDao } from "@/shared/lib/dao"

export const EpisodeImagesList = async ({ seriesId, season, episode }: { seriesId: string, season: string, episode: string }) => {
  return await TvListDao.episode_image_list({ seriesId: seriesId, season: season, episode: episode })
}
