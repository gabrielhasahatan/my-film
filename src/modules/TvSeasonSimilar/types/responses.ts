import { TvSeasonSimilarResultEntity } from "./entity"

export type TvSeasonSimilarResponses = {
  page: number,
  results: TvSeasonSimilarResultEntity[],
  total_pages: number,
  total_results: number
}
