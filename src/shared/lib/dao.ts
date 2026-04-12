import { safeApiRequest, SafeApiResponse } from "@/lib/safeApiRequest";
import { DetailMovieResponses, } from "@/modules/MovieDetail/types/responses";
import { PopularMovieResponse } from "@/modules/MoviePopular/types/responses";
import { ImageListResponses } from "../types/responses";

export const MovieListDao = {
  baseUrl: `${process.env.API_ENDPOINT}`,

  top: function(params?: string): Promise<SafeApiResponse<PopularMovieResponse>> {
    return safeApiRequest<PopularMovieResponse>(`${this.baseUrl}/movie/popular?${params}`)
  },

  detail: function(id: string): Promise<SafeApiResponse<DetailMovieResponses>> {
    return safeApiRequest<DetailMovieResponses>(`${this.baseUrl}/movie/${id}`)
  },

  images_list: function(id: string): Promise<SafeApiResponse<ImageListResponses>> {
    return safeApiRequest<ImageListResponses>(`${this.baseUrl}/movie/${id}/images`)
  }
}
