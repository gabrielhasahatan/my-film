"use client"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useSearchParams } from "next/navigation"
import useSWR from "swr"
import ErrorContainer from "@/components/ui/ErrorContainer"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import CardSkeleton from "@/components/ui/CardSkeleton"
import Link from "next/link"
import { IndexTopMovie } from "@/modules/MoviePopular/lib/action"
import { GetImageLink } from "@/shared/types/consts"

const MoviePopularList = () => {
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
  console.log({ data })
  if (error) {
    return <ErrorContainer />
  }

  return (
    <>
      <ScrollArea className="w-full rounded-md whitespace-nowrap">
        <div className="">
          {
            isLoading ?
              <div className="flex gap-4 w-fit">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </div> :
              <div className="flex space-x-4 m-4">
                {
                  data?.results.map((data, i) => {
                    return (
                      <Card key={i} className="relative text-wrap p-0 cursor-pointer w-[200px] h-[300px]">
                        <Link href={`/movie/${data.id}`}>
                          <Image loading="lazy" src={`${GetImageLink}${data.poster_path}`} alt="movie-image" layout="fill" objectFit="cover" />
                        </Link>
                      </Card>
                    )
                  })
                }
              </div>
          }
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

    </>
  )
}

export default MoviePopularList
