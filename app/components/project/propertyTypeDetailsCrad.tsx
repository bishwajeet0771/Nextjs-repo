/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import { FlooringIcon, FloorsIcon, TowerIcon } from "../../images/commonSvgs";
import {
  projectprops,
  // propertyDetailsTypes
} from "../../data/projectDetails";
import {
  apartmentCardImg,
  plotCardImg,
  rowhouseCardImg,
  villaCardImg,
  villamentCardImg,
} from "@/app/images/commonImages";
import Image from "next/image";
import { useAtom, useSetAtom } from "jotai";
import { currentPhaseAtom, propCgIdAtom } from "@/app/store/vewfloor";
import { formatCurrency, formatNumberWithSuffix } from "@/app/utils/numbers";
// import { useFloorPlanPopup } from "@/app/hooks/useFloorPlanPopup";
import { floorPlansArray, selectedFloorAtom } from "@/app/store/floor";
import { parseUnits } from "@/app/utils/unitparser";
import {
  // QueryCache,
  useQuery,
} from "react-query";
// import { queryClient } from "@/app/utils/query";
import {
  // getCachedProjectUnits,
  getProjectUnits,
} from "@/app/utils/api/project";
// import { useParams } from "next/navigation";
import clsx from "clsx";
import ShowUnitsButton from "./button/showUnits";
import { countPlots } from "@/app/utils/count/plot";
import { pluralizeOrSingularize } from "@/app/utils/plural";
import RTK_CONFIG from "@/app/config/rtk";
// import { NumberFormatter } from "@mantine/core";
import { currentBlockAtom, isScrollingAtom, stickyAtom } from "./navigation";
import Tooltip from "../atoms/Tooltip";
// import { PropertyUnit } from "./newFloorPlan/types/floor-plan";
import { modalStateAtom } from "@/app/store/new-floor-plan-state";

type Props = {
  cg: any;
  propertyType: string;
  phase: number;
  isPartialData: boolean;
  slug: string;
};
export const getPropId = (key: string) => {
  switch (key) {
    case "apt":
      return projectprops.apartment;

    case "plot":
      return projectprops.plot;

    case "rowHouse":
      return projectprops.rowHouse;

    case "villa":
      return projectprops.villa;

    case "vlmt":
      return projectprops.villament;

    default:
      return 35;
  }
};
export default function PropertyTypeDetailsCrad({
  cg,
  propertyType,
  phase,
  isPartialData,
  slug,
}: Props) {
  // const [, { open }] = useFloorPlanPopup();
  const [, setModalState] = useAtom(modalStateAtom);
  const setcurrentPhase = useSetAtom(currentPhaseAtom);
  const setPrpCgId = useSetAtom(propCgIdAtom);
  const setSelectedFloor = useSetAtom(selectedFloorAtom);
  const [, setFloorsArray] = useAtom(floorPlansArray);
  const setIsScrolling = useSetAtom(isScrollingAtom);
  const setSticky = useSetAtom(stickyAtom);
  const setC = useSetAtom(currentBlockAtom);
  const { data: projectUnitsData } = useQuery({
    queryKey: [`/${getPropId(propertyType)}/${phase}/${slug}`],
    queryFn: () => getProjectUnits(slug, phase, getPropId(propertyType)),
    ...RTK_CONFIG,
  });
  const handleOpen = (unit: any) => {
    setModalState({
      isOpen: true,
      unit: unit,
      type: "overview",
      isPartialUnit: false,
    });
  };
  const updateValues = (newCurrentPhase: number, newPropCgId: number) => {
    setcurrentPhase(newCurrentPhase);
    setPrpCgId(newPropCgId);
    setFloorsArray(projectUnitsData);
    setSelectedFloor(null);
    handleOpen(projectUnitsData[0] ? projectUnitsData[0] : null);
  };

  function scrollToTopic(id: string): void {
    setIsScrolling(true);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
      setSticky(true);
    }
    setC("floorPlans");
    setTimeout(() => setIsScrolling(false), 3000);
  }
  const propName = (key: string, type?: string) => {
    switch (key) {
      case "apt":
        if (type == "name") {
          return "Apartment";
        } else {
          return apartmentCardImg;
        }

      case "plot":
        if (type == "name") {
          return "Plot";
        } else {
          return plotCardImg;
        }

      case "rowHouse":
        if (type == "name") {
          return "Rowhouse";
        } else {
          return rowhouseCardImg;
        }

      case "villa":
        if (type == "name") {
          return "Villa";
        } else {
          return villaCardImg;
        }

      case "vlmt":
        if (type == "name") {
          return "Villament";
        } else {
          return villamentCardImg;
        }
    }
  };
  const plotCounts =
    propertyType === "plot" && projectUnitsData && countPlots(projectUnitsData);
  const getElevationString = (tower: any) => {
    if (propertyType === "rowHouse" || propertyType === "villa") {
      return cg.elevation;
    }

    const basement = tower.elevationBasement || 0;
    const podium = tower.noOfPodium || 0;
    const floors = tower.totalFloor || 0;

    let str = "";
    if (basement > 0) str += `${basement}B+`;
    if (podium > 0) str += `${podium}P+`;
    str += "G+";
    str += floors;

    return str;
  };

  const getElevationTooltip = (tower: any) => {
    if (propertyType === "rowHouse" || propertyType === "villa") {
      return `Ground + ${cg.elevation} Floors`;
    }

    // Find tower with max floors
    let maxTower = cg.towerData?.reduce((max: any, t: any) => {
      return t.totalFloor > (max?.totalFloor || 0) ? t : max;
    }, cg.towerData[0]);

    if (!maxTower) {
      maxTower = tower;
    }

    const basement = maxTower.elevationBasement || 0;
    const podium = maxTower.noOfPodium || 0;
    const floors = maxTower.totalFloor || 0;

    let str = "";
    if (basement > 0) str += `${basement} Basement${basement > 1 ? "s" : ""}, `;
    if (podium > 0) str += `${podium} Podium${podium > 1 ? "s" : ""}, `;
    str += "Ground Floor, ";
    str += `${floors} Floor${floors > 1 ? "s" : ""}`;

    return str;
  };

  const maxElevation =
    propertyType === "rowHouse" || propertyType === "villa"
      ? `G+${cg.elevation}`
      : cg.towerData &&
        cg.towerData?.reduce((max: string, tower: any) => {
          const elevStr = getElevationString(tower);
          const currElevation = tower.totalFloor || 0;
          const maxElevation = max ? parseInt(max.split("+").pop() || "0") : 0;
          return currElevation > maxElevation ? elevStr : max;
        }, "");

  const elevationTooltip =
    propertyType === "rowHouse" || propertyType === "villa"
      ? getElevationTooltip({})
      : cg.towerData && cg.towerData[0] && getElevationTooltip(cg.towerData[0]);

  return (
    <div
      className="flex  justify-between items-start h-[174px]  sm:h-[227px] w-[100%] sm:max-w-[359px] lg:max-w-[510px] rounded-[24px] shadow-md pr-[1%] pl-[1%] mt-[70px] bg-gradient-to-l from-[#EFF5FF] /50 to-[#F2FAFF]/50 mb-[2%] cursor-pointer"
      onClick={() =>
        isPartialData
          ? scrollToTopic("floor-plans")
          : updateValues(phase, getPropId(propertyType as string))
      }
    >
      <div className="leftSection  w-[63%] sm:max-w-[46%] flex flex-col   justify-between h-full sm:h-[225px] pl-2 sm:pl-0">
        <div className="max-w-[90px] lg:max-w-[115px] w-full justify-center flex items-center h-[90px] lg:h-[115px] border-solid border-1 border-[#FFF] rounded-full bg-[#c9daee] relative bottom-[50px] lg:bottom-[60px] mb-[-40px]">
          <Image
            width={150}
            height={150}
            src={propName(propertyType, "img") as string}
            alt={propName(propertyType, "name") as string}
            className="w-[88%] h-[88%] object-cover rounded-[14px]"
            unoptimized
            title={propName(propertyType, "name") as string}
          />
        </div>
        <div className="down mb-3">
          <div className="flex   mt-[36px] gap-x-[16px] flex-wrap  ">
            {propertyType == "apt" || propertyType == "vlmt" ? (
              <p className="text-[12px] lg:text-[20px] text-[#2A4C70] font-[500] flex justify-start items-start  ">
                <TowerIcon className="w-[16px] h-[16px] lg:w-[24px] lg:h-[24px]" />
                <span className="mr-[6px] ml-[6px]"> {cg?.elevation} </span>{" "}
                Tower{cg?.elevation > 1 ? "s" : ""}
              </p>
            ) : (
              ""
            )}
            <p className="text-[12px] lg:text-[20px] text-[#2A4C70] font-[500] flex justify-start items-start  ">
              <FlooringIcon className="w-[16px] h-[16px] lg:w-[24px] lg:h-[24px]" />
              <span className="mr-[6px] ml-[6px]">
                {cg ? formatNumberWithSuffix(cg.unitCount, false) : ""}{" "}
              </span>{" "}
              Units
            </p>
            {propertyType !== "plot" ? (
              <Tooltip text={<p>{elevationTooltip}</p>}>
                <p className="text-[12px] lg:text-[20px] text-[#2A4C70] font-[500] flex justify-start items-start  ">
                  <FloorsIcon className="w-[16px] h-[16px] lg:w-[24px] lg:h-[24px]" />
                  Elevation{" "}
                  <span className="mr-[6px] ml-[6px]">{maxElevation}</span>{" "}
                </p>
              </Tooltip>
            ) : (
              ""
            )}
          </div>

          <button aria-label="View Floor Plans" name="View Floor Plans" title="View Floor Plans" className="text-[12px] lg:text-[18px] inline-flex max-w-fit justify-center items-center gap-2.5 px-2 py-1 mb-[2%] cursor-pointer  rounded border-[0.8px] border-solid border-[#0073C6] bg-[#fff] text-[#0073C6]  not-italic font-semibold leading-[normal]">
            View Floor Plans
          </button>
        </div>
      </div>
      <div className="rightSection pt-3 flex flex-col w-full pr-2 sm:pr-0">
        <h3 className="text-[#242424] text-[14px]   md:text-xl not-italic font-semibold leading-[normal] ml-[10px] text-right">
          {propName(propertyType, "name")}
        </h3>
        <h4 className="text-[14px] text-right lg:text-[22px] text-[#148B16]  not-italic font-bold leading-[normal] mt-2">
          {cg.minPrice && cg.maxPrice
            ? `${formatCurrency(cg?.minPrice)} - ${formatCurrency(
                cg?.maxPrice
              )}`
            : "Coming Soon"}
        </h4>
        <h5 className="text-[12px] sm:text-[16px] xl:text-lg text-wrap text-[#242424] text-right  italic font-medium leading-[normal]">
          {formatCurrency(cg?.basePrice)} Base Price/ sq.ft
        </h5>
        <div className="text-[14px] sm:text-[18px] xl:text-[22px]  text-right text-[#4D6677]  not-italic font-semibold leading-[normal] capitalize mt-3 ">
          Unit types : <br />{" "}
          {propertyType !== "plot" ? (
            <p
              className={clsx(
                "text-[#242424] text-right text-[12px] sm:text-[16px] xl:text-lg not-italic font-semibold leading-[22px] max-w-[240px] inline-block w-[100%] line-clamp-1"
              )}
            >
              {parseUnits(cg?.unitTypes, propertyType).join(", ")}
            </p>
          ) : (
            <>
              <p className="text-[#242424] text-right text-[12px] sm:text-base not-italic font-semibold leading-[normal]">
                {plotCounts?.standardPlotCount > 0 &&
                  `Standard Plot : ${
                    plotCounts?.standardPlotCount
                  } ${pluralizeOrSingularize(
                    plotCounts?.standardPlotCount,
                    "Units"
                  )} `}
              </p>
              <p className="text-[#242424] text-right text-[12px] sm:text-base not-italic font-semibold leading-[normal] min-h-[19px]">
                {plotCounts?.oddPlotCount > 0 &&
                  `Odd Plot : ${
                    plotCounts?.oddPlotCount
                  } ${pluralizeOrSingularize(
                    plotCounts?.oddPlotCount,
                    "Units"
                  )}`}
              </p>
            </>
          )}
        </div>
        {(cg?.unitTypes?.length > 2 || propertyType === "plot") && (
          <ShowUnitsButton cg={{ ...cg, propertyType, plotData: plotCounts }} />
        )}
      </div>
    </div>
  );
}

// export function PropertyTypeDetailsCradTest({
//   cg,
//   propertyType,
//   phase,
// }: Props) {
//   const { slug } = useParams<{ slug: string }>();
//   const [, { open }] = useFloorPlanPopup();
//   const setcurrentPhase = useSetAtom(currentPhaseAtom);
//   const setPrpCgId = useSetAtom(propCgIdAtom);
//   const setSelectedFloor = useSetAtom(selectedFloorAtom);
//   const [, setFloorsArray] = useAtom(floorPlansArray);
//   const { data: projectUnitsData } = useQuery({
//     queryKey: [`/${getPropId(propertyType)}/${phase}/${slug}`],
//     queryFn: () => getProjectUnits(slug, phase, getPropId(propertyType)),
//   });
//   const handleOpen = () => {
//     open("overview");
//   };
//   const updateValues = (newCurrentPhase: number, newPropCgId: number) => {
//     setcurrentPhase(newCurrentPhase);
//     setPrpCgId(newPropCgId);
//     setFloorsArray(projectUnitsData);
//     setSelectedFloor(null);
//     handleOpen();
//   };

//   const propName = (key: string, type?: string) => {
//     switch (key) {
//       case "apt":
//         if (type == "name") {
//           return "Apartment";
//         } else {
//           return apartmentCardImg;
//         }
//         break;
//       case "plot":
//         if (type == "name") {
//           return "Plot";
//         } else {
//           return plotCardImg;
//         }
//         break;
//       case "rowHouse":
//         if (type == "name") {
//           return "Rowhouse";
//         } else {
//           return rowhouseCardImg;
//         }
//         break;
//       case "villa":
//         if (type == "name") {
//           return "Villa";
//         } else {
//           return villaCardImg;
//         }
//         break;
//       case "vlmt":
//         if (type == "name") {
//           return "Villament";
//         } else {
//           return villamentCardImg;
//         }
//         break;
//     }
//   };
//   return (
//     <div
//       className="flex flex-col justify-start items-start min-h-[235px] w-[100%] max-w-[359px] lg:max-w-[510px] rounded-[24px] shadow-md pr-[2%] pl-[1%] mt-[70px] bg-gradient-to-l from-[#EFF5FF] /50 to-[#F2FAFF]/50 mb-[2%] cursor-pointer"
//       onClick={() => updateValues(phase, getPropId(propertyType as string))}
//     >
//       <div className="flex justify-between items-start w-full ">
//         <div className="max-w-[150px] lg:max-w-[115px] w-full h-[90px] lg:h-[115px] border-solid border-1 border-[#FFF] rounded-full bg-[#c9daee] relative bottom-[50px] lg:bottom-[60px] mb-[-40px]">
//           <Image
//             width={90}
//             height={90}
//             src={propName(propertyType, "img") as string}
//             alt="Preview"
//             className="w-full h-full object-cover rounded-[14px]"
//           />
//         </div>
//         <div className="flex justify-between items-start mb-[3%] w-[90%] mt-[3%]">
//           <p className="text-[16px] lg:text-[18px] text-[#00487C] font-[600] ml-[10px]">
//             {propName(propertyType, "name")}
//           </p>

//           <div className="flex justify-end items-end flex-col">
//             <p className="text-[16px] text-right lg:text-[18.5px] text-[#148B16] font-[700]">
//               {formatCurrency(cg?.minPrice)} - {formatCurrency(cg?.maxPrice)}
//             </p>
//             <p className="text-[14px] lg:text-[16px] italic text-[#00487C] font-[500]">
//               ₹ {cg?.basePrice} Base Price/ sq.ft
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-end items-end flex-col w-full ">
//         <p className="text-[14px] lg:text-[18px] text-[#233] font-[500] mb-[3%] text-right">
//           UNITS: {parseUnits(cg?.unitTypes)}
//         </p>
//         <div className="flex justify-end items-end mb-[3%] gap-[16px]">
//           {propertyType == "apt" || propertyType == "vlmt" ? (
//             <p className="text-[14px] lg:text-[20px] text-[#2A4C70] font-[500] flex justify-start items-start  ">
//               <TowerIcon className="w-[16px] h-[16px] lg:w-[24px] lg:h-[24px]" />
//               <span className="mr-[6px] ml-[6px]"> {cg?.elevation} </span>{" "}
//               Towers
//             </p>
//           ) : (
//             ""
//           )}
//           <p className="text-[14px] lg:text-[20px] text-[#2A4C70] font-[500] flex justify-start items-start  ">
//             <FlooringIcon className="w-[16px] h-[16px] lg:w-[24px] lg:h-[24px]" />
//             <span className="mr-[6px] ml-[6px]">{cg?.unitCount} </span> Units
//           </p>
//           {propertyType === "rowHouse" || propertyType === "villa" ? (
//             <p className="text-[14px] lg:text-[20px] text-[#2A4C70] font-[500] flex justify-start items-start  ">
//               <FloorsIcon className="w-[16px] h-[16px] lg:w-[24px] lg:h-[24px]" />
//               <span className="mr-[6px] ml-[6px]">{"G+" + cg?.elevation}</span>{" "}
//               Elevation
//             </p>
//           ) : (
//             ""
//           )}
//         </div>

//         <button className="text-[16px] lg:text-[18px] text-[#0073C6] font-[600] underline mb-[2%] cursor-pointer mt-[28px]">
//           View Floor Plans
//         </button>
//       </div>
//     </div>
//   );
// }
