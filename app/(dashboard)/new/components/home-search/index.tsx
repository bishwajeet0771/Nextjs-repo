"use client";
import Image from "next/image";
import { useState } from "react";
import Tabs from "./tabs";
import Alert from "./Alert";
import QuickFilters from "./filters/QuickFilters";
// import Nearme from "./Nearme";
import SearchSec from "./SearchSec";
import { useAtomValue } from "jotai";
import { homeSearchFiltersAtom } from "@/app/store/home";
// import { toQueryParams } from "../../utils/param";
// import { SelectedHeartIcon } from "@/app/images/HomePageIcons";
import RecentSearches from "./recentSearch/RecentSearches";
import AutoCitySelectDropDown from "./filters/AutoCitySelectDropDown";
import { CityData } from "../../search";
// import { Routes } from "@/app/common/constatns/routes.constants";
// import CompareShortListCount from "./CompareShortListCount";

const HomeSearch = ({
  // count,
  cityData,
}: // shortIds,
{
  // count: number;
  cityData?: CityData;
  // shortIds?: any;
}) => {
  const f = useAtomValue(homeSearchFiltersAtom);
  const [isOpen, setIsOpen] = useState(false);
  // const handleSearch = () => {
  //   if (!f.city) {
  //     setIsOpen(true);
  //     return;
  //   }
  //   const whichPage =
  //     f.propType === 36 ? Routes.listingSearch : Routes.projectSearch;
  //   window.open(`${whichPage}?sf=${toQueryParams(f)}`, "_self", "noreferrer");
  // };

  return (
    <div
    className="px-1 sm:px-5 w-full sm:pl-0 border-2 flex justify-center items-center xl:grid xl:grid-cols-[1.1fr_2fr] gap-2 sm:pb-10 bg-white pt-[100px] sm:pt-[100px] xl:pb-4 xl:py-28 relative mt-[70px]"
  >
      {/* ✅ Refactored background image for better LCP */}
    <img
      src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/homepage/clouds.svg`}
      alt="Clouds background"
      fetchPriority="high"
      loading="eager"
      decoding="async"
      className="absolute inset-0 w-full h-full object-cover -z-10"
    />
  
    <Alert />
  
    {/* Image block */}
    <div className="items-center justify-center hidden xl:flex min-w-[200px] sm:max-w-[299px] xl:max-w-[499px] h-full">
      <Image
        priority={true}
        loading="eager"
        decoding="async"
        src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/homepage/home-search.svg`}
        alt="home-search"
        height={300}
        width={500}
        className="w-full h-full"
      />
    </div>
  
    {/* Main content */}
    <div className="w-full sm:max-w-[1066px] sm:ml-[20px] xl:ml-0 xl:mr-[20px]">
      <div className="flex flex-col items-start sm:gap-3 self-stretch pl-[11px] pr-2.5 pt-0 pb-[13px] !h-auto rounded-lg border-[0.5px] border-solid border-[#A6BDDF] bg-[#f2f7ff] sm:h-[200px] w-full mb-2 sm:mb-0">
        <Tabs />
  
        <p className="inline-flex sm:hidden justify-center items-center text-[#242424] text-[14px] not-italic font-medium gap-1">
          {config.homeIcon} All Residential
        </p>
  
        <div className="flex items-center gap-2.5 rounded shadow-[0px_4px_20px_0px_rgba(194,194,194,0.40)] px-1.5 py-1 border-[0.5px] border-solid border-[#819CA9] bg-white w-full">
          <div className="hidden sm:flex items-center gap-[5px] rounded p-2 border-r-[0.5px] border-r-gray-400 border-solid text-[#242424] xl:text-[14px] not-italic font-medium text-[12px]">
            {config.homeIcon}
            <div className="text-nowrap">All Residential</div>
          </div>
  
          <div className="text-[#242424] text-[12px] sm:text-[14px] not-italic font-[600] absolute top-[25%] right-[5%] sm:static max-w-fit sm:flex items-center gap-0.5 p-1 bg-[#ECF0F3]">
            <AutoCitySelectDropDown
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              cityData={cityData}
            />
          </div>
  
          <SearchSec />
        </div>
  
        {f.showFilter && <QuickFilters />}
      </div>
  
      <RecentSearches />
    </div>
  </div>
  
  );
};

export default HomeSearch;

const config = {
  homeIcon: (
    <svg
      className="min-h-[16px] min-w-[16px]"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M8.306 1.10722C8.21728 1.03805 8.108 1.00049 7.9955 1.00049C7.883 1.00049 7.77372 1.03805 7.685 1.10722L0.5 6.70972L1.1215 7.49572L2 6.81072V13.0002C2.00053 13.2653 2.10606 13.5193 2.29348 13.7067C2.4809 13.8942 2.73495 13.9997 3 14.0002H13C13.2651 13.9997 13.5191 13.8942 13.7065 13.7067C13.8939 13.5193 13.9995 13.2653 14 13.0002V6.81522L14.8785 7.50022L15.5 6.71422L8.306 1.10722ZM9 13.0002H7V9.00022H9V13.0002ZM10 13.0002V9.00022C10 8.73501 9.89464 8.48065 9.70711 8.29312C9.51957 8.10558 9.26522 8.00022 9 8.00022H7C6.73478 8.00022 6.48043 8.10558 6.29289 8.29312C6.10536 8.48065 6 8.73501 6 9.00022V13.0002H3V6.03122L8 2.13622L13 6.03622V13.0002H10Z"
        fill="#242424"
      />
    </svg>
  ),
  searchIcon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="hidden sm:block"
    >
      <path
        d="M20.0313 20.7901C20.4913 21.2501 21.2013 20.5401 20.7413 20.0901L16.9913 16.3301C18.3071 14.8748 19.0343 12.982 19.0313 11.0201C19.0313 6.63006 15.4613 3.06006 11.0713 3.06006C6.68133 3.06006 3.11133 6.63006 3.11133 11.0201C3.11133 15.4101 6.68133 18.9801 11.0713 18.9801C13.0513 18.9801 14.8813 18.2501 16.2813 17.0401L20.0313 20.7901ZM4.11033 11.0201C4.11033 7.18006 7.24033 4.06006 11.0703 4.06006C14.9103 4.06006 18.0303 7.18006 18.0303 11.0201C18.0303 14.8601 14.9103 17.9801 11.0703 17.9801C7.24033 17.9801 4.11033 14.8601 4.11033 11.0201Z"
        fill="#565D70"
      />
    </svg>
  ),
  nearMe: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
    >
      <path
        d="M19 11C19 13.1217 18.1571 15.1566 16.6569 16.6569C15.1566 18.1571 13.1217 19 11 19C8.87827 19 6.84344 18.1571 5.34315 16.6569C3.84285 15.1566 3 13.1217 3 11C3 8.87827 3.84285 6.84344 5.34315 5.34315C6.84344 3.84285 8.87827 3 11 3C13.1217 3 15.1566 3.84285 16.6569 5.34315C18.1571 6.84344 19 8.87827 19 11Z"
        stroke="#148B16"
        strokeWidth="1.5"
      />
      <path
        opacity="0.5"
        d="M14 11C14 11.7956 13.6839 12.5587 13.1213 13.1213C12.5587 13.6839 11.7956 14 11 14C10.2044 14 9.44129 13.6839 8.87868 13.1213C8.31607 12.5587 8 11.7956 8 11C8 10.2044 8.31607 9.44129 8.87868 8.87868C9.44129 8.31607 10.2044 8 11 8C11.7956 8 12.5587 8.31607 13.1213 8.87868C13.6839 9.44129 14 10.2044 14 11Z"
        stroke="#148B16"
        strokeWidth="1.5"
      />
      <path
        opacity="0.5"
        d="M1 11H3M19 11H21M11 3V1M11 21V19"
        stroke="#148B16"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  drpdownIcon: (
    <svg
      className=" min-h-[14px] min-w-[5px] "
      xmlns="http://www.w3.org/2000/svg"
      width="3"
      height="5"
      viewBox="0 0 3 5"
      fill="none"
    >
      <path
        d="M0 4.29289C0 4.73835 0.538571 4.96143 0.853553 4.64645L2.64645 2.85355C2.84171 2.65829 2.84171 2.34171 2.64645 2.14645L0.853554 0.353554C0.538571 0.0385714 0 0.261654 0 0.707107L0 4.29289Z"
        fill="#0073C6"
      />
    </svg>
  ),
  searchBtnIcon: (
    <svg
      className="min-w-[18px] min-h-[18px] "
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
    >
      <path
        strokeWidth="2"
        d="M11.6849 12.6267C11.9533 12.895 12.3674 12.4808 12.0991 12.2183L9.91161 10.025C10.6791 9.1761 11.1033 8.07196 11.1016 6.92751C11.1016 4.36668 9.01911 2.28418 6.45827 2.28418C3.89744 2.28418 1.81494 4.36668 1.81494 6.92751C1.81494 9.48835 3.89744 11.5708 6.45827 11.5708C7.61328 11.5708 8.68078 11.145 9.49744 10.4392L11.6849 12.6267ZM2.39769 6.92751C2.39769 4.68751 4.22352 2.86751 6.45769 2.86751C8.69769 2.86751 10.5177 4.68751 10.5177 6.92751C10.5177 9.16751 8.69769 10.9875 6.45769 10.9875C4.22352 10.9875 2.39769 9.16751 2.39769 6.92751Z"
        fill="#FFFFFF"
      />
    </svg>
  ),
};
