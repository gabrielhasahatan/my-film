"use server"

import { MovieListDao } from "@/shared/lib/dao"

export const IndexTopMovie = async (params?: string) => {
  return await MovieListDao.top(params)
}

