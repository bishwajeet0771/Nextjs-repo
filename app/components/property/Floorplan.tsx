"use client";

import React, { useState } from "react";
import PFloorPlanModal from "./modals/Floor";
import PropertyHeading from "./heading";
import { Main } from "@/app/validations/property";
import { useSetAtom } from "jotai";
import { listingProps } from "@/app/data/projectDetails";
import { selectedFloorAtom } from "@/app/store/floor";
import { PopupOpenSvg } from "@/app/images/commonSvgs";
import { createPropertyString } from "@/app/utils/dyanamic/property";
import { ImgNotAvail } from "@/app/data/project";
import Image from "next/image";
// import useHistoryBackHandler from "../molecules/popups/popupCloser";

export default function RoomFloorplansBlock({ data }: { data: Main }) {
  const [opened, setOpened] = useState(false);
  const setValue = useSetAtom(selectedFloorAtom);
  const type = listingProps[data.propTypeName as keyof typeof listingProps];
  const newTitle = `${data?.bhkName ?? ""} ${data?.propTypeName} For
  ${data?.cg === "S" ? " Sale" : " Rent"} In
  ${data?.ltName} at ${data.propName}`;
  const handleOpen = () => {
    // console.log("setting: ", data)
    setValue({
      aptTypeName: data.aptTypeName,
      projIdEnc: "4f313de2f95cd9d761098b8f6c09417c",
      phaseId: 670,
      propType: type,
      bhk: 42,
      bhkName: data.bhkName,
      ...(data.tower && { towerName: data.tower }),
      towerId: data.tower,
      block: data.block,
      floor: data.atFloor,
      unitNumber: data.unitNumber,
      facingId: data.facingName,
      facingName: data.facingName,
      caretarea: data.ca,
      superBuildUparea: data.sba,
      ta: data.ta,
      totalNumberofBathroom: data.nobt,
      totalNumberOfBalcony: data.nobl,
      noOfCarParking: data.noocp,
      floorPlanUrl: data.projMedia.floorPlanUrl,
      plotArea: data.plotArea,
      noocp: data.noocp,
      noobp: data.noobp,
      noccp: data.noccp,
      nocbp: data.nocbp,
      ...(data.ga && {
        ga: data.ga,
      }),
      ...(data.length && { length: data.length }),
      ...(data.width && { width: data.width }),
      ...(data.totalFloor && { totalFloor: data.totalFloor }),
      ...(data.isBasement && { isBasement: data.isBasement }),
      ...(data.ba && { ba: data.ba }),
    });
    setOpened(true);
    window.history.pushState(null, "", window.location.href);
  };

  // const onClosePopup = () => {
  //   setOpened(false);
  // };

  // const pushHistory = useHistoryBackHandler(onClosePopup);
  return (
    <>
      <PFloorPlanModal data={data} opened={opened} setOpened={setOpened} />
      <div
        className="w-[95%] md:w-[90%]  mt-[50px] relative scroll-mt-[220px]"
        id="floorPlans"
        onClick={handleOpen}
      >
        <div className="w-[90%] mb-[10px] xl:mb-[8px] space-y-4">
          <PropertyHeading
            title="Floor Plan"
            desc={`See floor plan of your selected property ${newTitle}`}
          /> 
        </div>

        <div className=" h-[405px] lg:h-[570px] w-full rounded-[14px]  border-solid border-[1px] border-[#92B2C8] bg-[#FFF] shadow-md flex justify-center p-2 pt-0 sm:pt-2 xl:items-center flex-col ">
          <p className=" text-[#005DA0] text-left xl:text-right text-[14px] xl:text-xl not-italic font-medium w-full p-2 ">
            {createPropertyString(data)}
          </p>
          <div className="w-[100%] xl:w-[70%] flex justify-center items-center flex-col p-[2%] ">
            <div
              className="flex relative justify-center items-center h-[300px] lg:h-[420px] cursor-pointer self-center m-auto"
              onClick={handleOpen}
            >
              {data?.projMedia?.floorPlanUrl ? (
                <div className="">
                  <picture>
                    <source
                      media="(max-width: 460px)"
                      srcSet={data?.projMedia?.floorPlanUrl.split(",")[1]}
                    />
                    <source
                      media="(max-width: 768px)"
                      srcSet={data?.projMedia?.floorPlanUrl.split(",")[2]}
                    />
                    <source
                      media="(min-width: 1200px)"
                      srcSet={data?.projMedia?.floorPlanUrl.split(",")[3]}
                    />
                    {/* <Image
                      alt="floor plan"
                      title={
                        data?.projMedia?.floorPlanUrl
                          .split("/")[6]
                          .split(".")[0]
                      }
                      src={data?.projMedia?.floorPlanUrl}
                      width={750}
                      height={750}
                      className=" m-auto h-[300px] lg:h-[420px]"
                      unoptimized
                    /> */}

                    <img
                      alt="floor plan"
                      title={
                        data?.projMedia?.floorPlanUrl
                          .split("/")[6]
                          .split(".")[0]
                      }
                      src={data?.projMedia?.floorPlanUrl.split(",")[3]} // fallback image
                      width={750}
                      height={750}
                      className="m-auto h-[300px] lg:h-[420px] object-contain block"
                      loading="lazy"
                      decoding="async"
                      // fetchPriority={undefined}
                    />
                  
                  </picture>
                </div>
              ) : (
                <Image
                  src={ImgNotAvail}
                  width={300}
                  height={300}
                  alt=""
                  className="h-full w-full m-auto "
                  unoptimized
                />
              )}
            </div>
            <button
            aria-label={"Click on image to open floor plan"}
            name={"Click on image to open floor plan"} 
            title={"Click on image to open floor plan"}
              onClick={() => {
                setOpened(true);
                // pushHistory();
                window.history.pushState(null, "", window.location.href);
              }}
            >
              <span className="bg-[#F4FBFF] p-[10px] rounded-[29px] mt-2  sm:mt-0 gap-[12px] flex justify-end items-center  cursor-pointer absolute bottom-5 right-4 z-[1] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.40)]">
                <span className="text-[#0073C6] text-[12px] xl:text-xl not-italic font-semibold leading-[normal] underline capitalize">
                  Click on image to open floor plan
                </span>
                <PopupOpenSvg className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px]  " />
              </span>{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
