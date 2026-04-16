"use server"
import { TvListDao } from "@/shared/lib/dao"

export const TvTrailerList = async (id: string) => {
  return await TvListDao.trailer(id)
}
