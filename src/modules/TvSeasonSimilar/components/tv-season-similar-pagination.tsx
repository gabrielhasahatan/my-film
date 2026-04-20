import { Button } from "@/components/ui/button"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { getPaginationRange } from "@/shared/lib/getPaginationRange"
import { TMDB_MAX_PAGE } from "@/shared/types/consts"

export const TvSeasonSimilarPagination = ({ currentPage, totalPages, onPageChange }: {
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
      <Pagination className="overflow-scroll sm:overflow-hidden my-5">
        <PaginationContent className="gap-0">
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious className={`disabled:opacity-40 text-gray-400 ${currentPage == 1 ? "hidden" : "flex"}`}
              onClick={() => onPageChange(currentPage - 1)} />
          </PaginationItem>
          {range.map((page, index) =>
            page === "..." ? (
              <PaginationEllipsis className="text-gray-400 p-0 m-0 size-3" key={index} />
            ) : (
              <PaginationItem key={index}>
                <Button
                  key={index}
                  onClick={() => onPageChange(page)}
                  className={`py-1 px-[6px] sm:px-5 ${page === currentPage
                    ? "bg-gray-400 text-black font-bold"
                    : "text-gray-400 hover:bg-white/20 cursor-pointer "
                    }`}
                >
                  {page}
                </Button>
              </PaginationItem>

            )
          )}
          <PaginationItem className="cursor-pointer">
            <PaginationNext
              onClick={() => onPageChange(currentPage + 1)}
              className={`disabled:opacity-40 text-gray-400 ${currentPage === safeTotalPages ? "hidden" : "flex"}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}
