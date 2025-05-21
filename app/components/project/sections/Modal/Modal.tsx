/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-boolean-value */
import React, { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import { useResetAtom } from "jotai/utils";
import { selectedPartialUnitAtom } from "@/app/store/partialsUnits";
// import { projectReqDataAtom } from "@/app/store/project/project.req";
import Image from "next/image";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { formatNumberWithSuffix } from "@/app/utils/numbers";
import {
  // FloorPlanNotAvail,
  ImgNotAvail,
} from "@/app/data/project";
import { propertyDetailsSvgs, ShearIcon } from "@/app/images/commonSvgs";
import { useQuery } from "react-query";
import ZoomInOut from "../../actions/ZoomInOut";
import useDownload from "@/app/hooks/property/useDownload";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import {
  FaDownload,
  FaTimes,
  FaShare,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { BiMessage } from "react-icons/bi";
import { propCgIdAtom } from "@/app/store/vewfloor";
import { propertyDetailsTypes } from "@/app/data/projectDetails";
// import ModalBox from "@/app/test/newui/components/Card/Top/Right/ModalBox";
import { preventBackButton } from "@/app/components/molecules/popups/req";
// import { useMediaQuery } from "@mantine/hooks";

const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    window.history.pushState("masterplanModal", "");

    const handlePopState = () => {
      onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("popstate", handlePopState);
    }

    return () => {
      console.log("scroll aaaaaa");
      document.body.style.overflow = "unset";
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full h-full bg-white overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default function PartialUnitModal({ data }: any) {
  const isData = useAtomValue(selectedPartialUnitAtom);
  // console.log(isData);
  const propId = useAtomValue(propCgIdAtom);
  const [active, setActive] = useState(0);
  const reset = useResetAtom(selectedPartialUnitAtom);
  const handleReset = () => {
    setActive(0);
    reset();
  };

  const opened = isData.main === 0 ? true : isData.main;

  const [platform, setPlatform] = useState("");

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
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePrevious();
      } else if (event.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [active, isData]);

  const selectedOne = isData.others[active];
  const { handleDownload } = useDownload("floorPlan");
  const [, { open }] = useReqCallPopup();

  const {
    data: builderData,
  } = useQuery<any>({
    queryKey: [`builder/${data.builderId}&isBuilderPage=Nproj`],
    enabled: false,
  });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Floor Plan",
          url: selectedOne?.floorPlan?.split(",")[3] || "",
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    }
  };

  // const handlePrevious = () => {
  //   setActive((prev) => (prev > 0 ? prev - 1 : isData.others.length - 1));
  // };

  const handlePrevious = () => {
    setActive((prev: number) => {
      if (prev > 0) return prev - 1;
      return prev;
    });
  };

  // useEffect(()=>{
  //   if (opened) {
  //       preventBackButton();
  //       const handlePopState = () => {
  //         document.body.style.overflow = "unset";
  //         handleReset();
  //       };

  //       window.addEventListener("popstate", handlePopState);
  //       return () => window.removeEventListener("popstate", handlePopState);
  //   }
  //   // else{
  //   //   allowBackButton();
  //   // }
  // }, [opened]);

  useEffect(() => {
    const handleClose = () => {
      document.body.style.overflow = "unset";
      window.history.back();
      handleReset();
    };

    if (opened) {
      preventBackButton();

      const onPopState = () => handleClose();
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") handleClose();
      };

      window.addEventListener("popstate", onPopState);
      window.addEventListener("keydown", onKeyDown);

      return () => {
        window.removeEventListener("popstate", onPopState);
        window.removeEventListener("keydown", onKeyDown);
      };
    }
  }, [opened]);

  const handleNext = () => {
    setActive((prev: number) => {
      if (prev < isData.others.length - 1) return prev + 1;
      return prev;
    });
  };
  if (!opened) {
    return null;
  }

  return (
    <Modal isOpen={opened} onClose={handleReset}>
      <div className="flex flex-col h-full ">
        {/* Header */}
        <div className="flex items-center justify-between p-2 sm:p-4 border-b bg-white">
          <h3 className="text-lg sm:text-xl font-semibold text-[#0073C6]">
            {selectedOne
              ? `${selectedOne.unitType ?? ""} ${
                  propertyDetailsTypes.get(propId)?.name
                }`
              : "Floor Plan"}
          </h3>
          <div className="flex items-center gap-2 sm:gap-4">
            {selectedOne?.floorPlan && (
              <>
                <button
                  onClick={() =>
                    handleDownload(selectedOne?.floorPlan?.split(",")[2])
                  }
                  className="flex items-center gap-2 px-2 sm:px-4 py-1 sm:py-2 bg-[#0073C6] text-white rounded-lg hover:bg-[#005a9e] transition-colors"
                >
                  <FaDownload className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline text-sm sm:text-base">
                    Download Floor Plan
                  </span>
                </button>
                <button
                  onClick={handleShare}
                  className="sm:hidden flex items-center gap-2 px-2 py-1 bg-[#0073C6] text-white rounded-lg hover:bg-[#005a9e] transition-colors"
                >
                  <FaShare className="w-3 h-3" />
                </button>
                <button
                  onClick={() => {
                    const floorPlanUrl =
                      selectedOne?.floorPlan?.split(",")[3] || "";
                    if (floorPlanUrl) {
                      navigator.share({
                        title: "Share Floor Plan",
                        url: `/image?path=${floorPlanUrl.replace(
                          "https://media.getrightproperty.com",
                          ""
                        )}&type=F`,
                      });
                    }
                  }}
                  className="hidden sm:flex flex-nowrap justify-center items-center p-0.5 gap-1 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] sm:p-2 rounded-[10px] bg-[#F3F7FF] ml-auto text-[#0073C6] not-italic font-semibold leading-[normal] tracking-[0.4px]"
                >
                  <ShearIcon className="sm:w-[24px] sm:h-[24px] xl:w-[26px] xl:h-[26px] h-[24px] w-[42px]" />
                  <span className="hidden sm:h-auto sm:text-[14px] xl:text-[20px] sm:w-full sm:block">
                    {"Share"}
                  </span>
                </button>
              </>
            )}
            <button
              onClick={handleReset}
              className="p-1 sm:p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FaTimes className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Main Content overflow-hidden   <div className={`${platform == "iOS" ? "mb-28" : "" }  pb-[30px] sm:pb-[10px]  border-t bg-white p-[10px] md:p-4`}> */}

        <div
          className={`flex-1 flex flex-col    max-h-full overflow-auto  lg:flex-row  ${
            platform == "iOS" ? "pb-[10px]" : "pb-[6px]"
          } z-[100]    sm:pb-[10px]  border-t bg-white p-[10px] md:p-4`}
        >
          {/* Left - Floor Plan Image */}
          <div className="flex-1 p-3 sm:p-6 flex items-center justify-center bg-[#F8FBFF] relative  lg:h-auto">
            {isData.others.length > 1 && (
              <>
                {active !== 0 && (
                  <button
                    onClick={handlePrevious}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white z-[100] ${
                      active === 0 ? " cursor-not-allowed opacity-70 " : ""
                    } `}
                  >
                    <FaChevronLeft className="w-4 h-4 text-gray-600" />
                  </button>
                )}
                {isData.others.length - 1 !== active && (
                  <button
                    onClick={handleNext}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white z-[100] ${
                      isData.others.length - 1 === active
                        ? " cursor-not-allowed opacity-70 "
                        : ""
                    }`}
                  >
                    <FaChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                )}
              </>
            )}
            <TransformWrapper>
              <TransformComponent
                wrapperStyle={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                }}
                contentStyle={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                }}
              >
                <div className="flex items-center justify-center w-full h-full max-h-[calc(100vh-550px)] sm:max-h-[calc(100vh-250px)] lg:max-h-full">
                  <Image
                    width={800}
                    height={600}
                    src={
                      decodeURIComponent(
                        selectedOne?.floorPlan?.split(",")[3]
                      ) ?? ImgNotAvail
                    }
                    alt="Floor Plan"
                    className="max-w-full max-h-full object-contain"
                    unoptimized
                  />
                </div>
              </TransformComponent>
              <ZoomInOut className="bottom-4 right-4" />
            </TransformWrapper>
          </div>

          {/* Right - Unit Details */}
          <div className="w-full lg:w-96 bg-white p-3 sm:p-6 h-auto border-t lg:border-t-0 lg:border-l">
            <div className="space-y-4 sm:space-y-6">
              {/* Area Details */}
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-[#303A42] border-b pb-2">
                  Area Details
                </h4>
                <div className="grid gap-3 sm:gap-4 mt-3 sm:mt-4">
                  <div className="flex items-center gap-3 sm:gap-4 bg-[#F8FBFF] p-2 sm:p-3 rounded-lg">
                    <div className="bg-[#ECF7FF] p-1.5 sm:p-2 rounded-lg">
                      {propertyDetailsSvgs.superBuildUparea}
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-[#4D6677] font-medium">
                        {selectedOne?.propType == "32"
                          ? "Plot Area"
                          : "Super Builtup Area"}
                      </p>
                      <p className="text-sm sm:text-base text-[#303A42] font-semibold">
                        {formatNumberWithSuffix(
                          selectedOne?.plotArea || selectedOne?.sba,
                          false
                        )}{" "}
                        sq.ft
                      </p>
                    </div>
                  </div>

                  {selectedOne?.propType !== "32" && (
                    <div className="flex items-center gap-3 sm:gap-4 bg-[#F8FBFF] p-2 sm:p-3 rounded-lg">
                      <div className="bg-[#ECF7FF] p-1.5 sm:p-2 rounded-lg">
                        {propertyDetailsSvgs.superBuildUparea}
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-[#4D6677] font-medium">
                          Carpet Area
                        </p>
                        <p className="text-sm sm:text-base text-[#303A42] font-semibold">
                          {formatNumberWithSuffix(selectedOne?.ca || 0, false)}{" "}
                          sq.ft
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 sm:gap-4 bg-[#F8FBFF] p-2 sm:p-3 rounded-lg">
                    <div className="bg-[#ECF7FF] p-1.5 sm:p-2 rounded-lg">
                      {propertyDetailsSvgs.superBuildUparea}
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-[#4D6677] font-medium">
                        Price Range
                      </p>
                      <p className="text-sm sm:text-base text-[#303A42] font-semibold">
                        {isData.priceRange}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="w-full mt-4 sm:mt-6 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0073C6] text-white rounded-lg hover:bg-[#005a9e] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              onClick={() =>
                open({
                  modal_type: "REQ_QUOTE",
                  postedByName: builderData?.data?.userName ?? "",
                  projUnitIdEnc: selectedOne?.projUnitIdEnc,
                  postedId: data.builderId,
                  reqId: data.projIdEnc,
                  source: "projBanner",
                  title: data.projectName,
                })
              }
            >
              <BiMessage className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Get Price Details</span>
            </button>
          </div>
        </div>

        {isData && isData.others && isData.others?.length > 0 && (
          <div className={`w-[95%] m-auto  inline-flex mb-4 `}>
            {isData.others.map((item: any, index: number) => {
              const imageUrl = item?.floorPlan?.split(",")[3] || ImgNotAvail;
              console.log(imageUrl);
              console.log(encodeURIComponent(imageUrl));
              return (
                <div
                  key={`floorplan-${index.toString()}`}
                  onClick={() => setActive(index)}
                  className={`relative min-w-[80px] h-[60px] rounded-lg border-2 transition-colors ${
                    active === index ? "border-[#0073C6]" : "border-transparent"
                  }`}
                >
                  <Image
                    width={80}
                    height={60}
                    // src={encodeURIComponent(imageUrl)}
                    src={imageUrl}
                    alt={`Floor Plan ${index + 1}`}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
}
