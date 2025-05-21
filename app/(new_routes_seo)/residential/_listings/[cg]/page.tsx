import { findPathForProjectListing } from "@/app/(new_routes_seo)/in/utils/getSlugs";
import { getSearchData } from "@/app/(new_routes_seo)/in/utils/api";
import NewSearchPage from "@/app/(new_routes_seo)/search/NewSearchPage";
import {
  extractListingParamsValues,
  generateSlugs,
} from "@/app/(new_routes_seo)/utils/new-seo-routes/listing";
import { BASE_PATH_LISTING } from "@/app/(new_routes_seo)/utils/new-seo-routes/listing.route";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: { cg: string };
};

export default async function Page({ params: { cg } }: Props) {
  const pathname = `${BASE_PATH_LISTING}/${cg}`;
  const values = await findPathForProjectListing(pathname);
  if (!values) return notFound();
  const slugValues = extractListingParamsValues(values);
  const severData = await getSearchData(`cg=${slugValues.CG}`);
  const pageUrl = `${process.env.NEXT_PUBLIC_URL}${pathname}`;
  return (
    <NewSearchPage
      pageUrl={pageUrl}
      serverData={severData}
      frontendFilters={{
        cg: slugValues.CG,
        listedBy: "All",
      }}
      preDefinedFilters={""}
    />
  );
}
export async function generateStaticParams() {
  const slugs = await generateSlugs("listing-search-seo", "solo-listing");

  return slugs;
}
export const dynamic = "force-dynamic";
export const dynamicParams = true;
