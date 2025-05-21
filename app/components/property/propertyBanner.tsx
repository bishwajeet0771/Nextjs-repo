"use client";
import { formatDate, formatDateDDMMYYYY } from "@/app/utils/date";
import { formatCurrency } from "@/app/utils/numbers";
import { Main } from "@/app/validations/types/project";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import React from "react";
import { Svg } from "./heading";
import ReadMore from "../atoms/readmore";
// import Button from "../atoms/buttons/variansts";
import Link from "../atoms/buttons/Link";
import { createProjectLinkUrl } from "@/app/utils/linkRouters/ProjectLink";

export default function PropertyBanner({
  projectName,
  availableProperties,
  startDate,
  endDate,
  minPrice,
  maxPrice,
  media,
  about,
  reraStatus,
  projIdEnc,
  cityName,
  localityName,
}: Main) {
  const isMobile = useMediaQuery(`(max-width: 750px)`);
  const url = createProjectLinkUrl({
    city: cityName,
    locality: localityName,
    slug: projectName,
    projIdEnc: projIdEnc,
  });
  return isMobile ? (
    <PropertyBannerForMobile
      projectName={projectName}
      availableProperties={availableProperties}
      startDate={startDate}
      endDate={endDate}
      minPrice={minPrice}
      maxPrice={maxPrice}
      about={about}
      projIdEnc={projIdEnc}
      url={url}
    />
  ) : (
    <div
      className="w-[90%] m-auto mt-[50px] shrink-0  bg-[#fcfcfc] mb-15 relative  border shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] border-solid border-[#CAE9FF] sm:px-[22px] sm:py-[18px]  xl:px-[52px] xl:py-[35px] scroll-mt-[250px]"
      id="projectDetails"
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/project-detail/approvedgreen.png`}
        alt="Sobha Dream Acres"
        className="w-[220px] h-[150px]  xl:w-[312px] xl:h-[312px] absolute right-0 top-[0px] hidden sm:block"
        width={312}
        height={312}
        unoptimized
        // priority
      />
      <div className=" inline-flex justify-center items-center ">
        {Svg}
        <h2 className="capitalize ml-6 mb-[14px] sm:text-[24px] xl:text-[28px] not-italic font-bold leading-[normal] tracking-[1.28px] ">
          <strong>
            <span className="text-[#242424]">about </span>
            <span className="text-[#148B16] not-italic">{projectName}</span>
          </strong>
          <span className=" text-[#4D6677] text-h2 sm:text-[16px] xl:text-[24px] break-words italic font-medium  mt-2 block">
            About project get summarized perspective for the incredible listing
          </span>
        </h2>
      </div>
      <div>
        <div className="inline-flex mt-6">
          <div className="relative">
            {((reraStatus as unknown) === "Recieved" ||
              (reraStatus as unknown) === "Applied") && (
              <p className="absolute top-[1px] left-[0.8px] z-[1]">
                <Image src={"/r.svg"} alt="rera" width={100} height={100} />
              </p>
            )}
            <div className="w-[350px] h-[185px] relative">
              <Image
                src={media?.coverImageUrl?.split(",")[1]}
                alt="Sobha Dream Acres"
                className="flex items-center shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] rounded-[10px] w-full h-full object-fill "
                unoptimized
                height={630}
                width={1200}
              />
            </div>
          </div>

          <div className="ml-5">
            <h3 className="text-[#212C33] sm:text-[24px] xl:text-[34px] font-[600]  md:text-start text-center">
              {projectName}
            </h3>
            <h4 className="text-[#148B16] sm:text-[24px]  xl:text-[36px] whitespace-nowrap font-[700] mt-1">
              {formatCurrency(minPrice)} - {formatCurrency(maxPrice)}
            </h4>
            <p className="text-[#242424] text-sm sm:text-[18px]  xl:text-[24px] not-italic font-medium leading-[normal] mb-2">
              Start- End Date: {formatDateDDMMYYYY(startDate)} -{" "}
              {formatDateDDMMYYYY(endDate)}
            </p>
            <p className="text-[#00487C] text-base sm:text-[24px] xl:text-[28px] not-italic font-medium">
              {" "}
              {availableProperties?.join(", ")}
            </p>
          </div>
        </div>
        {about && (
          <div className="mt-6">
            <div
              className="prose-p:py-1 prose-no-break text-[14px] sm:text-[18px] xl:text-[24px] font-[500] text-[#233333] break-words"
              dangerouslySetInnerHTML={{ __html: about.slice(0, 500) }}
            />
            <ReadMore text={about} title={"About"} />
          </div>
        )}
        <Link
          href={url}
          variant="blue"
          className="mt-5   text-[12px] sm:text-[18px] xl:text-[20px] font-[700] "
        >
          Explore Project
        </Link>
      </div>
    </div>
  );
}

function PropertyBannerForMobile({
  projectName,
  availableProperties,
  startDate,
  endDate,
  minPrice,
  maxPrice,
  about,
  url,
}: any) {
  return (
    <div className="w-[95%] md:w-[90%] mx-auto mt-5 md:mt-[2%] mb-10 md:mb-20 relative bg-[#fcfcfc] border border-solid border-blue-200  shadow-md !m-[2%]">
      <div className="max-w-[100%] xl:mx-auto p-1  xl:p-5 mt-8 sm:mt-0 ">
        <h2 className="text-[#212C33] text-lg xl:text-2xl md:text-[32px] not-italic font-semibold leading-[normal] tracking-[1.28px] pt-2 ml-0 md:ml-8 mb-4 md:mb-0">
          About{" "}
          <span className="text-green-800 font-semibold">{projectName}</span>
        </h2>
        <div className="flex flex-col md:flex-row justify-between md:items-center p-1 ">
          <div className="flex flex-col md:flex-row md:space-x-4 w-full md:w-auto">
            <Image
              src="/property.png"
              alt="Sobha Dream Acres"
              className="w-full h-auto xl:mb-4 md:w-auto md:mb-0"
              width={350}
              height={185}
              // priority
            />
            <div className="md:mt-4">
              <h2 className="text-[#001F35] text-xl md:text-2xl not-italic font-semibold leading-[normal] mb-2">
                About {projectName}
              </h2>
              <p className="text-[#4B5C74] text-base md:text-xl not-italic font-semibold leading-[normal] mb-2">
                {availableProperties ? availableProperties.join(", ") : ""}
              </p>
              <p className="text-[#202020] text-base md:text-2xl not-italic font-normal leading-[normal]">
                Posted By: <span className="font-semibold">Builder</span>{" "}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-start items-start mt-2 xl:mt-4 md:mt-0">
            <div className="text-[#0A5C0D] text-lg md:text-[28px] not-italic font-bold leading-[normal] mr-0 sm:mr-4">
              {formatCurrency(minPrice)} - {formatCurrency(maxPrice)}
            </div>
            <div className=" text-sm sm:text-[16px] mt-[10px] xl:mt-[14px] xl:text-[22px] font-[600] text-[#242424]">
              Start- End Date:{" "}
              <span className="font-semibold">
                {formatDate(startDate)} - {formatDate(endDate)}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-2 ml-[4px]">
          <div
            className="prose-no-break text-[12px] font-[500] text-[#233333] break-words"
            dangerouslySetInnerHTML={{ __html: about.slice(0, 200) }}
          />
          <ReadMore maxLines={2} text={about} title={"About"} />
        </div>
        <Link href={url} variant="blue" className="mt-2">
          Explore Project
        </Link>
      </div>
    </div>
  );
}
