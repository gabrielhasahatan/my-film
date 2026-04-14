"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image"
import { UseDetailContext } from "./movie-detail-provider"
import { GetImageLink, GetImageLink342 } from "@/shared/types/consts"
import { ImageMovieList } from "@/shared/lib/action"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import MoviePlayer from "@/shared/components/MoviePlayer"
import { memo, useEffect, useRef, useState } from "react"
import { CircleX } from "lucide-react"
import ErrorContainer from "@/shared/components/ErrorContainer"
import CardSkeleton from "@/shared/components/CardSkeleton"


const MovieDetailHead = () => {
  const [playVideo, setPlayVideo] = useState(false)
  const { detail } = UseDetailContext()
  const fetcher = async () => {
    const response = await ImageMovieList(detail.id.toString())
    if (response.success) {
      return response.data
    } else {
      throw new Error(response.data.message)
    }
  }
  const [showClose, setShowClose] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleMouseMove = () => {
    setShowClose(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setShowClose(false);
    }, 3000);
  };
  const { data, error, isLoading } = useSWR(`movie-detail-head_${detail.id}`, fetcher)

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  if (error) {
    return <ErrorContainer />
  }

  const logos = data?.logos.filter(value => value.iso_639_1 == "en")

  console.log({ logos })

  return (
    <>
      {
        isLoading ?
          <div className="w-[80%] h-[80%] mx-auto">
            <CardSkeleton />
          </div>
          :
          <div onMouseMove={handleMouseMove}
            onMouseLeave={() => setShowClose(false)}>
            {
              playVideo ?
                <>
                  <div className="h-[80px] bg-black"></div>
                  <div className="relative" >
                    <div onClick={() => {
                      setPlayVideo(false)
                    }} className={`cursor-pointer absolute px-10 mx-5 top-0 hover:opacity-100 group right-0 z-50  `}>
                      <CircleX size={50} color="#ffffff" className={`group-hover:opacity-100 transition-opacity duration-500  ${showClose ? "opacity-100" : "opacity-0 pointer-events-none"}`} />
                    </div>
                    <MovieDetailPlayed id={detail.id.toString()} />
                    <div className="w-full min-h-[200px] ">
                      <div className="relative w-full h-[500px] text-white">
                        <div className="absolute bottom-0 inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

                        <div className="relative z-10 flex flex-col h-full p-6 md:p-10 max-w-3xl">
                          <h1 className="text-3xl md:text-5xl font-bold mb-3">{detail.title}</h1>

                          <div className="flex items-center gap-4 text-sm md:text-base text-gray-300 mb-3">
                            <span>{detail.release_date}</span>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {detail.genres.map((genre, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-white/10 rounded-full text-sm"
                              >
                                {genre.name}
                              </span>
                            ))}
                          </div>
                          <p className="text-gray-200 text-sm md:text-base line-clamp-4">
                            {detail.overview}
                          </p>
                          <div className="flex gap-3 mt-5">
                            <Button className="bg-white/20 px-5 py-2 rounded-md hover:bg-white/30 transition">
                              + Watchlist
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
                :
                <>
                  <Card className="overflow-visible relative text-wrap p-0 w-full aspect-[16/8]  ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0 shadow-none rounded-none!">
                    <Image unoptimized loading="lazy" src={`${GetImageLink}${data?.backdrops[0]?.file_path ?? data?.posters[0]?.file_path}`} alt="movie-image" fill className="object-cover rounded-none!" />
                    {logos!.length > 0 ?
                      <Image unoptimized loading="lazy" className="z-50 w-14 m-4 md:w-[100px] md:m-5 xl:w-[200px] xl:m-10"
                        src={`${GetImageLink342}${logos![0]?.file_path}`}
                        alt="logos" width={200} height={50} />
                      : null
                    }
                    <div className="w-full min-h-[200px] xl:bottom-0 xl:absolute ">
                      <div className="relative w-full h-[500px] text-white">
                        <div className="absolute bottom-0 inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

                        <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-10 max-w-3xl">
                          <h1 className="text-3xl md:text-5xl font-bold mb-3">{detail.title}</h1>

                          <div className="flex items-center gap-4 text-sm md:text-base text-gray-300 mb-3">
                            <span>{detail.release_date}</span>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {detail.genres.map((genre, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-white/10 rounded-full text-sm"
                              >
                                {genre.name}
                              </span>
                            ))}
                          </div>
                          <p className="text-gray-200 text-sm md:text-base line-clamp-4">
                            {detail.overview}
                          </p>
                          <div className="flex gap-3 mt-5">
                            <Button onClick={() => {
                              setPlayVideo(true)
                            }} className="bg-white cursor-pointer text-black px-5 py-2 rounded-md font-semibold hover:bg-gray-200 transition">
                              ▶ Play
                            </Button>
                            <Button className="bg-white/20 px-5 py-2 rounded-md hover:bg-white/30 transition">
                              + Watchlist
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </>

            }
          </div>
      }
    </>
  )
}

export default MovieDetailHead


const MovieDetailPlayed = memo(function MovieDetailPlayed({ id }: { id: string }) {
  return (
    <MoviePlayer id={id} />
  )
})
