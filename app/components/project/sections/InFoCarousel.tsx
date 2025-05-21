"use client";
import React from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { selectedPartialUnitAtom } from "@/app/store/partialsUnits";
import { currentPhaseAtom, propCgIdAtom } from "@/app/store/vewfloor";
import { propertyDetailsTypes } from "@/app/data/projectDetails";
import { sortUnits } from "@/app/utils/unitparser";
import { formatCurrency, formatNumberWithSuffix } from "@/app/utils/numbers";

type Props = {
  partialUnitData: any;
};

export default function InFoCarousel({ partialUnitData }: Props) {
  const currentPhase = useAtomValue(currentPhaseAtom);

  const propCgId = useAtomValue(propCgIdAtom);
  const whichKeyname = partialUnitData.type === "overview" ? "apiProp" : "name";
  const data =
    partialUnitData[currentPhase]?.[
      propertyDetailsTypes.get(propCgId)?.[whichKeyname] ?? ""
    ];
  const setData = useSetAtom(selectedPartialUnitAtom);

  const handleCardClick = (units: any, item: any) => {
    // console.log(units, item)
    // const dataLength = sortUnits(Object.keys(data)).length;
    if (partialUnitData.type === "overview") {
      // console.log(partialUnitData.handlePricingFloorPlanClick)
      partialUnitData.handlePricingFloorPlanClick &&
        partialUnitData.handlePricingFloorPlanClick({
          bhkName: item,
        });
      return;
    }

    setData({
      main: 0,
      others: units,
      priceRange: `${formatCurrency(data[item].minPrice)} - ${formatCurrency(
        data[item].maxPrice
      )}`,
    });
  };

  return (
    <div className="justify-start flex-col items-start mr-auto max-w-[1120px] overflow-x-auto sm:min-h-[180px] max-h-[340px] xl:max-h-[340px] overflow-auto">
      <table className="min-w-full border-collapse mr-auto">
        <thead className="sticky top-0 z-[1]">
          <tr className="flex flex-row justify-start items-center">
            <th
              className="w-[90px] sm:w-[220px] sticky left-0 top-0 flex bg-[#00487C] justify-center text-center items-start 
              px-2 py-1 sm:px-2.5 sm:py-2 text-white text-[12px] sm:text-[16px] font-bold leading-normal border-r"
            >
              Unit Type
            </th>
            <th
              className="w-[150px] sm:w-[220px] flex bg-[#00487C] justify-center text-center items-start 
              px-2 py-1 sm:px-2.5 sm:py-2 text-white text-[12px] sm:text-[16px] font-bold leading-normal border-r"
            >
              {propCgId === 32 ? "Plot Area" : "Super Built-Up Area"}
            </th>
            {propCgId !== 32 && (
              <th
                className="w-[150px] sm:w-[220px] flex bg-[#00487C] justify-center text-center items-start 
                px-2 py-1 sm:px-2.5 sm:py-2 text-white text-[12px] sm:text-[16px] font-bold leading-normal border-r"
              >
                Carpet Area
              </th>
            )}
            <th
              className="w-[150px] sm:w-[220px] flex bg-[#00487C] justify-center text-center items-start 
              px-2 py-1 sm:px-2.5 sm:py-2 text-white text-[12px] sm:text-[16px] font-bold leading-normal border-r"
            >
              Unit Price
            </th>
            <th
              className="w-[150px] sm:w-[220px] flex bg-[#00487C] justify-center text-center items-start 
              px-2 py-1 sm:px-2.5 sm:py-2 text-white text-[12px] sm:text-[16px] font-bold leading-normal border-r"
            >
              Floor Plan
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data &&
            sortUnits(Object.keys(data)).map((item: string) => {
              const units = data[item].unitDataDtoList;
              return (
                <tr
                  key={item}
                  className="flex flex-row justify-start items-start !z-[1]"
                >
                  <td
                    className="bg-[#EEF7FF] shadow-gray-950 shadow-right mb:shadow-right-0 sticky left-0 
                    w-[90px] sm:w-[220px] text-gray-900 text-[12px] sm:text-[16px] font-semibold 
                    h-[50px] sm:h-[60px] flex justify-center text-center items-center 
                    border-t-0 border-r-[0.5px] border-r-[#D9DFE3] border-b-[0.5px] border-b-[#D9DFE3] border-solid 
                    sm:shadow-lg md:shadow-none"
                  >
                    {partialUnitData.type === "overview" && propCgId === 32
                      ? item.replace("_", " x ")
                      : item}
                  </td>
                  <td
                    className="w-[150px] sm:w-[220px] bg-[#FFF] text-gray-900 text-[12px] sm:text-[16px] 
                    font-semibold h-[50px] sm:h-[60px] flex justify-center text-center items-center 
                    border-t-0 border-r-[0.5px] border-r-[#D9DFE3] border-b-[0.5px] border-b-[#D9DFE3] border-solid"
                  >
                    {propCgId === 32
                      ? data[item].plotArea
                        ? `${formatNumberWithSuffix(
                            data[item].plotArea,
                            false
                          )} sq.ft`
                        : data[item].minPa === data[item].maxPa
                        ? `${formatNumberWithSuffix(
                            data[item].minPa,
                            false
                          )} sq.ft`
                        : `${formatNumberWithSuffix(
                            data[item].minPa,
                            false
                          )} - ${formatNumberWithSuffix(
                            data[item].maxPa,
                            false
                          )} sq.ft`
                      : data[item].minSba !== data[item].maxSba
                      ? `${formatNumberWithSuffix(
                          data[item].minSba,
                          false
                        )} - ${formatNumberWithSuffix(
                          data[item].maxSba,
                          false
                        )} sq.ft`
                      : `${formatNumberWithSuffix(
                          data[item].minSba,
                          false
                        )} sq.ft`}
                  </td>
                  {propCgId !== 32 && (
                    <td
                      className="w-[150px] sm:w-[220px] bg-[#EEF7FF] text-gray-900 text-[12px] sm:text-[16px] 
                      font-semibold h-[50px] sm:h-[60px] flex justify-center text-center items-center 
                      border-t-0 border-r-[0.5px] border-r-[#D9DFE3] border-b-[0.5px] border-b-[#D9DFE3] border-solid"
                    >
                      {data[item].minCa !== data[item].maxCa
                        ? `${formatNumberWithSuffix(
                            data[item].minCa,
                            false
                          )} - ${formatNumberWithSuffix(
                            data[item].maxCa,
                            false
                          )} sq.ft`
                        : `${formatNumberWithSuffix(
                            data[item].minCa,
                            false
                          )} sq.ft`}
                    </td>
                  )}
                  <td
                    className="w-[150px] sm:w-[220px] bg-[#FFF] text-gray-900 text-[12px] sm:text-[16px] 
                    font-semibold h-[50px] sm:h-[60px] flex justify-center text-center items-center 
                    border-t-0 border-r-[0.5px] border-r-[#D9DFE3] border-b-[0.5px] border-b-[#D9DFE3] border-solid"
                  >
                    {formatCurrency(data[item].minPrice)} -{" "}
                    {formatCurrency(data[item].maxPrice)}
                  </td>
                  <td
                    className="w-[150px] sm:w-[220px] bg-[#EEF7FF] text-gray-900 text-[12px] sm:text-[16px] 
                    font-semibold h-[50px] sm:h-[60px] flex justify-center text-center items-center 
                    border-t-0 border-r-[0.5px] border-r-[#D9DFE3] border-b-[0.5px] border-b-[#D9DFE3] border-solid"
                  >
                    <button
                      aria-label="View Floor Plan" name="View Floor Plan" title="View Floor Plan"
                      className="text-[#0073C6] text-[12px] sm:text-[16px] font-semibold 
                      leading-normal font-Montserrat"
                      onClick={() => handleCardClick(units, item)}
                    >
                      <div className="flex flex-row gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="23"
                          height="22"
                          viewBox="0 0 23 22"
                          fill="none"
                        >
                          <path
                            d="M19.75 1.375H3.25C2.49375 1.375 1.875 1.99375 1.875 2.75V19.25C1.875 20.0063 2.49375 20.625 3.25 20.625H13.5625V19.25C13.5625 17.325 15.075 15.8125 17 15.8125V14.4375C14.3188 14.4375 12.1875 16.5688 12.1875 19.25H10.125V16.5H8.75V19.25H3.25V2.75H8.75V12.375H10.125V8.9375H12.875V7.5625H10.125V2.75H19.75V7.5625H17V8.9375H19.75V19.25H17V20.625H19.75C20.5063 20.625 21.125 20.0063 21.125 19.25V2.75C21.125 1.99375 20.5063 1.375 19.75 1.375Z"
                            fill="#0073C6"
                          />
                        </svg>
                        <span>View Floor Plan</span>
                      </div>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
