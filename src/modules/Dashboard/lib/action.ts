"use server"

import { MovieListDao, TvListDao } from "@/shared/lib/dao"
import { CollectionDao } from "./dao"

export const CollectionsCommentsList = async ({ cursor }: { cursor?: string }) => {
  return await CollectionDao.comments({ cursor: cursor })
}


export const CollectionsCommentsDetail = async ({ media_type, media_id }: { media_id: string, media_type: "tv" | "movie" }) => {
  switch (media_type) {
    case "tv":
      return await TvListDao.detail(media_id)
    case "movie":
      return await MovieListDao.detail(media_id)
  }
}
