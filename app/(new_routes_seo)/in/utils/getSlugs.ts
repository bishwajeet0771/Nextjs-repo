import { SlugsType } from "@/app/common/constatns/slug.constants";
import redisService from "@/app/utils/redis/redis.service";
import fs from "fs";
import path from "path";
async function getListingSLugs(pathname: string) {
  const staticDir = path.join(process.cwd(), "static");
  const filePath = path.join(staticDir, "listingSlugs.json");
  console.time("getListingSlugs");
  try {
    const jsonData = fs.readFileSync(filePath, "utf8");
    const builderJsonData = JSON.parse(jsonData);
    // console.log(builderJsonData, pathname);
    // Return the ID for the given pathname
    return builderJsonData[pathname] || null;
  } catch (error) {
    console.log(error);
  } finally {
    console.timeEnd("getListingSlugs");
  }
  // Read the JSON file
}

export default getListingSLugs;

export async function getNestedSlug(pathname: string, level?: number) {
  const staticDir = path.join(process.cwd(), "static");
  const filePath = path.join(staticDir, "listingSlugs.json");
  console.time("getProjectSlugs");

  try {
    // Read the JSON file
    const jsonData = fs.readFileSync(filePath, "utf8");
    const builderJsonData = JSON.parse(jsonData);
    // console.log(pathname);
    // Find the exact matching path based on the truncated path
    const matchingPath = Object.keys(builderJsonData).find((key) => {
      // Compare the key up to the last segment
      return level
        ? key.split("/").slice(0, level).join("/") === pathname
        : key === pathname;
    });

    // Return the ID for the exact match found
    return matchingPath ? builderJsonData[matchingPath] : null;
  } catch (error) {
    console.error("Error reading project slugs:", error);
    return null;
  } finally {
    console.timeEnd("getProjectSlugs");
  }
}

export async function findPathForProjectListing(inputUrl: string) {
  const listingJsonData = await redisService.getListingSlug(SlugsType.LISTING);
  // for (const path in listingJsonData) {
  //   if (path === inputUrl) {
  //     return listingJsonData[path];
  //   }
  // }
  if (listingJsonData[inputUrl]) {
    return listingJsonData[inputUrl];
  }
  return null;
}
