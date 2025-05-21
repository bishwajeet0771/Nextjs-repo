/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
// import { FaBuilding, FaHome, FaHotel, FaLandmark } from "react-icons/fa";
// import { TabItem } from "../types/floor-plan";
import { projectprops, propertyDetailsTypes } from "@/app/data/projectDetails";
import getIcon from "@/app/(new_routes_seo)/residential/projects/utils/icons";
import { useAtom } from "jotai";
import { currentPhaseAtom, propCgIdAtom } from "@/app/store/vewfloor";
import Button from "@/app/elements/button";

export function PropertyTabs({ types }: { types: any }) {
  const [selectedPhase] = useAtom(currentPhaseAtom);
  const [propCgId, setPropCgId] = useAtom(propCgIdAtom);
  const allKeys = [35, 33, 31, 34, 32];

  const checkProperty = (key: any) => {
    if (
      key == projectprops.apartment &&
      types != undefined &&
      types.includes("apt")
    ) {
      return true;
    } else if (
      key == projectprops.rowHouse &&
      types != undefined &&
      types.includes("rowHouse")
    ) {
      return true;
    } else if (
      key == projectprops.villa &&
      types != undefined &&
      types.includes("villa")
    ) {
      return true;
    } else if (
      key == projectprops.villament &&
      types != undefined &&
      types.includes("vlmt")
    ) {
      return true;
    } else if (
      key == projectprops.plot &&
      types != undefined &&
      types.includes("plot")
    ) {
      return true;
    }
  };

  useEffect(() => {
    let list: any = [];
    allKeys.forEach((each) => {
      if (checkProperty(each)) {
        list = [...list, each];
      }
    });
    setPropCgId(list.length > 0 ? list[0] : 35);
  }, [selectedPhase]);

  return (
    <div className=" flex justify-start items-start flex-wrap !mt-0 md:mt-[3%] gap-[10px] md:gap-[20px] ">
      {propertyDetailsTypes != undefined &&
        propertyDetailsTypes != null &&
        allKeys.map((keyName) => {
          let name =
            //@ts-ignore
            propertyDetailsTypes.get(keyName).name != undefined
              ? //@ts-ignore
                propertyDetailsTypes.get(keyName).name
              : null;

          if (checkProperty(keyName)) {
            return (
              <Button
                key={keyName}
                buttonClass={`flex justify-start mb-2 sm:mb-[3%] w-full rounded-[20px] gap-[8px]  items-center mr-[24px] md:ml-[0px] text-[12px] sm:text-[18px] border ${
                  propCgId == keyName
                    ? "text-[#001F35] text-[14px] sm:text-base font-[600] shadow-md bg-[#c8f5ca] sm:bg-[#D5EDFF]"
                    : "text-[#303A42] font-[500] bg-[#E1FFE2] sm:bg-[#EEF7FE]"
                } `}
                onChange={() => {
                  setPropCgId(keyName);
                }}
                title={name}
                icon={getIcon(keyName)}
              />
            );
          }
        })}
    </div>
  );
}
