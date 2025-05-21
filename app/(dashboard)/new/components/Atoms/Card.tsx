import { HeartIcon, ShareIcon } from "@/app/images/HomePageIcons";
import { Divider } from "@mantine/core";
import Image from "next/image";
import React from "react";

type Props = {};

export default function MainCard({}: Props) {
  return (
    <div className="w-[490px] bg-gray-200">
      <div className="h-[276px] shrink-0 shadow-[0px_4px_20px_0px_rgba(194,194,194,0.40)] relative">
        <button className="inline-flex justify-center items-center gap-2.5 rounded border p-2 border-solid border-[#0073C6] bg-[#0073c6] text-white text-sm not-italic font-bold leading-[normal] capitalize absolute bottom-3 right-3">
          View Detail
        </button>
        <Image
          alt="test"
          src="/test.jpg"
          width={490}
          height={276}
          className="object-cover w-full h-full"
        />
        <p className="absolute top-[1px] left-[0.8px]">
          <Image src={"/r.svg"} alt="rera" width={100} height={100} />
        </p>
        <div className="absolute bottom-2 left-2 space-y-2">
          <p className="flex justify-center items-center gap-1 rounded p-1 bg-[#000000b0] text-white text-base not-italic font-semibold leading-[normal] capitalize">
            201 units
          </p>
          <p className="flex justify-center items-center gap-1 rounded p-1 bg-[#000000b0] text-white text-base not-italic font-semibold leading-[normal] capitalize">
            Ready to move
          </p>
        </div>
      </div>
      <div className="h-[183px] self-stretch rounded shadow-[0px_4px_20px_0px_rgba(194,194,194,0.40)] border-[0.8px] border-solid border-[#A4B8B5]bg-white">
        <div className="p-3 flex justify-between">
          <div className="space-y-1">
            <p className="text-[#148B16] text-[22px] not-italic font-bold leading-[normal] capitalize">
              ₹ 50 lkh - ₹ 23 Cr
            </p>
            <p className="text-[#242424] text-lg not-italic font-semibold leading-[normal] capitalize">
              Prestige Green City
            </p>
            <p className="text-[#242424] text-sm not-italic font-semibold leading-[normal] capitalize">
              Whitefield, Bengaluru
            </p>
          </div>
          <div className="flex gap-2">
            <HeartIcon className="cursor-pointer" />
            <ShareIcon className="cursor-pointer" />
          </div>
        </div>
        <div className="pl-3">
          <div className="inline-flex items-center gap-1 self-stretch rounded border-[0.5px] border-solid border-[#616D75] bg-[#F5F5F5] p-1">
            <DownSectionCard label="Units Available" value="Apartment, Villa" />
            <Divider orientation="vertical" color="#7BA0BB" />
            <DownSectionCard label="Start Date" value="23 June, 2023" />
            <Divider orientation="vertical" color="#7BA0BB" />
            <DownSectionCard label="End Date" value="12 Aug, 2024" />
            <Divider orientation="vertical" color="#7BA0BB" />
            <DownSectionCard label="Project Land Area" value="81 Acres" />
          </div>
          <p className="text-[#242424] text-sm not-italic font-semibold leading-[normal] capitalize mt-2">
            Builder: Prestige
          </p>
        </div>
      </div>
    </div>
  );
}
const DownSectionCard = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="flex flex-col justify-center items-start ">
      <p className="text-[#001F35] text-[13px] not-italic font-medium">
        {label}:
      </p>
      <p className="text-[#242424] text-sm not-italic font-semibold">{value}</p>
    </div>
  );
};
