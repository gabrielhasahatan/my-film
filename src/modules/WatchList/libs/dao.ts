import { SafeApiResponse } from "@/lib/safeApiRequest";
import { safeApiInternalRequest } from "@/lib/safeApiInternalRequest";
import { WatchListCreateResponses, WatchListInfoResponses, WatchListRemoveResponses, WatchListStatusResponses } from "../types/responses";
import { CreateWatchListParams } from "./params";

export const WatchListDao = {
  baseUrl: `${process.env.AUTH_ENDPOINT}/api/watch_lists`,

  index: function({ media_id, media_type }: { media_id: string, media_type: string }): Promise<SafeApiResponse<WatchListInfoResponses>> {
    return safeApiInternalRequest(`${this.baseUrl}?media_type=${media_type}&media_id=${media_id}`)
  },

  create: function(params: CreateWatchListParams): Promise<SafeApiResponse<WatchListCreateResponses>> {
    return safeApiInternalRequest(`${this.baseUrl}`, {
      method: "POST",
      body: JSON.stringify({ watch_list: params })
    })
  },

  status: function({ media_id, media_type }: { media_id: string, media_type: string }): Promise<SafeApiResponse<WatchListStatusResponses>> {
    return safeApiInternalRequest(`${this.baseUrl}/status?media_type=${media_type}&media_id=${media_id}`)
  },

  remove: function({ media_id, media_type }: { media_id: string, media_type: string }): Promise<SafeApiResponse<WatchListRemoveResponses>> {
    return safeApiInternalRequest(`${this.baseUrl}/remove?media_type=${media_type}&media_id=${media_id}`, {
      method: "DELETE"
    })
  },

}
