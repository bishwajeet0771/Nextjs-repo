import ListingDetailsPage from "@/app/(dashboard)/listing/[city]/[slug]/Page/ListingDetailsPage";
import {
  getProjSearchData,
  getSearchData,
} from "@/app/(new_routes_seo)/in/utils/api";
import { findPathForProjectListing } from "@/app/(new_routes_seo)/in/utils/getSlugs";
import NewListingSearchpage from "@/app/(new_routes_seo)/search/listing/NewListingSearchpage";
import parseProjectSearchQueryParams from "@/app/(new_routes_seo)/search/utils/parse-project-searchqueryParams";
import { parseApiFilterQueryParams } from "@/app/(new_routes_seo)/search/utils/project-search-queryhelpers";
import { extractListingParamsValues } from "@/app/(new_routes_seo)/utils/new-seo-routes/listing";
import { BASE_PATH_PROJECT_LISTING } from "@/app/(new_routes_seo)/utils/new-seo-routes/listing.route";
import { getAmenties, getAuthorityNames } from "@/app/utils/api/project";
import {
  getListingDetails,
  getProjectDetails,
  getReportConstData,
} from "@/app/utils/api/property";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
type Props = {
  params: {
    cg: string;
    city: string;
    lt: string;
    bhk_unit_type: string;
    project: string;
    phase: string;
  };
  searchParams: {
    sf: string;
  };
};

export default async function Page({ params, searchParams }: Props) {
  const { bhk_unit_type, cg, city, lt, project, phase } = params;
  const pathname = `${BASE_PATH_PROJECT_LISTING}/${cg}/${city}/${lt}/${project}${
    phase ? `/${phase}` : ""
  }/${bhk_unit_type}`;
  // console.log(params);
  let isProjectListing = bhk_unit_type.includes("listing");
  let serverData = null;
  let filtersValues: any = {};
  let frontendFilters = null;
  if (searchParams.sf) {
    const apiFilters = parseApiFilterQueryParams(searchParams.sf);
    const isProj = apiFilters?.includes("listedBy=proj") ? true : false;
    // eslint-disable-next-line no-unused-vars
    serverData = isProj
      ? await getProjSearchData(apiFilters ?? "")
      : await getSearchData(apiFilters ?? "");

    frontendFilters = parseProjectSearchQueryParams(searchParams.sf);
  } else {
    if (!isProjectListing) {
      const values = await findPathForProjectListing(pathname);
      // console.log(values);
      if (!values) return notFound();
      filtersValues = extractListingParamsValues(values);
      serverData = await getSearchData(
        `${filtersValues.BH ? `bhk=${filtersValues.BH}&` : ""}propType=${
          filtersValues.PT
        }&localities=${filtersValues.LT}&cg=${filtersValues.CG}&projIdEnc=${
          filtersValues.PJ
        }${filtersValues.PH ? `&phaseId=${filtersValues.PH}` : ""}`
      );
      frontendFilters = {
        localities: [`${lt}+${filtersValues.LT}`],
        bhk: [parseInt(filtersValues.BH as string)],
        propType: parseInt(filtersValues.PT as string),
        cg: filtersValues.CG,
        projName: project,
        projIdEnc: filtersValues.PH,
        ...(filtersValues.PH && {
          phaseId: [`${params.phase}+${filtersValues.PH}`],
        }),
        listedBy: null,
      };
    } else {
      const {
        listing: data,
        nearByLocations,
        totalPrice,
      } = await getListingDetails(
        (bhk_unit_type.split("-").at(-1) as string) ?? "",
        pathname
      );

      const [projData, issueData, amenities] = await Promise.all([
        getProjectDetails(data.projIdEnc),
        getReportConstData(),
        getAmenties(),
      ]);
      if (projData?.projAuthorityId) {
        const res = await getAuthorityNames(projData.projAuthorityId);
        data.projAuthorityNames = res;
      }
      const TITLE_OF_PROP = data.projIdEnc
        ? data.propName
        : `${data.bhkName ?? ""} ${data.propTypeName} For
      ${data.cg === "S" ? " Sale" : " Rent"} In ${data.ltName}`;

      serverData = {
        TITLE_OF_PROP,
        data,
        projData,
        issueData,
        amenitiesFromDB: amenities,
        nearByLocations,
        totalPrice,
      };
    }
  }

  return !isProjectListing ? (
    <NewListingSearchpage
      pageUrl={pathname}
      serverData={serverData}
      frontendFilters={frontendFilters}
      preDefinedFilters={searchParams.sf}
    />
  ) : (
    <ListingDetailsPage params={params} {...serverData} pathname={pathname} />
  );
}
export async function generateMetadata(
  {
    params,
  }: {
    params: {
      cg: string;
      city: string;
      lt: string;
      project: string;
      bhk_unit_type: string;
    };
  },
  // eslint-disable-next-line no-unused-vars
  parent: ResolvingMetadata
): Promise<Metadata> {
  if (!params.bhk_unit_type.includes("listing")) {
    return {
      title: `${params.bhk_unit_type.replace(/-/g, " ")} in ${params.lt.replace(
        /-/g,
        " "
      )} for ${
        params.cg === "for-sale" ? "Sale" : "Rent"
      } in ${params.project.replace(/-/g, " ")}, ${params.city.replace(
        /-/g,
        " "
      )} `,
      description: `Looking for ${params.bhk_unit_type.replace(
        /-/g,
        " "
      )} properties for ${
        params.cg === "for-sale" ? "sale" : "rent"
      } in ${params.project.replace(/-/g, " ")}, ${params.lt.replace(
        /-/g,
        " "
      )}, ${params.city.replace(
        /-/g,
        " "
      )}? Find verified listings with detailed information about amenities, prices and more. Browse through our extensive collection of residential properties on Getrightproperty - Your trusted property search platform.`,
      openGraph: {
        title: `${params.bhk_unit_type.replace(
          /-/g,
          " "
        )} in ${params.lt.replace(/-/g, " ")} for ${
          params.cg === "S" ? "Sale" : "Rent"
        } in ${params.project.replace(/-/g, " ")}, ${params.city.replace(
          /-/g,
          " "
        )}`,
        description: `Looking for ${params.bhk_unit_type.replace(
          /-/g,
          " "
        )} properties for ${
          params.cg === "S" ? "sale" : "rent"
        } in ${params.project.replace(/-/g, " ")}, ${params.lt.replace(
          /-/g,
          " "
        )}, ${params.city.replace(
          /-/g,
          " "
        )}? Find verified listings with detailed information about amenities, prices and more. Browse through our extensive collection of residential properties on Getrightproperty - Your trusted property search platform.`,
      },
    };
  }

  const id = params.bhk_unit_type.split("-")[1];
  const { listing: data } = await getListingDetails(id as string);
  const keywords = `${data.bhkName ?? ""}, ${data.propTypeName}, ${
    data.ltName
  }, ${data.ctName}, ${data.cg === "S" ? "Sale" : "Rent"}`;
  return {
    title: `${data.bhkName ?? ""} ${data.propTypeName} ${data.propName} for ${
      data.cg === "S" ? " Sale" : " Rent"
    } in ${data.ltName}`,
    description: `Searching ${data.bhkName ?? ""} ${data.propTypeName} ${
      data.propName
    }, for ${data.cg === "S" ? " Sale" : " Rent"} in ${
      data.ltName
    }, Bangalore. Get a verified search on Get Right property. New Age Property Portal.`,
    applicationName: "Getrightproperty",
    keywords: keywords,
    openGraph: {
      title: `${data.bhkName ?? ""} ${data.propTypeName} for ${
        data.cg === "S" ? " Sale" : " Rent"
      } in ${data.ltName} `,
      description: `Searching ${data.bhkName ?? ""} ${data.propTypeName}, for ${
        data.cg === "S" ? " Sale" : " Rent"
      } in ${
        data.ltName
      }, Bangalore. Get a verified search on Get Right property. New Age Property Portal.`,
      url: data.projMedia.coverImageUrl,
      type: "website",
      images: [
        {
          url: data.projMedia.coverImageUrl,
          width: 800,
          height: 600,
          alt: `${data.bhkName ?? ""} ${data.propTypeName} for ${
            data.cg === "S" ? " Sale" : " Rent"
          } in ${data.ltName} `,
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
// export async function generateStaticParams() {
//   // Get the data (mocked here, replace with your actual data fetching logic)
//   const res = await getPagesSlugs("listing-search-seo");

//   // Extract project names from the keys
//   const projectRes = Object.keys(res);
//   const slugs = projectRes.map((data) => {
//     if (data.includes("/in/for/")) {
//       const [
//         emtypath,
//         country,
//         staticPath,
//         cg,
//         city,
//         lt,
//         project,
//         bhk_unit_type,
//         slug,
//       ] = data.split("/");
//       return { cg, city, lt, project, bhk_unit_type };
//     }
//   });
//   return slugs;
// }
export const dynamic = "force-dynamic";
export const dynamicParams = true;
