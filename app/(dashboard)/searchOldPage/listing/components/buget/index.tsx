// import { SEARCH_FILTER_DATA } from "@/app/data/search";
// import { Checkbox, RangeSlider } from "@mantine/core";
import React from "react";
import ClearAll from "../ClearAll";
// import { propertyDetailsTypes } from "@/app/data/projectDetails";
// import useSearchFilters from "@/app/hooks/search";
// import { formatBudgetValue } from "../../../components/buget";
import { BasicBudgetSelect } from "../../../components/buget/budget";

export default function BugdetFilter({ close }: { close: () => void }) {
  return (
    <div className="w-[320px] ">
      <ClearAll type="price" close={close} />
      <div className="p-3 w-full h-full">
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
