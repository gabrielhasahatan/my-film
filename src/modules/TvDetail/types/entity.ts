import { type } from "os";

export type TvCreatorEntity = {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: number;
  profile_path: string;
}


export type TvGenreEntity = {
  id: number,
  name: string
}


export type TvLastEpisodeToAirEntity = {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
}

export type TvNetworkEntity = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}


export type TvProductionCompanyEntity = {
  id: number,
  logo_path: string | null,
  name: string,
  origin_country: string,
}

export type TvProductionCountryEntity = {
  iso_3166_1: string;
  name: string;
}

export type TvSeasonEntity = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export type TvSpokenLanguageEntity = {
  english_name: string;
  iso_639_1: string;
  name: string;
}


export type TvVideoTrailerResultEntity = {
  iso_639_1: string,
  iso_3166_1: string,
  name: string,
  key: string,
  site: string,
  size: number,
  type: "Clip" | "Trailer",
  official: boolean,
  published_at: string,
  id: string
}


export type TvSeasonEpisodeListEntity = {
  air_date: string;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  crew: TvSeasonCrewListEntity[];
  guest_stars: TvSeasonGuestStarListEntity[];
}

export type TvSeasonCrewListEntity = {
  department: string;
  job: string;
  credit_id: string;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

export type TvSeasonGuestStarListEntity = {
  character: string;
  credit_id: string;
  order: number;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

export type TvSeasonNetworkListEntity = {
  id: number,
  logo_path: string,
  name: string,
  origin_country: string
}
