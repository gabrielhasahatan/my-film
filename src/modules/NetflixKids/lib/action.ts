"use server"

import { DiscoverDao } from "@/shared/lib/dao"

export const MovieNetflixKidsList = async ({ page }: { page: string }) => {
  return DiscoverDao.movieNetlixKids({ page: page })
}
