import React from "react";
import MainHeading from "../heading";
import CardSection from "./Card";
import Link from "next/link";
type Props = {};

export default function ListbySection({}: Props) {
  return (
    <div className="mt-[40px] sm:mt-[60px] w-[95%] m-auto">
      <MainHeading title="Listings Posted By" content="Browse Listings Now" />
      <Link
      href={`https://www.getrightproperty.com/`}
        className="text-[#202020] text-[16px] md:text-[18px] xl:text-[20px] not-italic font-medium leading-[normal] gap-[8px] absolute top-0 left-0 flex justify-center items-center self-start "
      >
        <span className=" bg-[#E8F3FF] w-[18px] h-[18px] xl:w-[32px] xl:h-[32px] rounded-[50%] flex justify-center items-center "/>
        Back
      </Link>
      <CardSection />
    </div>
  );
}
