"use client";

import { useAtom } from "jotai";
import React, { memo, useCallback, useMemo } from "react";
import {
  diffToProjFromListing,
  initialState,
  projSearchStore,
} from "../../../store/newListingStore";
import useProjSearchAppliedFilters from "./../hooks/useProjSearchAppliedFilters";
import { SearchFilter } from "@/app/types/search";


const ListingSearchTabs = ({
  showProjectTab = false,
  frontendFilters,
}: {
  showProjectTab?: boolean;
  frontendFilters: Record<string, any>;
}) => {
  const [state, dispath] = useAtom(projSearchStore);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const { handleApplyFilters } = useProjSearchAppliedFilters();
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const tabs = useMemo(
    () => [
      ...(showProjectTab ? [{ id: "proj", label: "Projects" }] : []),
      { id: "I", label: "Owner Listings" },
      { id: "A", label: "Agent Listings" },
      { id: "B", label: "Builder Listings" },
      { id: null, label: "All Listings" },
    ],
    [showProjectTab]
  );

  const sortOptions = useMemo(
    () => [
      { id: null, type: null, value: "newest", label: "Newest First" },
      {
        id: 2,
        type: "price",
        value: "price-low-high",
        label: "Price: Low to High",
      },
      {
        id: 1,
        type: "price",
        value: "price-high-low",
        label: "Price: High to Low",
      },
      {
        id: 2,
        type: "sqftPrice",
        value: "sqft-low-high",
        label: "Price / sqft: Low to High",
      },
      {
        id: 1,
        type: "sqftPrice",
        value: "sqft-high-low",
        label: "Price / sqft: High to Low",
      },
    ],
    []
  );

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  }, []);

  const getSortyByValue = useCallback((state: any): string => {
    if (
      (state.sortType == 2 && state.sortByfield === "minPrice") ||
      (state.sortByfield === "price" && state.sortType == 2)
    ) {
      return "Price: Low to High";
    } else if (
      (state.sortType == 1 && state.sortByfield === "maxPrice") ||
      (state.sortByfield === "price" && state.sortType == 1)
    ) {
      return "Price: High to Low";
    } else if (
      (state.sortByfield === "sqftPrice" && state.sortType == 1) ||
      (state.sortType == 1 && state.sortByfield === "basePrice")
    ) {
      return "Price / sqft: High to Low";
    } else if (
      (state.sortType == 2 && state.sortByfield === "sqftPrice") ||
      (state.sortType == 2 && state.sortByfield === "basePrice")
    ) {
      return "Price / sqft: Low to High";
    }
    return "Newest First";
  }, []);

  const handleTabsChange = useCallback(
    (value: string | null) => {
      const updatedFilters =
        value === null
          ? {
              ...state,
              listedBy: null,
              sortByfield: null,
              sortType: null,
              facings: null,
            }
          : {
              ...state,
              ...Object.fromEntries(
                (
                  diffToProjFromListing[
                    value as keyof typeof diffToProjFromListing
                  ] ?? []
                ).map((key: any) => [
                  key,
                  initialState[key as keyof SearchFilter] ?? null,
                ])
              ),
              listedBy: value,
            };

      dispath({ type: "update", payload: updatedFilters });
      handleApplyFilters();
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [state, dispath, handleApplyFilters]
  );

  const handleSortBy = useCallback(
    (option: any) => {
      dispath({
        type: "update",
        payload: {
          sortByfield: option.type,
          sortType: option.id,
        },
      });
      handleApplyFilters();
    },
    [dispath, handleApplyFilters]
  );

  React.useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  const currentSortLabel = useMemo(
    () =>
      state.sortByfield != null && state.sortType != null
        ? getSortyByValue(state)
        : "Newest First",
    [state, getSortyByValue]
  );

  const SortDropdown = useCallback(
    ({ isMobile = false }: { isMobile?: boolean }) => (
      <div
        className={`relative ${
          isMobile
            ? "flex md:hidden justify-end self-end ml-auto"
            : "hidden md:flex"
        }`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsDropdownOpen(!isDropdownOpen);
          }}
          className={`flex items-center gap-2 ${
            isMobile ? "px-[6px] py-[4px]" : "md:px-[6px] md:py-[4px]"
          } xl:px-4 xl:py-2 text-sm xl:text-base text-black hover:text-white hover:bg-[#0073C6] rounded-full transition-colors`}
        >
        <p className="text-xl text-amber-800 font-bold">
          ↑↓ 
        </p>
          <span className="max-w-[105px] overflow-hidden text-ellipsis whitespace-nowrap">
            {currentSortLabel}
          </span>
        </button>

        {isDropdownOpen && (
          <div className="absolute top-[40px] right-0 w-48 bg-white rounded-lg shadow-lg py-1 z-20 border border-white">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSortBy(option);
                  setIsDropdownOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                  currentSortLabel === option.label
                    ? "text-white bg-[#0073C6]"
                    : "text-gray-800 hover:bg-[#0073C6] hover:text-white"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    ),
    [isDropdownOpen, currentSortLabel, sortOptions, handleSortBy]
  );
 
  const tabsSelected = useCallback(() => {
    if (state.listedBy === undefined) {
      return frontendFilters.listedBy;
    }
    return state.listedBy === frontendFilters.listedBy
      ? frontendFilters.listedBy
      : state.listedBy;
  }, [state, frontendFilters]);

  return (
    <div className="bg-slate-50 shadow-md w-full md:w-[60%] xl:w-[50%] flex-nowrap">
      
      <div className="w-full pb-[6px] pt-[10px] sm:px-[10px]">
        <div className="flex flex-col gap-[10px] md:flex-row md:items-center md:justify-between">
          <div
            ref={scrollContainerRef}
            onWheel={handleWheel}
            className="md:overflow-x-auto md:no-scrollbar max-w-full pb-[2px]"
          >
            <div className="flex flex-wrap items-center sm:gap-1 sm:p-0 xl:gap-2 sm:min-w-max pb-[4px]">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabsChange(tab.id)}
                  className={`whitespace-nowrap rounded-full px-[6px] py-[4px] sm:text-sm xl:px-4 xl:py-2 text-[13px] xl:text-base font-medium transition-all ${
                    tabsSelected() === tab.id
                      ? "bg-[#0073C6] text-white shadow-md"
                      : "text-black hover:bg-[#0073C6] hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              <SortDropdown isMobile />
            </div>
          </div>
          <SortDropdown />
        </div>
      </div>
    </div>
  );
};

export default memo(ListingSearchTabs);
