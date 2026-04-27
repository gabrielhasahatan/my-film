"use client"

import useSWR from "swr"
import { GenreMovieList } from "../lib/action"
import ErrorContainer from "./ErrorContainer"
import { Badge } from "@/components/ui/badge"

const GenreListMovieComponent = ({ genreId }: { genreId: number[] }) => {
  const fetcher = async () => {
    const result = await GenreMovieList()
    if (result.success) {
      return result.data
    } else {
      throw new Error(result.data.message)
    }
  }
  const { data, error } = useSWR(`genre_movie_list`, fetcher)
  if (error) {
    return <ErrorContainer />
  }
  const genreFiltered = data?.genres.filter(genre => genreId.includes(genre.id))

  return (
    <div className="flex gap-2">
      {
        genreFiltered?.map((genre, i) => (
          <Badge
            key={i}
            variant="outline"
            className="border-white/20 text-white/50 text-sm px-2.5 py-0.5 bg-transparent backdrop-blur-sm font-normal"
          >
            {genre.name}
          </Badge>

        ))
      }
    </div>
  )
}

export default GenreListMovieComponent
