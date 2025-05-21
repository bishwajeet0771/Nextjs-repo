/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
import Image from "next/image";
import clsx from "clsx";
import { ImgCarouselIcon, PrevCarouselIcon } from "@/app/images/commonSvgs";

// Your component code here
const SelectedFilters = ({
  form,
  propCgId,
  projectprops,
  showClearAll,
  handleRemoveFilter,
  filterKeysDetails,
}: any) => {
  const scrollFiltersRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(true);
  const [showRightButton, setShowRightButton] = useState(true);

  const handleArrowClick = (side: "R" | "L"): void => {
    const scrollAmount = side === "R" ? 100 : -100;
    if (scrollFiltersRef.current) {
      scrollFiltersRef.current.scrollLeft += scrollAmount;
    }
  };

  return (
    <div
      className={`flex justify-start items-center w-full  relative bottom-[20px] mb-1   ${
        showClearAll ? "h-[35px] mt-10" : "h-[0px] mt-2"
      }`}
    >
      {/* scroll buttons */}
      {showLeftButton &&
        Object.values(form.values).filter((each) => each != null).length >
          4 && (
          <button
            onClick={() => handleArrowClick("L")}
            className="flex mr-4 xl:mr-8 h-[32px] xl:w-[32px] rounded-[50%] items-center justify-center bg-[#FCFCFC]"
          >
            <PrevCarouselIcon />
          </button>
        )}

      <div
        ref={scrollFiltersRef}
        className={clsx(
          "flex w-full  scroll-smooth overflow-x-auto overflow-y-hidden scrollbar-hide gap-4",
          propCgId === projectprops.plot && "md:max-w-[65%]"
        )}
      >
        {Object.entries(form.values).map(
          ([key, value]) =>
            value !== undefined &&
            value !== null &&
            value !== 0 &&
            value !== "" &&
            value !== "true" && (
              <div
                className="flex h-[33px] items-center px-1 xl:px-3 whitespace-nowrap py-1.5 bg-white border border-[#9DB6DC] rounded-[10px]"
                key={key}
              >
                <span className="text-[#148B16] text-[14px] xl:text-[18px] font-semibold">
                  {/* @ts-ignore */}
                  {key === "floor" && value == 0 ? "G" : value}
                </span>
                <span className="mx-1.5 text-[#242424]">|</span>
                <span className="text-[#242424] text-[14px] xl:text-[18px] font-medium capitalize">
                  {filterKeysDetails?.get(key)?.name != undefined
                    ? filterKeysDetails?.get(key)?.name === "Floor" &&
                      (propCgId === 31 || propCgId === 33)
                      ? "Elevation"
                      : key === "aptTypeName"
                      ? propCgId === 35
                        ? "Apartment Type"
                        : propCgId === 34
                        ? "Villament Type"
                        : filterKeysDetails?.get(key)?.name
                      : filterKeysDetails?.get(key)?.name
                    : key}
                </span>
                <button className="ml-2 !w-[14px] !h-[14px]">
                  <Image
                    onClick={() => handleRemoveFilter(key)}
                    src={"/cross.svg"}
                    alt="close"
                    width={14}
                    height={14}
                    className="!w-[14px] !h-[14px]"
                  />
                </button>
              </div>
            )
        )}
      </div>
      {/* scroll buttons */}
      {showRightButton &&
        Object.values(form.values).filter((each) => each != null).length >
          4 && (
          <button
            onClick={() => handleArrowClick("R")}
            className="flex h-[32px] ml-8 w-[32px] rounded-[50%] items-center justify-center bg-[#FCFCFC]"
          >
            <ImgCarouselIcon />
          </button>
        )}
    </div>
  );
};

export default SelectedFilters;
