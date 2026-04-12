export type SpokenLanguageEntity = {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export type ProductionCountryEntity = {
  iso_3166_1: string;
  name: string;
}

export type ProductionCompanyEntity = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export type GenreEntity = {
  id: number;
  name: string;
}

export type CollectionEntity = {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}
