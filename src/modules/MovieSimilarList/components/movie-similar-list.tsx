"use client"

import { SimilarMovieList } from "../lib/action"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { useState } from "react"
import useSWR from "swr"
import { Item, ItemContent, ItemDescription, ItemGroup, ItemHeader, ItemTitle } from "@/components/ui/item"
import Image from "next/image"
import { GetImageLink342 } from "@/shared/types/consts"
import Link from "next/link"
import ErrorContainer from "@/shared/components/ErrorContainer"
import { PaginationMovieSimilar } from "./movie-similar-pagination"
import CardSkeleton from "@/shared/components/CardSkeleton"

const MovieSimilarList = ({ id }: { id: string }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const fetcher = async () => {
    const result = await SimilarMovieList({ movie_id: id, params: currentPage.toString() })
    if (result.success) {
      return result.data
    } else {
      throw new Error(result.data.message)
    }
  }

  const { data, error, isLoading } = useSWR(`movie_similar_${id}_${currentPage}`, fetcher)

  const totalData = data?.total_results ?? 0

  if (error) {
    return <ErrorContainer />
  }

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
              <p className="text-white font-bold text-lg p-4  bg-gradient-to-b from-black via-black/90 to-transparent">Similar Movie</p>
              <div className="w-full p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {data?.results.map((movie, index) => (
                    <div key={index} className="flex flex-col border border-white/20 overflow-hidden bg-black/60">

                      <Link href={`/movie/${movie.id}`} className="cursor-pointer">
                        <div className="relative w-full aspect-[2/3]">
                          <Image
                            unoptimized
                            priority
                            src={`${GetImageLink342}${movie.poster_path}`}
                            alt={movie.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </Link>
                      <div className="p-2">
                        <p className="text-xs text-white line-clamp-2 leading-tight">
                          {movie.title}
                        </p>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
              <PaginationMovieSimilar totalPages={data?.total_pages ?? 1} currentPage={currentPage} onPageChange={(newPage) => setCurrentPage(newPage)} />
            </div>
            : null
          }
        </>
      }
    </>
  )
}

export default MovieSimilarList
