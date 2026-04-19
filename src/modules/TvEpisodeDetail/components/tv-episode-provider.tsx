"use client"

import { createContext, ReactNode, useContext } from "react";
import { EpisodeDetailResponses } from "../types/responses";

const detailContext = createContext<{ detail: EpisodeDetailResponses } | null>(null)

export const TvEpisodeProvider = ({ children, detail }: { children: ReactNode, detail: EpisodeDetailResponses }) => {
  return (
    <detailContext.Provider value={{ detail: detail }}>
      {children}
    </detailContext.Provider>
  )
}

export default TvEpisodeProvider

export const useEpisodeContext = () => {
  const ctx = useContext(detailContext)
  if (!ctx) {
    throw new Error("useDetailEpisodeContext harus digunakan didalam TvEpisodeDetailProvider")
  }
  return ctx
}
