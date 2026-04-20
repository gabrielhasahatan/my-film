"use client"

import { useState } from "react"
import useSWR from "swr"
import Image from "next/image"
import { GetImageLink342 } from "@/shared/types/consts"
import Link from "next/link"
import ErrorContainer from "@/shared/components/ErrorContainer"
import CardSkeleton from "@/shared/components/CardSkeleton"
import { Badge } from "@/components/ui/badge"
import { BadgeMovie, BadgeTv } from "@/shared/components/Badge"
import { Separator } from "@/components/ui/separator"
import { SimilarSeriesList } from "../lib/action"
import { useTvSeasonDetailContext } from "@/modules/TvSeasonDetail/components/tv-season-detail-provider"
import { TvSeasonSimilarPagination } from "./tv-season-similar-pagination"

const TvSeasonSimilarList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { detail } = useTvSeasonDetailContext()

  const fetcher = async () => {
    const result = await SimilarSeriesList({ seriesId: detail.id.toString(), params: currentPage.toString() })
    if (result.success) {
      return result.data
    } else {
      throw new Error(result.data.message)
    }
  }

  const { data, error, isLoading } = useSWR(`tv_season_similar_${detail.id}_${currentPage}`, fetcher)

  if (error) {
    return <ErrorContainer />
  }

  const totalData = data?.total_results ?? 0


  return (
    <>
      {isLoading ?
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
        :
        <>
          {totalData > 0 ?
            <div className="mt-4">
              <p className="text-white font-bold text-lg p-4 ">Related Series</p>
              <div className="w-full p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-4">
                  {data?.results.map((movie, index) => (
                    <Link key={index} href={`/tv/${movie.id}`} className="rounded-lg hover:scale-[105%] hover:z-50 transition duration-75 ease-in cursor-pointer flex max-w-[300px] flex-col border border-white/20 overflow-hidden bg-black/60">
                      <div className="relative w-full aspect-[2/3]">
                        <BadgeTv />
                        <Image
                          unoptimized
                          priority
                          src={`${GetImageLink342}${movie.poster_path}`}
                          alt={movie.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-2">
                        <p className="text-xs text-white line-clamp-2 leading-tight">
                          {movie.name}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <TvSeasonSimilarPagination totalPages={data?.total_pages ?? 1} currentPage={currentPage} onPageChange={(newPage) => {
                setCurrentPage(newPage)
                window.scrollTo({ top: 0, behavior: "smooth" })
              }} />
              <Separator />
            </div>
            : null
          }
        </>
      }
    </>
  )
}

export default TvSeasonSimilarList
