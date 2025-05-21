"use client";
import React from "react";
import MainHeading from "../heading";
// import ListingCarousel from "./Carousel";
import { useAtomValue } from "jotai";
import { homeSearchFiltersAtom } from "@/app/store/home";
import { useQuery } from "react-query";
import RTK_CONFIG from "@/app/config/rtk";
import { getHomeListingData } from "@/app/(new_routes_seo)/utils/new-seo-routes/llisting.api";

import ListingCarousel from "./Carousel";
// const ListingCarousel = dynamic(() => import("./Carousel"), {
//   ssr: false,
//   loading: () => <div>Loading...</div>,
// });
type Props = {
  title: string;
  content: string;
  data: any;
  shortIds: any;
  cityId?: string;
  dataKey: string;
};
export default function DynamicListing({
  content,
  title,
  data,
  shortIds,
  cityId,
  dataKey,
}: Props) {
  const globalState = useAtomValue(homeSearchFiltersAtom);
  const isEnabled =
    !!globalState.city && globalState.city?.split("+")[1] != cityId;
  const { data: listingData, isLoading } = useQuery({
    queryKey: ["home-page-listing-data" + globalState.city?.split("+")[1]],
    queryFn: () => getHomeListingData(globalState.city?.split("+")[1] ?? ""),
    enabled: isEnabled,
    ...RTK_CONFIG,
  });
  const url =
    title === "Featured Projects"
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/search`
      : title === "Ready to Move Sale Listings"
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/listing?sf=cg=s-propStatus=R`
      : title === "Ready to Move Rent Listings"
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/listing?sf=cg=R-propStatus=R`
      : title === "Featured Plot Listings"
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/listing?sf=propType=32`
      : title === "Under Construction Sale Listings"
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/listing?sf=propStatus=U`
      : title === "Under Construction Rent Listings"
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/listing?sf=propStatus=U-cg=R`
      : title === "Independent Sale Listings"
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/listing?sf=propType=36-cg=S`
      : title === "Independent Rent Listings"
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/listing?sf=propType=36-cg=R`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    (isEnabled ? listingData[dataKey]?.length : data?.length) > 0 && (
      <div className="mt-[40px] sm:mt-[60px] w-[95%] m-auto">
        <MainHeading title={title} content={content} url={url} />
        <ListingCarousel
          data={isEnabled ? listingData[dataKey] : data}
          shortIds={shortIds}
          dataKey={dataKey}
          url={url}
        />
      </div>
    )
  );
}
