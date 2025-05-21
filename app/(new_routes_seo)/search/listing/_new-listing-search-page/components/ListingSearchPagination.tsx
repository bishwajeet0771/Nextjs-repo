"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const dynamic = "force-dynamic";

type Props = {
  totalCount: number;
  currentPage: number; // 1-based index
  searchQueryParmeter ?: boolean
};

export default function ListingSearchPagination({ totalCount, currentPage,searchQueryParmeter = false }: Props) {
  const searchParams = useSearchParams();
  const isMobile = useMediaQuery("(max-width: 601px)");
  const pathname = usePathname();

  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const getPageNumbers = () => {
    const pageNumbers: number[] = [];
    const maxPagesToShow = isMobile ? 5 : 9;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      let startPage = Math.max(currentPage - 1, 2);
      let endPage = Math.min(startPage + maxPagesToShow - 3, totalPages - 1);

      if (endPage === totalPages - 1) {
        startPage = Math.max(endPage - (maxPagesToShow - 3), 2);
      }

      if (startPage > 2) {
        pageNumbers.push(-1); // Ellipsis before
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push(-2); // Ellipsis after
      }

      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const getCleanPath = () => {
    return pathname.replace(/\/page-\d+$/, ""); // remove trailing /page-*
  };

  const createPaginationLink = (page: number) => {
   
  
    if (searchQueryParmeter) {

      return `${pathname}?sf=${`page=${page}`}`;
    }
  
    const basePath = getCleanPath();
    const pathWithPage = page === 1 ? basePath : `${basePath}/page-${page}`;
    return  pathWithPage;
  };
  
  

  return (
    <section className="py-8 sm:py-14 container mx-auto px-4">
      {totalPages > 0 && (
        <div className="mt-10 flex justify-center">
          <nav className="flex items-center gap-1">
            {/* Previous */}
            <Link
              target="_top"
              href={currentPage > 1 ? createPaginationLink(currentPage - 1) : "#"}
              className={`inline-flex items-center justify-center h-10 w-10 rounded-md border border-blue-500 bg-white text-blue-600 text-sm font-medium shadow-sm transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 ${
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }`}
              aria-label="Previous page"
              tabIndex={currentPage === 1 ? -1 : 0}
            >
              <FaChevronLeft className="h-4 w-4" />
            </Link>

            {/* Page Numbers */}
            {getPageNumbers().map((pageNum, index) =>
              pageNum < 0 ? (
                <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                  ...
                </span>
              ) : (
                <Link
                  target="_top"
                  key={`page-${pageNum}`}
                  href={pageNum !== currentPage ? createPaginationLink(pageNum) : "#"}
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium transition-colors ${
                    currentPage === pageNum
                      ? "bg-blue-600 text-white"
                      : "border border-blue-500 bg-white text-blue-600 hover:bg-blue-50"
                  }`}
                  aria-label={`Page ${pageNum}`}
                  aria-current={currentPage === pageNum ? "page" : undefined}
                >
                  {pageNum}
                </Link>
              )
            )}

            {/* Next */}
            <Link
              target="_top"
              href={currentPage < totalPages ? createPaginationLink(currentPage + 1) : "#"}
              className={`inline-flex items-center justify-center h-10 w-10 rounded-md border border-blue-500 bg-white text-blue-600 text-sm font-medium shadow-sm transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 ${
                currentPage === totalPages ? "pointer-events-none opacity-50" : ""
              }`}
              aria-label="Next page"
              tabIndex={currentPage === totalPages ? -1 : 0}
            >
              <FaChevronRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}

      {/* Showing Results */}
      {totalCount > 0 && (
        <div className="mt-4 text-center text-sm text-gray-600">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} results
        </div>
      )}
    </section>
  );
}
