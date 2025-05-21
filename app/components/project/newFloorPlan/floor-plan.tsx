/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
"use client";
import React, { useCallback, useState, useEffect } from "react";
import { PropertyTabs } from "./components/property-tabs";
import { ViewOptions } from "./components/view-options";
import { FloorPlanModal } from "./components/floor-plan-modal";
import type { PropertyUnit } from "./types/floor-plan";
import { BHKTabs } from "./components/bhk-tabs";
import { FullScreenImageModal } from "./components/full-screen-image-modal";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { currentPhaseAtom, propCgIdAtom } from "@/app/store/vewfloor";
import {
  fullScreenModalStateAtom,
  modalStateAtom,
} from "@/app/store/new-floor-plan-state";

import { projectprops } from "@/app/data/projectDetails";
// import SubHeading from "../headings/SubHeading";
import { isSingleLetterOrNumber } from "@/app/utils/letters";
import Button from "@/app/elements/button";
import { useQuery } from "react-query";
import { getProjectUnits } from "@/app/utils/api/project";
import RTK_CONFIG from "@/app/config/rtk";
import Image from "next/image";
import { ImgNotAvail } from "@/app/data/project";
import ByUnitFilters from "./components/by-unit-filters";
import FloorplanLeftsection from "./components/floorplan-leftsection";

import {
  getUniqueOptionsByKeys,
  UNIT_DATA_KEYS,
} from "./utils/generateuniqueoptions";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";

interface FloorPlansProps {
  phases: any;
  projName: string;
  partialUnitData: any;
  phaseOverview: any;
  slug: string;
  postedById: number;
}
import { formatNumberWithSuffix } from "@/app/utils/numbers";
import PartialUnitData from "../sections";
import { paritalUnitParser } from "@/app/(new_routes_seo)/residential/projects/utils/partialUnitParser";
import { useForm } from "@/app/context/floorplanContext";
import { setPropertyValues } from "@/app/utils/dyanamic/projects";
import { floorPlansArray, selectedFloorAtom } from "@/app/store/floor";
// import { useFloorPlanPopup } from "@/app/hooks/useFloorPlanPopup";

export default function FloorPlans({
  phases,
  projName,
  partialUnitData,
  phaseOverview,
  slug,
  postedById,
}: FloorPlansProps): JSX.Element {
  const [selectedPhase, setSelectedPhase] = useAtom(currentPhaseAtom);
  const propCgId = useAtomValue(propCgIdAtom);
  const [selectedPropertyType, setSelectedPropertyType] = useState("apartment");
  const [selectedView, setSelectedView] = useState("type");
  const [modalState, setModalState] = useAtom(modalStateAtom);

  const [, setSelectedFloor] = useAtom(selectedFloorAtom);
  const setFloorsArray = useSetAtom(floorPlansArray);
  const form = useForm();

  const [fullScreenModalState, setFullScreenModalState] = useAtom<{
    isOpen: boolean;
    unit: PropertyUnit | null;
  }>(fullScreenModalStateAtom);
  const [selectedBHK, setSelectedBHK] = useState("All");
  const [allBhkNames, setAllBhkNames] = useState(["All"]);

  const selectedPhaseData = phaseOverview?.find(
    (phase: any) => phase.phaseId === selectedPhase
  );

  const types =
    selectedPhaseData?.propTypeOverview &&
    Object?.keys(
      selectedPhaseData?.propTypeOverview && selectedPhaseData.propTypeOverview
    )
      .map((v) => {
        if (selectedPhaseData?.propTypeOverview[v].unitTypes) {
          return v;
        } else {
          return null;
        }
      })
      .sort()
      .filter((v) => v !== null);

  const initailFilterState = {
    unitNumber: "",
    bhkName: "",
    towerName: "",
    floor: "",
    facingName: "",
    block: "",
    plotArea: "",
    width: "",
    length: "",
    caretarea: "",
    superBuildUparea: "",
    terraceArea: "",
    parkingType: "",
    totalNumberofBathroom: 0,
    totalNumberOfBalcony: 0,
    totalBalconySize: 0,
    noOfCarParking: 0,
    floorPlanUrl: "",
    gardenArea: "",
    parkingArea: "",
    aptTypeName: "",
  };

  const [unitFilters, setUnitFilters] = useState(initailFilterState);
  const [, { open }] = useReqCallPopup();

  const handleBhkClick = (bhk: string) => {
    setSelectedBHK(bhk);
    setUnitFilters((prev) => ({ ...prev, bhkName: bhk === "All" ? "" : bhk }));
  };

  const handleViewClick = (type: string) => {
    setAllBhks();
    setSelectedView(type);
    handleBhkClick("All");
    setUnitFilters(initailFilterState);
  };

  const { data: projectUnitsData, isLoading } = useQuery({
    queryKey: [`/${propCgId}/${selectedPhase}/${slug}`],
    queryFn: () => getProjectUnits(slug, selectedPhase, propCgId),
    enabled: !!propCgId,
    ...RTK_CONFIG,
  });

  const handleUnitFilterChange = (name: string, value: string | number) => {
    if (name === "unitNumber" && value !== "") {
      const unitFilteredData = projectUnitsData.filter(
        (item: any) => item.unitNumber === value
      );
      if (unitFilteredData && unitFilteredData.length > 0) {
        // setUnitFilters(unitFilteredData[0]);
        setUnitFilters((prev) => ({
          ...prev,
          unitNumber: unitFilteredData[0].unitNumber
            ? unitFilteredData[0].unitNumber
            : "",
          bhkName:
            unitFilteredData[0].bhkName !== null
              ? unitFilteredData[0].bhkName
              : "",
          towerName:
            unitFilteredData[0].towerName !== null
              ? unitFilteredData[0].towerName
              : "",
          floor:
            unitFilteredData[0].floor !== undefined &&
            unitFilteredData[0].floor !== null &&
            unitFilteredData[0].floor !== ""
              ? unitFilteredData[0].floor == 0
                ? "G"
                : unitFilteredData[0].floor
              : "",
          facingName:
            unitFilteredData[0].facingName !== null
              ? unitFilteredData[0].facingName
              : "",
          block:
            unitFilteredData[0].block !== null ? unitFilteredData[0].block : "",
          plotArea:
            unitFilteredData[0].plotArea !== null
              ? unitFilteredData[0].plotArea
              : "",
          length:
            unitFilteredData[0].length !== null
              ? unitFilteredData[0].length
              : "",
          width:
            unitFilteredData[0].width !== null ? unitFilteredData[0].width : "",
        }));
      }
    } else {
      setUnitFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const memoOptions = useCallback(() => {
    if (!projectUnitsData)
      return {
        options: {},
        filteredUnits: [],
        cacheAllBhkOptions: [],
      };
    return getUniqueOptionsByKeys(
      projectUnitsData,
      UNIT_DATA_KEYS as (keyof PropertyUnit)[],
      unitFilters
    );
  }, [projectUnitsData, unitFilters]);

  const mustCallMemo =
    selectedView === "unit" ||
    selectedView === "bhk" ||
    modalState.type === "overview";

  const {
    options = {},
    filteredUnits = [],
    cacheAllBhkOptions = [],
  } = mustCallMemo
    ? memoOptions()
    : {
        options: {},
        filteredUnits: projectUnitsData || [],
        cacheAllBhkOptions: [],
      };

  const setAllBhks = () => {
    if (options && "bhkName" in options && Array.isArray(options.bhkName)) {
      let data = ["All", ...options.bhkName];
      setAllBhkNames(() => {
        return [...data];
      });
    }
  };

  const [rightSideUnit, setRightSideUnit] = useState(initailFilterState);
  const getRightsideData = (data: any) => {
    setRightSideUnit(data);
  };

  useEffect(() => {
    setSelectedView("type");
    setAllBhks();
    setUnitFilters(initailFilterState);
  }, [propCgId, selectedPhase]);

  const onSelectCard = (unit: any, state?: boolean) => {
    if (!unit) return;
    setModalState({
      isOpen: true,
      unit: unit,
      isPartialUnit: state ? state : false,
      type: "floorplan",
    });
    setSelectedView("bhk");
    handleBhkClick("All");
    if (!state) {
      UNIT_DATA_KEYS.forEach((eachKey) => {
        if (eachKey === "floor" && unit[eachKey] === 0) {
          handleUnitFilterChange("floor", "G");
        } else if (unit[eachKey]) {
          handleUnitFilterChange(eachKey, unit[eachKey]);
        }
      });
    } else {
      handleUnitFilterChange("bhkName", unit.bhkName);
    }
  };

  const onClosingPopup = () => {
    handleBhkClick("All");
    setAllBhks();
    setModalState((prev) => ({ ...prev, isOpen: false, unit: null }));
    setSelectedView("type");
    UNIT_DATA_KEYS.forEach((eachKey) => {
      handleUnitFilterChange(eachKey, "");
    });

    setUnitFilters(initailFilterState);
  };
  const handleOpenFullScreenModal = (unit: PropertyUnit) => {
    setFullScreenModalState({ isOpen: true, unit: unit });
  };
  const handleReqcallBack = (unit: PropertyUnit) => {
    if (!unit) return;
    open({
      modal_type: "REQ_QUOTE",
      reqId: unit.unitIdEnc,
      source: "projBanner",
      postedByName: unit.bhkName,
      title: unit.unitNumber,
      postedId: postedById,
    });
  };

  const handlePricingFloorPlanClick = (selBhk: any) => {
    if (selBhk.bhkName.includes("_")) {
      const [length, width] = selBhk.bhkName.split("_");
      form.setValues({
        ...setPropertyValues(
          {
            length,
            width,
          },
          propCgId
        ),
      });
      const filtertedFloor = projectUnitsData.filter(
        (floor: any) => floor.width == width && floor.length == length
      );

      setSelectedFloor({
        ...filtertedFloor[0],
        floorPlanUrl: filtertedFloor[0]?.floorPlanUrl ?? ImgNotAvail,
      });
      setFloorsArray(filtertedFloor);
      // openFloorPlan("floor");
      onSelectCard(filtertedFloor[0], true);
      return;
    }

    let filteredFloorsList = projectUnitsData
      ? projectUnitsData.filter((floor: any) => floor.bhkName == selBhk.bhkName)
      : [];

    setSelectedFloor({
      ...filteredFloorsList[0],
      floorPlanUrl: filteredFloorsList[0]?.floorPlanUrl ?? ImgNotAvail,
    });
    form.setValues({
      ...setPropertyValues(
        {
          bhkName: selBhk.bhkName,
        },
        propCgId
      ),
    });
    setFloorsArray(filteredFloorsList);
    // openFloorPlan("floor");
    onSelectCard(filteredFloorsList[0], true);
  };

  return (
    <>
      {!partialUnitData &&
        (!phaseOverview ? (
          <div>Loading....</div>
        ) : (
          <PartialUnitData
            partialUnitData={paritalUnitParser(phaseOverview)}
            projName={projName}
            phaseList={phases}
            data={projectUnitsData}
            type="overview"
            handlePricingFloorPlanClick={handlePricingFloorPlanClick}
          />
        ))}{" "}
      <div
        className="w-full md:w-[90%] mx-auto px-3 md:px-4 py-8"
        id="floor-plans"
      >
        <h2
          className="text-[22px] xl:text-[28px] font-bold mb-[4px] sm:mb-[10px] xl:mb-[6px] capitalize"
          id="floorPlansdiv"
        > 
          <strong>
            <span className="text-[#001F35]">Floor Plans For{" "}</span>
            <span className="text-green-800 ">{projName}</span>{" "}
          </strong>
        </h2>
        {/* <SubHeading text="See floor plans as per your selected property type" /> */}
        <p className="text-[13px] sm:text-[16px] xl:text-2xl  text-[#344273]  italic font-semibold leading-[normal] mb-2">See floor plans as per your selected property type</p>
        <div className="space-y-6 flex flex-col items-start justify-start">
          <div
            className={`flex justify-start items-start md:items-center mb-[2%] flex-col md:flex-row ${
              phases?.length > 1 ? "mt-2 md:mt-4" : "mt-[0%]"
            }`}
          >
            {phases?.length > 1 && (
              <>
                <p className="text-[14px] sm:text-[20px] lg:text-[24px] font-[500] mb-2 sm:mb-[44px] md:mb-0 text-[#333] sm:mr-[20px] ">
                  Select one of the phase to see Floor Plans
                </p>
                <div className="flex justify-start items-start gap-[10px] flex-wrap ">
                  {phases?.map((each: any) => (
                    <Button
                      key={each.phaseId}
                      title={
                        isSingleLetterOrNumber(each.phaseName)
                          ? `Phase: ${each.phaseName}`
                          : each.phaseName
                      }
                      onChange={() => {
                        if (selectedPhase == each.phaseId) return;
                        setSelectedPhase(each.phaseId);
                      }}
                      buttonClass={`mb-[5px] text-[14px] sm:text-[18px] lg:text-[20px] bg-[#ECF7FF] p-[8px] xl:px-[8px] capitalize whitespace-nowrap text-[#000] rounded-[8px] ${
                        selectedPhase == each.phaseId
                          ? "font-[600] border-solid border-[1px] border-[#0073C6]"
                          : "font-[400]"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {types && types.length > 0 && (
            <>
              <PropertyTabs types={types} />
              <ViewOptions
                onSelect={handleViewClick}
                selectedView={selectedView}
              />

              {selectedView === "bhk" &&
                selectedPropertyType === "apartment" &&
                propCgId !== projectprops.plot && (
                  <BHKTabs
                    onSelect={handleBhkClick}
                    bhkNames={cacheAllBhkOptions}
                    selectedBHK={selectedBHK}
                  />
                )}

              {selectedView === "unit" && (
                <ByUnitFilters
                  options={options}
                  handleUnitFilterChange={handleUnitFilterChange}
                  filters={unitFilters}
                  setFilters={setUnitFilters}
                />
              )}
            </>
          )}

          <div className="mt-3 gap-6 flex justify-between w-full  flex-wrap-reverse md:flex-nowrap">
            {/* FLOOR PLAN LEFT SECTION */}
            <FloorplanLeftsection
              units={filteredUnits}
              isLoading={isLoading}
              onSelectCard={onSelectCard}
              handleReqcallBack={handleReqcallBack}
              getRightsideData={getRightsideData}
              selectedBHK={selectedBHK}
              propCgId={propCgId}
            />
            <div className="block w-full md:w-[50%]">
              <div
                className="sticky top-4"
                onClick={() =>
                  rightSideUnit ? onSelectCard(rightSideUnit) : ""
                }
              >
                {rightSideUnit ? (
                  <div className="p-4 bg-[#F8FBFF] rounded-lg">
                    <p className="text-[12px] sm:text-[14px] font-[500] text-[#005DA0]">
                      {projName}
                      {propCgId != projectprops.plot &&
                        rightSideUnit?.bhkName &&
                        " | " + rightSideUnit?.bhkName}
                      {propCgId == projectprops.apartment &&
                        rightSideUnit?.towerName &&
                        rightSideUnit?.towerName != "NA" &&
                        " | Tower " + rightSideUnit?.towerName}
                      {propCgId != projectprops.plot &&
                        ` | ${
                          propCgId == projectprops.rowHouse ||
                          propCgId == projectprops.villa
                            ? "Elevation"
                            : "Floor"
                        } ` +
                          `${
                            rightSideUnit?.floor?.toString() === "0"
                              ? "G"
                              : rightSideUnit?.floor
                          }`}
                      {rightSideUnit?.unitNumber &&
                        " | Unit No. " + rightSideUnit?.unitNumber}
                      {" | Facing " + rightSideUnit?.facingName}
                      {propCgId != projectprops.plot &&
                        rightSideUnit?.superBuildUparea &&
                        " | Area. " +
                          formatNumberWithSuffix(
                            rightSideUnit?.superBuildUparea,
                            false
                          ) +
                          " sq.ft"}
                      {propCgId == projectprops.plot &&
                        rightSideUnit?.plotArea &&
                        " | Area. " +
                          formatNumberWithSuffix(
                            rightSideUnit?.plotArea,
                            false
                          ) +
                          " sq.ft"}
                    </p>
                  </div>
                ) : (
                  <p className="text-center text-gray-600">
                    Click on a unit to view its floor plan
                  </p>
                )}
                <div className="relative group mt-4">
                  <Image
                    src={
                      isLoading
                        ? "data:image/webp;base64,...(fallback image)"
                        : rightSideUnit && rightSideUnit.floorPlanUrl
                        ? rightSideUnit.floorPlanUrl.split(",")[0]
                        : ImgNotAvail
                    }
                    alt="Default Floor Plan"
                    width={800}
                    height={600}
                    className="w-full h-[250px] sm:h-[300px] md:h-[350px] xl:h-[530px] rounded-lg shadow-md cursor-pointer object-contain"
                  />
                  <div className="absolute px-2 sm:px-5 cursor-pointer bottom-0 right-0 bg-black/50 py-1.5 sm:py-3 rounded-br-lg opacity-100 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center justify-center gap-1 sm:gap-2 text-white max-w-fit">
                      <p className="text-xs sm:text-sm">
                        Click to view more details
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {modalState.isOpen && (
          <FloorPlanModal
            modalState={modalState}
            onClose={() => onClosingPopup()}
            initialUnit={rightSideUnit}
            units={projectUnitsData || []}
            filters={unitFilters}
            setFilters={setUnitFilters}
            filteredUnits={filteredUnits}
            options={options || {}}
            handleOpenFullScreenModal={handleOpenFullScreenModal}
            handleReqcallBack={handleReqcallBack}
          />
        )}

        {fullScreenModalState.isOpen && fullScreenModalState.unit && (
          <FullScreenImageModal
            isOpen={fullScreenModalState.isOpen}
            onClose={() =>
              setFullScreenModalState({ isOpen: false, unit: null })
            }
            unit={fullScreenModalState.unit}
            handleReqcallBack={handleReqcallBack}
          />
        )}
      </div>
    </>
  );
}
