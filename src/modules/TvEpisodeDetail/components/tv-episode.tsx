"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image"
import { GetImageLink, GetImageLink342 } from "@/shared/types/consts"
import { Button } from "@/components/ui/button"
import { memo, useState } from "react"
import { useEpisodeContext } from "./tv-episode-provider"
import { EpisodeImagesList } from "../lib/action"
import { useParams } from "next/navigation"
import useSWR from "swr"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import CardSkeleton from "@/shared/components/CardSkeleton"
import ErrorContainer from "@/shared/components/ErrorContainer"
import TvEpisodePlayer from "@/shared/components/TvEpisodePlayer"
import TvEpisodeButtonClose from "./tv-episode-button-close"

const TvPlayedMemo = memo(({ seriesId, season, episode }: { seriesId: string, season: string, episode: string }) => {
  return <TvEpisodePlayer seriesId={seriesId} season={season} episode={episode} />
})

const TvEpisode = () => {
  const params = useParams<{ id: string, seasonId: string, episodeId: string }>()
  const { detail } = useEpisodeContext()
  const [playVideo, setPlayVideo] = useState(false)

  const fetcher = async () => {
    const result = await EpisodeImagesList({ seriesId: params.id, season: detail.season_number.toString(), episode: detail.episode_number.toString() })
    if (result.success) {
      return result.data
    } else {
      throw new Error(result.data.message)
    }
  }
  const { data, error, isLoading } = useSWR(`season_${detail.id}_episode_${params.episodeId}`, fetcher)

  const airDate = detail.air_date
    ? new Date(detail.air_date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    : null

  const directors = detail.crew?.filter((c) => c.job === "Director") ?? []
  const writers = detail.crew?.filter((c) => c.department === "Writing").slice(0, 2) ?? []

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

          <div>
            {
              playVideo ?
                <>
                  <div className="h-[80px] bg-black"></div>
                  <div className="relative" >
                    <div onClick={() => {
                      setPlayVideo(false)
                    }} className={`cursor-pointer absolute mx-5 top-0 right-0 z-50`}>
                      <TvEpisodeButtonClose />
                    </div>
                    <TvPlayedMemo seriesId={params.id} season={detail.season_number.toString()} episode={detail.episode_number.toString()} />
                    <div className="w-full min-h-[200px]">
                      <div className="relative w-full h-[300px] text-white">
                        <div className="absolute bottom-0 inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                        <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-10 w-full">
                          <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-10">
                            <div className="flex flex-col gap-3 max-w-3xl">
                              <h1 className="text-lg md:text-2xl font-bold text-white/80  leading-tight tracking-tight drop-shadow-lg">
                                {detail.name}
                              </h1>
                              <div className="flex flex-wrap items-center gap-2">
                                <Badge className="bg-white/10 border border-white/20 text-white/80 text-sm tracking-widest uppercase px-2.5 py-0.5 backdrop-blur-sm font-normal">
                                  S{detail.season_number} · E{detail.episode_number}
                                </Badge>
                                {airDate && (
                                  <Badge
                                    variant="outline"
                                    className="border-white/20 text-white/50 text-sm px-2.5 py-0.5 bg-transparent backdrop-blur-sm font-normal"
                                  >
                                    {airDate}
                                  </Badge>
                                )}
                                {detail.runtime > 0 && (
                                  <Badge
                                    variant="outline"
                                    className="border-white/20 text-white/50 text-sm px-2.5 py-0.5 bg-transparent backdrop-blur-sm font-normal"
                                  >
                                    {detail.runtime} min
                                  </Badge>
                                )}
                                {detail.vote_count > 0 && (
                                  <>
                                    <Badge
                                      variant="secondary"
                                      className="bg-black/50 border border-white/20 text-amber-400 text-xs px-2.5 py-0.5 backdrop-blur-sm"
                                    >
                                      ★ {detail.vote_average?.toFixed(1)}
                                    </Badge>
                                    <Badge
                                      variant="secondary"
                                      className="bg-black/50 border border-white/20 text-white/60 text-xs px-2.5 py-0.5 backdrop-blur-sm"
                                    >
                                      {detail.vote_count?.toLocaleString()} votes
                                    </Badge>
                                  </>
                                )}
                              </div>
                              {detail.overview && (
                                <p className="text-gray-300 text-sm md:text-base line-clamp-2 leading-relaxed max-w-2xl">
                                  {detail.overview}
                                </p>
                              )}
                              {(directors.length > 0 || writers.length > 0 || detail.guest_stars?.length > 0) && (
                                <div className="flex flex-wrap items-start gap-x-6 gap-y-1 text-xs text-white/60">
                                  {directors.length > 0 && (
                                    <span>
                                      <span className="text-white/30 uppercase tracking-wider text-[10px] mr-1.5">Dir.</span>
                                      <span className="text-white/80">{directors.map((d) => d.name).join(", ")}</span>
                                    </span>
                                  )}
                                  {writers.length > 0 && (
                                    <span>
                                      <span className="text-white/30 uppercase tracking-wider text-[10px] mr-1.5">Written by</span>
                                      <span className="text-white/80">{writers.map((w) => w.name).join(", ")}</span>
                                    </span>
                                  )}
                                  {detail.guest_stars?.length > 0 && (
                                    <span>
                                      <span className="text-white/30 uppercase tracking-wider text-[10px] mr-1.5">Guests</span>
                                      <span className="text-white/80">
                                        {detail.guest_stars
                                          .slice(0, 4)
                                          .map((g) => g.name)
                                          .join(", ")}
                                        {detail.guest_stars.length > 4 && ` +${detail.guest_stars.length - 4}`}
                                      </span>
                                    </span>
                                  )}
                                </div>
                              )}
                              <Separator className="bg-white/10 my-1" />
                              <div className="flex gap-3">
                                <Button className="bg-white/20 px-5 py-2 rounded-md hover:bg-white/30 transition">
                                  + Watchlist
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
                :
                <Card className="overflow-visible relative text-wrap p-0 w-full aspect-[16/8]  ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0 shadow-none rounded-none!">
                  <Image unoptimized loading="eager" src={`${GetImageLink}${data?.stills[0].file_path}`} alt="movie-image" fill className="object-cover rounded-none!" />
                  <div className="w-full min-h-[200px] xl:bottom-0 xl:absolute ">
                    <div className="relative w-full h-[500px] text-white">
                      <div className="absolute bottom-0 inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                      <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-10 w-full">
                        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-10">
                          <div className="flex flex-col gap-3 max-w-3xl">
                            <h1 className="text-lg md:text-2xl font-bold text-white/80  leading-tight tracking-tight drop-shadow-lg">
                              {detail.name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge className="bg-white/10 border border-white/20 text-white/80 text-sm tracking-widest uppercase px-2.5 py-0.5 backdrop-blur-sm font-normal">
                                S{detail.season_number} · E{detail.episode_number}
                              </Badge>
                              {airDate && (
                                <Badge
                                  variant="outline"
                                  className="border-white/20 text-white/50 text-sm px-2.5 py-0.5 bg-transparent backdrop-blur-sm font-normal"
                                >
                                  {airDate}
                                </Badge>
                              )}
                              {detail.runtime > 0 && (
                                <Badge
                                  variant="outline"
                                  className="border-white/20 text-white/50 text-sm px-2.5 py-0.5 bg-transparent backdrop-blur-sm font-normal"
                                >
                                  {detail.runtime} min
                                </Badge>
                              )}
                              {detail.vote_count > 0 && (
                                <>
                                  <Badge
                                    variant="secondary"
                                    className="bg-black/50 border border-white/20 text-amber-400 text-xs px-2.5 py-0.5 backdrop-blur-sm"
                                  >
                                    ★ {detail.vote_average?.toFixed(1)}
                                  </Badge>
                                  <Badge
                                    variant="secondary"
                                    className="bg-black/50 border border-white/20 text-white/60 text-xs px-2.5 py-0.5 backdrop-blur-sm"
                                  >
                                    {detail.vote_count?.toLocaleString()} votes
                                  </Badge>
                                </>
                              )}
                            </div>
                            {detail.overview && (
                              <p className="text-gray-300 text-sm md:text-base line-clamp-2 leading-relaxed max-w-2xl">
                                {detail.overview}
                              </p>
                            )}
                            {(directors.length > 0 || writers.length > 0 || detail.guest_stars?.length > 0) && (
                              <div className="flex flex-wrap items-start gap-x-6 gap-y-1 text-xs text-white/60">
                                {directors.length > 0 && (
                                  <span>
                                    <span className="text-white/30 uppercase tracking-wider text-[10px] mr-1.5">Dir.</span>
                                    <span className="text-white/80">{directors.map((d) => d.name).join(", ")}</span>
                                  </span>
                                )}
                                {writers.length > 0 && (
                                  <span>
                                    <span className="text-white/30 uppercase tracking-wider text-[10px] mr-1.5">Written by</span>
                                    <span className="text-white/80">{writers.map((w) => w.name).join(", ")}</span>
                                  </span>
                                )}
                                {detail.guest_stars?.length > 0 && (
                                  <span>
                                    <span className="text-white/30 uppercase tracking-wider text-[10px] mr-1.5">Guests</span>
                                    <span className="text-white/80">
                                      {detail.guest_stars
                                        .slice(0, 4)
                                        .map((g) => g.name)
                                        .join(", ")}
                                      {detail.guest_stars.length > 4 && ` +${detail.guest_stars.length - 4}`}
                                    </span>
                                  </span>
                                )}
                              </div>
                            )}
                            <Separator className="bg-white/10 my-1" />
                            <div className="flex gap-3">
                              <Button
                                onClick={() => setPlayVideo(true)}
                                className="bg-white cursor-pointer text-black px-5 py-2 rounded-md font-semibold hover:bg-gray-200 transition text-sm"
                              >
                                ▶ Play
                              </Button>
                              <Button className="bg-white/20 px-5 py-2 rounded-md hover:bg-white/30 transition">
                                + Watchlist
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
            }
          </div>
      }
    </>
  )
}

export default TvEpisode
