import Image from "next/image";
import React from "react";

type Props = {};

export default function HeadBanner({}: Props) {
  return (
    <div className="mt-3 sm:mt-[0px] py-3 sm:py-0 w-full sm:w-[74%] sm:h-[143px] xl:h-56 shrink-0 sm:rounded-[10px] m-auto bg-[#E8F3FF] flex justify-between items-center px-[5%]">
      <div className="inline-flex flex-col items-start gap-1 sm:gap-2">
        <p className="text-[color:var(--800,#2D3748)] text-[16px] sm:text-[22px] xl:text-[32px] not-italic font-bold leading-[normal] capitalize">
          Contact Us
        </p>
        <p className="text-[#2AA327] text-[16px] sm:text-[22px] xl:text-3xl not-italic font-normal leading-[normal] capitalize font-Ledger cursive">
          Get Right Property
        </p>
      </div>
      <div className="hidden sm:block">
        <Image
          src={"/imgofPhoneIcon/connect_page_banner.svg"}
          alt="contact"
          width={387}
          height={300}
          className=" w-[330px] xl:w-[470px]"
        />
      </div>
    </div>
  );
}
