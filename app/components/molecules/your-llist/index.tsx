"use client";

import Button from "@/app/elements/button";
import Image from "next/image";
import React from "react";

const YourList = () => {
  return (
    <div className="w-[100%] flex justify-center items-center h-auto lg:h-[500px] md:h-[480px] bg-white [background:linear-gradient(180deg,rgb(249,252,255)_0%,rgb(255,255,255)_100%)] my-5 md:my-0">
      <div className="flex items-center justify-center md:justify-start gap-[10%] ">
        <Image
          className="!w-[30%] h-[443.03px] hidden sm:block"
          alt="Vector"
          src="/home/yourListingRight.svg"
          width={371.81}
          height={443.03}
        />
        <div className="flex flex-col  relative flex-[0_0_auto] w-[85%]">
          <p className="relative text-[28px]  sm:mb-[20px] md:mb-[24px] lg:mb-[35px]  font-normal text-transparent sm:text-[28px] md:text-[36px] lg:text-[46px] tracking-[1.84px] ">
            <span className="font-semibold text-[#1f1f1f]">Post Your </span>
            <span className="[font-family:'Montserrat-Bold',Helvetica] font-bold text-[#138b16]">
              Listing Today!
            </span>
          </p>
          <div className="flex flex-col items-start space-y-4  ">
            <p className=" text-[color:var(--Grey-3,#B5ABAC)] text-xl md:text-4xl not-italic font-medium  tracking-[1.44px] whitespace-normal">
              Your listings deserves the spotlight. <br />
              Add it to our platform today!
            </p>
            <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
              <div className="relative text-[#A3AED0] [font-family:'Montserrat-Medium',Helvetica] font-medium text-blue-grey sm:text-[16px] md:text-[26px] lg:text-[32px] tracking-[1.28px] leading-[41.6px]">
                Post Your Residential Property
              </div>
              <div className="relative text-[#666] [font-family:'Montserrat-Medium',Helvetica] font-medium text-grey-1 sm:text-[16px] md:text-[26px] lg:text-[32px] tracking-[1.28px] leading-[41.6px]">
                Sale | Rent
              </div>
            </div>
            {/* <Frame className="!absolute !left-0 !top-[265px]" property1="default" /> */}
          </div>
          <Button
            key="yourShortlistBtn"
            title="POST LISTING"
            onChange={() => ""}
            buttonClass="flex w-[70%]  md:w-[392px] md:h-[60px] justify-center items-center gap-2.5 shrink-0 p-2.5 shadow-[0px_4px_42px_0px_rgba(0,0,0,0.20)] rounded-[10px] bg-[#148b16] text-white md:text-[28px] not-italic font-semibold leading-[130%] tracking-[1.12px] mt-4 "
          />
        </div>
      </div>
    </div>
  );
};
export default YourList;
