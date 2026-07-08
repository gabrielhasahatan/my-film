import { CollectionCommentsEntity } from "./entity"

export type CollectionsCommentsResponses = {
  data: CollectionCommentsEntity[]
  has_more: boolean
  next_cursor?: string
  per_page: string
}
