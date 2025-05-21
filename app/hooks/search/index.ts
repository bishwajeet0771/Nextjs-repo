import RTK_CONFIG from "@/app/config/rtk";
import {
  initialState,
  searachFilterAtom,
  appliedFiltersParams,
} from "@/app/store/search";
import { SearchFilter } from "@/app/types/search";
import { convertToQueryParams } from "@/app/utils/search/query";
import { Search } from "@/app/validations/types/search";
import { useAtom, useSetAtom } from "jotai";
import { usePathname } from "next/navigation";
import {
  useQueryStates,
  parseAsString,
  parseAsInteger,
  parseAsFloat,
} from "nuqs";
import {
  // Query,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "react-query";
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
  reraIds: parseAsString,
  minArea: parseAsInteger,
  maxArea: parseAsInteger,
  minPrice: parseAsFloat,
  maxPrice: parseAsFloat,
  city: parseAsString,
  facings: parseAsString,
  furnish: parseAsInteger,
  propStatus: parseAsString,
  pnb: parseAsInteger,
  sortByfield: parseAsString,
  sortType: parseAsInteger,
  cg: parseAsString,
  projIdEnc: parseAsString,
  lat: parseAsInteger,
  lng: parseAsInteger,
};
// export type of params
export type SearchParams = typeof paramsInit;
interface ExtentSearchFilters extends SearchFilter {
  listedBy: string;
  furnish: number;
}
export default function useSearchFilters(
  input?: "project" | "owner" | "agent"
) {
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

  const setSingleType = (
    key: keyof ExtentSearchFilters,
    value: string | number,
    callback?: () => void
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    callback && callback();
  };
  type SearchFilter = {
    unitTypes: string;
    bathRooms: string;
    parkings: string;
    amenities: string;
    areaValue: [number, number];
    bugdetValue: [number, number];
    facings: number[];
    reraVerified: number[];
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
    let count = 0;
    const {
      current,
      propTypes,
      reraVerified,
      listedBy,
      furnish,
      propStatus,
      areaValue,
      bugdetValue,
      amenities,
      bathRooms,
      builderIds,
      city,
      facings,
      locality,
      parkings,
      unitTypes,
      pnb,
    } = filters;
    count += current ? 1 : 0;
    count += propTypes ? 1 : 0;
    count += reraVerified?.length || 0;
    count += listedBy ? 1 : 0;
    count += furnish ? 1 : 0;
    count += propStatus?.length || 0;
    count += areaValue[0] !== 0 || areaValue[1] !== 5000 ? 1 : 0;
    count += bugdetValue[0] !== 500000 || bugdetValue[1] !== 600000000 ? 1 : 0;
    count += amenities?.length || 0;
    count += bathRooms.length || 0;
    count += builderIds.length || 0;
    count += city ? 1 : 0;
    count += locality.length || 0;
    count += parkings.length || 0;
    count += facings.length || 0;
    count += unitTypes.length || 0;
    count += pnb ? 1 : 0;
    return count;
  };
  const isFilterApplied = (filterKey: string): boolean => {
    const {
      propTypes,
      reraVerified,
      listedBy,
      furnish,
      areaValue,
      bugdetValue,
      amenities,
      bathRooms,
      builderIds,
      city,
      facings,
      locality,
      parkings,
      unitTypes,
      current,
    } = filters;

    switch (filterKey) {
      case "Project Status":
        return !!current;
      case "Locality":
        return !!locality.length;
      case "Property Type":
        return !!propTypes;
      case "Unit Type":
        return !!unitTypes.length;
      case "Area":
        return areaValue[0] !== 0 || areaValue[1] !== 5000;
      case "Budget":
        return bugdetValue[0] !== 500000 || bugdetValue[1] !== 600000000;
      case "Bath":
        return !!bathRooms.length;
      case "Amenities":
        return !!amenities?.length;
      case "Parking":
        return !!parkings.length;
      case "RERA":
        return !!reraVerified;
      case "Builder":
        return !!builderIds.length;
      // case "Bhk":
      //   return !!current;

      case "Facing":
        return !!facings.length;
      case "Posted By":
        return !!listedBy;
      case "Furnishing":
        return !!furnish;
      case "City":
        return !!city;
      default:
        return false;
    }
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

  const handleReset = (
    type:
      | "unitType"
      | "price"
      | "all"
      | "propType"
      | "listedBy"
      | "searchProj"
      | "prjectsearchlisting",
    keys?: string[]
  ) => {
    switch (type) {
      case "unitType":
        setFilters((prev) => ({
          ...prev,
          unitTypes: [],
        }));
        setParams({ unitTypes: null });
        break;
      case "listedBy":
        setFilters((prev) => ({
          ...prev,
          listedBy: null,
        }));
        setParams({ listedBy: null });
        break;
      case "price":
        setFilters((prev) => ({
          ...prev,
          bugdetValue: [500000, 600000000],
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
      case "searchProj": {
        let updatedFilters = { ...filters };
        for (const key in updatedFilters) {
          if (keys && keys.includes(key)) {
            // @ts-ignore
            updatedFilters[key] = initialState[key];
          }
        }
        setFilters(updatedFilters);
        handleAppliedFilters();
        break;
      }

      case "prjectsearchlisting":
        setFilters({ ...initialState, listedBy: filters.listedBy });
        handleAppliedFilters();
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
  const listByCondition =
    filters.listedBy === "I" ||
    filters.listedBy === "A" ||
    filters.listedBy === "B" ||
    filters.listedBy === "ALL";
  const value = listByCondition
    ? "owner"
    : input === undefined
    ? "project"
    : input;
  const countAppliedFiltersFromQuery = () => {
    let count = 0;
    Object.keys(params).map((key: any) => {
      if (params[key as keyof typeof params] !== null) {
        count++;
      }
    });
    return count;
  };
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    error,
    isLoading,
    hasPreviousPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["srptest" + convertToQueryParams(params as any) + value],
    queryFn: ({ pageParam = 0 }) =>
      getFilteredData(
        convertToQueryParams(params as any),
        pageParam,
        value,
        filters.city
      ),

    getNextPageParam: (lastPage: any, allPages: any) => {
      const nextPage = allPages.length;
      if (lastPage.length < 20) {
        return;
      }
      return nextPage;
    },
    enabled:
      ["/search", "/search/listing"].includes(path) ||
      ((path.includes("/seo") ||
        path.includes("/projects") ||
        path.includes("/listings") ||
        path.includes("/residential")) &&
        countAppliedFiltersFromQuery() > 0 &&
        input !== undefined),
    ...RTK_CONFIG,
  });
  //  if any value is null then don't increase otherwise increase count

  const updateItem = async () => {
    console.log("api done");
  };
  const queryClient = useQueryClient();
  // useMutation hook with optimistic updates
  const { mutate } = useMutation(updateItem, {
    onMutate: async ({ type, index }: { type: string; index: number }) => {
      await queryClient.cancelQueries([
        "srptest" + convertToQueryParams(params as any) + value,
      ]);

      const previousData = queryClient.getQueryData([
        "srptest" + convertToQueryParams(params as any) + value,
      ]);

      const pageIndex = Math.floor(index / 20);
      // @ts-ignore
      const updatedData = { ...previousData };
      const item = updatedData.pages[pageIndex][index];
      const currentStatus =
        item[type === "shortlist" ? "shortListed" : "compareAdded"];
      const newStatus = currentStatus === "Y" ? "N" : "Y";

      item[type === "shortlist" ? "shortListed" : "compareAdded"] = newStatus;
      queryClient.setQueryData(
        ["srptest" + convertToQueryParams(params as any) + value],
        updatedData
      );

      return { previousData };
    },
    onError: () => {},
    onSettled: () => {},
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
      fullData: data,
      isLoading,
      error,
      hasPreviousPage,
      fetchMoreData,
      hasNextPage,
      refetch,
      mutate,
    },
    setFilters,
    remnoveSearchOptions,
    setSingleType,
    handleCityReset,
    isFilterApplied,
    countAppliedFiltersFromQuery,
    path,
  };
}

const getFilteredData = async (
  query: string,
  page: number,
  type: "project" | "owner" | "agent",
  city: string | null
): Promise<Search[]> => {
  const hasCityParam = /(?:^|&)city=/.test(query);
  const hasCg = /(?:^|&)cg=/.test(query);
  const cgValue = !hasCg ? "&cg=S" : "";

  let cityId = "9"; // Default city ID
  if (city) {
    const [, cityIdFromParam] = city.split("+");
    if (cityIdFromParam) {
      cityId = cityIdFromParam;
    }
  }

  // Only add city param if it's not already in query
  const cityParam = !hasCityParam && cityId ? `&city=${cityId}` : "";

  const url =
    type === "project"
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/searchproj?page=${page}${
          query && query !== "listedBy=ALL" ? `&${query}` : ""
        }${cgValue}${cityParam}`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/prop-search?page=${page}${
          query && query.includes("listedBy=ALL")
            ? `&${query.replace("listedBy=ALL", "")}`
            : `&${query}`
        }${cityParam}${cgValue}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching filtered data:", error);
    throw error;
  }
};
