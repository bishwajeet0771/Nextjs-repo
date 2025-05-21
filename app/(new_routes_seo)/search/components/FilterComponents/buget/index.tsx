``
import React from "react";
import { BasicBudgetSelect } from "./budget";
export function formatBudgetValue(value: number) {
  if (value < 1) {
    const lakhValue = value * 100;
    const formattedValue = lakhValue.toFixed(2).replace(/\.?0+$/, ""); // Removes extra zeros
    return `${formattedValue}L`;
  } else {
    const croreValue = value.toFixed(2).replace(/\.?0+$/, ""); // Removes extra zeros
    return `${croreValue}Cr`;
  }
}
export default function SearchProjBugdetFilter() {
  return (
    <div className="w-[330px] ">
   
      <div className="p-3 w-full h-full">
        {" "}
        <div className=" mb-[3%] px-5 gap-[4%]   ">
          <h3 className=" text-[#202020] mb-[2%] text-[14px] font-[600] mt-[3%] ">
            Budget (In Rupees)
          </h3>
          <BasicBudgetSelect />
        </div>
      </div>
    </div>
  );
}
