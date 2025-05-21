// import logger from "@/app/utils/logger";
import { getServerSideSitemap } from "next-sitemap";
// import path from "path";
// import fs from "fs";
export async function GET() {
  return getServerSideSitemap([
    {
      loc: `${process.env.NEXT_PUBLIC_URL}/post-your-listing`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URL}/your-profile/dashboard`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URL}/post-your-project`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URL}/your-projects`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URL}/login`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URL}/register`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URL}/forgot`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URL}/register/individual`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URL}/register/agent`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URL}/register/builder`,
      lastmod: new Date().toISOString(),
    },
  ]);
}
