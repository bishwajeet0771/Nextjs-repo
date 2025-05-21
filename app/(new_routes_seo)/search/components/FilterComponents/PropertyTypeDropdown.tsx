/* eslint-disable no-unused-vars */
import { useAtom } from "jotai";
import {
  MdKeyboardArrowDown,
  MdApartment,
  MdHouse,
  MdVilla,
  MdMapsHomeWork,
  MdLandscape,
} from "react-icons/md";
import { projSearchStore } from "../../store/projSearchStore";
import useProjSearchAppliedFilters from "../../hooks/useProjSearchAppliedFilters";
import { propertyDetailsTypes } from "@/app/data/projectDetails";

interface PropertyTypeDropdownProps {
  selectedFilters: { [key: string]: string[] };
  toggleFilter: (category: string, value: string) => void;
  handleClear: (category: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function PropertyTypeDropdown({
  selectedFilters,
  toggleFilter,
  handleClear,
  isOpen,
  onToggle,
}: PropertyTypeDropdownProps) {
  const propertyIcons = {
    Apartment: {
      id: 35,
      icon: <MdApartment className="w-5 h-5 text-green-700" />,
    },
    "Row House": {
      id: 33,
      icon: <MdHouse className="w-5 h-5 text-green-700" />,
    },
    Villa: { id: 31, icon: <MdVilla className="w-5 h-5 text-green-700" /> },
    Villament: {
      id: 34,
      icon: <MdMapsHomeWork className="w-5 h-5 text-green-700" />,
    },
    Plot: { id: 32, icon: <MdLandscape className="w-5 h-5 text-green-700" /> },
  };
  const [state, dispatch] = useAtom(projSearchStore);
  const { handleApplyFilters, handleClearFilters } =
    useProjSearchAppliedFilters();
  return (
    <div className="relative">
      <button
        className={`flex items-center justify-between min-w-[160px] gap-2 px-4 py-2 border-2 ${
          state.propType
            ? "border-[#148B16] text-[#148B16] font-bold"
            : "border-[#0073C6] text-[#0073C6]"
        } rounded-full hover:bg-[#0073C6]/5`}
        onClick={onToggle}
      >
        {state.propType ? (
          <div className="flex items-center gap-2">
            {/* Green dot */}
            <span className="w-2.5 h-2.5 bg-[#148B16] rounded-full inline-block" />
            {/* Property Name */}
            <span>{propertyDetailsTypes?.get(state.propType)?.name}</span>
          </div>
        ) : (
          "Property Type"
        )}
        <MdKeyboardArrowDown className="w-5 h-5" />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border p-2 z-50">
          <div className="flex items-center justify-between gap-4 pb-4 border-b">
            <button
              onClick={() => handleClearFilters("unitType")}
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
          <div className="space-y-2">
            {Object.entries(propertyIcons).map(([type, data]) => (
              <label
                key={type}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer"
              >
                <input
                  type="radio"
                  className="rounded-full border-gray-300 text-green-700 checked:bg-green-700 checked:border-green-700"
                  checked={state.propType === data.id}
                  onChange={() =>
                    dispatch({
                      type: "update",
                      payload: {
                        propType: data.id,
                      },
                    })
                  }
                />
                {data.icon}
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
