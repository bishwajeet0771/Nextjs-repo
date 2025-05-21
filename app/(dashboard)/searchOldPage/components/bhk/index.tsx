import { SEARCH_FILTER_DATA } from "@/app/data/search";
import { Checkbox } from "@mantine/core";
import React from "react";
import ClearAll from "../ClearAll";
import useSearchFilters from "@/app/hooks/search";

export default function BhkFilter({ close }: { close?: () => void }) {
  const { filters, handleCheckboxClick } = useSearchFilters();
  return (
    <div className="max-w-[860px] ">
      <ClearAll type="unitType" close={close} />
      <div className="p-3">
        <h3 className="text-[#202020] mb-[2%] text-[14px] font-[600] ">
          BHK Type
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-2 gap-x-10">
          {SEARCH_FILTER_DATA.bhkDetails.map((eachItem) => (
            <Checkbox
              key={eachItem.value}
              color="green"
              checked={filters.unitTypes.includes(eachItem.value)}
              label={eachItem.title}
              onClick={() => handleCheckboxClick("unitTypes", eachItem.value)}
              styles={{
                root: {
                  minWidth: "fit-content",
                },
                label: {
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                },
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
