/* eslint-disable no-unused-vars */
import { findPathForProjectListing } from "@/app/(new_routes_seo)/in/utils/getSlugs";
import {
  getProjSearchData,
  getSearchData,
} from "@/app/(new_routes_seo)/in/utils/api";
import {
  extractListingParamsValues,
  generateSlugs,
} from "@/app/(new_routes_seo)/utils/new-seo-routes/listing";
import { BASE_PATH_PROJECT_LISTING } from "@/app/(new_routes_seo)/utils/new-seo-routes/listing.route";
import { notFound } from "next/navigation";
import React from "react";
import NewListingSearchpage from "@/app/(new_routes_seo)/search/listing/NewListingSearchpage";
import { Metadata, ResolvingMetadata } from "next";
import { parseApiFilterQueryParams } from "@/app/(new_routes_seo)/search/utils/project-search-queryhelpers";

type Props = {
  params: { cg: string };
  searchParams: {
    sf: string;
  };
};

export default async function Page({ params: { cg }, searchParams }: Props) {
  const pathname = `${BASE_PATH_PROJECT_LISTING}/${cg}`;
  const values = await findPathForProjectListing(pathname);
  if (!values) return notFound();
  let serverData = null;
  let frontendFilters = null;
  if (searchParams.sf) {
    const apiFilters = parseApiFilterQueryParams(searchParams.sf);
    const isProj = apiFilters?.includes("listedBy=proj") ? true : false;
    // eslint-disable-next-line no-unused-vars
    const data = isProj
      ? await getProjSearchData(apiFilters ?? "")
      : await getSearchData(apiFilters ?? "");
    serverData = data;
    frontendFilters = parseApiFilterQueryParams(searchParams.sf);
  } else {
    const slugValues = extractListingParamsValues(values);
    serverData = await getSearchData(`cg=${slugValues.CG}`);
    frontendFilters = {
      cg: slugValues.CG,
      listedBy: null,
    };
  }
  return (
    <NewListingSearchpage
      serverData={serverData}
      frontendFilters={frontendFilters}
      showProjectTab
      pageUrl={pathname}
      preDefinedFilters={searchParams.sf}
    />
  );
}

export async function generateMetadata(
  { params }: { params: { cg: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { cg } = params;
  const categoryFormatted = cg
    .split("-")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const title = `Residential Properties ${categoryFormatted} in India - GRP`;
  const description = `Find the best residential properties ${cg} in India. Explore apartments, flats, villas, villaments, plots and builder floors. Get verified details and connect with top real estate agents.`;
  const url = `https://www.getrightproperty.com/residential-listings/${cg}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Get Right Property",
      type: "website",
      locale: "en_US",
    },
  };
}
export async function generateStaticParams() {
  const slugs = await generateSlugs("listing-search-seo", "project-listing");
  return slugs;
}
export const dynamic = "force-dynamic";
export const dynamicParams = true;
