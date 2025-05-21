/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import { emptyFilesIcon, strikeIconIcon } from "@/app/images/commonSvgs";
import React, { useEffect, useRef, useState, memo } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import RTK_CONFIG from "@/app/config/rtk";
import { getListingSearchData } from "../../../utils/project-search-queryhelpers";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  projSearchStore,
  searchPageMapToggle,
} from "../../../store/projSearchStore";
import { getAllAuthorityNames } from "@/app/utils/api/project";
import RequestCallBackModal from "@/app/components/molecules/popups/req";
import LoginPopup from "@/app/components/project/modals/LoginPop";
import FloatingArrowIcon from "../../../components/ProjectSearchTabs/FloatingArrowIcon";
import { useMediaQuery } from "@mantine/hooks";
import selectedSearchAtom, { selectedNearByAtom } from "@/app/store/search/map";
import { overlayAtom } from "@/app/test/newui/store/overlay";
import ListingServerCardData from "./ListingServerCardData";
import ListingSearchPagination from "../../_new-listing-search-page/components/ListingSearchPagination";
import { useParams, useSearchParams } from "next/navigation";

type Props = {
  mutate?: ({ index, type }: { type: string; index: number }) => void;
  serverData?: any;
  frontendFilters?: any;
  isTrue: boolean;
  setIsTrue: any;
  apiFilterQueryParams: string | null;
  preDefinedFilters: string | null;
};

function LeftSection({
  mutate,
  serverData,
  // frontendFilters,
  isTrue: it,
  setIsTrue,
  apiFilterQueryParams,
  preDefinedFilters,
  frontendFilters,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldFetchMore, setShouldFetchMore] = useState(true);
  const state = useAtomValue(projSearchStore);
  const [mainData, setMainData] = useState<any>(serverData || []);
  const [totalCount, setTotalCount] = useState(frontendFilters.totalCount);
  const isTrue = apiFilterQueryParams !== preDefinedFilters;
  const params = useParams();

  const isMobile = useMediaQuery("(max-width: 601px)");
  const setNearby = useSetAtom(selectedNearByAtom);
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    refetch,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      `searchQuery${apiFilterQueryParams ? `-${apiFilterQueryParams}` : ""}`,
    ],
    queryFn: async ({ pageParam = frontendFilters.page || 0 }) => {
      const response = await getListingSearchData(
        pageParam,
        apiFilterQueryParams ?? ""
      );
      setTotalCount(response.totalCount);
      return response.results;
    },
    getNextPageParam: (lastPage: any, allPages: any) => {
      const nextPage = !isTrue
        ? frontendFilters.currentPage + allPages.length
        : allPages.length;
      if (lastPage.length < 20) return;
      return nextPage;
    },

    ...(serverData && {
      initialData: {
        pages: [serverData],
        pageParams: [0],
      },
    }),
    cacheTime: 300000,
    enabled: isTrue,
    // onSuccess: (data: any) => {
    //   const newData = data.pages[data.pageParams.length - 1];
    //   setMainData((prev: any) => [...prev, ...newData.results]);
    // },
  });

  //console.log(typeof window !== "undefined" )
  const { data: approvedData } = useQuery({
    queryKey: ["projAuth"],
    enabled: true,
    queryFn: () => getAllAuthorityNames(),
    ...RTK_CONFIG,
  });

  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Enhanced infinite scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (
          target.isIntersecting &&
          hasNextPage &&
          shouldFetchMore &&
          !isLoading
        ) {
          setIsTrue(true);
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, shouldFetchMore, isLoading, fetchNextPage]);
  const dataToUse =
    apiFilterQueryParams === preDefinedFilters || typeof window === "undefined"
      ? mainData
      : data?.pages.flat()
      ? data?.pages.flat()
      : mainData;
  const EmptyState = memo(function EmptyState() {
    return (
      <div className="flex w-full h-full justify-center items-center flex-col">
        {emptyFilesIcon}
        No Matching Results Found!
        <span className="relative left-[10%]">{strikeIconIcon}</span>
      </div>
    );
  });

  const LoadingSpinner = memo(function LoadingSpinner() {
    return (
      <div className="flex items-center gap-2">
        <div className="w-[20px] h-[20px] md:w-[26px] md:h-[26px] xl:w-[30px] xl:h-[30px] border-t-4 border-blue-500 border-solid rounded-full animate-spin" />
        <span className="font-bold">Loading more results...</span>
      </div>
    );
  });

  const LoadingBlock = () => (
    <div className="flex items-center justify-center h-screen w-full ">
      <div className="text-center flex items-center justify-center flex-col ">
        <div className="w-[20px] h-[20px] md:w-[26px] md:h-[26px] xl:w-[30px] xl:h-[30px] border-t-4 border-blue-500 border-solid rounded-full animate-spin" />
        <h2 className="text-[16px] md:text-[18px] xl:text-[20px] font-semibold text-gray-700 mt-[14px] ">
          Loading...
        </h2>
      </div>
    </div>
  );

  const setSelected = useSetAtom(selectedSearchAtom);
  const [, dispatch] = useAtom(overlayAtom);
  const setIsMapLoaded = useSetAtom(searchPageMapToggle);

  useEffect(() => {
    // isDataRenders(allItems);
    if (isMobile) return;
    const handleScroll = () => {
      setIsMapLoaded(true);

      setNearby((prev: any) => ({
        ...prev,
        category: "",
        data: {},
        selectedNearbyItem: {},
        id: "",
        isOpen: false,
      }));
      dispatch({ type: "CLOSE" });
      setSelected(null);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <div
      className={`flex flex-col w-full md:max-w-[40%] xl:max-w-[50%] relative overflow-auto`}
      ref={containerRef}
    >
      {isFetching && isFetchingNextPage === false ? (
        <LoadingBlock />
      ) : dataToUse?.length ? (
        <>
          {/* Image use below */}
          {isMobile && dataToUse[0].coverImage && (
            <>
              <link
                rel="preconnect"
                href="https://media.getrightproperty.com"
                crossOrigin="anonymous"
              />

              {/* Preload image with srcSet and sizes */}
              {dataToUse?.[0]?.coverImage?.includes(",") && (
                <link
                  rel="preload"
                  as="image"
                  href={
                    dataToUse[0].coverImage.includes("+")
                      ? dataToUse[0].coverImage
                          .replace(/\+/g, "%2B")
                          .split(",")[1]
                      : dataToUse[0].coverImage.split(",")[1]
                  }
                />
              )}
            </>
          )}
          {/* Image Use above*/}

          <ListingServerCardData
            data={dataToUse}
            refetch={refetch}
            mutate={mutate}
            state={state}
            frontendFilters={frontendFilters}
          />
        </>
      ) : (
        <EmptyState />
      )}
      {hasNextPage && shouldFetchMore && (
        <div
          ref={loadMoreRef}
          className="w-full py-8 flex justify-center items-center text-gray-600"
        >
          <LoadingSpinner />
        </div>
      )}

      {params.slugs && params.slugs.length < 4 ? (
        <div
          className={typeof window !== "undefined" ? "invisible" : ""}
          aria-hidden={typeof window !== "undefined" ? "true" : undefined}
        >
          <ListingSearchPagination
            currentPage={
              frontendFilters.currentPage ? frontendFilters.currentPage + 1 : 1
            }
            totalCount={frontendFilters.totalCount ?? 0}
          />
        </div>
      ) : null}
      <LoginPopup />
      <RequestCallBackModal />

      <FloatingArrowIcon />
    </div>
  );
}

export default memo(LeftSection);
