import { MovieSimilarResultEntity } from "./entity"

export type MovieSimilarResponses = {
  page: number,
  results: MovieSimilarResultEntity[],
  total_pages: number,
  total_results: number
}
