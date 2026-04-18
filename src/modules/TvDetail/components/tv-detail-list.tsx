"use client"
import { Card } from "@/components/ui/card"
import { useTvDetailContext } from "./tv-detail-provider"
import Image from "next/image"
import { GetImageLink } from "@/shared/types/consts"
import { Button } from "@/components/ui/button"
import useSWR from "swr"
import { TvTrailerList } from "../lib/action"
import ErrorContainer from "@/shared/components/ErrorContainer"
import TvTrailerHeadless from "./tv-trailer-headless"
import { memo, RefObject, useEffect, useMemo, useRef, useState } from "react"
import CardSkeleton from "@/shared/components/CardSkeleton"
import { MediaPlayerInstance } from "@vidstack/react"
import MovieDetailButtonClose from "@/modules/MovieDetail/components/movie-detail-button-close"

const TrailerMemo = memo(function TrailerMemo({
  href,
  playerRef
}: {
  href: string
  playerRef: RefObject<MediaPlayerInstance | null>
}) {
  return <TvTrailerHeadless href={href} playerRef={playerRef} />
})

const TvDetailList = () => {
  const { detail } = useTvDetailContext()
  const [playTrailer, setPlayTrailer] = useState(false)

  const fetcher = async () => {
    const result = await TvTrailerList(detail.id.toString())
    if (result.success) return result.data
    throw new Error(result.data.message)
  }

  const { data, isLoading, error } = useSWR(
    `tv_detail_${detail.id}`,
    fetcher,
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  )

  const trailerKey = useMemo(() => {
    return data?.results.find(t => t.type === 'Trailer')?.key
      ?? data?.results[0]?.key
  }, [data])


  const playerRef = useRef<MediaPlayerInstance>(null)

  useEffect(() => {
    if (!playerRef.current) return

    if (playTrailer) {
      const player = playerRef.current

      const tryPlay = () => {
        player.play().catch(() => { })
      }

      if (player.state.canPlay) {
        tryPlay()
      } else {
        player.addEventListener('can-play', tryPlay, { once: true })
        return () => player.removeEventListener('can-play', tryPlay)
      }
    } else {
      playerRef.current.pause().catch(() => { })
    }
  }, [playTrailer])

  if (error) return <ErrorContainer />

  if (isLoading) return (
    <div className="w-[80%] h-[80%] mx-auto">
      <CardSkeleton />
    </div>
  )

  return (
    <div className="relative">

      <div style={{
        height: playTrailer ? 0 : 'auto',
        overflow: 'hidden',
      }}>
        <Card

          className="overflow-visible relative text-wrap p-0 w-full aspect-[16/8] ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0 shadow-none rounded-none!"
        >
          <Image
            onClick={() => setPlayTrailer(true)}
            unoptimized
            loading="eager"
            src={`${GetImageLink}${detail?.backdrop_path}`}
            alt="movie-image"
            fill
            className="object-cover rounded-none!  cursor-pointer"
          />
          <div className="w-full min-h-[200px] xl:bottom-0 xl:absolute">
            <div className="relative w-full h-[500px] text-white">
              <div className="absolute bottom-0 inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
              <div className="relative flex flex-col justify-end h-full p-6 md:p-10 max-w-3xl">
                <h1 className="text-3xl md:text-5xl font-bold mb-3">{detail.original_name}</h1>
                <div className="flex items-center gap-4 text-sm md:text-base text-gray-300 mb-3">
                  <span>{detail.first_air_date}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {detail.genres.map((genre, index) => (
                    <span key={index} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                      {genre.name}
                    </span>
                  ))}
                </div>
                <p className="text-gray-200 text-sm md:text-base line-clamp-4">{detail.overview}</p>
                <div className="flex gap-3 mt-5">
                  <Button className="bg-white/20 px-5 py-2 rounded-md hover:bg-white/30 transition">
                    + Watchlist
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {trailerKey && (
        <div style={{
          height: playTrailer ? 'auto' : 0,
          overflow: 'hidden',
        }}>

          <div className="h-[80px] bg-black"></div>

          <div className="relative w-full aspect-video bg-black">
            <div onClick={() => {
              setPlayTrailer(false)
            }} className={`cursor-pointer absolute rounded-full mx-5 my-4 top-0 right-0 z-50`}>
              <MovieDetailButtonClose />
            </div>
            <TrailerMemo playerRef={playerRef} href={trailerKey} />
          </div>
        </div>
      )}
    </div>
  )
}

export default TvDetailList
