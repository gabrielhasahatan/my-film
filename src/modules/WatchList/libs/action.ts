"use server"

import { WatchListDao } from "./dao"
import { CreateWatchListParams } from "./params"

export const WatchListInfo = async ({ media_id, media_type }: { media_id: string, media_type: string }) => {
  return WatchListDao.index({ media_id: media_id, media_type: media_type })
}

export const WatchListCreate = async (params: CreateWatchListParams) => {
  return WatchListDao.create(params)
}

export const WatchListStatus = async ({ media_id, media_type }: { media_id: string, media_type: string }) => {
  return WatchListDao.status({ media_id: media_id, media_type: media_type })
}

export const WatchListRemove = async ({ media_id, media_type }: { media_id: string, media_type: string }) => {
  return WatchListDao.remove({ media_id: media_id, media_type: media_type })
}
