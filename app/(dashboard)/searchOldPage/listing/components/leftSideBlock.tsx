"use client";
import React, { useEffect, useRef } from "react";
import {
  // DropDownIcon,
  emptyFilesIcon,
  strikeIconIcon,
} from "@/app/images/commonSvgs";
import useSearchFilters from "@/app/hooks/search";
import NewTabCon from "../../components/leftsection/newtabCon";
import { SEARCH_FILTER_DATA } from "@/app/data/search";
type Props = {
  // eslint-disable-next-line no-unused-vars
  mutate?: ({ index, type }: { type: string; index: number }) => void;
  serverData?: any;
};
const LeftSideBlock = ({ mutate, serverData }: Props) => {
  const {
    filters,
    setSingleType,
    handleReset,
    handleAppliedFilters,
    params,
    // countAppliedFilters,
    countAppliedFiltersFromQuery,

    searchProps: { isLoading, data, hasNextPage, fetchMoreData, refetch },
    path,
  } = useSearchFilters("owner");
  const appliedFiltersCount = countAppliedFiltersFromQuery();
  const serverClientData =
    appliedFiltersCount > 0
      ? data
      : path.includes("/seo") ||
        path.includes("/in") ||
        path.includes("/projects") ||
        path.includes("/residential/listings") ||
        path.includes("/residential-listings")
      ? serverData
      : data;

  const containerRef = useRef<HTMLDivElement>(null);

  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.1,
  });
  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      fetchMoreData();
    }
  }, [entry?.isIntersecting, hasNextPage, fetchMoreData]);
  const onTabChange = (value: string) => {
    if (value === "All") {
      handleReset("listedBy");
      return null;
    } else {
      setSingleType("listedBy", value);
      handleAppliedFilters();
    }
  };
  return (
    <>
      <div className="md:w-[50%] sm:w-[100%]  md:bg-white w-[100%]  xl:min-w-[400px] md:min-w-[500px] ">
        <NewTabCon
          onTabChange={onTabChange}
          Activities={params.cg}
          selectedProtype={params.listedBy ?? "All"}
          categoryType={SEARCH_FILTER_DATA.categoryDataListing}
        />
        <div
          className="sm:max-h-[500px] w-full  xl:max-h-[700px] xl:min-h-[65%] max-w-full overflow-y-auto"
          ref={containerRef}
        >
          {isLoading ? (
            <Loading />
          ) : serverClientData != undefined &&
            serverClientData.length != undefined &&
            serverClientData.length > 0 ? (
            serverClientData.map((eachOne: any, index: number) => {
              return (
                <ProjectCard
                  key={eachOne.projIdEnc}
                  refetch={refetch}
                  data={{ ...eachOne, type: filters.listedBy ?? "All" }}
                  index={index}
                  mutate={mutate}
                />
              );
            })
          ) : (
            <div className="flex w-full h-full justify-center items-center flex-col ">
              {emptyFilesIcon}
              No Matching Results Found !
              <span className="relative left-[10%] ">{strikeIconIcon}</span>
            </div>
          )}
          {hasNextPage && (
            <div ref={ref}>
              <SearchSkeleton />
            </div>
          )}
        </div>
      </div>

      {/* </div> */}
      <RightSideBlock
        categoryType={"owner"}
        serverClientData={serverClientData}
      />
    </>
  );
};

export default LeftSideBlock;

// import MapModal from "./modals";
import Loading from "@/app/components/atoms/Loader";
// import { Vast_Shadow } from "next/font/google";
import { useIntersection } from "@mantine/hooks";
import SearchSkeleton from "@/app/components/atoms/skeleton/search";
// import SharePopup from "../../components/SharePopup";
// import path from "path";
import { RightSideBlock } from "./rightSideBlock";
import ProjectCard from "@/app/test/newui/components/Card";

// const TabData = [
//   {
//     label: "ALL",
//     value: "All",
//   },
//   {
//     label: "Owner Listing",
//     value: "I",
//   },
//   {
//     label: "Agent Listing",
//     value: "A",
//   },
//   {
//     label: "Builder Listing",
//     value: "B",
//   },
// ];
