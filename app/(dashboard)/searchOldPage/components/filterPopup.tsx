"use client";
import React, { useRef, useState } from "react";
import { searchDetails } from "@/app/data/searchDetails";
import Button from "@/app/elements/button";
import S from "@/app/styles/seach/Listing.module.css";
import {
  DropDownIcon,
  fourStarIcon,
  lensSvg,
  miniItemsCrossIcon,
  // notificationIcon,
} from "@/app/images/commonSvgs";
import {
  Checkbox,
  MultiSelect,
  Radio,
  RangeSlider,
  ScrollArea,
} from "@mantine/core";
import classes from "@/app/styles/search.module.css";
import { projectprops, propertyDetailsTypes } from "@/app/data/projectDetails";
import ClearAll from "./ClearAll";
import { SEARCH_FILTER_DATA } from "@/app/data/search";
import useSearchFilters from "@/app/hooks/search";
import { useDebouncedState, useMediaQuery } from "@mantine/hooks";
import { useQuery } from "react-query";
import { getData } from "@/app/utils/api/search";
import clsx from "clsx";
// import { formatBudgetValue } from "./buget";
import { toFormattedString } from "./buget/budget";
// import useQsearch from "@/app/hooks/search/useQsearch";
import { MainSearchMultiSelect } from "./_ui/Multiselect";
import { serverCityAtom } from "@/app/store/search/serverCity";
import { useAtomValue } from "jotai";

const FilterPopup = ({ close }: { close?: () => void }) => {
  const [current, setCurrent] = useState("Search");
  // const {
  //   data: searchData,
  //   isLoading,
  //   handleResetQuery,
  //   onSearchChange,
  //   debounced,
  //   name,
  // } = useQsearch();
  // const {
  //   localities,
  //   builders,
  //   cities,
  //   projects,
  //   listing: listings,
  //   projectListing,
  // } = searchData;
  const propKeys = [35, 33, 31, 34, 32];
  const [localitySearch, setSearchLocality] = useDebouncedState("", 500);
  const [builderSearch, setBuilderSearch] = useDebouncedState("", 500);
  const serverCity = useAtomValue(serverCityAtom);
  const { data } = useQuery({
    queryFn: () =>
      getData(localitySearch, "loc", filters.city ?? serverCity ?? ""),
    queryKey: ["search" + "loc" + localitySearch],
    enabled: localitySearch !== "",
  });
  const { isLoading: builderDataLoading, data: builderData } = useQuery({
    queryFn: () =>
      getData(builderSearch, "builders", filters.city ?? serverCity ?? ""),
    queryKey: ["search" + "builders" + builderSearch],
    enabled: builderSearch !== "",
  });

  const isMobile = useMediaQuery("(max-width: 601px)");

  const {
    filters,
    handleCheckboxClick,
    setPropTypes,
    setStatus,
    handleSliderChange,
    setFilters,
    remnoveSearchOptions,
    isFilterApplied,
  } = useSearchFilters();
  const viewport = useRef<HTMLDivElement>(null);
  const scrollWhereIsSelected = (item: string) => {
    setCurrent(item);
    // @ts-ignore
    const selectedElement = document.getElementById(item);

    if (selectedElement) {
      const titleHeight = selectedElement?.offsetHeight || 0;
      const position = selectedElement.offsetTop - titleHeight;

      viewport.current!.scrollTo({
        top: position - 20,
        behavior: "smooth",
      });
    }
  };
  const filteredSearchDetails =
    filters.propTypes === projectprops.plot
      ? searchDetails.filter(
          (item) => !["Parking", "Unit Type", "Bath"].includes(item)
        )
      : searchDetails;
  return (
    <div className=" flex justify-start items-start w-full md:w-[70vw] top-[160px] left-[70%]">
      <div className="w-[20%] hidden sm:flex shadow-md justify-start items-center flex-col ">
        <p className=" text-[#000] text-[16px] bg-[#F4F4F4] flex justify-start px-6  items-center font-[500] py-[3.5%] w-full ">
          Quick Filters
        </p>
        <div className="w-full ">
          {filteredSearchDetails.map((eachItem) => {
            return (
              <Button
                key={eachItem}
                title={eachItem}
                onChange={() => scrollWhereIsSelected(eachItem)}
                buttonClass={clsx(
                  `whitespace-nowrap w-full text-[15px] flex flex-row-reverse justify-end pl-[10%] items-center border-solid border-b-[0.5px] items-start px-4 py-4 h-[31px] gap-[8px]`,
                  current == eachItem
                    ? "text-[#148B16] bg-[#F1F9FF] font-[700]"
                    : "text-[#202020] bg-[#FCFCFC] font-[500]"
                )}
                icon={isFilterApplied(eachItem) ? fourStarIcon : ""}
              />
            );
          })}
        </div>
      </div>

      <div className="w-full">
        <ClearAll type="all" close={close} />
        {/* Right Side Fields Con */}
        <ScrollArea
          h={350}
          className="w-full  pt-[1%] pl-[1%] md:pl-[2%]"
          viewportRef={viewport}
        >
          {" "}
          <h3
            className=" text-[#202020] mb-[1%] text-[14px] font-[600] "
            id="Search"
          >
            Search By Locality, Projects or Listings
          </h3>
          <MainSearchMultiSelect type="project" />
          <h3
            className=" text-[#202020] mb-[1%] text-[14px] font-[600] "
            id="Project Status"
          >
            Project Status
          </h3>
          <div className="flex  mb-[3%] justify-start items-start gap-[4%]">
            {SEARCH_FILTER_DATA.projectstatus.map((eachStatus) => {
              return (
                <Radio
                  key={eachStatus.cid}
                  checked={eachStatus.cid == filters.current}
                  value={eachStatus.cid}
                  iconColor="dark.8"
                  color="green"
                  onChange={() => setStatus(eachStatus.cid)}
                  label={eachStatus.Label}
                  name="propertyStatus"
                  size={isMobile ? "xs" : "md"}
                />
              );
            })}
          </div>
          <h3
            className=" text-[#202020] mb-[1%] text-[14px] font-[600] "
            id="Locality"
          >
            Locality
          </h3>
          {filters.locality.length > 0 && (
            <div className="flex mb-[1%] justify-start items-start gap-[4%]">
              {filters.locality.map((eachLocality, index) => {
                return (
                  <div
                    key={eachLocality}
                    className="capitalize flex justify-center items-center pl-[2px] shadow-[0px_4px_10px_0px_rgba(202,233,255,0.30)]   border rounded-[5px] border-solid border-[#92B2C8]"
                  >
                    {eachLocality.split("+")[0]}
                    <span
                      className="cursor-pointer  "
                      onClick={() => remnoveSearchOptions(index, "locality")}
                    >
                      {miniItemsCrossIcon}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
          <MultiSelect
            classNames={{ pill: classes.pill }}
            label=""
            placeholder="Search Locality"
            data={data}
            searchable
            nothingFoundMessage={
              localitySearch !== ""
                ? "Nothing found..."
                : filters.locality.length < 1
                ? "Search something..."
                : ""
            }
            value={filters.locality}
            comboboxProps={{ withinPortal: false }}
            onChange={(value) => setFilters({ ...filters, locality: value })}
            leftSectionPointerEvents="none"
            leftSection={lensSvg}
            style={{ width: "50%" }}
            onSearchChange={(value) => setSearchLocality(value)}
            rightSection={<DropDownIcon />}
          />
          <h3
            className=" text-[#202020] mb-[1%] text-[14px] font-[600] mt-[3%] flex items-center gap-[5px] "
            id="Property Type"
          >
            Property Type{/*  {notificationIcon} */}
          </h3>
          <div className="flex  mb-[1%] justify-start items-start flex-wrap gap-[4%]">
            {propKeys.map((keyName) => {
              if (keyName === 32 && filters.unitTypes.length > 0) {
                return null;
              }
              return (
                <Radio
                  key={"Property_Type_" + keyName}
                  iconColor="dark.8"
                  color="green"
                  label={propertyDetailsTypes?.get(keyName)?.name}
                  value={propertyDetailsTypes?.get(keyName)?.id}
                  name="propertyType"
                  style={{ whiteSpace: "nowrap", marginBottom: "10px" }}
                  onClick={() =>
                    setPropTypes(
                      propertyDetailsTypes?.get(keyName)?.id as number
                    )
                  }
                  checked={
                    filters.propTypes === propertyDetailsTypes?.get(keyName)?.id
                  }
                  size={isMobile ? "xs" : "md"}
                />
              );
            })}
          </div>
          {filters.propTypes !== 32 && (
            <>
              <h3
                className=" text-[#202020] mb-[1%] text-[14px] font-[600] mt-[2%] "
                id="BHK Type"
              >
                BHK Type
              </h3>
              <div className="flex  mb-[3%] justify-start items-center  gap-[4%] flex-wrap ">
                {SEARCH_FILTER_DATA.bhkDetails.map((eachStatus) => {
                  return (
                    <Checkbox
                      className="my-2"
                      label={eachStatus.title}
                      color="green"
                      key={eachStatus.title}
                      onClick={() =>
                        handleCheckboxClick("unitTypes", eachStatus.value)
                      }
                      checked={filters.unitTypes.includes(eachStatus.value)}
                      size={isMobile ? "xs" : "md"}
                    />
                  );
                })}
              </div>
            </>
          )}
          <h3
            className=" text-[#202020] mb-[1%] text-[14px] font-[600] mt-[2%] "
            id="Area"
          >
            Area
          </h3>
          <p className="text-[#4D6677] text-[14px] md:text-[16px] font-[600] mb-[2%] ml-[14px] md:ml-0 ">
            {filters.areaValue[0]} sq.ft - {filters.areaValue[1]} sq.ft
          </p>
          {/*   <div className="mb-6">
              
              <h3
              className=" text-[#202020] mb-[1%] text-[14px] font-[600] mt-[5%] "
              id="Budget"
            >
              Budget
            </h3>
            <p className="text-[#4D6677] text-[14px] md:text-[16px] font-[600] mb-[2%] ml-[14px] md:ml-0  ">
              ₹ {toFormattedString(state.bugdetValue[0])} - ₹{" "}
              {toFormattedString(state.bugdetValue[1])}
            </p>
              <RangeSlider
              color="green"
              key="budgetSlider"
              onChange={(value) => toggleFilter("bugdetValue", value)}
              style={{ width: "80%" }}
              defaultValue={[
                state?.bugdetValue[0] ?? 500000,
                state?.bugdetValue[1] ?? 600000000,
              ]}
              value={state.bugdetValue}
              min={0}
              max={state.cg === "R" ? 100000 : 600000000}
              step={state.cg === "R" ? 1 : 100000}
              label={(value) => toFormattedString(value)}
              // size={isMobile ? "xs" : "md"}
              className="ml-[14px] md:ml-0 "
              // classNames={{markLabel: S.sliderMarkLable}}
            />
          </div> */}
          <RangeSlider
            color="green"
            marks={[
              { value: 0, label: "0 sq.ft" },
              { value: 1000, label: "1000 sq.ft" },
              { value: 2000, label: "2000 sq.ft" },
              { value: 3000, label: "3000 sq.ft" },
              { value: 4000, label: "4000 sq.ft" },
              { value: 5000, label: "5000 sq.ft" },
            ]}
            min={0}
            max={5000}
            value={filters.areaValue}
            onChange={(value) => handleSliderChange("areaValue", value)}
            style={{ width: "80%" }}
            size={isMobile ? "xs" : "md"}
            className="ml-[14px] md:ml-0 "
            classNames={{ markLabel: S.sliderMarkLable }}
          />
          <h3
            className=" text-[#202020] mb-[1%] text-[14px] font-[600] mt-[5%] "
            id="Budget"
          >
            Budget
          </h3>
          <p className="text-[#4D6677] text-[14px] md:text-[16px] font-[600] mb-[2%] ml-[14px] md:ml-0  ">
            ₹ {toFormattedString(filters.bugdetValue[0])} - ₹{" "}
            {toFormattedString(filters.bugdetValue[1])}
          </p>
          <RangeSlider
            color="green"
            key="budgetSlider"
            onChange={(value) => handleSliderChange("bugdetValue", value)}
            style={{ width: "80%" }}
            defaultValue={[
              filters?.bugdetValue[0] ?? 500000,
              filters?.bugdetValue[1] ?? 600000000,
            ]}
            value={filters.bugdetValue}
            min={0}
            max={filters.cg === "R" ? 100000 : 600000000}
            step={filters.cg === "R" ? 1 : 100000}
            label={(value) => toFormattedString(value)}
            size={isMobile ? "xs" : "md"}
            className="ml-[14px] md:ml-0 "
            classNames={{ markLabel: S.sliderMarkLable }}
          />
          {filters?.propTypes != projectprops.plot && (
            <React.Fragment>
              <h3
                className=" text-[#202020] mb-[1%] text-[14px] font-[600] mt-[2%] "
                id="Bath"
              >
                Number of Bathrooms
              </h3>
              <div className="flex md:mb-[3%] justify-start items-start gap-[4%] flex-wrap ">
                {[...Array(6)].map((x, i) => {
                  return (
                    <Checkbox
                      key={filters.bathRooms[i]}
                      label={`${i == 5 ? "5+" : i + 1} Bath`}
                      color="green"
                      onClick={() => handleCheckboxClick("bathRooms", i + 1)}
                      checked={filters.bathRooms.includes(i + 1)}
                      size={isMobile ? "xs" : "md"}
                      className="mb-[10px]"
                    />
                  );
                })}
              </div>
            </React.Fragment>
          )}
          <h3
            className=" text-[#202020] mb-[1%] text-[14px] font-[600] mt-[2%] "
            id="Amenities"
          >
            Amenities
          </h3>
          <div className="flex  mb-[3%] justify-start items-center gap-[4%] flex-wrap ">
            {SEARCH_FILTER_DATA.amenities.map((i) => {
              return (
                <Checkbox
                  className="my-2"
                  key={i.cid}
                  label={i.constDesc}
                  color="green"
                  onClick={() => handleCheckboxClick("amenities", i.cid)}
                  checked={filters.amenities.includes(i.cid)}
                  size={isMobile ? "xs" : "md"}
                />
              );
            })}
          </div>
          {filters?.propTypes != projectprops.plot && (
            <React.Fragment>
              <h3
                className=" text-[#202020] mb-[1%] text-[14px] font-[600] mt-[3%] "
                id="Parking"
              >
                Number of Parking
              </h3>
              <div className="flex  mb-[3%] justify-start items-start gap-[4%]  ">
                {[...Array(7)].map((x, i) => {
                  return (
                    <Checkbox
                      key={filters.parkings[i]}
                      label={`${i == 6 ? "+6" : i + 1}`}
                      color="green"
                      onClick={() => handleCheckboxClick("parkings", i + 1)}
                      checked={filters.parkings.includes(i + 1)}
                      size={isMobile ? "xs" : "md"}
                    />
                  );
                })}
              </div>
            </React.Fragment>
          )}
          <h3
            className=" text-[#202020] mb-[1%] text-[14px] font-[600] mt-[2%] "
            id="RERA"
          >
            RERA
          </h3>
          <div className="flex  mb-[3%] justify-start items-center gap-[4%] flex-wrap ">
            {SEARCH_FILTER_DATA.rerastatus.map((i) => {
              return (
                <Checkbox
                  className="my-2"
                  key={i.cid}
                  label={i.constDesc}
                  color="green"
                  onClick={() => handleCheckboxClick("reraVerified", i.cid)}
                  checked={filters.reraVerified?.includes(i.cid)}
                  size={isMobile ? "xs" : "md"}
                />
              );
            })}
          </div>
          {/* <h3 className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[3%] ">
            Listed By
          </h3>
          <div className="flex  mb-[3%] justify-start items-start gap-[4%]">
            <Checkbox label="Builder" color="green" />
            <Checkbox label="Agent" color="green" />
            <Checkbox label="Owner" color="green" />
          </div> */}
          <h3
            className=" text-[#202020] mb-[1%] text-[14px] font-[600] "
            id="Builder"
          >
            Builder
          </h3>
          {filters.builderIds.length > 0 && (
            <div className="flex  mb-[3%] justify-start items-start gap-[4%]">
              {filters.builderIds?.map((eachLocality, index) => {
                return (
                  <div
                    key={eachLocality}
                    className="flex justify-center items-center text-[12px] sm:text-[16px]  p-[1%] rounded-[10px] border-[#92B2C8] border-solid border-[1px]  "
                  >
                    {eachLocality.split("+")[0]}
                    <span
                      className="cursor-pointer"
                      onClick={() => remnoveSearchOptions(index, "builderIds")}
                    >
                      {miniItemsCrossIcon}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
          <MultiSelect
            classNames={{ pill: classes.pill }}
            label=""
            placeholder="Search Builder"
            data={builderData || []}
            searchable
            nothingFoundMessage={
              builderDataLoading
                ? "Loading..."
                : filters.builderIds.length > 0
                ? ""
                : "Search Something..."
            }
            value={filters.builderIds}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, builderIds: value }))
            }
            leftSectionPointerEvents="none"
            leftSection={lensSvg}
            style={{ width: "50%" }}
            comboboxProps={{ withinPortal: false }}
            onSearchChange={(value) => setBuilderSearch(value)}
            pb={50}
            rightSection={<DropDownIcon />}
            size={isMobile ? "xs" : "md"}
          />
        </ScrollArea>
      </div>
    </div>
  );
};

export { FilterPopup };
