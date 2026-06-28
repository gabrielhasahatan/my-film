import { CommentEntity } from "./entity"

export type CommentsListResponses = {
  data: CommentEntity[]
  has_more: boolean
  next_cursor?: string
  total: string
  per_page: string
}
