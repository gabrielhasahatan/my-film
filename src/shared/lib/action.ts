"use server"

import { GenreListDao, MovieListDao } from "./dao"

export const ImageMovieList = async (id: string) => {
  return await MovieListDao.images_list(id)
}

export const GenreMovieList = async () => {
  return await GenreListDao.movie()
}

export const GenreTvList = async () => {
  return await GenreListDao.tv()
}
