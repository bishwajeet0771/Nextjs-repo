import React, { useRef, useState, useTransition } from "react";
import Button from "../../elements/button";
import FloorplanDetailsCard from "./floorplanDetailsCard";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useMediaQuery } from "@mantine/hooks";

type Props = {
  propCgId: any;
  data: any;
  setValues: any;
  bhk: string;
  // eslint-disable-next-line no-unused-vars
  setBhk: (value: string) => void;
  selectedPhase: any;
};

const cacheMap = new Map();

export default function ByBhkBlock({
  propCgId,
  data,
  setValues,
  bhk,
  setBhk,
  selectedPhase,
}: Props) {
  const [isLoading, startTransition] = useTransition();
  const [filteredData, setFilteredData] = useState(data);

  const workerRef = useRef<Worker | null>(null);

  // Initialize worker when component mounts
  React.useEffect(() => {
    workerRef.current = new Worker(
      new URL("@/app/server-actions/workers/filter.js", import.meta.url)
    );
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  const handleBhkChange = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: string
  ): Promise<void> => {
    e.stopPropagation();
    const cacheKey = `${value}-${selectedPhase}-${propCgId}`;

    if (value === "0") {
      setBhk(value);
      setFilteredData(data);
      return;
    }
    if (cacheMap.has(cacheKey)) {
      setBhk(value);
      setFilteredData(cacheMap.get(cacheKey));
      return;
    }
    setBhk(value);

    startTransition(() => {
      if (workerRef.current) {
        workerRef.current.postMessage({ data, bhkOption: value });

        workerRef.current.onmessage = (event) => {
          const result = event.data;
          cacheMap.set(cacheKey, result);
          setFilteredData(result);
        };
      }
    });
  };

  const isMobile = useMediaQuery("(max-width: 768px)");
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: filteredData?.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => (isMobile ? 250 : 180),
    overscan: isMobile ? 15 : 5,
    paddingStart: 0,
    paddingEnd: 0,
  });

  const getOptions = (property: string): string[] => {
    return Array.from(new Set(data.map((item: any) => String(item[property]))));
  };

  const availBhks = getOptions("bhkName").sort((a, b) => a.localeCompare(b));

  const scrollFiltersRef = useRef<HTMLDivElement>(null);
  const handleArrowClick = (e: any, side: "R" | "L"): void => {
    e.stopPropagation();
    const scrollAmount = side === "R" ? 100 : -100;
    if (scrollFiltersRef.current) {
      scrollFiltersRef.current.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="shadow-md sm:shadow-none">
      <div className="lg:h-[100px] px-[2%] border-[#92B2C8] border-solid border-b-[1px] pt-2.5 bg-[#F2FAFF]/50">
        <h3 className=" text-[#001F35] text-[20px] lg:text-[24px] font-[500] mb-2">
          Select BHK to see floor plans
        </h3>
        <div className="flex justify-between items-center w-full overflow-x-auto overflow-y-hidden !no-scrollbar">
          {availBhks && availBhks.length > 4 && (
            <button
              onClick={(e) => handleArrowClick(e, "L")}
              className="flex border border-solid border-gray-400 mr-4 min-h-[32px] min-w-[32px] rounded-[50%] items-center justify-center bg-[#FCFCFC] !cursor-pointer"
            >
              {"<"}
            </button>
          )}

          <div
            ref={scrollFiltersRef}
            className="flex scroll-smooth justify-start items-start w-full overflow-x-auto overflow-y-hidden !no-scrollbar"
          >
            {availBhks && availBhks.length > 1 && (
              <Button
                key="all"
                title="All"
                onChange={(e) => handleBhkChange(e, "0")}
                buttonClass={` text-[18px] lg:text-[18px] mr-[10px] lg:mr-[20px] whitespace-nowrap  ${
                  bhk === "0"
                    ? " font-[600] text-[#148B16] underline "
                    : " font-[500] text-[#737579]"
                } `}
              />
            )}
            {availBhks.map((bhkOption) => (
              <Button
                key={`byUnit_${bhkOption}`}
                title={bhkOption}
                onChange={(e) => handleBhkChange(e, bhkOption)}
                buttonClass={` text-[18px] lg:text-[18px] mr-[10px] lg:mr-[25px] whitespace-nowrap  ${
                  bhk === bhkOption
                    ? " font-[600] text-[#148B16] underline "
                    : " font-[500] text-[#737579]"
                } `}
              />
            ))}
          </div>

          {availBhks && availBhks.length > 4 && (
            <button
              onClick={(e) => handleArrowClick(e, "R")}
              className="flex border border-solid border-gray-400 min-h-[32px] ml-8 min-w-[32px] rounded-[50%] items-center justify-center bg-[#FCFCFC] !cursor-pointer"
            >
              {">"}
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div
          className="w-full h-[195px] sm:h-[440px] overflow-auto relative"
          ref={parentRef}
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => (
              <div
                key={virtualRow.key}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <FloorplanDetailsCard
                  data={virtualRow}
                  propCgId={propCgId}
                  projData={filteredData}
                  setValues={setValues}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
