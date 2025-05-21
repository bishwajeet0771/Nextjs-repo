import logger from "@/app/utils/logger";
import { getServerSideSitemap } from "next-sitemap";
// import path from "path";
// import fs from "fs";
import redisService from "@/app/utils/redis/redis.service";
import { SlugsType } from "@/app/common/constatns/slug.constants";
// import { NextResponse } from "next/server";
export async function GET() {
  // const filePath = path.join(process.cwd(), "static", `listingSlugs.json`);
  logger.info(`Listing Details Sitemap: Reading listingSlugs.json file`);
  // const data = fs.readFileSync(filePath, "utf-8");
  // const  = JSON.parse(data);
  const listingSlugs = await redisService.getProjectSlug(SlugsType.LISTING);
  const slugs = Object.keys(listingSlugs);
  const uniqueSlugs = Array.from(new Set(slugs)); // Ensure slugs are unique
  const splitSlugs = uniqueSlugs.flatMap((slug) => {
    const segments = slug.split("/").filter(Boolean);
    const pathsToCheck = [];
    for (let i = segments.length; i > 0; i--) {
      pathsToCheck.push(`/${segments.slice(0, i).join("/")}`);
    }
    return pathsToCheck;
  });
  const uniqueSplitSlugs = Array.from(new Set(splitSlugs));
  const generatedSitemap = uniqueSplitSlugs.map((slug) => ({
    loc: `${process.env.NEXT_PUBLIC_URL}${slug}`,
    lastmod: new Date().toISOString(),
  }));

  logger.info(`Listing Details Sitemap: Generated Sitemap`);
  return getServerSideSitemap(generatedSitemap);
}
