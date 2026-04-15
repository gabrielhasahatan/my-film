import { TvCreatorEntity, TvGenreEntity, TvLastEpisodeToAirEntity, TvNetworkEntity, TvProductionCompanyEntity, TvProductionCountryEntity, TvSeasonEntity, TvSpokenLanguageEntity } from "./entity";

export type TvDetailResponses = {
  adult: boolean;
  backdrop_path: string;
  created_by: TvCreatorEntity[];
  episode_run_time: number[];
  first_air_date: string;
  genres: TvGenreEntity[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: TvLastEpisodeToAirEntity;
  name: string;
  next_episode_to_air: string;
  networks: TvNetworkEntity[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: TvProductionCompanyEntity[];
  production_countries: TvProductionCountryEntity[];
  seasons: TvSeasonEntity[];
  spoken_languages: TvSpokenLanguageEntity[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}
