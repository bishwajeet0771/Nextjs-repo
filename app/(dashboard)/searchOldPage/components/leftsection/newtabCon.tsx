import React from "react";
import SortBy from "./SortBy";

const NewTabCon = ({
  onTabChange,
  selectedProtype,
  categoryType,
  Activities,
}: any) => {
  return (
    <div className="flex flex-row justify-between items-center  align-middle flex-wrap sm:flex-nowrap max-w-full gap-[3px] md:gap-3   bg-[#e7f5ff] shadow-md  px-4 sm:px-[1px] md:px-4 md:py-2.5;">
<div className="flex flex-row w-[80%] sm:w-auto justify-start items-center gap-2 flex-wrap md:gap-3">
  {categoryType.map((item: any, index: number) => (
    <React.Fragment key={item.value ?? "all"}>
      <button
        onClick={() => onTabChange(item.value)}
        className={`text-[14px] sm:text-[14px] font-[600] xl:text-base leading-0 font-montserrat cursor-pointer text-nowrap ${
   selectedProtype === item.value
            ? "text-blue-500 underline font-semibold md:font-bold"
            : "text-[#242424]"
        }`}
      >
        {item.label}
      </button>
 {index !== categoryType.length - 1 && <span>|</span>}
    </React.Fragment>
  ))}
    {/* <button
        onClick={() => onTabChange("All")}
        className={`text-[14px] sm:text-[14px] font-[600] xl:text-base leading-0 font-montserrat cursor-pointer text-nowrap ${
   selectedProtype === "All"
            ? "text-blue-500 underline font-semibold md:font-bold"
            : "text-[#242424]"
        }`}
      >
      All
      </button> */}
      </div>


      <div className="flex flex-row items-center gap-1 self-end justify-center ml-auto flex-wrap ">
        <h1 className="text-[12px] text-right sm:text-[14px] xl:text-base text-gray-400 font-semibold">
          Sort By:
        </h1>
        <SortBy typeProp={selectedProtype} ActivitiesType={Activities} />
      </div>
    </div>
  );
};

export default NewTabCon;
