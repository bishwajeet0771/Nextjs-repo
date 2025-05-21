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
import { notFound } from "next/navigation";
type Props = {
  params: { city: string; lt: string; slug: string; phase: string };
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
//       (key) => key.split("/").slice(0, -2).join("/") === pathname
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
export default async function Page({
  params: { city, lt, slug, phase },
}: Props) {
  const pathname = `${BASE_PATH_PROJECT_DETAILS}/${city}/${lt}/${slug}/${phase}`;
  const value = await findPathForProjectDetails(pathname);
  if (!value) notFound();
  const filterValues = extractProjectParamsValues(value);
  const serverData = await getSearchData(
    `projIdEnc=${filterValues.PJ}${
      filterValues.count == 5 ? `&propType=${filterValues.PT}` : ""
    }`
  );
  return (
    <ListingSearchPage
      serverData={serverData}
      frontendFilters={{
        locality: [`${lt}+${filterValues.LT}`],
        projName: slug,
        projIdEnc: filterValues.PJ,
        ...(filterValues.count == 5 && {
          propTypes: parseInt(filterValues.PT as string),
        }),
      }}
    />
  );
}
// export async function generateStaticParams() {
//   const res = await getPagesSlugs("project-list");
//   const keys = Object.keys(res);
//   const slugs = keys.map((data) => {
//     const [staticPath, staticPath2, sta3, city, lt, slug, phase] =
//       data.split("/");
//     return { city, lt, slug, phase };
//   });
//   return slugs;
// }

// export const dynamic = "force-dynamic";
