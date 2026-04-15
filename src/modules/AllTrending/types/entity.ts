export type TrendingResultEntity = {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  title?: string;
  original_title?: string;
  release_date?: string;
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
  original_language: string;
  overview: string;
  poster_path: string | null;
  media_type: "movie" | "tv";
  genre_ids: number[];
  popularity: number;
  video?: boolean;
  vote_average: number;
  vote_count: number;
}
