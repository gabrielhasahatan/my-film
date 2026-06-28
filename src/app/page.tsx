import AllTrendingDayList from "@/modules/AllTrending/components/all-trending-day-list"
import ProviderSeriesHorizontal from "@/modules/ProviderSeriesList/components/provider-series-horizontal"
import TvPopularList from "@/modules/TvPopular/components/tv-popular-list"
import { Suspense } from "react"

const page = () => {
  return (
    <>
      <Suspense>
        <AllTrendingDayList />
        <TvPopularList />
        <ProviderSeriesHorizontal />
      </Suspense>
    </>
  )
}

export default page
