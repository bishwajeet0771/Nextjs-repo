import { getPagesSlugs } from "@/app/seo/api";
import React from "react";
import { BASE_PATH_PROJECT_DETAILS } from "@/app/(new_routes_seo)/utils/new-seo-routes/project.route";

import {
  extractProjectParamsValues,
  findPathForProjectDetails,
} from "@/app/(new_routes_seo)/utils/new-seo-routes/project";
import { notFound } from "next/navigation";
import NewSearchPage from "@/app/(new_routes_seo)/search/NewSearchPage";
import { Metadata, ResolvingMetadata } from "next";
import logger from "@/app/utils/logger";
import parseProjectSearchQueryParams from "@/app/(new_routes_seo)/search/utils/parse-project-searchqueryParams";
import {
  getProjSearchData,
  getSearchData as getListingData,
} from "@/app/(new_routes_seo)/in/utils/api";
import { parseApiFilterQueryParams } from "@/app/(new_routes_seo)/search/utils/project-search-queryhelpers";

type Props = {
  params: { city: string; lt: string; slug: string };
  searchParams: {
    sf: string;
  };
};
export const dynamic = "force-dynamic";
export default async function Page({
  params: { city, lt },
  searchParams,
}: Props) {
  const pathname = `${BASE_PATH_PROJECT_DETAILS}/${city}/${lt}`;
  const value = await findPathForProjectDetails(pathname);
  if (!value) notFound();
  const filterValues = extractProjectParamsValues(value);
  console.log(filterValues);
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
    const data = await getSearchData(filterValues.PG ?  `&page=${filterValues.PG}` : `&localities=${filterValues.LT}`);
    serverData = await data.results;
    frontendFilters = {
      localities: [`${lt}+${filterValues.LT}`],
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
export async function generateStaticParams() {
  const res = await getPagesSlugs("project-list");
  const keys = Object.keys(res);
  const slugs = [];
  for (let i = 0; i < keys.length; i++) {
    const data = keys[i];
    if ((data.match(/\//g) || []).length === 4) {
      const [, , , city, lt] = data.split("/");
      slugs.push({ city, lt });
    }
  }
  return slugs;
}
export async function generateMetadata(
  { params }: { params: { city: string; lt: string } },
  // eslint-disable-next-line no-unused-vars
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { city, lt } = params;

  const cityFormatted = city.charAt(0).toUpperCase() + city.slice(1);
  const localityFormatted = lt
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const title = `Residential Projects Available in ${localityFormatted}, ${cityFormatted} - GRP`;
  const description = `Find the best residential projects in ${localityFormatted}, ${cityFormatted}. Explore apartments, Flats, villas, villaments, plots and builder floors. Get verified details.`;

  const url = `https://www.getrightproperty.com/residential/projects/${city}/${lt}`;

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

const getSearchData = async (apiFilterQueryParams: string) => {
  try {
    let baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/searchproj?city=9&cg=S`;
    if (!apiFilterQueryParams.includes("page=")) {
      baseUrl += "&page=0";
    }
    const url = `${baseUrl}${apiFilterQueryParams}`;
    const res = await fetch(url, {
      cache: "no-store",
    });
    if (!res.ok) {
      logger.error("data not fetched successfuly" + res.statusText);
      throw new Error(`Error fetching data: ${res.statusText}`);
    }
    const data = await res.json();
    logger.debug(data);
    return data;
  } catch (error) {
    logger.error(error);
    console.error(error);
    throw new Error("Something Went Wrong.");
  }
};

// export const fetchCache = "force-no-store";
