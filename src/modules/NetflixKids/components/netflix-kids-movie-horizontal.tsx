"use client"

import useSWR from "swr"
import Image from "next/image"
import { GetImageLink342 } from "@/shared/types/consts"
import Link from "next/link"
import ErrorContainer from "@/shared/components/ErrorContainer"
import { BadgeMovie } from "@/shared/components/Badge"
import { MovieNetflixKidsList } from "../lib/action"
import CardSkeleton from "@/shared/components/CardSkeleton"
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { SquareArrowOutUpRight } from "lucide-react"


const NetflixKidsMovieHorizontal = () => {
  const page = 1
  const fetcher = async () => {
    const result = await MovieNetflixKidsList({ page: page.toString() })
    if (result.success) return result.data
    throw new Error(result.data.message)
  }

  const { data, error, isLoading } = useSWR(`netflix_kids_horizontal_${page}`, fetcher)

  if (error) return <ErrorContainer />

  const totalData = data?.total_results ?? 0

  return (
    <div className="py-6">
      {isLoading
        ?
        <div className="flex items-center justify-start gap-3 px-4 md:px-8 mb-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
        : totalData > 0
          ?
          <>
            <div className="flex items-center justify-start gap-3 px-4 md:px-8 mb-4">
              <div className="flex items-center gap-3">
                <Image src={`/provider-images/netflix-kids.webp`} alt="netflix kids movie" className="" width={80} height={50} />
                <h2 className="text-white font-bold text-xl tracking-wide">Original Netflix Kids Movie</h2>
              </div>
              <Link href={`movie/netflix-kids`} className="hover:text-red-500 text-white transition ease-in-out duration-300 flex text-xs items-end gap-2">
                <SquareArrowOutUpRight />
                See More
              </Link>

            </div>

            <div className="relative px-4 md:px-8">
              <div
                className="flex gap-3 overflow-x-auto pb-4 scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <>
                  {
                    data?.results.map((movie, index) => (
                      <Link
                        key={index}
                        href={`/movie/${movie.id}`}
                        className="flex-shrink-0 w-[140px] sm:w-[155px] md:w-[170px] group cursor-pointer"
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
                    ))
                  }
                </>
              </div>
            </div>
          </>
          : null}
    </div>
  )
}

export default NetflixKidsMovieHorizontal
