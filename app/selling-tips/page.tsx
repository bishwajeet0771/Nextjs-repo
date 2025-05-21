"use client";
import React from "react";
import Image from "next/image";
// import { apartmentCardImg } from "../images/commonImages";
import PointsBlock from "./components/PointsBlock";
import MarketBanner from "../market-trends/components/MarketBanner";
import MarketNavigator from "../market-trends/components/MarketNavigator";

export default function Page() {
  return (
    <div className="h-[100%] w-[100%] mt-[70px] flex flex-col overflow-hidden bg-[#F5F7F8] items-center pb-[30px] ">
      <MarketBanner title="Tips for selling your home faster" />
      <MarketNavigator />
      <div className="flex flex-col justify-center items-center w-[96%] md:w-[90%] xl:w-[50%] max-w-[1000px] ">
        <div className="w-full h-[200px] md:h-[300px] shadow-md mb-[30px] rounded-[10px] border-solid border-t-[1px] ">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/News/New-1.jpeg`}
            width={800}
            height={800}
            alt="not found"
            className="w-full h-full"
            unoptimized
          />
        </div>

        <PointsBlock />
      </div>
    </div>
  );
}
