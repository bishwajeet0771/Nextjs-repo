// import { getPagesSlugs } from "@/app/seo/api";
import React from "react";
// import fs from "fs";
// import path from "path";
// import ProjectSearchPage from "@/app/(dashboard)/searchOldPage/Page/ProjectSearchPage";
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
  };
};
// async function getProjectSlug(pathname: string) {
//   const staticDir = path.join(process.cwd(), "static");
//   const filePath = path.join(staticDir, "projectSlugs.json");
//   console.time("getProjectSlugs");

//   try {
//     const jsonData = fs.readFileSync(filePath, "utf8");
//     const builderJsonData = JSON.parse(jsonData);

//     // Find the exact matching path based on the truncated path
//     const matchingPath = Object.keys(builderJsonData).find(
//       (key) => key.split("/").slice(0, -1).join("/") === pathname
//     );

//     // Return the ID for the exact match found
//     return matchingPath ? builderJsonData[matchingPath] : null;
//   } catch (error) {
//     console.log(error);
//     return null;
//   } finally {
//     console.timeEnd("getProjectSlugs");
//   }
// }
export default async function Page({ params }: Props) {
  const { city, lt, slug, phase, prop_type } = params;
  const pathname = `${BASE_PATH_PROJECT_DETAILS}/${city}/${lt}/${slug}/${phase}/${prop_type}`;
  const value = await findPathForProjectDetails(pathname);
  if (!value) {
    notFound();
  }
  let serverData = null;
  const { PJ, LT, PT, count } = extractProjectParamsValues(value);
  if (count == 6) {
    serverData = await getSearchData(`projIdEnc=${PJ}&propType=${PT}`);
  } else {
    const [projResponse, amenitiesFromDB] = await Promise.all([
      getProjectDetails(PJ as string),
      getAmenties(),
    ]);
    serverData = { projResponse, amenitiesFromDB };
  }

  return count == 5 ? (
    <ProjectsDetailsPage
      params={params}
      projResponse={serverData.projResponse}
      amenitiesFromDB={serverData.amenitiesFromDB}
      slug={PJ as string}
    />
  ) : (
    <ListingSearchPage
      serverData={serverData}
      frontendFilters={{
        locality: [`${lt}+${LT}`],
        projName: slug,
        projIdEnc: PJ,
        propTypes: parseInt(PT as string),
      }}
    />
  );
}
// export async function generateStaticParams() {
//   const res = await getPagesSlugs("project-list");
//   const keys = Object.keys(res);
//   const slugs = keys.map((data) => {
//     const [staticPath, staticPath2, sta3, city, lt, slug, phase, prop_type] =
//       data.split("/");
//     return { city, lt, slug, phase, prop_type };
//   });
//   return slugs;
// }

// export const dynamic = "force-dynamic";
