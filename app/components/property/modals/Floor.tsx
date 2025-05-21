import { Dispatch, SetStateAction, useEffect } from "react";
import { propertyDetailsSvgs, ShearIcon } from "@/app/images/commonSvgs";
import { Main } from "@/app/validations/property";
import { selectedFloorAtom } from "@/app/store/floor";
import { useAtomValue } from "jotai";
import { listingProps, projectprops } from "@/app/data/projectDetails";
import { imageUrlParser } from "@/app/utils/image";
import useDownload from "@/app/hooks/property/useDownload";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import ZoomInOut from "../../project/actions/ZoomInOut";
import { ImgNotAvail } from "@/app/data/project";
import { formatNumberWithSuffix } from "@/app/utils/numbers";
import Image from "next/image";

interface FloorPlanModalProps {
  data: Main;
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

function FloorPlanModal({ data, opened, setOpened }: FloorPlanModalProps) {
  const type =
    listingProps[data.propTypeName.trim() as keyof typeof listingProps];
  const { handleDownload } = useDownload("floorPlan");
  const floorData = useAtomValue(selectedFloorAtom);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpened(false);
      }
    };

    const handlePopState = () => {
      setOpened(false);
    };

    if (opened) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
      window.addEventListener("popstate", handlePopState);
    }

    return () => {
      document.body.style.overflow = "unset";
      console.log("scroll bbbb");
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [setOpened, opened]);

  if (!opened) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setOpened(false)}
      />
      <div className="relative z-10 w-full h-full bg-white overflow-hidden flex flex-col">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between flex-row p-2 md:p-4 border-b bg-white shadow-sm">
          <h3 className="text-base md:text-xl font-semibold text-[#0073C6]">
            {floorData.bhkName || data.propTypeName}{" "}
            {floorData.unitNumber && `- Unit ${floorData.unitNumber}`}
          </h3>
          <div className="flex items-center max-w-fit justify-end gap-2 md:gap-4 mt-2 md:mt-0">
            {data?.projMedia?.floorPlanUrl && (
              <>
                <button
                aria-label="Download Floor Plan" name="Download Floor Plan" title="Download Floor Plan"
                  onClick={() => handleDownload(data.projMedia.floorPlanUrl)}
                  className="flex items-center gap-1 md:gap-2 p-2 md:px-4 md:py-2 bg-[#0073C6] text-white rounded-lg hover:bg-[#005a9e] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM4 20V15H6V18H18V15H20V20H4Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="hidden md:inline">Download Floor Plan</span>
                </button>
                {/* <SharePopup
                  title="Share"
                  titleText="Share Floor Plan"
                  url={imageUrlParser(
                    data.projMedia.floorPlanUrl.split(",")[3],
                    "F"
                  )}
                  className="text-[#0073C6] font-medium"
                /> */}

                <button
                  aria-label="Share"
                  title="Share Floor Plan"
                  name="Share Floor Plan"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.share({
                      title: "Share",
                      url: imageUrlParser(
                        data.projMedia.floorPlanUrl.split(",")[3],
                        "F"
                      ),
                    });
                  }}
                  className="flex flex-nowrap justify-center items-center p-0.5 gap-1 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] sm:p-2 rounded-[10px] bg-[#F3F7FF] ml-auto text-[#0073C6] not-italic font-semibold leading-[normal] tracking-[0.4px] h-[36px] md:h-[40px] "
                >
                  <ShearIcon className=" sm:w-[20px] sm:h-[20px]  xl:w-[26px] xl:h-[26px]  h-[24px] w-[42px] " />
                  <span className="hidden  h-4 w-4  sm:h-auto sm:text-[14px] xl:text-[20px]  sm:w-full sm:block">
                    Share
                  </span>
                </button>
              </>
            )}
            <button
            aria-label="Click to Open Floorplan" name="Click to Open Floorplan" title="Click to Open Floorplan"
              onClick={() => {
                setOpened(false);
                document.body.style.overflow = "unset";
                window.history.back();
              }}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors bg-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-6 h-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto">
          {/* Left - Floor Plan Image */}
          <div className="flex-1 p-[10px] md:p-6 flex items-center justify-center relative bg-[#F8FBFF]">
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
                <Image
                  src={floorData.floorPlanUrl ?? ImgNotAvail}
                  alt="Floor Plan"
                  width={1200}
                  height={800}
                  className="max-w-full h-full object-contain"
                />
              </TransformComponent>
              {floorData.floorPlanUrl && (
                <ZoomInOut className="bottom-6 right-6" />
              )}
            </TransformWrapper>
          </div>

          {/* Right - Unit Details */}
          <div className="w-full lg:w-96 bg-white p-[10px] md:p-6 overflow-y-auto border-t lg:border-t-0 lg:border-l">
            <div className="space-y-4 md:space-y-6">
              {type !== projectprops.plot && (
                <DetailCard
                  icon={propertyDetailsSvgs.unitType}
                  title="Unit Information"
                  items={[
                    { label: "Unit Type", value: floorData.bhkName ?? "" },
                    { label: "Unit Number", value: floorData.unitNumber ?? "" },
                    ...(floorData.aptTypeName &&
                    (type === projectprops.apartment ||
                      type === projectprops.villament)
                      ? [
                          {
                            label: "Property Type",
                            value: floorData.aptTypeName.replace(
                              "Apartment",
                              type === projectprops.apartment
                                ? "Apartment"
                                : "Villament"
                            ),
                          },
                        ]
                      : []),
                    ...(floorData.towerName &&
                    (type === projectprops.apartment ||
                      type === projectprops.villament)
                      ? [{ label: "Tower", value: floorData.towerName }]
                      : []),
                    ...(floorData.block &&
                    type === projectprops.apartment &&
                    type !== projectprops.plot
                      ? [{ label: "Block", value: floorData.block }]
                      : []),
                    ...(floorData.floor !== undefined
                      ? [
                          {
                            label:
                              type === projectprops.rowHouse ||
                              type === projectprops.villa
                                ? "At Elevation"
                                : "At Floor",
                            value: `${
                              floorData.isBasement === "Y" ? "B+" : ""
                            }${
                              floorData.floor === 0 || floorData.floor === "0"
                                ? "G"
                                : type === projectprops.rowHouse ||
                                  type === projectprops.villa
                                ? `G+${floorData.floor}`
                                : floorData.floor
                            }`,
                          },
                        ]
                      : []),
                    ...(floorData.totalFloor !== undefined &&
                    type !== projectprops.plot
                      ? [
                          {
                            label: "Total No.Of Floors",
                            value: floorData.totalFloor,
                          },
                        ]
                      : []),
                  ]}
                />
              )}

              {/* Area Details */}
              <DetailCard
                icon={propertyDetailsSvgs.superBuildUparea}
                title="Area Details"
                items={[
                  ...(type !== projectprops.plot
                    ? [
                        {
                          label: "Super Builtup Area",
                          value: `${formatNumberWithSuffix(
                            floorData.superBuildUparea ?? 0,
                            false
                          )} sq.ft`,
                        },
                        {
                          label: "Carpet Area",
                          value: `${formatNumberWithSuffix(
                            floorData.caretarea ?? 0,
                            false
                          )} sq.ft`,
                        },
                      ]
                    : []),
                  ...(floorData.plotArea &&
                  (type === projectprops.plot ||
                    type === projectprops.villa ||
                    type === projectprops.rowHouse ||
                    type === projectprops.independent)
                    ? [
                        {
                          label: "Plot Area",
                          value: `${formatNumberWithSuffix(
                            floorData.plotArea,
                            false
                          )} sq.ft`,
                        },
                      ]
                    : []),
                  ...(floorData.ga && type !== projectprops.plot
                    ? [
                        {
                          label: "Garden Space",
                          value: `${floorData.ga} sq.ft`,
                        },
                      ]
                    : []),
                  ...(floorData.gardenArea &&
                  (type === projectprops.villa ||
                    type === projectprops.rowHouse ||
                    type === projectprops.villament)
                    ? [
                        {
                          label: "Garden Area",
                          value: `${formatNumberWithSuffix(
                            floorData.gardenArea,
                            false
                          )} sq.ft`,
                        },
                      ]
                    : []),
                  ...(floorData.ta && type !== projectprops.plot
                    ? [
                        {
                          label: "Terrace Area",
                          value: `${formatNumberWithSuffix(
                            floorData.ta,
                            false
                          )} sq.ft`,
                        },
                      ]
                    : []),
                  ...(floorData.ba && type !== projectprops.plot
                    ? [
                        {
                          label: "Balcony Area",
                          value: `${floorData.ba} sq.ft`,
                        },
                      ]
                    : []),
                  ...(floorData.terraceArea &&
                  floorData.terraceArea !== "null" &&
                  (type === projectprops.villa ||
                    type === projectprops.rowHouse ||
                    type === projectprops.villament ||
                    type === projectprops.independent)
                    ? [
                        {
                          label: "Terrace Area",
                          value: `${formatNumberWithSuffix(
                            floorData.terraceArea,
                            false
                          )} sq.ft`,
                        },
                      ]
                    : []),
                  ...(floorData.totalBalconySize &&
                  type === projectprops.villament
                    ? [
                        {
                          label: "Balcony Size",
                          value: `${formatNumberWithSuffix(
                            floorData.totalBalconySize,
                            false
                          )} sq.ft`,
                        },
                      ]
                    : []),
                ]}
              />

              {/* Parking Details */}
              {type !== projectprops.plot &&
                (floorData.noocp ||
                  floorData.noccp ||
                  floorData.nocbp ||
                  floorData.noobp) && (
                  <DetailCard
                    icon={propertyDetailsSvgs.noOfCarParking}
                    title="Parking Details"
                    items={[
                      ...(floorData.noocp
                        ? [
                            {
                              label: "Open Car Parking",
                              value: floorData.noocp,
                            },
                          ]
                        : []),
                      ...(floorData.noccp
                        ? [
                            {
                              label: "Closed Car Parking",
                              value: floorData.noccp,
                            },
                          ]
                        : []),
                      ...(floorData.nocbp
                        ? [
                            {
                              label: "Closed Bike Parking",
                              value: floorData.nocbp,
                            },
                          ]
                        : []),
                      ...(floorData.noobp
                        ? [
                            {
                              label: "Open Bike Parking",
                              value: floorData.noobp,
                            },
                          ]
                        : []),
                    ]}
                  />
                )}

              {/* Other Details */}
              <DetailCard
                icon={propertyDetailsSvgs.facingName}
                title="Other Details"
                items={[
                  {
                    label:
                      type === projectprops.plot ? "Plot Facing" : "Facing",
                    value: floorData.facingName ?? "",
                  },
                  ...(floorData.totalNumberOfBalcony &&
                  type !== projectprops.plot
                    ? [
                        {
                          label: "Number of Balconies",
                          value: floorData.totalNumberOfBalcony.toString(),
                        },
                      ]
                    : []),
                  ...(type !== projectprops.plot
                    ? [
                        {
                          label: "Number of Bathrooms",
                          value:
                            floorData.totalNumberofBathroom?.toString() ?? "0",
                        },
                      ]
                    : []),
                  ...(type === projectprops.plot && floorData.length
                    ? [
                        {
                          label: "Length of Plot",
                          value: `${floorData.length} ft.`,
                        },
                      ]
                    : []),
                  ...(type === projectprops.plot && floorData.width
                    ? [
                        {
                          label: "Breadth of Plot",
                          value: `${floorData.width} ft.`,
                        },
                      ]
                    : []),
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DetailCardProps {
  icon: JSX.Element;
  title: string;
  items: Array<{ label: string; value: string | number }>;
}

const DetailCard = ({ icon, title, items }: DetailCardProps) => {
  if (items.length === 0) return null;

  return (
    <div className="bg-[#F8FBFF] p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <div className="bg-[#ECF7FF] p-2 rounded-lg">{icon}</div>
        <h3 className="text-[#303A42] font-semibold">{title}</h3>
      </div>
      <div className="space-y-2">
        {items.map((item) => {
          return (
            <div key={item.label} className="flex justify-between text-sm">
              <span className="text-[#4D6677]">{item.label}</span>
              <span className="text-[#1A1A1A] font-semibold">{item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FloorPlanModal;
