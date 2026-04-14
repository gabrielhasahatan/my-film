import { Button } from "@/components/ui/button"
import { getPaginationRange } from "../lib/getPaginationRange"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { TMDB_MAX_PAGE } from "@/shared/types/consts"

export const PaginationMovieSimilar = ({ currentPage, totalPages, onPageChange }: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) => {

  const { range, safeTotalPages } = getPaginationRange(currentPage, totalPages)


  return (
    <>
      {currentPage == TMDB_MAX_PAGE && (
        <p className="text-xs text-gray-400">
          Menampilkan batas halaman
        </p>
      )}
      <Pagination className="overflow-scroll sm:overflow-hidden">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious className={`disabled:opacity-40 text-gray-400 ${currentPage == 1 ? "hidden" : "flex"}`}
              onClick={() => onPageChange(currentPage - 1)} />
          </PaginationItem>
          {range.map((page, index) =>
            page === "..." ? (
              <PaginationEllipsis className="text-gray-400" key={index} />
            ) : (
              <PaginationItem key={index}>
                <Button
                  key={index}
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-1 ${page === currentPage
                    ? "bg-gray-400 text-black font-bold"
                    : "text-gray-400 hover:bg-white/20"
                    }`}
                >
                  {page}
                </Button>
              </PaginationItem>

            )
          )}
          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(currentPage + 1)}
              className={`disabled:opacity-40 text-gray-400 ${currentPage === safeTotalPages ? "hidden" : "flex"}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}
