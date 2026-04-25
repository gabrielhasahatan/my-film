import { TvRecommendationResultEntity } from "./entity"

export type TvRecommendationResponses = {
  page: number,
  results: TvRecommendationResultEntity[],
  total_pages: number,
  total_results: number
}
