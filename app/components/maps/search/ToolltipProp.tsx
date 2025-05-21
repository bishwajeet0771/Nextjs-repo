import { formatCurrency } from "@/app/utils/numbers";
import Image from "next/image";
import React from "react";
import { onClickRedirect } from "./Tooltip";

type Props = {
  data: any;
};

export default function TooltipProp({ data }: Props) {
  const {
    bhkName,
    price,
    propTypeName,
    category,
    localityName,
    postedBy,
    postedByName,
    cityName,
    coverImage,
  } = data;
  return (
    <div
      className="p-[4px] md:p-[10px] !rounded-2xl cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        onClickRedirect(data);
      }}
    >
      <div className="space-y-1 flex w-full gap-[6px] ">
        <Image
          src={coverImage}
          alt="listing cover Image"
          quality={80}
          height={630}
          width={1200}
          className=" w-[80px] xl:w-[100px] h-[80px] xl:h-[100px] border-[0.5px] border-gray border-solid rounded-[10px] "
          unoptimized
        />
        <div className="w-full mt-0 pt-0">
          <p className="text-[#001F35] text-[12px] xl:text-[14px] not-italic font-semibold capitalize !m-0 !p-0 mb-[4px]">
            {bhkName} {propTypeName} for {category} in {localityName},{"  "}
            <span className="text-[#148B16] text-[14px] xl:text-[16px] not-italic font-bold">
              {formatCurrency(Number(price))}
            </span>
          </p>
          <p className="text-[#242424] text-[12px] xl:text-base font-medium italic !m-0 !p-0 mb-[4px]">
            {localityName}, {cityName}
          </p>{" "}
          <p className="text-[#202020] text-[12px] xl:text-sm not-italic font-normal !m-0 !p-0 mb-[4px]">
            {postedBy}:
            <span className="text-[#202020]  text-[12px] xl:text-sm not-italic font-semibold">
              {" "}
              {postedByName}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
