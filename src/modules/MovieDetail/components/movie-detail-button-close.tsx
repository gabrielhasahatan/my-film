import { useUserActive } from "@/shared/hooks/useUserActive"
import { CircleX } from "lucide-react"

const MovieDetailButtonClose = () => {
  const isActive = useUserActive(2000)
  return (
    <div>
      <CircleX size={50} color="#ffffff" className={`size-10 transition-opacity duration-500  ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"}`} />
    </div>
  )
}

export default MovieDetailButtonClose
