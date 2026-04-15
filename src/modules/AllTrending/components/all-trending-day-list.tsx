"use client"

import useSWR from "swr"
import { TrendingAllDay } from "../lib/action"
import { useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { GetImageLink } from "@/shared/types/consts"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Fade from "embla-carousel-fade"
import Autoplay from "embla-carousel-autoplay"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import GenreListMovieComponent from "@/shared/components/GenreMovie"
import GenreListTvComponent from "@/shared/components/GenreTv"
import ErrorContainer from "@/shared/components/ErrorContainer"
import CardSkeleton from "@/shared/components/CardSkeleton"

const AllTrendingDayList = () => {
  const searchParams = useSearchParams()
  const fetcher = async () => {
    const result = await TrendingAllDay()
    if (result.success) {
      return result.data
    } else {
      throw new Error(result.data.message)
    }
  }

  const { data, error, isLoading } = useSWR(`all_trending_week_${searchParams.toString()}`, fetcher)

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
        <Carousel className="w-full p-0 m-0 rounded-none!"
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
          <CarouselContent className="p-0 m-0 rounded-none!">
            {data?.results.map((data, index) => (
              <CarouselItem key={index} className="p-0 rounded-none">
                <Link href={data.media_type == "movie" ? `/movie/${data.id}` : `tv/${data.id}`} className="cursor-pointer">
                  <Card className="overflow-visible relative text-wrap p-0 w-full aspect-[16/8]  ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0 shadow-none rounded-none!">
                    <Image unoptimized loading="eager" src={`${GetImageLink}${data?.backdrop_path}`} alt="movie-image" fill className="object-cover rounded-none!" />
                    <div className="w-full min-h-[200px] xl:bottom-0 xl:absolute ">
                      <div className="relative w-full h-[500px] text-white">
                        <div className="absolute bottom-0 inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

                        <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-10 max-w-3xl">
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
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      }
    </>

  )
}

export default AllTrendingDayList
