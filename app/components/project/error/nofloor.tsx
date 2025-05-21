import { FloorPlanModalIcon } from "@/app/images/commonSvgs";
import React from "react";

export default function Nofloor() {
  return (
    <div className="flex justify-center items-center flex-col sm:h-[391px] ">
      <FloorPlanModalIcon />
      <p className="text-[#303030] sm:text-2xl not-italic font-medium leading-[normal] tracking-[0.96px] mt-4">
        No Floor Plan Selected
      </p>
      <p className="text-[#303030] text-center text-[12px] px-3 sm:px-0 sm:text-[15px] not-italic font-medium leading-[normal] tracking-[0.6px]">
        Please select any floor plan to view details or filter to see floor
        plans
      </p>
    </div>
  );
}
