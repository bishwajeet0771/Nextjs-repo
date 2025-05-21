import logger from "@/app/utils/logger";
import { getServerSideSitemap } from "next-sitemap";
// import path from "path";
// import fs from "fs";
import redisService from "@/app/utils/redis/redis.service";
import { SlugsType } from "@/app/common/constatns/slug.constants";
export async function GET() {
  logger.info(`Builder Details Sitemap: Reading builderSlugs.json file`);
  const builderSlugs = await redisService.getProjectSlug(SlugsType.BUILDER);
  // const data = fs.readFileSync(filePath, "utf-8");
  // const builderSlugs = JSON.parse(data);
  const slugs = Object.keys(builderSlugs);
  const generatedSitemap = slugs.map((slug) => ({
    loc: `${process.env.NEXT_PUBLIC_URL}${slug}`,
    lastmod: new Date().toISOString(),
  }));
  logger.info(`Builder Details Sitemap: Generated Sitemap`);
  return getServerSideSitemap(generatedSitemap);
}
