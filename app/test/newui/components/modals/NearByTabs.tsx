/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  // useMemo,
} from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { throttle } from "lodash";

interface TabsProps {
  onTabClick: (category: string) => void;
  selectedCategory: string;
  categories: string[];
}

const formatCategoryName = (category: string) => {
  return category.replace(/_/g, " ");
};

const Tabs: React.FC<TabsProps> = ({
  onTabClick,
  selectedCategory,
  categories,
}) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const tabContainerRef = useRef<HTMLDivElement>(null);
  const updateScrollButtons = useCallback(
    throttle(() => {
      if (tabContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          tabContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
      }
    }, 100),
    []
  );

  const scrollTabs = useCallback((direction: "left" | "right") => {
    if (tabContainerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      tabContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    updateScrollButtons();
    const currentRef = tabContainerRef.current; // Store the current ref value

    currentRef?.addEventListener("scroll", updateScrollButtons);

    return () => {
      currentRef?.removeEventListener("scroll", updateScrollButtons); // Use the stored ref value
    };
  }, [updateScrollButtons]);

  return (
    <div className="relative border-b flex items-center bg-gray-100">
      {categories.length > 3 && (
        <button
          onClick={() => scrollTabs("left")}
          className={`p-1 text-gray-500 hover:text-gray-700 ${
            !canScrollLeft && "opacity-50 cursor-not-allowed"
          }`}
          disabled={!canScrollLeft}
        >
          <FaChevronLeft />
        </button>
      )}

      <div
        ref={tabContainerRef}
        className="overflow-x-auto flex space-x-1 scrollbar-hide"
      >
        <ul className="flex space-x-1">
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => onTabClick(category)}
              className={`cursor-pointer px-3 py-1 text-center text-sm font-semibold transition-colors duration-200 whitespace-nowrap rounded-md capitalize ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
              }`}
            >
              {formatCategoryName(category)}
            </li>
          ))}
        </ul>
      </div>
      {categories.length > 3 && (
        <button
          onClick={() => scrollTabs("right")}
          className={`p-1 text-gray-500 hover:text-gray-700 ${
            !canScrollRight && "opacity-50 cursor-not-allowed"
          }`}
          disabled={!canScrollRight}
        >
          <FaChevronRight />
        </button>
      )}
    </div>
  );
};

export default Tabs;
