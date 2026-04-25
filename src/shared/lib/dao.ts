import { safeApiRequest, SafeApiResponse } from "@/lib/safeApiRequest";
import { DetailMovieResponses, } from "@/modules/MovieDetail/types/responses";
import { PopularMovieResponse } from "@/modules/MoviePopular/types/responses";
import { DiscoverMovieResponses, DiscoverTvResponses, GenreTvResponses, ImageListResponses } from "../types/responses";
import { MovieActorListResponses } from "@/modules/MovieActorList/types/responses";
import { MovieSimilarResponses } from "@/modules/MovieSimilarList/types/responses";
import { MovieRecommendationsResponses } from "@/modules/MovieRecomendation/types/responses";
import { TrendingListResponses } from "@/modules/AllTrending/types/responses";
import { EpisodeDetailResponses, EpisodeImagesResponses } from "@/modules/TvEpisodeDetail/types/responses";
import { TvDetailResponses, TvSeasonDetailResponses, TvVideoTrailerResponses } from "@/modules/TvSeasonDetail/types/responses";
import { TvSeasonSimilarResponses } from "@/modules/TvSeasonSimilar/types/responses";
import { TvRecommendationResponses } from "@/modules/TvRecomendation/types/responses";
import { TvPopularResponses } from "@/modules/TvPopular/types/responses";
import { SearchResponses } from "@/modules/Search/types/responses";


export const TvListDao = {
  baseUrl: `${process.env.API_ENDPOINT}/tv`,

  defaultLanguage: "en-US",

  detail: function(id: string): Promise<SafeApiResponse<TvDetailResponses>> {
    return safeApiRequest<TvDetailResponses>(`${this.baseUrl}/${id}?language=${this.defaultLanguage}`)
  },

  trailer: function(id: string): Promise<SafeApiResponse<TvVideoTrailerResponses>> {
    return safeApiRequest<TvVideoTrailerResponses>(`${this.baseUrl}/${id}/videos?language=${this.defaultLanguage}`)
  },

  season: function({ season, seriesId }: { seriesId: string, season: string }): Promise<SafeApiResponse<TvSeasonDetailResponses>> {
    return safeApiRequest<TvSeasonDetailResponses>(`${this.baseUrl}/${seriesId}/season/${season}?language=${this.defaultLanguage}`)
  },

  episode: function({ seriesId, season, episode }: { seriesId: string, season: string, episode: string }): Promise<SafeApiResponse<EpisodeDetailResponses>> {
    return safeApiRequest<EpisodeDetailResponses>(`${this.baseUrl}/${seriesId}/season/${season}/episode/${episode}?language=${this.defaultLanguage}`)

  },

  episode_image_list: function({ seriesId, season, episode }: { seriesId: string, season: string, episode: string }): Promise<SafeApiResponse<EpisodeImagesResponses>> {
    return safeApiRequest<EpisodeImagesResponses>(`${this.baseUrl}/${seriesId}/season/${season}/episode/${episode}/images`)
  },

  similar: function({ seriesId, params, language }: { seriesId: string, params?: string, language?: string }): Promise<SafeApiResponse<TvSeasonSimilarResponses>> {
    return safeApiRequest<TvSeasonSimilarResponses>(`${this.baseUrl}/${seriesId}/similar?language=${language ?? this.defaultLanguage}&page=${params ?? 1}`)
  },

  recommendation_list: function({ id, params }: { id: string, params: string }): Promise<SafeApiResponse<TvRecommendationResponses>> {
    return safeApiRequest<TvRecommendationResponses>(`${this.baseUrl}/${id}/recommendations?language=${this.defaultLanguage}&page=${params}`)
  },

  top: function({ language, page }: { language?: string, page: string }): Promise<SafeApiResponse<TvPopularResponses>> {
    return safeApiRequest<TvPopularResponses>(`${this.baseUrl}/popular?language=${language ?? this.defaultLanguage}&page=${page}`)
  },


}

export const MovieListDao = {
  baseUrl: `${process.env.API_ENDPOINT}/movie`,

  defaultLanguage: "en-US",

  top: function(params?: string): Promise<SafeApiResponse<PopularMovieResponse>> {
    return safeApiRequest<PopularMovieResponse>(`${this.baseUrl}/popular?language=${params ?? this.defaultLanguage}`)
  },

  detail: function(id: string): Promise<SafeApiResponse<DetailMovieResponses>> {
    return safeApiRequest<DetailMovieResponses>(`${this.baseUrl}/${id}`)
  },

  images_list: function(id: string): Promise<SafeApiResponse<ImageListResponses>> {
    return safeApiRequest<ImageListResponses>(`${this.baseUrl}/${id}/images`)
  },

  similar: function({ movie_id, params, language }: { movie_id: string, params?: string, language?: string }): Promise<SafeApiResponse<MovieSimilarResponses>> {
    return safeApiRequest<MovieSimilarResponses>(`${this.baseUrl}/${movie_id}/similar?language=${language ?? this.defaultLanguage}&page=${params ?? 1}`)
  },

  actor_list: function(id: string): Promise<SafeApiResponse<MovieActorListResponses>> {
    return safeApiRequest<MovieActorListResponses>(`${this.baseUrl}/${id}/credits`)
  },

  recommendation_list: function({ id, page }: { id: string, page: string }): Promise<SafeApiResponse<MovieRecommendationsResponses>> {
    return safeApiRequest<MovieRecommendationsResponses>(`${this.baseUrl}/${id}/recommendations?language=${this.defaultLanguage}&page=${page}`)

  }
}



export const TrendingListDao = {
  baseUrl: `${process.env.API_ENDPOINT}/trending/all`,

  defaultLanguage: "en-US",

  detail_week: function(): Promise<SafeApiResponse<TrendingListResponses>> {
    return safeApiRequest<TrendingListResponses>(`${this.baseUrl}/week?language=${this.defaultLanguage}`)
  },

  detail_day: function(): Promise<SafeApiResponse<TrendingListResponses>> {
    return safeApiRequest<TrendingListResponses>(`${this.baseUrl}/day?language=${this.defaultLanguage}`)
  },
}


export const GenreListDao = {
  baseUrl: `${process.env.API_ENDPOINT}/genre`,

  defaultLanguage: "en",

  movie: function(): Promise<SafeApiResponse<GenreTvResponses>> {
    return safeApiRequest<GenreTvResponses>(`${this.baseUrl}/movie/list?language=${this.defaultLanguage}`)
  },

  tv: function(): Promise<SafeApiResponse<GenreTvResponses>> {
    return safeApiRequest<GenreTvResponses>(`${this.baseUrl}/tv/list?language=${this.defaultLanguage}`)
  },
}



export const DiscoverDao = {
  baseUrl: `${process.env.API_ENDPOINT}/discover`,

  defaultLanguage: "en-US",

  netflixProvider: "8",

  netflixKidsProvider: "175",

  SeriesNetflix: function({ page, language }: { page: string, language?: string }): Promise<SafeApiResponse<DiscoverTvResponses>> {
    return safeApiRequest<DiscoverTvResponses>(`${this.baseUrl}/tv?include_adult=true&include_null_first_air_dates=false&language=${language ?? this.defaultLanguage}&page=${page}&sort_by=popularity.desc&with_watch_providers=${this.netflixProvider}`)
  },

  movieNetlixKids: function({ page, language }: { page: string, language?: string }): Promise<SafeApiResponse<DiscoverMovieResponses>> {
    return safeApiRequest<DiscoverMovieResponses>(`${this.baseUrl}/movie?include_adult=false&include_video=true&language=${language ?? this.defaultLanguage}&page=${page}&sort_by=popularity.asc&watch_region=ID&with_watch_providers=${this.netflixKidsProvider}`)
  },

}



export const SearchListDao = {
  baseUrl: `${process.env.API_ENDPOINT}/search`,

  defaultLanguage: "en-US",

  multi: function({ page, query, language }: { page: string, query: string, language?: string }): Promise<SafeApiResponse<SearchResponses>> {
    return safeApiRequest<SearchResponses>(`${this.baseUrl}/multi?query=${query}&include_adult=true&language=${language ?? this.defaultLanguage}&page=${page ?? 1}`)
  },

}
