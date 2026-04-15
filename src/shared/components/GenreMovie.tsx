"use client"

import useSWR from "swr"
import { GenreMovieList } from "../lib/action"
import ErrorContainer from "./ErrorContainer"

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
          <span
            key={i}
            className="px-3 py-1 bg-white/10 rounded-full text-sm"
          >
            {genre.name}
          </span>
        ))
      }
    </div>
  )
}

export default GenreListMovieComponent
