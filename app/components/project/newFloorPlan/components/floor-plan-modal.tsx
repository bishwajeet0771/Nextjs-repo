/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
"use client";

import { ImgNotAvail } from "@/app/data/project";
import { useEffect, useState } from "react";
import {
  FaTimes,
  FaCompass,
  FaCar,
  FaBuilding,
  FaChevronLeft,
  FaChevronRight,
  FaBath,
  FaHome,
  FaStoreAlt,
} from "react-icons/fa";
import { FaExpand, FaRuler, FaTree } from "react-icons/fa6";
import { useAtomValue } from "jotai";
import { propCgIdAtom } from "@/app/store/vewfloor";
import { projectprops, propertyDetailsTypes } from "@/app/data/projectDetails";
import PopupFilters from "./PopupFilters";

import { PropertyUnit } from "../types/floor-plan";
import Image from "next/image";
import { formatNumberWithCommas } from "@/app/seo/sitemap/const";
import { useMediaQuery } from "@mantine/hooks";

interface FloorPlanModalProps {
  modalState: any;
  onClose: () => void;
  units: PropertyUnit[];
  initialUnit: any;
  filters: Partial<PropertyUnit>;
  setFilters: (filters: any) => void;
  filteredUnits: PropertyUnit[];
  options: Record<keyof PropertyUnit, string[]> | Record<string, never>;
  handleOpenFullScreenModal: (unit: PropertyUnit) => void;
  handleReqcallBack: any;
}

type Props = {
  title: string;
  value: any;
  icon: any;
};
const DataItem = ({ title, value, icon }: Props) => {
  if (value === "" || value === "0" || value === 0) return;

  return (
    <div className="flex items-center gap-2 sm:gap-4 bg-[#F8FBFF] p-2 sm:p-3 rounded-lg">
      <div className="bg-[#ECF7FF] p-1.5 sm:p-2 rounded-lg">{icon}</div>
      <div>
        <p className="text-[#4D6677] text-xs sm:text-sm font-medium">{title}</p>
        <p className="text-[#303A42] text-sm sm:text-base font-semibold">
          {value}
        </p>
      </div>
    </div>
  );
};

export function FloorPlanModal({
  modalState,
  onClose,
  units,
  initialUnit,
  filters,
  setFilters,
  filteredUnits: propFilteredUnits,
  options,
  handleOpenFullScreenModal,
  handleReqcallBack,
}: FloorPlanModalProps) {
  const [currentUnit, setCurrentUnit] = useState(initialUnit);
  const [filteredUnits, setFilteredUnits] = useState(
    propFilteredUnits ? propFilteredUnits : []
  );

  const { isOpen, unit } = modalState;

  const [currentPage, setCurrentPage] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = {
    sm: 2,
    md: 4,
    lg: 8,
  };

  //this content ios and anirod
  const [platform, setPlatform] = useState("");
  const isMobile = useMediaQuery("(max-width: 768px)");
  // console.log(currentUnit.noOfCarParking)

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipod/.test(userAgent)) {
      setPlatform("iOS");
    } else if (/android/.test(userAgent)) {
      setPlatform("Android");
    } else {
      setPlatform("Unknown");
    }
  }, []);
  // console.log(platform);

  const propCgId = useAtomValue(propCgIdAtom);

  const getItemsPerPage = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return itemsPerPage.sm;
      if (window.innerWidth < 1024) return itemsPerPage.md;
      return itemsPerPage.lg;
    }
    return itemsPerPage.lg;
  };

  // Function to ensure the current unit is visible in the carousel
  const ensureUnitVisible = (unit: PropertyUnit) => {
    const unitIndex = filteredUnits.findIndex(
      (u) => u.unitIdEnc === unit.unitIdEnc
    );
    const itemsPerPageCount = getItemsPerPage();
    const targetPage = Math.floor(unitIndex / itemsPerPageCount);
    setCurrentPage(targetPage);
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevUnit = () => {
    let curIndex = filteredUnits.findIndex(
      (unit) => unit.unitIdEnc === currentUnit.unitIdEnc
    );
    const prevIndex =
      (curIndex - 1 + filteredUnits.length) % filteredUnits.length;

    const nextUnit = filteredUnits[prevIndex];
    setCurrentUnit(nextUnit);
    ensureUnitVisible(nextUnit);
    setCurrentIndex(curIndex - 1);
    // console.log(curIndex - 1, filteredUnits.length);
  };

  const handleNextUnit = () => {
    let curIndex = filteredUnits.findIndex(
      (unit) => unit.unitIdEnc === currentUnit.unitIdEnc
    );
    const nextIndex = (curIndex + 1) % filteredUnits.length;

    const nextUnit = filteredUnits[nextIndex];
    setCurrentUnit(nextUnit);
    ensureUnitVisible(nextUnit);
    setCurrentIndex(curIndex + 1);
    // console.log(curIndex + 1, filteredUnits.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrevUnit();
      } else if (e.key === "ArrowRight") {
        handleNextUnit();
      }
    };

    const handlePopState = () => {
      onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      window.addEventListener("popstate", handlePopState);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handlePopState);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, currentUnit]);

  useEffect(() => {
    if (propFilteredUnits && propFilteredUnits.length > 0) {
      setFilteredUnits(propFilteredUnits);
      setCurrentUnit(propFilteredUnits[0]); // Set first filtered unit as current
      setCurrentIndex(0); // Reset current index
      setCurrentPage(0); // Reset page
    }
  }, [propFilteredUnits]);

  useEffect(() => {
    if (filteredUnits.length > 0) {
      ensureUnitVisible(filteredUnits[0]);
    }
  }, [filteredUnits]);

  if (!isOpen) return null;
  const mainImageUrl = currentUnit?.floorPlanUrl?.split(",")[0] || ImgNotAvail;
  const totalPages =
    filteredUnits && filteredUnits.length
      ? Math.ceil(filteredUnits.length / getItemsPerPage())
      : 0;
  const startIndex = currentPage * getItemsPerPage();
  const visibleUnits = filteredUnits
    ? filteredUnits.slice(startIndex, startIndex + getItemsPerPage())
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full h-full bg-white overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-start md:items-center justify-between flex-col md:flex-row p-2 border-b bg-white relative">
          <h3 className="text-lg md:text-xl font-semibold text-[#0073C6] text-nowrap w-[calc(100vw-30px)] ">
            {`${
              propCgId !== projectprops.plot
                ? currentUnit.bhkName
                : `(${currentUnit.length} X ${
                    currentUnit.width
                  }) ${formatNumberWithCommas(currentUnit.plotArea)} sq.ft`
            } - 
            ${
              propertyDetailsTypes && propertyDetailsTypes.get(propCgId)
                ? propertyDetailsTypes?.get(propCgId)?.name
                : ""
            } - 
            Unit ${currentUnit.unitNumber}`}
          </h3>
          <div className="flex gap-2 mt-[10px] md:mt-0">
            <button
              onClick={() => handleReqcallBack(unit)}
              className="px-[8px] py-[2px] md:px-4 md:py-2 bg-[#0073C6] text-white rounded-lg hover:bg-[#005a9e] transition-colors text-nowrap"
            >
              Request Quotation
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden p-2 rounded-full bg-[#ECF7FF] text-[#0073C6]"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors absolute md:relative right-[10px] top-[10px] md:right-0 md:top-0 "
            >
              <FaTimes className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex h-[calc(100vh-48px)]">
          {/* Left Side - Filters */}
          <PopupFilters
            // handleUnitFilterChange={handleFilterChange}
            options={options}
            dataFilters={filters}
            setDataFilters={setFilters}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            filteredUnits={filteredUnits}
            modalState={modalState}
          />

          {/* Center - Floor Plan and Details */}
          <div className="flex-1 flex flex-col overflow-y-auto md:overflow-hidden pb-[50px]">
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-[10px] md:p-4 overflow-y-auto">
              {/* Floor Plan Image */}
              <div className="bg-white rounded-xl shadow-lg p-[10px] md:p-4">
                <div className="h-full flex flex-col">
                  <div
                    className="flex-1 relative"
                    onClick={() => handleOpenFullScreenModal(currentUnit)}
                  >
                    <Image
                      src={mainImageUrl}
                      width={800}
                      height={600}
                      alt={`Floor Plan for ${currentUnit.bhkName}`}
                      className="w-full h-full max-h-[300px] sm:max-h-[600px] object-contain cursor-pointer"
                    />
                    <button
                      // onClick={() => handleOpenFullScreenModal(currentUnit)}
                      className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <FaExpand className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleOpenFullScreenModal(currentUnit)}
                    className=" sm:hidden underline text-right  text-base sm:text-lg font-semibold text-blue-500  p-1  bg-white  right-0"
                  >
                    View All Details
                  </button>
                  {filteredUnits.length > 2 && (
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={handlePrevUnit}
                        disabled={currentIndex === 0}
                        className={`flex items-center gap-2 px-4 py-2 bg-[#ECF7FF] text-[#0073C6] rounded-lg ${
                          currentIndex === 0
                            ? " cursor-not-allowed "
                            : "hover:bg-[#0073C6] hover:text-white"
                        }`}
                      >
                        <FaChevronLeft />
                        <span className="hidden sm:inline">Previous</span>
                      </button>
                      <button
                        onClick={handleNextUnit}
                        disabled={currentIndex === filteredUnits.length - 1}
                        className={`flex items-center gap-2 px-4 py-2 bg-[#ECF7FF] text-[#0073C6] rounded-lg ${
                          currentIndex === filteredUnits.length - 1
                            ? "cursor-not-allowed"
                            : "hover:bg-[#0073C6] hover:text-white"
                        }`}
                      >
                        <span className="hidden sm:inline">Next</span>
                        <FaChevronRight />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Unit Details */}
              <div className="bg-white p-3 sm:p-6 rounded-xl shadow-lg space-y-3 sm:space-y-6 h-[calc(100vh-300px)] md:h-auto overflow-y-auto !pt-0 ">
                <h4 className="text-base sm:text-lg font-semibold text-[#303A42] border-b pb-2 sticky top-0 bg-white pt-3 sm:pt-6">
                  Area Details
                </h4>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  {propCgId !== projectprops.plot && (
                    <DataItem
                      title="Super Built-up Area"
                      value={`${formatNumberWithCommas(
                        currentUnit.superBuildUparea
                      )} sq.ft`}
                      icon={
                        <FaRuler className="text-[#0073C6] text-xl sm:text-2xl" />
                      }
                    />
                  )}

                  {propCgId !== projectprops.plot && (
                    <DataItem
                      title="Carpet Area"
                      value={`${formatNumberWithCommas(
                        currentUnit.caretarea
                      )} sq.ft`}
                      icon={
                        <FaRuler className="text-[#0073C6] text-xl sm:text-2xl" />
                      }
                    />
                  )}

                  {(propCgId === projectprops.apartment ||
                    propCgId === projectprops.villament) && (
                    <DataItem
                      title="Tower"
                      value={currentUnit.towerName}
                      icon={
                        <FaHome className="text-[#0073C6] text-xl sm:text-2xl" />
                      }
                    />
                  )}

                  {propCgId !== projectprops.plot && (
                    <DataItem
                      title={
                        propCgId === projectprops.rowHouse ||
                        propCgId === projectprops.villa
                          ? "Elevation"
                          : "Floor"
                      }
                      value={
                        currentUnit.floor === 0
                          ? "Ground Floor"
                          : `${currentUnit.floor}${(() => {
                              const suffixes = ["th", "st", "nd", "rd"];
                              const v = currentUnit.floor % 100;
                              return (
                                suffixes[(v - 20) % 10] ||
                                suffixes[v] ||
                                suffixes[0]
                              );
                            })()} ${
                              propCgId === projectprops.rowHouse ||
                              propCgId === projectprops.villa
                                ? "Elevation"
                                : "Floor"
                            }`
                      }
                      icon={
                        <FaBuilding className="text-[#0073C6] text-xl sm:text-2xl" />
                      }
                    />
                  )}

                  {propCgId === projectprops.plot && (
                    <DataItem
                      title="Length"
                      value={`${formatNumberWithCommas(currentUnit.length)} ft`}
                      icon={
                        <FaRuler className="text-[#0073C6] text-xl sm:text-2xl" />
                      }
                    />
                  )}

                  {propCgId === projectprops.plot && (
                    <DataItem
                      title="Width"
                      value={`${formatNumberWithCommas(currentUnit.width)} ft`}
                      icon={
                        <FaRuler className="text-[#0073C6] text-xl sm:text-2xl" />
                      }
                    />
                  )}

                  {propCgId !== projectprops.apartment &&
                    propCgId !== projectprops.villament && (
                      <DataItem
                        title="Plot Area"
                        value={`${formatNumberWithCommas(
                          currentUnit.plotArea
                        )} sq.ft`}
                        icon={
                          <FaTree className="text-[#0073C6] text-xl sm:text-2xl" />
                        }
                      />
                    )}

                  {propCgId !== projectprops.apartment &&
                    propCgId !== projectprops.plot &&
                    currentUnit.gardenArea && (
                      <DataItem
                        title="Garden Area"
                        value={`${formatNumberWithCommas(
                          currentUnit.gardenArea
                        )} sq.ft`}
                        icon={
                          <FaTree className="text-[#0073C6] text-xl sm:text-2xl" />
                        }
                      />
                    )}

                  {currentUnit.terraceArea &&
                    currentUnit.terraceArea !== "null" && (
                      <DataItem
                        title="Terrace Area"
                        value={`${formatNumberWithCommas(
                          currentUnit.terraceArea
                        )} sq.ft`}
                        icon={
                          <FaTree className="text-[#0073C6] text-xl sm:text-2xl" />
                        }
                      />
                    )}

                  {propCgId !== projectprops.apartment &&
                    propCgId !== projectprops.plot &&
                    currentUnit.parkingArea && (
                      <DataItem
                        title="Parking Area"
                        value={`${formatNumberWithCommas(
                          currentUnit.parkingArea
                        )} sq.ft`}
                        icon={
                          <FaTree className="text-[#0073C6] text-xl sm:text-2xl" />
                        }
                      />
                    )}
                </div>

                <h4 className="text-base sm:text-lg font-semibold text-[#303A42] border-b pb-2 mt-3 sm:mt-6 sticky top-[48px] bg-white">
                  Unit Features
                </h4>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  {(propCgId === projectprops.apartment ||
                    propCgId === projectprops.villament) && (
                    <DataItem
                      title={
                        propCgId === projectprops.apartment
                          ? "Apartment Type"
                          : "Villament Type"
                      }
                      value={
                        currentUnit.aptTypeName
                          ? currentUnit.aptTypeName
                          : propCgId === projectprops.apartment
                          ? "Apartment"
                          : "Villament"
                      }
                      icon={
                        <FaHome className="text-[#0073C6] text-xl sm:text-2xl" />
                      }
                    />
                  )}

                  {propCgId !== projectprops.plot && (
                    <DataItem
                      title="Unit Type"
                      value={currentUnit.bhkName}
                      icon={
                        <FaStoreAlt className="text-[#0073C6] text-xl sm:text-2xl" />
                      }
                    />
                  )}

                  <DataItem
                    title="Facing"
                    value={currentUnit.facingName}
                    icon={
                      <FaCompass className="text-[#0073C6] text-xl sm:text-2xl" />
                    }
                  />

                  {propCgId !== projectprops.plot && (
                    <DataItem
                      title="Bathrooms"
                      value={currentUnit.totalNumberofBathroom}
                      icon={
                        <FaBath className="text-[#0073C6] text-xl sm:text-2xl" />
                      }
                    />
                  )}

                  {propCgId !== projectprops.plot && (
                    <DataItem
                      title="Balconies"
                      value={currentUnit.totalNumberOfBalcony}
                      icon={
                        <FaHome className="text-[#0073C6] text-xl sm:text-2xl" />
                      }
                    />
                  )}

                  {propCgId !== projectprops.plot &&
                    currentUnit.totalBalconySize && (
                      <DataItem
                        title="Balcony Size"
                        value={`${currentUnit.totalBalconySize} sq.ft`}
                        icon={
                          <FaHome className="text-[#0073C6] text-xl sm:text-2xl" />
                        }
                      />
                    )}

                  {propCgId !== projectprops.plot && (
                    <DataItem
                      title="Car Parking"
                      value={`${currentUnit.noOfCarParking} ${
                        currentUnit.parkingType &&
                        currentUnit.parkingType != "None"
                          ? currentUnit.parkingType
                          : ""
                      }`}
                      icon={
                        <FaCar className="text-[#0073C6] text-xl sm:text-2xl" />
                      }
                    />
                  )}

                  {propCgId === projectprops.apartment && currentUnit.block && (
                    <DataItem
                      title="Block"
                      value={currentUnit.block}
                      icon={
                        <FaHome className="text-[#0073C6] text-xl sm:text-2xl" />
                      }
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Carousel */}
            {visibleUnits && visibleUnits.length > 0 && (
              <div
                className={`${
                  platform == "iOS" ? "mb-28" : ""
                }  pb-[30px] sm:pb-[10px]  border-t bg-white p-[10px] md:p-4`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-semibold">
                    Filtered Units ({filteredUnits ? filteredUnits.length : 0})
                  </h4>
                  {visibleUnits && visibleUnits.length > 1 && (
                    <div className="flex gap-1">
                      <button
                        onClick={handlePrevUnit}
                        disabled={currentIndex === 0}
                        className={`p-1 rounded-lg bg-[#ECF7FF] text-[#0073C6] disabled:opacity-50 ${
                          currentIndex === 0 ? "cursor-not-allowed " : ""
                        }`}
                      >
                        <FaChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleNextUnit}
                        disabled={currentIndex === filteredUnits.length - 1}
                        className={`p-1 rounded-lg bg-[#ECF7FF] text-[#0073C6] disabled:opacity-50 ${
                          currentIndex === filteredUnits.length - 1
                            ? "cursor-not-allowed "
                            : ""
                        }`}
                      >
                        <FaChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 scroll-smooth ">
                  {visibleUnits.map((unit) => (
                    <button
                      key={unit.unitIdEnc}
                      onClick={() => setCurrentUnit(unit)}
                      className={`flex flex-col items-start p-2 border rounded-md ${
                        currentUnit.unitIdEnc === unit.unitIdEnc
                          ? "bg-[#0073C6] text-white"
                          : "bg-white hover:bg-gray-50"
                      }`}
                    >
                      <Image
                        width={800}
                        height={600}
                        src={unit?.floorPlanUrl?.split(",")[0] ?? ImgNotAvail}
                        alt={`Thumbnail for ${unit.bhkName}`}
                        className="w-full aspect-video object-cover rounded-md mb-1"
                      />
                      <span className="text-xs font-semibold">
                        {unit.bhkName}
                      </span>
                      <span className="text-xs">Unit {unit.unitNumber}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
