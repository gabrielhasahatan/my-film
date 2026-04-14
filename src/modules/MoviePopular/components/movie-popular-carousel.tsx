"use client"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useSearchParams } from "next/navigation"
import { IndexTopMovie } from "../lib/action"
import useSWR from "swr"
import Image from "next/image"
import { GetImageLink } from "@/shared/types/consts"
import Link from "next/link"
import Fade from "embla-carousel-fade"
import ErrorContainer from "@/shared/components/ErrorContainer"
import CardSkeleton from "@/shared/components/CardSkeleton"

const MoviePopularCarousel = () => {
  const searchParams = useSearchParams()
  const fetcher = async () => {
    const result = await IndexTopMovie(searchParams.toString())
    if (result.success) {
      return result.data
    } else {
      throw new Error(result.data.message)
    }
  }

  const { data, isLoading, error } = useSWR(`top_movie_${searchParams.toString()}`, fetcher)

  if (error) {
    return <ErrorContainer />
  }


  return (
    <>

      {
        isLoading ?
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
                  <Link href={`/movie/${data.id}`} className="cursor-pointer">
                    <Card className="relative text-wrap p-0 w-full aspect-[16/8] m-0 ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0 shadow-none rounded-none!">
                      <Image unoptimized loading="lazy" src={`${GetImageLink}${data.backdrop_path}`} alt={`${GetImageLink}${data.backdrop_path}`} fill className="object-cover rounded-none!" />
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

export default MoviePopularCarousel
