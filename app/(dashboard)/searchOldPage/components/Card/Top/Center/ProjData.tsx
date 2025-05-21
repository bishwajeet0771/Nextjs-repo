import { formatCurrency } from "@/app/utils/numbers";
import React from "react";
// import HeartButton from "./HeartButton";
import { generateBuilderUrl } from "@/app/utils/linkRouters/Builder";

type Props = any;

export default function ProjData({
  minPrice,
  maxPrice,
  projName,
  city,
  locality,
  builderName,
  type,
  price,
  propName,
  localityName,
  propTypeName,
  bhkName,
  category,
  cityName,
  postedByName,
}: Props) {
  // console.log( minPrice,
  //   maxPrice,
  //   projName,
  //   city,
  //   state,
  //   locality,
  //   builderName,
  //   shortListed,
  //   type,
  //   price,
  //   propName,
  //   localityName,
  //   propTypeName,

  // )

  let urlBuilder = generateBuilderUrl({
    slug: postedByName,
    city: city,
  });
  return type === "proj" ? (
    <div className="flex flex-col">
      <p className="text-[#001F35] text-[12px] sm:text-[16px] xl:text-[18px] font-semibold break-words whitespace-normal min-w-0 ">
        {projName}
      </p>
      <p className="text-[#148B16] text-[14px] sm:text-[18px] xl:text-xl not-italic font-bold relative">
        {formatCurrency(Number(minPrice))} - {formatCurrency(Number(maxPrice))}
      </p>
      <p className="text-[#242424] text-[12px] sm:text-[16px] xl:text-[18px] capitalize font-medium">
        {`${locality}, ${city}`}
      </p>
      <p className="text-[#242424] text-[12px] sm:text-[14px] xl:text-[14px] font-normal">
        Posted By: <span className="font-bold">{builderName}</span>
      </p>
    </div>
  ) : (
    <div>
      <p className="text-[#242424] text-[12px] sm:text-[16px] xl:text-[18px] capitalize  not-italic font-medium">
        {bhkName} {propTypeName} for {category} in {localityName}
      </p>
      <p className="text-[#148B16] text-[14px] sm:text-[18px] xl:text-xl not-italic font-bold relative">
        {formatCurrency(Number(price))}
      </p>

      <p className="text-[#001F35] text-[12px] sm:text-[16px]  xl:text-[18px] not-italic font-semibold">
        {propName}{" "}
      </p>
      <p className="text-[#242424] text-[12px] sm:text-[16px] xl:text-[18px] capitalize  not-italic font-medium">
        {`${localityName}, ${cityName}`}
      </p>
      <p className="text-[#242424] cursor-pointer text-[12px] sm:text-[12px]  xl:text-[14px] not-italic font-normal">
        Builder:
        <span
          className="font-bold"
          onClick={(e) => {
            e.stopPropagation();
            window.open(urlBuilder, "_self");
          }}
        >
          {postedByName}
        </span>
      </p>
    </div>
  );
}
// function getTypeText(type: string) {
//   let text;

//   if (type === "proj") {
//     text = "Builder";
//   } else if (type === "I") {
//     text = "Owner";
//   } else if (type === "A") {
//     text = "Agent";
//   } else {
//     text = "Unknown";
//   }

//   return text;
// }

export const projectprops = {
  villa: 31,
  plot: 32,
  rowHouse: 33,
  villament: 34,
  apartment: 35,
  independent: 36,
};
