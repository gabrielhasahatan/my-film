import { Dayjs } from "dayjs"

export type UserEntity = {
  id: string,
  username: string,
  email: string
  image_url: string
}

export type CollectionCommentsEntity = {
  id: string,
  content: string,
  media_id: string,
  media_type: "tv" | "movie",
  created_at: Dayjs | string,
  updated_at: Dayjs | string,
  reply_count: string
}
