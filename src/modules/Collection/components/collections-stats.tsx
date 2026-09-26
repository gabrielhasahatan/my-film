"use client"

import { useSearchParams } from "next/navigation"
import { collectionsStatsDetail } from "../lib/action"
import { Skeleton } from "@/components/ui/skeleton"
import useSWR from "swr"
import ErrorContainer from "@/shared/components/error-container"

const CollectionStats = () => {
  const searchParams = useSearchParams()

  const fetcher = async () => {
    const result = await collectionsStatsDetail()
    if (result.success) {
      return result.data.data
    } else {
      throw new Error(result.data.message)
    }
  }

  const { data, error, isLoading } = useSWR(`collection_stats`, fetcher)

  if (error) {
    return <ErrorContainer />
  }

  return (
    <>
      {isLoading ?
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="h-[90px]">
            <Skeleton className="bg-gray-100/10 w-full h-full rounded-xl border border-neutral-800/60" />
          </div>
          <div className="h-[90px]">
            <Skeleton className="bg-gray-100/10 w-full h-full rounded-xl border border-neutral-800/60" />
          </div>
        </div>
        :
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl bg-neutral-950/40 border border-neutral-800/60 p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Daftar tontonan</div>
            <div className="text-2xl font-bold mt-1 text-white">{data?.watch_list_count}</div>
          </div>
          <div className="rounded-xl bg-neutral-950/40 border border-neutral-800/60 p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Komentar</div>
            <div className="text-2xl font-bold mt-1 text-white">{data?.comment_count}</div>
          </div>
        </div>
      }
    </>
  )
}

export default CollectionStats
