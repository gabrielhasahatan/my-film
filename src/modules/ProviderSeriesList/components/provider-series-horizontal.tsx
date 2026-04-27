"use client"

import useSWR from "swr"
import Image from "next/image"
import { GetImageLink342 } from "@/shared/types/consts"
import Link from "next/link"
import ErrorContainer from "@/shared/components/ErrorContainer"
import CardSkeleton from "@/shared/components/CardSkeleton"
import { SeriesAllProviderList, SeriesNetflixList } from "../lib/action"
import { BadgeTv } from "@/shared/components/Badge"
import ProviderSelected from "./provider-selected"
import { useState } from "react"

const ProviderSeriesHorizontal = () => {
  const page = 1
  const [currentProviderId, setCurrentProviderId] = useState("8")
  const fetcher = async () => {
    const result = await SeriesAllProviderList({ page: page.toString(), idProvider: currentProviderId })
    if (result.success) return result.data
    throw new Error(result.data.message)
  }

  const { data, error, isLoading } = useSWR(`provider_${currentProviderId}_tv_horizontal_${page}`, fetcher)

  if (error) return <ErrorContainer />

  const totalData = data?.total_results ?? 0

  console.log({ currentProviderId })

  return (
    <div className="py-6">
      <div className="flex items-center justify-start gap-3 px-4 md:px-8 mb-4">
        <div className="flex items-center gap-3">
          <ProviderSelected onSelectChange={setCurrentProviderId} />
        </div>
      </div>
      {isLoading
        ?
        <div className="grid grid-cols-4">
          <div className="max-w-[200px]">
            <CardSkeleton />
          </div>
          <div className="max-w-[200px]">
            <CardSkeleton />
          </div>
          <div className="max-w-[200px]">
            <CardSkeleton />
          </div>
          <div className="max-w-[200px]">
            <CardSkeleton />
          </div>
        </div>
        : totalData > 0
          ?
          <>

            <div className="relative px-4 md:px-8">
              <div
                className="flex gap-3 overflow-x-auto pb-4 scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <>
                  {
                    data?.results.map((tv, index) => (
                      <Link
                        key={index}
                        href={`/tv/${tv.id}`}
                        className="flex-shrink-0 w-[140px] sm:w-[155px] md:w-[170px] group cursor-pointer"
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

export default ProviderSeriesHorizontal
