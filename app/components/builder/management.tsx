"use client";
import React from "react";
// import { callIconSvg } from "@/app/images/commonSvgs";
import { Data } from "@/app/validations/types/builder";
import About from "./about";
import { HEADING_ICON } from "@/app/config/builder";
// import data from "@/app/data/auth";
import Link from "next/link";

export default function ManagementBlock({
  companyName,
  ceoName,
  founderName,
  vision,
  // officecontact,
  projectAvailableCities,
  mdname,
}: Data) {
  const keys = projectAvailableCities && Object.keys(projectAvailableCities);
  return (
    <div
      className=" w-full  mb-[3%]   flex  flex-col justify-center items-start  border border-[color:var(--blue-stroke,#4D6677)] shadow-[0px_4px_31.5px_0px_rgba(91,143,182,0.19)] p-4 sm:p-8 rounded-[7px] border-solid bg-[#FCFCFC] 
    "
    >
      <h1 className=" text-[18px] sm:text-[22px] xl:text-[32px] font-[600] text-[#001F35]">
        Company Details
      </h1>

      <div className="flex justify-start items-start w-full flex-wrap gap-2 sm:gap-4  mt-[2%]  ">
        <div className="bg-[#FFF] rounded-[10px] shadow-lg border-[#92B2C8] border-[1px] border-solid p-2 sm:p-[16px]  ">
          <p className="text-[16px] sm:text-lg xl:text-[24px] font-[600] text-[#202020] capitalize">
            {ceoName}
          </p>
          <p className="text-[12px] sm:text-lg xl:text-[20px] font-[700] text-[#00487C] italic">
            CEO, {companyName}
          </p>
        </div>

        <div className="bg-[#FFF] rounded-[10px] shadow-lg border-[#92B2C8] border-[1px] border-solid p-2 sm:p-[16px] mb-[2%] ">
          <p className=" text-[16px] sm:text-lg xl:text-[24px] font-[600] text-[#202020] capitalize">
            {founderName}
          </p>
          <p className="text-[12px] sm:text-lg xl:text-[20px] font-[700] text-[#00487C] italic">
            Founder, {companyName}
          </p>
        </div>
        <div className="bg-[#FFF] rounded-[10px] shadow-lg border-[#92B2C8] border-[1px] border-solid p-2 sm:p-[16px] mb-[2%] ">
          <p className=" text-[16px] sm:text-lg xl:text-[24px] font-[600] text-[#202020] capitalize">
            {mdname}
          </p>
          <p className="text-[12px] sm:text-lg xl:text-[20px] font-[700] text-[#00487C] italic">
            Managing Director, {companyName}
          </p>
        </div>
      </div>

      <h1 className=" text-[#242424] mt-3 sm:mt-0 text-[16px] sm:text-[22px] xl:text-[28px] not-italic font-semibold  inline-flex items-center space-x-2">
        <p>{HEADING_ICON}</p> <p> Company Vision</p>
      </h1>
      <About
        id="builder_vision"
        heading="Company Vision Of"
        projName={""}
        content={vision}
        className="!text-[14px]"
      />

      {/* <div className="flex  justify-start items-center w-full gap-[8px] mt-[0%]  ">
        <a href={`tel:${officecontact}`}>
          <div
            // onClick={() => window.open(`tel:${officecontact}`)}
            className="max-w-fit cursor-pointer flex justify-center items-center gap-0.5 p-1 rounded-md bg-gradient-to-tr from-[#EFF5FF] to-[#F2FAFF] "
          >
            {callIconSvg}
            <p className="text-[#00487C]  text-[14px] sm:text-xl xl:text-[28px] not-italic font-semibold ">
              Office Contact
            </p>
          </div>
        </a>

        <a
          href={`tel:${officecontact}`}
          className="text-[#242424]  text-[14px] sm:text-xl xl:text-[28px] not-italic font-semibold  underline ml-1.5"
        >
          {officecontact}
        </a>
      </div> */}

      {keys?.length > 1 && (
        <>
          <h1 className="text-[#242424] mt-3 sm:mt-0 text-[16px] sm:text-[28px] not-italic font-semibold  inline-flex items-center space-x-2">
            <p>{HEADING_ICON}</p> <p>Projects in different branches</p>
          </h1>
          <div className="flex justify-start items-start w-full flex-wrap gap-2 sm:gap-[3%] mb-[2%] mt-[1%]  md:space-y-0 md:gap-y-4">
            {keys?.map((item) => (
              <Link
                rel="noopener noreferrer"
                className="text-[#00487C] text-[13px] sm:text-2xl not-italic font-semibold leading-[normal] tracking-[0.96px] underline "
                key={`managment_${projectAvailableCities[item]}`}
                href={`/search?sf=city=${projectAvailableCities[item]}%2B${item}`}
              >
                Projects in{" "}
                <span className="capitalize">
                  {projectAvailableCities[item]}
                </span>
              </Link>
            ))}
          </div>{" "}
        </>
      )}
    </div>
  );
}
