export type SearchResultEntity = {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  title?: string;
  original_language: string;
  original_title?: string;
  overview: string;
  poster_path: string;
  media_type: 'movie' | 'tv';
  genre_ids: number[];
  popularity: number;
  release_date?: string;
  first_air_date?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  name?: string;
  original_name?: string;
  origin_country?: string[];
}
