"use client";
import React from "react";
import {
  EndDate,
  Locality,
  ProjectStatus,
  PropertyAvailable,
  // ReraIcon,
  ReraStatusProj,
  ShearIcon,
  StartDate,
  TotalLandArea,
  footerPhoneIcon,
} from "@/app/images/commonSvgs";
import ProjBasicDetails from "@/app/components/project/projBasicDetails";
import OverviewBanner from "./overviewBanner";
import Ratings from "./Ratings";
import ShortList from "./actions/shortList";
import CompareList from "./actions/compareList";
import { formatDateDDMMYYYY } from "@/app/utils/date";
import Message from "./actions/Message";
import ReportSection from "./actions/Report";
import { formatNumberWithSuffix } from "@/app/utils/numbers";
import { TOPIC_IDS } from "@/app/data/projectDetails";
import {
  Main,
  // MERGERPROJECT
} from "@/app/validations/types/project";
import { useQuery } from "react-query";
import Link from "next/link";
// import SharePopup from "../atoms/SharePopup";
import clsx from "clsx";
import { usePathname } from "next/navigation";
export interface Props extends Main {
  // Extend Main directly
  slug: string; // New property for the slug
  PhaseOverview: PhaseOverview[]; // New property for the project status
}
export default function Overview({
  maxPrice,
  minPrice,
  projectName,
  address,
  projectStatus,
  availableProperties,
  totalLandArea,
  totalUnit,
  localityName,
  startDate,
  endDate,
  cityName,
  pinCode,
  builderId,
  state,
  basePrice,
  media,
  // postedByName,
  // phaseList,
  PhaseOverview,
  slug,
  projAuthorityNames,
  phases,
}: Props) {
  const { data } = useQuery<any>({
    queryKey: [`builder/${builderId}&isBuilderPage=Nproj`],
    enabled: false,
  });
  const path = usePathname();
  const title = "Share Project";
  return (
    <div
      className=" sm:pt-[2%] xl:pt-[2%] sm:scroll-mt-[138px] xl:scroll-mt-[150px] w-[95%] sm:[95%] xl:w-[90%] rounded-[24px] shadow-md mb-[5%] sm:mb-[0%]  mt-[2%] bg-gradient-to-r from-[#F6F6F6] /0 via-[#FFF] /45 to-[#FEFFFF]/100 "
      id="overview"
    >
      <div className="pl-[2%] pr-[2%] flex justify-between items-center flex-wrap sm:flex-nowrap">
        <div className="md:w-[80%]">
          {/* <div className="">
            <h1 className="text-[22px] sm:text-[22px] xl:text-[28px] font-bold text-[#001F35] break-words text-wrap w-[100%] tracking-[0.32px] sm:mt-[10px]  xl:mt-[14px] capitalize  sm:max-w-[1400px]">
            <strong>{projectName}</strong>
            </h1>{" "} */}
          <div className="flex justify-between items-start ">
            <h1 className="text-[22px] sm:text-[22px] xl:text-[28px] font-bold text-[#001F35] break-words text-wrap w-[100%] tracking-[0.32px] sm:mt-[10px]  xl:mt-[14px] capitalize  sm:max-w-[1400px]">
              <strong>{projectName}</strong>
            </h1>{" "}
            <button
              aria-label={title}
              name={title} 
              title={title}
              onClick={() => {
                navigator.share({
                  title: title,
                  url: process.env.NEXT_PUBLIC_URL + path,
                });
              }}
              className={clsx(
                "sm:hidden  p-0.5 gap-1 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)]  rounded-[10px] bg-[#F3F7FF] ml-auto text-[#0073C6]  not-italic font-semibold leading-[normal] tracking-[0.4px]"
              )}
            >
              <ShearIcon className=" sm:w-[20px] sm:h-[20px]  xl:w-[26px] xl:h-[26px]  h-[24px] w-[42px] " />
            </button>
          </div>

          <p className="text-[#242424]  text-sm sm:text-[20px] xl:text-[22px] not-italic font-bold leading-[normal] w-[100%] tracking-[0.32px] sm:mt-[10px]  xl:mt-[14px] capitalize  sm:max-w-[1400px]">
            address:{" "}
            {`${address}, ${localityName}, ${cityName}, ${state}, ${pinCode}`}
          </p>
        </div>
        <div className="flex justify-center items-center sm:items-end sm:flex-col space-x-6">
          <Ratings slug={slug} />
          <Link
            rel="noopener noreferrer"
            href={`tel:${8884440963}`}
            className="text-[13px] sm:text-[20px]  mt-3  text-[#0073C6] xl:text-2xl not-italic font-semibold leading-[normal] inline-flex justify-center items-center gap-1.5 p-1.5 xl:p-2 rounded-lg border-[0.8px] border-solid border-[#0073C6] bg-[#fafafa]"
          >
            {footerPhoneIcon}
            Call now
          </Link>
        </div>
      </div>

      <div className="pl-[2%] pr-[2%] flex justify-start md:justify-between items-start md:items-end w-full mb-[3%] sm:mb-[1%] xl:mb-[1.5%] mt-[3%] sm:mt-[1%] xl:mt-[1.5%] flex-col md:flex-row ">
        <div className="flex justify-start items-start flex-wrap w-[100%] md:w-[80%] ">
          <ProjBasicDetails
            Id={TOPIC_IDS.PROPERTY_AVAILABLE}
            key="propertyAvailable"
            icon={<PropertyAvailable />}
            title="Property Available"
            value={availableProperties?.join(", ")}
            className="mr-[5%] sm:mr-[3%] xl:mr-[5%] pt-[2%] mb-[3%] sm:mb-[1.5%] xl:mb-[3%]  "
          />
          <ProjBasicDetails
            Id={TOPIC_IDS.PROJECT_STATUS}
            key="projectStatus"
            icon={<ProjectStatus />}
            title="Project Status"
            value={projectStatus}
            className="mr-[5%] sm:mr-[3%] xl:mr-[5%] pt-[2%] mb-[3%] sm:mb-[1.5%] xl:mb-[3%]  "
          />
          <ProjBasicDetails
            Id={TOPIC_IDS.LAND_AREA}
            key="totalLandArea"
            icon={<TotalLandArea />}
            title="Project Land Area"
            value={`${Number(parseFloat(totalLandArea).toFixed(2))} Acres`}
            className="mr-[5%] sm:mr-[3%] xl:mr-[5%] pt-[2%] mb-[3%] sm:mb-[1.5%] xl:mb-[3%]  "
          />
          <ProjBasicDetails
            Id={TOPIC_IDS.UNITS_IN_PROJECT}
            key="totalUnits"
            icon={<TotalLandArea />} // Adjust icon
            title="Units in Project"
            value={`${formatNumberWithSuffix(totalUnit, false)} Units`}
            className="mr-[5%] sm:mr-[3%] xl:mr-[5%] pt-[2%] mb-[3%] sm:mb-[1.5%] xl:mb-[3%]  "
          />
          <ProjBasicDetails
            Id={TOPIC_IDS.LOCALITY}
            key="locality"
            icon={<Locality />}
            title="Locality"
            value={localityName}
            className="mr-[5%] sm:mr-[3%] xl:mr-[5%] pt-[2%] mb-[3%] sm:mb-[1.5%] xl:mb-[3%]  "
          />
          <ProjBasicDetails
            Id={TOPIC_IDS.START_DATE}
            key="startDate"
            icon={<StartDate />}
            title="Start Date"
            value={formatDateDDMMYYYY(startDate)}
            className="mr-[5%] pt-[2%] mb-[3%] "
          />
          <ProjBasicDetails
            Id={TOPIC_IDS.END_DATE}
            key="endDate"
            icon={<EndDate />}
            title="End Date"
            value={formatDateDDMMYYYY(endDate)}
            className="mr-[5%] sm:mr-[3%] xl:mr-[5%] pt-[2%] mb-[3%] sm:mb-[1.5%] xl:mb-[3%] "
          />
          <ProjBasicDetails
            Id={TOPIC_IDS.APPROVED_BY}
            key="ProjectApprovedBy"
            icon={<EndDate />}
            title="Approved By"
            value={projAuthorityNames}
            type="authorities"
            className="mr-[5%] sm:mr-[3%] xl:mr-[5%] pt-[2%] mb-[3%] sm:mb-[1.5%] xl:mb-[3%]  "
          />

          {phases?.length == 1 && (
            <>
              <ProjBasicDetails
                Id="promoter-name"
                key="promoter-name"
                icon={<TotalLandArea />}
                title="Promoter Name"
                value={PhaseOverview[0]?.phasePromoter}
                className="mr-[5%] sm:mr-[3%] xl:mr-[5%] pt-[2%] mb-[3%] sm:mb-[1.5%] xl:mb-[3%]  "
              />
              <ProjBasicDetails
                Id={TOPIC_IDS.RERA_STATUS}
                key="rerastatus"
                icon={<ReraStatusProj />}
                title="RERA Status"
                value={PhaseOverview[0]?.rerastatus}
                className="mr-[5%] sm:mr-[3%] xl:mr-[5%] pt-[2%] mb-[3%] sm:mb-[1.5%] xl:mb-[3%]  "
              />
            </>
          )}

          {phases?.length == 1 &&
            PhaseOverview[0]?.rerastatus !== "Not Applied" && (
              <ProjBasicDetails
                Id={TOPIC_IDS.RERA_ID}
                key="reraId"
                icon={<EndDate />}
                title={
                  PhaseOverview[0]?.rerastatus === "Recieved"
                    ? "RERA ID"
                    : "Acknowledgement Id"
                }
                value={PhaseOverview[0]?.reraId}
                className="mr-[5%] sm:mr-[3%] xl:mr-[5%] pt-[2%] mb-[3%] sm:mb-[1.5%] xl:mb-[3%]  "
              />
            )}
        </div>
        <div className=" flex justify-start md:justify-end items-start md:items-end flex-col mt-[3%] md:mt-0 relative pb-2 sm:pb-4 xl:pb-10">
          <ReportSection slug={slug} />
          <ShortList slug={slug} />
          <CompareList slug={slug} />
          <Message slug={slug} />
        </div>
      </div>
      <OverviewBanner
        maxPrice={maxPrice}
        minPrice={minPrice}
        name={projectName}
        buiderName={data?.data?.userName}
        builderId={builderId}
        basePrice={basePrice}
        brocherUrl={media?.projBroucherUrl}
        slug={slug}
      />
    </div>
  );
}
