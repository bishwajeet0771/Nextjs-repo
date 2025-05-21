"use client";
import React, { useRef, useState } from "react";
import { searchDetails } from "@/app/data/searchDetails";
import Button from "@/app/elements/button";
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
import { SEARCH_FILTER_DATA } from "@/app/data/search";
import useSearchFilters from "@/app/hooks/search";
import { useDebouncedState } from "@mantine/hooks";
// import useSearch from "@/app/hooks/search/useSearch";
import { useQuery } from "react-query";
import { getData } from "@/app/utils/api/search";
import ClearAll from "../../ClearAll";
// import Close from "@/app/components/project/button/close";
import { formatBudgetValue } from "../../buget";
import useQsearch from "@/app/hooks/search/useQsearch";
import { toFormattedString } from "../../buget/budget";
import { useAtomValue } from "jotai";
import { serverCityAtom } from "@/app/store/search/serverCity";

const MobileFilter = ({ close }: any) => {
  const [current, setCurrent] = useState("Project Status");
  const propKeys = [35, 33, 31, 34, 32];
  const [localitySearch, setSearchLocality] = useDebouncedState("w", 500);
  const [builderSearch, setBuilderSearch] = useDebouncedState("w", 500);
  const {
    data: searchData,
    onSearchChange,
    name,

    // isLoading,
    // handleResetQuery,
    // debounced,
  } = useQsearch();
  const {
    localities,
    builders,
    // cities,
    projects,
    listing: listings,
    projectListing,
  } = searchData;
  const {
    filters,
    handleCheckboxClick,
    setPropTypes,
    setStatus,
    // handleBooleanCheck,
    handleSliderChange,
    setFilters,
    remnoveSearchOptions,
    isFilterApplied,
  } = useSearchFilters();
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
    <div className=" flex justify-start items-start w-full sm:left-[70%]">
      <div className="w-[100%] hidden sm:flex shadow-md justify-start items-center flex-col ">
        <p className=" text-[#000] text-nowrap text-[14px] bg-[#F4F4F4] flex justify-start px-6  items-center font-[500] py-[3.5%] w-full ">
          Quick Filters
        </p>
        <div className="w-full ">
          {filteredSearchDetails.map((eachItem) => {
            return (
              <Button
                key={eachItem}
                title={eachItem}
                onChange={() => scrollWhereIsSelected(eachItem)}
                buttonClass={` whitespace-nowrap w-full text-[12px] flex flex-row-reverse  justify-end pl-[10%] items-center border-solid border-b-[0.5px] items-start  px-4 py-4 h-[31px] gap-[8px] ${
                  current == eachItem
                    ? "text-[#148B16] bg-[#F1F9FF] font-[700]"
                    : "text-[#202020] bg-[#FCFCFC] font-[500]"
                } `}
                icon={
                  current == eachItem || isFilterApplied(eachItem)
                    ? fourStarIcon
                    : ""
                }
              />
            );
          })}
        </div>
      </div>
      <div className="w-full min-w-full">
        <ClearAll type="all" close={close} />
        {/* Right Side Fields Con */}
        <ScrollArea
          h={"80vh"}
          className="w-full pt-[1%] sm:pl-[2%]"
          viewportRef={viewport}
          miw={"full"}
          p={20}
        >
          <h3
            className=" text-[#202020] mb-[4%] text-[14px] font-[600] "
            id="Project Status"
          >
            Search By Locality, Projects or Listings
          </h3>
          <MultiSelect
            searchable
            placeholder="Search"
            data={[
              {
                group: "Locality",
                items:
                  localities?.map((item: any, i: number) => {
                    return { value: `${item.id}+${i}`, label: item.name };
                  }) ?? [],
              },
              {
                group: "Projects",
                items:
                  projects?.map((item: any, i: number) => {
                    return { value: `${item.id}+${i}`, label: item.name };
                  }) ?? [],
              },
              {
                group: "Listings",
                items:
                  listings?.map((item: any, i: number) => {
                    return { value: `${item.id}+${i}`, label: item.name };
                  }) ?? [],
              },
              {
                group: "Project Listings",
                items:
                  projectListing?.map((item: any) => {
                    return {
                      value: `${item.id}+${item.type}`,
                      label: item.name,
                    };
                  }) ?? [],
              },
              {
                group: "Builders",
                items:
                  builders?.map((item: any, i: number) => {
                    return { value: `${item.id}+${i}`, label: item.name };
                  }) ?? [],
              },
            ]}
            onSearchChange={(e) => onSearchChange(e)}
            onChange={() => alert("workign")}
            searchValue={name ?? ""}
            mb={"10px"}
            withScrollArea={false}
            styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
          />
          <h3
            className=" text-[#202020] mb-[4%] text-[14px] font-[600] "
            id="Project Status"
          >
            Property Status
          </h3>
          <div className="flex  mb-[3%] justify-start items-start gap-[4%] flex-wrap ">
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
                  style={{ whiteSpace: "nowrap", marginBottom: "10px" }}
                />
              );
            })}
          </div>

          <h3
            className=" text-[#202020] mb-[4%] text-[14px] font-[600] "
            id="Locality"
          >
            Locality
          </h3>

          {filters.locality.length > 0 && (
            <div className="flex mb-[3%] justify-start items-start gap-[4%] flex-wrap">
              {filters.locality.map((eachLocality, index) => {
                return (
                  <div
                    key={eachLocality}
                    className="capitalize flex justify-center items-center text-[12px] sm:text-[16px] sm:p-[1%]  shadow-[0px_4px_10px_0px_rgba(202,233,255,0.30)]   border rounded-[5px] border-solid border-[#92B2C8]"
                  >
                    {eachLocality.split("+")[0]}
                    <span
                      className="cursor-pointer "
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
              localitySearch !== "" ? "Nothing found..." : "Search somehitng..."
            }
            value={filters.locality}
            comboboxProps={{ withinPortal: false }}
            onChange={(value) => setFilters({ ...filters, locality: value })}
            leftSectionPointerEvents="none"
            leftSection={lensSvg}
            style={{ width: "80%" }}
            onSearchChange={(value) => setSearchLocality(value)}
            rightSection={<DropDownIcon />}
          />

          <h3
            className=" text-[#202020] mb-[4%] text-[14px] font-[600] mt-[6%] flex items-center gap-[5px] "
            id="Property Type"
          >
            Property Type {/* {notificationIcon} */}
          </h3>
          <div className="flex  mb-[3%] justify-start items-start flex-wrap gap-[4%]">
            {propKeys.map((keyName) => {
              if (keyName === 32 && filters.unitTypes.length > 0) {
                return null;
              }
              return (
                <Radio
                  key={keyName}
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
                />
              );
            })}
          </div>

          {filters?.propTypes != projectprops.plot && (
            <React.Fragment>
              <h3
                className=" text-[#202020] mb-[4%] text-[14px] font-[600] mt-[3%] "
                id="Unit Type"
              >
                BHK Type
              </h3>
              <div className="flex  mb-[3%] justify-start items-start gap-[4%] flex-wrap">
                {SEARCH_FILTER_DATA.bhkDetails.map((eachStatus, index) => {
                  return (
                    <Checkbox
                      label={eachStatus.title}
                      color="green"
                      key={filters.unitTypes[index]}
                      onClick={() =>
                        handleCheckboxClick("unitTypes", eachStatus.value)
                      }
                      checked={filters.unitTypes.includes(eachStatus.value)}
                      style={{ whiteSpace: "nowrap", marginBottom: "10px" }}
                    />
                  );
                })}
              </div>
            </React.Fragment>
          )}

          <h3
            className=" text-[#202020] mb-[4%] text-[14px] font-[600] mt-[3%] "
            id="Area"
          >
            Area
          </h3>
          <p className="text-[#4D6677] text-[16px] font-[600] mb-[4%] ">
            {filters.areaValue[0]} sq.ft - {filters.areaValue[1]} sq.ft
          </p>
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
            style={{ width: "100%" }}
            classNames={{
              markLabel: classes.markLabel,
            }}
          />

          <h3
            className=" text-[#202020] mb-[4%] text-[14px] font-[600] mt-[5%] "
            id="Budget"
          >
            Budget
          </h3>
          <p className="text-[#4D6677] text-[16px] font-[600] mb-[4%] ">
            ₹ {toFormattedString(filters.bugdetValue[0])} - ₹{" "}
            {toFormattedString(filters.bugdetValue[1])} Cr
          </p>
          <RangeSlider
            color="green"
            key="budgetSlider"
            minRange={0}
            min={0}
            max={60}
            step={0.05}
            onChange={(value) => handleSliderChange("bugdetValue", value)}
            style={{ width: "100%" }}
            defaultValue={[
              filters?.bugdetValue?.[0] ?? 0.05,
              filters?.bugdetValue?.[1] ?? 60,
            ]}
            label={formatBudgetValue}
          />

          {filters?.propTypes != projectprops.plot && (
            <React.Fragment>
              <h3
                className=" text-[#202020] mb-[4%] text-[14px] font-[600] mt-[5%] "
                id="Bath"
              >
                Bath
              </h3>
              <div className="flex  mb-[3%] justify-start items-start gap-[4%] flex-wrap">
                {[...Array(6)].map((x, i) => {
                  return (
                    <Checkbox
                      key={filters.bathRooms[i]}
                      label={`${i == 5 ? "5+" : i + 1} Bath`}
                      color="green"
                      onClick={() => handleCheckboxClick("bathRooms", i + 1)}
                      checked={filters.bathRooms.includes(i + 1)}
                      style={{ whiteSpace: "nowrap", marginBottom: "10px" }}
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
                />
              );
            })}
          </div>

          {filters?.propTypes != projectprops.plot && (
            <React.Fragment>
              <h3
                className=" text-[#202020] mb-[4%] text-[14px] font-[600] mt-[5%] "
                id="Parking"
              >
                Parking
              </h3>
              <div className="flex  mb-[3%] justify-start items-start gap-[4%] flex-wrap">
                {[...Array(7)].map((x, i) => {
                  return (
                    <Checkbox
                      key={filters.parkings[i]}
                      label={`${i == 6 ? "+6" : i + 1}`}
                      color="green"
                      onClick={() => handleCheckboxClick("parkings", i + 1)}
                      checked={filters.parkings.includes(i + 1)}
                      style={{ whiteSpace: "nowrap", marginBottom: "10px" }}
                    />
                  );
                })}
              </div>
            </React.Fragment>
          )}

          <h3
            className=" text-[#202020] mb-[4%] text-[14px] font-[600] mt-[3%] "
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
                />
              );
            })}
          </div>

          {/* <h3 className=" text-[#202020] mb-[4%] text-[14px] font-[500] mt-[3%] ">
            Listed By
          </h3>
          <div className="flex  mb-[3%] justify-start items-start gap-[4%]">
            <Checkbox label="Builder" color="green" />
            <Checkbox label="Agent" color="green" />
            <Checkbox label="Owner" color="green" />
          </div> */}

          <h3
            className=" text-[#202020] mb-[4%] text-[14px] font-[600] mt-[6%]"
            id="Builder"
          >
            Builder
          </h3>
          {filters.builderIds.length > 0 && (
            <div className="flex  mb-[3%] justify-start items-start gap-[4%] flex-wrap">
              {filters.builderIds.map((eachLocality, index) => {
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
              builderDataLoading ? "Loading..." : "Nothing found..."
            }
            value={filters.builderIds}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, builderIds: value }))
            }
            leftSectionPointerEvents="none"
            leftSection={lensSvg}
            style={{ width: "80%" }}
            comboboxProps={{ withinPortal: false }}
            onSearchChange={(value) => setBuilderSearch(value)}
            pb={50}
            rightSection={<DropDownIcon />}
          />
        </ScrollArea>
      </div>
    </div>
  );
};

export { MobileFilter };
