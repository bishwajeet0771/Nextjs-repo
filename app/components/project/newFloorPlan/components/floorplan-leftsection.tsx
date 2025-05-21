/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  FaArrowRight,
  FaBath,
  FaBed,
  FaBuilding,
  FaCompass,
} from "react-icons/fa";
import { BiBuildingHouse } from "react-icons/bi";
import { MdBalcony } from "react-icons/md";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";
import { projectprops } from "@/app/data/projectDetails";
import { PropertyUnit } from "../types/floor-plan";
import { useMediaQuery } from "@mantine/hooks";
import { formatNumberWithCommas } from "@/app/seo/sitemap/const";
import { useAtom } from "jotai";
import { currentPhaseAtom } from "@/app/store/vewfloor";

type Props = {
  units: any;
  isLoading: boolean;
  onSelectCard: any;
  handleReqcallBack: (unit: PropertyUnit) => void;
  getRightsideData: any;
  selectedBHK: any;
  propCgId: any;
};

export default function FloorplanLeftsection({
  units,
  isLoading,
  onSelectCard,
  handleReqcallBack,
  getRightsideData,
  selectedBHK,
  propCgId

}: Props) {
  const parentRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const rowVirtualizer = useVirtualizer({
    count: units?.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => (isMobile ? 175 : 270), // Adjust based on your card's average height
    overscan: 5,
  });
  const [selectedPhase] = useAtom(currentPhaseAtom);

  const dataList = rowVirtualizer.getVirtualItems();

  useEffect(()=>{
    if(dataList && dataList.length > 0 && dataList[0] !== undefined){
      const unit = units[dataList[0].index];
      getRightsideData(unit);
    }
  }, [dataList, selectedBHK, selectedPhase, propCgId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }




  return (
    <div
      ref={parentRef}
      className="space-y-3 w-full md:w-[50%] sm:space-y-4 max-h-[350px] sm:max-h-[500px] md:max-h-[600px] overflow-y-auto px-0 md:px-2 sm:px-4"
    >
      {dataList && dataList.length > 0 ? (
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {dataList.map((virtualRow) => {
            const unit = units[virtualRow.index];

            return (
              <div
                key={virtualRow.index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <button
                  onClick={() => onSelectCard(unit)}
                  className="w-full rounded-lg sm:rounded-xl border border-gray-200 sm:border-2 p-2 sm:p-4 transition-all hover:border-[#0073C6] hover:shadow-xl group from-[#F8FAFC] to-white"
                >
                  {/* Header Section */}
                  <div className="flex flex-col items-start justify-between border-b border-gray-100 pb-2 sm:pb-4">
                    <div className="flex justify-between items-start w-full">
                      <div className="flex flex-wrap items-center gap-1 md:gap-2 mb-2">
                        <h3 className="text-[14px] xs:text-[16px] sm:text-[18px] md:text-[20px] xl:text-[24px] font-bold text-[#232323]">
                          {unit.propType === projectprops.plot
                            ? `${unit.length} ft x ${unit.width} ft`
                            : unit.bhkName}
                        </h3>
                        {unit.aptTypeName && unit.aptTypeName !== "" && (
                          <span className="px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 text-[10px] xs:text-xs sm:text-sm font-semibold bg-blue-50 text-[#0073C6] rounded-full">
                            {unit.aptTypeName}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap justify-between w-[60%] sm:w-auto gap-2 xs:gap-4 md:mt-2 sm:mt-0">
                        {unit.superBuildUparea !== null && (
                          <div className="space-y-0.5 xs:space-y-1">
                            <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500 font-medium">
                              {unit.propType === projectprops.plot
                                ? "Plot Area"
                                : "Super Built-up Area"}
                            </p>
                            <p className="text-[14px] xs:text-lg sm:text-xl text-gray-900 font-bold">
                              {unit.propType === projectprops.plot
                                ? `${formatNumberWithCommas(unit.plotArea)} sq.ft`
                                : `${formatNumberWithCommas(unit.superBuildUparea)} sq.ft`} 
                            </p>
                          </div>
                        )}
                        {unit.facingName !== null && (
                          <div className="space-y-0.5 xs:space-y-1">
                            <div className="flex items-center gap-1">
                              <FaCompass className="text-[#0073C6] text-sm xs:text-base sm:text-lg" />
                              <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500 font-medium">
                                Facing
                              </p>
                            </div>
                            <p className="text-[14px] xs:text-lg sm:text-xl text-gray-900 font-bold">
                              {unit.facingName}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 xs:gap-2 w-full text-[10px] xs:text-sm sm:text-base text-gray-600">
                      {unit.towerName !== null &&
                        unit.towerName !== "" &&
                        (unit.propType === projectprops.apartment ||
                          unit.propType === projectprops.villament) && (
                          <div className="flex items-center bg-gray-100 rounded-full px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1">
                            <FaBuilding className="text-[#0073C6] mr-1 xs:mr-1 sm:mr-2 text-xs xs:text-sm" />
                            <p className="font-semibold first-letter:capitalize">{unit.towerName == "defaultTower" ? "Default Tower" : unit.towerName }</p>
                          </div>
                        )}
                      {unit.floor !== undefined &&
                        unit.propType !== projectprops.plot && (
                          <div className="flex items-center bg-gray-100 rounded-full px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1">
                            <BiBuildingHouse className="text-[#0073C6] mr-1 xs:mr-1 sm:mr-2 text-xs xs:text-sm" />
                            <p className="font-semibold first-letter:capitalize">
                              {(unit.propType === projectprops.villa || unit.propType === projectprops.rowHouse) ? "Elevation" : "Floor"} {unit.floor === 0 ? "G" : unit.floor}
                            </p> 
                          </div>
                        )}
                      {unit.unitNumber !== null && (
                        <div className="flex items-center bg-gray-100 rounded-full px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1">
                          <FaBed className="text-[#0073C6] mr-1 xs:mr-1 sm:mr-2 text-xs xs:text-sm" />
                          <p className="font-semibold first-letter:capitalize">
                            Unit: {unit.unitNumber}
                          </p>
                        </div>
                      )}
                        {unit.block && unit.propType === projectprops.apartment && (
                        <div className="flex items-center bg-gray-100 rounded-full px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1">
                            <FaBuilding className="text-[#0073C6] mr-1 xs:mr-1 sm:mr-2 text-xs xs:text-sm" />
                            <p className="font-semibold first-letter:capitalize">
                            {unit.block}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="flex justify-around gap-1 bg-gray-50 rounded-lg p-1.5 xs:p-2">
                    {unit.totalNumberofBathroom !== null &&
                      unit.propType !== projectprops.plot && (
                        <div className="flex items-center gap-1 xs:gap-2">
                          <FaBath className="text-[#0073C6] text-lg xs:text-xl sm:text-2xl" />
                          <div>
                            <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500 font-medium">
                              Bathrooms
                            </p>
                            <p className="text-sm xs:text-base sm:text-lg font-bold">
                              {unit.totalNumberofBathroom}
                            </p>
                          </div>
                        </div>
                      )}
                    {unit.totalNumberOfBalcony !== null &&
                      unit.propType !== projectprops.plot && (
                        <div className="flex items-center gap-1 xs:gap-2">
                          <MdBalcony className="text-[#0073C6] text-lg xs:text-xl sm:text-2xl" />
                          <div>
                            <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500 font-medium">
                              Balconies
                            </p>
                            <p className="text-sm xs:text-base sm:text-lg font-bold">
                              {unit.totalNumberOfBalcony}
                            </p>
                          </div>
                        </div>
                      )}
                    {unit.caretarea !== null && unit.caretarea !== "" &&
                      unit.propType !== projectprops.plot && (
                        <div className="flex items-center gap-1 xs:gap-2">
                          <MdBalcony className="text-[#0073C6] text-lg xs:text-xl sm:text-2xl" />
                          <div>
                            <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500 font-medium">
                              Carpet Area
                            </p>
                            <p className="text-sm xs:text-base sm:text-lg font-bold">
                              {formatNumberWithCommas(unit.caretarea)} sq.ft
                            </p>
                          </div>
                        </div>
                      )}

                    {unit.gardenArea && unit.gardenArea !== "" &&
                      unit.gardenArea !== "null" &&
                      unit.propType !== projectprops.plot && (
                        <div className="flex items-center gap-1 xs:gap-2">
                          <BiBuildingHouse className="text-[#0073C6] text-lg xs:text-xl sm:text-2xl" />
                          <div>
                            <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500 font-medium">
                              Garden Area
                            </p>
                            <p className="text-sm xs:text-base sm:text-lg font-bold">
                              {formatNumberWithCommas(unit.gardenArea)} sq.ft
                            </p>
                          </div>
                        </div>
                      )}
                    {unit.length && unit.propType === projectprops.plot && (
                      <div className="flex items-center gap-1 xs:gap-2">
                        <MdBalcony className="text-[#0073C6] text-lg xs:text-xl sm:text-2xl" />
                        <div>
                          <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500 font-medium">
                            Length
                          </p>
                          <p className="text-sm xs:text-base sm:text-lg font-bold">
                            {`${formatNumberWithCommas(unit.length)} ft`}
                          </p>
                        </div>
                      </div>
                    )}
                    {unit.width && unit.propType === projectprops.plot && (
                      <div className="flex items-center gap-1 xs:gap-2">
                        <MdBalcony className="text-[#0073C6] text-lg xs:text-xl sm:text-2xl" />
                        <div>
                          <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500 font-medium">
                            Width
                          </p>
                          <p className="text-sm xs:text-base sm:text-lg font-bold">
                            {`${formatNumberWithCommas(unit.width)} ft`}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-2 xs:mt-3 sm:mt-4 flex justify-between items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReqcallBack(unit);
                      }}
                      className="px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 sm:py-2 bg-[#0073C6] text-white text-[10px] xs:text-xs sm:text-sm font-semibold rounded-md hover:bg-[#005a9e] transition-colors"
                    >
                      Request Quotation
                    </button>
                    <span className="inline-flex items-center text-[#0073C6] text-xs xs:text-sm sm:text-base font-semibold group-hover:underline">
                      More
                      <FaArrowRight className="ml-1 xs:ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className=" flex justify-center items-center w-full h-[90%] bg-white rounded-xl shadow-md mt-[10px] border-solid border-t-[1px] ">
          No data Available
        </div>
      )}
    </div>
  );
}
