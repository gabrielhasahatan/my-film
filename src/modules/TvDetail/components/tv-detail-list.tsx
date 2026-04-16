"use client"
import { Card } from "@/components/ui/card"
import { useTvDetailContext } from "./tv-detail-provider"
import Image from "next/image"
import { GetImageLink } from "@/shared/types/consts"
import { Button } from "@/components/ui/button"
import useSWR from "swr"
import { TvTrailerList } from "../lib/action"
import ErrorContainer from "@/shared/components/ErrorContainer"
import TvTrailerHeadless from "./tv-trailer-headless"
import { memo, useMemo, useState } from "react"


const TrailerMemo = memo(function TrailerMemo({ href }: { href: string }) {
  return <TvTrailerHeadless href={href} />
})



const TvDetailList = () => {
  const { detail } = useTvDetailContext()
  const [playTrailer, setPlayTrailer] = useState(false)

  const fetcher = async () => {
    const result = await TvTrailerList(detail.id.toString())
    if (result.success) {
      return result.data
    } else {
      throw new Error(result.data.message)
    }
  }
  const { data, isLoading, error } = useSWR(`tv_detail_${detail.id}`, fetcher)
  if (error) {
    return <ErrorContainer />
  }

  const trailerFilter = useMemo(() => {
    return data?.results.filter(trailer => trailer.type == "Trailer") ?? data?.results
  }, [data])



  return (
    <>
      {isLoading ?
        <div>load</div>
        :
        <>
          <Card onClick={() => {
            setPlayTrailer(true)
          }} className="overflow-visible relative text-wrap p-0 w-full aspect-[16/8]  ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0 shadow-none rounded-none!">
            <Image
              unoptimized
              loading="eager"
              src={`${GetImageLink}${detail?.backdrop_path}`}
              alt="movie-image"
              fill
              className={`object-cover rounded-none!  ${playTrailer ? 'hidden' : ''}`}
            />

            {data?.results[0].key && (
              <div className={`h-full w-full relative ${playTrailer ? '' : 'hidden'}`}>
                <TrailerMemo href={trailerFilter![0].key} />
              </div>
            )}
            <div className="w-full min-h-[200px] xl:bottom-0 xl:absolute ">
              <div className="relative w-full h-[500px] text-white">
                <div className="absolute bottom-0 inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-10 max-w-3xl">
                  <h1 className="text-3xl md:text-5xl font-bold mb-3">{detail.original_name}</h1>
                  <div className="flex items-center gap-4 text-sm md:text-base text-gray-300 mb-3">
                    <span>{detail.first_air_date}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {detail.genres.map((genre, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-200 text-sm md:text-base line-clamp-4">
                    {detail.overview}
                  </p>
                  <div className="flex gap-3 mt-5">
                    <Button className="bg-white/20 px-5 py-2 rounded-md hover:bg-white/30 transition">
                      + Watchlist
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </>
      }
    </>

  )
}

export default TvDetailList
