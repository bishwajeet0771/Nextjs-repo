import React from "react";

import { Metadata } from "next";
import ProjSearchMainFilterSection from "./_new-search-page/components/filters/ProjSearchMainFilterSection";
import Mainsection from "./_new-search-page/components/Mainsection";
import ProjectSearchBreadCrumbs from "./_new-search-page/components/ProjSearchBreadCrums";

import parseProjectSearchQueryParams from "./utils/parse-project-searchqueryParams";
import { getProjSearchData, getSearchData } from "../in/utils/api";
import { parseApiFilterQueryParams } from "./utils/project-search-queryhelpers";

export default async function Page(params: any) {
  const apiFilters = params.searchParams.sf
    ? parseApiFilterQueryParams(params.searchParams.sf)
    : null;

  let frontendFilters = parseProjectSearchQueryParams(params.searchParams.sf);
  const isListing = frontendFilters.listedBy ? true : false;
  const res = !isListing
    ? await (
        await getProjSearchData(apiFilters ?? "cg=S")
      )
    : await (
        await getSearchData(apiFilters ?? "")
      );
     const data = res.results;
     frontendFilters = {
      ...frontendFilters,
      totalCount: res.totalCount,
     }

  return  (
    <section className="pt-[70px] min-h-[calc(100vh)] relative ">
      <meta name="robots" content="index, follow" />
      <div className="relative md:fixed top-0 md:top-[70px] z-auto md:z-10 w-full ">
        <ProjectSearchBreadCrumbs key="newSearchPage2" pageUrl={"/search"} />
        <ProjSearchMainFilterSection
          isListing={isListing}
          key="newSearchFilter2"
          frontendFilters={frontendFilters}
        />
    
      </div>
      <div className=" sm:min-w-full xl:m-0 flex justify-between items-start flex-wrap-reverse sm:flex-nowrap relative md:pt-[184px] xl:pt-[226px] ">
        <Mainsection
          frontendFilters={frontendFilters}
          serverData={data}
          preAppliedFilters={params.searchParams.sf}
        />
      </div>
    </section>
  );
}
// Hllo
export const metadata: Metadata = {
  title: "Explore Projects for Sale & Rent in India | GetRightProperty",
  description:
    "Browse verified real estate listings across India. Find your perfect home or investment property with GetRightProperty's user-friendly search tools.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Explore Projects for Sale & Rent in India | GetRightProperty",
    url: "https://www.getrightproperty.com/search/",
    type: "website",
    images:
      "https://media.getrightproperty.com/staticmedia-images-icons/grp-logo/grp-logo-tm.webp",
    description:
      "Browse verified real estate listings across India. Find your perfect home or investment property with GetRightProperty's user-friendly search tools.",
  },
  alternates: {
    canonical: "https://www.getrightproperty.com/search",
  },
};
export const dynamic = "force-dynamic";
export const dynamicParams = true;
