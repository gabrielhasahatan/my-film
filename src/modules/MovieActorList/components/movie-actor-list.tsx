"use client"

import useSWR from "swr"
import { ActorMovieList } from "../lib/action"
import Image from "next/image"
import { GetImageLink185 } from "@/shared/types/consts"
import ErrorContainer from "@/shared/components/ErrorContainer"
import CardSkeleton from "@/shared/components/CardSkeleton"
import { UseDetailContext } from "@/modules/MovieDetail/components/movie-detail-provider"

const MovieActorList = () => {
  const { detail } = UseDetailContext()

  const fetcher = async () => {
    const response = await ActorMovieList(detail.id.toString())
    if (response.success) {
      return response.data
    } else {
      throw new Error(response.data.message)
    }
  }

  const { data, error, isLoading } = useSWR(`movie_actor_${detail.id}`, fetcher)

  if (error) {
    return <ErrorContainer />
  }

  console.log({ data })
  return (
    <div className="w-full">

      {isLoading
        ?
        <div className="grid grid-cols-4">
          <div className="max-w-[200px]">
            <CardSkeleton />
          </div>
          <div className="max-w-[200px]">
            <CardSkeleton />
          </div>
          <div className="max-w-[200px]">
            <CardSkeleton />
          </div>
          <div className="max-w-[200px]">
            <CardSkeleton />
          </div>
        </div>
        :
        data?.cast.length != 0 ?
          <div className="bg-black  p-4">
            <p className="text-white font-bold text-lg m-4">ACTOR</p>
            <div className="flex items-start gap-3 overflow-x-auto pb-3">
              {data?.cast.map((model, index) => (
                <div key={index} className="shrink-0 flex flex-col w-[120px]">
                  <div className="w-[120px] h-[150px] relative overflow-hidden border-[.5px] border-gray-50">
                    <Image
                      unoptimized
                      loading={index == 0 ? "eager" : "lazy"}
                      src={
                        model.profile_path
                          ? `${GetImageLink185}${model.profile_path}`
                          : `/placeholder.png`
                      }
                      alt={model.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="w-full mt-2 px-1">
                    <p className="text-xs font-semibold text-white leading-tight line-clamp-2">
                      {model.name}
                    </p>
                    <p className="text-xs text-gray-400 leading-tight line-clamp-2 mt-1">
                      {model.character}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          :
          null
      }

    </div>

  )
}

export default MovieActorList
