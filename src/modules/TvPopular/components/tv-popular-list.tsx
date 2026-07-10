"use client"

import useSWR from "swr"
import ErrorContainer from "@/shared/components/ErrorContainer"
import { BadgeTv } from "@/shared/components/Badge"
import Image from "next/image"
import Link from "next/link"
import { GetImageLink342 } from "@/shared/types/consts"
import CardSkeleton from "@/shared/components/CardSkeleton"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { IndexTopTv } from "../lib/action"
import TvPopularEmpty from "./tv-popular-empty"
import { PaginationTvPopular } from "./tv-popular-pagination"

const TvPopularList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const fetcher = async () => {
    const result = await IndexTopTv({ page: currentPage.toString() })
    if (result.success) {
      return result.data
    } else {
      throw new Error(result.data.message)
    }
  }
  const { data, error, isLoading } = useSWR(`popular_tv_${currentPage}`, fetcher)
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
            <div className="mt-4 md:px-4">
              <div className="flex flex-col gap-1.5 px-4 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-[9px] uppercase tracking-widest bg-violet-700 text-white px-2.5 py-1 rounded font-bold">POPULAR TV</span>
                  <h2 className="text-2xl font-black text-white tracking-tight">Series</h2>
                </div>
                <div className="w-14 h-0.5 bg-gradient-to-r from-violet-600 to-pink-500 rounded-full" />
              </div>
              {data!.results.length > 0 ?

                <div className="w-full p-4">
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
                      </Link>))}
                  </div>
                </div>

                : < TvPopularEmpty />

              }
              <PaginationTvPopular totalPages={data?.total_pages ?? 1} currentPage={currentPage} onPageChange={(newPage) => {
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

export default TvPopularList
