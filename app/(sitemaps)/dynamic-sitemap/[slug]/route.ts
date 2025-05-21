// import { NextResponse } from "next/server";
// import path from "path";
// import fs from "fs";
import { getServerSideSitemap } from "next-sitemap";
// import redisService from "@/app/utils/redis/redis.service";
// import { SlugsType } from "@/app/common/constatns/slug.constants";
import axios from "axios";

// Utility function to split the array into chunks
// const chunkArray = (array: any[], chunkSize: number) => {
//   const chunks = [];
//   for (let i = 0; i < array.length; i += chunkSize) {
//     chunks.push(array.slice(i, i + chunkSize));
//   }
//   return chunks;
// };

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug; // Get the 'slug' param, which is the index
  const sitemapIndex = parseInt(slug);
  const res = await axios.post(
    `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/common/case-seo-page?size=30000&page=${sitemapIndex - 1}`
  );
  //
  const requestedSitemap = res.data.seoUrls;

  const sitemap = requestedSitemap.map((slug: any) => ({
    loc: `${process.env.NEXT_PUBLIC_URL}/${slug}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(sitemap);
}
