import React from "react";
import { getPagesSlugs } from "@/app/seo/api";
import path from "path";
import fs from "fs";
import BuildersDirectory from "../_components/search-page/CitiesBuilder";
import { notFound } from "next/navigation";
import redisService from "@/app/utils/redis/redis.service";
import { SlugsType } from "@/app/common/constatns/slug.constants";
import { findPathForBuilderDetails } from "../services/builder-server.service";
import { getCitiesBuilder } from "../services/builder-client.service";
import { BASE_PATH_BUILDER_DETAILS } from "../builder.constant";
import logger from "@/app/utils/logger";
type Props = {
  params: {
    city: string;
  };
};
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export default async function Page({ params: { city } }: Props) {
  const PATH = `${BASE_PATH_BUILDER_DETAILS}/${city}`;
  const builderSlug = await findPathForBuilderDetails(PATH);
  if (!builderSlug) return notFound();
  const id = builderSlug.split("_")[0];
  const builderData = await getCitiesBuilder({ city: id, page: 0, sort: 0 });
  return <BuildersDirectory city={city} id={id} initialData={builderData} />;
}

export async function generateStaticParams() {
  // Get the data (mocked here, replace with your actual data fetching logic)
  const res = await getPagesSlugs("builder-list");
  await redisService.saveBuilderSlug(SlugsType.BUILDER, res);
  const staticDir = path.join(process.cwd(), "static");

  // Ensure the 'static' directory exists
  if (!fs.existsSync(staticDir)) {
    fs.mkdirSync(staticDir);
  }

  // Prepare the slugs for static generation
  const builderRess = Object.keys(res);
  const slugs = builderRess.map((data) => {
    // const [staticPath, staticPath2, city, slug] = data.split("/");
    const [, , city] = data.split("/");
    return { city };
  })

  return slugs;
}
