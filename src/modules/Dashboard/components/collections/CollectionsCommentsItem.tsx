"use client"

import useSWR from "swr"
import ErrorContainer from "@/shared/components/ErrorContainer"
import { MessageSquare } from "lucide-react"
import { DetailMovieResponses } from "@/modules/MovieDetail/types/responses"
import { TvDetailResponses } from "@/modules/TvSeasonDetail/types/responses"
import Image from "next/image"
import { GetImageLink342 } from "@/shared/types/consts"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { getRelativeTime } from "@/shared/utils/helper"
import { BadgeMovie, BadgeTv } from "@/shared/components/Badge"
import { CollectionsCommentsDetail } from "../../lib/action"
import { CollectionCommentsEntity } from "../../types/entity"

const CollectionCommentsItem = ({ media_id, media_type, userInfo }: { media_id: string, media_type: "tv" | "movie", userInfo: CollectionCommentsEntity }) => {
  const fetcher = async () => {
    const result = await CollectionsCommentsDetail({ media_id: media_id, media_type: media_type })
    if (result.success) {
      return result.data
    } else {
      throw new Error(result.data.message)
    }
  }


  const { data: detail, error, isLoading } = useSWR(`comments_${media_type}_${media_id}_item`, fetcher)
  if (error) {
    return <ErrorContainer />
  }
  console.log({ detail })

  return (
    <Link href={`/${media_type}/${media_id}`} className="w-full max-w-4xl bg-[#040D12]/80 flex overflow-hidden rounded-xl border border-border shadow-sm ">
      <div className="relative w-[100px] shrink-0 sm:w-[120px]">
        {
          media_type == "movie" ? <BadgeMovie /> : <BadgeTv />
        }
        <Card className="relative overflow-hidden text-wrap p-0 cursor-pointer w-[100px] h-[150px]">
          <div className="relative block h-full w-full">
            {detail?.backdrop_path ? (
              <Image
                loading="lazy"
                src={`${GetImageLink342}${detail.poster_path}`}
                alt="movie-image"
                fill
                sizes="120px"
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full animate-pulse bg-muted" />
            )}
          </div>
        </Card>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2">
          <h3 className="text-base font-semibold leading-none tracking-tight">
            {media_type === "movie" ? (detail as DetailMovieResponses)?.title : (detail as TvDetailResponses)?.name}
          </h3>
          <p className="mt-1.5 text-xs text-muted-foreground italic">
            {getRelativeTime(userInfo.created_at)}
          </p>
        </div>
        <div className="mt-4 text-sm text-foreground/90">
          {userInfo.content}
        </div>
        <div className="mt-auto flex items-center gap-5 text-xs font-medium text-muted-foreground">
          <div className="flex items-center gap-1.5 transition-colors hover:text-foreground">
            <MessageSquare className="h-4 w-4" />
            <span>{userInfo.reply_count} balasan</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CollectionCommentsItem
