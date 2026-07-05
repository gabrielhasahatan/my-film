import { SafeApiResponse } from "@/lib/safeApiRequest"
import { CommentCreateResponse, CommentsListResponses } from "../types/responses"
import { safeApiInternalRequest } from "@/lib/safeApiInternalRequest"
import { CreateCommentParams } from "./params"

export const CommentDao = {
  baseUrl: `${process.env.AUTH_HOST}/api/comments`,
  index: function({ media_type, media_id, cursor }: { media_type: string, media_id: string, cursor?: string }): Promise<SafeApiResponse<CommentsListResponses>> {
    return safeApiInternalRequest<CommentsListResponses>(`${this.baseUrl}?media_type=${media_type}&media_id=${media_id}&page=${cursor}`)
  },
  replies: function({ parent_id, cursor }: { parent_id: string, cursor?: string }): Promise<SafeApiResponse<CommentsListResponses>> {
    return safeApiInternalRequest<CommentsListResponses>(`${this.baseUrl}/${parent_id}/replies?page=${cursor}`)
  },
  create: function(params: CreateCommentParams): Promise<SafeApiResponse<CommentCreateResponse>> {
    return safeApiInternalRequest<CommentCreateResponse>(`${this.baseUrl}`, {
      method: "POST",
      body: JSON.stringify({
        comment: params
      })
    })
  }
}
