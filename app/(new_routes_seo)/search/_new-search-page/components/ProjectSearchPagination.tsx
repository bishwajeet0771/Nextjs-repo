"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useMediaQuery } from "@mantine/hooks";

export const dynamic = "force-dynamic";

type Props = {
  totalCount: number;
  currentPage:number;
};

export default function ProjectSearchPagination({ totalCount, currentPage }: Props) {
  // const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useMediaQuery("(max-width: 601px)");
  // Get page from URL or default to 0
  const pageParam = searchParams.get("page");
  const initialPage = pageParam
    ? Number.parseInt(pageParam) < 0 || isNaN(parseInt(pageParam))
      ? 1
      : Number.parseInt(pageParam)
    : 1;
  // eslint-disable-next-line no-unused-vars
/*   const [currentPage, setCurrentPage] = useState(initialPage); */
  //
  const itemsPerPage = 40;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // Handle page change and update URL using router.push()
  // const handlePageChange = (newPage: number) => {
  //   if (newPage >= 0 && newPage < totalPages) {
  //     setCurrentPage(newPage);

  //     const updatedParams = new URLSearchParams(searchParams.toString());
  //     updatedParams.set("page", newPage.toString());

  //     router.push(`?${updatedParams.toString()}`);
  //   }
  // };

  // Generate page numbers with ellipses when necessary
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = isMobile ? 5 : 9;

    if (totalPages <= maxPagesToShow) {
      for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(0);

      let startPage = Math.max(currentPage - 1, 1);
      const endPage = Math.min(startPage + maxPagesToShow - 3, totalPages - 2);

      if (endPage === totalPages - 2) {
        startPage = Math.max(endPage - (maxPagesToShow - 3), 1);
      }

      if (startPage > 1) {
        pageNumbers.push(-1); // Ellipsis before the range
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - 2) {
        pageNumbers.push(-2); // Ellipsis after the range
      }

      pageNumbers.push(totalPages - 1);
    }

    return pageNumbers;
  };

  // Build the pagination URL for a given page number
  const createPaginationLink = (page: number) => {
    /*   const updatedParams = new URLSearchParams(searchParams.toString())
    updatedParams.set("page", page.toString())
    return `?${updatedParams.toString()}` */

    /*  window.scrollTo({ top: 25, behavior: "smooth" }) */

  const fullQuery = searchParams.toString()

    return `/search/page-${page}?${fullQuery}`;
  };

  return (
  
    <>
      <section className="py-8 sm:py-14 container mx-auto px-4">
        {/*  <noscript> */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center">
            <nav className="flex items-center gap-1">
              {/* Previous page */}
              <Link
                target="_top"
                href={
                  currentPage > 1 ? createPaginationLink(currentPage - 2) : "#"
                }
                /*   onClick={(e) => {
                if (currentPage > 0) {
                  e.preventDefault()
                  handlePageChange(currentPage - 1)
                }
              }} */
                className={`inline-flex items-center justify-center h-10 w-10 rounded-md border border-blue-500 bg-white text-blue-600 text-sm font-medium shadow-sm transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 ${
                  currentPage === 0 ? "pointer-events-none opacity-50" : ""
                }`}
                aria-label="Previous page"
                tabIndex={currentPage === 0 ? -1 : 0}
              >
                <FaChevronLeft className="h-4 w-4" />
              </Link>

              {/* Page numbers */}
              {getPageNumbers().map((pageNum, index) => {
                if (pageNum < 0) {
                  return (
                    <span
                      key={`ellipsis-${index.toString()}`}
                      className="px-3 py-2 text-gray-500"
                    >
                      ...
                    </span>
                  );
                }

                return (
                  <Link
                    target="_top"
                    key={`page-${pageNum}`}
                    href={
                      currentPage !== pageNum + 1
                        ? createPaginationLink(pageNum)
                        : "#"
                    }
                    /* onClick={(e) => {
                    e.preventDefault()
                    handlePageChange(pageNum)
                  }} */
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium transition-colors ${
                      currentPage === pageNum + 1
                        ? "bg-blue-600 text-white"
                        : "border border-blue-500 bg-white text-blue-600 hover:bg-blue-50"
                    }`}
                    aria-label={`Page ${pageNum + 1}`}
                    aria-current={currentPage === pageNum ? "page" : undefined}
                  >
                    {pageNum + 1}
                  </Link>
                );
              })}

              {/* Next page */}
              <Link
                target="_top"
                href={
                  currentPage < totalPages - 1
                    ? createPaginationLink(currentPage)
                    : "#"
                }
                /*  onClick={(e) => {
                if (currentPage < totalPages - 1) {
                  e.preventDefault()
                  handlePageChange(currentPage + 1)
                }
              }} */
                className={`inline-flex items-center justify-center h-10 w-10 rounded-md border border-blue-500 bg-white text-blue-600 text-sm font-medium shadow-sm transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 ${
                  currentPage === totalPages - 1
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
                aria-label="Next page"
                tabIndex={currentPage === totalPages - 1 ? -1 : 0}
              >
                <FaChevronRight className="h-4 w-4" />
              </Link>
            </nav>
          </div>
        )}
        {/* Page info */}
        {totalCount > 0 && (
          <div className="mt-4 text-center text-sm text-gray-600">
            Showing {currentPage * itemsPerPage + 1} to{" "}
            {Math.min((currentPage + 1) * itemsPerPage, totalCount)} of{" "}
            {totalCount} results
          </div>
        )}
        {/*     </noscript> */}
      </section>
      {/*  <style jsx>{`
        @media (scripting: none) {
          .js-only {
            display: none;
          }
        }
      `}</style> */}
    </>
  );
}
