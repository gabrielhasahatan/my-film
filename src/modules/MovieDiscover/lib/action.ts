"use server"

import { DiscoverDao } from "@/shared/lib/dao"

export const indexMovieDiscover = async ({ page }: { page: string }) => {
  return await DiscoverDao.movieIndex({ page: page })
}
