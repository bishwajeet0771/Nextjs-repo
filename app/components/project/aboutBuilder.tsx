"use client";
import React from "react";
import Link from "next/link";
import useBuilder from "@/app/hooks/useBuilder";
// import { Svg } from "../property/heading";
import About from "./about";
import Image from "next/image";
// import { TeleGramBlack } from "@/app/images/commonSvgs";
import { convertDateToMonthYear } from "@/app/utils/date";
import { capitalizeWords } from "@/app/utils/letters";
import { generateBuilderUrl } from "@/app/utils/linkRouters/Builder";
import BuilderProjectsCount from "../builder/BuilderProjectsCount";

type Props = {
  id: number;
  type?: "prop" | "proj";
};

export default function AboutBuilder({ id, type = "proj" }: Props) {
  const { data } = useBuilder({ id, y: "N", type });
  const nzData = normalizeData(data, type);
  let urlBuilder = generateBuilderUrl({
    slug: nzData.userName,
    city: nzData.city,
  });

  return (
    <div
      className="w-[95%] md:w-[90%] scroll-mt-[150px] mb-[5%] !mt-[50px] sm:mb-[0%] rounded shadow-[0px_4px_17.6px_0px_rgba(146,178,200,0.40)] border-[0.5px] border-solid border-[#92B2C8]  pt-4 pb-4 md:pb-6 sm:mt-0 sm:py-8 sm:pl-5 px-2 sm:px-0 "
      id="about-builder"
    >
      {/* <div> */}
        <div className=" gap-[16px] sm:gap-[26px] justify-start  w-[100%] items-center">
          <h2 className="text-[#242424]  sm:text-[24px] xl:text-[28px] not-italic font-bold leading-[normal] tracking-[1.28px] mb-4 ">
            <span>
              <strong>About Builder</strong>
            </span>
          </h2>

          <div className="inline-flex justify-center items-center ">
            <div className=" relative">
              <Image
                src={
                  nzData.logo
                    ? `${nzData.logo}`
                    : `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/builderpage/builder-noimage.png`
                }
                width={130}
                height={130}
                alt="Builder logo"
                title="Builder logo"
                className="object-contain max-h-[93px] w-[93px] sm:max-h-[100px] sm:w-[133px] xl:max-h-[150px] xl:w-[158px] relative"
                unoptimized
              />
            </div>
            <div className=" text-green-800  sm:text-[20px] xl:text-[26px] font-[700] ml-3">
              <Link
                prefetch={false}
                href={`${process.env.NEXT_PUBLIC_PROJECT_URL}${urlBuilder}`}
              >
                {nzData.userName}
              </Link>
              <p className=" text-[#303A42] text-[14px] italic sm:text-[16px] xl:text-[20px] font-[500] ">
                since {convertDateToMonthYear(nzData.companyStartDate)}
              </p>
            </div>
          </div>
        </div>
        <BuilderProjectsCount
          id={id?.toString()}
          builderName={nzData.userName}
        />

        <About
          id="builder_vision"
          heading={""}
          projName={""}
          builderName={nzData.userName}
          content={nzData.vission}
          className="!mb-[8px] sm:!mb-[20px] xl:!mb-[24px] text-[#202020] sm:text-[18px] xl:text-2xl not-italic font-medium leading-[normal] w-full mt-4 sm:!mt-0 !ml-0"
        />

        <p className="  text-[16px] sm:text-[20px] xl:text-[24px]  text-black sm:text-2xl not-italic font-semibold leading-[normal] inline-flex justify-center items-center">
          Builder Address{" "}
        </p>
        <p className=" text-[12px]  sm:text-[18px] xl:text-[20px]  sm:mt-[1%]  mb-[14px] font-medium  sm:italic text-[#202020]  xl:mb-[2%] ">
          {nzData.builderAddress
            ? nzData.builderAddress.replaceAll(",", ", ")
            : ""}
          , {nzData.city}, {nzData.state}, {nzData.pincode}
        </p>
        <Link
          prefetch={false}
          className=" bg-[#0073C6] rounded-[4px] text-[#FFF] text-[12px] sm:text-[18px] xl:text-[20px] font-[700] p-[10px]  "
          href={urlBuilder}
          rel="noreferrer"
        >
          View Builder Details
        </Link>
      {/* </div> */}
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function normalizeData(data: any, type: string) {
  return {
    propertyName: data?.data?.propertyName,
    newProject: data?.data?.newProject,
    onGoingProject: data?.data?.onGoingProject,
    completedProject: data?.data?.completedProject,
    builderAddress: data?.data?.builderAddress,
    ceoName: data?.data?.ceoName,
    logo: data?.data?.logoUrl,
    vission: data?.data?.vision,
    companyName: data?.data?.companyName,
    companyStartDate: data?.data?.companyStartDate,
    city: data?.data?.cityName,
    state: data?.data?.stateName,
    pincode: data?.data?.pinCode,
    userName: capitalizeWords(data?.data?.userName),
  };
}
