/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from "react";
import { propCgIdAtom } from "@/app/store/vewfloor";
import { useAtomValue } from "jotai";
import { projectprops } from "@/app/data/projectDetails";
import FilterInput from "./filter-input";
import { PropertyUnit } from "../types/floor-plan";

type Props = {
  options: any;
  dataFilters: any;
  setDataFilters: any;
  showFilters: any;
  setShowFilters: any;
  filteredUnits: any;
  modalState?: any;
};

export default function PopupFilters({
  options,
  dataFilters,
  setDataFilters,
  showFilters,
  setShowFilters,
  filteredUnits,
}: Props) {
  const [filters, setFilters] = useState(dataFilters);
  const [backupFilters, setBackupFilters] = useState({
    unitNumber: "",
    bhkName: "",
    towerName: "",
    floor: "",
    facingName: "",
    block: "",
    plotArea: "",
    width: "",
    length: "",
    caretarea: "",
    superBuildUparea: "",
    totalNumberofBathroom: "",
    totalNumberOfBalcony: "",
    noOfCarParking: "",
    parkingType: "",
    terraceArea: "",
    totalBalconySize: "",
    aptTypeName: "",
    gardenArea: "",
    parkingArea: "",
  });

  const propCgId = useAtomValue(propCgIdAtom);

  const filteredOptions = (key: keyof typeof filters) => {
    const filterValue = String(filters[key]).toLowerCase();
    // console.log(filterValue, filters, key)
    return (
      options !== undefined &&
      options[key] !== undefined &&
      options[key].filter((option: string | number) => {
        const optionValue = String(option).toLowerCase();
        return optionValue.includes(filterValue);
      })
    );
  };

  function isActualNaN(value: any) {
    return value !== value;
  }

  const handleUnitFilterChange = (
    name: string | number | symbol,
    value: string | number
  ) => {
    if (name === "unitNumber" && value !== "") {
      const unitFilteredData = filteredUnits.filter(
        (item: any) => item.unitNumber === value
      );
      if (unitFilteredData && unitFilteredData.length > 0) {
        // setUnitFilters(unitFilteredData[0]);
        let data = {
          unitNumber: unitFilteredData[0].unitNumber
            ? unitFilteredData[0].unitNumber
            : "",
          bhkName: unitFilteredData[0].bhkName
            ? unitFilteredData[0].bhkName
            : "",
          towerName: unitFilteredData[0].towerName
            ? unitFilteredData[0].towerName
            : "",
          floor:
            unitFilteredData[0].floor !== null ? unitFilteredData[0].floor : "",
          facingName: unitFilteredData[0].facingName
            ? unitFilteredData[0].facingName
            : "",
          block:
            unitFilteredData[0].block !== null ? unitFilteredData[0].block : "",
          plotArea:
            unitFilteredData[0].plotArea !== null
              ? unitFilteredData[0].plotArea
              : "",
          length: unitFilteredData[0].length ? unitFilteredData[0].length : "",
          width: unitFilteredData[0].width ? unitFilteredData[0].width : "",
          parkingArea:
            unitFilteredData[0].parkingArea !== null
              ? unitFilteredData[0].parkingArea
              : "",
          gardenArea:
            unitFilteredData[0].gardenArea !== null
              ? unitFilteredData[0].gardenArea
              : "",
          parkingType: unitFilteredData[0].parkingType
            ? unitFilteredData[0].parkingType
            : "",
          terraceArea:
            unitFilteredData[0].terraceArea !== null
              ? unitFilteredData[0].terraceArea
              : "",
          caretarea: unitFilteredData[0].caretarea
            ? unitFilteredData[0].caretarea
            : "",
          superBuildUparea: unitFilteredData[0].superBuildUparea
            ? unitFilteredData[0].superBuildUparea
            : "",
          totalNumberofBathroom:
            unitFilteredData[0].totalNumberofBathroom !== null
              ? unitFilteredData[0].totalNumberofBathroom
              : "",
          totalNumberOfBalcony: unitFilteredData[0].totalNumberOfBalcony
            ? unitFilteredData[0].totalNumberOfBalcony
            : "",
          noOfCarParking: unitFilteredData[0].noOfCarParking
            ? unitFilteredData[0].noOfCarParking
            : "",
          totalBalconySize:
            unitFilteredData[0].totalBalconySize !== null
              ? unitFilteredData[0].totalBalconySize
              : "",
          aptTypeName: unitFilteredData[0].aptTypeName
            ? unitFilteredData[0].aptTypeName
            : "",
        };

        setDataFilters(data);
        setFilters(data);
        setBackupFilters(data);
      }
    } else {
      setDataFilters((prev: PropertyUnit) => ({
        ...prev,
        [name]: isActualNaN(value) ? "" : value,
      }));
    }
  };

  const handleFilterChange = (
    key: keyof typeof filters,
    value: string,
    type?: string
  ) => {
    setFilters((prev: any) => ({ ...prev, [key]: String(value) }));
    setBackupFilters((prev: any) => ({ ...prev, [key]: String(value) }));
    handleUnitFilterChange(key, value);
  };

  const onSearchChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev: any) => ({ ...prev, [key]: String(value) }));
  };

  const onMouseOut = (key: keyof typeof filters, value: string) => {
    let data = filteredOptions(key);
    if (data && !data.includes(value)) {
      setFilters((prev: { [key: string]: string }) => ({
        ...prev,
        [key]: backupFilters[key as keyof typeof backupFilters],
      }));
    } else {
      handleFilterChange(key, value);
    }
  };

  const clearFilters = () => {
    Object.keys(backupFilters).forEach((eachKey) => {
      handleFilterChange(eachKey, "", "C");
    });
  };

  const renderFilter = (
    key: keyof typeof filters,
    placeholder: string,
    title: string
  ) => {
    if (
      filteredOptions(key).length === 1 &&
      (filteredOptions(key)[0] == 0 || filteredOptions(key)[0] === "")
    ) {
      console.log(filteredOptions(key), key);
      return;
    }
    return (
      <div key={String(key) + "input"} className="relative mb-[10px]">
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="tower"
        >
          {title}
        </label>
        <FilterInput
          value={
            placeholder == "Select Floor"
              ? filters[key] == "0"
                ? "G"
                : filters[key]
              : filters[key] || ""
          }
          onChange={(value: any) => handleFilterChange(key, value)}
          options={filteredOptions(key)}
          placeholder={placeholder}
          onBlur={(value: any) => onMouseOut(key, value)}
          onSearchChange={(value: any) => onSearchChange(key, value)}
        />
      </div>
    );
  };

  const onApplyFilters = (identifier: string) => {
    setShowFilters(false);

    if (identifier == "A") {
      setDataFilters(backupFilters);
    } else {
      setBackupFilters(dataFilters);
    }
  };

  return (
    <div
      className={`${
        showFilters ? "absolute inset-0 z-20 bg-white" : "hidden"
      } md:relative md:block w-full md:w-64 border-r bg-[#F8FBFF] h-full`}
    >
      <div className="sticky top-0 z-10 bg-[#F8FBFF] p-3 border-b flex justify-between items-center">
        <h3 className="font-medium">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-[#0073C6] text-sm font-bold hover:underline"
        >
          Clear All
        </button>
      </div>

      <div className="h-[calc(100vh-120px)] overflow-y-auto p-3 custom-scrollbar">
        <div className="flex flex-col">
          {/* Basic Details */}
          {options?.aptTypeName &&
            options?.aptTypeName.length > 0 &&
            (propCgId === projectprops.apartment ||
              propCgId === projectprops.villament) &&
            renderFilter(
              "aptTypeName",
              propCgId === projectprops.apartment
                ? "Search Apartment type"
                : "Search Villament type",
              propCgId === projectprops.apartment
                ? "Apartment type"
                : "Villament type"
            )}

          {options?.towerName &&
            options?.towerName.length > 0 &&
            (propCgId === projectprops.apartment ||
              propCgId === projectprops.villament) &&
            renderFilter("towerName", "Search Tower", "Tower Name")}

          {options?.bhkName &&
            options?.bhkName.length > 0 &&
            propCgId !== projectprops.plot &&
            renderFilter("bhkName", "Select BHK Type", "BHK Type")}

          {options?.facingName &&
            options?.facingName.length > 0 &&
            renderFilter("facingName", "Select Facing", "Facing")}

          {options?.floor &&
            options?.floor.length > 0 &&
            propCgId !== projectprops.plot &&
            renderFilter(
              "floor",
              propCgId === projectprops.villa ||
                propCgId === projectprops.rowHouse
                ? "Select Elevation"
                : "Select Floor",
              propCgId === projectprops.villa ||
                propCgId === projectprops.rowHouse
                ? "At Elevation"
                : "At Floor"
            )}

          {options?.unitNumber &&
            options?.unitNumber.length > 0 &&
            renderFilter("unitNumber", "Select Unit Number", "Unit Number")}

          {options?.block &&
            options?.block.length > 0 &&
            propCgId === projectprops.apartment &&
            renderFilter("block", "Select Block", "Block")}

          {/* Area Details */}
          {options?.plotArea &&
            options?.plotArea.length > 0 &&
            propCgId !== projectprops.apartment &&
            propCgId !== projectprops.villament &&
            renderFilter("plotArea", "Select Plot Area", "Plot Area (sq.ft)")}

          {options?.caretarea &&
            options?.caretarea.length > 0 &&
            renderFilter(
              "caretarea",
              "Select Carpet Area",
              "Carpet Area (sq.ft)"
            )}

          {options?.superBuildUparea &&
            options?.superBuildUparea.length > 0 &&
            renderFilter(
              "superBuildUparea",
              "Select Super Built-up Area",
              "Super Built-up Area (sq.ft)"
            )}

          {options?.terraceArea &&
            options?.terraceArea.length > 0 &&
            renderFilter(
              "terraceArea",
              "Select Terrace Area",
              "Terrace Area (sq.ft)"
            )}

          {options?.gardenArea &&
            options?.gardenArea.length > 0 &&
            propCgId !== projectprops.apartment &&
            propCgId !== projectprops.plot &&
            renderFilter(
              "gardenArea",
              "Select Garden Area",
              "Garden Area (sq.ft)"
            )}

          {options?.parkingArea &&
            options?.parkingArea.length > 0 &&
            propCgId !== projectprops.apartment &&
            propCgId !== projectprops.plot &&
            renderFilter(
              "parkingArea",
              "Select Parking Area",
              "Parking Area (sq.ft)"
            )}

          {/* Unit Features */}
          {options?.totalNumberofBathroom &&
            options?.totalNumberofBathroom.length > 0 &&
            renderFilter(
              "totalNumberofBathroom",
              "Select Number of Bathrooms",
              "Number of Bathrooms"
            )}

          {options?.totalNumberOfBalcony &&
            options?.totalNumberOfBalcony.length > 0 &&
            renderFilter(
              "totalNumberOfBalcony",
              "Select Number of Balconies",
              "Number of Balconies"
            )}

          {options?.totalBalconySize &&
            options?.totalBalconySize.length > 0 &&
            propCgId === projectprops.villament &&
            renderFilter(
              "totalBalconySize",
              "Select Balconie Size",
              "Balconie Size"
            )}

          {options?.noOfCarParking &&
            options?.noOfCarParking.length > 0 &&
            renderFilter(
              "noOfCarParking",
              "Select Number of Car Parkings",
              "Number of Car Parkings"
            )}

          {options?.parkingType &&
            options?.parkingType.length > 0 &&
            (propCgId === projectprops.apartment ||
              propCgId === projectprops.villament) &&
            renderFilter("parkingType", "Select Parking Type", "Parking Type")}

          {/* Plot Dimensions */}
          {options?.length &&
            options?.length.length > 0 &&
            propCgId === projectprops.plot &&
            renderFilter("length", "Select Length", "Length")}

          {options?.width &&
            options?.width.length > 0 &&
            propCgId === projectprops.plot &&
            renderFilter("width", "Select Width", "Width")}
        </div>
      </div>

      {showFilters && (
        <div className="sticky bottom-0 bg-[#F8FBFF] p-3 border-t flex justify-between items-center gap-[4px] md:hidden">
          <button
            onClick={() => onApplyFilters("A")}
            className="w-[50%] p-2 bg-[#0073C6] text-white rounded-[4px]"
          >
            Apply Filters
          </button>
          <button
            onClick={() => onApplyFilters("C")}
            className="w-[50%] p-2 bg-white text-[#0073C6] font-bold border-solid border-[1px] border-[#0073C6] rounded-[4px]"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
