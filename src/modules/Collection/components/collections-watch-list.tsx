"use client"

import { LibraryBigIcon } from "lucide-react"
import Link from "next/link"
import { collectionsWatchList } from "../lib/action"
import useSWRInfinite from "swr/infinite"
import { CollectionsWatchListsResponses } from "../types/responses"
import CardSkeleton from "@/shared/components/card-skeleton"
import CollectionsWatchListsItem from "./collections-watch-lists-item"
import { Fragment } from "react/jsx-runtime"

const CollectionsWatchList = () => {

  const fetcher = async (key: string) => {
    const cursor = key.split('_').at(-1)
    const result = await collectionsWatchList({ cursor: cursor == "0" ? undefined : cursor })
    if (result.success) {
      return result.data
    } else {
      throw new Error(result.data.message)
    }
  }

  const getKey = (pageIndex: number, pageData: CollectionsWatchListsResponses) => {
    if (pageData && !pageData.has_more) return null

    if (pageIndex === 0) {
      return `collections_watchlists_0`
    }
    return `collection_watchlists_${pageData.next_cursor}`
  }

  const { data, setSize, size, error, isLoading } = useSWRInfinite(getKey, fetcher, { revalidateFirstPage: false })

  if (error) {
    return <div className='text-white'>{error.message}</div>
  }
  const collectionsWatchListsFlat = data?.flatMap(data => data.data)
  console.log({ collectionsWatchListsFlat })

  return (
    <div>
      {
        collectionsWatchListsFlat && collectionsWatchListsFlat?.length > 0 ? (
          <div className="py-6">
            {isLoading
              ?
              <div className="grid grid-cols-4">
                <div className="max-w-[200px]">
                  <CardSkeleton />
                </div>
                <div className="max-w-[200px]">
                  <CardSkeleton />
                </div>
                <div className="max-w-[200px]">
                  <CardSkeleton />
                </div>
                <div className="max-w-[200px]">
                  <CardSkeleton />
                </div>
              </div>
              :
              <div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
              >
                {collectionsWatchListsFlat.map((item, i) => {
                  return (
                    <Fragment key={i}>
                      <CollectionsWatchListsItem media_id={item.media_id} media_type={item.media_type} watchListInfo={item} />
                    </Fragment>
                  )
                })}
              </div>
            }
          </div>
        ) : (
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-8 text-center text-neutral-400">
            <LibraryBigIcon className="mx-auto mb-3 h-8 w-8 text-neutral-500" />
            <p className="text-base font-medium text-neutral-200">Belum ada daftar tontonan anda</p>
            <p className="mt-1 text-sm text-neutral-400">
              Tambahkan film atau serial TV yang ingin Anda tonton.
            </p>
            <Link
              href="/"
              className="inline-block mt-4 text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Jelajahi film &rarr;
            </Link>
          </div>
        )
      }
    </div>
  )
}

export default CollectionsWatchList
