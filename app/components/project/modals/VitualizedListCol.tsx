/* eslint-disable no-unused-vars */
import { ImgCarouselIcon, PrevCarouselIcon } from "@/app/images/commonSvgs";
import { useMediaQuery } from "@mantine/hooks";
import { useVirtualizer } from "@tanstack/react-virtual";
import React, { ReactNode } from "react";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Importing React Icons for arrows

// Define the props type
interface ColumnVirtualizerFixedProps {
  items: any[]; // Array of items to render (replace 'any' with a more specific type if possible)
  itemCount?: number; // Total count of items (default is 10000)
  itemSize?: number; // Size of each item (default is 100px)
  overscan?: number; // Number of items to render outside the viewport (default is 5)
  width?: number; // Width of the container (default is 600px)
  height?: number; // Height of the container (default is 100px)
  renderItem?: (item: any, index: number) => ReactNode; // Function to render each item
  position: "center" | "start" | "end";
}

const ColumnVirtualizerFixed: React.FC<ColumnVirtualizerFixedProps> = ({
  items,
  itemCount = 10000,
  itemSize = 100,
  overscan = 5,
  width = 610,
  height = 100,
  renderItem,
  position,
}) => {
  const parentRef = React.useRef<HTMLDivElement | null>(null);
  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: itemCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemSize,
    overscan,
  });
  const scrollTo = (scrollOffset: number) => {
    if (parentRef.current) {
      parentRef.current.scrollLeft += scrollOffset;
    }
  };

  const isAtStart = () => parentRef.current?.scrollLeft === 0;
  const isAtEnd = () => {
    const totalWidth = columnVirtualizer.getTotalSize();
    return parentRef.current
      ? parentRef.current.scrollLeft + parentRef.current.clientWidth >=
          totalWidth
      : false;
  };
  const isMobile = useMediaQuery("(max-width: 601px)");
  return (
    <div className="relative">
      {itemCount > 4 && (
        <button
          onClick={() => scrollTo(-itemSize)}
          disabled={isAtStart()}
          className={`absolute -left-10 top-1/2 transform -translate-y-1/2  rounded z-10 ${
            isAtStart() ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <PrevCarouselIcon />
        </button>
      )}

      <div
        ref={parentRef}
        className={`mx-auto floorplan flex  items-center justify-${position} w-full sm:w-[610px]`}
        style={{
          // width: `${width}px`,
          height: `${height}px`,
          overflow: "auto",
        }}
      >
        <div
          className={`w-[300px] sm:w-[${columnVirtualizer.getTotalSize()}px]`}
          style={{
            height: "100%",
            position: "relative",
          }}
        >
          {columnVirtualizer.getVirtualItems().map((virtualColumn) => (
            <div
              key={virtualColumn.index}
              className={
                virtualColumn.index % 2 ? "ListItemOdd" : "ListItemEven"
              }
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: `${virtualColumn.size}px`,
                transform: `translateX(${virtualColumn.start}px)`,
              }}
            >
              {/* Render item using the provided renderItem function */}
              {renderItem
                ? renderItem(items[virtualColumn.index], virtualColumn.index)
                : `Column ${virtualColumn.index}`}
            </div>
          ))}
        </div>
      </div>
      {itemCount > 4 && (
        <button
          onClick={() => scrollTo(itemSize)}
          disabled={isAtEnd()}
          className={`absolute -right-10 top-1/2 transform -translate-y-1/2  rounded z-10 ${
            isAtEnd() ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <ImgCarouselIcon />
        </button>
      )}
    </div>
  );
};

export default ColumnVirtualizerFixed;
