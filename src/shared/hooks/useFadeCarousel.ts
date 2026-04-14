"use client"
import { useState, useCallback, useEffect, useRef } from "react"

export function useFadeCarousel(total: number, autoPlay = false, delay = 3500) {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((index: number) => {
    setCurrent((index + total) % total)
  }, [total])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  useEffect(() => {
    if (!autoPlay) return
    timerRef.current = setInterval(next, delay)
    return () => clearInterval(timerRef.current!)
  }, [autoPlay, delay, next])

  return { current, goTo, next, prev }
}
