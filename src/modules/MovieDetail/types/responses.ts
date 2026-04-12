import { CollectionEntity, GenreEntity, ProductionCompanyEntity, ProductionCountryEntity, SpokenLanguageEntity } from "./entity";

export type DetailMovieResponses = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: CollectionEntity | null;
  budget: number;
  genres: GenreEntity[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompanyEntity[];
  production_countries: ProductionCountryEntity[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguageEntity[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
