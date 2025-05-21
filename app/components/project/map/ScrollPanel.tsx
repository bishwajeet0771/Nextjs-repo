/* eslint-disable no-unused-vars */
import React, { Suspense, useState,  } from "react";
import clsx from "clsx";
// import styles from "@/app/styles/Map.module.css";
import { useMediaQuery } from "@mantine/hooks";
import { Area, areasMap } from "./data";
import { CustomLoading } from "@/app/images/commonSvgs";

const CustomScrollArea: React.FC<{
  areas: Area[];
  selected: string;
  setSelected: (key: string) => void;
  data: any;
}> = ({ areas, selected, setSelected, data }) => {
  const isMobile = useMediaQuery("(max-width: 601px)");
  const isTab = useMediaQuery("(max-width: 1600px)");
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate the number of visible items per line and total lines
  const items = Object.keys(data).filter((key) => !!data[key as string]);
  const maxVisibleLines = 3;
  const itemsPerRow = isMobile ? 3 : 6;
  const maxVisibleItems = maxVisibleLines * itemsPerRow;
  // Lazy load the Icon component


  const visibleItems = isExpanded ? items : items.slice(0, maxVisibleItems);
  const hiddenCount = items.length - visibleItems.length;

  return (
    <div className="flex flex-col px-2 relative w-full sm:w-[92%] m-auto">
      <div
        className={clsx(
          "flex flex-wrap gap-2  overflow-hidden relative"
          // !isExpanded && "max-h-[calc(3*2.5rem)]"  Adjust height for 3 lines
        )}
        style={{
          padding: isMobile ? "0" : "0 2rem",
          paddingLeft: isTab ? "0" : "0 2rem",
        }}
      >
        {items.map((key) => {
          const Icon = areasMap.get(key).Icon;
          const name = areasMap.get(key).name;

          return (
            <div
              key={key}
              onClick={() => setSelected(key ?? "")}
              className={clsx(
                "flex items-center gap-1.5 px-2 py-1 text-xs sm:text-lg xl:text-xl cursor-pointer",
                "text-[#0073C6] font-medium rounded border border-solid border-[#0073C6]",
                selected === key && "!text-white font-semibold bg-[#0073C6]"
              )}
            >
              
              <Suspense fallback={<CustomLoading stroke="#0073C6" className="w-5 h-5" />}>
                {Icon && (
                  <Icon
                    stroke={clsx(selected === key ? "#FFF" : "#0073C6")}
                    className={isMobile ? "w-4 h-4" : "w-5 h-5"}
                  />
                )}
              </Suspense>
              {name}
            </div>
          );
        })}

        {/* Gradient overlay for fade effect */}
        {/* {!isExpanded && hiddenCount > 0 && (
            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          )} */}
      </div>

      {/* Small "See More" Button */}
      {/*  {hiddenCount > 0 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-[#0073C6] font-medium text-xs"
        >
          {isExpanded ? "See Less" : `See More (${hiddenCount} more)`}
        </button>
      )} */}
    </div>
  );
};

export default CustomScrollArea;
