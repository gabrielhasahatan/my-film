import { EpisodeDetailCrewEntity, EpisodeDetailGuestStar, EpisodeImageStillsEntity } from "./entity";

export type EpisodeDetailResponses = {
  air_date: string;
  episode_number: number;
  name: string;
  overview: string;
  id: number;
  production_code: string;
  runtime: number;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  crew: EpisodeDetailCrewEntity[];
  guest_stars: EpisodeDetailGuestStar[];
}


export type EpisodeImagesResponses = {
  id: number,
  stills: EpisodeImageStillsEntity[]
}
