import ListingDetailsPage from "@/app/(dashboard)/listing/[city]/[slug]/Page/ListingDetailsPage";

// import { getPagesSlugs } from "@/app/seo/api";
import { getAmenties } from "@/app/utils/api/project";
import {
  getListingDetails,
  getProjectDetails,
  getReportConstData,
} from "@/app/utils/api/property";
// import { getStringPartByIndex } from "@/app/utils/dyanamic/projects";
import { notFound } from "next/navigation";
// import path from "path";
import React from "react";
// import fs from "fs";
// import getListingSLugs, {
//   findPathForProjectListing,
//   getNestedSlug,
// } from "@/app/(new_routes_seo)/in/utils/getSlugs";
import {
  // extractListingParamsValues,
  generateSlugs,
} from "@/app/(new_routes_seo)/utils/new-seo-routes/listing";
import { BASE_PATH_LISTING } from "@/app/(new_routes_seo)/utils/new-seo-routes/listing.route";
import { Metadata, ResolvingMetadata } from "next";
type Props = {
  params: {
    cg: string;
    city: string;
    lt: string;
    bhk_unit_type: string;
    slug: string;
  };
};

export default async function Page({ params }: Props) {
  const pathname = `${BASE_PATH_LISTING}/${params.cg}/${params.city}/${params.lt}/${params.bhk_unit_type}/${params.slug}`;
  const id = params.slug.split("-").at(-1);
  if (!id) {
    notFound();
  }
  const {
    listing: data,
    nearByLocations,
    totalPrice,
  } = await getListingDetails(id as string, pathname);
  const [projData, issueData, amenities] = await Promise.all([
    getProjectDetails(data.projIdEnc),
    getReportConstData(),
    getAmenties(),
  ]);
  const TITLE_OF_PROP = data.projIdEnc
    ? data.propName
    : `${data.bhkName ?? ""} ${data.propTypeName} For
  ${data.cg === "S" ? " Sale" : " Rent"} In ${data.ltName}`;

  if (!data.propIdEnc) {
    console.log("slug found data not coming for this listing" + id);
    notFound();
  }
  return (
    <ListingDetailsPage
      TITLE_OF_PROP={TITLE_OF_PROP}
      amenitiesFromDB={amenities}
      data={data}
      projData={projData}
      issueData={issueData}
      nearByLocations={nearByLocations}
      totalPrice={totalPrice}
      params={params}
      pathname={pathname}
    />
  );
}

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = generateSlugs("listing-search-seo", "solo-listing");
  return slugs;
}
export async function generateMetadata(
  { params }: any,
  // eslint-disable-next-line no-unused-vars
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params?.slug?.split("-")[1];
  const {
    listing: data,
  } = await getListingDetails(id as string);

  const keywords = `${data.bhkName ?? ""}, ${data.propTypeName}, ${
    data.ltName
  }, ${data.ctName}, ${data.cg === "S" ? "Sale" : "Rent"}`;

  return {
    title: `${data.bhkName ?? ""} ${data.propTypeName} for ${
      data.cg === "S" ? " Sale" : " Rent"
    } in ${data.ltName}`,
    applicationName: "Getrightproperty",
    description: `Searching ${data.bhkName ?? ""} ${data.propTypeName}, for ${
      data.cg === "S" ? " Sale" : " Rent"
    } in ${
      data.ltName
    }, Bangalore. Get a verified search on Get Right property. New Age Property Portal.`,
    keywords: keywords, // Added keywords for SEO
    openGraph: {
      title: `${data.bhkName ?? ""} ${data.propTypeName} for ${
        data.cg === "S" ? " Sale" : " Rent"
      } in ${data.ltName}`,
      description: `Searching ${data.bhkName ?? ""} ${data.propTypeName}, for ${
        data.cg === "S" ? " Sale" : " Rent"
      } in ${
        data.ltName
      }, Bangalore. Get a verified search on Get Right property. New Age Property Portal.`,
      url: data.projMedia.coverImageUrl,
      type: "website",
      // site_name: "Getrightproperty",
      images: [
        {
          url: data.projMedia.coverImageUrl,
          width: 800,
          height: 600,
          alt: `${data.bhkName ?? ""} ${data.propTypeName} for ${
            data.cg === "S" ? " Sale" : " Rent"
          } in ${data.ltName}`,
        },
      ],
      locale: "en_US",
      siteName: "Getrightproperty",
      countryName: "India",
      emails: ["rahulrpclan@gamil.com"],
      phoneNumbers: ["+91-8884440963"],
    },
    twitter: {
      card: "summary_large_image",
      site: "@Getrightproperty",
      title: `${data.bhkName ?? ""} ${data.propTypeName} for ${
        data.cg === "S" ? " Sale" : " Rent"
      } in ${data.ltName}`,
      description: `Searching ${data.bhkName ?? ""} ${data.propTypeName}, for ${
        data.cg === "S" ? " Sale" : " Rent"
      } in ${
        data.ltName
      }, Bangalore. Get a verified search without any charges on Getrightproperty.`,
      images: data.projMedia.coverImageUrl,
    },
  };
}
