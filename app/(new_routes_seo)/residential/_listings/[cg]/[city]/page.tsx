import React from "react";
// import ListingSearchPage from "@/app/(dashboard)/searchOldPage/listing/Page/ListingSearchPage";
// import { getPagesSlugs } from "@/app/seo/api";
// import ProjectSearchPage from "@/app/(dashboard)/searchOldPage/Page/ProjectSearchPage";
import { getSearchData } from "@/app/(new_routes_seo)/in/utils/api";
import {
  extractListingParamsValues,
  generateSlugs,
} from "@/app/(new_routes_seo)/utils/new-seo-routes/listing";
import { BASE_PATH_LISTING } from "@/app/(new_routes_seo)/utils/new-seo-routes/listing.route";
import {
  findPathForProjectListing,
  // getNestedSlug,
} from "@/app/(new_routes_seo)/in/utils/getSlugs";
import { notFound } from "next/navigation";
import NewSearchPage from "@/app/(new_routes_seo)/search/NewSearchPage";

type Props = {
  params: {
    cg: string;
    city: string;
    lt: string;
  };
};

export default async function Page({ params: { cg, city } }: Props) {
  const pathname = `${BASE_PATH_LISTING}/${cg}/${city}`;
  const values = await findPathForProjectListing(pathname);
  if (!values) return notFound();
  const slugValues = extractListingParamsValues(values);
  const severData = await getSearchData(`cg=${slugValues.CG}`);
  const pageUrl = `${process.env.NEXT_PUBLIC_URL}${pathname}`;
  return (
    <NewSearchPage
      serverData={severData}
      frontendFilters={{
        cg: slugValues.CG,
        listedBy: "All",
      }}
      preDefinedFilters={""}
      pageUrl={pageUrl}
    />
  );
}
export async function generateStaticParams() {
  const slugs = generateSlugs("listing-search-seo", "solo-listing");
  return slugs;
}
export const dynamic = "force-dynamic";
export const dynamicParams = true;
