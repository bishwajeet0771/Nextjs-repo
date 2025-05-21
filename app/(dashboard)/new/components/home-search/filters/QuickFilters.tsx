import React from "react";

// import { BasicSelect } from "./Select";
// import { BasicBudgetSelect } from "./BugdetSelect";
// import { BasicMultiSelect } from "./BhkTypeSelect";
import { SelectField } from "./SelectField";
import { CustomBhkTypeSelect } from "./CustomBhkTypeSelect";
import { CustomBugdetSelect } from "./CustomBugdetSelect";
type Props = {};

export default function QuickFilters({}: Props) {
  return (
    <div className="flex  flex-col mt-2 sm:mt-0  items-start gap-2.5 rounded p-1.5 sm:border-[0.5px] border-solid border-[#819CA9] bg-white">
      <div className="text-[#242424] flex-wrap text-[12px] xl:text-[15px] not-italic font-normal flex sm:justify-center items-center gap-2">
        <div className="min-w-full sm:min-w-fit">Quick Filter: {"  "}</div>{" "}
        {/* <BasicSelect /> */}
        <SelectField />
        <div className="order-1 sm:order-none">
          {/* <BasicMultiSelect /> */}
          <CustomBhkTypeSelect />
        </div>
        {/* <BasicBudgetSelect /> */}
        <CustomBugdetSelect />
      </div>
    </div>
  );
}
