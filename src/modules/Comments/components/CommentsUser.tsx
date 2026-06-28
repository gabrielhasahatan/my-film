"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown, ArrowUp, MoreHorizontal, } from "lucide-react";
import { CommentsList } from "../lib/action";
import useSWRInfinite from "swr/infinite";
import { CommentsListResponses } from "../types/responses";
import dayjs from "dayjs";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

export const CommentsUser = ({ media_type, media_id }: { media_type: string, media_id: string }) => {
  const { data: session } = useSession()
  const router = useRouter()
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

  const { data, error, isLoading, setSize, size } = useSWRInfinite(getKey, fetcher, { revalidateFirstPage: false })

  if (error) {
    return <div className="text-white">{error.message}</div>
  }

  const commentsAllFlat = data?.flatMap(data => data.data) ?? []
  const totalData = data?.[0].total ?? "0"
  const dataInfo = data?.at(-1)
  console.log({ data })
  console.log({ dataInfo })
  console.log({ session })

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
            <div className="flex items-center w-full gap-4 ml-4">
              <Skeleton className="h-12 w-12 rounded-full bg-gray-600" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-gray-600" />
                <Skeleton className="h-4 w-4xl bg-gray-600" />
              </div>
            </div>
            :
            <>
              {
                session ?
                  <div className="flex w-full max-w-6xl items-start gap-4 bg-[#0a0a0a] p-4 text-white">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={session?.user.imageUrl || undefined} />
                      <AvatarFallback className="text-xs border-gray-800 text-black border bg-purple-500">
                        {session?.user.username?.charAt(0).toUpperCase() || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex min-h-[140px] flex-1 flex-col justify-between rounded-xl border border-zinc-800 bg-[#141414] p-3 transition-colors focus-within:border-zinc-700 focus-within:ring-1 focus-within:ring-zinc-700">
                      <form>
                        <Textarea
                          placeholder="Write a comment..."
                          className="min-h-[120px] resize-y border-border dark:bg-input/30 placeholder:text-muted-foreground"
                        />
                        <div className="mt-3 flex items-center justify-between border-t border-transparent pt-2">
                          <div className="flex items-center gap-4">

                            <Button
                              className="h-8 rounded-lg bg-[#732a2a] px-6 text-sm font-medium text-white hover:bg-[#8c3232] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              Kirim
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  :
                  <Card size="sm" className="mx-auto w-full max-w-sm !border-none !ring-0 bg-white/20">
                    <CardHeader>
                      <CardTitle>Silahkan login untuk dapat berkomentar</CardTitle>
                    </CardHeader>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full cursor-pointer" onClick={() => {
                        router.replace("/login")
                      }}>
                        Login
                      </Button>
                    </CardFooter>
                  </Card>
              }
              {
                commentsAllFlat.map((comment, i) => {
                  return (
                    <Card key={i} className="!gap-0 !border-none ring-0">
                      <CardHeader>
                        <CardTitle className="flex gap-3 items-center">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={comment.user.image_url || undefined} />
                            <AvatarFallback className="text-xs border-gray-800 text-black border bg-purple-500">
                              {comment.user.username?.charAt(0).toUpperCase() || "?"}
                            </AvatarFallback>
                          </Avatar>
                          <p className="text-sm font-semibold text-foreground">
                            {comment.user.username}
                          </p>
                          <p className="text-sm text-gray-400 italic text-foreground">
                            {comment.user.email}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {dayjs(comment.created_at).format('YYYY-MM-DD')}
                          </p>
                        </CardTitle>
                        <CardAction>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground cursor-pointer">
                                <MoreHorizontal className="w-4 h-4" />
                                <span className="sr-only">Comment settings</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-white">
                              {
                                // <>
                                //   <DropdownMenuItem className="hover:bg-gray-200 cursor-pointer">Edit</DropdownMenuItem>
                                //   <DropdownMenuItem className="hover:bg-gray-200 cursor-pointer">Remove</DropdownMenuItem>
                                //
                                // </>
                              }
                              <DropdownMenuItem className="hover:bg-gray-200 cursor-pointer">Report</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </CardAction>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground px-5">{comment.content}</p>
                      </CardContent>
                    </Card>
                  )
                })
              }
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
