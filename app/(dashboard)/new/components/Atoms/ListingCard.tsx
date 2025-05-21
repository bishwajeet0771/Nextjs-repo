// import { HeartIcon, ShareIcon } from "@/app/images/HomePageIcons";
import { formatCurrency, formatNumberWithSuffix } from "@/app/utils/numbers";
import { calculatePerSqPrice } from "@/app/utils/price";
import Image from "next/image";
import React from "react";
import ShareBtn from "../newly-added-projects/ShareBtn";
import { formatDate, formatDateDDMMYYYY } from "@/app/utils/date";
import { getImageUrls } from "@/app/utils/image";
import Shortlist from "./Shortlist";
import ListingReqBtn from "./ListingReqCallbackBtn";
import { generateListingLinkUrl } from "@/app/utils/linkRouters/ListingLink";
import Link from "next/link";
type Props = {
  item: any;
  sl: string;
};

export default function ListingCard({ item, sl }: Props) {
  const images = getImageUrls(item.media);
  const title = `${
    item.propTypeName === "Plot"
      ? `${formatNumberWithSuffix(item.pa, false)} sq.ft`
      : item.bhkName
  } ${item.propTypeName} for ${item.category} in ${item.localityName}`;
  const listingLink = generateListingLinkUrl({
    bhkUnitType: item.bhkName
      ? item.bhkName + "-" + item.propTypeName
      : item.propTypeName,
    category: item.category === "Sale" ? "for-sale" : "for-rent",
    city: item.cityName,
    locality: item.localityName,
    propIdEnc: item.propIdEnc,
    phase: item.phaseName,
    projName: item.projIdEnc && item.propName,
  });
  return (
    <div>
      {/* <Link
        prefetch={false}
        href={listingLink}
        rel="noopener noreferrer"
        // onClick={() => onRedirectOnProp()}
        className="w-full max-w-full sm:w-[370px] xl:w-[490px] xl:min-w-[490px] sm:max-w-[490px] cursor-pointer"
      > */}
      <div className="h-[200px] sm:h-[145px] xl:h-[228px]   mb-[6px] shrink-0 shadow-[0px_4px_20px_0px_rgba(194,194,194,0.40)] relative">
        <div className="flex  justify-start items-start gap-[8px] absolute top:0 right-0 p-[8px] ">
          <Shortlist reqId={item.propIdEnc} shortListed={sl} />
          <ShareBtn url={listingLink} type="prop" />
        </div>

        <Link
          prefetch={false}
          href={listingLink}
          className="inline-flex justify-center items-center gap-2.5 rounded border p-1 xl:p-2 border-solid border-[#0073C6] bg-[#0073c6] text-white text-[12px] xl:text-sm not-italic font-bold leading-[normal] capitalize absolute bottom-2 right-2 sm:bottom-3 sm:right-3 " /* z-[1000] */
        >
          View Details
        </Link>
        <Link
          aria-label={`View details for ${title}`}
          prefetch={false}
          href={listingLink}
        >
          {/* <Image
            priority={true}
            alt={title}
            title={title}
            src={images[0]}
            width={490}
            height={276}
            className="object-cover w-full h-full"
            
          /> */}
          <picture>
            <source
              media="(min-width: 1200px)"
              srcSet={images[0] ? images[0].split(",")[3] : ""}
            />
            <source
              media="(max-width: 768px)"
              srcSet={images[0] ? images[0].split(",")[2] : ""}
            />
            <source
              media="(max-width: 460px)"
              srcSet={images[0] ? images[0].split(",")[1] : ""}
            />
            <Image
              priority={true}
              alt={title}
              title={title}
              src={images[0] ? images[0].split(",")[0] : ""}
              width={490}
              height={276}
              className="object-cover w-full h-full"
            />
          </picture>
        </Link>
        <p className="absolute top-2 left-2 flex justify-center items-center gap-1 rounded p-1.5 bg-black/50 backdrop-blur-sm text-white text-[12px] not-italic font-semibold leading-[normal] capitalize border border-white/20">
          Posted Date: {formatDateDDMMYYYY(item.postedDate)}
        </p>
        <div className="absolute bottom-2 left-2 space-y-2">
          {/*   {item.propTypeName !== "Plot" &&  */}
          <p className="flex justify-center items-center gap-1 rounded p-1 bg-[#000000b0] text-white text-[12px] xl:text-base not-italic font-semibold leading-[normal] capitalize">
            {item.propStatus}
          </p>
          {/* } */}
        </div>
      </div>

      <div className="min-h-[256px] sm:min-h-[244px] xl:min-h-[236px] rounded shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] border border-gray-600 bg-white text-gray-800">
        <div className="p-[10px] sm:p-[7px] xl:p-[10px] flex justify-between">
          <Link prefetch={false} href={listingLink} className="space-y-1  ">
            <p className="text-[#242424] min-h-[40px] sm:xl-min-h-[50px] xl:min-h-[56px] text-[12px] sm:text-[14px] xl:text-lg not-italic font-semibold leading-[normal] capitalize">
              {item.propTypeName === "Plot" &&
                `${formatNumberWithSuffix(item.pa, false)} sq.ft`}{" "}
              {item.bhkName} {item.propTypeName} for {item.category} in{" "}
              {item.localityName}
            </p>

            <p className="text-green-700 text-[12px] sm:text-[12px] xl:text-base not-italic font-bold leading-normal capitalize">
              {formatCurrency(item.price)}
              {item.category === "Rent" ? "" : ","}{" "}
              {item.category !== "Rent" && (
                <span className="text-gray-700 text-[12px] sm:text-[12px] xl:text-base not-italic font-bold leading-normal capitalize">
                  ₹{" "}
                  {calculatePerSqPrice(
                    item.price,
                    item.propTypeName === "Plot" ? item.pa : item.sba
                  )}
                  /- sq.ft
                </span>
              )}
            </p>


            <p className="text-[#001F35] text-[12px] xl:text-[14px] not-italic font-semibold leading-[normal] capitalize">
              {item.propName}
            </p>

            <p className="text-[#242424] text-[12px] not-italic font-semibold leading-[normal] capitalize">
              {item.cityName ?? "Banglore"}, {item.localityName}
            </p>
          </Link>
          <div className="hidden  justify-start items-start gap-[8px] ">
            <Shortlist reqId={item.propIdEnc} shortListed={sl} />
            {/* <HeartIcon className="cursor-pointer w-[22px] h-[22px] sm:w-[20px] sm:h-[20px] xl:w-[26px] xl:h-[26px]" /> */}
            <ShareBtn url={listingLink} type="prop" />
          </div>
        </div>
        {/* by default new sortBy */}
        <div className="pl-3 mr-[14px] sm:mr-[4px] sm:ml-[0px] h-full gap-auto">
        <div className="inline-flex flex-wrap items-center gap-1 self-stretch rounded border border-gray-400 bg-gray-100 p-1">
        {item.propTypeName === "Plot" ? (
              <>
                <DownSectionCard
                  label="Plot Area"
                  value={`${formatNumberWithSuffix(item.pa, false)} sq.ft`}
                />
                <hr className=" border border-r-[1px] border-[#7BA0BB] h-[38px] w-[1px] mx-[2px] " />
                <DownSectionCard
                  label={"Possesion Date"}
                  value={formatDate(item.possassionDate, true)}
                />
                <hr className=" border border-r-[1px] border-[#7BA0BB] h-[38px] w-[1px] " />
                <DownSectionCard
                  label={"Available From"}
                  value={formatDate(item.availableFrom, true)}
                />
                <hr className=" border border-r-[1px] border-[#7BA0BB] h-[38px] w-[1px] " />
                <DownSectionCard label={"Plot Facing"} value={item.facing} />
              </>
            ) : item.propStatus === "Under Cunstruction" ? (
              <>
                <DownSectionCard
                  label="Super Builtup Area"
                  value={`${formatNumberWithSuffix(item.sba, false)} sq.ft`}
                />
                {}
                <hr className="border-r border-gray-400 h-[38px] w-[1px] mx-2" />
                <DownSectionCard
                  label="Carpet Area"
                  value={`${formatNumberWithSuffix(item.ca, false)} sq.ft`}
                />
                <hr className="border-r border-gray-400 h-[38px] w-[1px] mx-2" />
                <DownSectionCard
                  label={"Possesion Date"}
                  value={formatDate(item.possassionDate, true)}
                    />
                <hr className="border-r border-gray-400 h-[38px] w-[1px] mx-2" />
                <DownSectionCard
                  label={"Available From"}
                  value={formatDate(item.availableFrom, true)}
                />
              </>
            ) : (
              <>
                <DownSectionCard
                  label="Super Builtup Area"
                  value={`${formatNumberWithSuffix(item.sba, false)} sq.ft`}
                />
                <hr className=" border border-r-[1px] border-[#7BA0BB] h-[38px] w-[1px] mx-[10px] " />
                <DownSectionCard
                  label="Carpet Area"
                  value={`${formatNumberWithSuffix(item.ca, false)} sq.ft`}
                />
                <hr className=" border border-r-[1px] border-[#7BA0BB] h-[38px] w-[1px] " />
                {item.propertyAge != null ? (
                  <DownSectionCard
                    label="Property Age"
                    value={`${item.propertyAge}`}
                  />
                ) : (
                  <DownSectionCard
                    label={"Possesion Date"}
                    value={formatDate(item.possassionDate, true)}
                  />
                )}
                <hr className=" border border-r-[1px] border-[#7BA0BB] h-[38px] w-[1px] " />
                <DownSectionCard
                  label={"Available From"}
                  value={formatDate(item.availableFrom, true)}
                />
              </>
            )}
          </div>
          <div className="flex  mt-auto  justify-between   item-center w-[100%] my-1 sm:y-0">
            <p className="text-[#242424] max-w-[48%]  text-[12px] xl:text-[14px] not-italic font-semibold leading-[normal] capitalize mt-[12px] mb-[6px]">
              {
                item.postedBy === "Builder"
                  ? `Builder : ${item.postedByName}`
                  : item.postedBy === "Agent"
                  ? `Agent : ${item.postedByName}`
                  : "Owner" // Fallback to "Agent" for other values
              }
            </p>
            <ListingReqBtn
              builderId={item.postedById}
              builderName={item.postedBy}
              projName={title}
              reqId={item.propIdEnc}
            />
          </div>
        </div>
      </div>
      {/* </Link> */}
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
      <p className="text-[#001F35] text-[12px] not-italic font-medium">
        {label}:
      </p>
      <p className="text-[#242424] text-[12px] not-italic font-semibold">
        {value}
      </p>
    </div>
  );
};
