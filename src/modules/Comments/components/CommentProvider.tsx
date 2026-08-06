"use client"

import { createContext, ReactNode, useContext, useState } from "react"

type CommentContextType = {
  activeReplyId: string | null
  setActiveReplyId: (id: string | null) => void
}

const CommentContext = createContext<CommentContextType>({
  activeReplyId: null,
  setActiveReplyId: () => { }
})

const CommentProvider = ({ children }: { children: ReactNode }) => {
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null)

  return (
    <CommentContext.Provider value={{ activeReplyId, setActiveReplyId }}>
      {children}
    </CommentContext.Provider>
  )
}


export const useCommentContext = () => {
  const ctx = useContext(CommentContext)
  if (ctx) {
    return ctx
  } else {
    throw new Error("useCommentContext harus digunakan didalam CommentProvider")
  }
}

export default CommentProvider
