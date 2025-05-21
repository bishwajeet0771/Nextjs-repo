/* eslint-disable no-unused-vars */
import { SEARCH_FILTER_DATA } from "@/app/data/search";
import { useAtom } from "jotai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { projSearchStore } from "../../../store/newSearchProjectStore";
import useProjSearchAppliedFilters from "../../hooks/useProjSearchAppliedFilters";
// import { propertyDetailsTypes } from "@/app/data/projectDetails";

interface BHKTypeDropdownProps {
  selectedFilters: { [key: string]: string[] };
  toggleFilter: (category: string, value: string) => void;
  handleClear: (category: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function BHKTypeDropdown({
  handleClear,
  isOpen,
  onToggle,
}: BHKTypeDropdownProps) {
  const [state, dispatch] = useAtom(projSearchStore);
  const { handleApplyFilters, handleClearFilters } =
    useProjSearchAppliedFilters();
  const bhkDetailsMap = new Map(
    SEARCH_FILTER_DATA.bhkDetails.map((item) => [item.value, item.title])
  );

  return (
    <div className="relative">
      <button
        className={`flex items-center justify-between gap-2 px-4 py-2 border-2 min-w-[160px] ${
          state.bhk.length > 0
            ? "border-[#148B16] text-[#148B16] font-bold"
            : "border-[#0073C6] text-[#0073C6]"
        } rounded-full hover:bg-[#148B16]/5`}
        onClick={onToggle}
      >
        {/* Render BHK Types */}
        {state.bhk.length > 0 ? (
          <div className="flex items-center gap-0.5 max-w-[160px] overflow-hidden whitespace-nowrap">
            {state.bhk.slice(0, 3).map((item, i) => (
              <span key={item} className="mr-0.5">
                {bhkDetailsMap.get(item)}
                {/* Add a comma after each item except the last one */}
                {i < state.bhk.slice(0, 3).length - 1 && ", "}
              </span>
            ))}
            {state.bhk.length > 3 && <span>...</span>}
          </div>
        ) : (
          "Select BHK Type"
        )}

        <MdKeyboardArrowDown className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-[300px] md:w-[600px] bg-white rounded-lg shadow-lg border p-2 z-50">
          <div className="flex items-center justify-between gap-4 pb-4 border-b">
            <button
              onClick={() => handleClearFilters("bhk")}
              className="flex-1 text-gray-600 border-gray-300 hover:bg-gray-100"
            >
              Clear Filter
            </button>
            <button
              onClick={() => handleApplyFilters(() => onToggle())}
              className="flex-1 bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300"
            >
              Apply Filter
            </button>
          </div>
          <div className="w-full flex flex-wrap gap-2 mt-2">
            {SEARCH_FILTER_DATA.bhkDetails.map((bhk) => (
              <label
                key={bhk.value}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-[#148B16] focus:ring-[#148B16]"
                  checked={state.bhk.includes(bhk.value) || false}
                  onChange={() =>
                    dispatch({
                      type: "toggleArrayValue",
                      payload: {
                        key: "bhk",
                        value: bhk.value,
                      },
                    })
                  }
                />
                <span>{bhk.title}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
