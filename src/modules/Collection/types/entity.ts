import { Dayjs } from "dayjs"

export type CollectionCommentsEntity = {
  id: string,
  content: string,
  media_id: string,
  media_type: "tv" | "movie",
  created_at: Dayjs | string,
  updated_at: Dayjs | string,
  reply_count: number
}


export type CollectionWatchListsEntity = {
  created_at: Dayjs | string,
  media_id: string,
  media_type: "tv" | "movie",
  updated_at: Dayjs | string
}
