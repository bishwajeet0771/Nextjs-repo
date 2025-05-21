import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { throttle } from "lodash";
import { useAtom } from "jotai";
import { selectedNearByAtom } from "@/app/store/search/map";
import { checkLatAndLang } from "../map.util";
// import { useMap } from "react-leaflet";
// import { checkLatAndLang } from "@/app/components/maps/search/ProjectSearchPageMap";

// types.ts
export interface LocationItem {
  placeId: string;
  name: string;
  rating: number;
  totalRating: number;
  distance: string;
  time: string;
}

export interface LocationData {
  [category: string]: LocationItem[];
}

interface LocationCardProps {
  data: LocationData;
}
const formatCategoryName = (category: string) => {
  return category.replace(/_/g, " ");
};
// eslint-disable-next-line react/display-name
const LocationCard: React.FC<LocationCardProps> = React.memo(({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    Object.keys(data)[0]
  );
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const tabContainerRef = useRef<HTMLDivElement>(null);
  const [{ selectedNearbyItem }, setNearby] = useAtom(selectedNearByAtom);

  const categories = useMemo(() => Object.keys(data), [data]);

  const handleTabClick = useCallback((category: string) => {
    setSelectedCategory(category);
    setNearby((prev: any) => ({
      ...prev,
      category: category,
      selectedNearbyItem: {},
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateScrollButtons = throttle(() => {
    if (tabContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  }, 100);

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
    tabContainerRef.current?.addEventListener("scroll", updateScrollButtons);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      tabContainerRef.current?.removeEventListener(
        "scroll",
        updateScrollButtons
      );
    };
  }, [updateScrollButtons]);

  const onSelectLocation = (item: any) => {
    item.lat = checkLatAndLang(item.lat);
    item.lang = checkLatAndLang(item.lang);

    const checkData =
      (Object.keys(selectedNearbyItem).length > 0 &&
        ((selectedNearbyItem.placeId !== undefined &&
          item.placeId !== undefined &&
          selectedNearbyItem.placeId !== item.placeId) ||
          ((selectedNearbyItem.placeId === undefined ||
            item.placeId === undefined) &&
            selectedNearbyItem.name !== item.name))) ||
      Object.keys(selectedNearbyItem).length === 0;

    if (checkData) {
      setNearby((prev: any) => ({ ...prev, selectedNearbyItem: item }));
    }
  };

  const dataLength =
    data &&
    selectedCategory !== undefined &&
    data[selectedCategory] !== undefined &&
    data[selectedCategory].length !== undefined
      ? data[selectedCategory].length
      : 0;

  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden w-full">
      {/* Tabs with Scroll Buttons */}
      {dataLength > 0 && (
        <div className="relative border-b flex items-center bg-gray-100">
          {dataLength > 3 && (
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
              {categories.map((category, index) => (
                <li
                  key={category + index.toString()}
                  onClick={() => handleTabClick(category)}
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

          {dataLength > 3 && (
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
      )}

      {/* Content */}
      <div className="overflow-y-auto bg-gray-50 p-1">
        {dataLength > 0 ? (
          <ul className="grid grid-cols-2 gap-1">
            {data[selectedCategory]?.map((item) => (
              <li
                onClick={() => onSelectLocation(item)}
                key={item.placeId}
                className="border p-2 rounded-lg shadow-sm bg-white hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
              >
                <h3 className="text-sm font-bold text-blue-600 truncate">
                  {item.name}
                </h3>
                {/* <p className="text-gray-700 text-xs mt-1 font-medium">
                  Rating: {item.rating} ({item.totalRating} reviews)
                </p> */}
                <p className="text-gray-700 text-xs mt-1 font-medium">
                  Distance: {item.distance}
                </p>
                <p className="text-gray-700 text-xs mt-1 font-medium">
                  Time: {item.time}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700 text-xs font-medium">No data available</p>
        )}
      </div>
    </div>
  );
});

export default LocationCard;
