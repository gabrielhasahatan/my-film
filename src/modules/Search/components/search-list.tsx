"use client"

import { useState } from "react"
import useSWR from "swr"
import Image from "next/image"
import { GetImageLink342 } from "@/shared/types/consts"
import Link from "next/link"
import ErrorContainer from "@/shared/components/ErrorContainer"
import CardSkeleton from "@/shared/components/CardSkeleton"
import { BadgeMovie, BadgeTv } from "@/shared/components/Badge"
import { Separator } from "@/components/ui/separator"
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
  console.log({ data })
  console.log({ searchQuery })

  if (error) {
    return <ErrorContainer />
  }


  const totalData = data?.total_results ?? 0


  return (
    <>

      {isLoading ?
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
              <h1 className="text-white text-lg font-bold">{`Search result : ${searchQuery}`}</h1>
              <div className="w-full p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 place-items-center">
                  {data?.results.map((search, index) => (
                    search.media_type == "movie" ?
                      (<Link
                        key={index}
                        onClick={() => { onClose?.() }}
                        href={`/movie/${search.id}`}
                        className="flex-shrink-0 w-[140px] sm:w-[155px] md:w-[170px] group cursor-pointer"
                      >
                        <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden border border-white/10 shadow-lg group-hover:border-white/40 transition duration-300">
                          <BadgeMovie />
                          <Image
                            unoptimized
                            priority
                            src={`${GetImageLink342}${search.poster_path}`}
                            alt={search.name ?? "search image"}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-300 ease-in-out"
                          />
                        </div>
                        <p className="mt-2 px-1 text-sm text-white/80 group-hover:text-white line-clamp-2 leading-snug transition duration-200">
                          {search.title}
                        </p>
                      </Link>)
                      :
                      (
                        <Link
                          key={index}
                          onClick={() => { onClose?.() }}
                          href={`/tv/${search.id}`}
                          className="flex-shrink-0 w-[140px] sm:w-[155px] md:w-[170px] group cursor-pointer"
                        >
                          <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden border border-white/10 shadow-lg group-hover:border-white/40 transition duration-300">
                            <BadgeTv />
                            <Image
                              unoptimized
                              priority
                              src={`${GetImageLink342}${search.poster_path}`}
                              alt={search.title ?? "search image"}
                              fill
                              className="object-cover group-hover:scale-105 transition duration-300 ease-in-out"
                            />
                          </div>
                          <p className="mt-2 px-1 text-sm text-white/80 group-hover:text-white line-clamp-2 leading-snug transition duration-200">
                            {search.title}
                          </p>
                        </Link>
                      )
                  ))}
                </div>
              </div>
              <Separator />
            </div>
            : null
          }
        </>
      }
    </>
  )
}

export default SearchList
