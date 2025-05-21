import { BuilderPageHomeSvg } from "@/app/images/commonSvgs";
import { convertDateToMonthYear } from "@/app/utils/date";
import { capitalizeWords } from "@/app/utils/letters";
import { Data } from "@/app/validations/types/builder";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// type Props = {};

export default function TopProfileBlock({
  // ceoName,
  companyName,
  companyStartDate,
  logoUrl,
  userName,
  builderCity,
}: Data) {
  return (
    <div className="w-full flex justify-between items-center bg=[] relative">
      <div className="flex flex-col h-[100%]  lg:min-h-[250px]  justify-between items-start ml-[2%] ">
        <p className="text-[12px] md:text-[20px] text-[#565D70] font-[500] mt-2 sm:mt-0 sm:mb-[1%] ">
          <Link
            prefetch={false}
            rel="noopener noreferrer"
            className="hover:underline cursor-pointer"
            href={"/"}
          >
            Home
          </Link>
          {" > "}
          <Link
            prefetch={false}
            rel="noopener noreferrer"
            href={"/builders"}
            className="hover:underline cursor-pointer"
          >
            Builders
          </Link>
          {" > "}
          <Link
            prefetch={false}
            rel="noopener noreferrer"
            href={`/builders/${builderCity}`}
            className="hover:underline cursor-pointer capitalize"
          >
            {builderCity}
          </Link>
          {" > "}
          <span>{capitalizeWords(userName)}</span>
        </p>

        <div className="flex justify-start items-center w-[300px] py-5 sm:w-auto">
          <div className="flex justify-center mr-[16px] items-center h-[93px] w-[93px] sm:h-[133px] sm:w-[133px] xl:h-[158px] xl:w-[158px] bg-[#FFF]   ">
            <Image
              alt="builder"
              src={
                logoUrl
                  ? `${logoUrl}`
                  : `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/builderpage/builder-noimage.png`
              }
              className="object-contain h-[93px] w-[93px] sm:h-[100px] sm:w-[133px] xl:h-[150px] xl:w-[158px]"
              width={158}
              height={158}
            />
          </div>
          <div>
            <p className=" text-[#E3AC00] text-[16px] font-bold sm:text-[24px] xl:text-[32px] not-italic sm:font-semibold  uppercase">
              {userName}
            </p>
            <div className="text-[#202020] text-[12px] sm:text-lg xl:text-xl font-bold not-italic z-40 uppercase">
              (By: {companyName})
            </div>
            <p className=" text-[#303A42] text-[12px] sm:text-base xl:text-lg not-italic font-medium  mt-1 sm:mt-1 xl:mt-2">
              since {convertDateToMonthYear(companyStartDate)}
            </p>
          </div>
        </div>
      </div>

      <BuilderPageHomeSvg className="absolute top-[23%] right-0  sm:static max-w-[180px] sm:max-w-[50%] xl:max-w-full h-[167px] sm:h-[231px] lg:h-[296px] z-1" />
    </div>
  );
}
