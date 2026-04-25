import { TvPopularResultEntity } from "./entity"

export type TvPopularResponses = {
  page: number,
  results: TvPopularResultEntity[],
  total_pages: number,
  total_results: number
}
