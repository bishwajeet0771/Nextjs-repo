/* eslint-disable no-unused-vars */
"use client";
import React from "react";
import Image from "next/image";
import Button from "../../elements/button";
import { Shorlisted, shortlistIconSvg } from "@/app/images/commonSvgs";
import { formatCurrency } from "@/app/utils/numbers";
import { useSession } from "next-auth/react";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import { useShortlistAndCompare } from "@/app/hooks/storage";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import clsx from "clsx";
import { GlobalPageType } from "@/app/validations/global";
import {
  // ProjectLink,
  createProjectLinkUrl,
} from "@/app/utils/linkRouters/ProjectLink";
import NewCarousel from "@/app/test/components/NewCarousel";
import Link from "next/link";
import {
  // BuilderLink,
  generateBuilderUrl,
} from "@/app/utils/linkRouters/Builder";
// import { slugify } from "../property/BreadCrumb/ListingBreadcrumb";

type Props = {
  type: string;
  title: any;
  projName?: string;
  content: string;
  data?: any;
  mutate?: ({ id }: { id: string; type: "builder" | "proj" }) => void;
  ct?: "builder" | "proj";
  builderName?: string;
  builderLinkActive: boolean;
  id?: string;
  url?: string;
};

type CardProps = {
  type: string;
  projName?: string;
  cardData?: any;
  mutate?: ({ id }: { id: string; type: "builder" | "proj" }) => void;
  ct: "builder" | "proj";
  builderLinkActive: boolean;
  id?: string;
};

export function ProjectCard({ type, cardData, mutate, ct, id }: CardProps) {
  const [, { open }] = useReqCallPopup();
  const { data: session } = useSession();
  const { toggleShortlist } = useShortlistAndCompare();
  const [, { open: openS }] = usePopShortList();
  const reqId = type === "proj" ? cardData.projIdEnc : cardData.propIdEnc;
  const handleShortlist = (projId: string) => {
    mutate && mutate({ id: projId, type: ct as Pick<CardProps, "ct">["ct"] });
    toggleShortlist({
      id: reqId,
      status: cardData.shortListed === "Y" ? "N" : "Y",
      source: type as GlobalPageType["types"],
    });
  };
  const onAddingShortList = (e: any, projId: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (session) {
      handleShortlist(projId);
    } else {
      openS(() => handleShortlist(projId), {
        type: id,
        action: projId,
      });
    }
  };
  const handleReqCall = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    open({
      modal_type: "PROJECT_REQ_CALLBACK",
      postedByName: cardData.builderName,
      postedId: cardData.builderId,
      reqId: reqId,
      source: "projCard",
      title: cardData.projName,
    });
    window.history.pushState(null, "", window.location.href);  
    document.body.style.overflow = "hidden"; 
  };

  const URLRedirectionProj = createProjectLinkUrl({
    city: cardData.city,
    locality: cardData.locality,
    slug: cardData.projName,
    projIdEnc: cardData.projIdEnc,
  });
  const URLToBuilder = generateBuilderUrl({
    city: cardData.builderCity,
    slug: cardData.builderName,
  });

  return (
    <div
      className={clsx(
        "border border-width: 2px; text-card-foreground min-w-[310px] max-w-full  sm:min-w-[400px] xl:min-w-[310px]  min-h-[400px] xl:max-w-[400px]   mb-[1%] shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] rounded-[14px]",
        type == "proj" ? "bg-[#FAFAFA] " : "bg-[#FFFFFF] pt-4"
      )}
    >
      {type == "proj" && (
        <div className=" space-y-1.5 p-6  px-4 pt-2 pb-3 justify-between items-center">
          <Link
            prefetch={false}
            rel="noreferrer"
            href={URLRedirectionProj}
            className="tracking-tight sm:text-[18px] font-[600]  line-clamp-2 text-wrap min-w-0 text-[#0073C6] cursor-pointer"
          >
            {cardData.projName}
          </Link>
          <div className="text-xs font-semibold  ">
            <span className="text-[#242424] text-[15px] font-[600]">
              Price Range:
            </span>{" "}
            {cardData?.minPrice != 0 &&
            cardData?.minPrice != "" &&
            cardData?.maxPrice != 0 &&
            cardData?.maxPrice != "" ? (
              <>
                <span className="text-[16px] sm:font-[700] text-[#0C5F0E]">
                  {formatCurrency(cardData.minPrice)}
                </span>{" "}
                -{" "}
                <span className="text-[16px] sm:font-[700] text-[#0C5F0E]">
                  {formatCurrency(cardData.maxPrice)}
                </span>
              </>
            ) : (
              <span className="text-[16px] sm:font-[700] text-[#0C5F0E]">
                Price Not Available
              </span>
            )}
          </div>
        </div>
      )}

      <div className="px-3 pb-3">
        {type != "proj" && (
          <p className="mb-[-30px] relative z-10 p-[2px] text-[#0C5F0E] text-[14px] font-[700] w-[40%] flex pl-[4px] justify-center items-center bg-gradient-to-r from-[#EFF5FF] /0 to-[#F2FAFF]/100 shadow-md rounded-[18px] border-[#92B2C8] border-[0.5px] border-solid ">
            {cardData.availablityStatus == "R"
              ? "Ready to move"
              : "Under Construction"}
          </p>
        )}

        <div className="relative  max-h-[300px]">
          <div className="mb-4 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] rounded-[5px] object-cover min-h-[212px] max-h-[300px] relative">
            <Link rel="noreferrer" prefetch={false} href={URLRedirectionProj}>
              <Image
                src={
                  type === "proj"
                    ? cardData.coverUrl.split(",")[1]
                    : cardData.projMedia.coverImageUrl.split(",")[1]
                }
                alt={cardData.projName ? `${cardData.projName}` : "card"}
                title={cardData.projName ? `${cardData.projName}` : "card"}
                className="w-full"
                // width={300}
                // height={212}
                unoptimized
                fill
              />
            </Link>
          </div>

          {type == "proj" &&
            (cardData.rerastatus === "Recieved" ||
              cardData.rerastatus === "Applied") && (
              <p className="absolute top-[1px] left-[0.8px]">
                <Image src={"/r.svg"} alt="rera" title="rera" width={100} height={100}   />
              </p>
            )}

          <div className=" right-2 absolute ">
            <button
            aria-label={cardData.shortListed ? "Shortlisted" : "Shortlist"} 
            name={cardData.shortListed ? "Shortlisted" : "Shortlist"} 
            title={cardData.shortListed ? "Shortlisted" : "Shortlist"}
              className={clsx(
                "mt-[-30px] rounded-[10px] relative bottom-[35px] z-10 p-[8px]  text-[12px] sm:text-[18px] font-[700] flex pl-[4px] justify-center items-center ",
                cardData.shortListed === "Y"
                  ? "bg-[rgb(231,245,255)] text-[#0C5F0E] text-2xl not-italic font-semibold leading-[normal] tracking-[0.96px]"
                  : "bg-gradient-to-r from-[#EFF5FF] /0 to-[#F2FAFF]/100 text-[#0073C6]"
              )}
              onClick={(e) => {
                onAddingShortList(e, cardData.projIdEnc);
              }}
            >
              {cardData.shortListed === "Y" ? Shorlisted : shortlistIconSvg}
              {cardData.shortListed === "Y" ? "Shortlisted" : "Shortlist"}
            </button>
          </div>
        </div>

        <div className="text-sm">
          {type != "proj" && (
            <p className="text-[18px] font-[600] text-[#303030] mb-[8px] ">
              {cardData.bhkName} {cardData.propTypeName} for{" "}
              {cardData.cg === "R" ? "Rent" : "Sale"} in {cardData.ltName},{" "}
              <br />
              <span className="text-[18px] font-[700] text-[#0C5F0E] ">
                {" "}
                {formatCurrency(cardData.price)}
              </span>{" "}
            </p>
          )}

          {type == "proj" && (
            <p className="mb-[6px] text-[#565D70] text-[14px] sm:text-sm xl:text-base not-italic font-semibold leading-[normal]">
              Start - End Date:
              <span className="ml-[4px] text-[#001F35] text-[14px] sm:text-sm xl:text-base not-italic font-semibold leading-[normal]">
                {formatDate(cardData.launchDate)} -{" "}
                {formatDate(cardData.possassionDate)}
              </span>
            </p>
          )}

          {cardData.propTypes ? (
            <p className="mb-[6px] text-[#242424] text-[14px] sm:text-sm xl:text-base not-italic font-semibold leading-[normal] tracking-[0.56px]">
              {cardData.propTypes.map((item: any) => item.trim()).join(", ")}
            </p>
          ) : (
            "No Property added yet"
          )}

          {type != "proj" && (
            <p className="text-[16px] mb-[6px] font-[600] text-[#4D6677]">
              Available From: {formatDate(cardData.availableFrom)}
            </p>
          )}

          {true && (
            <p className="text-[#242424]  text-[14px] xl:text-base not-italic font-semibold leading-[normal] mt-[4px] mb-[4px]">
              Builder:{" "}
              <Link
                prefetch={false}
                href={URLToBuilder}
                rel="noreferrer"
                className="text-btnPrimary  text-[14px] xl:text-base font-bold leading-[normal] underline"
              >
                {cardData.builderName}
              </Link>
            </p>
          )}
          <p className="text-[#565D70]  not-italic font-semibold leading-[normal] tracking-[0.56px] capitalize text-[14px] xl:text-[15px]">
            {type === "proj" &&
              `${cardData.locality}, ${cardData?.city}, ${cardData.pincode} `}

            {type === "prop " &&
              `${cardData.ltName}   
                ${cardData.ctName} 
                ${cardData.stateName ?? ""} 
                ${cardData.pinCode}`}
          </p>
          {type === "proj" && (
            <div className="inline-flex items-start gap-2 p-2 shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] rounded-[10px] cardBg mt-[8px] xl:mt-[16px]">
              <span className="text-black text-right text-[14px] xl:text-base not-italic font-medium leading-[normal]">
                Project Status:{" "}
              </span>
              <span className="text-[#0C5F0E] text-[14px] xl:text-base not-italic font-bold leading-[normal]">
                {cardData.projectStatusName}
              </span>
            </div>
          )}
          {type != "proj" && (
            <p className="text-[16px] font-[500] text-[#4D6677]">
              Posted by {cardData.postedByType === "B" ? "Builder" : "Agent"}
            </p>
          )}
          <Button
            title="Request  Callback"
            buttonClass=" text-[#FFF] mt-[12px] text-[12px]  sm:text-[14px] xl:text-[18px] font-[600] bg-[#0073C6] rounded-[5px] shadow-md whitespace-nowrap flex items-center p-[10px]  "
            onChange={handleReqCall}
          />
        </div>
      </div>
    </div>
    /*  </ProjectLink> */
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
  id,
  builderLinkActive,
  // builderName,
  url,
}: Props) => {
  return (
    data?.length > 0 && (
      <div
        className="w-[95%] sm:w-[90%] mx-auto mb-[5%] sm:mb-0 sm:pb-screen-spacing scroll-mt-[180px]"
        {...(id && { id })}
      >
        <div className=" px-3 sm:mx-auto sm:px-0">
          <h2 className="sm:text-[22px] xl:text-[28px] font-bold mb-[4px] sm:mb-[10px] xl:mb-[12px] capitalize">
            <strong>
              {/* <span className="!text-green-600">SARANG BY SUMADHARA </span> */}
              <span className="text-[#001F35]">{title}{" "}</span>
              <span className="text-green-800">{projName}</span>
            </strong>
          </h2>
          <p className="text-[13px]  sm:text-[16px] xl:text-2xl  text-[#344273]  italic font-semibold leading-[normal] sm:mt-4">
            {content}
          </p>
        </div>
        <NewCarousel
          data={data}
          type={type}
          renderItem={(project: any) => (
            <ProjectCard
              key={`proj_${project?.projIdEnc}`}
              type={type}
              cardData={project}
              mutate={mutate}
              ct={ct ?? "builder"}
              id={id}
              builderLinkActive={builderLinkActive}
            />
          )}
          slidesToShow={4}
          gap={10}
          // url={`/search?builderIds=${"builderName"}${"builderId"}`}
          url={url}
        />
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
