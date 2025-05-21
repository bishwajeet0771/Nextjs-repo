"use client";
import { Divider } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import React from "react";
// import S from "./Style.module.css";
import {
  apartmentCardImg,
  plotCardImg,
  rowhouseCardImg,
  villaCardImg,
  villamentCardImg,
} from "@/app/images/commonImages";
import { formatCurrency } from "@/app/utils/numbers";
import { useAtom } from "jotai";
import { overviewAtom } from "@/app/store/overview";
import {
  ApartmentIcon,
  FlooringIcon,
  FloorsIcon,
  Marble,
  PlotIcon,
  RowHouseIcon,
  TowerIcon,
  VillaIcon,
  VillamentIcon,
} from "@/app/images/commonSvgs";
import { BACKEND_PROP_TYPES, projectprops } from "@/app/data/projectDetails";
import { sortUnits } from "@/app/utils/unitparser";
import { pluralizeOrSingularize } from "@/app/utils/plural";
// import { useDrag } from "@use-gesture/react";
import DrawerBox from "../../property/pricingbreakup/DrawerBox";
const iconStyles: string =
  " flex items-center justify-center w-[40px] h-[40px]  text-[#001F35]";
export default function FloorplanDrawer() {
  const [cg, setData] = useAtom(overviewAtom);
  const getIcon = (id: number) => {
    let iconComponent;
    switch (id) {
      case projectprops.apartment:
        iconComponent = (
          <ApartmentIcon
            className={iconStyles}
            sc={{
              h: 38,
              w: 38,
              color: "#001F35",
            }}
          />
        );
        break;
      case projectprops.rowHouse:
        iconComponent = (
          <RowHouseIcon
            className={iconStyles}
            sc={{
              h: 38,
              w: 38,
              color: "#001F35",
            }}
          />
        );
        break;
      case projectprops.villa:
        iconComponent = (
          <VillaIcon
            className={iconStyles}
            sc={{
              h: 38,
              w: 38,
              color: "#001F35",
            }}
          />
        );
        break;
      case projectprops.villament:
        iconComponent = (
          <VillamentIcon
            className={iconStyles}
            sc={{
              h: 38,
              w: 38,
              color: "#001F35",
            }}
          />
        );
        break;
      case projectprops.plot:
        iconComponent = (
          <PlotIcon
            className={iconStyles}
            sc={{
              h: 38,
              w: 38,
              color: "#001F35",
            }}
          />
        );
        break;
      default:
        break;
    }
    return iconComponent;
  };

  const [, { close }] = useDisclosure(false);
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
  const handleClose = () => {
    close();
    setData({});
  };
  // const bind = useDrag(
  //   ({ movement: [mx], direction: [dx], memo = mx, cancel }) => {
  //     // If the user is swiping left (negative direction)
  //     if (dx === 1 && mx > 50) {
  //       handleClose();
  //       cancel();
  //     }
  //     return memo;
  //   },
  //   { axis: "x", pointer: { touch: true } }
  // );
  return (
    // <Drawer
    //   opened={Object.keys(cg).length > 0 ? true : false}
    //   onClose={handleClose}
    //   title="property Details"
    //   position="right"
    //   zIndex={1000}
    //   classNames={S}
    //   {...bind()}
    // >
    (Object.keys(cg).length > 0) &&
    <DrawerBox
      key="floorplanDrawer"
      isOpen={Object.keys(cg).length > 0}
      title="property Details"
      handleChange={handleClose}
    >

      <h3 className="ml-[16px] gap-1 pl-1 pr-2 py-1 xl:gap-2.5 w-auto  items-center xl:pl-2.5  xl:py-2.5 bg-[#EEF7FE] text-[#001F35] text-[18px] md:text-[24px] not-italic font-semibold leading-[normal] capitalize xl:w-full mt-2 xl:mt-4 max-w-[90%] inline-flex">
        {getIcon(
          BACKEND_PROP_TYPES[
            cg?.propertyType as keyof typeof BACKEND_PROP_TYPES
          ]
        )}{" "}
        {propName(cg.propertyType, "name")} details
      </h3>
        {/* Right */}
        <div className="flex items-center space-x-4 mt-6 ml-[16px]">
          {" "}
          <div className="max-w-[70px] lg:max-w-[115px] w-full h-[70px] lg:h-[115px] border-solid border-1 border-[#FFF] rounded-full bg-[#c9daee]  lg:bottom-[60px] ">
            <Image
              width={70}
              height={70}
              src={propName(cg?.propertyType, "img") as string}
              alt="Preview"
              className="w-full h-full object-cover rounded-[14px]"
            />
          </div>
          {/* Left */}
          <div>
            {" "}
            <p className="text-[16px]  lg:text-2xl text-[#148B16]  not-italic font-bold leading-[normal] mt-2">
              {formatCurrency(cg?.minPrice)} - {formatCurrency(cg?.maxPrice)}
            </p>
            <p className="text-[14px] lg:text-2xl text-[#242424]   italic font-medium leading-[normal]">
              {formatCurrency(cg?.basePrice)} Base Price/ sq.ft
            </p>
          </div>
        </div>
      <div className="inline-flex items-center gap-4 p-2 sideBarBg mt-5 ml-[16px]">
        <div className="flex gap-x-[16px] flex-wrap  ">
          {cg?.propertyType == "apt" || cg?.propertyType == "vlmt" ? (
            <p className="text-[14px] lg:text-[20px] text-[#2A4C70] font-[500] flex justify-start items-center  ">
              <TowerIcon className="w-[16px] h-[16px] lg:w-[24px] lg:h-[24px]" />
              <span className="mr-[6px] ml-[6px]"> {cg?.elevation} </span> Tower
              {cg?.elevation > 1 ? "s" : ""}
            </p>
          ) : (
            ""
          )}
          <p className="text-[14px] lg:text-[20px] bg-[#EEE] text-[#001F35] font-[500] flex justify-start items-center  ">
            <FlooringIcon className="md:h-[32px] md:w-[32px] h-[24px] w-[24px]" />
            <span className="mr-[6px] ml-[6px]">{cg?.unitCount} </span> Units
          </p>
          {cg?.propertyType === "rowHouse" || cg.propertyType === "villa" ? (
            <p className="text-[14px] lg:text-[20px] bg-[#EEE] text-[#001F35] font-[500] flex justify-start items-center  ">
              <FloorsIcon className="w-[16px] h-[16px] lg:w-[24px] lg:h-[24px]" />
              <span className="mr-[6px] ml-[6px]">{"G+" + cg?.elevation}</span>{" "}
              Elevation
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
      <Table data={cg?.unitTypes} cg={cg} propertyType={cg?.propertyType} />
      {/* Drawer content */}
      </DrawerBox>
  );
}

const Table = ({ data, propertyType, cg }: any) => {
  return (
    <div className="flex flex-col justify-center items-start gap-3.5 px-[9px] py-2.5 border rounded-[10px] border-solid border-[#9AB1BC] mt-5 max-w-[90%] ml-[16px]">
      <h1 className="flex items-center gap-2.5 pl-2.5 w-full py-2.5 rounded-lg bg-[#ebeaff] text-[#001F35] text-[16px] xl:text-[21px] not-italic font-semibold leading-[normal] capitalize">
        <Marble /> Unit Types
      </h1>
      <div className={`flex  pr-3`}>
        {propertyType !== "plot" && (
          <ul className="list-disc pl-8">
            {data &&
              sortUnits(data)?.map((item: any) => (
                <li
                  key={item}
                  className="text-[#242424] text-[16px] xl:text-[21px] not-italic font-semibold leading-[normal] capitalize"
                >
                  {propertyType === "plot" ? item.split("_").join(" x ") : item}
                </li>
              ))}
          </ul>
        )}
        {propertyType === "plot" && cg?.plotData?.standardPlotCount > 0 && (
          <PlotTable
            data={data}
            propertyType={propertyType}
            cg={cg}
            type="standard"
          />
        )}
        {propertyType === "plot" &&
          (cg?.plotData?.standardPlotCount && cg?.plotData?.oddPlotCount) >
            0 && <Divider orientation="vertical" color="#92B2C8" mx={10} />}
        {propertyType === "plot" && cg?.plotData?.oddPlotCount > 0 && (
          <PlotTable
            data={data}
            propertyType={propertyType}
            cg={cg}
            type="odd"
          />
        )}
      </div>
    </div>
  );
};

interface PlotTableProps {
  data: any;
  propertyType: string;
  cg: {
    plotData: {
      [key: string]: any;
      standardPlots?: string[];
      oddPlots?: string[];
      standardPlotCount?: number;
      oddPlotCount?: number;
    };
  };
  type: "standard" | "odd";
}

const PlotTable: React.FC<PlotTableProps> = ({
  // eslint-disable-next-line no-unused-vars
  data,
  propertyType,
  cg,
  type,
}) => {
  const isMobile = useMediaQuery("max:width:601px");
  const key = type === "standard" ? "standardPlots" : "oddPlots";
  const keyCount = type === "standard" ? "standardPlotCount" : "oddPlotCount";
  const title = type === "standard" ? "Standard Unit" : "Odd Unit";
  if (propertyType !== "plot") return null;
  const plotUnits: string[] = cg.plotData[key] || [];
  const unitCountMap = plotUnits.reduce(
    (acc: Record<string, number>, unit: string) => {
      acc[unit] = (acc[unit] || 0) + 1;
      return acc;
    },
    {}
  );
  const sortedUnits = Object.entries(unitCountMap).sort(([unitA], [unitB]) =>
    unitA.localeCompare(unitB)
  );

  return (
    <div>
      <div className="flex items-center gap-1.5 p-1 xl:p-2 rounded-md bg-[#EEE] text-[#001F35] text-[14px] xl:text-lg not-italic font-semibold capitalize mb-3">
        {isMobile && config.headerIcon} {title} ({cg.plotData[keyCount]}{" "}
        {pluralizeOrSingularize(cg.plotData[keyCount] as number, "Units")})
      </div>
      <ul className="list-disc pl-8">
        {sortedUnits.map(([unit, count]) => {
          const [length, width] = unit.split("_");
          return (
            <li
              key={unit}
              className="text-[#242424] text-[15px] xl:text-[21px] not-italic font-semibold leading-[normal]"
            >
              {length}ft x {width}ft{" "}
              {type === "standard" && count > 1 && (
                <span className="text-[#001F35] text-[14px] text-left xl:text-xl not-italic font-medium leading-[normal]">
                  ({count} Units)
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const config = {
  headerIcon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M16.25 2.5H3.75C3.05964 2.5 2.5 3.05964 2.5 3.75V16.25C2.5 16.9404 3.05964 17.5 3.75 17.5H16.25C16.9404 17.5 17.5 16.9404 17.5 16.25V3.75C17.5 3.05964 16.9404 2.5 16.25 2.5Z"
        stroke="#2A4C70"
        strokeLinejoin="round"
      />
      <path
        d="M11.6667 2.5L2.5 11.6667"
        stroke="#2A4C70"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.4997 8.33356L8.33301 17.5002"
        stroke="#2A4C70"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.6663 3.33356L3.33301 16.6669"
        stroke="#2A4C70"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 9.16644L7.91667 12.0831"
        stroke="#2A4C70"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.083 7.91644L14.9997 10.8331"
        stroke="#2A4C70"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};
