"use client"
import { createContext, ReactNode, useContext } from "react";
import { TvDetailResponses } from "../types/responses";

const detailContext = createContext<{ detail: TvDetailResponses } | null>(null)



const TvSeasonDetailProvider = ({ children, detail }: { children: ReactNode, detail: TvDetailResponses }) => {
  return (
    <detailContext.Provider value={{ detail: detail }}>
      {children}
    </detailContext.Provider>
  )
}

export default TvSeasonDetailProvider


export const useTvSeasonDetailContext = () => {
  const ctx = useContext(detailContext)
  if (!ctx) {
    throw new Error("useTvDetailContext harus digunakan didalam TvDetailProvider")
  }
  return ctx
}
