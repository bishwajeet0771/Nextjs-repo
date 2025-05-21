// utils/new_routes_seo/generateSlugs.ts
// import { getServerSideSitemap } from "next-sitemap";
import { getPagesSlugs } from "@/app/seo/api";
// import path from "path";
// import fs from "fs";
import redisService from "@/app/utils/redis/redis.service";
import { SlugsType } from "@/app/common/constatns/slug.constants";
import logger from "@/app/utils/logger";

type SlugParams = {
  emptyPath?: string;
  country?: string;
  cg?: string;
  city?: string;
  project?: string;
  phase?: string;
  lt?: string;
  bhk_unit_type?: string;
  slug?: string;
};

// Cache Map
const cache = new Map<string, string[]>();

export async function generateSlugs(
  slugType: "builder-list" | "project-list" | "case-seo" | "listing-search-seo",
  type: "project-listing" | "solo-listing"
): Promise<any> {
  // Check if keys are cached
  let keys = cache.get(slugType);

  if (!keys) {
    const res = await getPagesSlugs(slugType);
    await redisService.saveSeoSlug(SlugsType.LISTING, res);

    keys = Object.keys(res);
    cache.set(slugType, keys);
  }

  const slugs = keys.map((data) => {
    if (data.includes("/residential/listings") && type === "solo-listing") {
      const [cg, city, lt, bhk_unit_type, slug] = data.split("/");
      const result: Partial<SlugParams> = {
        cg,
        city,
        lt,
        bhk_unit_type,
        slug,
      };

      return result;
    } else if (
      data.includes("/residential-listings") &&
      type === "project-listing"
    ) {
      const [, , cg, city, lt, project, phase, bhk_unit_type, slug] =
        data.split("/");
      const result = {
        slugs: [
          ...(cg ? [cg] : []),
          ...(city ? [city] : []),
          ...(lt ? [lt] : []),
          ...(project ? [project] : []),
          ...(phase ? [phase] : []),
          ...(bhk_unit_type ? [bhk_unit_type] : []),
          ...(slug ? [slug] : []),
        ],
      };
      return result;
    }
  });

  return slugs;
}

export const extractListingParamsValues = (input: string) => {
  const result: { [key: string]: string | number } = {};

  // Split the input into segments based on the underscore "_"

  const segments = input?.split("_");

  // Initialize count
  let propertyCount = 0;

  // Process each segment
  for (const segment of segments) {
    // Check if the segment contains "*"
    const starIndex = segment.indexOf("*");
    if (starIndex !== -1) {
      // If it also contains "+", split by "+"
      const plusIndex = segment.indexOf("+");
      if (plusIndex !== -1) {
        const pairs = segment.split("+");
        for (const pair of pairs) {
          const [value, key] = pair.split("*");
          if (key) {
            if (!result[key]) {
              propertyCount++;
            }
            result[key] = value;
          }
        }
      } else {
        // Process single key-value pair
        const value = segment.substring(0, starIndex);
        const key = segment.substring(starIndex + 1);
        if (key) {
          if (!result[key]) {
            propertyCount++;
          }
          result[key] = value;
        }
      }
    } else {
      propertyCount++;
      // Assign the segment as the ID if no "*" is found
      result["id"] = segment;
    }
  }

  // Add the count of properties to the result
  result["count"] = propertyCount;

  return result;
};
