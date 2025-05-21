// import ListingSearchPage from "@/app/(dashboard)/searchOldPage/listing/Page/ListingSearchPage";
import {
  getProjSearchData,
  getSearchData,
} from "@/app/(new_routes_seo)/in/utils/api";
import {
  findPathForProjectListing,
  // getNestedSlug,
} from "@/app/(new_routes_seo)/in/utils/getSlugs";
import NewListingSearchpage from "@/app/(new_routes_seo)/search/listing/NewListingSearchpage";
import parseProjectSearchQueryParams from "@/app/(new_routes_seo)/search/utils/parse-project-searchqueryParams";
import { parseApiFilterQueryParams } from "@/app/(new_routes_seo)/search/utils/project-search-queryhelpers";
import { extractListingParamsValues } from "@/app/(new_routes_seo)/utils/new-seo-routes/listing";
import { BASE_PATH_PROJECT_LISTING } from "@/app/(new_routes_seo)/utils/new-seo-routes/listing.route";
import { Metadata, ResolvingMetadata } from "next";
// import { getPagesSlugs } from "@/app/seo/api";
import { notFound } from "next/navigation";
import React from "react";
type Props = {
  params: {
    cg: string;
    city: string;
    lt: string;
    bhk_unit_type: string;
    project: string;
  };
  searchParams: {
    sf: string;
  };
};

export default async function Page({
  params: { cg, city, lt, project },
  searchParams,
}: Props) {
  const pathname = `${BASE_PATH_PROJECT_LISTING}/${cg}/${city}/${lt}/${project}`;
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
    frontendFilters = parseProjectSearchQueryParams(searchParams.sf);
  } else {
    const filtersValues = extractListingParamsValues(values);
    serverData = await getSearchData(
      `localities=${filtersValues.LT}&cg=${filtersValues.CG}&projIdEnc=${filtersValues.PJ}`
    );
    frontendFilters = {
      localities: [`${lt}+${filtersValues.LT}`],
      cg: filtersValues.CG,
      projName: project,
      projIdEnc: filtersValues.PJ,
      listedBy: null,
    };
  }

  return (
    <NewListingSearchpage
      pageUrl={pathname}
      serverData={serverData}
      frontendFilters={frontendFilters}
      preDefinedFilters={searchParams.sf}
      showProjectTab
    />
  );
}

export async function generateMetadata(
  {
    params,
  }: { params: { cg: string; city: string; lt: string; project: string } },
  // eslint-disable-next-line no-unused-vars
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { cg, city, lt, project } = params;
  const categoryFormatted = cg
    .split("-")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const cityFormatted = city.charAt(0).toUpperCase() + city.slice(1);
  const localityFormatted = lt
    .split("-")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const projectFormatted = project
    .split("-")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const title = `${projectFormatted} - Residential Properties ${categoryFormatted} in ${localityFormatted}, ${cityFormatted} - GRP`;
  const description = `Find the best residential properties ${categoryFormatted} in ${projectFormatted}, ${localityFormatted}, ${cityFormatted}. Explore apartments, flats, villas, villaments, plots and builder floors. Get verified details and connect with top real estate agents.`;
  const url = `https://www.getrightproperty.com/residential-listings/${cg}/${city}/${lt}/${project}`;
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
export const dynamic = "force-dynamic";
export const dynamicParams = true;
