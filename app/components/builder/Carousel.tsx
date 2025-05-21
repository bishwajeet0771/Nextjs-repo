"use client";
import React from "react";
// import MainCarousel from "../molecules/carousel/main";
// import { Carousel, CarouselSlide } from "@mantine/carousel";
import Image from "next/image";
import Button from "../../elements/button";
import { Shorlisted, shortlistIconSvg } from "@/app/images/commonSvgs";
import { formatCurrency } from "@/app/utils/numbers";
import { useSession } from "next-auth/react";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import { useShortlistAndCompare } from "@/app/hooks/storage";
// import LoginPopup from "../project/modals/LoginPop";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
// import { useSetAtom } from "jotai";
// import { NearByDataAtom } from "@/app/store/nearby";
import clsx from "clsx";
import axios from "axios";
import { useQuery } from "react-query";
import NewCarousel from "@/app/test/components/NewCarousel";
import { createProjectLinkUrl } from "@/app/utils/linkRouters/ProjectLink";

type Props = {
  type: string;
  title: string;
  projName?: string;
  content: string;
  data?: any;
  location?: string;
  id?: string;
  builderName: string;
};

type CardProps = {
  type: string;
  projName?: string;
  cardData?: any;
  refetch?: () => Promise<any>;
};

export function ProjectCard({ type, cardData, refetch }: CardProps) {
  const [, { open }] = useReqCallPopup();
  const { data: session } = useSession();
  const [isShorlited, setShorlited] = React.useState(cardData.shortListed);
  const { toggleShortlist } = useShortlistAndCompare();
  const [, { open: openShort }] = usePopShortList();
  const isItemInShortlist = isShorlited === "Y";

  const onAddingShortList = async () => {
    if (session) {
      const status = isItemInShortlist ? "N" : "Y";
      const data = await toggleShortlist({
        id: cardData.projIdEnc,
        status,
      });
      if (data?.status) {
        setShorlited(status);
      }
    } else {
      openShort(
        () => refetch && refetch().then(() => setShorlited(!isShorlited))
      );
    }
  };
  const handleReqCallbackOpen = (e: any) => {
    e.stopPropagation();
    open({
      modal_type: "PROJECT_REQ_CALLBACK",
      postedByName: cardData.postedByName,
      postedId: cardData.builderId,
      reqId: cardData.projIdEnc,
      source: "projCard",
      title: cardData.projectName,
    });
  };
  const handleCardClick = () => {
    // console.log(cardData);
    const url = createProjectLinkUrl({
      city: cardData.cityName,
      slug: cardData.projectName,
      locality: cardData.localityName,
      projIdEnc: cardData.projIdEnc,
    });
    window.open(url, "_self", "noreferrer");
    // window.open(`/abc/karnataka/banglore/${cardData.projIdEnc}`, "_self");
  };

  // console.log(isItemInShortlist);

  return (
    <div
      key={cardData.projIdEnc}
      onClick={handleCardClick}
      className="border w-[90%] text-card-foreground min-w-[300px] xl:max-w-[494px] bg-[#FAFAFA]  min-h-[500px] overflow-hidden  shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] rounded-[14px] "
    >
      {type == "proj" && (
        <div className="sm:flex sm:space-y-1.5 p-6  px-4 pt-2 pb-3 justify-between items-center">
          <div className="tracking-tight sm:text-[18px] font-[600] text-[#565D70] cursor-pointer">
            {cardData.projectName}
          </div>
          <div className="text-xs font-semibold sm:text-right ">
            <span className="text-[16px] font-[700] text-[#148B16]">
              {formatCurrency(cardData.minPrice)}
            </span>{" "}
            -{" "}
            <span className="text-[16px] font-[700] text-[#148B16]">
              {formatCurrency(cardData.maxPrice)}
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
        <div className="relative  max-h-[212px]">
          <Image
            src={cardData?.media?.coverImageUrl}
            alt="Sobha Dream Acres"
            className="w-full  mb-4 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] object-cover min-h-[212px] rounded-[5px] max-h-[212px]"
            width={300}
            height={212}
          />
          {type == "proj" &&
            (cardData.reraStatus === "Recieved" ||
              cardData.reraStatus === "Applied") && (
              <p className="absolute top-[1px] left-[0.8px]">
                <Image src={"/r.svg"} alt="rera" width={100} height={100} />
              </p>
            )}

          <div className=" right-2 absolute ">
            <button
            aria-label={isItemInShortlist ? "Shortlisted" : "Shortlist"} 
            name={isItemInShortlist ? "Shortlisted" : "Shortlist"} 
            title={isItemInShortlist ? "Shortlisted" : "Shortlist"}
              className={clsx(
                "mt-[-30px] rounded-[10px] relative bottom-[35px] z-10 p-[8px]  text-[12px] sm:text-[18px] font-[700] flex pl-[4px] justify-center items-center ",
                isItemInShortlist
                  ? "bg-[rgb(231,245,255)] text-[#148B16] text-2xl not-italic font-semibold leading-[normal] tracking-[0.96px]"
                  : "bg-gradient-to-r from-[#EFF5FF] /0 to-[#F2FAFF]/100 text-[#0073C6]"
              )}
              onClick={(e) => {
                e.stopPropagation();
                onAddingShortList();
              }}
            >
              {isItemInShortlist ? Shorlisted : shortlistIconSvg}
              {isItemInShortlist ? "Shortlisted" : "Shortlist"}
            </button>
          </div>
        </div>

        <div className="text-sm">
          {type != "proj" && (
            <p className="text-[18px] font-[600] text-[#303030] mb-[8px] ">
              3BHK Villa for Sale in {cardData.cityName},{" "}
              <span className="text-[18px] font-[700] text-[#148B16] ">
                {" "}
                Rs 3.2 Lakh
              </span>{" "}
            </p>
          )}

          {type == "proj" && (
            <p className="mb-[6px] text-[#565D70] text-[13px] xl:text-base not-italic font-semibold leading-[normal]">
              Start - End Date:
              <span className="ml-[4px] text-[#001F35] text-[13px] xl:text-base not-italic font-semibold leading-[normal]">
                {formatDate(cardData.startDate)} -{" "}
                {formatDate(cardData.endDate)}
              </span>
            </p>
          )}

          {cardData.availableProperties ? (
            <p className="mb-[6px] text-[#00487C] text-sm not-italic font-semibold leading-[normal] tracking-[0.56px]">
              {cardData.availableProperties
                .map((eachCity: string) => eachCity.trim())
                .join(", ")}
            </p>
          ) : (
            <p className="mb-[6px] text-[#00487C] text-sm not-italic font-semibold leading-[normal] tracking-[0.56px]">
              N/A
            </p>
          )}

          {type != "proj" && (
            <p className="text-[16px] mb-[6px] font-[600] text-[#4D6677]">
              Available From: 12/ 02/ 2023
            </p>
          )}

          <p className="text-[#565D70] text-[12.5px] xl:text-[15px] not-italic font-semibold leading-[normal] tracking-[0.56px] sm:mb-2">
            {`${cardData.localityName}, 
              ${cardData.cityName} ,
              ${cardData.state ?? ""} ,
              ${cardData.pinCode}`}
          </p>

          {type === "proj" && (
            <div className="inline-flex items-start gap-2 p-1 sm:p-2 shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] rounded-[10px] cardBg mt-[8px] xl:mt-[16px] border border-sky-200">
              <span className="text-black text-right text-[14px] xl:text-base not-italic font-medium leading-[normal]">
                Project Status:{" "}
              </span>
              <span className="text-[#148B16] text-[14px] xl:text-base not-italic font-bold leading-[normal]">
                {cardData.projectStatus}
              </span>
            </div>
          )}
          {type != "proj" && (
            <p className="text-[16px] font-[500] text-[#4D6677]">
              Posted by Agent
            </p>
          )}
          <Button
            title="Request  Callback"
            buttonClass=" text-[#FFF] mt-[8px] text-[12px] sm:text-[14px] xl:text-[18px] font-[600] bg-[#0073C6] rounded-[5px] shadow-md whitespace-nowrap flex items-center p-1.5 sm:p-[10px]  "
            onChange={handleReqCallbackOpen}
          />
        </div>
      </div>
    </div>
  );
}

const BuilderCarousel = ({
  type,
  content,
  title,
  projName,
  // location,
  id,
  builderName,
}: Props) => {
  const getBuilderProjects = async () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/v1/builder-details-project?builderId=${id}`;
    const data = await axios.post(url);
    return data.data.projectBuilder;
  };
  const { data, isLoading, refetch } = useQuery({
    queryFn: getBuilderProjects,
    queryKey: ["getBuilderProjects" + id],
  });
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (!data || data?.length == 0) {
    return;
  }
  return (
    <div className="w-full mb-[4%]">
      <h2 className="ml-0 md:ml-2 text-[16px] sm:text-[20px] xl:text-[32px] font-semibold px-4 sm:px-0">
        {/* <span className="!text-green-600">SARANG BY SUMADHARA </span> */}
        {title}
        By <span className="text-[#148B16] font-[700]  ">{projName}</span>
      </h2>
      <p className="ml-0 md:ml-2 mt-3 mb-0 sm:mb-[24px]  text-[#4D6677] text-[13px] sm:text-lg xl:text-2xl italic font-medium leading-[normal] tracking-[0.96px] px-4 sm:px-0">
        {content}
      </p>
      <NewCarousel
        data={data}
        type="proj"
        renderItem={(item: any) => (
          <ProjectCard
            type={type}
            cardData={{ ...item, postedByName: builderName }}
            refetch={refetch}
          />
        )}
        slidesToShow={4}
        gap={10}
        url="/search"
      />
      {/* <MainCarousel
        paddings={{
          desktop: 10,
          mobile: 10,
          tab: 10,
        }}
      >
        {data &&
          data?.map((project: any, index: number) => {
            return (
              <CarouselSlide key={`builder${project.name}`} className="!h-[520px] sm:!h-[500px]">
                <ProjectCard type={type} cardData={project} refetch={refetch} />
              </CarouselSlide>
            );
          })}
      </MainCarousel> */}
    </div>
  );
};

export default BuilderCarousel;
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
