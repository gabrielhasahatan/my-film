"use server"

import { MovieListDao } from "./dao"

export const ImageMovieList = async (id: string) => {
  return await MovieListDao.images_list(id)

}
