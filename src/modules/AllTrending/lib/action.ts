"use server"

import { TrendingListDao } from "@/shared/lib/dao"

export const TrendingAllWeek = async () => {
  return await TrendingListDao.detail_week()
}

export const TrendingAllDay = async () => {
  return await TrendingListDao.detail_day()
}
