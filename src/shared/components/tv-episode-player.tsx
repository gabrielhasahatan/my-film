"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

interface TvEpisodePlayerProps {
  seriesId: string
  season: string
  episode: string
}

const TvEpisodePlayer = ({ seriesId, season, episode }: TvEpisodePlayerProps) => {
  const links = [
    `https://vidsrcme.ru/embed/tv?tmdb=${seriesId}&season=${season}&episode=${episode}`,
    `https://vidsrc.to/embed/tv/${seriesId}/${season}/${episode}`,
    `https://vidsrc.sh/embed/tv/${seriesId}/${season}/${episode}`,
  ]

  const [serverIndex, setServerIndex] = useState("0")
  const [loadedStream, setLoadedStream] = useState<string | null>(null)

  const currentStream = links[Number(serverIndex)] || links[0]

  const isLoading = loadedStream !== currentStream

  return (
    <>
      <div
        className="relative w-full bg-neutral-950 rounded-lg overflow-hidden"
        style={{ aspectRatio: "16/7" }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-400 text-sm">
            Memuat episode...
          </div>
        )}

        <iframe
          key={currentStream}
          src={currentStream}
          onLoad={() => setLoadedStream(currentStream)}
          className="w-full h-full border-0"
          referrerPolicy="origin"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={`tv-player-${seriesId}-s${season}-e${episode}`}
        />
      </div>

      <div className="mt-2 ml-2 w-fit">
        <Tabs
          value={serverIndex}
          onValueChange={setServerIndex}
          className="w-fit"
        >
          <TabsList className="w-fit text-neutral-500 rounded-lg border-b-0 gap-1 p-0 max-w-full h-fit! bg-neutral-900/80 border border-neutral-800">
            {links.map((_, i) => (
              <TabsTrigger
                key={i}
                value={String(i)}
                className="font-bold text-sm md:text-base whitespace-nowrap rounded-md border-0 data-[state=active]:bg-neutral-800 data-[state=active]:text-neutral-50 data-[state=active]:shadow-none cursor-pointer"
              >
                {`Server ${i + 1}`}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </>
  )
}

export default TvEpisodePlayer
