// import React from "react";
// import Header from "./components/header";
// import HomeSearch from "./components/home-search";
// import HomeFeatures from "./components/features";
// import NewAddedProjects from "./components/newly-added-projects";
// import DynamicListing from "./components/Listing";
// import TopLocalities from "./components/top-localities";
// import PostYourListing from "./components/post-your-listing";
// import ListbySection from "./components/ListedBy";
// import HandPickedProjects from "./components/hand-picked-projects";
// import BlogsSection from "./components/blogs";
// import Footer from "./components/Footer";
// import { getData, getHomeListingData } from "./api";
// import SharePopup from "../search/components/SharePopup";
// import Req from "./components/Req";
// import LoginPopup from "@/app/components/project/modals/LoginPop";
// export default async function Page() {
//   const [data, listingData] = await Promise.all([
//     getData(),
//     getHomeListingData(),
//   ]);
//   return (
//     <div className="h-[100%] w-[100%] flex  flex-col overflow-hidden bg-[#F5F7F8]">
//       {/* <Header />
//       <HomeSearch />
//       <HomeFeatures />
//       <NewAddedProjects data={data.featured} />
//       <DynamicListing
//         title="Ready to Move Sell Listings"
//         content="Move In Today: Your Dream Home Awaits – Explore Our Ready-to-Move Listings Now!"
//         data={listingData["r_Sale"]}
//       />
//       <TopLocalities />
//       <DynamicListing
//         title="Ready to Move Rent Listings"
//         content="Move In Today: Your Dream Home Awaits – Explore Our Ready-to-Move Listings Now!"
//         data={listingData["r_Rent"]}
//       />
//       <DynamicListing
//         title="Featured Plot Listings"
//         content="Browse Top Listings and Find Your Perfect Plot Today!"
//         data={listingData["p"]}
//       />
//       <DynamicListing
//         title="Under Construction Sell Listings"
//         content="Explore Our Under Construction Listings Today!"
//         data={listingData["u_Sale"]}
//       />
//       <HandPickedProjects data={data} />
//       <DynamicListing
//         title="Under Construction Rent Listings"
//         content="Discover New Developments and Under Construction Rent Listings!"
//         data={listingData["u_Rent"]}
//       />
//       <DynamicListing
//         title="Independent Sell Listing"
//         content="Your Gateway to Independent Living - Browse and Buy with Confidence"
//         data={listingData["i_Sale"]}
//       />{" "}
//       <ListbySection />
//       <DynamicListing
//         title="Independent Rent Listing"
//         content="Discover Your Ideal Rental: Independent Listings, Endless Options."
//         data={listingData["i_Rent"]}
//       />
//       <PostYourListing />
//       <BlogsSection />
//       <Footer />
//       <LoginPopup />
//       <SharePopup />
//       <Req /> */}
//     </div>
//   );
// }

import React from "react";

type Props = {};

export default function Page({}: Props) {
  return <div>Page</div>;
}
