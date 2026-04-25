"use client"

import { useState } from "react"
import useSWR from "swr"
import Image from "next/image"
import { GetImageLink342 } from "@/shared/types/consts"
import Link from "next/link"
import ErrorContainer from "@/shared/components/ErrorContainer"
import CardSkeleton from "@/shared/components/CardSkeleton"
import { BadgeMovie } from "@/shared/components/Badge"
import { Separator } from "@/components/ui/separator"
import { NetflixKidsListMoviePagination } from "./netflix-kids-list-movie-pagination"
import { MovieNetflixKidsList } from "../lib/action"

const MovieNeflixKids = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const fetcher = async () => {
    const result = await MovieNetflixKidsList({ page: currentPage.toString() })
    if (result.success) {
      return result.data
    } else {
      throw new Error(result.data.message)
    }
  }

  const { data, error, isLoading } = useSWR(`netflix_kids_${currentPage}`, fetcher)
  console.log({ data })

  if (error) {
    return <ErrorContainer />
  }

  const totalData = data?.total_results ?? 0


  return (
    <>
      {isLoading ?
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-30 lg:mt-40 lg:mx-50">
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
        </>
        :
        <div className="mt-30 lg:mt-40 lg:mx-50">
          {totalData > 0 ?
            <div className="mt-4">
              <div className="flex items-center gap-3">
                <Image src={`/provider-images/netflix-kids.webp`} alt="netflix kids movie" className="w-[100px] md:w-[200px]" width={200} height={50} />
                <h2 className="text-white font-bold text-xl tracking-wide">Original Netflix Kids Movie</h2>
              </div>
              <div className="w-full p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {data?.results.map((movie, index) => (
                    <Link key={index} href={`/movie/${movie.id}`} className="rounded-lg hover:scale-[105%] hover:z-50 transition duration-75 ease-in cursor-pointer flex max-w-[300px] flex-col border border-white/20 overflow-hidden bg-black/60">
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
                      <div className="p-2">
                        <p className="text-xs text-white line-clamp-2 leading-tight">
                          {movie.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <NetflixKidsListMoviePagination totalPages={data?.total_pages ?? 1} currentPage={currentPage} onPageChange={(newPage) => {
                setCurrentPage(newPage)
                window.scrollTo({ top: 0, behavior: "smooth" })
              }} />
              <Separator />
            </div>
            : null
          }
        </div>
      }
    </>
  )
}

export default MovieNeflixKids
