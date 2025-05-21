/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import getIcon from "@/app/(new_routes_seo)/residential/projects/utils/icons";
import {
  // BACKEND_PROP_TYPES,
  listingProps,
  // parseDataProjectProps,
  propertyDetailsTypes,
} from "@/app/data/projectDetails";
import Button from "@/app/elements/button";
import { currentPhaseAtom, propCgIdAtom } from "@/app/store/vewfloor";
import { isSingleLetterOrNumber } from "@/app/utils/letters";
import { formatCurrency, formatNumberWithSuffix } from "@/app/utils/numbers";
import { sortUnits } from "@/app/utils/unitparser";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
const PricingSection = ({ unitData, projName, phaseList }: any) => {
  const [currentPhase, setCurrentPhase] = useAtom(currentPhaseAtom);
  const [propCgId, setPropCgId] = useAtom(propCgIdAtom ?? 35);
  const sorted = ["Apartment", "Row House", "Villa", "Villament", "Plot"];
  const propTypes = Object.keys(
    unitData && unitData[currentPhase] ? unitData[currentPhase] : {}
  ).sort((a, b) => sorted.indexOf(a) - sorted.indexOf(b));
  const filteredData =
    unitData[currentPhase]?.[propertyDetailsTypes.get(propCgId)?.name ?? ""];
  useEffect(() => {
    // @ts-ignore
    propTypes?.length > 0 && setPropCgId(listingProps[`${propTypes[0]}`]);
  }, [currentPhase]);

  return (
    <section
      className="md:p-6 bg-white rounded-lg shadow-lg w-[90%] mt-2 sm:mt-[100px] scroll-mt-[200px]"
      id="price-details"
    >
      <h2 className="text-h2 sm:text-[22px] xl:text-[28px] font-bold text-gray-800 mb-4">
        <strong>
          <span className="text-[#001F35]">Pricing Details of{" "}</span>
          <span className="text-green-800">{projName}</span>
        </strong>
      </h2>
      {phaseList?.length > 1 && (
        <>
          <p className="text-base font-semibold mb-4 text-gray-700">
            Select a phase to view project details
          </p>
          <div className="flex flex-wrap gap-4 mb-4">
            {phaseList?.map((each: any) => (
              <Button
                key={`phase_${each.phaseName}`}
                title={
                  isSingleLetterOrNumber(each.phaseName)
                    ? `Phase: ${each.phaseName}`
                    : each.phaseName
                }
                onChange={() => {
                  if (currentPhase === each.phaseId) return;
                  setCurrentPhase(each.phaseId);
                }}
                buttonClass={`text-sm sm:text-base ${
                  currentPhase === each.phaseId
                    ? "bg-[#0056B3] font-bold border-2 border-white text-white shadow-md"
                    : "bg-[#0073C6] font-medium text-white shadow hover:shadow-lg"
                } p-3 rounded-xl transition-colors duration-200`}
              />
            ))}
          </div>
        </>
      )}
      <div className="flex flex-wrap sm:gap-3 mb-2 sm:mb-4">
        {propTypes?.map((each: string) => {
          const keyName = listingProps[each as keyof typeof listingProps];
          let name =
            //@ts-ignore
            each;
          return (
            <Button
              key={keyName}
              buttonClass={`flex items-center gap-2 mb-2 rounded-full sm:py-1 px-2 sm:px-4 text-xs sm:text-sm border font-semibold ${
                propCgId === keyName
                  ? "text-blue-700 bg-blue-100 border-blue-700 font-semibold"
                  : "text-gray-700 bg-gray-200 border-gray-300"
              }`}
              onChange={() => {
                if (propCgId !== keyName) {
                  setPropCgId(keyName);
                }
              }}
              title={name}
              icon={getIcon(keyName)}
            />
          );
        })}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6 max-h-[400px] sm:max-h-[550px] overflow-y-auto">
        {filteredData ? (
          sortUnits(Object.keys(filteredData)).map((bhkType) => (
            <div
              key={`${projName}-${bhkType}`}
              className="p-4 rounded-lg shadow-md bg-gradient-to-br from-blue-50 to-white border border-blue-200 flex flex-col gap-3"
            >
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                {bhkType}
              </h3>
              <div className="text-sm sm:text-base text-gray-700 font-semibold">
                <span className="font-medium text-gray-800">Price Range:</span>{" "}
                {formatCurrency(filteredData[bhkType].minPrice)} -{" "}
                {formatCurrency(filteredData[bhkType].maxPrice)}
              </div>
              {propCgId !== 32 ? (
                <>
                  {" "}
                  <div className="text-sm sm:text-base text-gray-700 font-semibold">
                    <span className="font-medium text-gray-800">
                      Super-Built Up Area:
                    </span>{" "}
                    {filteredData[bhkType].minSba ===
                    filteredData[bhkType].maxSba
                      ? `${formatNumberWithSuffix(
                          filteredData[bhkType].minSba,
                          false
                        )} sq ft`
                      : `${formatNumberWithSuffix(
                          filteredData[bhkType].minSba,
                          false
                        )} - ${formatNumberWithSuffix(
                          filteredData[bhkType].maxSba,
                          false
                        )} sq ft`}
                  </div>
                  <div className="text-sm sm:text-base text-gray-700 font-semibold">
                    <span className="font-medium text-gray-800">
                      Carpet Area:
                    </span>{" "}
                    {filteredData[bhkType].minCa === filteredData[bhkType].maxCa
                      ? `${formatNumberWithSuffix(
                          filteredData[bhkType].minCa,
                          false
                        )} sq ft`
                      : `${formatNumberWithSuffix(
                          filteredData[bhkType].minCa,
                          false
                        )} - ${formatNumberWithSuffix(
                          filteredData[bhkType].maxCa,
                          false
                        )} sq ft`}
                  </div>{" "}
                </>
              ) : (
                <div className="text-sm sm:text-base text-gray-700 font-semibold">
                  <span className="font-medium text-gray-800">Plot Area:</span>{" "}
                  {filteredData[bhkType].plotArea
                    ? `${formatNumberWithSuffix(
                        filteredData[bhkType].plotArea,
                        false
                      )} sq ft`
                    : filteredData[bhkType].minPa ===
                      filteredData[bhkType].maxPa
                    ? `${formatNumberWithSuffix(
                        filteredData[bhkType].minPa,
                        false
                      )} sq ft`
                    : `${formatNumberWithSuffix(
                        filteredData[bhkType].minPa,
                        false
                      )} - ${formatNumberWithSuffix(
                        filteredData[bhkType].maxPa,
                        false
                      )} sq ft`}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-700 font-semibold bg-gray-100 p-4 rounded-lg shadow-md">
            <p>No units available. Coming soon...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PricingSection;
