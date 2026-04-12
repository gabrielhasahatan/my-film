import { PopularMoviesEntity } from "./entity";

export type PopularMovieResponse = {
  page: number;
  results: PopularMoviesEntity[]
  total_pages: number
  total_results: number
}
