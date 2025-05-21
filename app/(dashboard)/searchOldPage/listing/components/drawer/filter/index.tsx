"use client";
import React, { useRef, useState } from "react";
import { ListingSearchDetails } from "@/app/data/searchDetails";
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
import { useQuery } from "react-query";
import { getData } from "@/app/utils/api/search";
import ClearAll from "../../ClearAll";
import Heading from "./Heading";
import { usePathname } from "next/navigation";
import { formatBudgetValue } from "@/app/(dashboard)/searchOldPage/components/buget";
import { toFormattedString } from "@/app/(dashboard)/searchOldPage/components/buget/budget";
import { useAtomValue } from "jotai";
import { serverCityAtom } from "@/app/store/search/serverCity";

// const styles = {
//   heading: "",
// };
const ListingMobileFilter = ({ close }: any) => {
  const [current, setCurrent] = useState("Project Status");
  const propKeys = [35, 33, 31, 34, 32];
  const [localitySearch, setSearchLocality] = useDebouncedState("w", 500);
  const [builderSearch, setBuilderSearch] = useDebouncedState("w", 500);
  const {
    filters,
    handleCheckboxClick,
    setPropTypes,
    setStatus,
    // handleBooleanCheck,
    handleSliderChange,
    setFilters,
    remnoveSearchOptions,
    setSingleType,
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

  const path = usePathname();
  const viewport = useRef<HTMLDivElement>(null);
  // const isMobile = useMediaQuery("(max-width: 601px)");

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
      ? ListingSearchDetails.filter(
          (item) => !["Parking", "Unit Type", "Bath"].includes(item)
        )
      : ListingSearchDetails;
  return (
    <div className=" flex justify-start items-start top-[160px] w-full sm:left-[70%]">
      <div className="w-[100%] hidden sm:flex shadow-md justify-start items-center flex-col ">
        <p className=" text-[#000] text-nowrap xl:text-[14px] bg-[#F4F4F4] flex justify-start px-6  items-center font-[500] py-[3.5%] w-full ">
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
          className="w-full pt-[1%] pl-[2%]    "
          viewportRef={viewport}
          miw={"full"}
          /* p={20} */
        >
          {filters?.propTypes != projectprops.plot && (
            <React.Fragment>
              <h3
                className=" text-[#202020] mb-[2%] text-[14px] font-[600] mt-[1%] "
                id="Bhk"
              >
                BHK
              </h3>
              <div className="flex  mb-[3%] justify-start items-start gap-[4%] flex-wrap">
                {SEARCH_FILTER_DATA.bhkDetails.map((eachStatus) => {
                  return (
                    <Checkbox
                      label={eachStatus.title}
                      color="green"
                      key={eachStatus.title}
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
          <Heading
            className=" text-[#202020] mb-[4%] text-[14px] font-[600] "
            id="Project Status"
            text="Property Status"
          />
          <div className="flex  mb-[3%] justify-start items-start gap-[4%] flex-wrap ">
            {SEARCH_FILTER_DATA.projectstatus.map((eachStatus, index) => {
              return (
                <Radio
                  id={`propertyStatus_${index}`}
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
            className=" text-[#202020] mb-[4%] text-[14px] font-[600] mt-[6%] flex items-center gap-[5px] "
            id="Property Type"
          >
            Property Type {/* {notificationIcon} */}
          </h3>
          <div className="flex  mb-[3%] justify-start items-start flex-wrap gap-[4%]">
            {propKeys.map((keyName, i) => {
              if (keyName === 32 && filters.unitTypes.length > 0) {
                return null;
              }
              return (
                <Radio
                  id={`propTypeRadio_${i}`}
                  key={"dark.8" + keyName}
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
          <h3
            className=" text-[#202020] mb-[2%] text-[14px] font-[600] mt-[3%] flex items-center gap-[5px] "
            id="Posted By"
          >
            Listed By
          </h3>
          <div className="flex mb-[3%] justify-start items-start flex-wrap gap-[4%]">
            {SEARCH_FILTER_DATA.listedBy
              .filter(({ value }) => !(value === "B" && path === "/search"))
              .map(({ value, constDesc }) => (
                <Radio
                  id={`listedByRadio_${value}`}
                  key={`listedBy_${constDesc}`}
                  iconColor="dark.8"
                  color="green"
                  label={constDesc}
                  value={value}
                  name="listedBy"
                  style={{ whiteSpace: "nowrap", marginBottom: "10px" }}
                  onClick={() => setSingleType("listedBy", value)}
                  checked={filters.listedBy == value}
                />
              ))}
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
                    className="capitalize flex justify-center items-center text-[12px] sm:text-[16px] sm:p-[1%]   shadow-[0px_4px_10px_0px_rgba(202,233,255,0.30)]   border rounded-[5px] border-solid border-[#92B2C8]"
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

          {filters?.propTypes != projectprops.plot && (
            <React.Fragment>
              <h3
                className=" text-[#202020] mb-[2%] text-[14px] font-[600] mt-[5%] "
                id="Facing"
              >
                Facing
              </h3>
              <div className="flex  mb-[3%] justify-start items-start gap-[4%] flex-wrap">
                {SEARCH_FILTER_DATA.facing.map((x) => {
                  return (
                    <Checkbox
                      key={`facings_${x.constDesc}`}
                      label={x.constDesc}
                      color="green"
                      onClick={() => handleCheckboxClick("facings", x.cid + 1)}
                      checked={filters.facings.includes(x.cid + 1)}
                      mb={10}
                    />
                  );
                })}
              </div>
            </React.Fragment>
          )}
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
                      key={x}
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
            className=" text-[#202020] mb-[4%] text-[14px] font-[500] mt-[5%] "
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
            style={{ width: "99%" }}
            defaultValue={[
              filters?.bugdetValue?.[0] ?? 0.05,
              filters?.bugdetValue?.[1] ?? 60,
            ]}
            label={formatBudgetValue}
          />
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
            style={{ width: "99%" }}
            classNames={{
              markLabel: classes.markLabel,
            }}
          />
          <h3
            className=" text-[#202020] mb-[2%] text-[14px] font-[600] mt-[3%] flex items-center gap-[5px] "
            id="Photos & Videos"
          >
            Photos & Videos
          </h3>
          <div className="flex  mb-[3%] justify-start items-start flex-wrap gap-[4%] ">
            {SEARCH_FILTER_DATA.photoAvail.map(({ title, value }) => {
              return (
                <Radio
                  id={`mediaRadio_${value}`}
                  key={title}
                  iconColor="dark.8"
                  color="green"
                  label={title}
                  value={value}
                  name="propertyType"
                  style={{ whiteSpace: "nowrap", marginBottom: "10px" }}
                  // onClick={() =>
                  //   setPropTypes(
                  //     propertyDetailsTypes?.get(keyName)?.id as number
                  //   )
                  // }
                  // checked={
                  //   filters.propTypes === propertyDetailsTypes?.get(keyName)?.id
                  // }
                />
              );
            })}
          </div>
          <React.Fragment>
            <h3
              className=" text-[#202020] mb-[2%] text-[14px] font-[600] mt-[5%] "
              id="Furnishing"
            >
              Furnishing
            </h3>
            <div className="flex  mb-[3%] justify-start items-start gap-[4%] flex-wrap">
              {SEARCH_FILTER_DATA.furnish.map(({ constDesc, cid }) => {
                return (
                  <Radio
                    id={`furnishRadio_${cid}`}
                    key={`furnish_${cid}`}
                    iconColor="dark.8"
                    color="green"
                    label={constDesc}
                    value={cid}
                    name="furnish"
                    style={{ whiteSpace: "nowrap", marginBottom: "10px" }}
                    onClick={() => setSingleType("furnish", cid)}
                    checked={filters.furnish === cid}
                  />
                );
              })}
            </div>
          </React.Fragment>
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
                      key={"parkings_" + filters.parkings[i]}
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
                    className="flex justify-center items-center p-[1%] rounded-[10px] border-[#92B2C8] border-solid border-[1px]  "
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

export { ListingMobileFilter };
