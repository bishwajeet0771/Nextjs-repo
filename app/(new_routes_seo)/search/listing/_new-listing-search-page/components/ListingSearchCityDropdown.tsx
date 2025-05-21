/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { IoLocationSharp } from "react-icons/io5";
import { useQuery } from "react-query";
import RTK_CONFIG from "@/app/config/rtk";
import { getAllCitiesDetails } from "@/app/utils/stats_cities";
import { useVirtualizer } from "@tanstack/react-virtual";

import { useAtom } from "jotai";
// import { serverCityAtom } from "@/app/store/search/serverCity";
import { projSearchStore } from "../../../store/newListingStore";
import useProjSearchAppliedFilters from "./../hooks/useProjSearchAppliedFilters";
// import { City } from "@/app/images/commonSvgs";

interface ICity {
  id: number;
  name: string;
  cityid: number;
  isactive: string;
  stateId: number;
  parentId: number;
  type: number;
  createdate: string;
  modidate: string;
}

type Props = {
  handleDropdownToggle: any;
};

export default function ListingSearchCityDropDown({
  handleDropdownToggle,
}: Props) {
  const [state, dispatch] = useAtom(projSearchStore);
  let servercityData = `Bengaluru+9`;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState<ICity | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const { handleApplyFilters } = useProjSearchAppliedFilters();
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const {
    data: allCities = [],
    isLoading,
    error,
  } = useQuery<ICity[]>({
    queryKey: ["all-cities"],
    queryFn: getAllCitiesDetails,
    ...RTK_CONFIG,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 3, // Retry failed requests 3 times
  });

  const filteredCities = useMemo(() => {
    if (!isOpen) return [];
    if (!searchTerm) return allCities;
    return allCities.filter((city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allCities, searchTerm, isOpen]);
  const rowVirtualizer = useVirtualizer({
    count: filteredCities.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => 30,
    overscan: 5,
  });

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setActiveIndex(
            (prevIndex) => (prevIndex + 1) % filteredCities.length
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setActiveIndex(
            (prevIndex) =>
              (prevIndex - 1 + filteredCities.length) % filteredCities.length
          );
          break;
        case "Enter":
          if (filteredCities[activeIndex]) {
            selectCity(filteredCities[activeIndex]);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setSearchTerm("");
          break;
        default:
          break;
      }
    },
    [isOpen, filteredCities, activeIndex]
  );

  const selectCity = useCallback((city: ICity) => {
    if (!city) return;
    setSelectedCity(city);
    setSearchTerm("");
    setIsOpen(false);
    dispatch({
      type: "update",
      payload: {
        city: `${city.name}+${city.id}`,
        localities: [],
        projIdEnc: null,
        projName: null,
      },
    });
    handleApplyFilters();
  }, []);

  useEffect(() => {
    if (optionRefs.current[activeIndex]) {
      optionRefs.current[activeIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeIndex]);
  return (
    <div className="relative inline-block order-last" ref={dropdownRef}>
      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
          handleDropdownToggle();
        }}
        className="flex items-center text-gray-800 h-[38px] md:h-[42px] xl:h-auto text-[12px] xl:text-[16px] font-semibold gap-[4px] md:gap-x-2 p-[4px] px-[6px] md:p-3 rounded-full border border-blue-300 bg-white hover:bg-blue-50 transition-colors shadow-md"
      >
        <IoLocationSharp className="text-blue-600 text-lg" />
        <span>
          {state.city
            ? state.city.split("+")[0]
            : servercityData
            ? servercityData.split("+")[0]
            : selectedCity
            ? selectedCity.name
            : "Select Location"}
        </span>
      </button>

      {isOpen && (
        <div
          className="absolute z-50 w-[240px] mt-2 bg-white border border-gray-300  shadow-lg overflow-hidden transition-all duration-200"
          onKeyDown={handleKeyDown}
        >
          <div className="p-2 border-b border-gray-200">
            <div className="relative">
              <IoLocationSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search location..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setActiveIndex(0);
                }}
                maxLength={30}
                className="w-full pl-10 p-2 text-sm bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>
          <div
            ref={listRef}
            className="max-h-[260px] overflow-y-auto scrollUnique"
          >
            {isLoading ? (
              <div className="flex items-center justify-center p-4 text-gray-500">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent" />
              </div>
            ) : error ? (
              <p className="text-red-500 p-4 text-center">
                Unable to load locations. Please try again.
              </p>
            ) : filteredCities.length > 0 ? (
              <div
                style={{
                  height: `${rowVirtualizer.getTotalSize()}px`,
                  width: "100%",
                  position: "relative",
                }}
              >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const city = filteredCities[virtualRow.index];
                  return (
                    <div
                      key={city.id}
                      ref={(el) => {
                        optionRefs.current[virtualRow.index] = el;
                      }}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                    >
                      <button
                        className={`flex items-center w-full h-full px-2  text-left transition-colors ${
                          city.id === selectedCity?.id
                            ? "bg-blue-500 text-white font-bold"
                            : "text-gray-800 hover:bg-blue-100 hover:text-blue-700 "
                        }`}
                        onClick={() => selectCity(city)}
                        onMouseEnter={() => setActiveIndex(virtualRow.index)}
                      >
                        <IoLocationSharp
                          className={`mr-2 ${
                            activeIndex === virtualRow.index
                              ? "text-gray-800"
                              : "text-gray-400"
                          }`}
                        />
                        {city.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 p-4 text-center">
                No locations found
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
