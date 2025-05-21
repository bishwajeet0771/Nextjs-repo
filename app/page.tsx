import React from "react";

import { getData, getHomeListingData } from "./(dashboard)/new/api";
import HomeSearch from "./(dashboard)/new/components/home-search";
import HomeFeatures from "./(dashboard)/new/components/features";
import MiddleSection from "./(dashboard)/new/components/MiddleSection";

// const MiddleSection = dynamic(
//   () => import("./(dashboard)/new/components/MiddleSection"),
//   {
//     ssr: true,
//     loading: () => <div>Loading...</div>,
//   }
// );

// import dynamic from "next/dynamic";
import { HomeSiteNavigationSchema } from "./seo/common/home.schema";
import { Metadata } from "next";
// import Image from "next/image";

export default async function Page() {
  const cityData = {
    data: {
      city: "Bengaluru",
      cityId: "9",
    },
    status: true,
  };

  const [data, listingData] = await Promise.all([
    getData(cityData?.data?.cityId),
    getHomeListingData(cityData?.data?.cityId),
  ]);
  return (
    <div className="h-[100%] w-[100%] flex  flex-col overflow-hidden bg-[#F5F7F8]">
      <link rel="canonical" href={`${process.env.NEXT_PUBLIC_URL}/`} />
      <link rel="preload" as="image" href={"/home/home-search.svg"} />
      <HomeSiteNavigationSchema />
      <HomeSearch
        cityData={{
          cityId: cityData?.data?.cityId ?? "",
          cityName: cityData?.data?.city ?? "",
        }}
      />
      <HomeFeatures />
      <MiddleSection
        data={data}
        listingData={listingData}
        cityData={cityData}
      />
    </div>
  );
}
export const metadata: Metadata = {
  title: "Get Right Property - Buy, Sell & Rent Real Estate in India",
  description:
    "Find the best properties for sale and rent in India with Get Right Property. Explore verified listings for apartments, houses, commercial spaces, and new projects.",
  openGraph: {
    title: "Get Right Property - Your Trusted Real Estate Partner",
    description:
      "Search thousands of verified properties for sale and rent. Get the right property at the right price.",
    url: "https://www.getrightproperty.com",
    siteName: "Get Right Property",
    images: [
      {
        url: "https://media.getrightproperty.com/staticmedia-images-icons/grp-logo/grp-logo-tm.webp", // Replace with actual OG image URL
        width: 1200,
        height: 630,
        alt: "Get Right Property - Real Estate Platform",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Right Property - Real Estate Made Easy",
    description:
      "Explore verified listings for buying, selling, and renting properties in India with Get Right Property.",
    images: [
      "https://media.getrightproperty.com/staticmedia-images-icons/grp-logo/grp-logo-tm.webp",
    ], // Replace with actual image
  },
  metadataBase: new URL("https://www.getrightproperty.com"),
};
