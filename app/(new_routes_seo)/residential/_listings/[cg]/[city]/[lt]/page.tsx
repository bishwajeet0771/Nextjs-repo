import React from "react";
// import ListingSearchPage from "@/app/(dashboard)/searchOldPage/listing/Page/ListingSearchPage";
// import { getPagesSlugs } from "@/app/seo/api";
// import ProjectSearchPage from "@/app/(dashboard)/searchOldPage/Page/ProjectSearchPage";
import {
  findPathForProjectListing,
  // getNestedSlug,
} from "@/app/(new_routes_seo)/in/utils/getSlugs";
import {
  getProjSearchData,
  getSearchData,
} from "@/app/(new_routes_seo)/in/utils/api";
import {
  extractListingParamsValues,
  generateSlugs,
} from "@/app/(new_routes_seo)/utils/new-seo-routes/listing";
import { BASE_PATH_LISTING } from "@/app/(new_routes_seo)/utils/new-seo-routes/listing.route";
import { notFound } from "next/navigation";
import NewSearchPage from "@/app/(new_routes_seo)/search/NewSearchPage";
import NewListingSearchpage from "@/app/(new_routes_seo)/search/listing/NewListingSearchpage";
type Props = {
  params: {
    cg: string;
    city: string;
    lt: string;
  };
};

export default async function Page({ params: { cg, city, lt } }: Props) {
  const pathname = `${BASE_PATH_LISTING}/${cg}/${city}/${lt}`;
  const values = await findPathForProjectListing(pathname);
  if (!values) return notFound();
  const slugValues = extractListingParamsValues(values);
  let severData;
  if (slugValues.PT === "36") {
    severData = await getSearchData(`localities=${slugValues.LT}`);
  } else {
    severData = await getProjSearchData(`localities=${slugValues.LT}`);
  }

  return slugValues.PT === "36" ? (
    <NewListingSearchpage
      pageUrl={pathname}
      serverData={severData}
      frontendFilters={{
        localities: [`${lt}+${slugValues.LT}`],
        cg: slugValues.CG,
      }}
      preDefinedFilters={""}
    />
  ) : (
    <NewSearchPage
      pageUrl={pathname}
      serverData={severData}
      frontendFilters={{
        localities: [`${lt}+${slugValues.LT}`],
        cg: slugValues.CG,
      }}
      preDefinedFilters={""}
    />
  );
}
export async function generateStaticParams() {
  const slugs = generateSlugs("listing-search-seo", "solo-listing");
  return slugs;
}
export const dynamic = "force-dynamic";
export const dynamicParams = true;
