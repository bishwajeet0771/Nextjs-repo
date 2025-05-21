import ListingDetailsPage from "@/app/(dashboard)/listing/[city]/[slug]/Page/ListingDetailsPage";
import {
  getProjSearchData,
  getSearchData,
} from "@/app/(new_routes_seo)/in/utils/api";
import { findPathForProjectListing } from "@/app/(new_routes_seo)/in/utils/getSlugs";
import NewListingSearchpage from "@/app/(new_routes_seo)/search/listing/NewListingSearchpage";
import parseProjectSearchQueryParams from "@/app/(new_routes_seo)/search/utils/parse-project-searchqueryParams";
import { parseApiFilterQueryParams } from "@/app/(new_routes_seo)/search/utils/project-search-queryhelpers";
import {
  extractListingParamsValues,
  generateSlugs,
} from "@/app/(new_routes_seo)/utils/new-seo-routes/listing";
import { BASE_PATH_PROJECT_LISTING } from "@/app/(new_routes_seo)/utils/new-seo-routes/listing.route";
import { getAmenties, getAuthorityNames } from "@/app/utils/api/project";
import {
  getListingDetails,
  getProjectDetails,
  getReportConstData,
} from "@/app/utils/api/property";
import logger from "@/app/utils/logger";

import { Metadata, ResolvingMetadata } from "next";

import { notFound } from "next/navigation";
type Props = {
  params: {
    slugs: string[];
  };
  searchParams: {
    sf: string;
  };
};

export default async function Page({ params, searchParams }: Props) {
  const [cg, city, lt, project, phase, bhk_unit_type, listing] = params.slugs;

  const pathname = [
    BASE_PATH_PROJECT_LISTING,
    cg,
    city,
    lt,
    project,
    phase,
    bhk_unit_type,
    listing,
  ]
    .filter(Boolean)
    .join("/");

  let isProjectListing = listing ? true : bhk_unit_type?.includes("listing");

  let serverData = null;
  let filtersValues: any = {};
  let frontendFilters = null;
  if (searchParams.sf) {
    const apiFilters = parseApiFilterQueryParams(searchParams.sf);
    const isProj = apiFilters?.includes("listedBy=proj") ? true : false;
    // eslint-disable-next-line no-unused-vars
    const apiResData = isProj
      ? await getProjSearchData(apiFilters ?? "")
      : await getSearchData(apiFilters ?? "");
    serverData = apiResData.results;
    frontendFilters = {
      ...parseProjectSearchQueryParams(searchParams.sf),
      currentPage: 1,
      totalCount: apiResData.totalCount,
    };
  } else {
    if (!isProjectListing) {
      const values = await findPathForProjectListing(pathname);
      if (!values) return notFound();
      filtersValues = extractListingParamsValues(values);
      const queryParams = [];

      if (filtersValues.BH) queryParams.push(`bhk=${filtersValues.BH}`);
      if (filtersValues.PT) queryParams.push(`propType=${filtersValues.PT}`);
      if (filtersValues.LT) queryParams.push(`localities=${filtersValues.LT}`);
      if (filtersValues.CG) queryParams.push(`cg=${filtersValues.CG}`);
      if (filtersValues.PJ) queryParams.push(`projIdEnc=${filtersValues.PJ}`);
      if (filtersValues.PH) queryParams.push(`phaseId=${filtersValues.PH}`);
      if (filtersValues.PG) queryParams.push(`page=${filtersValues.PG}`);

      const queryString = queryParams.join("&");
      const apiResData = await getSearchData(queryString);
      serverData = apiResData.results;
      frontendFilters = {
        ...(lt && { localities: [`${lt}+${filtersValues.LT}`] }),
        ...((bhk_unit_type || phase) && {
          bhk: [parseInt(filtersValues.BH as string)],
        }),
        ...((bhk_unit_type || phase) && {
          propType: parseInt(filtersValues.PT as string),
        }),
        cg: filtersValues.CG,
        projName: project,
        projIdEnc: filtersValues.PH,
        ...(filtersValues.PH && {
          phaseId: [`${params.slugs[5]}+${filtersValues.PH}`],
        }),
        listedBy: null,
        currentPage: filtersValues.PG ? parseInt(filtersValues.PG) : null,
        totalCount: apiResData.totalCount,
      };
    } else {
      const {
        listing: data,
        nearByLocations,
        totalPrice,
      } = await getListingDetails(
        (listing
          ? listing.split("-")[1]
          : (bhk_unit_type.split("-").at(-1) as string)) ?? "",
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
      console.log("listing Details Api caliing");
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
    <ListingDetailsPage
      params={{
        cg,
        city,
        lt,
        project,
        phase,
        bhk_unit_type,
        ...(listing && { slug: listing }),
      }}
      {...serverData}
      pathname={pathname}
    />
  );
}

export async function generateStaticParams() {
  try {
    const slugs = await generateSlugs("listing-search-seo", "project-listing");
    return slugs;
  } catch (error) {
    console.log(error);
  }
}

export async function generateMetadata({
  params,
}: {
  params: {
    slugs: string[];
  };
}): Promise<Metadata> {
  const slugs = params.slugs;
  const [cg, city, lt, project, phase, bhk_unit_type, listing] = slugs;
  const isListingPage =
    bhk_unit_type?.includes("listing") || listing?.includes("listing");

  if (!isListingPage) {
    const formatText = (text?: string) =>
      text
        ? text
            .split("-")
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        : "";

    const cityFormatted = city
      ? city.charAt(0).toUpperCase() + city.slice(1)
      : "";
    const localityFormatted = formatText(lt);
    const projectFormatted = formatText(project);
    const phaseFormatted = formatText(phase);

    const isBHKType = /^\d[\s-]*bhk/i.test(phase || "");
    const phaseDisplay = isBHKType
      ? `${phaseFormatted} Flats`
      : phaseFormatted
      ? `${phaseFormatted} Phase`
      : "";

    // Property Types to include in SEO Title and Description
    // const propertyTypes = ["apartment", "flat", "villa", "villament", "plot"];
    // const propertyTypeFormatted = propertyTypes
    //   .map((type) => type.charAt(0).toUpperCase() + type.slice(1))
    //   .join(", ");

    // Dynamic Title
    let title = "Buy Residential Properties in India - GRP";
    if (cityFormatted && !lt && !project && !phase) {
      title = `Residential Properties for Sale in ${cityFormatted} - GRP`;
    } else if (cityFormatted && localityFormatted && !project) {
      title = `Properties for Sale in ${localityFormatted}, ${cityFormatted} - GRP`;
    } else if (
      projectFormatted &&
      cityFormatted &&
      localityFormatted &&
      !phase
    ) {
      title = `Flats for Sale in ${projectFormatted}, ${localityFormatted}, ${cityFormatted} - GRP`;
    } else if (
      phaseDisplay &&
      projectFormatted &&
      localityFormatted &&
      cityFormatted
    ) {
      title = `${phaseDisplay} in ${projectFormatted}, ${localityFormatted}, ${cityFormatted} for Sale - GRP`;
    } else {
      title = `${
        projectFormatted ? `${projectFormatted} -` : ""
      }  Residential Properties for Sale in ${
        localityFormatted ? localityFormatted + "," : "Bengaluru"
      } ${cityFormatted ?? "Bengaluru"} - GRP`;
    }

    // Dynamic Description
    let description = `Explore verified residential property listings in India. Find your dream property among apartments, flats, villas, villaments, builder floors, and plots.`;
    if (
      phaseDisplay &&
      projectFormatted &&
      localityFormatted &&
      cityFormatted
    ) {
      description = `Explore ${phaseDisplay.toLowerCase()} for sale in ${projectFormatted}, located in ${localityFormatted}, ${cityFormatted}. Get verified listings of apartments, flats, villas, villaments, builder floors, and plots.`;
    } else if (projectFormatted && localityFormatted && cityFormatted) {
      description = `Browse flats, apartments, villas, and more for sale in ${projectFormatted}, ${localityFormatted}, ${cityFormatted}.`;
    } else if (localityFormatted && cityFormatted) {
      description = `Discover residential properties for sale in ${localityFormatted}, ${cityFormatted}. Choose from apartments, flats, villas, builder floors, and plots.`;
    } else if (cityFormatted) {
      description = `Find the best residential properties for sale in ${cityFormatted}. Search verified flats, apartments, villas, and more.`;
    }

    // Dynamic URL
    const urlParts = [cg, city, lt, project, phase].filter(Boolean).join("/");
    const url = `https://www.getrightproperty.com/residential-listings/${urlParts}`;

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

  // Listing detail page logic
  const id = (listing || bhk_unit_type).split("-")[1];
  const { listing: data } = await getListingDetails(id);

  return {
    title: `${data.bhkName ?? ""} ${data.propTypeName} ${data.propName} for ${
      data.cg === "S" ? "Sale" : "Rent"
    } in ${data.ltName}`,
    description: `Searching ${data.bhkName ?? ""} ${data.propTypeName} ${
      data.propName
    }, for ${data.cg === "S" ? "Sale" : "Rent"} in ${
      data.ltName
    }, Bangalore. Verified listings on Getrightproperty.`,
    keywords: `${data.bhkName ?? ""}, ${data.propTypeName}, ${data.ltName}, ${
      data.ctName
    }, ${data.cg === "S" ? "Sale" : "Rent"}`,
    openGraph: {
      title: `${data.bhkName ?? ""} ${data.propTypeName} for ${
        data.cg === "S" ? "Sale" : "Rent"
      } in ${data.ltName}`,
      description: `Find ${data.bhkName ?? ""} ${data.propTypeName} in ${
        data.ltName
      } on Getrightproperty.`,
      url: data.projMedia.coverImageUrl,
      images: [
        {
          url: data.projMedia.coverImageUrl,
          width: 800,
          height: 600,
          alt: `${data.bhkName ?? ""} ${data.propTypeName} for ${
            data.cg === "S" ? "Sale" : "Rent"
          } in ${data.ltName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.bhkName ?? ""} ${data.propTypeName} for ${
        data.cg === "S" ? "Sale" : "Rent"
      } in ${data.ltName}`,
      description: `Verified listing of ${data.bhkName ?? ""} ${
        data.propTypeName
      } for ${data.cg === "S" ? "Sale" : "Rent"} in ${
        data.ltName
      }. Only on Getrightproperty.`,
      images: data.projMedia.coverImageUrl,
    },
  };
}
export const dynamic = "force-static";
export const dynamicParams = false;
