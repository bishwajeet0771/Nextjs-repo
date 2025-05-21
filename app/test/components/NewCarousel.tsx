/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import React, { useState, useRef, useMemo, memo, useCallback } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface CarouselProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  slidesToShow?: number;
  gap?: number;
  className?: string;
  url?: string;
  renderViewMore?: () => React.ReactNode; // Function to render the "View More" card
  type?: string;
}

function NewCarousel<T>({
  data,
  renderItem,
  slidesToShow = 3,
  gap = 24,
  url,
  renderViewMore,
  type,
}: CarouselProps<T>) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTab = useMediaQuery("(max-width: 1280px)");
  const isLaptop = useMediaQuery("(max-width: 1600px)");
  const calcSlideToShow = () => {
    if (isMobile) {
      return 1.1; // Show 1 slide on mobile
    } else if (isTab) {
      return slidesToShow - 2; // Show 2 slides on tablets
    } else if (isLaptop) {
      return slidesToShow - 1.5; // Show 3 slides on laptops
    } else {
      return slidesToShow; // Default for larger screens
    }
  };

  slidesToShow = calcSlideToShow();
  // slidesToShow = isMobile
  //   ? 1.1
  //   : isLaptop ? slidesToShow - 1.5
  //   : isTab
  //     ? slidesToShow - 2
  //     : slidesToShow - 1
  //   : slidesToShow;

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const dataWithViewMore = useMemo(() => {
    // Only append "View More" card if data length > 4
    return data.length > 4 ? [...data, null] : data;
  }, [data]);

  const maxIndex = useMemo(
    () => Math.max(0, dataWithViewMore.length - Math.floor(slidesToShow)),
    [dataWithViewMore.length, slidesToShow]
  );

  const next = useCallback(
    () => setCurrentIndex((curr) => Math.min(curr + 1, maxIndex)),
    [maxIndex]
  );
  const prev = useCallback(
    () => setCurrentIndex((curr) => Math.max(curr - 1, 0)),
    []
  );

  const canGoNext = useMemo(
    () => currentIndex < maxIndex,
    [currentIndex, maxIndex]
  );
  const canGoPrev = useMemo(() => currentIndex > 0, [currentIndex]);

  const DefaultViewMore = () => (
    <Link
    prefetch={false}
      href={url ?? "/"}
      target="_blank"
      // onClick={() => (url ? window.open(url, "_self", "noreferrer") : "")}
      className="relative h-full w-full rounded-xl bg-gradient-to-br from-blue-400 to-blue-600  hover:shadow-xl cursor-pointer transition-all duration-300 "
    >
      <div className="h-full w-full rounded-lg bg-white p-4 flex flex-col items-center justify-center space-y-4">
        <div className="rounded-full bg-gradient-to-br from-blue-400 to-blue-600 p-3 animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            View More
          </h3>
          <p className="text-sm text-gray-800">
            Explore all {type == "proj" ? "Projects" : "listings"}
          </p>
        </div>
        <div className="flex items-center gap-2 text-gray-800">
          <span className="text-xs">Browse complete catalog</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="relative group mt-2">
      <div
        ref={containerRef}
        className={`relative  scrollbar-hide overflow-x-auto`}
        style={{ margin: isMobile ? 0 : `0 ${gap / 2}px` }}
      >
        <div
          className={`flex ml-[12px] md:ml-0 ${
            isMobile ? "" : "transition-transform duration-500 ease-out"
          }`}
          style={
            isMobile
              ? { gap: `${gap}px` }
              : {
                  transform: `translateX(calc(-${
                    currentIndex * (100 / slidesToShow)
                  }% - ${currentIndex * gap}px))`,
                  gap: `${gap}px`,
                }
          }
        >
          {dataWithViewMore.map((item, index) => (
            <div
              key={index}
              className={`flex-none ${isMobile ? "snap-center" : ""}`}
              style={{
                width: `calc(${100 / slidesToShow}% - ${
                  (gap * (slidesToShow - 1)) / slidesToShow
                }px)`,
              }}
            >
              {item ? (
                renderItem(item, index)
              ) : renderViewMore ? (
                renderViewMore()
              ) : (
                <DefaultViewMore />
              )}
            </div>
          ))}
        </div>
      </div>

      {!isMobile && (
        <>
          {canGoPrev && (
            <button
              onClick={prev}
              className="absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50"
            >
              <IoChevronBackOutline className="w-6 h-6" />
            </button>
          )}
          {/* preveious codwe */}
          {/* {canGoNext && (
            <button
              onClick={next}
              className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50"
            >
              <IoChevronForwardOutline className="w-6 h-6" />
            </button>
          )} */}
          {canGoNext && (
            <button
              name="Next" title="Next"
              onClick={next}
              className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-200"
              aria-label="Next"
            >
              <IoChevronForwardOutline className="w-6 h-6" />
            </button>
          )}

          {/* <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gray-800 w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div> */}
        </>
      )}
    </div>
  );
}

export default memo(NewCarousel);
