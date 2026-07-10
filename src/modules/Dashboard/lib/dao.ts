import { safeApiInternalRequest } from "@/lib/safeApiInternalRequest";
import { CollectionsCommentsResponses } from "../types/responses";
import { SafeApiResponse } from "@/lib/safeApiRequest";

export const CollectionDao = {
  baseUrl: `${process.env.AUTH_HOST}/api/collections`,
  comments: function({ cursor }: { cursor?: string }): Promise<SafeApiResponse<CollectionsCommentsResponses>> {
    return safeApiInternalRequest<CollectionsCommentsResponses>(`${this.baseUrl}/comments?page=${cursor}`)
  }
}
