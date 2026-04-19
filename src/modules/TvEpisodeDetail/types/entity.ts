export type EpisodeDetailCrewEntity = {
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

export type EpisodeDetailGuestStar = {
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


export type EpisodeImageStillsEntity = {
  aspect_ratio: number,
  height: number,
  iso_639_1: string,
  file_path: string,
  vote_average: number,
  vote_count: number,
  width: number,
}
