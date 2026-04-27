"use server"

import { DiscoverDao } from "@/shared/lib/dao"

export const SeriesNetflixList = async ({ page }: { page: string }) => {
  return await DiscoverDao.SeriesNetflix({ page: page })
}

export const SeriesAllProviderList = async ({ page, idProvider }: { idProvider: string, page: string }) => {
  return await DiscoverDao.seriesAll({ idProvider: idProvider, page: page })
}
