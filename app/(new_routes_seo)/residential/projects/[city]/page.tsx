/* eslint-disable no-unused-vars */
import { getPagesSlugs } from "@/app/seo/api";
import React from "react";
import NewSearchPage from "@/app/(new_routes_seo)/search/NewSearchPage";
import { extractProjectParamsValues, findPathForProjectDetails } from "@/app/(new_routes_seo)/utils/new-seo-routes/project";
import { BASE_PATH_PROJECT_DETAILS } from "@/app/(new_routes_seo)/utils/new-seo-routes/project.route";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { parseApiFilterQueryParams } from "@/app/(new_routes_seo)/search/utils/project-search-queryhelpers";
import parseProjectSearchQueryParams from "@/app/(new_routes_seo)/search/utils/parse-project-searchqueryParams";
import {
  getProjSearchData,
  getSearchData as getListingData,
} from "@/app/(new_routes_seo)/in/utils/api";

type Props = {
  params: { city: string; lt: string };
  searchParams: {
    sf: string;
  };
};

export default async function Page({
  params: { city, lt },
  searchParams,
}: Props) {
  const pathname = `${BASE_PATH_PROJECT_DETAILS}/${city}`;
  const value = await findPathForProjectDetails(pathname);
  if (!value) notFound();

  // const serverData = await (await getSearchData()).results;
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
     const filterValues = extractProjectParamsValues(value);
    const data = await (await getSearchData(filterValues.PG ? `page=${filterValues.PG}` : "page=0", ))
    serverData = data.results;
    frontendFilters = {
      cg: filterValues.CG,
      listedBy: null,
      currentPage: filterValues.PG ? parseInt(filterValues.PG as string) : null,
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
export async function generateMetadata(
  { params }: { params: { city: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { city } = params;

  const cityFormatted = city.charAt(0).toUpperCase() + city.slice(1);

  const title = `Residential Projects Available in  ${cityFormatted} - GRP`;
  const description = `Find the best residential projects in ${cityFormatted}. Explore apartments, Flats, villas, villaments, plots and builder floors. Get verified details.`;

  const url = `https://www.getrightproperty.com/residential/projects/${city}`;

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
  const res = await getPagesSlugs("project-list");
  const keys = Object.keys(res);
  const slugs = [];
  for (let i = 0; i < keys.length; i++) {
    const data = keys[i];
    if ((data.match(/\//g) || []).length === 3) {
      const [, , , city] = data.split("/");
      slugs.push({ city });
    }
  }
  return slugs;
}
const getSearchData = async (filters?: string) => {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/searchproj?city=9&cg=S`;
    const url = `${baseUrl}${filters ? `&${filters}` : ""}`;
    const res = await fetch(url, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.log(res.statusText);
      throw new Error(`Error fetching data: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    console.error(error);
    return null;
  }
};
// export const dynamic = "force-dynamic";
// export const fetchCache = "force-no-store";
