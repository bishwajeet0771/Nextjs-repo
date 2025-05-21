"use client";
import React from "react";
import { Carousel } from "@mantine/carousel";
import S from "@/app/styles/home/Carousel.module.css";
import "@mantine/carousel/styles.css";
import {
  ImagesScrollIcon,
  Phone,
  Shorlisted,
  shortlistIconSvg,
} from "@/app/images/commonSvgs";
import { useMediaQuery } from "@mantine/hooks";
import useCarouselData from "@/app/hooks/useCarouselData";
import {
  formatDate,
  // formatDateDDMMYYYY
} from "@/app/utils/date";
// import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import { useSession } from "next-auth/react";
import { useShortlistAndCompare } from "@/app/hooks/storage";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import clsx from "clsx";
import { formatCurrency } from "@/app/utils/numbers";
import Image from "next/image";
import Button from "@/app/elements/button";
import { Project } from "@/app/types/home";
import Link from "next/link";
const HomeCarousel = () => {
  const isMobile = useMediaQuery(`(max-width: 750px)`);
  const { data } = useCarouselData(1);

  return (
    <Carousel
      mt={60}
      height={"auto"}
      slideSize={{ base: "100%", sm: "50%", md: "30.333333%" }}
      slideGap={{ base: 0, sm: "40px" }}
      align={isMobile ? "center" : "start"}
      classNames={{ controls: S.controls, root: S.root, control: S.control }}
      nextControlIcon={
        <ImagesScrollIcon className="bg-[#c6ddf0] rounded-xl " />
      }
      previousControlIcon={
        <ImagesScrollIcon className="bg-[#c6ddf0]  rounded-xl transform rotate-180" />
      }
      px={10}
    >
      {data?.project?.map((post) => (
        <Carousel.Slide key={post.projName}>
          <ProjectCard type="proj" cardData={post} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default HomeCarousel;

type CardProps = {
  type: string;
  projName?: string;
  cardData?: Project;
};

export function ProjectCard({ type, cardData }: CardProps) {
  // const [, { open }] = useReqCallPopup();
  const { data: session } = useSession();
  const { toggleShortlist, shortlistedItems } = useShortlistAndCompare();
  const [, { open: openS }] = usePopShortList();
  const reqId = "324324";
  const isItemInShortlist =
    shortlistedItems.length > 0 &&
    shortlistedItems.some((item) => item.id === reqId && item.status === "Y");

  const onAddingShortList = () => {
    if (session) {
      toggleShortlist({
        id: reqId,
        status: isItemInShortlist ? "N" : "Y",
        source: "proj",
      });
    } else {
      openS();
    }
  };
  const link =
    type === "proj" || type == null
      ? `/abc/karnataka/banglore/${reqId}`
      : `/listing/banglore/${reqId}`;

  return (
    <Link
      prefetch={false}
      rel="noopener noreferrer"
      href={link}
      key={reqId}
      className={clsx(
        "border text-card-foreground min-w-[350px]   min-h-[400px] overflow-hidden  shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] rounded-[14px]",
        type == "proj" ? "bg-[#FAFAFA] " : "bg-[#FFFEFE] pt-4"
      )}
    >
      {type == "proj" && (
        <div className=" space-y-1.5 p-6  px-4 pt-2 pb-3 justify-between items-center">
          <Link
            prefetch={false}
            rel="noopener noreferrer"
            className="tracking-tight text-[18px] font-[600] text-wrap text-[#565D70] cursor-pointer"
            href={link}
          >
            {cardData?.projName}
          </Link>
          <div className="text-xs font-semibold  ">
            <span className="text-[16px] font-[700] text-[#148B16]">
              {formatCurrency(32423)}
            </span>{" "}
            -{" "}
            <span className="text-[16px] font-[700] text-[#148B16]">
              {formatCurrency(32432324)}
            </span>
          </div>
        </div>
      )}

      <div className="px-3 pb-3">
        {type != "proj" && (
          <p className="mb-[-30px] relative z-10 p-[2px] text-[#148B16] text-[14px] font-[700] w-[40%] flex pl-[4px] justify-center items-center bg-gradient-to-r from-[#EFF5FF] /0 to-[#F2FAFF]/100 shadow-md rounded-[18px] border-[#92B2C8] border-[0.5px] border-solid ">
            Ready to move
          </p>
        )}
        <div className="relative  max-h-[212px] min-h-[212px] overflow-hidden">
          <Image
            src={cardData?.projectMediaDTO?.coverUrl ?? ""}
            alt="Sobha Dream Acres"
            className="w-full  mb-4 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] rounded-[5px] max-h-[212px] min-h-[212px]"
            width={300}
            height={212}
          />
          {type == "proj" && (
            <p className="absolute top-[1px] left-[0.8px]">
              <Image src={"/r.svg"} alt="rera" width={100} height={100} />
            </p>
          )}

          <div className=" right-2 absolute ">
            <button
              className="mt-[-30px] rounded-[10px] relative bottom-[35px] z-10 p-[8px] text-[#0073C6] text-[18px] font-[700] flex pl-[4px] justify-center items-center bg-gradient-to-r from-[#EFF5FF] /0 to-[#F2FAFF]/100"
              onClick={() => onAddingShortList()}
            >
              <span className=" w-[24px] h-[24px] ">
                {isItemInShortlist ? Shorlisted : shortlistIconSvg}
              </span>
              {isItemInShortlist ? "Shortlisted" : "Shortlist"}
            </button>
          </div>
        </div>

        <div className="text-sm mt-2">
          {type == "proj" && (
            <p className="mb-[6px] text-[#565D70] text-sm not-italic font-semibold leading-[normal] h-[36px]">
              Start - End Date:
              <span className="ml-[4px] text-[#001F35] text-sm not-italic font-semibold leading-[normal]">
                {formatDate(cardData?.possessionDateNew)} -{" "}
                {formatDate(cardData?.possessionDateNew)}
              </span>
            </p>
          )}

          {cardData?.propTypeList ? (
            <p className="mb-[6px] text-[#00487C] text-sm not-italic font-semibold leading-[normal] tracking-[0.56px]">
              {cardData.propTypeList.split(",").join(", ")}
            </p>
          ) : (
            "N/A"
          )}

          <p className="text-[#565D70]  not-italic font-semibold leading-[normal] tracking-[0.56px] h-[36px]">
            {type === "proj" && cardData?.cityName}
            {cardData?.localityName} {cardData?.address}
          </p>

          {type != "proj" && (
            <p className="text-[16px] font-[500] text-[#4D6677]">
              Posted by {"Builder"}
            </p>
          )}
          <Button
            icon={<Phone />}
            title="Request a Callback"
            buttonClass=" text-[#FFF] mt-[12px] text-[16px] font-[600] bg-[#0073C6] rounded-[5px] shadow-md whitespace-nowrap flex items-center p-[6px]  "
            // onChange={() => open(type, reqId, "projCard")}
          />
        </div>
      </div>
    </Link>
  );
}
