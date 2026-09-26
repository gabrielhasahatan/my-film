import { CollectionCommentsEntity, CollectionWatchListsEntity } from "./entity"

export type CollectionsCommentsResponses = {
  data: CollectionCommentsEntity[]
  has_more: boolean
  next_cursor?: string
  per_page: string
  total_data: number
}

export type CollectionsWatchListsResponses = {
  data: CollectionWatchListsEntity[]
  has_more: boolean
  next_cursor?: string
  per_page: string
  total_data: number
}

export type CollectionsStatsResponses = {
  data: {
    comment_count: number,
    watch_list_count: number
  }
}
