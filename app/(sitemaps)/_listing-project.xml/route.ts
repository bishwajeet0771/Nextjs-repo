import logger from "@/app/utils/logger";
import { getServerSideSitemap } from "next-sitemap";
import path from "path";
import fs from "fs";
export async function GET() {
  const filePath = path.join(process.cwd(), "static", `case-seo.json`);
  logger.info(`Project Details Sitemap: Reading case-seo.json file`);
  const data = fs.readFileSync(filePath, "utf-8");
  const projectSlugs = JSON.parse(data);
  // const slugs = Object.keys(projectSlugs);
  const generatedSitemap = projectSlugs.map((slug: any) => ({
    loc: `${process.env.NEXT_PUBLIC_URL}/${slug}`,
    lastmod: new Date().toISOString(),
  }));
  logger.info(`Count of Sitemap: ${generatedSitemap.length}`);

  logger.info(`Case SEO Details Sitemap: Generated Sitemap`);
  return getServerSideSitemap(generatedSitemap, {});
}
