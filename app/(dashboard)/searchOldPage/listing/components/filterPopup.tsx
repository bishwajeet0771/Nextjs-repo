"use client";
import React, { useRef, useState } from "react";
import { ListingSearchDetails } from "@/app/data/searchDetails";
import Button from "@/app/elements/button";
import {
  DropDownIcon,
  fourStarIcon,
  lensSvg,
  miniItemsCrossIcon,
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
import { useDebouncedState } from "@mantine/hooks";
import { useQuery } from "react-query";
import { getData } from "@/app/utils/api/search";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { toFormattedString } from "../../components/buget/budget";
import { MainSearchMultiSelect } from "../../components/_ui/MultiselectListings";
import FurnishOptions from "./filterSection/Furnish";
import { useAtomValue } from "jotai";
import { serverCityAtom } from "@/app/store/search/serverCity";

const FilterPopup = ({ close }: { close: () => void }) => {
  const path = usePathname();
  const [current, setCurrent] = useState("Bhk");
  const propKeys = [35, 33, 31, 34, 32, 36];
  const [localitySearch, setSearchLocality] = useDebouncedState("", 500);
  const serverCity = useAtomValue(serverCityAtom);
  const { data } = useQuery({
    queryFn: () =>
      getData(localitySearch, "loc", filters.city ?? serverCity ?? ""),
    queryKey: ["search" + "loc" + localitySearch],
    enabled: localitySearch !== "",
  });

  const {
    filters,
    handleCheckboxClick,
    setPropTypes,
    handleSliderChange,
    setFilters,
    remnoveSearchOptions,
    setSingleType,
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
      ? ListingSearchDetails.filter(
          (item) => !["Parking", "Unit Type", "Bath"].includes(item)
        )
      : ListingSearchDetails;
  return (
    <div className=" flex justify-start items-start w-[70vw] top-[160px] left-[70%]">
      <div className="w-[20%] flex shadow-md justify-start items-center flex-col ">
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
      <div className="w-full">
        <ClearAll type="prjectsearchlisting" close={close} />
        {/* Right Side Fields Con */}
        <ScrollArea
          h={400}
          miw={"full"}
          className="w-full pt-[1%] sm:pl-[2%]    "
          viewportRef={viewport}
        >
          <h3
            className=" text-[#202020] mb-[1%] text-[14px] font-[600] "
            id="Search"
          >
            Search By Locality, Projects or Listings
          </h3>
          <MainSearchMultiSelect type="listing" />
          {filters?.propTypes != projectprops.plot && (
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
                    />
                  );
                })}
              </div>
            </>
          )}
          <h3
            className=" text-[#202020] mb-[1%] text-[14px] font-[600] mt-[2%] "
            id="Property Status"
          >
            Property Status
          </h3>
          <div className="flex  mb-[3%] justify-start items-start gap-[4%]">
            {SEARCH_FILTER_DATA.listingStatus.map((eachStatus) => {
              return (
                <Radio
                  key={eachStatus.cid}
                  checked={eachStatus.cid == filters.propStatus}
                  value={eachStatus.cid}
                  iconColor="dark.8"
                  color="green"
                  onChange={() => setSingleType("propStatus", eachStatus.cid)}
                  label={eachStatus.Label}
                  name="propertyStatus"
                />
              );
            })}
          </div>
          <h3
            className=" text-[#202020] mb-[1%] text-[14px] font-[600] mt-[2%] "
            id="Property Type"
          >
            Property Type {/* {notificationIcon} */}
          </h3>
          <div className="flex  mb-[3%] justify-start items-center  gap-[4%] flex-wrap ">
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
          <h3
            className=" text-[#202020] mb-[1%] text-[14px] font-[600] mt-[2%] "
            id="Posted By"
          >
            Posted By
          </h3>
          <div
            className="flex  mb-[3%] justify-start items-start flex-wrap gap-[4%]"
            key={"listedBy"}
          >
            {SEARCH_FILTER_DATA.listedBy
              .filter(({ value }) => !(value === "B" && path === "/search"))
              .map(({ value, constDesc }) => (
                <Radio
                  key={constDesc}
                  iconColor="dark.8"
                  color="green"
                  label={constDesc}
                  value={value}
                  name="listedBy"
                  style={{ whiteSpace: "nowrap", marginBottom: "10px" }}
                  onClick={() => setSingleType("listedBy", value)}
                  checked={filters.listedBy === value}
                />
              ))}
          </div>

          <h3
            className=" text-[#202020] mb-[1%] text-[14px] font-[600] mt-[2%] "
            id="Locality"
          >
            Locality
          </h3>

          {filters.locality.length > 0 && (
            <div className="flex mb-[3%] justify-start items-start gap-[4%]">
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
              localitySearch !== "" ? "Nothing found..." : "Search something..."
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

          {filters?.propTypes != projectprops.plot && (
            <React.Fragment>
              <h3
                className=" text-[#202020] mb-[1%] text-[14px] font-[600] mt-[2%] "
                id="Facing"
              >
                Facing
              </h3>
              <div className="flex  mb-[3%] justify-start items-center  gap-[4%] flex-wrap ">
                {SEARCH_FILTER_DATA.facing.map((x) => {
                  return (
                    <Checkbox
                      className="my-1"
                      key={x.constDesc}
                      label={x.constDesc}
                      color="green"
                      onClick={() => handleCheckboxClick("facings", x.cid)}
                      checked={filters.facings.includes(x.cid)}
                    />
                  );
                })}
              </div>
            </React.Fragment>
          )}

          {filters?.propTypes != projectprops.plot && (
            <React.Fragment>
              <h3
                className=" text-[#202020] mb-[1%] text-[14px] font-[600] mt-[2%] "
                id="No.of.Bathrooms"
              >
                No.of.Bathrooms
              </h3>
              <div className="flex  mb-[3%] justify-start items-start gap-[4%]">
                {[...Array(6)].map((x, i) => {
                  return (
                    <Checkbox
                      key={filters.bathRooms[i]}
                      label={`${i == 5 ? "5+" : i + 1} Bath`}
                      color="green"
                      onClick={() => handleCheckboxClick("bathRooms", i + 1)}
                      checked={filters.bathRooms.includes(i + 1)}
                    />
                  );
                })}
              </div>
            </React.Fragment>
          )}
          <h3
            className=" text-[#202020] mb-[1%] text-[14px] font-[600] mt-[2%] "
            id="Budget (In Rupees)"
          >
            Budget (In Rupees)
          </h3>
          <p className="text-[#4D6677] text-[16px] font-[600] mb-[2%] ">
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
          />
          <h3
            className=" text-[#202020] mb-[1%] text-[14px] font-[600] mt-[2%] "
            id="Area (in Sq.ft)"
          >
            Area (In Sq.ft)
          </h3>
          <p className="text-[#4D6677] text-[16px] font-[600] mb-[2%] ">
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
            style={{ width: "80%" }}
            mb={"5%"}
          />

          <h3
            className=" text-[#202020] mb-[1%] text-[14px] font-[600] mt-[2%] "
            id="Photos & Videos"
          >
            Photos & Videos
          </h3>
          <div className="flex  mb-[3%] justify-start items-start flex-wrap gap-[4%]">
            {SEARCH_FILTER_DATA.photoAvail.map(({ value, title }) => {
              return (
                <Radio
                  key={value}
                  iconColor="dark.8"
                  color="green"
                  label={title}
                  value={value}
                  name="photo"
                  style={{ whiteSpace: "nowrap", marginBottom: "10px" }}
                  onClick={() => setSingleType("pnb", value)}
                  checked={filters.pnb === value}
                />
              );
            })}
          </div>
          <FurnishOptions />
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
          {/*      <div className="flex  mb-[3%] justify-start items-start gap-[4%]">
          </div> */}

          {filters?.propTypes != projectprops.plot && (
            <React.Fragment>
              <h3
                className=" text-[#202020] mb-[1%] text-[14px] font-[600] mt-[2%] "
                id="No.of.Parkings"
              >
                No.of.Parkings
              </h3>
              <div className="flex  mb-[3%] justify-start items-start gap-[4%]">
                {[...Array(7)].map((x, i) => {
                  return (
                    <Checkbox
                      key={filters.parkings[i]}
                      label={`${i == 6 ? "+6" : i + 1}`}
                      color="green"
                      onClick={() => handleCheckboxClick("parkings", i + 1)}
                      checked={filters.parkings.includes(i + 1)}
                    />
                  );
                })}
              </div>
            </React.Fragment>
          )}

          {/* <h3
            className=" text-[#202020] mb-[1%] text-[14px] font-[600] mt-[2%] "
            id="Used or Not Used"
          >
            Used or Not Used
          </h3>
          <div className="flex  mb-[3%] justify-start items-start flex-wrap gap-[4%]">
            {SEARCH_FILTER_DATA.UsedorNotUsed.map(({ value, title }) => {
              return (
                <Radio
                  id={`used_${value}`}
                  key={value}
                  iconColor="dark.8"
                  color="green"
                  label={title}
                  value={value}
                  name="photo"
                  style={{ whiteSpace: "nowrap", marginBottom: "10px" }}
                  onClick={() => setSingleType("pnb", value)}
                  checked={filters.IS === value}
                />
              );
            })}
          </div> */}
        </ScrollArea>
      </div>
    </div>
  );
};

export { FilterPopup };
