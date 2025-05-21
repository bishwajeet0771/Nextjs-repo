import React, { useRef, useMemo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useDrag } from "@use-gesture/react";
import { CarouseSelArrowIcon } from "@/app/images/HomePageIcons";
import { useMediaQuery } from "@mantine/hooks";

interface ColumnVirtualizerFixedProps {
  items: any[];
  itemCount?: number;
  itemSize?: number;
  gapSize?: number;
  overscan?: number;
  height?: number;
  // eslint-disable-next-line no-unused-vars
  renderItem?: (item: any, index: number) => React.ReactNode;
}

const HomePageVirtualCarousel: React.FC<ColumnVirtualizerFixedProps> = ({
  items,
  itemCount = items.length,
  itemSize = 100,
  gapSize = 16,
  overscan = 5,
  height = 100,
  renderItem,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
 const isMobile = useMediaQuery('(max-width: 768px)') 
  const effectiveItemSize = useMemo(() => itemSize + gapSize, [itemSize, gapSize]);

  const columnVirtualizer = useVirtualizer({
    count: itemCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => effectiveItemSize,
    horizontal: true,
    overscan,
  });

  const totalWidth = useMemo(() => columnVirtualizer.getTotalSize() - gapSize, [columnVirtualizer, gapSize]);

  const scrollTo = (scrollOffset: number) => {
    if (parentRef.current) {
      parentRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  const isAtStart = () => parentRef.current ? parentRef.current.scrollLeft <= 1 : false;
  const isAtEnd = () => parentRef.current
    ? parentRef.current.scrollLeft + parentRef.current.clientWidth >= totalWidth - 1
    : false;

  // Smooth horizontal scrolling using useDrag
  const bind = useDrag(
    ({ movement: [mx], memo = parentRef.current?.scrollLeft ?? 0 }) => {
      if (parentRef.current) {
        parentRef.current.scrollLeft = memo - mx * 100;
      }
      return memo;
    },
    {
      axis: "x",
      pointer: { touch: true },
      bounds: { left: 0, right: totalWidth },
      rubberband: true,
      enabled: !isMobile, // Disable drag on mobile devices
    }
  );

  return (
    <div className="relative">
      {itemCount > 3 && (
        <button
          onClick={() => scrollTo(-effectiveItemSize)}
          disabled={isAtStart()}
          className={`absolute -left-10 top-1/2 transform -translate-y-1/2 rounded z-10 transition-opacity ${
            isAtStart() ? "opacity-50 cursor-not-allowed" : "opacity-100"
          }`}
        >
          <CarouseSelArrowIcon className="rotate-180" title="Click to Forword" />
        </button>
      )}

      <div
        ref={parentRef}
        className="mx-auto floorplan flex items-center scrollbar-hide overflow-hidden"
        style={{
          width: "100%",
          height: `${height}px`,
          cursor: "grab",
          userSelect: "none",
        }}
        {...bind()}
      >
        <div
          className="flex scroll-smooth overflow-x-scroll scrollbar-hide"
          style={{
            width: `${totalWidth}px`,
            height: "100%",
            position: "relative",
          }}
        >
          {columnVirtualizer.getVirtualItems().map((virtualColumn) => (
            <div
              key={virtualColumn.key}
              className="ListItem"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: `${itemSize}px`,
                transform: `translateX(${virtualColumn.start}px)`,
                transition: "transform 0.3s ease-in-out",
              }}
            >
              {renderItem
                ? renderItem(items[virtualColumn.index], virtualColumn.index)
                : `Column ${virtualColumn.index}`}
            </div>
          ))}
        </div>
      </div>

      {itemCount > 3 && (
        <button
          onClick={() => scrollTo(effectiveItemSize)}
          disabled={isAtEnd()}
          className={`absolute -right-10 top-1/2 transform -translate-y-1/2 rounded z-10 transition-opacity ${
            isAtEnd() ? "opacity-50 cursor-not-allowed" : "opacity-100"
          }`}
        >
          <CarouseSelArrowIcon title="Click to Backword" />
        </button>
      )}
    </div>
  );
};

export default HomePageVirtualCarousel;
