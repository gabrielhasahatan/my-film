"use server"

import { MovieListDao } from "@/shared/lib/dao"

export const ActorMovieList = async (id: string) => {
  return await MovieListDao.actor_list(id)
}
