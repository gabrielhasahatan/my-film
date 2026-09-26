"use server"

import { MovieListDao, TvListDao } from "@/shared/lib/dao"
import { CollectionDao } from "./dao"

export const collectionsCommentsList = async ({ cursor }: { cursor?: string }) => {
  return await CollectionDao.comments({ cursor: cursor })
}

export const collectionsWatchList = async ({ cursor }: { cursor?: string }) => {
  return await CollectionDao.watch_lists({ cursor: cursor })
}


export const collectionsCommentsDetail = async ({ media_type, media_id }: { media_id: string, media_type: "tv" | "movie" }) => {
  switch (media_type) {
    case "tv":
      return await TvListDao.detail(media_id)
    case "movie":
      return await MovieListDao.detail(media_id)
  }
}

export const collectionsWatchListsDetail = async ({ media_type, media_id }: { media_type: "tv" | "movie", media_id: string }) => {
  switch (media_type) {
    case "tv":
      return await TvListDao.detail(media_id)
    case "movie":
      return await MovieListDao.detail(media_id)
  }
}

export const collectionsStatsDetail = async () => {
  return await CollectionDao.stats()
}
