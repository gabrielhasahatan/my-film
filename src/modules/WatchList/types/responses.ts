import { WatchListInfoEntity } from "./entity"

export type WatchListInfoResponses = {
  data: WatchListInfoEntity
}

export type WatchListCreateResponses = {
  message: string
}

export type WatchListStatusResponses = {
  message: boolean
}

export type WatchListRemoveResponses = WatchListCreateResponses
