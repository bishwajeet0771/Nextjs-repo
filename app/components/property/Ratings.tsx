"use client";
import usePropRatings from "@/app/hooks/property/useRating";
import { RatingStar } from "@/app/images/commonSvgs";
import React from "react";

export default function Ratings({ slug }: { slug: string }) {
  const { data, isLoading } = usePropRatings({ slug: slug });
  return (
    slug && (
      <p className="text-[20px] flex justify-start items-start lg:text-[24px] text-[#4D6677] font-[700] whitespace-nowrap">
        {isLoading
          ? "..."
          : `${data?.rating ? `${data?.rating}.0` : "No"}` ?? "No"}{" "}
        Ratings
        <RatingStar fill="#FFD600" className="h-[32px] w-[32px]" />
      </p>
    )
  );
}
