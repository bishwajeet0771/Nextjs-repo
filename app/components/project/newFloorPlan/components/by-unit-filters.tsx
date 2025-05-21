/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState, useRef, useEffect } from "react";
// import { getUniqueOptionsByKeys } from "../utils/generateuniqueoptions";
import { FaSearch, FaTimes } from "react-icons/fa";
import { propCgIdAtom } from "@/app/store/vewfloor";
import { useAtomValue } from "jotai";
import { projectprops } from "@/app/data/projectDetails";

type Props = {
  options: any;
  handleUnitFilterChange: (name: string, value: string) => void;
  filters: any;
  setFilters: any;
};

export default function ByUnitFilters({
  options,
  handleUnitFilterChange,
  filters,
  setFilters,
}: Props) {
  // console.log(options);
  // const [filters, setFilters] = useState({
  //   unitNumber: "",
  //   bhkName: "",
  //   towerName: "",
  //   floor: "",
  //   facingName: "",
  //   block: "",
  //   plotArea: "",
  //   length: "",
  //   width: "",
  // });

  const [backupFilters, setBackupFilters] = useState({
    unitNumber: "",
    bhkName: "",
    towerName: "",
    floor: "",
    facingName: "",
    block: "",
    plotArea: "",
    length: "",
    width: "",
  });

  const [focusedFilter, setFocusedFilter] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const propCgId = useAtomValue(propCgIdAtom);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const isClickInside = Object.values(dropdownRefs.current).some(
        (ref) => ref && ref.contains(event.target as Node)
      );
      if (!isClickInside) {
        setFocusedFilter(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredOptions = (key: keyof typeof filters) => {
    const filterValue =
      typeof filters[key] === "number"
        ? filters[key]
        : filters[key].toLowerCase();
    return (
      options &&
      options[key].filter((option: string | number) => {
        const optionValue = String(option).toLowerCase();
        return optionValue.includes(filterValue);
      })
    );
  };

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev: any) => ({ ...prev, [key]: String(value) }));
    setBackupFilters((prev) => ({ ...prev, [key]: String(value) }));
    handleUnitFilterChange(key.toString(), value);
  };

  const onSearchChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev: any) => ({ ...prev, [key]: String(value) }));
  };

  const onMouseOut = (key: keyof typeof filters, value: string) => {
    let data = filteredOptions(key);
    if (!data.includes(value)) {
      setFilters((prev: any) => ({
        ...prev,
        [key]: backupFilters[key as keyof typeof backupFilters],
      })); // [key]: backupFilters[key as keyof typeof backupFilters key] }));
    } else {
      handleFilterChange(key, value);
    }
  };

  const clearFilter = (key: keyof typeof filters) => {
    handleFilterChange(key, "");
  };

  const renderFilter = (key: keyof typeof filters, placeholder: string) => {
    const isFocused = focusedFilter === key;
    // console.log(filters)

    return (
      <div
        key={key.toString()}
        className="relative"
        ref={(el) => {
          if (el) dropdownRefs.current[key.toString()] = el;
        }}
      >
        <div className="relative">
          <input
            type="text"
            value={filters[key]}
            onChange={(e) => onSearchChange(key, e.target.value)}
            onFocus={() => setFocusedFilter(key.toString())}
            className="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0073C6]  w-full truncate"
            placeholder={placeholder}
            onBlur={(e) => onMouseOut(key, e.target.value)}
          />
          {filters[key] ? (
            <button
              onClick={() => clearFilter(key)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={`Clear ${key.toString()} filter`}
            >
              <FaTimes />
            </button>
          ) : (
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          )}
        </div>
        {isFocused && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            {filteredOptions(key).map((option: string) => (
              <li
                key={option}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  handleFilterChange(key, option);
                  setFocusedFilter(null);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  // console.log(options?.floor)

  return (
    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {options?.towerName &&
        (propCgId === projectprops.apartment ||
          propCgId === projectprops.villament) &&
        renderFilter("towerName", "Search Tower")}
      {options?.floor &&
        propCgId !== projectprops.plot &&
        renderFilter("floor", "Search Floor")}
      {options?.facingName && renderFilter("facingName", "Search Facing")}
      {options?.unitNumber && renderFilter("unitNumber", "Search Unit Number")}
      {options?.block &&
        propCgId === projectprops.apartment &&
        renderFilter("block", "Search Block")}
      {options?.bhkName &&
        propCgId !== projectprops.plot &&
        renderFilter("bhkName", "Search Unit Type")}
      {options?.plotArea &&
        propCgId === projectprops.plot &&
        renderFilter("plotArea", "Search Plot Area")}
      {options?.length &&
        propCgId === projectprops.plot &&
        renderFilter("length", "Search Length")}
      {options?.width &&
        propCgId === projectprops.plot &&
        renderFilter("width", "Search Width")}
    </div>
  );
}
