"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image"
import { UseDetailContext } from "./movie-detail-provider"
import { GetImageLink } from "@/shared/types/consts"
import { ImageMovieList } from "@/shared/lib/action"
import useSWR from "swr"
import ErrorContainer from "@/components/ui/ErrorContainer"
import CardSkeleton from "@/components/ui/CardSkeleton"

const MovieDetailHead = () => {
  const { detail } = UseDetailContext()

  const fetcher = async () => {
    const response = await ImageMovieList(detail.id.toString())
    if (response.success) {
      return response.data
    } else {
      throw new Error(response.data.message)
    }
  }
  const { data, error, isLoading } = useSWR(`movie-detail-head`, fetcher)
  if (error) {
    return <ErrorContainer />
  }
  const logos = data?.logos.filter(value => value.iso_639_1 == "en")

  return (
    <>
      {
        isLoading ?
          <div className="w-[80%] h-[80%] mx-auto">
            <CardSkeleton />
          </div>
          :
          <Card className="relative text-wrap p-0 w-full aspect-[16/8]  ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0 shadow-none rounded-none!">
            <Image loading="lazy" src={`${GetImageLink}${data?.backdrops[0].file_path}`} alt="movie-image" fill className="object-cover rounded-none!" />
            {logos ?
              <Image className="z-50 m-10" src={`${GetImageLink}${logos![0].file_path ?? data?.logos[0].file_path}`} alt="logos" width={200} height={50} />
              : null
            }
          </Card>
      }
    </>
  )
}

export default MovieDetailHead
