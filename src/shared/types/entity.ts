export type ImageListLogosEntity = {
  aspect_ratio: number,
  file_path: string,
  height: number,
  iso_639_1: string,
  id: string,
  file_type: string,
  vote_average: number,
  vote_count: number,
  width: number
}

export type ImageListBackdropsEntity = {
  aspect_ratio: number,
  height: number,
  iso_639_1: string,
  file_path: string,
  vote_average: number
  vote_count: number,
  width: number
}

export type ImageListPostersEntity = {
  aspect_ratio: number,
  height: number,
  iso_639_1: string,
  file_path: string,
  vote_average: number,
  vote_count: number,
  width: number
}

export type GenreEntity = {
  id: number,
  name: string
}

export type DiscoverMovieResultsEntity = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type DiscoverTvResultsEntity = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  first_air_date: string;
  softcore: boolean;
  name: string;
  vote_average: number;
  vote_count: number;
}
