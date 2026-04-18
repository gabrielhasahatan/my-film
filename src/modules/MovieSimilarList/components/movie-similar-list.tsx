"use client"

import { SimilarMovieList } from "../lib/action"
import { useState } from "react"
import useSWR from "swr"
import Image from "next/image"
import { GetImageLink342 } from "@/shared/types/consts"
import Link from "next/link"
import ErrorContainer from "@/shared/components/ErrorContainer"
import { PaginationMovieSimilar } from "./movie-similar-pagination"
import CardSkeleton from "@/shared/components/CardSkeleton"
import { BadgeMovie } from "@/shared/components/Badge"
import { UseDetailContext } from "@/modules/MovieDetail/components/movie-detail-provider"
import { Separator } from "@/components/ui/separator"
import { Play } from "lucide-react"

const MovieSimilarList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const { detail } = UseDetailContext()

  const fetcher = async () => {
    const result = await SimilarMovieList({ movie_id: detail.id.toString(), params: currentPage.toString() })
    if (result.success) {
      return result.data
    } else {
      throw new Error(result.data.message)
    }
  }

  const { data, error, isLoading } = useSWR(`movie_similar_${detail.id}_${currentPage}`, fetcher)

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
              <p className="text-white font-bold text-lg p-4 ">Related Movie</p>
              <div className="w-full p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-4">
                  {data?.results.map((movie, index) => (
                    <Link key={index}
                      href={`/movie/${movie.id}`}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="rounded-lg hover:scale-[105%] hover:z-50 transition duration-300 ease-in cursor-pointer flex max-w-[300px] flex-col border border-white/20 overflow-hidden bg-black/60">
                      <div className="relative w-full aspect-[2/3]">
                        <BadgeMovie />
                        <Image
                          unoptimized
                          priority
                          src={`${GetImageLink342}${movie.poster_path}`}
                          alt={movie.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                          <Play className="w-4 h-4 text-black fill-black ml-0.5" />
                        </div>
                      </div>

                      <div className="p-2">
                        <p className="text-xs text-white line-clamp-2 leading-tight">
                          {movie.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <PaginationMovieSimilar totalPages={data?.total_pages ?? 1} currentPage={currentPage} onPageChange={(newPage) => {
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

export default MovieSimilarList
