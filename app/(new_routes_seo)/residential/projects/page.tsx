import React from "react";
import NewSearchPage from "@/app/(new_routes_seo)/search/NewSearchPage";
import { BASE_PATH_PROJECT_DETAILS } from "@/app/(new_routes_seo)/utils/new-seo-routes/project.route";
import { Metadata } from "next";
import { parseApiFilterQueryParams } from "../../search/utils/project-search-queryhelpers";
import {
  getProjSearchData,
  getSearchData as getListingData,
} from "../../in/utils/api";
import parseProjectSearchQueryParams from "../../search/utils/parse-project-searchqueryParams";
type Props = {
  params: { city: string; lt: string };
  searchParams: {
    sf: string;
  };
};
export const dynamic = "force-dynamic";
// eslint-disable-next-line no-unused-vars
export default async function Page({
  params: { city, lt },
  searchParams,
}: Props) {
  const pathname = `${BASE_PATH_PROJECT_DETAILS}`;
  let serverData = null;
  let frontendFilters = null;
  if (searchParams.sf) {
    const apiFilters = parseApiFilterQueryParams(searchParams.sf);
    frontendFilters = parseProjectSearchQueryParams(searchParams.sf);
    const isProj = frontendFilters.listedBy ? false : true;
    // eslint-disable-next-line no-unused-vars
    const data = isProj
      ? await getProjSearchData(apiFilters ?? "")
      : await getListingData(apiFilters ?? "");
    serverData = data.results;
  } else {
    const data = await getSearchData();
    serverData = await data.results;
    frontendFilters = {
      listedBy: null,
      currentPage: 0,
      totalCount: data.totalCount,
    };
  }
  return (
    <NewSearchPage
      pageUrl={pathname}
      serverData={serverData}
      frontendFilters={frontendFilters}
      preDefinedFilters={searchParams.sf}
    />
  );
}

const getSearchData = async () => {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/searchproj?page=0&city=9&cg=S`;

    const url = `${baseUrl}`;

    const res = await fetch(url, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export async function generateMetadata(): Promise<Metadata> {
  const title = `Residential Projects Available in Bengaluru - GRP`;
  const description = `Find the best residential projects in Bengaluru. Explore apartments, Flats, villas, villaments, plots and builder floors. Get verified details.`;
  const url = `https://www.getrightproperty.com/residential/projects`;
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
