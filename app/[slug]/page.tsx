/* eslint-disable no-unused-vars */
import React from "react";
import { getPagesSlugs } from "../seo/api";
import { Metadata, ResolvingMetadata } from "next";
// import NewSearchPage from "../(new_routes_seo)/search/NewSearchPage";
// import redisService from "../utils/redis/redis.service";
import CaseSeoSearchService from "../services/case-seo.service";
// import { SlugsType } from "../common/constatns/slug.constants";
import NewListingSearchpage from "../(new_routes_seo)/search/listing/NewListingSearchpage";
import {
  getProjSearchData,
  getSearchData,
} from "../(new_routes_seo)/in/utils/api";
import { parseApiFilterQueryParams } from "../(new_routes_seo)/search/utils/project-search-queryhelpers";
import redisService from "../utils/redis/redis.service";
import { SlugsType } from "../common/constatns/slug.constants";
// import redisService from "../utils/redis/redis.service";
// import { SlugsType } from "../common/constatns/slug.constants";

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    sf: string;
  };
};
export default async function Page({ params: { slug }, searchParams }: Props) {
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
    const { frontEndFilter, severData } = await CaseSeoSearchService(slug, {
      sf: !!searchParams.sf,
    });
    frontendFilters = frontEndFilter;
    serverData = severData;
  }

  const pageUrl = `/${slug}`;
  return (
    <NewListingSearchpage
      serverData={serverData}
      frontendFilters={frontendFilters}
      pageUrl={pageUrl}
      preDefinedFilters={searchParams.sf}
      is2lakhUrls
      showProjectTab
    />
  );
}

export const generateStaticParams = async () => {
  const res = await getPagesSlugs("case-seo");
  await redisService.saveSeoSlug(SlugsType.SEO, res);

  if (process.env.ENVIRONMENT === "production" && process.env.LAKH_URLS) {
    return res.map((slug: string) => ({ slug }));
  }
  return [];
};

export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.slug.split("-");
  const heading = cleanHeading(id);
  const isProject = !(
    params.slug.includes("rent") || params.slug.includes("sale")
  )
    ? "Property For Sale And Rent"
    : "";
  const twitterTitle = `${isProject} ${heading}`;
  const twitterDescription = `${isProject} ${heading}, Bangalore. Get a verified search without any charges on Getrightproperty.`;
  const imageUrl = `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/search-page/default.webp`;
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/${params.slug}`;

  return {
    title: twitterTitle,
    description: twitterDescription,
    keywords: [
      `${heading} Bangalore`,
      `${heading} property`,
      `${heading} for sale`,
      `real estate Bangalore`,
      "Buy property in Bangalore",
      "Verified property listings",
    ],
    robots: "index, follow",
    openGraph: {
      title: twitterTitle,
      description: twitterDescription,
      url,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${heading} Property Image`,
        },
      ],
      siteName: "Getrightproperty",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
      site: "@Getrightproperty",
      creator: "@Getrightproperty",
      images: [imageUrl],
    },
  };
}

function cleanHeading(id: string[]) {
  const sanitizedName = id.map((part) => {
    if (part.includes("PJ")) {
      return;
    }
    return part;
  });
  return sanitizedName
    .join(" ")
    .replace(/\b\d*(B|C|G|L|P|CG|SCG|RCG|PJ)\b/g, "")
    .replace(/\s+/g, " ");
}
// export const dynamic = "force-static";
export const dynamicParams = false;
