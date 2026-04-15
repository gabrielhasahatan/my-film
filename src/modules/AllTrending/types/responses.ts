import { TrendingResultEntity } from "./entity"

export type TrendingListResponses = {
  page: number,
  results: TrendingResultEntity[],
  total_pages: number,
  total_results: number
}
