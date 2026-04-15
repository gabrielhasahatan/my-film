"use client"
import { useEffect, useState } from "react"

export const useUserActive = (delay = 3000) => {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout

    const handleActivity = () => {
      setIsActive(true)
      clearTimeout(timer)
      timer = setTimeout(() => setIsActive(false), delay) // hilang setelah `delay` ms tidak ada gerakan
    }

    window.addEventListener("mousemove", handleActivity)
    window.addEventListener("touchstart", handleActivity) // support mobile

    return () => {
      window.removeEventListener("mousemove", handleActivity)
      window.removeEventListener("touchstart", handleActivity)
      clearTimeout(timer)
    }
  }, [delay])

  return isActive
}
