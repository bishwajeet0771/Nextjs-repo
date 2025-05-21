"use client";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import React from "react";
import {
  NextCarouselButton,
  PrevCarouselButton,
  quotesIcon,
} from "@/app/images/commonSvgs";
import { Rating, em } from "@mantine/core";
import useRatings from "@/app/hooks/useRatings";
import { useMediaQuery } from "@mantine/hooks";
import { usePopUpRatings } from "@/app/hooks/popups/usePopUpRatings";
import S from "@/app/styles/Rating.module.css";
import useDynamicProj from "@/app/hooks/project/useDynamic";
export default function Reviews({
  projName,
  projIdEnc,
}: {
  projName: string;
  projIdEnc: string;
}) {
  const [, { open }] = usePopUpRatings();
  const { data } = useRatings(projIdEnc);
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const { data: rData } = useDynamicProj(projIdEnc);
  return (
    data?.status &&
    data?.reviewDataList?.filter((item: any) => item.userReview).length !==
      0 && (
      <div id="ratings" className="bg-[#FFF] scroll-mt-[180px] pt-12 w-full ">
        <div className="">
          <div className="w-[90%] mx-auto ">
            <h2 className="text-[#001F35] text-[20px] md:text-[32px] not-italic font-semibold leading-[normal] ">
              Customer Reviews For{" "}
              <span className="text-[#148B16]  not-italic font-bold leading-[normal] capitalize">
                {projName}
              </span>
            </h2>
            <p className="text-[#4D6677] text-[16px] md:text-2xl italic font-medium leading-[normal] tracking-[0.96px] mt-2 mb-5">
              Find helpful customer reviews and review ratings for {projName}
            </p>
            {rData?.userReview && (
              <div className="w-full flex justify-end mb-[20px]">
                <button
                  className="text-[#0073C6] text-xl not-italic font-bold leading-[normal] tracking-[0.8px] underline "
                  onClick={open}
                >
                  Add Review
                </button>
              </div>
            )}
          </div>
          <div className="relative w-[96%] mx-auto px-6">
            <Carousel
              nextControlIcon={<NextCarouselButton />}
              previousControlIcon={<PrevCarouselButton />}
              slideGap={"md"}
              align="start"
              slideSize={{ base: "95%", sm: "50%", md: "33.333333%" }}
              withIndicators
              height={isMobile ? 300 : 250}
              slidesToScroll={1}
              px={isMobile ? 0 : 30}
              classNames={{
                controls: S.controls,
                root: S.Ccontrols,
              }}
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
              withControls={isMobile ? true : data?.reviewDataList.length > 3}
            >
              {data?.reviewDataList
                ?.filter((item: any) => item.userReview).map((eachData: any) => (
                  <Carousel.Slide key={"review__" + eachData.userName} miw={isMobile ? "95%" : 487}>
                    <Review {...eachData} />
                  </Carousel.Slide>
                ))}
            </Carousel>
          </div>
        </div>
      </div>
    )
  );
}

const Review = ({ userRating, userName, userReview, postedDays }: any) => {
  return (
    <div className="shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] md:max-w-lg mx-auto mt-[20px] bg-[#fff] p-4 relative   min-h-[220px] border rounded-[10px] border-solid border-[#DCE6ED]">
      <span className=" absolute top-[-20px] !z-30  ">{quotesIcon}</span>
      <div className="flex items-center space-x-2 mt-8">
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-black text-lg not-italic font-medium leading-[normal]">
                {userName ?? "GRP USER"}
              </p>
              <p className="text-[#0073C6] text-base not-italic font-medium leading-[normal]">
                Grp User
              </p>
            </div>
            <div className="text-right">
              <Rating size={"sm"} value={userRating} readOnly />
              <span className="text-xs text-gray-500">
                {postedDays} days ago
              </span>
            </div>
          </div>
          <p className="mt-2 text-[#3E3E3E] text-base not-italic font-normal leading-[normal] tracking-[0.56px]">
            {userReview}
          </p>
        </div>
      </div>
    </div>
  );
};
