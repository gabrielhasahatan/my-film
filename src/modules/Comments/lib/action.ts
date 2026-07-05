"use server"

import { CommentDao } from "./dao"
import { CreateCommentParams } from "./params"

export const CommentsList = async ({ media_type, media_id, cursor }: { media_type: string, media_id: string, cursor?: string }) => {
  return await CommentDao.index({ media_id: media_id, media_type: media_type, cursor: cursor })
}

export const CommentCreate = async (params: CreateCommentParams) => {
  return await CommentDao.create(params)
}

export const CommentReplies = async ({ parent_id, cursor }: { parent_id: string, cursor?: string }) => {
  return await CommentDao.replies({ parent_id: parent_id, cursor: cursor })
}
