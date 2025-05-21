/* eslint-disable no-unused-vars */
import { useAtom } from "jotai";
import React, { useMemo } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { projSearchStore } from "../../store/projSearchStore";
import useProjSearchAppliedFilters from "../../hooks/useProjSearchAppliedFilters";

type Props = {
  openDropdown: string | null;
  handleDropdownToggle: (dropdownName: string) => void;
  frontendFilters?: Record<string, any>;
};

export default function BuyRent({
  openDropdown,
  handleDropdownToggle,
  frontendFilters,
}: Props) {
  const [state, dispatch] = useAtom(projSearchStore);
  const { handleApplyFilters } = useProjSearchAppliedFilters();
  const cg = useMemo(() => {
    if (state.cg === undefined) {
      return frontendFilters?.cg;
    }
    return state.cg === frontendFilters?.cg ? frontendFilters.cg : state.cg;
  }, [state, frontendFilters]);
  const handleValueChange = (value: string) => {
    dispatch({
      type: "update",
      payload: {
        cg: value,
        bugdetValue: value === "R" ? [0, 100000] : [500000, 600000000],
      },
    });
    handleApplyFilters(() => handleDropdownToggle("buy"));
  };
  return (
    <div className="relative m-1">
      <button
        className="flex items-center gap-2 px-[6px] py-[4px] xl:px-4 xl:py-2  bg-[#0073C6] text-white rounded-full hover:bg-[#0073C6]/90 transition-colors"
        onClick={() => handleDropdownToggle("buy")}
      >
        {cg === "R" ? "Rent" : "Buy"}
        <MdKeyboardArrowDown className="w-5 h-5" />
      </button>
      {openDropdown === "buy" && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border p-2 z-50">
          <div className="space-y-2">
            {[
              { value: "S", label: "Buy" },
              { value: "R", label: "Rent" },
            ].map((option) => (
              <button
                key={option.value}
                className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                onClick={() => handleValueChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
