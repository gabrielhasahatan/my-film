import { safeApiRequest, SafeApiResponse } from "@/lib/safeApiRequest";
import { DetailMovieResponses, } from "@/modules/MovieDetail/types/responses";
import { PopularMovieResponse } from "@/modules/MoviePopular/types/responses";
import { ImageListResponses } from "../types/responses";
import { MovieActorListResponses } from "@/modules/MovieActorList/types/responses";
import { MovieSimilarResponses } from "@/modules/MovieSimilarList/types/responses";

export const MovieListDao = {
  baseUrl: `${process.env.API_ENDPOINT}/movie`,

  top: function(params?: string): Promise<SafeApiResponse<PopularMovieResponse>> {
    return safeApiRequest<PopularMovieResponse>(`${this.baseUrl}/popular?${params}`)
  },

  detail: function(id: string): Promise<SafeApiResponse<DetailMovieResponses>> {
    return safeApiRequest<DetailMovieResponses>(`${this.baseUrl}/${id}`)
  },

  images_list: function(id: string): Promise<SafeApiResponse<ImageListResponses>> {
    return safeApiRequest<ImageListResponses>(`${this.baseUrl}/${id}/images`)
  },

  similar: function({ movie_id, params }: { movie_id: string, params?: string }): Promise<SafeApiResponse<MovieSimilarResponses>> {
    return safeApiRequest<MovieSimilarResponses>(`${this.baseUrl}/${movie_id}/similar?language=en-US&page=${params}`)
  },

  actor_list: function(id: string): Promise<SafeApiResponse<MovieActorListResponses>> {
    return safeApiRequest<MovieActorListResponses>(`${this.baseUrl}/${id}/credits`)
  }
}
