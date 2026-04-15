import { GenreEntity, ImageListBackdropsEntity, ImageListLogosEntity, ImageListPostersEntity } from "./entity"

export type ImageListResponses = {
  id: number,
  backdrops: ImageListBackdropsEntity[],
  logos: ImageListLogosEntity[],
  posters: ImageListPostersEntity[]

}

export type GenreTvResponses = {
  genres: GenreEntity[]
}

export type GenreMovieResponses = {
  genres: GenreEntity[]
}


