/* eslint-disable no-unused-vars */
import React from "react";
import {
  CarParkingIcon,
  FacingIcon,
  FlooringIcon,
  SuperBuildupAreaIcon,
  TowerTypeIcon,
} from "../../images/commonSvgs";
import { projectprops } from "../../data/projectDetails";
import { useAtom, useSetAtom } from "jotai";
import { floorPlansArray, selectedFloorAtom } from "@/app/store/floor";
import { useFloorPlanPopup } from "@/app/hooks/useFloorPlanPopup";
import { setPropertyValues } from "@/app/utils/dyanamic/projects";
import { ImgNotAvail } from "@/app/data/project";
import clsx from "clsx";
import {
  // formatCurrency,
  formatNumberWithSuffix,
} from "@/app/utils/numbers";

type Props = {
  propCgId?: any;
  data: any;
  projData: any;
  setValues: any;
  lastIndex?: boolean;
};

const FloorplanDetailsCard: React.FC<Props> = ({
  propCgId,
  data: { size, start, index },
  projData,
  setValues,
  // data,
  lastIndex,
}) => {
  const data = projData[index];
  const [, setImage] = useAtom(selectedFloorAtom);
  const setFloorsArray = useSetAtom(floorPlansArray);
  const mergedData = {
    bhk: data?.bhkName,
    bedCount: data?.bhkName ? data?.bhkName.split(" ")[0] : "", // Example value, adjust as needed
    bathCount: data?.totalNumberofBathroom,
    superBuildupArea: data?.superBuildUparea, // Example value, adjust as needed
    propertyFacing:
      data?.facingName === "Don't Know" ? "N/A" : data?.facingName, // Example value, adjust as needed
    towerType: data?.towerName, // If tower is provided, use it; otherwise, use "Tower 1"
    unitNumber: data?.unitNumber, // Example value, adjust as needed
    unitType: `${data?.length} ft x ${data?.width} ft`, // Example value, adjust as needed
    totalSqft: `${data?.length * data?.width} sq.ft`,
    carParking: data?.noOfCarParking,
    plotArea: data?.plotArea,
  };
  const [opened, { open, close }] = useFloorPlanPopup();
  ////  Villament =garden area , parking area , Terrace Area Balcony Size
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const setted = setPropertyValues(data, propCgId);
    setImage({ ...data, floorPlanUrl: data.floorPlanUrl ?? ImgNotAvail });
    setValues(setted);
    handleSearch();
    open("floor");
  };
  const handleSearch = (): void => {
    const filteredFloors = projData.filter(
      (floor: any) => floor.unitNumber === mergedData.unitNumber
    );
    setFloorsArray(filteredFloors);
  };
  return (
    <>
      <div
        className={clsx(
          "sm:flex sm:h-[180px] justify-between py-[18px] px-[25px] pt-[24px] w-full border-[#92B2C8] border-solid border-b-[1px] border-r-[1px] cursor-pointer hidden hover:bg-gray-50 transition-colors duration-200"
        )}
        onClick={handleCardClick}
        // style={{
        //   position: "absolute",
        //   top: 0,
        //   left: 0,
        //   width: "100%",
        //   // transform: `translateY(${start}px)`,
        // }}
      >
        {propCgId != projectprops.plot && (
          <div className="">
            <p className="font-[500] text-[12px] sm:text-[16px] xl:text-[24px] mb-[20px] text-[#001F35] flex justify-start items-center">
              {mergedData?.bhk} |
              <span className="font-[500] ml-[4px] text-[12px] sm:text-[14px] xl:text-[20px] text-[#000]">
                {" "}
                {parseInt(mergedData?.bedCount)}{" "}
                {`Bed${mergedData?.bedCount % 1 !== 0 ? " + Study" : ""}`} -{" "}
                {mergedData?.bathCount} Bath
              </span>
            </p>
            <p className="gap-[4px] font-[500] text-[12px] sm:text-[14px] xl:text-[16px] text-[#303A42] mb-[20px] flex justify-start items-start">
              <SuperBuildupAreaIcon className="md:h-[32px] md:w-[32px] h-[24px] w-[24px]" />
              Super Builtup Area:{" "}
              {formatNumberWithSuffix(mergedData?.superBuildupArea, false)}{" "}
              sq.ft
            </p>
            <p className="gap-[4px] font-[500] text-[12px] sm:text-[14px] xl:text-[16px] text-[#001F35] mb-[20px] flex justify-start items-start">
              <FacingIcon className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px]" />
              Property Facing: {mergedData?.propertyFacing}
            </p>
          </div>
        )}

        {propCgId == projectprops.plot && (
          <div>
            <p className="font-[500] text-[16px] lg:text-[24px] mb-[20px] text-[#001F35] flex justify-start items-center">
              Plot Area: {formatNumberWithSuffix(mergedData?.plotArea, false)}{" "}
              sq.ft
            </p>
            <p className="gap-[4px] font-[500] text-[14px] lg:text-[16px] text-[#303A42] mb-[20px] flex justify-start items-start">
              <FlooringIcon className="md:h-[32px] md:w-[32px] h-[24px] w-[24px]" />
              Unit Type: {data?.length} ft x {data?.width} ft
            </p>
            <p className="gap-[4px] font-[500] text-[14px] lg:text-[16px] text-[#001F35] mb-[20px] flex justify-start items-start">
              <FacingIcon className="md:h-[32px] md:w-[32px] h-[24px] w-[24px]" />
              Plot Facing: {mergedData?.propertyFacing}
            </p>
          </div>
        )}

        <div className="flex sm:justify-end sm:items-end flex-col ">
          {(propCgId == projectprops.apartment ||
            propCgId == projectprops.villament) && (
            <p className="gap-[4px] flex sm:justify-end sm:items-end text-[#303A4] font-[500] text-[12px] sm:text-[14px] lg:text-[16px] mb-[20px] ">
              <TowerTypeIcon className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px]" />
              Tower: {mergedData?.towerType}
            </p>
          )}

          <p className="sm:gap-[1px] gap-[4px] xl:gap-[4px] flex sm:justify-end sm:items-start text-[#303A4] font-[500] text-right text-[12px] sm:text-[14px] lg:text-[16px] mb-[14px] ">
            <FlooringIcon className="md:h-[32px] md:w-[32px] h-[24px] w-[24px]" />
            Unit Number: {mergedData.unitNumber}
          </p>
          {propCgId === projectprops.plot && <p className="mb-[45px]" />}

          {/* {(propCgId == projectprops.plot || !propCgId) && (
          <p className="gap-[4px] flex justify-end items-end text-[#303A4] font-[500] text-[14px] lg:text-[16px] mb-[20px] ">
            <FlooringIcon className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px]" />
            Unit Type: {mergedData.unitType}
          </p>
        )} */}
          {(propCgId != projectprops.plot || !propCgId) && (
            <p className="gap-[4px] flex sm:justify-end sm:items-end text-[#303A4] font-[500] text-[12px] sm:text-[14px] lg:text-[16px] mb-[14px] ">
              <CarParkingIcon className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px]" />
              Car Parking:{" "}
              {mergedData.carParking === 0 ? "N/A" : mergedData.carParking}
            </p>
          )}
        </div>
      </div>
      <div className="sm:hidden border-[#92B2C8] border-solid border-t-0 border-[1px] p-4 hover:bg-gray-50 transition-colors duration-200">
        {propCgId != projectprops.plot && (
          <div className="">
            <p className="font-[600] text-[14px] sm:text-[16px] lg:text-[24px] mb-[8px] text-[#001F35] flex justify-start items-center">
              {mergedData.bhk} |
              <span className="font-[600] ml-[4px] text-[14px] sm:text-[14px] lg:text-[20px] text-[#000]">
                {" "}
                {mergedData.bedCount}{" "}
                {`Bed${mergedData?.bedCount % 1 !== 0 ? " + Study" : ""}`} -{" "}
                {mergedData.bathCount} Bath
              </span>
            </p>
            <p className="gap-[4px] font-[500] text-[14px] lg:text-[16px] text-[#303A42] mb-[8px] flex justify-start items-start">
              <SuperBuildupAreaIcon className="md:h-[32px] md:w-[32px] h-[24px] w-[24px]" />
              Super Builtup Area:{" "}
              {formatNumberWithSuffix(mergedData.superBuildupArea)} sq.ft
            </p>
            <p className="gap-[4px] font-[500] text-[14px] lg:text-[16px] text-[#303A42] mb-[8px] flex justify-start items-start">
              <FacingIcon className="md:h-[32px] md:w-[32px] h-[24px] w-[24px]" />
              Property Facing: {mergedData.propertyFacing}
            </p>
          </div>
        )}

        {propCgId == projectprops.plot && (
          <div>
            <p className="font-[500] text-[16px] lg:text-[24px] mb-[8px] text-[#001F35] flex justify-start items-center">
              Plot Area: {mergedData.plotArea}sq.ft
            </p>
            <p className="gap-[4px] font-[500] text-[14px] lg:text-[16px] text-[#303A42] mb-[8px] flex justify-start items-start">
              <FlooringIcon className="md:h-[32px] md:w-[32px] h-[24px] w-[24px]" />
              Unit Type: {data?.length} ft x {data?.width} ft
            </p>
            <p className="gap-[4px] font-[500] text-[14px] lg:text-[16px] text-[#303A42] mb-[8px] flex justify-start items-start">
              <FacingIcon className="md:h-[32px] md:w-[32px] h-[24px] w-[24px]" />
              Plot Facing: {mergedData.propertyFacing}
            </p>
          </div>
        )}

        {(propCgId == projectprops.apartment ||
          propCgId == projectprops.villament) && (
          <p className="gap-[4px] font-[500] text-[14px] lg:text-[16px] text-[#303A42] mb-[8px] flex justify-start items-start">
            <TowerTypeIcon className="md:h-[32px] md:w-[32px] h-[24px] w-[24px]" />
            Tower: {mergedData.towerType}
          </p>
        )}

        <p className="gap-[4px] font-[500] text-[14px] lg:text-[16px] text-[#303A42] mb-[8px] flex justify-start items-start ">
          <FlooringIcon className="md:h-[32px] md:w-[32px] h-[24px] w-[24px]" />
          Unit Number: {mergedData.unitNumber}
        </p>

        {/* {(propCgId == projectprops.plot || !propCgId) && (
          <p className="gap-[4px] flex justify-end items-end text-[#303A4] font-[500] text-[14px] lg:text-[16px] mb-[20px] ">
            <FlooringIcon className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px]" />
            Unit Type: {mergedData.unitType}
          </p>
        )} */}
        {(propCgId != projectprops.plot || !propCgId) && (
          <p className="gap-[4px] font-[500] text-[14px] lg:text-[16px] text-[#303A42] mb-[8px] flex justify-start items-start">
            <CarParkingIcon className="md:h-[32px] md:w-[32px] h-[24px] w-[24px]" />
            Car Parking:{" "}
            {mergedData.carParking === 0 ? "N/A" : mergedData.carParking}
          </p>
        )}
      </div>
    </>
  );
};

export default FloorplanDetailsCard;
