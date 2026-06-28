import { SafeApiResponse } from "@/lib/safeApiRequest"
import { CommentsListResponses } from "../types/responses"
import { safeApiInternalRequest } from "@/lib/safeApiInternalRequest"

export const CommentDao = {
  baseUrl: `${process.env.AUTH_HOST}/api/comments`,
  index: function({ media_type, media_id, cursor }: { media_type: string, media_id: string, cursor?: string }): Promise<SafeApiResponse<CommentsListResponses>> {
    return safeApiInternalRequest<CommentsListResponses>(`${this.baseUrl}?media_type=${media_type}&media_id=${media_id}&page=${cursor}`)
  }
}
