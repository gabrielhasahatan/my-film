import { Badge } from "@/components/ui/badge"

export const BadgeMovie = () => {
  return (
    <>
      <Badge className="absolute top-0 float-left z-10 px-1 py-3 bg-gray-800/20 rounded-xs m-2 text-sm text-gray-50" variant="secondary">Movie</Badge>
    </>
  )
}

export const BadgeTv = () => {
  return (
    <>
      <Badge className="absolute top-0 float-left z-10 px-1 py-3 bg-gray-800/20 rounded-xs m-2 text-sm text-yellow-200" variant="secondary">TV</Badge>
    </>
  )
}
