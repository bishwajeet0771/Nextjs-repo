import ProjectsDetailsPage from "@/app/(dashboard)/abc/[city]/[local]/[slug]/Page/ProjectDetailsPage";
import {
  extractProjectParamsValues,
  findPathForProjectDetails,
} from "@/app/(new_routes_seo)/utils/new-seo-routes/project";
import { BASE_PATH_PROJECT_DETAILS } from "@/app/(new_routes_seo)/utils/new-seo-routes/project.route";
import { getAmenties, getProjectDetails } from "@/app/utils/api/project";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    city: string;
    lt: string;
    slug: string;
    phase: string;
    prop_type: string;
    unit_type: string;
    heading: string;
  };
};

export default async function Page({ params }: Props) {
  const { city, lt, slug: name } = params;
  const pathname = `${BASE_PATH_PROJECT_DETAILS}/${city}/${lt}/${name}`;
  const value = await findPathForProjectDetails(pathname);
  if (!value) {
    notFound();
  }
  const { PJ: slug } = await extractProjectParamsValues(value);
  const [projResponse, amenitiesFromDB] = await Promise.all([
    getProjectDetails(slug as string),
    getAmenties(),
  ]);

  return (
    <ProjectsDetailsPage
      projResponse={projResponse}
      amenitiesFromDB={amenitiesFromDB}
      slug={slug as string}
      scrollId={params.heading}
      params={params}
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
//       heading,
//     ] = data.split("/");
//     return {
//       city,
//       lt,
//       slug,
//       phase,
//       prop_type,
//       ...(unit_type && { unit_type }),
//       ...(heading && { heading }),
//     };
//   });
//   return slugs;
// }

export const dynamicParams = true;
export const dynamic = "force-dynamic";
