"use client";
import React from "react";
import ProjBasicDetails from "@/app/components/project/projBasicDetails";
import { Main } from "@/app/validations/property/index";
import { generatePropertyOverViewData } from "@/app/data/property/overview";
import PropertyOverviewBanner from "./OverViewBanner";
import { EndDate, footerPhoneIcon, ShearIcon } from "@/app/images/commonSvgs";
import CompareList from "./actions/compareList";
import ShortList from "./actions/shortList";
import Message from "./actions/Message";
import ReportSectionProperty from "./actions/Report";
import { formatNumberWithSuffix } from "@/app/utils/numbers";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function PropertyOverView({
  data,
  issueData,
}: {
  data: Main;
  issueData: any;
}) {
  const path = usePathname();
  const title = "Share Listing";
  return (
    // <div
    //   className="pt-[2%] sm:scroll-mt-[150px] w-[95%] md:w-[95%] rounded-[24px] shadow-md   mt-[2%] bg-gradient-to-r from-[#F6F6F6] /0 via-[#FFF] /45 to-[#FEFFFF]/100 relative"
    //   id="overview"
    // >
    <div
      id="overview"
      className="pt-4 sm:scroll-mt-[150px] sm:w-[90%] min-h-[250px] rounded-[24px] shadow-md mt-4 bg-gradient-to-r from-[#F6F6F6]/0 via-[#FFF]/45 to-[#FEFFFF]/100 relative"
    >
      <div className="pl-[2%] pr-[2%] flex justify-between items-center flex-wrap">
        <div className="md:w-[80%]">
          <div className="flex justify-between gap-1 items-start ">
            <h1 className="text-[18px] sm:text-[24px] xl:text-[28px] text-[#001F35] font-bold capitalize">
              {/* <strong>
                <span className="lowercase">
                  {data.propTypeName === "Plot" ? formatNumberWithSuffix(data.plotArea,false) + " sq.ft" : ""}
                </span>{" "}
                {data.bhkName} {data.propTypeName} For{" "}
                {data.cg === "S" ? " Sale" : " Rent"} In {data.ltName}
              </strong> */}

              <strong>
                <span className="lowercase">
                  {data.propTypeName === "Plot"
                    ? formatNumberWithSuffix(data.plotArea, false) + " sq.ft"
                    : ""}
                </span>{" "}
                {data.bhkName} {data.propTypeName} For{" "}
                {data.cg === "S" ? " Sale" : " Rent"}{" "}
                <span className="lowercase">in</span> {data.ltName}{" "}
                <span className="lowercase">at</span> {data.propName},{" "}
                {data.ctName}
              </strong>
            </h1>
            {"  "}
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
            {/* <SharePopup title="Share Listing" className="text-sm p-[2px] mt-[2px] sm:hidden " /> */}
          </div>

          <p className="text-[#242424]  text-sm sm:text-[20px] xl:text-[22px] not-italic font-bold leading-[normal] w-[100%] tracking-[0.32px] sm:mt-[10px]  xl:mt-[14px] capitalize  sm:max-w-[1400px]">
            {`${data.address}, ${data.ltName}, ${data.ctName}, ${data?.stateName}, ${data.pinCode}`}
          </p>
        </div>
        <div className="flex justify-center md:items-end flex-col">
          <Link
            prefetch={false}
            rel="noopener noreferrer"
            href={`tel:${8884440963}`}
            className="text-[13px] sm:text-[20px]  mt-3  text-[#0073C6] xl:text-2xl not-italic font-semibold leading-[normal] inline-flex justify-center items-center gap-1.5 p-1.5 xl:p-2 rounded-lg border-[0.8px] border-solid border-[#0073C6] bg-[#fafafa]"
          >
            {footerPhoneIcon}
            Call now
          </Link>
        </div>
      </div>

      {/* <div className="pl-[2%] pr-[2%] flex justify-start xl:justify-between items-start xl:items-end w-full mb-[3%] sm:mb-[1%] xl:mb-[1.5%] mt-[3%] sm:mt-[1%] xl:mt-[1.5%] flex-col xl:flex-row relative"> */}
      <div
        className="pl-4 pr-4 flex justify-between items-start xl:items-end w-full min-h-[250px] mb-6 sm:mb-4 xl:mb-4 mt-6 sm:mt-4 xl:mt-4 flex-col xl:flex-row relative
"
      >
        <div className="flex justify-start items-start flex-wrap w-[100%] xl:w-[78%] ">
          {generatePropertyOverViewData(
            data,
            data.propTypeName,
            data.cg,
            data.availablityStatus
          ).map(({ title, Icon, value }) => (
            <ProjBasicDetails
              key={title}
              icon={<Icon />}
              title={title}
              value={value}
              className="mr-[5%] pt-[2%] mb-[3%]  "
            />
          ))}
          <ProjBasicDetails
            Id={"projectApprovedBy"}
            key="ProjectApprovedBy"
            icon={<EndDate />}
            title="Approved By"
            value={data.projAuthorityNames}
            type="authorities"
            className="mr-[5%] sm:mr-[3%] xl:mr-[5%] pt-[2%] mb-[3%] sm:mb-[1.5%] xl:mb-[3%]  "
          />
        </div>
        <div className="flex justify-start xl:justify-end items-start xl:items-end xl:flex-col mt-[3%] xl:mt-0 pb-10 relative xl:absolute xl:right-0 xl:bottom-0 flex-wrap gap-[10px]">
          <ReportSectionProperty issueData={issueData} />
          <ShortList {...data} />
          <CompareList {...data} />
          <Message {...data} />
        </div>
      </div>
      <PropertyOverviewBanner {...data} />
    </div>
  );
}
