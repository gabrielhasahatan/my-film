"use client"
import { createContext, ReactNode, useContext } from "react";
import { TvDetailResponses } from "../types/responses";

const detailContext = createContext<{ detail: TvDetailResponses } | null>(null)



const TvDetailProvider = ({ children, detail }: { children: ReactNode, detail: TvDetailResponses }) => {
  return (
    <detailContext.Provider value={{ detail: detail }}>
      {children}
    </detailContext.Provider>
  )
}

export default TvDetailProvider


export const useTvDetailContext = () => {
  const ctx = useContext(detailContext)
  if (!ctx) {
    throw new Error("useTvDetailContext harus digunakan didalam TvDetailProvider")
  }
  return ctx
}
