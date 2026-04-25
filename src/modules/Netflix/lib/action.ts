"use server"

import { DiscoverDao } from "@/shared/lib/dao"

export const SeriesNetflixList = async ({ page }: { page: string }) => {
  return await DiscoverDao.SeriesNetflix({ page: page })
}
