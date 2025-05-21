"use client";
// import { BasicMultiSelect } from "@/app/(dashboard)/new/components/home-search/filters/BhkTypeSelect";
// import { BasicBudgetSelect } from "@/app/(dashboard)/new/components/home-search/filters/BugdetSelect";
import { CustomBhkTypeSelect } from "@/app/(dashboard)/new/components/home-search/filters/CustomBhkTypeSelect";
import { CustomBugdetSelect } from "@/app/(dashboard)/new/components/home-search/filters/CustomBugdetSelect";
// import { BasicSelect } from "@/app/(dashboard)/new/components/home-search/filters/Select";
import { SelectField } from "@/app/(dashboard)/new/components/home-search/filters/SelectField";
import { toQueryParams } from "@/app/(dashboard)/new/utils/param";
import { homeSearchFiltersAtom } from "@/app/store/home";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";
import { FaSearch } from "react-icons/fa";

type Props = {};
// const propertyTypes = ["All", "Villa", "Apartment", "Villament", "Plot"];
// const priceRanges = [
//   "All",
//   "Under ₹80 Lakhs",
//   "₹80L - ₹1.2 Cr",
//   "Above ₹1.2 Cr",
// ];
// const locations = [
//   "All",
//   "Kengeri",
//   "Electronic City",
//   "Whitefield",
//   "Sarjapur Road",
// ];

export default function Filters({}: Props) {
  const router = useRouter();
  const [f] = useAtom(homeSearchFiltersAtom);

  const onSearch = () => {
    //alert(JSON.stringify(f))
    const whichPage = f.propType === 36 ? "/search/listing" : "/search";
    let redirectUrl = `${whichPage}?sf=${toQueryParams(f)}`;
    redirectUrl = redirectUrl.replace(/-listedBy=All/g, "");
    router.push(redirectUrl);
    //alert(redirectUrl)
  };

  return (
    <section className=" container sm:mx-auto    px-1  sm:px-4">
      <div className="bg-card shadow-xl rounded-xl py-1 sm:p-6 z-[500] bg-white">
        <div className="grid   md:grid-cols-2 gap-1 md:gap-4">
          {/*   <div className="flex flex-row items-center gap-4 flex-wrap"> */}
          {/* <div>
            <label className="block text-sm font-medium mb-2">
              Property Type
            </label>
            <select
              className="w-full p-3 border rounded-lg bg-background"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <select className="w-full p-3 border rounded-lg bg-background">
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Budget</label>
            <select className="w-full p-3 border rounded-lg bg-background">
              {priceRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div> */}
          <div  className="flex flex-row justify-evenly  w-[70%]">
          <SelectField />
          <CustomBhkTypeSelect />
          <CustomBugdetSelect />
          
         
            
          </div>
          <div
            onClick={onSearch}
            className=" flex sm:hidden justify-center items-center rounded-[4px] py-[4px] px-[14px] sm:px-[6px] xl:py-[6px] xl:px-[16px] text-[12px] sm:text-[14px] text-white xl:text-[16px] font-bold bg-[#0073c6] cursor-pointer"
          >
            <svg
              className="min-w-[18px] min-h-[18px] "
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
            >
              <path
                stroke-width="2"
                d="M11.6849 12.6267C11.9533 12.895 12.3674 12.4808 12.0991 12.2183L9.91161 10.025C10.6791 9.1761 11.1033 8.07196 11.1016 6.92751C11.1016 4.36668 9.01911 2.28418 6.45827 2.28418C3.89744 2.28418 1.81494 4.36668 1.81494 6.92751C1.81494 9.48835 3.89744 11.5708 6.45827 11.5708C7.61328 11.5708 8.68078 11.145 9.49744 10.4392L11.6849 12.6267ZM2.39769 6.92751C2.39769 4.68751 4.22352 2.86751 6.45769 2.86751C8.69769 2.86751 10.5177 4.68751 10.5177 6.92751C10.5177 9.16751 8.69769 10.9875 6.45769 10.9875C4.22352 10.9875 2.39769 9.16751 2.39769 6.92751Z"
                fill="#FFFFFF"
              />
            </svg>
          </div>
          <button
            onClick={onSearch}
            className="md:w-[30%] hidden sm:flex bg-primary hover:bg-primary/90 p-3 items-center justify-center gap-2  bg-btnPrimary text-white text-[14px] md:text-[16px] py-[4px] px-[8px] md:py-[6px] md:px-[12px] rounded-[4px] font-[600]"
          >
            <FaSearch />
            <span className=" text-[14px] md:text-[12px] lg:text-[14px] text-nowrap">
              Search Properties
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
