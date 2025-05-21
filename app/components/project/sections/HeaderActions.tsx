"use client";
import React from "react";
import Button from "@/app/elements/button";
import { isSingleLetterOrNumber } from "@/app/utils/letters";
import { useAtom, useSetAtom } from "jotai";
import { currentPhaseAtom, propCgIdAtom } from "@/app/store/vewfloor";
// import NoProperties from "../notfound";
import {
  PlotIcon,
  VillamentIcon,
  VillaIcon,
  RowHouseIcon,
  ApartmentIcon,
  // ByTypeSvg,
  // ByUnitSvg,
  // ByBhkSvg,
  // PopupOpenSvg,
} from "@/app/images/commonSvgs";
import {
  // BACKEND_PROP_TYPES,
  listingProps,
  parseDataProjectProps,
  projectprops,
  propertyDetailsTypes,
} from "@/app/data/projectDetails";
import { parital_unit_atom } from "@/app/store/partialsUnits";

type Props = {
  partialUnitData: any;
  projName: string;
  phaseList: any;
  type?: "overview" | "partial";
};
const iconStyles: string =
  " flex items-center justify-center w-[34px] sm:w-[40px] h-[34px] sm:h-[40px] bg-[#FAFDFF] rounded-[50%] ";
export default function HeaderActions({
  partialUnitData,
  projName,
  phaseList,
  type,
}: Props) {
  const getIcon = (id: number) => {
    let iconComponent;
    switch (id) {
      case projectprops.apartment:
        iconComponent = <ApartmentIcon className={iconStyles} />;
        break;
      case projectprops.rowHouse:
        iconComponent = <RowHouseIcon className={iconStyles} />;
        break;
      case projectprops.villa:
        iconComponent = <VillaIcon className={iconStyles} />;
        break;
      case projectprops.villament:
        iconComponent = <VillamentIcon className={iconStyles} />;
        break;
      case projectprops.plot:
        iconComponent = <PlotIcon className={iconStyles} />;
        break;
      default:
        break;
    }
    return iconComponent;
  };
  const [currentPhase, setCurrentPhase] = useAtom(currentPhaseAtom);
  const setSelected = useSetAtom(parital_unit_atom);
  const sortOrder = ["apartment", "rowhouse", "villa", "villament", "plot"];

  const sortedPropTypes = Object.keys(partialUnitData?.[currentPhase] || {})
    .filter(
      (key) => Object.keys(partialUnitData[currentPhase][key] || {}).length > 0
    )
    .sort(
      (a, b) =>
        sortOrder.indexOf(a.toLocaleLowerCase().replace(" ", "")) -
        sortOrder.indexOf(b.toLocaleLowerCase().replace(" ", ""))
    );

  const [propCgId, setPropCgId] = useAtom(propCgIdAtom);

  return (
    <div>
      {" "}
      <h2
        className="sm:text-[22px] lg:text-[28px] mt-[3%] xl:mt-[100px] font-bold mb-[12px] scroll-mt-[280px]"
        id="floorPlansdiv"
      >
        <strong>
          <span className="text-[#001F35]">
            {type == "overview" ? "Price " : "Floor Plans "} For{" "}
          </span>
          <span className="text-green-800">{projName}</span>{" "}
        </strong>
      </h2>
      {/* <SubHeading text="See floor plans as per your selected property type" /> */}
      <p className="text-[13px] sm:text-[16px] xl:text-2xl  text-[#344273]  italic font-semibold leading-[normal] mb-2">
        See floor plans as per your selected property type
      </p>
      <div
        className={`flex justify-start items-start md:items-center  mb-[8px] flex-col md:flex-row  ${
          phaseList?.length > 1 ? "mt-4" : "mt-[0%]"
        }`}
      >
        {phaseList?.length > 1 && (
          <>
            <p className="text-[14px] sm:text-[20px] lg:text-[24px] font-[500] mb-2 sm:mb-[32px] md:mb-0 text-[#333] sm:mr-[20px] ">
              Select one of the phase to see project details
            </p>
            <div className=" flex justify-start items-start gap-[10px] flex-wrap ">
              {phaseList?.map((each: any) => {
                return (
                  <Button
                    key={`phase_${each.phaseName}`}
                    title={
                      isSingleLetterOrNumber(each.phaseName)
                        ? `Phase: ${each.phaseName}`
                        : each.phaseName
                    }
                    onChange={() => {
                      if (currentPhase == each.phaseId) return;
                      setCurrentPhase(each.phaseId);
                      setSelected(0);
                    }}
                    buttonClass={`mb-[5px] text-[14px] sm:text-[18px] lg:text-[20px] bg-[#ECF7FF] p-[8px] xl:px-[8px]  whitespace-nowrap text-[#000] rounded-[8px]
                        ${
                          currentPhase == each.phaseId
                            ? " font-[600] border-solid border-[1px] border-[#0073C6] "
                            : " font-[400]"
                        } 
                    
                    `}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
      <div className=" flex justify-start items-start flex-wrap gap-[2%] ">
        {sortedPropTypes?.map((each: string) => {
          const whichPropToUse =
            type == "overview" ? parseDataProjectProps : listingProps;
          const whichKeyname = type === "overview" ? "apiProp" : "name";
          const keyName = whichPropToUse[each as keyof typeof whichPropToUse];
          let name =
            propertyDetailsTypes.get(keyName)?.[whichKeyname] !== undefined
              ? propertyDetailsTypes.get(keyName)?.[whichKeyname] // Use whichKeyname to access the property
              : null;
          return (
            <Button
              key={keyName}
              buttonClass={`flex justify-start mb-2 sm:mb-[3%] w-full rounded-[20px] gap-[8px]  items-center mr-[24px] md:ml-[0px] text-[12px] sm:text-[18px] border capitalize ${
                propCgId == keyName
                  ? "text-[#001F35] text-[14px] sm:text-base font-[600] shadow-md bg-[#c8f5ca] sm:bg-[#D5EDFF]"
                  : "text-[#303A42] font-[500] bg-[#E1FFE2] sm:bg-[#EEF7FE]"
              } `}
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
    </div>
  );
}
