"use server"

import { DiscoverDao } from "@/shared/lib/dao"

export const indexTvDiscover = async ({ page }: { page: string }) => {
  return await DiscoverDao.tvIndex({ page: page })
}
