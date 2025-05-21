import React, { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "react-query";
import {
  FaSearch,
  FaCheck,
} from "react-icons/fa";
import RTK_CONFIG from "@/app/config/rtk";
import { getAllCitiesDetails } from "@/app/utils/stats_cities";
import { FaChevronDown, FaLocationDot, FaSpinner } from "react-icons/fa6";
import { useAtom } from "jotai";
import { homeSearchFiltersAtom } from "@/app/store/home";
import { CityData } from "../../../search";

interface City {
  id: string;
  name: string;
}

interface DefaultCityResponse {
  data: {
    city: string;
    cityId: string;
  };
  status: boolean;
}

export default function AutoCitySelectDropdown({
  isOpen,
  setIsOpen,
  cityData,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cityData?: CityData;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [cityError, setCityError] = useState<string | null>(null); // New state for city error
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<(HTMLLIElement | null)[]>([]);
  const [, setCity] = useAtom(homeSearchFiltersAtom);
  const getUserCity = async (
    cityData?: CityData
  ): Promise<DefaultCityResponse> => {
    if (cityData) {
      return {
        data: {
          city: cityData.cityName,
          cityId: cityData.cityId,
        },
        status: true,
      };
    }
    try {
      const res = await fetch(`/api/get-user-city`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch default city");
      return await res.json();
    } catch (error) {
      console.error("Error fetching default city:", error);
      throw error;
    }
  };
  const {
    data: DefaultCity,
    // eslint-disable-next-line no-unused-vars
    isLoading: defaultCityLoading,
    error: defaultCityError,
  } = useQuery<DefaultCityResponse, Error>({
    queryKey: ["my-location"],
    queryFn: async () => await getUserCity(cityData),

    onSuccess: (data) => {
      if (data.status) {
        setCity({
          type: "SET_CITY",
          payload: `${data.data.city}+${data.data.cityId}`,
        });
        setCityError(null); // Clear error when city is set
      }
      if (!data.status) {
        setIsOpen(true);
        setCityError("City is required"); // Set error when city is not available
      }
    },
    ...RTK_CONFIG,
  });

  const {
    data: AllCities,
    isLoading: citiesLoading,
    error: citiesError,
  } = useQuery<City[], Error>({
    queryKey: ["all-cities"],
    queryFn: getAllCitiesDetails,
    ...RTK_CONFIG,
    enabled: isOpen,
  });

  const filteredCities =
    AllCities?.filter(
      (city) =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        city.id !== selectedCity?.id
    ) || [];
  const handleCloseDropdown = useCallback(() => {
    setIsOpen(false);
    setSearchTerm("");
    setFocusedIndex(-1);
  }, [setIsOpen]);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        handleCloseDropdown();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleCloseDropdown]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setFocusedIndex(-1);
  }, [searchTerm]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      handleCloseDropdown();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setFocusedIndex((prevIndex) =>
        prevIndex < filteredCities.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setFocusedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1));
    } else if (event.key === "Enter" && focusedIndex >= 0) {
      handleCitySelect(filteredCities[focusedIndex]);
    }
  };

  useEffect(() => {
    if (focusedIndex >= 0 && optionsRef.current[focusedIndex]) {
      optionsRef.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setCity({
      type: "SET_CITY",
      payload: `${city.name}+${city.id}`,
    });
    setCityError(null); // Clear error on city selection
    handleCloseDropdown();
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setSearchTerm("");
      setFocusedIndex(-1);
    }
  };

  return (
    <div className="relative  " ref={dropdownRef}>
      <button
        onClick={handleToggleDropdown}
        className="w-full max-w-fit p-2 sm:p-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out flex items-center justify-between space-x-1 sm:space-x-2"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-gray-700 font-medium  text-xs sm:text-base text-nowrap">
          {selectedCity?.name || DefaultCity?.data?.city || "Select City"}
        </span>
        {selectedCity || DefaultCity?.data?.city ? (
          <FaLocationDot
            className=" min-w-5 h-4 w-4 sm:h-5 sm:w-5 text-blue-500"
            aria-hidden="true"
          />
        ) : (
          <FaChevronDown
            className={`h-4 w-4 sm:h-5 sm:w-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        )}
      </button>

      {isOpen && (
        <div
          className="absolute right-[5%] z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-all duration-200 ease-in-out"
          style={{ minWidth: cityError ? "300px" : "220px" }}
          onKeyDown={handleKeyDown}
        >
          {cityError && (
            <p className="px-4 py-2 bg-red-50 text-red-600 text-sm font-semibold border-b border-red-100">
              {cityError}
            </p>
          )}
          <div className="p-3 bg-gray-50">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-10 pr-4 border focus:text-[16px] border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                aria-label="Search cities"
              />
              <FaSearch
                className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>

          {defaultCityError && (
            <p className="p-2 text-center text-red-600 bg-red-50 border-t border-red-100">
              Error loading default city
            </p>
          )}

          {citiesError && (
            <p className="p-2 text-center text-red-600 bg-red-50 border-t border-red-100">
              Error loading cities
            </p>
          )}

          <ul className="max-h-60 overflow-auto scrollUnique" role="listbox">
            {citiesLoading ? (
              <li className="p-4 text-center">
                <FaSpinner
                  className="animate-spin h-6 w-6 mx-auto text-blue-500"
                  aria-label="Loading cities"
                />
              </li>
            ) : filteredCities.length > 0 ? (
              filteredCities.map((city, index) => (
                <li
                  key={city.id}
                  ref={(el) => {
                    if (el) optionsRef.current[index] = el;
                  }}
                  className={`p-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150 ${
                    index === focusedIndex ? "bg-blue-100" : ""
                  }`}
                  onClick={() => handleCitySelect(city)}
                  onMouseEnter={() => setFocusedIndex(index)}
                  role="option"
                  aria-selected={index === focusedIndex}
                  tabIndex={0}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">
                      {city.name}
                    </span>
                    {selectedCity?.id === city.id && (
                      <FaCheck
                        className="h-4 w-4 text-blue-500"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </li>
              ))
            ) : (
              <li className="p-3 text-center text-gray-500">No cities found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
