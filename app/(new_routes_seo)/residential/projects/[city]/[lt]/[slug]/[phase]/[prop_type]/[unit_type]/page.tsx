// import { getPagesSlugs } from "@/app/seo/api";
import React from "react";
// import fs from "fs";
// import path from "path";
import { getSearchData } from "@/app/(new_routes_seo)/in/utils/api";
import ListingSearchPage from "@/app/(dashboard)/searchOldPage/listing/Page/ListingSearchPage";
import { BASE_PATH_PROJECT_DETAILS } from "@/app/(new_routes_seo)/utils/new-seo-routes/project.route";
import {
  extractProjectParamsValues,
  findPathForProjectDetails,
} from "@/app/(new_routes_seo)/utils/new-seo-routes/project";
import { getAmenties, getProjectDetails } from "@/app/utils/api/project";
import ProjectsDetailsPage from "@/app/(dashboard)/abc/[city]/[local]/[slug]/Page/ProjectDetailsPage";
import { notFound } from "next/navigation";
type Props = {
  params: {
    city: string;
    lt: string;
    slug: string;
    phase: string;
    prop_type: string;
    unit_type: string;
  };
};

export default async function Page({ params }: Props) {
  const { city, lt, slug, phase, prop_type, unit_type } = params;
  const pathname = `${BASE_PATH_PROJECT_DETAILS}/${city}/${lt}/${slug}/${phase}/${prop_type}/${unit_type}`;
  const value = await findPathForProjectDetails(pathname);
  if (!value) {
    notFound();
  }
  const filterValues = extractProjectParamsValues(value);
  let serverData = null;
  if (filterValues.ID) {
    const [projResponse, amenitiesFromDB] = await Promise.all([
      getProjectDetails(filterValues.PJ as string),
      getAmenties(),
    ]);
    serverData = { projResponse, amenitiesFromDB };
  } else {
    serverData = await getSearchData(
      `projIdEnc=${filterValues.PJ}&propType=${filterValues.PT}&bhk=${filterValues.BH}`
    );
  }
  return filterValues.ID ? (
    <ProjectsDetailsPage
      projResponse={serverData.projResponse}
      amenitiesFromDB={serverData.amenitiesFromDB}
      slug={filterValues.PJ as string}
      scrollId={filterValues.ID ? unit_type : undefined}
      params={params}
    />
  ) : (
    <ListingSearchPage
      serverData={serverData}
      frontendFilters={{
        locality: [`${lt}+${filterValues.LT}`],
        projName: slug,
        projIdEnc: filterValues.PJ,
        propTypes: parseInt(filterValues.PT as string),
        unitTypes: [parseInt(filterValues.BH as string)],
      }}
    />
  );
}
// export async function generateStaticParams() {
//   const res = await getPagesSlugs("project-list");
//   const keys = Object.keys(res);
//   const slugs = keys.map((data) => {
//     const [
//       staticPath,
//       staticPath2,
//       sta3,
//       city,
//       lt,
//       slug,
//       phase,
//       prop_type,
//       unit_type,
//     ] = data.split("/");
//     return {
//       city,
//       lt,
//       slug,
//       phase,
//       prop_type,
//       ...(unit_type && { unit_type }),
//     };
//   });
//   return slugs;
// }

export const dynamic = "force-dynamic";
