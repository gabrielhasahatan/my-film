"use client"

import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import { CommentsList } from "../lib/action";
import useSWRInfinite from "swr/infinite";
import { CommentsListResponses } from "../types/responses";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { Fragment } from "react/jsx-runtime";

export const CommentsUser = ({ media_type, media_id, backdrop }: { media_type: string, media_id: string, backdrop?: string | null }) => {
  const fetcher = async (key: string) => {
    const cursor = key.split("_").at(-1)
    const result = await CommentsList({ media_type: media_type, media_id: media_id, cursor: cursor === "0" ? undefined : cursor })
    if (result.success) {
      return result.data
    } else {
      throw new Error(result.data.message)
    }
  }
  const getKey = (pageIndex: number, pageData: CommentsListResponses) => {
    if (pageData && !pageData.has_more) return null
    if (pageIndex === 0) {
      return `comments_user_${media_type}_${media_id}_0`
    }
    return `comments_user_${media_type}_${media_id}_${pageData.next_cursor}`
  }

  const { data, error, isLoading, setSize, size, mutate } = useSWRInfinite(getKey, fetcher, { revalidateFirstPage: false })

  if (error) {
    return <div className="text-white">{error.message}</div>
  }

  const commentsAllFlat = data?.flatMap(data => data.data) ?? []
  const totalData = data?.[0].total ?? "0"
  const dataInfo = data?.at(-1)
  console.log({ data })
  console.log({ dataInfo })

  return (
    <section className="antialiased">
      <div className="bg-black w-full p-10 text-gray-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-foreground">
            Komentar ({totalData})
          </h2>
        </div>

        {
          isLoading ?
            <div className="flex flex-col gap-5">
              {Array.from({ length: 5 }).map((_, idx) => {
                return (
                  <div key={idx} className="flex items-center w-full gap-4 ml-4">
                    <Skeleton className="h-12 w-12 rounded-full bg-gray-600" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px] bg-gray-600" />
                      <Skeleton className="h-4 w-4xl bg-gray-600" />
                    </div>
                  </div>
                )
              })}
            </div>
            :
            <>
              <CommentForm backdrop={backdrop} media_type={media_type} media_id={media_id} onSuccess={() => {
                mutate()
              }} />
              <div className="mx-4">
                {
                  commentsAllFlat.map((comment, i) => {
                    return (
                      <Fragment key={i}>
                        <CommentItem backdrop={backdrop} comment={comment} onSuccess={() => {
                          mutate()
                        }} />
                      </Fragment>
                    )
                  })
                }
              </div>
              {dataInfo?.has_more ?
                <Button variant='outline' className="my-4 rounded-full p-4" onClick={() => {
                  setSize(size + 1)
                }}>
                  {isLoading ? <Spinner /> : <ArrowDown />}
                  Lihat lebih banyak
                </Button>
                :
                <>
                  {parseInt(dataInfo?.total ?? "0") > parseInt(dataInfo?.per_page!) ?
                    <Button variant='outline' className="my-4 rounded-full p-4" onClick={() => {
                      setSize(1)
                    }}>
                      {isLoading ? <Spinner /> : <ArrowUp />}
                      Lihat lebih sedikit
                    </Button>
                    :
                    null

                  }
                </>
              }

            </>
        }
      </div>
    </section>
  );
};
