/* eslint-disable no-unused-vars */
// import ListingSearchPage from "@/app/(dashboard)/searchOldPage/listing/Page/ListingSearchPage";
// import ProjectSearchPage from "@/app/(dashboard)/searchOldPage/Page/ProjectSearchPage";
import {
  getProjSearchData,
  getSearchData,
} from "@/app/(new_routes_seo)/in/utils/api";
import {
  findPathForProjectListing,
  // getNestedSlug,
} from "@/app/(new_routes_seo)/in/utils/getSlugs";
import NewListingSearchpage from "@/app/(new_routes_seo)/search/listing/NewListingSearchpage";
import NewSearchPage from "@/app/(new_routes_seo)/search/NewSearchPage";
import {
  extractListingParamsValues,
  generateSlugs,
} from "@/app/(new_routes_seo)/utils/new-seo-routes/listing";
import { BASE_PATH_LISTING } from "@/app/(new_routes_seo)/utils/new-seo-routes/listing.route";
import { getListingDetails } from "@/app/utils/api/property";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
type Props = {
  params: {
    cg: string;
    city: string;
    lt: string;
    bhk_unit_type: string;
  };
  searchParams: {
    sf: string;
  };
};
// 50 , 16
export default async function Page({
  params: { bhk_unit_type, cg, city, lt },
  searchParams,
}: Props) {
  const pathname = `${BASE_PATH_LISTING}/${cg}/${city}/${lt}/${bhk_unit_type}`;
  const values = await findPathForProjectListing(pathname);
  if (!values) return notFound();
  const { CG, BH, PT, LT } = extractListingParamsValues(values);
  let severData;
  let frontendFilters = null;
  if (searchParams.sf) {
  } else {
    if (PT === "36") {
      severData = await getSearchData(
        `bhk=${BH}&propType=${PT}&localities=${LT}&cg=${CG}`
      );
    } else {
      severData = await getProjSearchData(
        `bhk=${BH}&propType=${PT}&localities=${LT}&cg=${CG}`
      );
    }
  }

  return PT === "36" ? (
    <NewListingSearchpage
      pageUrl={pathname}
      serverData={severData}
      frontendFilters={{
        localities: [`${lt}+${LT}`],
        bhk: [parseInt(BH as string)],
        propType: parseInt(PT as string),
        cg: CG,
      }}
      preDefinedFilters={searchParams.sf}
    />
  ) : (
    <NewSearchPage
      pageUrl={pathname}
      serverData={severData}
      frontendFilters={{
        localities: [`${lt}+${LT}`],
        bhk: [parseInt(BH as string)],
        propType: parseInt(PT as string),
        cg: CG,
      }}
      preDefinedFilters={""}
    />
  );
}

export async function generateStaticParams() {
  const slugs = generateSlugs("listing-search-seo", "solo-listing");
  return slugs;
}
export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  if (!params.bhk_unit_type.includes("listing")) {
    return {
      title: "Listing Search Page",
      description: "Listing Search Page",
    };
  }
  const id = params.slug.split("-")[1];
  const { listing: data } = await getListingDetails(id as string);
  return {
    title: `${data.bhkName ?? ""} ${data.propTypeName} for ${
      data.cg === "S" ? " Sale" : " Rent"
    } in ${data.ltName}`,
    description: `Searching ${data.bhkName ?? ""} ${data.propTypeName}, for ${
      data.cg === "S" ? " Sale" : " Rent"
    } in ${
      data.ltName
    }, Bangalore. Get a verified search on Get Right property. New Age Property Portal.`,
    openGraph: {
      title: `${data.bhkName ?? ""} ${data.propTypeName} for ${
        data.cg === "S" ? " Sale" : " Rent"
      } in ${data.ltName}`,
      description: `Searching ${data.bhkName ?? ""} ${data.propTypeName}, for ${
        data.cg === "S" ? " Sale" : " Rent"
      } in ${
        data.ltName
      }, Bangalore. Get a verified search on Get Right property. New Age Property Portal.`,
    },
  };
}
export const dynamic = "force-dynamic";
export const dynamicParams = true;
