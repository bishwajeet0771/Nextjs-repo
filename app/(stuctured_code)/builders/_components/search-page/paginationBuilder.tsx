/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
"use client";

import { useSearchParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useMediaQuery } from "@mantine/hooks";

export const dynamic = "force-dynamic";

type Props = {
    totalCount: number;
    onNextPage: () => void;
    onPreviousPage: () => void;
    currentPagefun: (page: number) => void;
    value: number;
  };
  

export default function PaginationForBuilder({  totalCount,
    onNextPage,
    onPreviousPage,
    currentPagefun,
    value, }: Props) {
  const searchParams = useSearchParams();
  const isMobile = useMediaQuery("(max-width: 601px)");
  // Get page from URL or default to 0

  
  const currentPage=value;
  //
  const itemsPerPage = 20;
  const totalPages = totalCount;


  // const searchParams = useSearchParams();
  // const isMobile = useMediaQuery("(max-width: 601px)");
  // // Get page from URL or default to 0

  
  // const currentPage=value;
  // //
  // const itemsPerPage = 20;
  // const totalPages = totalCount;







  // Generate page numbers with ellipses when necessary
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = isMobile ? 5 : 7;





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


  return (
  
    <>
      <section className="py-8 sm:py-14 container mx-auto px-4">
        {/*  <noscript> */}
        {totalPages > 1 && (
          <div
        
          className="mt-10 flex justify-center">
            <div
             className="flex items-center gap-1">
              {/* Previous page */}
              
              <button
               disabled={value==1}
              onClick={onPreviousPage}
              className={`inline-flex items-center justify-center h-10 w-10 rounded-md border border-blue-500 bg-white text-blue-600 text-sm font-medium shadow-sm transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 ${
                  currentPage === 0 ? "pointer-events-none opacity-50" : "" 
                } ${value ==1 ?`hover:cursor-not-allowed`:""}`}>
                       <FaChevronLeft className="h-4 w-4" />
              </button>

              {/* Page numbers */}
              {getPageNumbers().map((pageNum, index) => {
                if (pageNum < 0) {
                  return (
                    <span
                      key={`ellipsis-${index}`}
                      className="px-3 py-2 text-gray-500"
                    >
                      ...
                    </span>
                  );
                }

                return (
                    <button
                    key={`builderpage_${index}`}
                    onClick={()=>currentPagefun(pageNum)}
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium transition-colors ${
                        currentPage === pageNum + 1
                          ? "bg-blue-600 text-white"
                          : "border border-blue-500 bg-white text-blue-600 hover:bg-blue-50"
                      }`}>
                         {pageNum + 1}
                    </button>
               
                );
              })}

              {/* Next page */}
              <button
              disabled={currentPage == totalPages}
              onClick={onNextPage}
              className={`inline-flex items-center justify-center h-10 w-10 rounded-md border border-blue-500 bg-white text-blue-600 text-sm font-medium shadow-sm transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 ${
                  currentPage === totalPages - 1
                    ? "pointer-events-none opacity-50"
                    : ""
                }${currentPage == totalPages ?`hover:cursor-not-allowed`:""}`} >
                     <FaChevronRight className="h-4 w-4" />
              </button>
             
            </div>
          </div>
        )}
        {/* Page info */}
        {totalCount > 0 && (
          <div className="mt-4 text-center text-sm text-gray-600">
            Showing {currentPage * itemsPerPage + 1} to{" "}
            {Math.min((currentPage + 1) * itemsPerPage, totalCount*20)} of{" "}
            {totalCount*20} results
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
