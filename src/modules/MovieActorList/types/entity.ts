export type MovieCastEntity = {
  adult: boolean,
  gender: number,
  id: number,
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: string,
  profile_path: string | null,
  cast_id: string,
  character: string,
  credit_id: string,
  order: number
}


export type MovieCrewEntity = {
  adult: boolean,
  gender: number,
  id: number,
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: string,
  profile_path: string | null,
  credit_id: string,
  department: string,
  job: string
}
