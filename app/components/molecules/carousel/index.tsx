import React from "react";
import HomeCarousel from "./carousel";

export default function DynamiCarousel() {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-sky-100 w-full max-w-full  mx-auto pb-32">
      <div className=" justify-center items-center gap-3 flex flex-col pt-[6%]">
        <div className="text-[#202020] text-[28px] text-center md:text-[46px] not-italic font-semibold leading-[130%] tracking-[1.84px]">
          Newly Launched Projects
        </div>
        <div className="text-[#565D70] text-[24px] md:text-[32px] not-italic font-medium leading-[130%] tracking-[1.28px] text-center">
          Innovation in every bricks! Unveiling our new venture
        </div>
      </div>
      {/* Grids */}
      <div className="max-w-[1500px] m-auto">
        <HomeCarousel />
      </div>
    </div>
  );
}
