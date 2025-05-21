"use client";

import * as React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useGesture } from "@use-gesture/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type CarouselProps<T> = {
  items: T[];
  // eslint-disable-next-line no-unused-vars
  renderItem: (item: T, index: number) => React.ReactNode;
  itemWidth: number;
  gap?: number;
  visibleItems?: number;
};

export default function Carousel<T>({
  items,
  renderItem,
  itemWidth,
  gap = 16,
  visibleItems = 3,
}: CarouselProps<T>) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => itemWidth + gap,
    horizontal: true,
    overscan: 3,
  });

  const totalWidth = virtualizer.getTotalSize();
  const visibleWidth = (itemWidth + gap) * visibleItems - gap;

  const bind = useGesture(
    {
      onDrag: ({ movement: [mx], direction: [dx], cancel }) => {
        if (dx !== 0) {
          let newIndex = Math.round(
            (currentIndex * (itemWidth + gap) - mx) / (itemWidth + gap)
          );
          newIndex = Math.max(
            0,
            Math.min(newIndex, items.length - visibleItems)
          );
          if (newIndex !== currentIndex) setCurrentIndex(newIndex);
          else cancel();
        }
      },
    },
    {
      drag: {
        bounds: { left: -totalWidth + visibleWidth, right: 0 },
        rubberband: true,
      },
    }
  );

  const scrollTo = React.useCallback(
    (index: number) => {
      virtualizer.scrollToIndex(index, { align: "start", behavior: "smooth" });
      setCurrentIndex(index);
    },
    [virtualizer]
  );

  React.useEffect(() => {
    scrollTo(currentIndex);
  }, [currentIndex, scrollTo]);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div
        ref={containerRef}
        className="overflow-hidden"
        style={{ width: visibleWidth, height: itemWidth }}
        {...bind()}
      >
        <div
          style={{
            width: `${totalWidth}px`,
            height: "100%",
            display: "flex",
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                flex: `0 0 ${itemWidth}px`,
                height: "100%",
                transform: `translateX(${virtualItem.start}px)`,
              }}
            >
              {renderItem(items[virtualItem.index], virtualItem.index)}
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white border border-gray-300 p-2"
        onClick={() => scrollTo(Math.max(0, currentIndex - 1))}
        disabled={currentIndex === 0}
      >
        <FaChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous</span>
      </button>
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-white border border-gray-300 p-2"
        onClick={() =>
          scrollTo(Math.min(items.length - visibleItems, currentIndex + 1))
        }
        disabled={currentIndex >= items.length - visibleItems}
      >
        <FaChevronRight className="h-4 w-4" />
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
}
