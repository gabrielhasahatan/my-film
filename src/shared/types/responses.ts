import { ImageListBackdropsEntity, ImageListLogosEntity, ImageListPostersEntity } from "./entity"

export type ImageListResponses = {
  id: number,
  backdrops: ImageListBackdropsEntity[],
  logos: ImageListLogosEntity[],
  posters: ImageListPostersEntity[]

}
