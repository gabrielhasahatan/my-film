import { MovieCastEntity, MovieCrewEntity } from "./entity"

export type MovieActorListResponses = {
  id: number,
  cast: MovieCastEntity[],
  crew: MovieCrewEntity[]
}
