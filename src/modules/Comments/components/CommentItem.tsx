"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MessageCircleMore, MoreHorizontal } from "lucide-react"
import { CommentEntity } from "../types/entity"
import dayjs from "dayjs"
import { CommentReplies } from "../lib/action"
import { CommentsListResponses } from "../types/responses"
import useSWRInfinite from "swr/infinite"
import CommentReplyForm from "./CommentReplyForm"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { DATE_TIME } from "@/shared/types/consts"

const CommentItem = ({ comment, onSuccess }: { comment: CommentEntity, onSuccess?: () => void }) => {
  const { data: session } = useSession()
  const [isReply, setIsReply] = useState(false)
  const fetcher = async (key: string) => {
    const cursor = key.split("_").at(-1)
    const result = await CommentReplies({ parent_id: comment.id, cursor: cursor === "0" ? undefined : cursor })
    if (result.success) {
      return result.data
    } else {
      throw new Error(result.data.message)
    }
  }

  const getKey = (pageIndex: number, pageData: CommentsListResponses) => {
    // Buat nge prevent fetcher nya biar tidak nge fetch ketika tidak ada data
    if (comment.reply_count === 0) return null
    if (pageData && !pageData.has_more) return null
    if (pageIndex === 0) {
      return `comments_replies_${comment.id}_0`
    }
    return `comments_replies_${comment.id}_${pageData.next_cursor}`
  }

  const { data, error, isLoading, setSize, size, mutate } = useSWRInfinite(getKey, fetcher, { revalidateFirstPage: false })

  if (error) {
    return <div className="text-white">{error.message}</div>
  }

  const commentsAllFlat = data?.flatMap(data => data?.data) ?? []
  const dataInfo = data?.at(-1)

  return (
    <div>
      <Card className="!gap-0 !border-none ring-0 !py-0">
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
              {dayjs(comment.created_at).format(DATE_TIME)}
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
                <DropdownMenuItem className="hover:bg-gray-200 cursor-pointer">Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground px-5">{comment.content}</p>
        </CardContent>
        <CardFooter className="ml-2">
          <div className="flex flex-col gap-4 w-full items-start">
            <Button className="flex gap-3 items-center cursor-pointer" type="button" onClick={() => {
              session ? setIsReply(prev => !prev) : toast.error("Silahkan login untuk berinteraksi")
            }}>
              <MessageCircleMore color="blue" size={12} />
              balas
            </Button>
            {
              isReply ?
                <CommentReplyForm
                  parent_id={comment.id.toString()}
                  media_id={comment.media_id}
                  media_type={comment.media_type}
                  onSuccess={() => {
                    mutate()
                    onSuccess?.()
                    setIsReply(false)
                  }}
                />
                : null
            }
          </div>
        </CardFooter>
      </Card>

      {comment.reply_count > 0 && (
        <div>
          <div className="ml-6 relative ">
            <div className="absolute left-1 -top-12 h-[99%]  border-l-2 border-zinc-800"></div>
            {commentsAllFlat.map((commentNested) => (
              <div key={commentNested.id} className="relative">
                <div
                  className="absolute left-1 -top-3 w-[20px] h-[25px] 
                       border-l-2 border-b-2 border-zinc-800 rounded-bl-xl"
                />
                <CommentItem comment={commentNested} onSuccess={() => {
                  mutate()
                  // biar jalan onSuccess dari instance atas nya
                  // supaya refresh berantai
                  onSuccess?.()
                  // kalau onSuccess gaada maka onSuccess saat ini gak dijalankan child ya
                }} />
              </div>
            ))}
          </div>
          <div className="ml-16">
            {isLoading && <div className="text-sm text-gray-400">Memuat balasan...</div>}
            {dataInfo?.has_more && !isLoading && (
              <button
                onClick={() => setSize(size + 1)}
                className="text-sm text-blue-500 hover:underline cursor-pointer"
              >
                Lihat balasan lainnya...
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CommentItem
