import {
  formatCurrency,
  // formatNumberWithSuffix
} from "@/app/utils/numbers";
import React from "react";
// import { NewMapIcon } from "@/app/images/commongsSvgs2";
import { sortUnits } from "@/app/utils/unitparser";
import { useSetAtom } from "jotai";
import { overlayAtom } from "@/app/test/newui/store/overlay";
// import {
//   // selectedSearchAtom,
//   mobileSearchPageMapModalReducerAtom,
// } from "@/app/store/search/map";
import {
  // BuilderLink,
  generateBuilderUrl,
} from "@/app/utils/linkRouters/Builder";
import {
  // ProjectLink,
  createProjectLinkUrl,
} from "@/app/utils/linkRouters/ProjectLink";
import Link from "next/link";

type Props = any;

export default function ProjData({
  minPrice,
  maxPrice,
  projName,
  city,
  locality,
  postedByName,
  type,
  price,
  propName,
  localityName,
  propTypeName,
  bhkName,
  category,
  cityName,
  propType,
  bhkNames,
  address,
  phaseName,
  projIdEnc,
  propTypeId,
  propIdEnc,
  otherCharges,
  phaseCount,
  phaseId,
  builderCity,
  postedBy,
  pageUrl,
  cg,
}: Props) {
  const sortedBhks = sortUnits(bhkNames);
  const dispatch = useSetAtom(overlayAtom);
  // const mobileMapDispatch = useSetAtom(mobileSearchPageMapModalReducerAtom);

  let urlBuilder = generateBuilderUrl({
    slug: postedByName,
    city: builderCity ? builderCity : cityName,
  });
  let projectUrl =
    projIdEnc &&
    createProjectLinkUrl({
      city: cityName,
      slug: propName,
      locality: localityName,
      projIdEnc: projIdEnc,
    });

  // console.log(postedByName, type, category,  "of poste by in buyilfder poste card")
  return type === "proj" ? (
    <div className="flex flex-col">
      <Link href={pageUrl} prefetch={false}>
        <h2>
          <span className="text-[#001F35] text-[15px] sm:text-[16px] xl:text-[18px] font-bold break-words whitespace-normal min-w-0 inline-flex gap-1 items-center flex-wrap w-full xl:w-[calc(100%-210px)]">
            {projName}{" "}
            {phaseName && phaseCount !== undefined && phaseCount > 1 && (
              <span className="text-[12px] sm:text-[14px] ">({phaseName})</span>
            )}
          </span>

          <span className="text-[#148B16] text-[14px] block sm:text-[18px] xl:text-xl not-italic font-bold relative">
            Price Range: {formatCurrency(Number(minPrice))} -{" "}
            {formatCurrency(Number(maxPrice))}
          </span>

          <span
            className={`text-black text-[12px] sm:text-[14px] xl:text-[14px] font-bold w-full xl:w-[calc(100%-100px)]`}
          >
            <span>
              {sortedBhks && sortedBhks.length > 5
                ? sortedBhks
                    .filter(
                      (bhk) => !bhk.includes(".5") && !bhk.includes("Servant")
                    )
                    .slice(0, 5)
                    .join(", ")
                : sortedBhks && sortedBhks.join(", ")}
            </span>
            {sortedBhks && sortedBhks.length > 5 && (
              <span
                className="text-btnPrimary text-[12px] sm:text-[14px] underline ml-1 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({
                    type: "OPEN",
                    content: sortedBhks,
                    title: "Unit Types",
                    id: `${
                      type === "proj" ? projIdEnc : propIdEnc
                    }+${propTypeId}+${phaseId}`,
                    conType: "bhk",
                    pType: type,
                  });
                  // Add your logic here to show all BHK types (e.g., open a modal)
                }}
              >
                +{sortedBhks.length - 5} more
              </span>
            )}
            {` ${propType} For ${
              cg === "R" ? "Rent" : "Sale"
            } in ${locality}, ${city}`}
          </span>
        </h2>
        <p className="text-black text-[12px] sm:text-[16px] xl:text-[14px] capitalize font-medium line-clamp-1 w-full xl:w-[calc(100%-100px)]">
          Address: {address}
        </p>
      </Link>
      <p className="text-black text-[12px] sm:text-[14px] xl:text-[14px] font-normal">
        {postedBy ?? "Builder"}:{" "}
        <Link
          prefetch={false}
          href={urlBuilder}
          title="Click to view Builder"
          className="font-bold underline cursor-pointer"
          // onClick={(e) => {
          //   e.stopPropagation();
          //   window.open(urlBuilder, "_self", "noreferrer");
          // }}
        >
          {postedByName}
        </Link>
      </p>
    </div>
  ) : (
    <div>
      <Link href={pageUrl} prefetch={false}>
        <h2
          className={`text-[#242424] text-[14px] sm:text-[16px] xl:text-[18px] capitalize not-italic font-bold w-full xl:w-[calc(100%-210px)]`}
        >
          {bhkName} {propTypeName} for {category} in {localityName}
        </h2>
      </Link>
      <p className="text-[#148B16] text-[14px] sm:text-[18px] xl:text-xl not-italic font-bold relative">
        {formatCurrency(Number(price))}{" "}
        {(otherCharges?.otherCharge ||
          (otherCharges && Object.keys(otherCharges).length > 2)) && (
          <span
            className="  text-btnPrimary cursor-pointer text-[12px] xl:text-sm"
            onClick={(e) => {
              e.stopPropagation();
              dispatch({
                conType: "otherCharges",
                content: {
                  charges: otherCharges,
                },
                // id: `${type === "proj" ? projIdEnc : propIdEnc}+${propTypeId ?? ''}${phaseId ? '+' + phaseId : ''}`,
                id: `${projIdEnc ?? ""}+${propIdEnc ?? ""}${
                  propTypeId ?? propTypeName ?? ""
                }${type === "proj" && phaseId ? "+" + phaseId : ""}`,
                title: "Other Charges",
                type: "OPEN",
                pType: type,
              });
            }}
          >
            View Other Charges
          </span>
        )}
      </p>

      <h3 className="text-[#001F35] text-[12px] sm:text-[16px]   not-italic font-bold">
        {projIdEnc != undefined ? (
          <Link
            prefetch={false}
            className={`font-bold underline cursor-pointer`}
            href={projectUrl}
          >
            {propName}{" "}
          </Link>
        ) : (
          <span>{propName}</span>
        )}
      </h3>
      <p className="text-black text-[12px] sm:text-[16px] xl:text-[14px] capitalize font-medium line-clamp-1 w-[130%] sm:w-[100%] xl:w-[calc(100%-118px)]">
        Address: {address}
      </p>
      <p className=" text-gray-600 text-[12px] sm:text-[12px] xl:text-[14px] not-italic font-semibold ">
        {postedBy ?? "Builder"}:{" "}
        <span
          className={`font-bold text-[#242424] ${
            postedBy === "Builder" ? "underline cursor-pointer" : ""
          }`}
          onClick={
            postedBy === "Builder"
              ? (e) => {
                  e.stopPropagation();
                  window.open(urlBuilder, "_self", "noreferrer");
                }
              : undefined
          }
        >
          {/* {getTypeText(type)} */}
          {postedByName}
        </span>
      </p>
    </div>
  );
}

export const projectprops = {
  villa: 31,
  plot: 32,
  rowHouse: 33,
  villament: 34,
  apartment: 35,
  independent: 36,
};
