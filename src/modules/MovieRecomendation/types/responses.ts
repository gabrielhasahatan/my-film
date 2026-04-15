import { MovieRecommendationResultEntity } from "./entity"

export type MovieRecommendationsResponses = {
  page: number,
  results: MovieRecommendationResultEntity[],
  total_pages: number,
  total_results: number

}
