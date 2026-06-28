"use server"

import { CommentDao } from "./dao"

export const CommentsList = async ({ media_type, media_id, cursor }: { media_type: string, media_id: string, cursor?: string }) => {
  return await CommentDao.index({ media_id: media_id, media_type: media_type, cursor: cursor })
}
