"use client";
import React from "react";
import NewAddedProjects from "./newly-added-projects";
import DynamicListing from "./Listing";
import TopLocalities from "./top-localities";
import HandPickedProjects from "./hand-picked-projects";
import ListbySection from "./ListedBy";
import PostYourListing from "./post-your-listing";
import BlogsSection from "./blogs";
import Req from "./Req";
// import SharePopup from "../../searchOldPage/components/SharePopup";
import LoginPopup from "@/app/components/project/modals/LoginPop";
import CompareShortListCount from "./home-search/CompareShortListCount";
import { useQuery } from "react-query";
import { useSession } from "next-auth/react";
type Props = {
  data: any;
  listingData: any;
  //   shortIds: any;
  cityData: any;
};

export default function MiddleSection({
  data,
  listingData,
  //   shortIds,
  cityData,
}: Props) {
  const { data: session } = useSession();
  const { data: shortIds, isLoading } = useQuery({
    queryKey: ["shortIds"],
    queryFn: () => getClientShortIds(session),
    enabled: !!session,
  });

  return isLoading ? null : (
    <>
      {shortIds?.total ? (
        <CompareShortListCount initialValue={shortIds} />
      ) : null}{" "}
      <NewAddedProjects
        data={data.featured}
        shortIds={shortIds}
        cityId={cityData?.data?.cityId}
      />
      <DynamicListing
        title="Ready to Move Sale Listings"
        content="Move In Today: Your Dream Home Awaits – Explore Our Ready-to-Move Listings Now!"
        data={listingData["r_Sale"]}
        shortIds={shortIds}
        cityId={cityData?.data?.cityId}
        dataKey="r_Sale"
      />
      <TopLocalities />
      <DynamicListing
        title="Ready to Move Rent Listings"
        content="Find Your Perfect Home, Ready to Move In - Rent Today!"
        data={listingData["r_Rent"]}
        shortIds={shortIds}
        cityId={cityData?.data?.cityId}
        dataKey="r_Rent"
      />
      <DynamicListing
        title="Featured Plot Listings"
        content="Browse Top Listings and Find Your Perfect Plot Today!"
        data={listingData["p"]}
        shortIds={shortIds}
        cityId={cityData?.data?.cityId}
        dataKey="p"
      />
      <DynamicListing
        title="Under Construction Sale Listings"
        content="Explore Our Under Construction Listings Today!"
        data={listingData["u_Sale"]}
        shortIds={shortIds}
        cityId={cityData?.data?.cityId}
        dataKey="u_Sale"
      />
      <HandPickedProjects
        data={data}
        shortIds={shortIds}
        cityId={cityData?.data?.cityId}
      />
      <DynamicListing
        title="Under Construction Rent Listings"
        content="Discover New Developments and Under Construction Rent Listings!"
        data={listingData["u_Rent"]}
        shortIds={shortIds}
        cityId={cityData?.data?.cityId}
        dataKey="u_Rent"
      />
      <DynamicListing
        title="Independent Sale Listings"
        content="Your Gateway to Independent Living - Browse and Buy with Confidence"
        data={listingData["i_Sale"]}
        shortIds={shortIds}
        cityId={cityData?.data?.cityId}
        dataKey="i_Sale"
      />{" "}
      <ListbySection />
      <DynamicListing
        title="Independent Rent Listings"
        content="Discover Your Ideal Rental: Independent Listings, Endless Options."
        data={listingData["i_Rent"]}
        shortIds={shortIds}
        cityId={cityData?.data?.cityId}
        dataKey="i_Rent"
      />
      <PostYourListing />
      <BlogsSection />
      <LoginPopup />
      <Req />
    </>
  );
}
const getClientShortIds = async (session: any) => {
  if (session) {
    try {
      if (process.env.NODE_ENV === "development") {
        return {
          total: 8,
          projIds: [
            "9ea8cf3c5e833a71663f440d450f942f",
            "9891b38e10299b88cef791a58bc03af8",
            "4e4920af760dd82499ef7f855cbba69f",
          ],
          propIds: [
            "68da26ae16f44473a3e7710febcf6f03",
            "493516e7f29fa40dbe483c79fd3591b6",
            "881a9dfc336469ae1bc8f2f6d5af1266",
            "f38e3fde9948b9dfa85a578c80dd663b",
            "2d320b68173ffd4516aad7b2d95001d7",
          ],
        };
      } else {
        let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-actions/shortlist/ids`;
        let data = await fetch(url, {
          headers: {
            // @ts-ignore
            Authorization: `${session?.user?.token as any}`,
          },
        });

        return await data.json();
      }
    } catch (error: any) {
      return {
        total: 0,
        propIds: [],
        projIds: [],
      };
    }
  }
};
