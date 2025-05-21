// import { Dispatch, SetStateAction, useState } from "react";
import { Modal, Image } from "@mantine/core";
// import { Carousel } from "@mantine/carousel";
import {
  ZoomInIcon,
  ZoomOutIcon,
  emptyFilesIcon,
} from "@/app/images/commonSvgs";
import S from "@/app/styles/ModalCarousel.module.css";
import {
  // useAtom,
  useAtomValue,
} from "jotai";
import {
  // floorPlansArray,
  selectedFloorAtom,
} from "@/app/store/floor";
import { useSubFloorPlanPopup } from "@/app/hooks/useSubFloorplanPopup";
import { projectprops } from "@/app/data/projectDetails";
import SharePopup from "../../atoms/SharePopup";
import { imageUrlParser } from "@/app/utils/image";
import {
  TransformComponent,
  TransformWrapper,
  useControls,
} from "react-zoom-pan-pinch";
import clsx from "clsx";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import { useSession } from "next-auth/react";
import ZoomInOut from "../actions/ZoomInOut";
import Close from "../button/close";
import { useMediaQuery } from "@mantine/hooks";

import {
  // formatCurrency,
  formatNumberWithSuffix,
} from "@/app/utils/numbers";
import { RightSection } from "./FloorplanModalRightSection";
import { ImgNotAvail } from "@/app/data/project";

function CarouselModal({
  projName,
  propCgId,
}: {
  projName: string;
  propCgId: number;
}) {
  const [opened, { close }] = useSubFloorPlanPopup();
  const TRANSITION_DURATION = 200;
  const selectedFloor = useAtomValue(selectedFloorAtom);
  const [, { open: LoginOpen }] = usePopShortList();
  const { data: session } = useSession();
  let DownloadFile = async () => {
    try {
      const response = await fetch(selectedFloor?.floorPlanUrl.split(",")[3]);
      // console.log(response);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = "floorplan.webp";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };
  const handleDownload = async () => {
    if (session) {
      DownloadFile();
    } else {
      LoginOpen(DownloadFile);
    }
  };

  const isMobile = useMediaQuery("(max-width: 601px)");

  return (
    <Modal
      // centered={isMobile ? false : true}
      opened={opened}
      size={isMobile ? "98%" : "90%"}
      padding={0}
      transitionProps={{ duration: TRANSITION_DURATION }}
      onClose={close}
      classNames={{
        content: S.body,
        close: S.close,
        header: S.header,
      }}
    >
      <div className="w-full  h-[57px] flex items-center justify-between  z-[1000] px-3 xl:px-8 absolute top-0 right-0 pt-2">
        <div className="text-[#333] text-left  text-[20px] xl:text-2xl not-italic font-semibold leading-[normal]">
          Floor Plan
        </div>
        <div className="flex justify-center items-center gap-5 mb-2">
          {selectedFloor?.floorPlanUrl !== ImgNotAvail && (
            <>
              <button
                onClick={handleDownload}
                className={`text-white flex justify-center items-center gap-1 p-2 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] rounded-[10px] bg-[#0073c6] ${
                  isMobile && "text-[12px] p-1"
                }`}
              >
                {!isMobile ? "Download Floor Plan" : "Download"}
              </button>

              <SharePopup
                title="Share"
                titleText="Share Floor Plan"
                url={imageUrlParser(
                  selectedFloor?.floorPlanUrl?.split(",")[3],
                  "F"
                )}
              />
            </>
          )}

          <Close close={close} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row pt-[2%] px-[2%]  mb-10 sm:mb-0 sm:mt-10 justify-center items-center sm:items-start gap-[45px] shrink-0 mt-4">
        <MiddleSection projName={projName} propCgId={propCgId} />
        <RightSection propCgId={propCgId} key="projRightSection3" />
      </div>
    </Modal>
  );
}

export default CarouselModal;

const MiddleSection = ({
  projName,
  propCgId,
}: {
  projName: string;
  propCgId: number;
}) => {
  const selectedFloor = useAtomValue(selectedFloorAtom);

  return (
    <div className="w-[100%] sm:max-w-[800px]  xl:max-w-[1400px]">
      <p className="text-[#242424] w-full mt-[18%] sm:mt-[0%] mb-[1%] sm:mb-0  text-[14px] text-center cl:text-left xl:text-[16px] font-[500] ">
        {/* Sarang by sumadhura/2bhk/tower 1/ 05%4/north/1124 sq.ft - 3 */}
        {projName}
        {propCgId != projectprops.plot &&
          selectedFloor?.bhkName &&
          " | " + selectedFloor?.bhkName}
        {propCgId == projectprops.apartment &&
          selectedFloor?.towerName &&
          selectedFloor?.towerName != "NA" &&
          " | Tower " + selectedFloor?.towerName}
        {propCgId != projectprops.plot &&
          ` | ${
            propCgId == projectprops.rowHouse || propCgId == projectprops.villa
              ? "Elevation"
              : "Floor"
          } ` +
            `${
              selectedFloor?.floor?.toString() === "0" &&
              propCgId == projectprops.apartment &&
              propCgId != projectprops.villament
                ? "G"
                : selectedFloor?.floor
            }`}
        {selectedFloor?.unitNumber &&
          " | Unit No. " + selectedFloor?.unitNumber}
        {" | Facing " + selectedFloor?.facingName}
        {propCgId != projectprops.plot &&
          selectedFloor?.superBuildUparea &&
          " | Area. " +
            formatNumberWithSuffix(selectedFloor?.superBuildUparea, false) +
            " sq.ft"}
        {propCgId == projectprops.plot &&
          selectedFloor?.plotArea &&
          " | Area. " + selectedFloor?.plotArea + " sq.ft"}
      </p>
      {selectedFloor?.floorPlanUrl ? (
        <div className="w-full flex justify-center  items-center sm:items-start">
          <TransformWrapper>
            <ImageContainer url={`${selectedFloor?.floorPlanUrl}`} />
          </TransformWrapper>
        </div>
      ) : (
        <div>
          {emptyFilesIcon}
          <p>No Matching Results Found !</p>
        </div>
      )}
    </div>
  );
};

const ImageContainer = ({ url }: any) => {
  const isMobile = useMediaQuery("(max-width: 601px)");
  const isTab = useMediaQuery("(max-width: 1600px)");
  return (
    <div className="relative ml-3 max-w-fit">
      <TransformComponent
        contentStyle={{
          width: "95%",
          display: "inline-flex",
          // position: "relative",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src={url.split(",")[0]}
          radius="md"
          h={isMobile ? 300 : isTab ? 400 : 600}
          fit="contain"
          alt="projectCard"
        />
      </TransformComponent>
      <ZoomInOut className="!right-[20px] !bottom-12 xl:!right-[0px] xl:!bottom-[0px] " />
    </div>
  );
};
export const Controls = ({ className }: { className?: string }) => {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  const styles =
    "text-2xl flex justify-center items-center gap-2.5  px-[7px] py-1.5 rounded-2xl border-[0.8px] border-solid border-[#616D75] bg-[#eaeaea]";
  return (
    <div
      className={clsx(
        "flex justify-center items-center  absolute bottom-2   xl:right-2 space-x-4",
        className
      )}
    >
      <button onClick={() => zoomIn()} className={styles}>
        <ZoomInIcon />
      </button>
      <button onClick={() => zoomOut()} className={styles}>
        <ZoomOutIcon />
      </button>
      <button onClick={() => resetTransform()} className={styles}>
        Reset
      </button>
    </div>
  );
};
