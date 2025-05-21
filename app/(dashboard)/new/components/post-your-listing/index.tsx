import Image from "next/image";
import React from "react";
import Btn from "./Btn";

type Props = {};

export default function PostYourListing({}: Props) {
  return (
    <div className="w-[90%] sm:max-w-[725px] sm:w-full rounded-[4px] mb-[40px] xl:max-w-[1188px] xl:min-h-[341px] shrink-0 sm:rounded-0 shadow-[0px_4px_20px_0px_rgba(194,194,194,0.76)] border-[0.8px]  border-solid border-[#D9E4EE] m-auto mt-[40px] sm:mt-[80px] mb:[40px] sm:mb-[80px] bg-[#dae6f1] flex justify-center items-center px-5 py-4 sm:px-10 ">
      <div className="flex justify-center items-center text-center sm:text-start flex-col sm:block">
        <h3 className="text-[16px] text-[#202020] sm:text-[20px] xl:text-[26px] not-italic font-semibold leading-[normal] tracking-[1.28px]">
          Post Your Listing Today!
        </h3>
        <Image
          src={"/home/postlisting.svg"}
          alt="Post Your Listing"
          width={387}
          height={257}
          className="block sm:hidden min-w-[214px] max-w-[214px] sm:min-w-[387px] sm:max-w-[387px] min-h-[143px] max-h-[143px] sm:min-h-[257px] sm:max-h-[257px] "
        />
        <p className="text-[12px] text-[#242424] sm:text-[16px] xl:text-[24px] not-italic mt-[18px] mb-[18px] font-medium sm:leading-[30px] tracking-[0.96px] sm:mb-[18px]">
          Your listings deserves the spotlight. Add it to our platform today!
        </p>
        <Btn text="" />
      </div>
      <div>
        <Image
          src={"/home/postlisting.svg"}
          alt="Post Your Listing"
          width={387}
          height={257}
          className="hidden sm:block sm:min-w-[273px] sm:min-h-[182px] xl:min-w-[387px] xl:min-h-[257px] "
        />
      </div>
    </div>
  );
}
