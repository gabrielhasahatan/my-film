import { safeApiInternalRequest } from "@/lib/safeApiInternalRequest";
import { CollectionsCommentsResponses, CollectionsStatsResponses, CollectionsWatchListsResponses } from "../types/responses";
import { SafeApiResponse } from "@/lib/safeApiRequest";

export const CollectionDao = {
  baseUrl: `${process.env.AUTH_ENDPOINT}/api/me/collections`,
  comments: function({ cursor }: { cursor?: string }): Promise<SafeApiResponse<CollectionsCommentsResponses>> {
    return safeApiInternalRequest<CollectionsCommentsResponses>(`${this.baseUrl}/comments?page=${cursor}`)
  },
  watch_lists: function({ cursor }: { cursor?: string }): Promise<SafeApiResponse<CollectionsWatchListsResponses>> {
    return safeApiInternalRequest<CollectionsWatchListsResponses>(`${this.baseUrl}/watch_lists?page=${cursor}`)
  },
  stats: function(): Promise<SafeApiResponse<CollectionsStatsResponses>> {
    return safeApiInternalRequest<CollectionsStatsResponses>(`${this.baseUrl}/stats`)
  }
}
