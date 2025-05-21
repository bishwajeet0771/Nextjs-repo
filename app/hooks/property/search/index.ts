import {
  initialState,
  searachFilterAtom,
  appliedFiltersParams,
} from "@/app/store/search";
import { convertToQueryParams } from "@/app/utils/search/query";
import { Search } from "@/app/validations/types/search";
import { useAtom, useSetAtom } from "jotai";
import { usePathname } from "next/navigation";
import { useQueryStates, parseAsString, parseAsInteger } from "nuqs";
// import { useState } from "react";
import { useInfiniteQuery } from "react-query";
const paramsInit = {
  projStatus: parseAsString,
  localities: parseAsString,
  builderIds: parseAsString,
  propTypes: parseAsString,
  unitTypes: parseAsString,
  bathRooms: parseAsString,
  parkings: parseAsString,
  amenities: parseAsString,
  listedBy: parseAsString,
  reraVerified: parseAsString,
  minArea: parseAsInteger,
  maxArea: parseAsInteger,
  minPrice: parseAsInteger,
  maxPrice: parseAsInteger,
  city: parseAsString,
};
export default function useSearchFilters() {
  const path = usePathname();

  const [filters, setFilters] = useAtom(searachFilterAtom);
  const setAppliedFilters = useSetAtom(appliedFiltersParams);
  const [params, setParams] = useQueryStates(paramsInit, {
    history: "push",
  });

  const setStatus = (currentItem: number) => {
    setFilters({ ...filters, current: currentItem });
  };

  const setPropTypes = (propertyType: number) => {
    setFilters({ ...filters, propTypes: propertyType });
  };
  const setSingleType = (key: keyof SearchFilter, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  type SearchFilter = {
    unitTypes: string;
    bathRooms: string;
    parkings: string;
    amenities: string;
    areaValue: [number, number];
    bugdetValue: [number, number];
  };
  const handleCheckboxClick = (
    filterType: keyof SearchFilter,
    value: number
  ) => {
    if (!filters[filterType].includes(value) && filters[filterType]) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterType]: [...prevFilters[filterType], value],
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterType]: prevFilters[filterType].filter((type) => type !== value),
      }));
    }
  };
  const countAppliedFilters = (): number => {
    let count: number = 0;
    for (const key in filters) {
      if (Object.prototype.hasOwnProperty.call(filters, key)) {
        if (
          key === "current" ||
          key === "propTypes" ||
          key === "reraVerified"
        ) {
          count += filters[key] ? 1 : 0;
        } else if (key === "areaValue") {
          count +=
            JSON.stringify(filters[key]) !== JSON.stringify([0, 5000]) ? 1 : 0;
        } else if (key === "bugdetValue") {
          count +=
            JSON.stringify(filters[key]) !== JSON.stringify([0, 60]) ? 1 : 0;
        } else {
          count += Array.isArray(filters[key as keyof SearchFilter])
            ? filters[key as keyof SearchFilter].length
            : 0;
        }
      }
    }
    return count;
  };

  const handleBooleanCheck = () => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   reraVerified: !prevFilters.reraVerified,
    // }));
  };
  const handleSliderChange = (key: keyof SearchFilter, newValue: number[]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: newValue,
    }));
  };
  const handleReset = (type: "unitType" | "price" | "all" | "propType") => {
    switch (type) {
      case "unitType":
        setFilters((prev) => ({
          ...prev,
          unitTypes: [],
        }));
        setParams({ unitTypes: null });
        break;
      case "price":
        setFilters((prev) => ({
          ...prev,
          bugdetValue: [0, 60],
        }));
        setParams({ minPrice: null, maxPrice: null });
        break;
      case "all":
        setFilters(initialState);
        Object.keys(paramsInit).map((key) => {
          setParams({ [key]: null });
        });

        break;
      case "propType":
        setFilters((prev) => ({
          ...prev,
          propTypes: null,
        }));
        setParams({ propTypes: null });
        break;
      default:
        setFilters(initialState);
        break;
    }
  };
  const handleAppliedFilters = (callback?: () => void) => {
    setAppliedFilters({ runner: setParams });
    callback && callback();
  };
  // const searchProps = useQuery({
  //   queryFn: () => getFilteredData(convertToQueryParams(params as any), 0),
  //   queryKey: ["srp" + convertToQueryParams(params as any)],
  //   enabled: path === "/search",
  // });

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    error,
    isLoading,
    hasPreviousPage,
  } = useInfiniteQuery({
    queryKey: ["srptest" + convertToQueryParams(params as any)],

    queryFn: ({ pageParam = 0 }) =>
      getFilteredData(convertToQueryParams(params as any), pageParam),

    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;
      if (lastPage.length < 20) {
        return undefined;
      }
      return nextPage;
    },
    enabled: path === "/search",
    cacheTime: 300000,
    staleTime: 30000,
  });
  const fetchMoreData = () => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  };

  const remnoveSearchOptions = (index: any, key: "locality" | "builderIds") => {
    let oldArray = [...filters[key]];
    oldArray.splice(index, 1);
    setFilters((prev) => ({ ...prev, [key]: oldArray }));
  };
  const handleCityReset = () => {
    setFilters((prev) => ({
      ...prev,
      city: null,
    }));
  };
  return {
    filters,
    setStatus,
    setPropTypes,
    handleCheckboxClick,
    countAppliedFilters,
    handleBooleanCheck,
    handleSliderChange,
    handleReset,
    handleAppliedFilters,
    setParams,
    params,
    searchProps: {
      data: data?.pages.flat() || [],
      isLoading,
      error,
      hasPreviousPage,
      fetchMoreData,
      hasNextPage,
    },
    setFilters,
    remnoveSearchOptions,
    setSingleType,
    handleCityReset,
  };
}

const getFilteredData = async (
  query: string,
  page: number
): Promise<Search[]> => {
  console.log(query ? console.log(1) : 0);
  const url = `${
    process.env.NEXT_PUBLIC_BACKEND_URL
  }/srp/searchproj?page=${page}${query && `&${query}`}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching filtered data:", error);
    throw error; // Re-throw the error for handling further up the call stack
  }
};
