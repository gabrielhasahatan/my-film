import { UserEntity } from "@/modules/Dashboard/types/entity"
import { Dayjs } from 'dayjs'

export type CommentEntity = {
  id: string
  user: UserEntity
  media_id: string,
  media_type: string,
  content: string,
  created_at: Dayjs | string,
  updated_at: Dayjs | string,
  parent_id?: string
  reply_count: number
}
