import AllTrendingDayList from "@/modules/AllTrending/components/all-trending-day-list"
import ProviderSeriesHorizontal from "@/modules/ProviderSeriesList/components/provider-series-horizontal"
import TvPopularList from "@/modules/TvPopular/components/tv-popular-list"

const page = () => {
  return (
    <>
      <AllTrendingDayList />
      <TvPopularList />
      <ProviderSeriesHorizontal />
    </>
  )
}

export default page
