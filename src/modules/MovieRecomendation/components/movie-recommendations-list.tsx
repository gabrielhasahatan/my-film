"use client"

import useSWR from "swr"
import { RecommendationListMovie } from "../lib/action"
import ErrorContainer from "@/shared/components/ErrorContainer"
import { UseDetailContext } from "@/modules/MovieDetail/components/movie-detail-provider"
import { BadgeMovie } from "@/shared/components/Badge"
import Image from "next/image"
import Link from "next/link"
import { GetImageLink342 } from "@/shared/types/consts"
import CardSkeleton from "@/shared/components/CardSkeleton"
import { useState } from "react"
import { PaginationMovieRecommendation } from "./movie-recommendations-pagination"
import MovieRecommendationsEmpty from "./movie-recommendations-empty"
import { Separator } from "@/components/ui/separator"

const MovieRecommendationsList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { detail } = UseDetailContext()
  const fetcher = async () => {
    const result = await RecommendationListMovie({ id: detail.id.toString(), page: currentPage.toString() })
    if (result.success) {
      return result.data
    } else {
      throw new Error(result.data.message)
    }
  }
  const { data, error, isLoading } = useSWR(`recommendation_movie_${detail.id}_${currentPage}`, fetcher)
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
              <p className="text-white font-bold text-lg p-4 ">Recommendation</p>
              {data!.results.length > 0 ?

                <div className="w-full p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-10 gap-4 justify-items-center">
                    {data?.results.map((movie, index) => (
                      <Link
                        key={index}
                        href={`/movie/${movie.id}`}
                        className="flex-shrink-0 w-[140px] sm:w-[155px] md:w-[150px] group cursor-pointer"
                      >
                        <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden border border-white/10 shadow-lg group-hover:border-white/40 transition duration-300">
                          <BadgeMovie />
                          <Image
                            unoptimized
                            priority
                            src={`${GetImageLink342}${movie.poster_path}`}
                            alt={movie.title}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-300 ease-in-out"
                          />
                        </div>
                        <p className="mt-2 px-1 text-sm text-white/80 group-hover:text-white line-clamp-2 leading-snug transition duration-200">
                          {movie.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>

                : <MovieRecommendationsEmpty />

              }
              <PaginationMovieRecommendation totalPages={data?.total_pages ?? 1} currentPage={currentPage} onPageChange={(newPage) => {
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

export default MovieRecommendationsList
