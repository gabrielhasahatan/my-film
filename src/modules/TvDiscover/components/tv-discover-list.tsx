"use client"

import { BadgeTv } from "@/shared/components/badge-type"
import CardSkeleton from "@/shared/components/card-skeleton"
import { GetImageLink342 } from "@/shared/types/consts"
import Image from "next/image"
import Link from "next/link"
import { TvDiscoverPagination } from "./tv-discover-pagination"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import ErrorContainer from "@/shared/components/error-container"
import useSWR from "swr"
import { indexTvDiscover } from "../lib/action"
import TvDiscoverEmpty from "./tv-discover-empty"

const TvDiscoverList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const fetcher = async () => {
    const result = await indexTvDiscover({ page: currentPage.toString() })
    if (result.success) {
      return result.data
    } else {
      throw new Error(result.data.message)
    }
  }
  const { data, error, isLoading } = useSWR(`recommendation_tv_${currentPage}`, fetcher)
  if (error) {
    return <ErrorContainer />
  }
  const totalData = data?.total_results ?? 0


  return (
    <>
      {isLoading ?
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-20">
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
            <div className="mt-4 md:px-4">
              {data!.results.length > 0 ?
                <div className="w-full p-4 mt-20">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-10 gap-4 justify-items-center">
                    {data?.results.map((tv, index) => (
                      <Link
                        key={index}
                        href={`/tv/${tv.id}`}
                        className="flex-shrink-0 w-[140px] sm:w-[155px] md:w-[150px] group cursor-pointer"
                      >
                        <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden border border-white/10 shadow-lg group-hover:border-white/40 transition duration-300">
                          <BadgeTv />
                          <Image
                            unoptimized
                            priority
                            src={`${GetImageLink342}${tv.poster_path}`}
                            alt={tv.name}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-300 ease-in-out"
                          />
                        </div>
                        <p className="mt-2 px-1 text-sm text-white/80 group-hover:text-white line-clamp-2 leading-snug transition duration-200">
                          {tv.name}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>

                : <TvDiscoverEmpty />

              }
              <TvDiscoverPagination totalPages={data?.total_pages ?? 1} currentPage={currentPage} onPageChange={(newPage) => {
                setCurrentPage(newPage)
                window.scrollTo({ top: 0, behavior: "smooth" })
              }} />

              <Separator />
            </div>
            : null}
        </>
      }
    </>
  )
}

export default TvDiscoverList
