import React from "react";
import Link from "next/link";
import {
  // MultiSelect,
  Pill,
  // PillGroup,
  PillsInput,
  // RangeSlider,
  Select,
  em,
} from "@mantine/core";
import classes from "@/app/styles/search.module.css";
import useSearchFilters from "@/app/hooks/search";
import { DropDownIcon, SearchIcon } from "@/app/images/commonSvgs";
import useQsearch from "@/app/hooks/search/useQsearch";
import Results from "./results";
import { useMediaQuery } from "@mantine/hooks";
import { DynamicText } from "../../utils/text";

const SearchDrawerHeader = ({
  // open,
  close,
  setShowAllLocalities,
  showAllLocalities,
}: any) => {
  const { onSearchChange, debounced, name } = useQsearch();
  const isTab = useMediaQuery("(max-width: 1600px)");
  const {
    filters,
    handleAppliedFilters,
    remnoveSearchOptions,
    // setFilters,
    setSingleType,
  } = useSearchFilters();
  const isMobile = useMediaQuery(em("max-width: 768px"));

  return (
    <div className="sm:m-[2%] w-full flex  sm:pl-[2%] gap-[20px] justify-start   relative flex-wrap">
      <p className="text-[16px] text-[#737579] font-[500] mt-3">
        <span className="text-[14px] md:text-[16px] text-[#4D6677] font-[600] cursor-pointer">
          Home
        </span>{" "}
        {" > "}
        <Link href={"/project/banglore"} prefetch={false}>
          <span className="text-[14px] md:text-[16px] text-[#4D6677] font-[600] cursor-pointer">
            {DynamicText({
              cg: filters.cg as string,
              listedBy: filters.listedBy,
              city: filters.city as string,
            })}
          </span>
        </Link>{" "}
      </p>
      <div className="w-[100%] md:w-[789px] h-auto  shrink-0 border-[#A0D7FF] rounded-[20px] border-[1px] border-solid ">
        {/*  <div className="  gap-[8px] px-[8px] border-[1px] border-solid flex items-center justify-between ">
          <div className="gap-[8px]  flex items-center w-[100%] min-h-fit">
            {" "}
            <Select
              label=""
              placeholder="Select"
              data={["Buy", "Rent"]}
              classNames={{ input: classes.wrapperSelect }}
              defaultValue={"Buy"}
              rightSection={<DropDownIcon />}
              size="xs"
            />
            <PillsInput classNames={{ input: classes.homePageSearch }}>
              <PillGroup>
                {filters.city && (
                  <Pill
                    withRemoveButton
                    classNames={{ root: classes.MultiSelectionPill }}
                    onRemove={() => {
                      setFilters((prev) => ({ ...prev, city: null }));
                      handleAppliedFilters();
                    }}
                    removeButtonProps={{
                      style: {
                        color: "red",
                      },
                    }}
                  >
                    {filters.city.split("+")[0]}
                  </Pill>
                )}
                {filters.locality?.map(
                  (each, index) =>
                    (showAllLocalities || index < (isTab ? 1 : 2)) && (
                      <Pill
                        onRemove={() => remnoveSearchOptions(each, "locality")}
                        key={index}
                        withRemoveButton
                        classNames={{ root: classes.MultiSelectionPill }}
                        removeButtonProps={{
                          style: {
                            color: "red",
                          },
                        }}
                      >
                        {each.split("+")[0]}
                      </Pill>
                    )
                )}
                {filters.locality?.length > (isTab ? 1 : 2) &&
                  !showAllLocalities && (
                    <Pill
                      className="capitalize"
                      classNames={{ root: classes.MultiSelectionPill }}
                      onClick={() => setShowAllLocalities(true)}
                    >
                      {`+${filters.locality?.length - (isTab ? 1 : 2)} More`}
                    </Pill>
                  )}
                {showAllLocalities && (
                  <Pill
                    className="capitalize"
                    classNames={{ root: classes.MultiSelectionPill }}
                    onClick={() => setShowAllLocalities(false)}
                  >
                    Show Less
                  </Pill>
                )}

                <PillsInput.Field
                  placeholder={
                    filters.locality.length > 0
                      ? "Add More"
                      : "Enter City,Locality & Project"
                  }
                  value={name ?? ""}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </PillGroup>
            </PillsInput>
          </div>

          <button
            className="flex justify-center items-center gap-2.5 px-2 md:px-4 py-2 rounded-[9.29px] bg-[#0073c6] text-xs md:text-base not-italic font-bold text-white"
            onClick={() => handleAppliedFilters(close)}
          >
            {isMobile ? <SearchIcon /> : "Search"}
          </button>
        </div> */}
        <div className="  p-2 gap-2 xl:gap-[8px] pl-2 xl:pl-[8px]  flex items-center justify-start  flex-wrap">
          {" "}
          {filters.listedBy !== "proj" && filters.listedBy != null && (
            <Select
              placeholder="Select"
              data={[
                { label: "Buy", value: "S" },
                { label: "Rent", value: "R" },
              ]}
              classNames={{
                input: classes.wrapperSelect,
                option: classes.buyrentoptions,
              }}
              onChange={(value) => setSingleType("cg", value ?? "S")}
              value={filters.cg ?? "S"}
              rightSection={<DropDownIcon />}
              size="xs"
            />
          )}
          <div className="flex flex-wrap gap-2 items-center h-auto">
            {filters.locality?.map(
              (each, index) =>
                (showAllLocalities || index < (isTab ? 1 : 2)) && (
                  <Pill
                    onRemove={() => {
                      remnoveSearchOptions(each, "locality");
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
            {filters.locality?.length > (isTab ? 1 : 2) &&
              !showAllLocalities && (
                <Pill
                  className="capitalize"
                  classNames={{ root: classes.MultiSelectionPill }}
                  onClick={() => setShowAllLocalities(true)}
                >
                  {`+${filters.locality?.length - (isTab ? 1 : 2)} More`}
                </Pill>
              )}

            {showAllLocalities && (
              <Pill
                className="capitalize"
                classNames={{ root: classes.MultiSelectionPill }}
                onClick={() => setShowAllLocalities(false)}
              >
                Show Less
              </Pill>
            )}
          </div>
          <PillsInput.Field
            placeholder={
              filters.locality.length > 0
                ? "Add More"
                : "Enter Locality, Project"
            }
            value={name ?? ""}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <button
            className="flex  justify-center items-center gap-2.5 px-2 md:px-4 py-2 rounded-[9.29px] bg-[#0073c6] text-xs md:text-base not-italic font-bold text-white"
            onClick={() => handleAppliedFilters(close)}
          >
            {isMobile ? <SearchIcon /> : "Search"}
          </button>
        </div>

        {debounced && <Results />}
      </div>
      <CloseSvg onClick={() => close()} />
    </div>
  );
};
export default SearchDrawerHeader;

const CloseSvg = ({ onClick }: any) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      className="absolute top-0 right-0 md:right-10 cursor-pointer w-6 md:w-11"
    >
      <g filter="url(#filter0_d_1706_56774)">
        <rect x="4" width="38" height="38" rx="19" fill="white" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M31.6588 11.987C31.7669 11.879 31.8526 11.7509 31.9112 11.6098C31.9697 11.4687 31.9999 11.3174 32 11.1647C32.0001 11.0119 31.9701 10.8606 31.9117 10.7195C31.8534 10.5783 31.7678 10.45 31.6598 10.3419C31.5519 10.2338 31.4237 10.1481 31.2826 10.0895C31.1415 10.031 30.9903 10.0008 30.8375 10.0007C30.6847 10.0006 30.5335 10.0306 30.3923 10.089C30.2511 10.1474 30.1228 10.233 30.0148 10.3409L22.9999 17.3559L15.987 10.3409C15.7687 10.1226 15.4726 10 15.1639 10C14.8552 10 14.5592 10.1226 14.3409 10.3409C14.1226 10.5592 14 10.8553 14 11.164C14 11.4727 14.1226 11.7687 14.3409 11.987L21.3558 19L14.3409 26.013C14.2328 26.1211 14.1471 26.2494 14.0886 26.3906C14.0301 26.5318 14 26.6832 14 26.836C14 26.9889 14.0301 27.1403 14.0886 27.2815C14.1471 27.4227 14.2328 27.551 14.3409 27.6591C14.5592 27.8774 14.8552 28 15.1639 28C15.3168 28 15.4681 27.9699 15.6093 27.9114C15.7506 27.8529 15.8789 27.7672 15.987 27.6591L22.9999 20.6441L30.0148 27.6591C30.233 27.8771 30.529 27.9995 30.8375 27.9993C31.146 27.9991 31.4418 27.8764 31.6598 27.6581C31.8778 27.4398 32.0002 27.1438 32 26.8353C31.9998 26.5268 31.8771 26.231 31.6588 26.013L24.6439 19L31.6588 11.987Z"
          fill="#808080" // Changed fill color to gray
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1706_56774"
          x="0"
          y="0"
          width="46"
          height="46"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1706_56774"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1706_56774"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
