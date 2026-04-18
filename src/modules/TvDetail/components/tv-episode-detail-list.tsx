"use client"
import { useState } from "react"
import useSWR from "swr"
import { TvEpisodesList } from "../lib/action"
import Image from "next/image"
import { GetImageLink780 } from "@/shared/types/consts"
import { Play, Clock, MonitorX } from "lucide-react"
import { Field, FieldGroup } from "@/components/ui/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTvDetailContext } from "./tv-detail-provider"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"

const TvEpisodeDetailList = () => {
  const { detail } = useTvDetailContext()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const defaultSeason = detail.seasons.length > 0 ? detail.seasons.length - 1 : 0
  const [seasonSelect, setSeasonSelect] = useState(defaultSeason.toString())
  const fetcher = async () => {
    const result = await TvEpisodesList({ seasonId: seasonSelect, seriesId: detail.id.toString() })
    if (result.success) return result.data
    throw new Error(result.data.message)
  }
  const { data, isLoading, } = useSWR(`tv_season_${seasonSelect}_episode`, fetcher, {
    onSuccess: () => {
      setShowDropdown(true)
    }
  })

  return (
    <div className="bg-black px-4 pt-4 pb-8">
      {
        showDropdown &&
        <>
          <FieldGroup className="w-full max-w-[150px] ">
            <Field className="bg-white/50 rounded-lg">
              <Select onValueChange={setSeasonSelect} defaultValue={detail.seasons[defaultSeason].season_number.toString()}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  position={"item-aligned"}
                >
                  <SelectGroup className="bg-gray-200 text-black">
                    {detail.seasons.map((eps, index) => {
                      return (
                        <SelectItem key={index} value={eps.season_number.toString()}>{eps.name == "Specials" ? "Spesial Season" : eps.name}</SelectItem>
                      )
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
          <div className="flex items-center justify-between my-5">
            {data && (
              <span className="text-white/30 text-xs tracking-widest uppercase">
                {data.episodes.length} Episodes
              </span>
            )}
          </div>
          <p className="text-white font-semibold text-base tracking-wide mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-red-500 rounded-full inline-block" />
            Episodes
          </p>
        </>
      }
      {isLoading ? (
        <div className="flex gap-3 overflow-x-auto pb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="shrink-0 w-[200px] animate-pulse">
              <div className="w-full h-[112px] bg-white/10 rounded-md" />
              <div className="mt-2 h-3 bg-white/10 rounded w-3/4" />
              <div className="mt-1 h-3 bg-white/10 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {data?.episodes.length == 0 ?
            <Empty className="text-white p-0 border w-full max-w-sm mx-auto border-dashed border-white">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <MonitorX />
                </EmptyMedia>
                <EmptyTitle>There's nothing here, wait for our update</EmptyTitle>
                <EmptyDescription>
                  Episode may be under repair or waiting for the latest
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
              </EmptyContent>
            </Empty>
            :
            data?.episodes.map((episode, index) => (
              <div
                key={index}
                className="shrink-0 w-[200px] group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative w-full aspect-video overflow-hidden rounded-md border border-white/20">
                  <Image
                    unoptimized
                    loading={index < 3 ? "eager" : "lazy"}
                    src={`${GetImageLink780}${episode.still_path}`}
                    alt={episode.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white/80 text-[10px] font-medium px-2 py-0.5 rounded">
                    {`E${episode.episode_number}`}
                  </div>
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <Play className="w-4 h-4 text-black fill-black ml-0.5" />
                    </div>
                  </div>
                  {episode.runtime && (
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white/70 text-[10px] px-1.5 py-0.5 rounded">
                      <Clock className="w-2.5 h-2.5" />
                      {`${episode.runtime}m`}
                    </div>
                  )}
                </div>

                <div className="mt-2.5 px-0.5">
                  <p className="text-white text-xs font-semibold leading-snug line-clamp-1 group-hover:text-white/80 transition-colors">
                    {episode.name}
                  </p>
                  {episode.overview && (
                    <p className="text-white/40 text-[11px] leading-snug line-clamp-2 mt-0.5">
                      {episode.overview}
                    </p>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default TvEpisodeDetailList
