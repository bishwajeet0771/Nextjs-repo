"use client";
import useRatings from "@/app/hooks/useRatings";
import { RatingStar } from "@/app/images/commonSvgs";
import React from "react";

export default function Ratings({ slug }: { slug: string }) {
  const { data, isLoading } = useRatings(slug);
  return (
    <p className=" sm:text-[20px] Montserrat flex justify-start items-start xl:text-[24px] text-[#242424] font-[700] whitespace-nowrap mt-3">
      {isLoading
        ? "..."
        : `${
            data?.reviewOverviewData?.averageRating
              ? `${data?.reviewOverviewData?.averageRating}`
              : "No"
          }` ?? "No"}{" "}
      Ratings
      <RatingStar
        fill="#FFD600"
        className="h-[24px] w-[24px] sm:h-[32px] sm:w-[32px]"
      />
    </p>
  );
}
