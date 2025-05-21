import React from "react";
// import HomeSearch from "./home-search";
import HomeFeatures from "./features";
import DynamicListing from "./Listing";
import NewAddedProjects from "./newly-added-projects";
import TopLocalities from "./top-localities";
import ListbySection from "./ListedBy";
import PostYourListing from "./post-your-listing";
// import Footer from "@/app/components/layouts/primary/footer";
import LoginPopup from "@/app/components/project/modals/LoginPop";
import BlogsSection from "./blogs";
import SharePopup from "@/app/components/atoms/SharePopup";
import Req from "./Req";
import HandPickedProjects from "./hand-picked-projects";
type Props = {
  shortIds: any;
  data: any;
  listingData: any;
  cityData: {
    cityName: string;
    cityId: string;
  };
  localityData?: {
    localityName: string;
    localityId: string;
  };
};
export default function HomagePageIndex({
  data,
  listingData,
  shortIds,
  cityData,
}: Props) {
  return (
    <div className="h-[100%] w-[100%] flex  flex-col overflow-hidden bg-[#F5F7F8]">
      {/* <HomeSearch count={shortIds?.total} cityData={cityData} /> */}
      <HomeFeatures />
      <NewAddedProjects data={data.featured} shortIds={shortIds} />
      <DynamicListing
        title="Ready to Move Sale Listings"
        content="Move In Today: Your Dream Home Awaits – Explore Our Ready-to-Move Listings Now!"
        data={listingData["r_Sale"]}
        shortIds={shortIds}
        dataKey="r_Sale"
        cityId={cityData.cityId}
      />
      <TopLocalities />
      <DynamicListing
        title="Ready to Move Rent Listings"
        content="Find Your Perfect Home, Ready to Move In - Rent Today!"
        data={listingData["r_Rent"]}
        shortIds={shortIds}
        dataKey="r_Rent"
        cityId={cityData.cityId}
      />
      <DynamicListing
        title="Featured Plot Listings"
        content="Browse Top Listings and Find Your Perfect Plot Today!"
        data={listingData["p"]}
        shortIds={shortIds}
        dataKey="p"
        cityId={cityData.cityId}
      />
      <DynamicListing
        title="Under Construction Sale Listings"
        content="Explore Our Under Construction Listings Today!"
        data={listingData["u_Sale"]}
        shortIds={shortIds}
        dataKey="u_Sale"
        cityId={cityData.cityId}
      />
      <HandPickedProjects data={data} shortIds={shortIds} />
      <DynamicListing
        title="Under Construction Rent Listings"
        content="Discover New Developments and Under Construction Rent Listings!"
        data={listingData["u_Rent"]}
        shortIds={shortIds}
        dataKey="u_Rent"
        cityId={cityData.cityId}
      />
      <DynamicListing
        title="Independent Sale Listings"
        content="Your Gateway to Independent Living - Browse and Buy with Confidence"
        data={listingData["i_Sale"]}
        shortIds={shortIds}
        dataKey="i_Sale"
        cityId={cityData.cityId}
      />{" "}
      <ListbySection />
      <DynamicListing
        title="Independent Rent Listings"
        content="Discover Your Ideal Rental: Independent Listings, Endless Options."
        data={listingData["i_Rent"]}
        shortIds={shortIds}
        dataKey="i_Rent"
        cityId={cityData.cityId}
      />
      <PostYourListing />
      <BlogsSection />
      <LoginPopup />
      <SharePopup />
      <Req />
    </div>
  );
}
