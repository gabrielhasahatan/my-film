"use client"

import useSWR from "swr"
import { TrendingAllWeek } from "../lib/action"
import { useSearchParams } from "next/navigation"

const MovieTrendingWeekList = () => {
  const searchParams = useSearchParams()
  const fetcher = async () => {
    const result = await TrendingAllWeek()
    if (result.success) {
      return result.data
    } else {
      throw new Error(result.data.message)
    }
  }

  const { data, error, isLoading } = useSWR(`trending_all_week_${searchParams.toString()}`, fetcher)

  return (
    <div></div>
  )
}

export default MovieTrendingWeekList
