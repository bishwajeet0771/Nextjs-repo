"use client";
import {
  // PriceBag,
  // DocIcon,
  // Phone,
  WhatsAppButton,
} from "@/app/images/commonSvgs";
import React from "react";

import Button from "../../elements/button";
// import { useParams } from "next/navigation";
import { formatCurrency } from "@/app/utils/numbers";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import RequestCallBackModal, {
  preventBackButton,
} from "../molecules/popups/req";
// import DownloadBroucher from "@/app/components/project/downloadBroucher";
// import { NumberFormatter } from "@mantine/core";
import Image from "next/image";
// import useHistoryBackHandler from "../molecules/popups/popupCloser";
export default function OverviewBanner({
  minPrice,
  maxPrice,
  name,
  buiderName,
  basePrice,
  // brocherUrl,
  builderId,
  slug,
}: {
  minPrice: number;
  maxPrice: number;
  name: string;
  buiderName: string;
  basePrice: number;
  brocherUrl?: string;
  builderId: number;
  slug: string;
}) {
  const [, { open }] = useReqCallPopup();
  return (
    <div
      className="flex justify-start items-center w-full flex-col md:flex-row bg-[#f0f9ff] sm:scroll-mt-[125px] scroll-mt-40 "
      // id="brochure"
    >
      {/* <PriceBag className="w-[100px] h-[120px]  sm:w-[151px] xl:w-[237px]  sm:h-[169px] xl:h-[263px] mt-2 sm:mt-0" />
       */}
      {/*  <picture>
              <source
                media="(max-width: 460px)"
                srcSet={broucherImage?.split(",")[0]}
              />
              <source
                media="(max-width: 768px)"
                srcSet={broucherImage?.split(",")[1]}
              />
              <source
                media="(min-width: 1200px)"
                srcSet={broucherImage?.split(",")[2]}
              />
              <Image
                alt={`${projName} Brochure`}
                title={`${projName} Brochure`}
                src={broucherImage?.split(",")[3]}
                fill
                unoptimized
              />
            </picture> */}
      <Image
        src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/project-detail/pricebag-mobile.webp`}
        width={100}
        height={120}
        alt="price OverView"
        className="w-[100px] sm:hidden h-[120px] sm:h-[169px] mt-2 sm:mt-0"
        unoptimized
        title="price OverView"
      />
      <Image
        src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/project-detail/pricebag-laptop.webp`}
        width={151}
        height={169}
        alt="price OverView"
        className=" sm:max-w-[151px] hidden sm:flex xl:hidden  sm:w-[151px]   sm:h-[169px] mt-2 sm:mt-0"
        unoptimized
        title="price OverView"
      />
      <Image
        src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/project-detail/pricebag.webp`}
        width={237}
        height={263}
        alt="price OverView"
        className="   xl:max-w-[237px]  xl:w-[237px] xl:h-[263px] hidden xl:flex  mt-2 sm:mt-0"
        unoptimized
        title="price OverView"
      />

      <div className="flex justify-center sm:justify-between items-center w-[100%] flex-row sm:ml-[3%] p-[2%]  flex-wrap">
        <div className=" grid  md:block">
          <h3 className="text-[#212C33] sm:text-[24px] xl:text-[34px] font-[600] text-center sm:text-start ">
            Price Range
          </h3>
          <p className="text-[#001F35]  sm:text-[32px]  whitespace-nowrap font-[700] mt-1 mb-[16px]">
            {formatCurrency(minPrice)} - {formatCurrency(maxPrice)}
            {", "}
            <span className="text-[#545353] text-xs sm:text-[20px] xl:text-[24px] text-wrap not-italic font-medium leading-[normal]">
              {formatCurrency(basePrice)} Base Price/sq.ft
            </span>
          </p>
          <div className="flex justify-center sm:justify-start items-center w-full space-x-2">
            <Button
              title="Request Callback"
              buttonClass=" text-[#FFF] text-[12px] sm:text-[20px] xl:text-[28px] font-[600] bg-[#0073C6]  rounded-[5px] shadow-md whitespace-nowrap flex items-center p-[8px]  mt-3 sm:mt-0"
              onChange={() => {
                preventBackButton();
                open({
                  modal_type: "PROJECT_REQ_CALLBACK",
                  postedByName: buiderName,
                  reqId: slug,
                  source: "projBanner",
                  title: name,
                  postedId: builderId,
                  cg: "",
                });
                // pushHistory();
              }}
            />
            {/* <DownloadBroucher
              className="block py-2.5 !font-[600] sm:hidden"
              url={brocherUrl}
            /> */}
          </div>
        </div>
        <div
          className="flex justify-center items-end flex-col scroll-mt-[400px]"
          id="download-brochure"
        >
          {/* <DownloadBroucher className="hidden sm:flex" url={brocherUrl} /> */}
          <WhatsAppButton
            className="cursor-pointer mt-2 sm:mt-4 "
            name={name}
            aria-label={`Chat with ${name} on WhatsApp`}
          />
        </div>
      </div>

      <RequestCallBackModal />
    </div>
  );
}
