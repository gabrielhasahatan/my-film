"use client"
import { createContext, ReactNode, useContext } from "react"
import { DetailMovieResponses } from "../types/responses"

const detailContext = createContext<{ detail: DetailMovieResponses } | null>(null)

const MovieDetailProvider = ({ children, detail }: { children: ReactNode, detail: DetailMovieResponses }) => {
  return (
    <detailContext.Provider value={{ detail: detail }}>
      {children}
    </detailContext.Provider>
  )
}

export const UseDetailContext = () => {
  const ctx = useContext(detailContext)
  if (!ctx) {
    throw new Error("UseDetailContext harus digunakan didalam MovieDetailProvider")
  }
  return ctx
}


export default MovieDetailProvider 
