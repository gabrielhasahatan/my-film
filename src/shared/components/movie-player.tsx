"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

const MoviePlayer = ({ id }: { id: string }) => {
  const links = [
    `https://vidsrcme.ru/embed/movie?tmdb=${id}`,
    `https://vidsrc.to/embed/movie/${id}`,
    `https://vidsrc.sh/embed/${id}`,
  ]

  const [serverIndex, setServerIndex] = useState("0")
  const [isLoading, setIsLoading] = useState(true)

  const currentStream = links[Number(serverIndex)] || links[0]

  const handleServerChange = (value: string) => {
    setIsLoading(true)
    setServerIndex(value)
  }

  return (
    <>
      <div className="relative w-full bg-neutral-950 rounded-lg overflow-hidden" style={{ aspectRatio: "16/7" }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-400 text-sm">
            Memuat server...
          </div>
        )}

        <iframe
          key={currentStream}
          src={currentStream}
          onLoad={() => setIsLoading(false)}
          className="w-full h-full border-0"
          referrerPolicy="origin"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={`movie-player-${id}`}
        />
      </div>

      <div className="mt-2 ml-2 w-fit">
        <Tabs
          value={serverIndex}
          onValueChange={handleServerChange}
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

export default MoviePlayer
