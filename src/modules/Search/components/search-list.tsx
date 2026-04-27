"use client"

import { useState } from "react"
import useSWR from "swr"
import Image from "next/image"
import { GetImageLink342 } from "@/shared/types/consts"
import Link from "next/link"
import ErrorContainer from "@/shared/components/ErrorContainer"
import CardSkeleton from "@/shared/components/CardSkeleton"
import { BadgeMovie, BadgeTv } from "@/shared/components/Badge"
import { MultiSearchList } from "../lib/action"

const SearchList = ({ searchQuery, onClose }: { searchQuery: string, onClose: () => void }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const fetcher = async () => {
    const result = await MultiSearchList({ page: currentPage.toString(), query: searchQuery })
    if (result.success) {
      return result.data
    } else {
      throw new Error(result.data.message)
    }
  }

  const { data, error, isLoading } = useSWR(`search_${searchQuery}_${currentPage}`, fetcher)

  if (error) return <ErrorContainer />

  const totalData = data?.total_results ?? 0

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 w-full">
        {Array.from({ length: 9 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (totalData === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-white/30 gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 30 30" fill="currentColor">
          <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
        </svg>
        <p className="text-sm">Tidak ada hasil untuk &quot;{searchQuery}&quot;</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 w-full">
      {data?.results.map((search, index) => {
        const isMovie = search.media_type === "movie"
        const href = isMovie ? `/movie/${search.id}` : `/tv/${search.id}`
        const title = search.title ?? search.name ?? ""
        const alt = title || "poster"

        return (
          <Link
            key={index}
            href={href}
            onClick={() => onClose?.()}
            className="group cursor-pointer w-full"
          >
            <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden border border-white/10 shadow-lg group-hover:border-white/40 transition duration-300">
              {isMovie ? <BadgeMovie /> : <BadgeTv />}
              <Image
                unoptimized
                priority
                src={`${GetImageLink342}${search.poster_path}`}
                alt={alt}
                fill
                className="object-cover group-hover:scale-105 transition duration-300 ease-in-out"
              />
            </div>
            <p className="mt-2 px-0.5 text-xs text-white/70 group-hover:text-white line-clamp-2 leading-snug transition duration-200">
              {title}
            </p>
          </Link>
        )
      })}
    </div>
  )
}

export default SearchList
