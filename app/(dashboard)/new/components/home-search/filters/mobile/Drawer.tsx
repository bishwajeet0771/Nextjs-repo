import { Drawer, Pill } from "@mantine/core";
import React from "react";
import Styles from "./S.module.css";
// import Box from "../../recentSearch/Box";
import QuickFilters from "../QuickFilters";
import Nearme from "../../Nearme";
import Tabs from "../../tabs";
import { SmallHomeIcon } from "@/app/images/HomePageIcons";
import SearchSec from "../../SearchSec";
import useSearchFilters from "@/app/hooks/search";
import classes from "@/app/styles/search.module.css";
import Link from "next/link";
type Props = {
  opened: boolean;
  close: () => void;
};

function AppDrawer({ close, opened }: Props) {
  const { filters: f, remnoveSearchOptions, setFilters } = useSearchFilters();
  return (
    <Drawer
      opened={opened}
      onClose={close}
      classNames={{
        content: Styles.content,
        overlay: Styles.overlay,
      }}
      withCloseButton={false}
    >
      <button
        className="text-[#565D70] text-sm not-italic font-medium"
        onClick={close}
      >
        Back
        {config.icon}
      </button>
      <div className="w-full mt-16">
        <div className="flex flex-col items-start sm:gap-3 self-stretch pl-[11px] pr-2.5 pt-0 pb-[13px] rounded-lg border-[0.5px] border-solid border-[#A6BDDF] bg-[#f2f7ff] sm:h-[200px] w-full">
          <Tabs />
          <p className="inline-flex sm:hidden justify-center items-center text-[#242424] text-[14px] not-italic font-medium gap-1">
            <SmallHomeIcon /> All Residential
          </p>
          <div className="flex justify-between items-center sm:gap-2.5 rounded shadow-[0px_4px_20px_0px_rgba(194,194,194,0.40)] sm:px-1.5 py-1 border-[0.5px] border-solid border-[#819CA9] bg-white w-full sm:w-auto">
            <div className="hidden sm:flex items-center gap-[5px] rounded p-2 border-r-[0.5px] border-r-gray-400 border-solid text-[#242424] sm:text-lg not-italic font-medium text-[12px]">
              <SmallHomeIcon />{" "}
              <div className="text-nowrap">All Residential</div>
            </div>

            <div className="flex justify-between items-center w-full">
              <div className="flex sm:hidden items-center ">
                {/* <button className="ml-2">
                  <span className="text-[#242424] text-xs not-italic font-normal">
                    Search
                  </span>
                  <span className="text-[#242424] text-xs italic font-medium">
                    “ Whitefield, Bengaluru
                  </span>
                </button> */}
                {config.searchIcon}
                <SearchSec />
              </div>

              <div className="hidden sm:flex gap-2">
                <Nearme />
                <Link
                  rel="noopener noreferrer"
                  href={`/search`}
                  className={`flex justify-center items-center gap-2.5 rounded p-1.5 md:p-2.5  text-white  text-[14px] 2xl:text-xl font-bold bg-[#0073c6]`}
                >
                  {config.searchBtnIcon}
                </Link>
              </div>
            </div>

            {(f.city || f.locality.length > 0) && (
              <div className="border-gray-400 border-t-[0.5px] pt-1">
                {" "}
                <Pill.Group>
                  {f.city && (
                    <Pill
                      className="capitalize"
                      withRemoveButton
                      classNames={{
                        root: classes.MultiSelectionPill,
                        label: classes.MultiSelectionPillLabel,
                        remove: classes.MultiSelectionPillRemove,
                      }}
                      onRemove={() =>
                        setFilters((prev) => ({ ...prev, city: null }))
                      }
                    >
                      manglore
                      {f.city.split("+")[0]}
                    </Pill>
                  )}
                  {f.locality?.map((each) => (
                    <Pill
                      className="capitalize"
                      onRemove={() => remnoveSearchOptions(each, "locality")}
                      key={each}
                      withRemoveButton
                      classNames={{
                        root: classes.MultiSelectionPill,
                        label: classes.MultiSelectionPillLabel,
                        remove: classes.MultiSelectionPillRemove,
                      }}
                    >
                      {each.split("+")[0]}
                    </Pill>
                  ))}
                </Pill.Group>
              </div>
            )}
          </div>

          {/* for mobile */}
          <div className="sm:hidden mt-[10px] flex gap-2">
            <Nearme />
            <Link
              rel="noopener noreferrer"
              href={`/search`}
              className={`flex justify-center items-center gap-[4px] rounded p-1.5 md:p-2.5  text-white  text-[14px] 2xl:text-xl font-bold bg-[#0073c6]`}
            >
              {config.searchBtnIcon} Search
            </Link>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-[#242424] text-[14px] sm:text-xl not-italic font-medium leading-[normal] ">
            Browse:
          </p>
          <div className="space-x-2 mt-1 flex sm:block overflow-x-scroll max-w-[100%] scrollbar-hide pb-2 border-b-[0.5px] border-solid border-[#819CA9]">
            {/* <Box />
            <Box />
            <Box />
            <Box /> */}
          </div>
        </div>
        <QuickFilters />
      </div>
      {/* Drawer content */}
    </Drawer>
  );
}

export default AppDrawer;

const config = {
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="6"
      viewBox="0 0 36 6"
      fill="none"
    >
      <path
        d="M0 3L5 5.88675V0.113249L0 3ZM4.5 3.5H36V2.5H4.5V3.5Z"
        fill="#565D70"
      />
    </svg>
  ),
  searchIcon: (
    <svg
      className="hidden sm:flex min-w-[14px] min-h-[14px] "
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
    >
      <path
        d="M11.6849 12.6267C11.9533 12.895 12.3674 12.4808 12.0991 12.2183L9.91161 10.025C10.6791 9.1761 11.1033 8.07196 11.1016 6.92751C11.1016 4.36668 9.01911 2.28418 6.45827 2.28418C3.89744 2.28418 1.81494 4.36668 1.81494 6.92751C1.81494 9.48835 3.89744 11.5708 6.45827 11.5708C7.61328 11.5708 8.68078 11.145 9.49744 10.4392L11.6849 12.6267ZM2.39769 6.92751C2.39769 4.68751 4.22352 2.86751 6.45769 2.86751C8.69769 2.86751 10.5177 4.68751 10.5177 6.92751C10.5177 9.16751 8.69769 10.9875 6.45769 10.9875C4.22352 10.9875 2.39769 9.16751 2.39769 6.92751Z"
        fill="#565D70"
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
