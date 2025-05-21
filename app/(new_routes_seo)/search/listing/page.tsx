import React from "react";
import dynamicImport from "next/dynamic";
import { Metadata } from "next";
import ListingHeaderFilters from "./_new-listing-search-page/components/ListingSearchHeader";
// const ListingHeaderFilters = dynamicImport(
//   () => import("./_new-listing-search-page/components/ListingSearchHeader")
// );
import ListingMainSection from "./_new-listing-search-page/components/ListingMainSection";
const ProjectSearchBreadCrumbs = dynamicImport(
  () => import("../components/ProjSearchBreadCrums")
);

import {
  getProjSearchData,
  getSearchData,
} from "@/app/(new_routes_seo)/in/utils/api";
import { parseApiFilterQueryParams } from "../utils/project-search-queryhelpers";
import parseProjectSearchQueryParams from "../utils/parse-project-searchqueryParams";

export default async function Page(params: any) {
  const isListing = true;
  const apiFilters = params.searchParams.sf
    ? parseApiFilterQueryParams(params.searchParams.sf)
    : null;
  let frontendFilters = parseProjectSearchQueryParams(params.searchParams.sf);
  const isProj = apiFilters?.includes("listedBy=proj") ? true : false;
  const res = isProj
    ? await getProjSearchData(apiFilters ?? "cg=S")
    : await getSearchData(apiFilters ?? "cs=S");
  const data = res.results;
  const totalCount = res.totalCount;
  // const currentPage = res.currentPage;

  frontendFilters = {
    ...frontendFilters,
    totalCount,
    // currentPage,
  };
  return (
    <section className="pt-[70px] min-h-[calc(100vh)] relative">
      <link
        rel="canonical"
        href={`${process.env.NEXT_PUBLIC_URL}/search/listing${
          apiFilters ? `?sf=${apiFilters}` : ""
        }`}
      />
      <div className="relative md:fixed top-0 md:top-[70px] z-auto md:z-10 w-full ">
        <ProjectSearchBreadCrumbs pageUrl={"/search/listing"} />

        <ListingHeaderFilters
          isListing={isListing}
          showProjectTab
          frontendFilters={frontendFilters}
        />
      </div>
      <div className="sm:min-w-full xl:m-0 flex justify-between items-start flex-wrap-reverse sm:flex-nowrap relative md:pt-[184px] xl:pt-[220px]  ">
        <ListingMainSection
          frontendFilters={frontendFilters}
          serverData={data}
          preAppliedFilters={params.searchParams.sf}
        />
      </div>
    </section>
  );
}

export const metadata: Metadata = {
  title: "Explore Properties for Sale & Rent in India | GetRightProperty",
  description:
    "Browse verified real estate listings across India. Find your perfect home or investment property with GetRightProperty's user-friendly search tools.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Explore Properties for Sale & Rent in India | GetRightProperty",
    url: "https://www.getrightproperty.com/search/listing",
    type: "website",
    images:
      "https://media.getrightproperty.com/staticmedia-images-icons/grp-logo/grp-logo-tm.webp",
    description:
      "Browse verified real estate listings across India. Find your perfect home or investment property with GetRightProperty's user-friendly search tools.",
  },
  // alternates: {
  //   canonical: "https://www.getrightproperty.com/search/listing",
  // },
};
export const dynamic = "force-dynamic";
export const dynamicParams = true;
