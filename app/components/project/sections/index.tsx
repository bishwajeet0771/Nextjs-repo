/* eslint-disable no-unused-vars */
"use client";
import React from "react";
// const HeaderActions = dynamic(() => import("./HeaderActions"));
import MainSection from "./Main";
import { useAtomValue } from "jotai";
import { currentPhaseAtom } from "@/app/store/vewfloor";
import NoProperties from "../notfound";
import HeaderActions from "./HeaderActions";

type Props = {
  partialUnitData: any;
  projName: string;
  phaseList: any;
  data: any;
  type?: "overview" | "partial";
  handlePricingFloorPlanClick?: (selectedBhk: any) => void;
};

export default function PartialUnitData({
  partialUnitData,
  projName,
  phaseList,
  data,
  type,
  handlePricingFloorPlanClick,
}: Props) {
  const currentPhase = useAtomValue(currentPhaseAtom);
  const isPropTypesAvailable =
    (partialUnitData &&
      partialUnitData[currentPhase] &&
      Object.keys(partialUnitData[currentPhase] || {})) ??
    0;
  return (
    <div
      className={`w-[95%] md:w-[90%] scroll-mt-[150px] md:mb-[2%] sm:mb-[5%]  ${
        partialUnitData?.length > 0 && "min-h-[300px]"
      }`}
      id={type === "overview" ? "price-details" : "floor-plans"}
    >
      <HeaderActions
        partialUnitData={partialUnitData}
        projName={projName}
        phaseList={phaseList}
        type={type}
      />
      {isPropTypesAvailable.length > 0 ? (
        <MainSection
          partialUnitData={{ ...partialUnitData, handlePricingFloorPlanClick }}
          data={{ ...data, type }}
        />
      ) : (
        <NoProperties
          phase={
            phaseList?.find((phase: any) => phase.phaseId == currentPhase)
              ?.phaseName as any
          }
        />
      )}
    </div>
  );
}
