"use client";
import React, { useRef, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { SpecificationList } from "@/app/validations/types/project";
import { specificationsList } from "@/app/images/commonSvgs";
import clsx from "clsx";
// import { redirect } from "next/dist/server/api-utils";
export default function Specifications({
  data,
  projName,
}: {
  data: SpecificationList[];
  projName: string;
}) {
  const [selectedSpecIndex, setSelectedSpecIndex] = useState<number | null>(0);

  const handleSpecClick = (index: number) => {
    setSelectedSpecIndex(index);
    scrollWhereIsSelected(index);
  };
  const viewport = useRef<HTMLDivElement>(null);
  const scrollWhereIsSelected = (index: number) => {
    const selectedSpecId = data[index]?.specName.toLowerCase();
    const selectedElement = document.getElementById(selectedSpecId);
    const container = viewport.current;

    if (selectedElement && container) {
      // const titleElement = selectedElement.querySelector("h2");
      // const titleHeight = titleElement?.offsetHeight || 0;
      // const position = selectedElement.offsetTop - titleHeight;
      // viewport.current!.scrollTo({
      //   top: position - 20,
      //   behavior: "smooth",
      // });

      const offset = selectedElement.offsetTop - container.offsetTop;
      const scroll =
        offset - container.clientHeight / 2 + selectedElement.clientHeight / 2;

      container.scrollTo({
        top: scroll,
        behavior: "smooth",
      });

      selectedElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: "center" });
    }
  };
  const isMobile = useMediaQuery(`(max-width: 601px)`);
// /* text-[#148B16] */  all heading of heading each section
  return (
    <div
      className="w-[95%] sm:w-[90%] scroll-mt-[180px] mx-auto mb-[3%] sm:mb-0 pt-screen-spacing"
      id="specifications"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden ">
        <div className="flex-1 bg-gradient-to-tr from-blue-100 p-4 sm:p-8">
          <h2 className="text-h2 sm:text-[22px] xl:text-[32px] font-[600] text-[#001F35] mb-[4px] sm:mb-[10px] xl:mb-[6px] capitalize">
            Specifications of
            <span className="!text-green-800 font-bold "> {projName}</span>
          </h2>
          <p className="text-[14px] text-[#212C33] sm:text-[18px] xl:text-[24px] font-semibold leading-[normal] tracking-[0.88px]  mb-4 flex justify-start items-start ">
            <span>
              {" "}
              Vital Details: Size, Features- Unveiling your dream project{" "}
            </span>
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {data?.map((spec, index) => {
              const isSelected = selectedSpecIndex === index;
              const specSvg = specificationsList?.get(spec?.specId)?.url;

              return (
                <button
                aria-label={spec.specName} name={spec.specName} title={spec.specName}
                  key={spec.specName}
                  className={clsx(
                    `px-2 py-1 sm:px-5 sm:py-2 text-[12px] sm:text-[15px] xl:text-[20px] flex gap-2 bg-[#fafafa] items-center cursor-pointer rounded-[10px] border-[0.5px] border-solid border-[#76AEFF] shadow-none text-[#233] font-[500]`,
                    isSelected &&
                      "shadow-md !bg-[#007CC2] !text-white font-[700]"
                  )}
                  onClick={() => handleSpecClick(index)}
                >
                  {specSvg &&
                    React.cloneElement(specSvg, {
                      className: isSelected ? "svg-selected" : "svg-default",
                    })}
                  {spec.specName}
                </button>
              );
            })}
          </div>
        </div>

        {/* <div className="flex-1 bg-gray-50 rounded-lg ">
          <Stack align="center">
            <ScrollArea
              w={"100%"}
              h={
                458 > data?.length * (isMobile ? 120 : 270)
                  ? data.length * (isMobile ? 120 : 270)
                  : isMobile
                  ? 280
                  : 358
              }px`}}
          >
            {data?.map((spec, index) => (
              <div
                key={spec.specName}
                // @ts-ignore
                id={spec.specName.toLowerCase()}
                className="px-[2%] mt-5 sm:mt-10 w-full items-start justify-start flex-col"
              >
                <span
                  className={` flex items-center gap-2 text-[#242424]  w-full sm:min-w-[10%] sm:max-w-[20%]  sm:text-[18px] xl:text-[24px]  font-[600] py-2 px-2 rounded-xl  ${
                    selectedSpecIndex == index
                      ? "specification"
                      : "specificationRemove"
                  }  `}
                >
                  {specificationsList?.get(spec?.specId)?.url}{" "}
                  <span className="">{spec.specName}</span>
                </span>
                <div>
                  <ul className="list-disc ml-8 grid gap-2 my-2 text-[#233333] text-[12px] sm:text-[16px] xl:text-[20px] font-[500] ">
                    {spec.values.map(
                      (value) =>
                        value && (
                          <li className="break-words max-w-full" key={value}>
                            {value}
                          </li>
                        )
                    )}
                  </ul>
                </div>
              ))}
            </ScrollArea>
          </Stack>
        </div> */}

        <div
          ref={viewport}
          className="w-full h-full flex-1 bg-gray-50 rounded-lg pb-[20px] overflow-y-auto overflow-x-hidden scroll-smooth "
          style={{
            maxHeight: `${
              458 > data?.length * (isMobile ? 120 : 270)
                ? data.length * (isMobile ? 120 : 270)
                : isMobile
                ? 280
                : 358
            }px`,
          }}
        >
          {data?.map((spec, index) => (
            <div
              key={spec.specName}
              // @ts-ignore
              id={spec.specName.toLowerCase()}
              className="px-[2%] mt-5 sm:mt-10 w-full items-start justify-start flex-col"
            >
              <span
                className={` flex items-center gap-2 text-[#242424]  w-full sm:min-w-[10%] sm:max-w-[20%]  sm:text-[18px] xl:text-[24px]  font-[600] py-2 px-2 rounded-xl  ${
                  selectedSpecIndex == index
                    ? "specification"
                    : "specificationRemove"
                }  `}
              >
                {specificationsList?.get(spec?.specId)?.url}{" "}
                <span className="">{spec.specName}</span>
              </span>
              {/* <div> */}
                <ul className="list-disc ml-8 grid gap-2 my-2 text-[#233333] text-[12px] sm:text-[16px] xl:text-[20px] font-[500] ">
                  {spec.values.map(
                    (value) =>
                      value && (
                        <li className="break-words max-w-full" key={value}>
                          {value}
                        </li>
                      )
                  )}
                </ul>
              {/* </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
