import { safeApiRequest, SafeApiResponse } from "@/lib/safeApiRequest";
import { DetailMovieResponses, } from "@/modules/MovieDetail/types/responses";
import { PopularMovieResponse } from "@/modules/MoviePopular/types/responses";
import { GenreTvResponses, ImageListResponses } from "../types/responses";
import { MovieActorListResponses } from "@/modules/MovieActorList/types/responses";
import { MovieSimilarResponses } from "@/modules/MovieSimilarList/types/responses";
import { MovieRecommendationsResponses } from "@/modules/MovieRecomendation/types/responses";
import { TrendingListResponses } from "@/modules/AllTrending/types/responses";
import { TvDetailResponses, TvSeasonDetailResponses, TvVideoTrailerResponses } from "@/modules/TvDetail/types/responses";


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
  }
}

export const MovieListDao = {
  baseUrl: `${process.env.API_ENDPOINT}/movie`,

  defaultLanguage: "en-US",

  top: function(params?: string): Promise<SafeApiResponse<PopularMovieResponse>> {
    return safeApiRequest<PopularMovieResponse>(`${this.baseUrl}/popular?${params}`)
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

