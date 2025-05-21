"use client";
import { useMessagePopup } from "@/app/hooks/project/useMessagePopup";
import {
  AvailListSideSvg,
  // RentSvg,
  // SellSvg,
  // StockIcon,
  // postDetailsIcon,
} from "@/app/images/commonSvgs";
import clsx from "clsx";
import Image from "next/image";
import React from "react";
import SubHeading from "./headings/SubHeading";
import { TOPIC_IDS } from "@/app/data/projectDetails";
import { useRouter } from "next/navigation";
import { preventBackButton } from "../molecules/popups/req";
// space fixed
export default function ListingRentAvail({
  projName,
  r,
  s,
  slug,
}: {
  projName: string;
  r: string;
  s: string;
  slug: string;
}) {
  return (
    <div
      className="w-[95%] sm:w-[90%] mb-[3%] xl:mb-[0%]  sm:pt-[50px] m-auto sm:mb-[0%] sm:scroll-mt-[140px] xl:scroll-mt-[150px]"
      id="listings-available"
    >
      <h2 className="text-[20px] sm:text-[22px] xl:text-[28px] font-bold mb-[12px] sm:mb-[6px] xl:mb-[12px]">
        <strong>
          <span className="text-[#001F35]">Listings Available in </span>
          <span className="text-green-800">{projName}</span>{" "}
        </strong>
      </h2>

      <SubHeading text="Unlock the door to your dream home: explore our array of available properties today!" />
      <div className="sm:flex  space-y-4 items-center gap-[28px] sm:gap-[25px] xl:gap-[58px] mt-[18px] sm:mt-[25px] xl:mt-[35px] flex-wrap sm:space-y-0">
        <Card
          type="sell"
          s={s}
          r={r}
          projName={projName}
          block={s === "0"}
          id={TOPIC_IDS.LISTINGS_AVAILABLE}
          slug={slug}
        />
        <Card
          type="rent"
          s={s}
          r={r}
          projName={projName}
          block={r === "0"}
          id={TOPIC_IDS.RENT_LISTINGS_AVAILABLE}
          slug={slug}
        />
      </div>
    </div>
  );
}

const Card = ({
  type,
  r,
  s,
  projName,
  block,
  // id,
  slug,
}: {
  type: "sell" | "rent";
  r: string;
  s: string;
  projName: string;
  block: boolean;
  id: string;
  slug: string;
}) => {
  const router = useRouter();
  const [, { close, open: openSuccesPopup }] = useMessagePopup(
    type === "rent" ? "Rlisting" : "Slisting"
  );
  const handleBoxClick = (value: any, cg: "S" | "R") => {
    if (value) {
      preventBackButton();
      openSuccesPopup();

      setTimeout(() => {
        close();
        document.body.style.overflow = "unset";
        console.log("relising scroll 6");
      }, 5000);
    } else {
      router.push(
        `/search/listing?sf=projIdEnc=${slug}-cg=${cg}-projName=${projName}`
      );
    }
  };

  return (
    <div
      className={clsx(
        " sm:h-[85px] shadow-[0px_4px_30px_0px_rgba(0,0,0,0.15)] rounded-[10px] relative cursor-pointer p-2 sm:p-0",
        type === "sell"
          ? "border border-solid border-[#FBE885]"
          : "border border-solid border-[#B1DEFF]"
      )}
      onClick={() => handleBoxClick(block, type === "sell" ? "S" : "R")}
    >
      <AvailListSideSvg type={type} />
      <div className="flex justify-evenly sm:justify-center items-center gap-2 sm:gap-[22px] h-full ">
        <Image
          alt={type === "rent" ? "Rent Listing" : "Sale Listing"}
          src={type === "rent" ? config.rentMobileLogo : config.sellMobileLogo}
          width={60}
          height={60}
          /*   className="w-[50px] h-[40px] sm:w-[40.08px] sm:h-[48px] xl:w-[60px] xl:h-[60px] block md:ml-[20px]" */
          className="w-[60px] h-[60px]  block md:ml-[20px]"
          title={type === "rent" ? "Rent Listing" : "Sale Listing"}
        />

        <div className="pl-0">
          <h2 className="text-[#242424] text-[18px]  sm:mt-0 sm:text-[18px] xl:text-2xl not-italic font-medium leading-[31px]">
            <strong>
              <span className="capitalize">{type}</span> Listings{" "}
            </strong>
          </h2>
        </div>
        <div
          className={clsx(
            "flex justify-center items-center p-1.5 gap-[4px] sm:gap-2 xl:gap-[12px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] rounded-[10px] border-[3px] border-solid max-w-[60px] xl:max-w-[80px] sm:mt-[14px] sm:ml-5 sm:mb-5 sm:mr-5 text-[#303030] text-[14px] sm:text-lg xl:text-2xl not-italic font-semibold",
            type === "sell"
              ? "border-[#FFD600] bg-[#ffef9b]"
              : "border-[#0073C6] bg-[#DBF0FF]"
          )}
        >
          {type === "rent" ? r : s}{" "}
          <Image
            src={type === "rent" ? config.rentIcon : config.sellIcon}
            className="w-[24px] h-[23px]"
            alt="Price Rate"
            width={24}
            height={23}
            title="Price Rate"
          />
        </div>
      </div>
    </div>
  );
};
let config = {
  sellIcon: `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/project-detail/yellowarrow.png`,
  rentIcon: `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/project-detail/bluearrow.png`,
  rentLogo: `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/project-detail/rent.webp`,
  sellLogo: `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/project-detail/sell.webp`,
  rentMobileLogo: `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/project-detail/rent.webp`,
  sellMobileLogo: `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/project-detail/sell.webp`,
};
