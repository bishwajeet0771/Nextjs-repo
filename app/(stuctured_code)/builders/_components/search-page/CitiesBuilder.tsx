/* eslint-disable no-unused-vars */
"use client";
import { useEffect, useRef, useState } from "react";
import { FaSearch, FaRedoAlt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useQuery } from "react-query";
// import { Pagination, Select } from "@mantine/core";
import RTK_CONFIG from "@/app/config/rtk";
import BuilderDetailsCard from "./BuilderDetailsCard";
import { useMediaQuery } from "@mantine/hooks";
import {
  getAllCititesForBuilders,
  getCitiesBuilder,
} from "../../services/builder-client.service";

export default function BuildersDirectory({
  city,
  id,
  initialData,
}: {
  city?: string;
  id?: string;
  initialData: any;
}) {
  const [filterCity, setFilterCity] = useState(id ?? "");
  const [sortOrder, setSortOrder] = useState(0);
  const [page, setPage] = useState(0);
  const [searchInput, setSearchInput] = useState(""); // Separate state for input
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [cachedBuilderCount, setCachedBuilderCount] = useState<number | null>(
    initialData.builderCount
  ); // Cache for builder count
  const isMobile = useMediaQuery("(max-width: 650px)");
  const isTab = useMediaQuery("(max-width: 1600px)");
  const initialFilter = `${id ?? ""}/${0}/${0}/${0}`;
  const currentFilter = `${filterCity}/${sortOrder}/${page}/${
    searchTerm.trim() === "" ? 0 : searchTerm
  }`;
  const shouldFetch = currentFilter !== initialFilter;
  const { data, isLoading } = useQuery({
    queryFn: () =>
      getCitiesBuilder({
        city: filterCity,
        page,
        sort: sortOrder,
        query: searchTerm,
      }),
    queryKey: [
      `bf+`,
      `city=${filterCity}+` +
        `sortOrder=${sortOrder}+` +
        `page=${page}` +
        searchTerm,
    ],
    enabled: shouldFetch, // Enable query only if shouldFetch is true
    onSuccess: (data) => {
      if (page === 0 && data?.builderCount == 0 ? true : data.builderCount) {
        setCachedBuilderCount(data.builderCount); // Cache the builder count when on page 0
      }
    },
    ...RTK_CONFIG,
  });
  const { data: cities } = useQuery({
    queryFn: getAllCititesForBuilders,
    queryKey: ["builder-cities"],
    ...RTK_CONFIG,
  });

  // const totalPages = cachedBuilderCount
  //   ? Math.ceil(cachedBuilderCount / 20) // Use cached builder count
  //   : 0;

  // const onNextPage = () => {
  //   window.scrollTo(0, 0);
  //   setPage((page) => page + 1);
  // };

  // const onBackPage = () => {
  //   window.scrollTo(0, 0);
  //   setPage((page) => page - 1);
  // };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value); // Update only the input field
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInput === "") {
      if (searchTerm != "") {
        handleResetFilters();
      } else {
        return;
      }
    }
    const validBuilderName = searchInput
      .trim()
      .replace(/[^\w\s&]/g, "")
      .replace(/[\s_]+/g, " ");
    setSearchTerm(validBuilderName); // Set searchTerm from searchInput on button click
    setSearchInput(validBuilderName);
    setPage(0); // Reset page on submit
    isMobile && setShowFilter(false);
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(Number(e.target.value));
    setPage(0); // Reset page to 0 when sorting changes
    isMobile && setShowFilter(false);
  };
  const handleResetFilters = () => {
    setSearchInput("");
    setSearchTerm("");
    setPage(0);
    // setFilterCity(id ?? "");
    setSortOrder(0);
    isMobile && setShowFilter(false);
  };
  const resultArray = [];
  for (let key in cities) {
    if (Object.prototype.hasOwnProperty.call(cities, key)) {
      resultArray.push({ value: key, label: cities[key] }); // Custom handling, can adjust for keys, values, etc.
    }
  }

  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (selectRef.current) {
        selectRef.current.blur(); // Close dropdown when scrolling
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //method
  const settingCurrentValue = (value: number) => {
    window.scrollTo(0, 0);
    setPage(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20">
      {/* Fixed Header */}
      <div className="fixed top-[68px] left-0 right-0 bg-white shadow-md z-10">
        <div className="xl:container mx-auto px-2 py-1 sm:px-4 sm:py-4 flex flex-row justify-between items-start md:items-center">
          <h1 className="text-lg md:text-3xl font-bold text-blue-900 capitalize mb-1 md:mb-0 text-nowrap">
            {!filterCity
              ? "All Builders"
              : `Builders in ${!city ? cities[filterCity] : city}`}
          </h1>
          <div className="flex  justify-end  items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
            {/* Mobile Filter Button */}
            <button
              className="md:hidden  bg-[#0073C6] text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center"
              onClick={() => setShowFilter(!showFilter)}
            >
              {!showFilter ? <FaSearch /> : <IoCloseSharp />}
            </button>

            {/* Filter Options */}
            <div
              className={`absolute bg-white px-2 py-2 sm:py-0 sm:px-0 left-[0.5px] top-[26px] sm:static    md:flex ${
                showFilter ? "flex" : "hidden"
              } flex-col md:flex-row w-full md:w-auto space-y-1 sm:space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0`}
            >
              <div className="flex items-center space-x-4">
                <form
                  className="flex items-center justify-end space-x-1"
                  onSubmit={handleSubmit}
                >
                  {/* <div className="flex justify-between gap-1 items-center w-full md:w-auto bg-white border border-gray-300 text-gray-700 sm:py-2 px-2 pr-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <input
                    type="text"
                    placeholder="Search Builder..."
                    className="border-none focus:none focus:outline-none"
                    onChange={handleSearchInputChange} // Change only input
                    value={searchInput}
                    maxLength={80}
                    pattern="[a-zA-Z0-9\s]*" // Restricts special characters
                    title="Special characters are not allowed"
                  />
                  {searchInput != "" &&<ImCross onClick={()=>setSearchInput("")} className="cursor-pointer"/>}
                  </div> */}
                  <input
                    type="text"
                    placeholder="Search Builder..."
                    className="w-full md:w-auto bg-white border border-gray-300 text-gray-700 sm:py-2 px-2 pr-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleSearchInputChange} // Change only input
                    value={searchInput}
                    maxLength={80}
                    pattern="[a-zA-Z0-9\s]*" // Restricts special characters
                    title="Special characters are not allowed"
                  />

                  <button
                    type="submit"
                    className="bg-[#0073C6] inline-flex justify-center items-center text-white font-semibold py-1 sm:py-2 px-4 rounded-lg  transition duration-300"
                    //onClick={handleSubmit} // Trigger search on click
                  >
                    <FaSearch className="sm:mr-2" />
                    <span className="hidden sm:flex">Search</span>
                  </button>
                </form>
              </div>

              {/* <Select
                ref={selectRef}
                data={resultArray}
                searchable
                size={isMobile ? "xs" : "md"}
                value={filterCity}
                placeholder="All Cities"
                radius={"md"}
                onChange={(e) => {
                  e && setFilterCity(e);
                  setSearchInput("");
                  setSearchTerm("");
                  setPage(0);
                  isMobile && setShowFilter(false);
                }}
                maxLength={20}
                rightSection={<span />}
              /> */}

              <select
                ref={selectRef}
                value={filterCity}
                className="w-full text-base md:w-auto appearance-none bg-white border border-gray-300 text-gray-700 py-0 px-4 sm:py-2 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  e && setFilterCity(e.target.value);
                  setSearchInput("");
                  setSearchTerm("");
                  setPage(0);
                  isMobile && setShowFilter(false);
                }}
              >
                <option value="" disabled hidden>
                  All Cities
                </option>
                {resultArray.map((item: any) => {
                  return (
                    <option key={item.label} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
              </select>

              <select
                className="w-full text-base md:w-auto appearance-none bg-white border border-gray-300 text-gray-700 py-0 px-4 sm:py-2 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sortOrder}
                onChange={handleSortOrderChange} // Set page to 0 when sorting changes
              >
                <option value="0">Sort A-Z</option>
                <option value="1">Sort Z-A</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full mx-auto px-2 sm:px-4 py-8 mt-1 md:mt-16">
        {/* Card Grid */}
        <div>
          {isLoading ? (
            <div className="flex items-center justify-center h-screen">
              <div className="flex flex-col items-center space-y-2">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#0073C6] border-t-transparent" />
                <div className="text-lg font-semibold text-gray-700">
                  Loading Builder Information...
                </div>
              </div>
            </div>
          ) : (!shouldFetch
              ? initialData.builderData?.length
              : data?.builderData?.length) > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-6 md:gap-8">
              {(!shouldFetch
                ? initialData.builderData
                : data?.builderData
              )?.map(
                (
                  builder: {
                    userId: number;
                    userName: string;
                    companyName: string;
                    cityName: string;
                    builderLogo: string;
                    builderDescription: string;
                    newProject: number;
                    onGoingProject: number;
                    completedProject: number;
                    istab: boolean;
                    isMobile: boolean;
                    builderCity: string;
                    branchCities: string;
                  },
                  i: number
                ) => (
                  <BuilderDetailsCard
                    key={builder.userId}
                    {...builder}
                    isTab={isTab ?? false}
                    isMobile={isMobile ?? false}
                    builderCity={city ?? ""}
                  />
                )
              )}
            </div>
          ) : (
            <div className="flex mx-auto w-full flex-col items-center justify-center h-full space-y-4 py-12">
              {/* <NoResultsSVG className="w-64 h-64" alt="No Results" /> */}
              <h2 className="text-2xl font-semibold text-gray-800">
                No Builders Found
              </h2>
              <p className="text-gray-600 text-sm text-center max-w-lg">
                We couldn&apos;t find any builders matching your search in{" "}
                {city}. Try adjusting your filters or check back later.
              </p>
              <button
                className="mt-4 flex items-center space-x-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                onClick={handleResetFilters}
              >
                <FaRedoAlt className="mr-2" />
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {/* {totalPages > 1 && (
          <div className="flex justify-center mt-8">
       
          <PaginationForBuilder
              totalCount={totalPages} 
              onNextPage={onNextPage}
              onPreviousPage={onBackPage}
              value={page + 1}
              currentPagefun={settingCurrentValue} 
          />
            {/* <Pagination
              total={totalPages}
              
            /> */}
      </div>
    </div>
  );
}
