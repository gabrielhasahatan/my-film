import ErrorContainer from "@/shared/components/error-container"
import { collectionsWatchListsDetail } from "../lib/action"
import { CollectionWatchListsEntity } from "../types/entity"
import useSWR from "swr"
import Link from "next/link"
import { BadgeMovie, BadgeTv } from "@/shared/components/badge-type"
import Image from "next/image"
import { GetImageLink342 } from "@/shared/types/consts"
import { DetailMovieResponses } from "@/modules/MovieDetail/types/responses"
import { TvDetailResponses } from "@/modules/TvSeasonDetail/types/responses"
import { Bookmark } from "lucide-react"

const CollectionsWatchListsItem = ({ media_id, media_type, watchListInfo }: { media_id: string, media_type: "tv" | "movie", watchListInfo: CollectionWatchListsEntity }) => {
  const fetcher = async () => {
    const result = await collectionsWatchListsDetail({ media_id: media_id, media_type: media_type })
    if (result.success) {
      return result.data
    } else {
      throw new Error(result.data.message)
    }
  }


  const { data: detail, error, isLoading } = useSWR(`collections_watchlists_${media_type}_${media_id}_item`, fetcher)
  if (error) {
    return <ErrorContainer />
  }
  return (
    <div className="p-3">
      <Link
        href={`/tv/${detail?.id}`}
        className="flex-shrink-0 w-[140px] sm:w-[155px] md:w-[170px] group cursor-pointer"
      >
        <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden border border-white/10 shadow-lg group-hover:border-white/40 transition duration-300">
          {
            media_type == "movie" ? <BadgeMovie /> : <BadgeTv />
          }
          {detail?.backdrop_path ? (
            <Image
              loading="lazy"
              src={`${GetImageLink342}${detail.poster_path}`}
              alt="collections-comment-image"
              fill
              sizes="120px"
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full animate-pulse bg-muted" />
          )}
          <div className="absolute top-0 right-3 z-10 w-4 h-8 sm:w-6 sm:h-10">
            <svg viewBox="0 0 100 200" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <path
                d="M0,0 L100,0 L100,180 L50,150 L0,180 Z"
                className="fill-purple-600"
              />
              <path
                d="M0,0 L0,180 L50,150 L100,180 L100,0"
                fill="none"
                stroke="black"
                strokeWidth="0.3"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <Bookmark
              className="absolute top-2.5 left-1/2 -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4"
              strokeWidth={2}
              fill="white"
            />
          </div>
        </div>
        <p className="mt-2 px-1 text-sm text-white/80 group-hover:text-white line-clamp-2 leading-snug transition duration-200">
          {media_type == "movie" ? (detail as DetailMovieResponses)?.title : (detail as TvDetailResponses)?.name}
        </p>
      </Link>
    </div>
  )
}

export default CollectionsWatchListsItem
