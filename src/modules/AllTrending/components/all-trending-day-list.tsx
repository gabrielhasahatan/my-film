"use client"

import useSWR from "swr"
import { TrendingAllDay } from "../lib/action"
import { useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { GetImageLink } from "@/shared/types/consts"
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Fade from "embla-carousel-fade"
import Autoplay from "embla-carousel-autoplay"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import GenreListMovieComponent from "@/shared/components/GenreMovie"
import GenreListTvComponent from "@/shared/components/GenreTv"
import ErrorContainer from "@/shared/components/ErrorContainer"
import CardSkeleton from "@/shared/components/CardSkeleton"
import { useCallback, useEffect, useState } from "react"

const AllTrendingDayList = () => {
  const searchParams = useSearchParams()
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [openTrending, setOpenTrending] = useState(true)
  const fetcher = async () => {
    const result = await TrendingAllDay()
    if (result.success) {
      return result.data
    } else {
      throw new Error(result.data.message)
    }
  }

  const { data, error, isLoading } = useSWR(`all_trending_week_${searchParams.toString()}`, fetcher)
  console.log({ data })

  useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])


  if (error) {
    return <ErrorContainer />
  }

  return (
    <>
      {isLoading ?
        <div className="w-[80%] h-[80%] mx-auto">
          <CardSkeleton />
        </div>
        :
        <div className="group">
          <Carousel className="w-full p-0 m-0 rounded-none! relative"
            setApi={setApi}
            opts={{
              loop: true
            }}
            plugins={[
              Fade(),
              Autoplay({
                delay: 5000,
                stopOnInteraction: false,
              })
            ]}>
            <div className="absolute top-[40%] -translate-y-1/2 left-0 z-[1] flex items-center group/label">
              <div
                className="relative cursor-pointer"
              >
                <div className={`transition-all duration-500 ease-in-out overflow-hidden flex items-center`}>
                  <div className="bg-black/60 backdrop-blur-sm border-r border-purple-500/40 rounded-r-lg py-3 px-0.5 md:px-1.5 flex flex-col items-center gap-1">
                    <div className="w-0.5 h-6 md:h-10 bg-gradient-to-b from-purple-400 via-pink-400 to-purple-600 rounded-full" />
                    <span className="text-[6px] md:text-[9px] uppercase tracking-[0.3em] text-purple-300 font-semibold"
                      style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
                      Trending This Week
                    </span>
                    <div className="w-0.5 h-6 bg-gradient-to-b from-purple-600 to-transparent rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <CarouselContent className="p-0 m-0 rounded-none!">
              {data?.results.map((data, index) => (
                <CarouselItem key={index} className="p-0 relative rounded-none">
                  <Link href={data.media_type == "movie" ? `/movie/${data.id}` : `tv/${data.id}`} className="cursor-pointer">
                    <Card className="overflow-visible relative text-wrap p-0 w-full aspect-[16/8]  ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0 shadow-none rounded-none!">
                      <Image unoptimized loading="eager" src={`${GetImageLink}${data?.backdrop_path}`} alt="movie-image" fill className="object-cover transition duration-300 ease-out" />
                      <div className="w-full min-h-[200px] xl:bottom-0 xl:absolute ">
                        <div className="relative w-full h-[500px] text-white">
                          <div className="absolute bottom-0 inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

                          <div className="relative z-50 flex flex-col justify-end h-full p-6 md:p-10 max-w-3xl">
                            <div className="flex items-center gap-2 mb-4">
                              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-amber-400 border border-amber-400/40 bg-amber-400/10 px-2.5 py-1 rounded-full">
                                {data.media_type === "movie" ? "Movie" : "Tv Series"}
                              </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold mb-3">{data.title ?? data.name}</h1>
                            {
                              data.release_date ? <div className="flex items-center gap-4 text-sm md:text-base text-gray-300 mb-3">
                                <span>{data.release_date}</span>
                              </div>
                                : <div className="flex items-center gap-4 text-sm md:text-base text-gray-300 mb-3">
                                  <span>-</span>
                                </div>
                            }
                            <div className="flex flex-wrap gap-2 mb-4">
                              {data.vote_average > 0 && (
                                <span className="text-md uppercase tracking-[0.2em] font-semibold text-white/50 flex items-center gap-1">
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                  </svg>
                                  {data.vote_average.toFixed(1)}
                                </span>
                              )}
                              {
                                data.media_type == "movie"
                                  ? <GenreListMovieComponent genreId={data.genre_ids} />
                                  : <GenreListTvComponent genreId={data.genre_ids} />
                              }
                            </div>
                            <p className="text-gray-200 text-sm md:text-base line-clamp-4">
                              {data.overview}
                            </p>
                            <div className="flex gap-3 mt-5">
                              <Button className="bg-white/20 px-5 py-2 rounded-md hover:bg-white/30 transition">
                                + Watchlist
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                  {count > 0 && (
                    <div className="absolute left-2 bottom-0 md:right-14 z-50 py-2  flex items-center gap-1.5">
                      {Array.from({ length: count }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => api?.scrollTo(i)}
                          className={`transition-all duration-300 rounded-full cursor-pointer ${i === current
                            ? "w-6 h-2 bg-purple-900"
                            : "w-2 h-2 bg-white/30 hover:bg-purple-400/60"}
                                      `}
                        />
                      ))}
                    </div>
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

        </div>
      }
    </>

  )
}

export default AllTrendingDayList
