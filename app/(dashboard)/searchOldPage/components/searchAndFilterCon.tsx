"use client";
import React, { useState } from "react";
import { Pill, Popover } from "@mantine/core";
import { FilterPopup } from "./filterPopup";
import { FilterPopup as ListingPopup } from "../listing/components/filterPopup";
import classes from "@/app/styles/search.module.css";
import BhkFilter from "./bhk";
import PropTypeFilter from "./proptype";
import BugdetFilter from "./buget";
import useSearchFilters from "@/app/hooks/search";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
// import SearchDrawer from "./drawer";
import BuyRent from "./filter/BuyRent";
import { DynamicText } from "../utils/text";
import { SearchIcon } from "@/app/images/HomePageIcons";
import { propertyDetailsTypes } from "@/app/data/projectDetails";
import { SEARCH_FILTER_DATA } from "@/app/data/search";
import { toFormattedString } from "./buget/budget";
import { useHydrateAtoms } from "jotai/utils";
import { initialState, searachFilterAtom } from "@/app/store/search";
import SearchCitySelectDropdown from "./_ui/CityDropDown/SearchCitySelectDropdown";
import { serverCityAtom } from "@/app/store/search/serverCity";
import { useAtomValue } from "jotai";
import Link from "next/link";
const SearchAndFilterCon = ({ frontendFilters }: any) => {
  useHydrateAtoms([
    [searachFilterAtom, { ...initialState, ...frontendFilters }],
  ]);
  const [showAllLocalities, setShowAllLocalities] = useState(false);
  return (
    <SearchHeader
      setShowAllLocalities={setShowAllLocalities}
      showAllLocalities={showAllLocalities}
      city={frontendFilters?.city}
    />
  );
};
export default SearchAndFilterCon;

const SearchHeader = ({ city }: any) => {
  const { filters, remnoveSearchOptions, handleAppliedFilters, params } =
    useSearchFilters();
  // const isMobile = useMediaQuery("(max-width: 601px)");
  const isTab = useMediaQuery("(max-width: 1600px)");

  type FilterObjState = {
    all: boolean;
    type: boolean;
    bhk: boolean;
    budget: boolean;
  };

  const initialFilterObjState: FilterObjState = {
    all: false,
    type: false,
    bhk: false,
    budget: false,
  };

  const [allFilterPopup, setAllFilterPopup] = useState(initialFilterObjState);

  const [, { close }] =
    useDisclosure(false);
  // const showpopUp = () => {
  //   setShowAllLocalities(true);
  //   open();
  // };

  const maxDisplay = 3;

  const handleOpenFilterToggle = (key?: any, state?: boolean) => {
    setAllFilterPopup((prev) => ({ ...prev, [key]: state }));
  };

  const handleCloseFiltersToggle = () => {
    setAllFilterPopup(initialFilterObjState);
  };

  const values = filters.unitTypes.map((itemId, i) => {
    const selectedItem = SEARCH_FILTER_DATA.bhkDetails.find(
      (item) => item.value === itemId
    );

    if (selectedItem) {
      // Check if the item is within the first `maxDisplay` items or if it's the last item when more than `maxDisplay` items are present
      const isLastItemToDisplay =
        i === maxDisplay - 1 && filters.unitTypes.length > maxDisplay;
      const shouldAddComma =
        i < maxDisplay - 1 && i < filters.unitTypes.length - 1;

      return (
        <React.Fragment key={itemId}>
          {i < maxDisplay ? selectedItem.title : ""}
          {shouldAddComma ? ", " : ""}
          {isLastItemToDisplay ? " ..." : ""}
        </React.Fragment>
      );
    }
    return null;
  });

  const shouldShowBudget = !(
    (filters.bugdetValue[0] === 500000 &&
      filters.bugdetValue[1] === 600000000) ||
    (filters.bugdetValue[0] === 0 && filters.bugdetValue[1] === 100000)
  );
  const servercityData = useAtomValue(serverCityAtom);
  const allFiltersMap = [...filters.locality, ...filters.builderIds];
  return (
    <div className="mb-4 w-full  mt-[60px] sm:mt-[80px] pl-[1%]   ">
      <p className="text-[12px]  text-[#737579] font-[500] mt-2 mb-2 sm:mb-0 sm:mt-4  w-full md:w-auto">
        <span className="text-[#737579] font-[500] mt-3">
          {" "}
          <Link
            rel="noopener noreferrer"
            className="hover:underline"
            href={"/"}
          >
            Home
          </Link>{" "}
          {" > "}
        </span>
        <span>
          <span className="  text-[#4D6677] font-[600] ">
            {DynamicText({
              cg: params.cg as string,
              listedBy: params.listedBy,
              city: city ?? servercityData,
            })}
          </span>
        </span>{" "}
      </p>
      <div className="mt-2 w-full flex  gap-1 xl:gap-2 sm:gap-[10px] flex-wrap sm:flex-wrap xl:flex-nowrap justify-start xl:justify-start items-center xl:items-center ">
        <SearchCitySelectDropdown />
        {/* {isMobile && (
          <div
            className={`border-[#A0D7FF] max-w-full flex flex-wrap rounded-[20px] sm:rounded-[40px] p-2 gap-2 xl:gap-[8px] pl-2 xl:pl-[8px] border-[1px] border-solid  items-center justify-center px-6 ${
              filters.cg == null ? "sm:min-w-[300px]" : ""
            }`}
          >
            <BuyRent />

            {allFiltersMap?.map(
              (each, index) =>
                index < (isTab ? 1 : 2) && (
                  <Pill
                    onRemove={() => {
                      remnoveSearchOptions(each, "locality");
                      handleAppliedFilters();
                    }}
                    key={each + "locality"}
                    withRemoveButton
                    classNames={{
                      root: classes.MultiSelectionPill,
                      remove: classes.removeButton,
                    }}
                    removeButtonProps={{
                      style: {
                        color: "#03153",
                      },
                    }}
                  >
                    {each.split("+")[0]}
                  </Pill>
                )
            )}
            {allFiltersMap?.length > (isTab ? 1 : 2) && (
              <Pill
                className="capitalize"
                classNames={{ root: classes.MultiSelectionPill }}
                onClick={() =>
                  isMobile ? openMobileSearchDrawer() : showpopUp()
                }
              >
                {`+${allFiltersMap?.length - (isTab ? 1 : 2)} More`}
              </Pill>
            )}
            {allFiltersMap?.length > 0 ? (
              <p onClick={() => (isMobile ? openMobileSearchDrawer : "")}>
                Add more
              </p>
            ) : (
              <p
                className="text-[14px] sm:text-base"
                onClick={() => (isMobile ? openMobileSearchDrawer() : "")}
              >
                Search By Locality, Projects or Listings
              </p>
            )}
            <SearchIcon />
          </div>
        )} */}
        {/* {!isMobile && ( */}
        <Popover
          width={"auto"}
          trapFocus
          position="bottom"
          withArrow
          shadow="lg"
          radius={10}
          offset={{ mainAxis: 10, crossAxis: -200 }}
          opened={allFilterPopup.all}
          onClose={() => handleOpenFilterToggle("all", false)}
        >
          <Popover.Target>
            <div
              className={`border-[#A0D7FF] max-w-full flex flex-wrap rounded-[20px] sm:rounded-[40px] p-2 gap-2 xl:gap-[8px] pl-2 xl:pl-[8px] border-[1px] border-solid items-center justify-center px-6 ${
                filters.cg == null ? "sm:min-w-[300px]" : ""
              }`}
              onClick={() => handleOpenFilterToggle("all", true)}
            >
              <BuyRent />
              {allFiltersMap?.map(
                (each, index) =>
                  index < (isTab ? 1 : 2) && (
                    <Pill
                      onRemove={() => {
                        remnoveSearchOptions(
                          each,
                          filters.builderIds.includes(each)
                            ? "builderIds"
                            : "locality"
                        );
                        handleAppliedFilters();
                      }}
                      key={each}
                      withRemoveButton
                      classNames={{
                        root: classes.MultiSelectionPill,
                        remove: classes.removeButton,
                      }}
                      removeButtonProps={{
                        style: {
                          color: "#03153",
                        },
                      }}
                    >
                      {each.split("+")[0]}
                    </Pill>
                  )
              )}
              {allFiltersMap?.length > (isTab ? 1 : 2) && (
                <Pill
                  className="capitalize"
                  classNames={{ root: classes.MultiSelectionPill }}
                >
                  {`+${allFiltersMap?.length - (isTab ? 1 : 2)} More`}
                </Pill>
              )}
              {allFiltersMap?.length > 0 ? (
                <p>Add more</p>
              ) : (
                <p className="text-[14px] md:text-[16px]">
                  Search By Locality, Projects or Listings
                </p>
              )}
              <SearchIcon />
            </div>
          </Popover.Target>
          <Popover.Dropdown className="!z-50" p={0}>
            {params.listedBy ? (
              <ListingPopup close={close} />
            ) : (
              <FilterPopup close={handleCloseFiltersToggle} />
            )}
          </Popover.Dropdown>
        </Popover>

        <Popover
          width={"auto"}
          trapFocus
          position="bottom"
          withArrow
          shadow="lg"
          radius={10}
          offset={{ mainAxis: 10, crossAxis: 0 }}
          opened={allFilterPopup.type}
          onClose={() => handleOpenFilterToggle("type", false)}
        >
          <Popover.Target>
            <button
              className=" text-[#0073C6] hidden text-[14px] xl:text-[20px] font-[500] gap-[6px] p-[7px] pl-[12px] pr-[12px] lg:flex justify-center items-center rounded-[57px] border-[1px] border-[#A0D7FF] bg-[#FFF] shadow-md "
              onClick={() => handleOpenFilterToggle("type", true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
              >
                <circle cx="5" cy="5" r="5" fill="#148B16" />
              </svg>
              {filters.propTypes
                ? propertyDetailsTypes.get(filters.propTypes)?.name
                : "Select Property Type"}
            </button>
          </Popover.Target>
          <Popover.Dropdown className="!z-50" p={0}>
            <PropTypeFilter close={handleCloseFiltersToggle} />
          </Popover.Dropdown>
        </Popover>

        {filters.propTypes !== 32 && (
          <Popover
            width={"auto"}
            trapFocus
            position="bottom"
            withArrow
            shadow="lg"
            radius={10}
            offset={{ mainAxis: 10, crossAxis: 0 }}
            opened={allFilterPopup.bhk}
            onClose={() => handleOpenFilterToggle("bhk", false)}
          >
            <Popover.Target>
              <button
                className=" text-[#0073C6] sm:text-[14px] xl:text-[20px] font-[500] gap-[6px] p-[7px] pl-[12px] pr-[12px] hidden justify-center items-center rounded-[57px] border-[1px] border-[#A0D7FF] bg-[#FFF] shadow-md md:flex "
                onClick={() => handleOpenFilterToggle("bhk", true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <circle cx="5" cy="5" r="5" fill="#148B16" />
                </svg>
                {filters.unitTypes.length > 0 ? values : "Select BHK Type"}
              </button>
            </Popover.Target>
            <Popover.Dropdown className="!z-50" p={0}>
              <BhkFilter close={handleCloseFiltersToggle} />
            </Popover.Dropdown>
          </Popover>
        )}

        <Popover
          width={"auto"}
          trapFocus
          position="bottom"
          withArrow
          shadow="lg"
          radius={10}
          offset={{ mainAxis: 10, crossAxis: 0 }}
          opened={allFilterPopup.budget}
          onClose={() => handleOpenFilterToggle("budget", false)}
        >
          <Popover.Target>
            <button
              className=" text-[#0073C6] text-[14px] xl:text-[20px] font-[500] gap-[6px] p-[7px] pl-[12px] pr-[12px] hidden lg:flex justify-center items-center rounded-[57px] border-[1px] border-[#A0D7FF] bg-[#FFF] shadow-md "
              onClick={() => handleOpenFilterToggle("budget", true)}
            >
              {" "}
              <span className="bg-[#148B16] rounded-full text-white text-sm block w-5 h-5">
                ₹
              </span>
              {shouldShowBudget &&
              ((filters.bugdetValue[0] !== undefined &&
                filters.bugdetValue[0] !== 0 &&
                filters.bugdetValue[0].toString() !== "") ||
                (filters.bugdetValue[1] !== undefined &&
                  filters.bugdetValue[1] !== 0 &&
                  filters.bugdetValue[1].toString() !== ""))
                ? `${toFormattedString(filters.bugdetValue[0])}  ${
                    "- " + toFormattedString(filters.bugdetValue[1])
                  }`
                : " Add Budget"}
            </button>
          </Popover.Target>
          <Popover.Dropdown className="!z-50" p={0}>
            <BugdetFilter close={handleCloseFiltersToggle} />
          </Popover.Dropdown>
        </Popover>
        {/* )} */}

        {/* <SearchDrawer
          close={close}
          open={openMobileSearchDrawer}
          opened={opened}
        /> */}
      </div>
    </div>
  );
};
