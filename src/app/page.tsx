import AllTrendingDayList from "@/modules/AllTrending/components/all-trending-day-list"
import NetflixSeriesHorizontal from "@/modules/Netflix/components/netflix-series-horizontal";
import TvPopularList from "@/modules/TvPopular/components/tv-popular-list"

const page = () => {
  return (
    <>
      <AllTrendingDayList />
      <TvPopularList />
      <NetflixSeriesHorizontal />
    </>
  )
}

export default page
