import { SearchResultEntity } from "./entity";

export type SearchResponses = {
  page: number,
  results: SearchResultEntity[],
  total_pages: number,
  total_results: number
}
