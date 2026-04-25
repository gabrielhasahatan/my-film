"use server"
import { TvListDao } from "@/shared/lib/dao"

export const IndexTopTv = async ({ page }: { page: string }) => {
  return await TvListDao.top({ page: page })
}
