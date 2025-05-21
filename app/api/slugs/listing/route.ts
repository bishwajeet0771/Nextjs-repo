import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";
import { revalidatePath, revalidateTag } from "next/cache";
import logger from "@/app/utils/logger";
// import { getPagesSlugs } from "@/app/seo/api";
import redisService from "@/app/utils/redis/redis.service";
import { SlugsType } from "@/app/common/constatns/slug.constants";

export async function POST(request: Request) {
  let body = await request.json();
  const { slug, id, action, slugs } = body;
  logger.info(`POST request received at ${request.url}`, body);
  if (!action) {
    logger.error(`POST ${request.url}: Missing action parameter in request`);
    return NextResponse.json(
      { error: "Missing action parameter" },
      { status: 400 }
    );
  }

  const data = await redisService.getListingSlug(SlugsType.LISTING);

  switch (action) {
    case "create": {
      if (!slugs) {
        logger.error(
          `POST ${request.url}: Missing slugs data in create action`
        );
        return NextResponse.json(
          { error: "data is required" },
          { status: 400 }
        );
      }
      const errors: string[] = [];
      // Loop through the slugs object to check if it already exists or not
      for (const key in slugs) {
        if (!id || typeof id !== "string") {
          logger.error(`POST ${request.url}: Invalid ID for slug: ${slug}`);
          errors.push(`Invalid ID for slug: ${slug}`);
          return;
        }
        if (Object.prototype.hasOwnProperty.call(slugs, key)) {
          const element = slugs[key];
          // Check if the key (slug) already exists in JSON data
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            logger.warn(`POST ${request.url}: Slug "${key}" already exists`);
            errors.push(`Slug "${key}" already exists`);
          } else {
            data[key] = element;
            revalidatePath(key);
          }
        }
      }
      // Handle errors if any slugs were invalid or already existed
      if (errors.length > 0) {
        logger.error(
          `POST ${request.url}: Multiple errors occurred: ${errors.join(", ")}`
        );
        return NextResponse.json({ error: errors.join(", ") }, { status: 400 });
      }
      await redisService.saveListingSlug(SlugsType.LISTING, data);
      logger.info(`POST ${request.url}: Successfully created new listing(s)`, {
        slugs,
      });
      return NextResponse.json(
        { message: `Listing(s) created successfully`, slugs },
        { status: 201 }
      );
    }
    case "update": {
      if (!id || !slugs || typeof slugs !== "object" || Array.isArray(slugs)) {
        logger.error(
          `POST ${request.url}: Missing or invalid parameters in update action`
        );
        return NextResponse.json(
          { error: "Missing or invalid parameters" },
          { status: 400 }
        );
      }
      // Find and delete existing slugs with the same id
      Object.keys(data).forEach((key) => {
        if (key.split("-").at(-1) === id) {
          delete data[key];
          revalidatePath(key);
          logger.info(`POST ${request.url}: Deleted existing slug: ${key}`);
        }
      });
      // Add new slugs to the data
      Object.keys(slugs).forEach((slug) => {
        const newId = slugs[slug];
        if (!newId || typeof newId !== "string") {
          logger.error(`POST ${request.url}: Invalid ID for slug: ${slug}`);
          return NextResponse.json(
            { error: `Invalid ID for slug: ${slug}` },
            { status: 400 }
          );
        }
        // Check if the new slug already exists
        if (Object.prototype.hasOwnProperty.call(data, slug)) {
          logger.error(`POST ${request.url}: Slug '${slug}' already exists`);
          return NextResponse.json(
            { error: `Slug '${slug}' already exists` },
            { status: 400 }
          );
        }
        // Add the new slug and its corresponding ID
        data[slug] = newId;
        logger.info(`POST ${request.url}: Added new slug: ${slug}`);
      });
      // Write updated data to the file
      await redisService.saveListingSlug(SlugsType.LISTING, data);
      // Revalidate all paths for the new slugs
      Object.keys(slugs).forEach((slug) => {
        revalidatePath(slug);
      });
      revalidateTag(id);
      logger.info(`POST ${request.url}: Successfully updated slugs`);
      return NextResponse.json(
        { message: "Slugs updated successfully" },
        { status: 200 }
      );
    }
    case "delete": {
      if (!id) {
        logger.error(
          `POST ${request.url}: Missing id parameter in delete action`
        );
        return NextResponse.json(
          { error: "Missing id parameter" },
          { status: 400 }
        );
      }
      let deleted = false; // Track whether a deletion occurs
      // Loop over keys and delete the ones that contain the id
      Object.keys(data).forEach((key) => {
        if (key.split("-").at(-1) === id) {
          delete data[key];
          revalidatePath(key); // Revalidate path after deletion
          logger.info(`POST ${request.url}: Deleted slug: ${key}`);
          if (!deleted) {
            deleted = true;
          }
        }
      });
      // If no deletions occurred, return an error
      if (!deleted) {
        logger.error(`POST ${request.url}: id '${id}' does not exist`);
        return NextResponse.json(
          { error: `id '${id}' does not exist` },
          { status: 404 }
        );
      }
      await redisService.saveListingSlug(SlugsType.LISTING, data);
      logger.info(`POST ${request.url}: Successfully deleted listing slugs`);
      return NextResponse.json(
        { message: `Listing slugs deleted successfully` },
        { status: 200 }
      );
    }
    default:
      logger.error(`POST ${request.url}: Invalid action parameter: ${action}`);
      return NextResponse.json(
        { error: "Invalid action parameter" },
        { status: 400 }
      );
  }
}

export async function PUT(request: Request) {
  let body = await request.json();
  const { slugs, id } = body;
  logger.info(`PUT request received at ${request.url}`, body);

  if (!slugs || typeof slugs !== "object" || !id) {
    logger.error(`PUT ${request.url}: Missing or invalid slugs/id data`);
    return NextResponse.json(
      {
        error:
          "Slugs data is required and must be an object, and ids array must not be empty",
      },
      { status: 400 }
    );
  }

  const data = await redisService.getListingSlug(SlugsType.LISTING);

  // First delete existing slugs based on ids
  if (id) {
    const ids = id.split(",");
    ids.forEach((id: string) => {
      Object.keys(data).forEach((key) => {
        if (key.split("-").at(-1) === id) {
          delete data[key];
          logger.info(`PUT ${request.url}: Deleted existing slug: ${key}`);
        }
      });
    });
  }

  Object.assign(data, slugs); // Merge new slugs into existing data

  await redisService.saveListingSlug(SlugsType.LISTING, data);
  logger.info(`PUT ${request.url}: Successfully updated listing slugs`);

  return NextResponse.json(
    { message: "Listing slugs updated successfully" },
    { status: 200 }
  );
}

// export async function PATCH() {
//   const res = await getPagesSlugs("listing-search-seo");
//   // Fetch data and cache the keys
//   const staticDir = path.join(process.cwd(), "static");
//   const filePath = path.join(staticDir, "listingSlugs.json");
//   // Ensure the 'static' directory exists
//   if (!fs.existsSync(staticDir)) {
//     fs.mkdirSync(staticDir);
//   }
//   // Convert the data object into JSON
//   const jsonContent = JSON.stringify(res, null, 2);
//   // Write the JSON data to the file
//   fs.writeFileSync(filePath, jsonContent);
//   return NextResponse.json(
//     { message: "Listing slugs updated successfully" },
//     { status: 200 }
//   );
// }
export async function GET() {
  const data = await redisService.getListingSlug(SlugsType.LISTING);
  return NextResponse.json(data, { status: 200 });
}
