"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { CreateCommentParams, createCommentSchema } from "../lib/params"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"
import { CommentCreate } from "../lib/action"
import { toast } from "sonner"
import { SendHorizontal } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

const CommentForm = ({ media_id, media_type, backdrop, onSuccess }: { media_id: string, media_type: string, backdrop?: string | null, onSuccess?: () => void }) => {
  const { data: session } = useSession()
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const form = useForm<CreateCommentParams>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      media_id: media_id,
      media_type: media_type,
      backdrop: backdrop,
      content: ""
    }
  })

  const submit = (data: CreateCommentParams) => {
    startTransition(async () => {
      const result = await CommentCreate(data)
      if (result.success) {
        toast.success(result.data.message)
        form.resetField('content')
        onSuccess?.()
      } else {
        toast.error(result.data.message)
      }
    })
  }

  return (
    <div className="w-full p-4 text-white flex justify-center">
      {
        session ?
          <div className="flex w-full max-w-6xl items-start gap-4 ">
            <Avatar className="w-6 h-6">
              <AvatarImage src={session?.user.imageUrl || undefined} />
              <AvatarFallback className="text-xs border-gray-800 text-black border bg-purple-500">
                {session?.user.username?.charAt(0).toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>
            <div className="flex min-h-[140px] flex-1 flex-col justify-between rounded-xl border border-zinc-800 bg-[#141414] p-3 transition-colors focus-within:border-zinc-700 focus-within:ring-1 focus-within:ring-zinc-700">
              <form onSubmit={form.handleSubmit(submit)} id="comment-create-form">
                <Controller control={form.control} name="content" render={({ field, fieldState }) => (
                  <>
                    <Textarea
                      {...field}
                      placeholder="Tulis komentar anda..."
                      className="min-h-[120px] resize-y border-border dark:bg-input/30 placeholder:text-muted-foreground"
                    />
                  </>
                )} />
                <div className="mt-3 flex items-center justify-between border-t border-transparent pt-2">
                  <div className="flex items-center gap-4">
                    <Button
                      className="h-8 rounded-lg bg-[#452E5A] px-6 text-sm font-medium text-white hover:bg-[#362F4F] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                      type="submit"
                      form="comment-create-form"
                    >
                      Kirim
                      {isPending ? <Spinner /> : <SendHorizontal />}
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
                router.push("/login")
              }}>
                Login
              </Button>
            </CardFooter>
          </Card>
      }
    </div>
  )
}

export default CommentForm
