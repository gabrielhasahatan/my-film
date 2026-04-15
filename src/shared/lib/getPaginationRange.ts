import { TMDB_MAX_PAGE } from "@/shared/types/consts"

export const getPaginationRange = (currentPage: number, totalPages: number) => {
  const safeTotalPages = Math.min(totalPages, TMDB_MAX_PAGE) // cap di 500
  const delta = 2

  const range: (number | "...")[] = []
  const left = Math.max(2, currentPage - delta)
  const right = Math.min(safeTotalPages - 1, currentPage + delta)

  range.push(1)
  if (left > 2) range.push("...")
  for (let i = left; i <= right; i++) range.push(i)
  if (right < safeTotalPages - 1) range.push("...")
  if (safeTotalPages > 1) range.push(safeTotalPages)

  return { range, safeTotalPages }
}
