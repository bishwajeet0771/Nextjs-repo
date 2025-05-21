// import useSearchFilters from "@/app/hooks/search";
import { HomeIcon, RentIcon } from "@/app/images/HomePageIcons";
// import { homeSearchFiltersAtom } from "@/app/store/home";
import clsx from "clsx";
import { useAtom } from "jotai";
import React from "react";
import { homeSearchFiltersAtom } from "@/app/store/home";
type Props = {};

export default function Tabs({}: Props) {
  const [filters, dispatch] = useAtom(homeSearchFiltersAtom);
  const activeTab = filters.cg ?? "S";
  const setActiveTab = (tab: string) => {
    // console.log(tab);
    if (tab == "R") {
      dispatch({ type: "SET_BUGDET_VALUE", payload: [0, 100000] });
    } else {
      dispatch({ type: "SET_BUGDET_VALUE", payload: [500000, 600000000] });
    }
    dispatch({ type: "SET_CG", payload: tab });
  };
  return (
    <div className="py-3 pr-3 sm:py-4 sm:pr-4 sm:p-4">
      <div className="flex space-x-1 sm:space-x-4">
        <button
          onClick={() => setActiveTab("S")}
          className={`text-black text-center text-[12px] sm:text-[18px] not-italic font-semibold min-w-14 relative bg-transparent ${
            activeTab === "S"
              ? "!text-brand-green-900 font-semibold text-[12px] sm:text-[18px] f5fff6]"
              : ""
          }`}
        >
          <Box active={activeTab === "S"} Icon={HomeIcon} />
          Buy
          <span className="h-[2px] sm:h-[4px] ">
            {activeTab === "S" && config.underLine}
          </span>
        </button>
        {filters.propType != 32 && (
          <button
            onClick={() => setActiveTab("R")}
            className={`text-black text-center text-[12px] sm:text-[18px] not-italic font-semibold min-w-14 relative ${
              activeTab === "R"
                ? "!text-brand-green-900 font-semibold text-[12px] sm:text-[18px] f5fff6]"
                : ""
            }`}
          >
            <Box active={activeTab === "R"} Icon={RentIcon} />
            Rent
            <span className="h-[2px] sm:h-[4px] ">
              {activeTab === "R" && config.underLine}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
type BoxProps = {
  active: boolean;
  Icon: any;
};
const Box = ({ active, Icon }: BoxProps) => {
  return (
    <span
      className={clsx(
        "flex h-[40px] sm:h-[54px] justify-center items-center self-stretch rounded shadow-[0px_4px_36.5px_0px_rgba(194,194,194,0.60)] p-[6px] sm:p-[11px] border-[0.5px] border-solid border-[#8EA8CF] bg-[#fcfcfc] absolute top-[-40px] left-[8px] sm:left-0 sm:top-[-56px] w-[40px] sm:w-[54px]",
        active &&
          "shadow-[0px_4px_7px_0px_rgba(140,197,63,0.34)_inset,0px_4px_36.5px_0px_rgba(194,194,194,0.60)] border-[0.5px] border-solid border-[#148B16] bg-[#F5FFF6]"
      )}
    >
      <Icon fill={active ? "#148B16" : "#2B333F"} />
    </span>
  );
};
const config = {
  underLine: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="54"
      height="4"
      viewBox="0 0 54 4"
      fill="none"
    >
      <path
        d="M0 4C0 1.79086 1.79086 0 4 0H50C52.2091 0 54 1.79086 54 4H0Z"
        fill="url(#paint0_linear_4037_315)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4037_315"
          x1="31"
          y1="3"
          x2="31"
          y2="-4.85565e-07"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#8CC53F" />
          <stop offset="1" stopColor="#148B16" />
        </linearGradient>
      </defs>
    </svg>
  ),
};
