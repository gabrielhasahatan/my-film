import { DiscoverMovieResultsEntity, DiscoverTvResultsEntity, GenreEntity, ImageListBackdropsEntity, ImageListLogosEntity, ImageListPostersEntity } from "./entity"

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


export type DiscoverMovieResponses = {
  page: number,
  results: DiscoverMovieResultsEntity[],
  total_pages: number,
  total_results: number
}


export type DiscoverTvResponses = {
  page: number,
  results: DiscoverTvResultsEntity[],
  total_pages: number,
  total_results: number
}
