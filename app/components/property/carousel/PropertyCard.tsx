/* eslint-disable no-unused-vars */
"use client";
import React from "react";
// import { CarouselSlide } from "@mantine/carousel";
import Image from "next/image";
import {
  // Phone,
  Shorlisted,
  shortlistIconSvg,
} from "@/app/images/commonSvgs";
import { formatCurrency, formatNumberWithSuffix } from "@/app/utils/numbers";
import { useSession } from "next-auth/react";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import { useShortlistAndCompare } from "@/app/hooks/storage";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import clsx from "clsx";
// import { GlobalPageType } from "@/app/validations/global";
// import { useSetAtom } from "jotai";
// import { NearByDataAtom } from "@/app/store/nearby";
import Button from "@/app/elements/button";
// import MainCarousel from "../../molecules/carousel/main";
import { useMediaQuery } from "@mantine/hooks";
// import { redirect } from "next/dist/server/api-utils";
import { get_posted_by } from "@/app/utils/dyanamic/projects";
import { generateListingLinkUrl } from "@/app/utils/linkRouters/ListingLink";
import NewCarousel from "@/app/test/components/NewCarousel";
// import { slugify } from "../BreadCrumb/ListingBreadcrumb";
import Link from "next/link";
type Props = {
  type: string;
  title: any;
  projName?: string;
  content: string;
  data?: any;
  mutate?: ({ id }: { id: string; type: "other" | "proj" }) => void;
  ct?: "other" | "proj";
  url?: string;
};

type CardProps = {
  type: string;
  projName?: string;
  cardData?: any;
  mutate?: ({ id }: { id: string; type: "other" | "proj" }) => void;
  ct: "other" | "proj";
};

export function PropertyCard({ type, cardData, mutate, ct }: CardProps) {
  const [, { open }] = useReqCallPopup();
  const { data: session } = useSession();
  const { toggleShortlist } = useShortlistAndCompare();
  const [, { open: openS }] = usePopShortList();
  const reqId = type === "proj" ? cardData.projIdEnc : cardData.propIdEnc;
  const name =
    type === "proj"
      ? cardData.projName
      : `${cardData.bhkName ?? ""} ${cardData.propTypeName} for
      ${cardData.cg === "R" ? "Rent" : "Sell"} in ${cardData.ltName}`;
  const onAddingShortList = (e: any, propId: string) => {
    e.stopPropagation();
    if (session) {
      mutate && mutate({ id: propId, type: ct as Pick<CardProps, "ct">["ct"] });
      toggleShortlist({
        id: reqId,
        status: cardData.shortListed === "Y" ? "N" : "Y",
        source: "prop",
      });
    } else {
      openS();
    }
  };
  const q = (e: any) => {
    e.preventDefault();
    open({
      modal_type: "PROPERTY_REQ_CALLBACK",
      postedByName: get_posted_by(cardData.postedByName),
      postedId: cardData.postedById,
      reqId: cardData.propIdEnc,
      source: "propCard",
      title: name,
    });
  };
  const isMobile = useMediaQuery("(max-width: 601px)");
  const redirect = (propId: string) => {
    const url = generateListingLinkUrl({
      locality: cardData.ltName,
      city: cardData.ctName,
      projName: cardData.projIdEnc ? cardData.propName : null,
      category: cardData.cg === "R" ? "for-rent" : "for-sale",
      propIdEnc: propId,
      bhkUnitType: cardData.bhkName
        ? cardData.bhkName + " " + cardData.propTypeName
        : cardData.propTypeName,
      phase: cardData.phase,
    });
    return url;
    // window.open(url, "_blank", "noreferrer");
  };

  return (
    <Link
      prefetch={false}
      // onClick={() => redirect(reqId)}
      href={redirect(reqId)}
      key={reqId}
      className={clsx(
        "border text-card-foreground min-w-[310px] max-w-full min-h-[400px] overflow-hidden shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] rounded-[14px]",
        type == "proj" ? "bg-[#FAFAFA] " : "bg-[#FFFFFF] pt-4"
      )}
    >
      {type == "proj" && (
        <span className=" space-y-1.5 p-6  px-4 pt-2 pb-3 justify-between items-center">
          <Link
            prefetch={false}
            rel="noopener noreferrer"
            className="tracking-tight text-[18px] font-[600] text-wrap text-[#565D70] cursor-pointer"
            href={`/abc/karnataka/banglore/${reqId}`}
          >
            {cardData.propName}
          </Link>
          <span className="text-xs font-semibold  ">
            <span className="text-[16px] font-[700] text-[#0C5F0E]">
              {formatCurrency(cardData.minPrice)}
            </span>{" "}
            -{" "}
            <span className="text-[16px] font-[700] text-[#0C5F0E]">
              {formatCurrency(cardData.maxPrice)}
            </span>
          </span>
        </span>
      )}

      <h2 className="px-3 pb-3 relative">
        {type != "proj" && (
          <span className="absolute flex  h-[33px] justify-center items-center gap-2 shrink-0 shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] p-2 rounded-[18px] border-[0.5px] border-solid border-[#92B2C8] bg-gradient-to-br from-[#EFF5FF] to-[#F2FAFF] top-2 left-5 z-10 text-[#0C5F0E] text-sm not-italic font-bold">
            {cardData.availablityStatus == "R"
              ? "Ready to move"
              : "Under Construction"}
          </span>
        )}
        <div className="!relative max-h-[212px]">
          <Image
            src={
              type === "proj"
                ? cardData?.coverUrl?.split(",")[1]
                : cardData.projMedia?.coverImageUrl?.split(",")[1]
            }
            alt="Sobha Dream Acres"
            className="w-full mb-4 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] rounded-[5px] min-h-[212px] max-h-[212px]"
            width={300}
            height={212}
          />
          {type == "proj" &&
            (cardData.rerastatus === "Recieved" ||
              cardData.rerastatus === "Applied") && (
              <p className="absolute top-[1px] left-[0.8px]">
                <Image src={"/r.svg"} alt="rera" width={100} height={100} />
              </p>
            )}

          <button
            aria-label={`${cardData.shortListed === "Y" ? "Shortlisted" : "Shortlist"}`} 
            name={`${cardData.shortListed === "Y" ? "Shortlisted" : "Shortlist"}`} 
            title={`${cardData.shortListed === "Y" ? "Shortlisted" : "Shortlist"}`}
            className={clsx(
              " !absolute bottom-[10px] right-[10px] rounded-[10px] z-10 p-[8px] text-[12px] sm:text-[18px] font-[700] flex pl-[4px] justify-center items-center ",
              cardData.shortListed === "Y"
                ? "bg-[rgb(231,245,255)] text-[#0C5F0E] text-2xl not-italic font-semibold leading-[normal] tracking-[0.96px]"
                : "bg-gradient-to-r from-[#EFF5FF] /0 to-[#F2FAFF]/100 text-[#0073C6]"
            )}
            onClick={(e) => {
              e.preventDefault();
              onAddingShortList(e, cardData.propIdEnc);
            }}
          >
            <span className=" w-[24px] h-[24px] ">
              {cardData.shortListed === "Y" ? Shorlisted : shortlistIconSvg}
            </span>
            {cardData.shortListed === "Y" ? "Shortlisted" : "Shortlist"}
          </button>
        </div>

        <div className="text-sm">
          {type != "proj" && (
            <p className="mb-[4px] text-[#242424] text-[14px] sm:text-base not-italic font-semibold leading-[normal] tracking-[0.56px] ">
              {cardData.propTypeName === "Plot"
                ? formatNumberWithSuffix(cardData.plotArea, false) + " sq.ft"
                : ""}{" "}
              {cardData.bhkName} {cardData.propTypeName} for{" "}
              {cardData.cg === "R" ? "Rent" : "Sell"} in {cardData.ltName}{" "}
              <br />
              <span className="text-[18px] font-[700] text-[#0C5F0E] ">
                {" "}
                {formatCurrency(cardData.price)}
              </span>{" "}
            </p>
          )}
          {type == "proj" && (
            <p className="mb-[6px] text-[#565D70] text-sm not-italic font-semibold leading-[normal]">
              Start - End Date:
              <span className="ml-[4px] text-[#001F35] text-sm not-italic font-semibold leading-[normal]">
                {formatDate(cardData.launchDate)} -{" "}
                {formatDate(cardData.possassionDate)}
              </span>
            </p>
          )}
          <p className="text-[#00487C] text-base not-italic font-semibold mb-1">
            {cardData.propName}
          </p>
          {type != "proj" && (
            <p className="text-[16px] mb-[6px] font-[600] text-[#4D6677]">
              Available From: {formatDate(cardData.availableFrom)}
            </p>
          )}
          <p className="text-[#565D70]  not-italic font-semibold leading-[normal] tracking-[0.56px] mb-1">
            {type === "proj" &&
              `${cardData?.city}, ${cardData.locality}, ${cardData.address}`}

            {`${cardData.ltName},   
                ${cardData.ctName}, 
                ${cardData.stateName ?? ""}, 
                ${cardData.pinCode}`}
          </p>
          {type === "proj" && (
            <p className="inline-flex items-start gap-2 p-2 shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] rounded-[10px] cardBg mt-[16px]">
              <span className="text-black text-right text-base not-italic font-medium leading-[normal]">
                Project Status:{" "}
              </span>
              <span className="text-[#0C5F0E] text-base not-italic font-bold leading-[normal]">
                {cardData.projstatus}
              </span>
            </p>
          )}
          {type != "proj" && (
            <p className="text-[16px] font-[500] text-[#4D6677]">
              Posted by {cardData.postedByType === "B" ? "Builder" : "Agent"}
            </p>
          )}
          <Button
            icon={isMobile ? null : null}
            title="Request  Callback"
            buttonClass=" text-[#FFF] mt-[12px] text-[12px] xl:text-[16px] font-[600] bg-[#0073C6] rounded-[5px] shadow-md whitespace-nowrap flex items-center p-[6px]  "
            onChange={q}
          />
        </div>
      </h2>
    </Link>
  );
}

const ProjectCarousel = ({
  type,
  content,
  title,
  projName,
  data,
  mutate,
  ct,
  url,
}: Props) => {
  return (
    data?.length > 0 && (
      <div className="w-[96%] md:w-[90%] mx-auto mb-1 sm:mb-[3%]">
        <div className=" ">
          <h3 className="sm:text-[22px] xl:text-[28px] mb-[4px] sm:mb-[8px] xl:mb-[10px] font-bold capitalize">
            <strong>
              {/* <span className="!text-green-600">SARANG BY SUMADHARA </span> */}
              <span className="text-[#001F35]">{title}</span>
              <span className="text-green-800 uppercase ml-4 ">{projName}</span>
            </strong>
          </h3>
          <p className="text-[#4D6677] text-[12px] sm:text-2xl italic font-medium leading-[normal] capitalize">
            {content}
          </p>
        </div>
        <NewCarousel
          data={data}
          type={type}
          renderItem={(project: any, index) => (
            <PropertyCard
              key={`NewCarousel_proj_${index.toString()}`}
              type={type}
              cardData={project}
              mutate={mutate}
              ct={ct ?? "other"}
            />
          )}
          slidesToShow={4}
          gap={10}
          url={url}
          // url={`/search/listing?listedBy=ALL&cg=${data.cg === "R" ? "R" : "S" }`}
        />
        {/* <MainCarousel>
          {data &&
            data?.map((project: any, index: number) => {
              return (
                <CarouselSlide
                  className="!h-[450px] sm:!h-[500px]"
                  key={`PropertyCarouselCon_${project?.propIdEnc}`}
                >
                  <PropertyCard
                    type={type}
                    cardData={project}
                    mutate={mutate}
                    ct={ct ?? "other"}
                  />
                </CarouselSlide>
              );
            })}
        </MainCarousel> */}
      </div>
    )
  );
};

export default ProjectCarousel;
function formatDate(inputDate: string | undefined): string {
  if (inputDate == null) {
    return "";
  }

  const date = new Date(inputDate.replace(/IST/, "GMT+0530"));

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const day = date.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    date
  );
  const year = date.getFullYear();

  const formattedDate = `${day} ${month}, ${year}`;

  return formattedDate;
}
