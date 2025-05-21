import { NextResponse } from "next/server";

import { revalidatePath, revalidateTag } from "next/cache";
import logger from "@/app/utils/logger";
import redisService from "@/app/utils/redis/redis.service";
import { SlugsType } from "@/app/common/constatns/slug.constants";

const typeMapping = {
  P: "project",
  B: "builder",
};

export async function POST(request: Request) {
  try {
    let { type, slug, id, action, slugs } = await request.json();
    logger.info(
      `${request.method} request received on ${
        request.url
      }\nRequest data: ${JSON.stringify({ type, slug, id, action, slugs })}`
    );

    // Validate required parameters
    if (!type || !action || (type !== "P" && type !== "B")) {
      logger.error(
        `Invalid type or missing action parameter. Request: ${request.method} ${request.url}`
      );
      return NextResponse.json(
        { error: "Invalid type or missing action parameter" },
        { status: 400 }
      );
    }

    type = typeMapping[type as keyof typeof typeMapping] || type;
    const cacheKey = `${SlugsType.STATIC}:slug:${type}`; // Redis key for the slugs data

    // Get data from Redis cache
    const data = await redisService.getKey(cacheKey);
    let parsedData: { [key: string]: string } = {};

    if (data) {
      parsedData = JSON.parse(data);
    } else {
      logger.info(
        "No data found in Redis. Falling back to default data structure."
      );
    }

    switch (action) {
      case "create": {
        logger.info(
          `Action: create. Request: ${request.method} ${request.url}`
        );
        if (!slugs || typeof slugs !== "object" || Array.isArray(slugs)) {
          logger.error(
            `Invalid slugs parameter. Request: ${request.method} ${request.url}`
          );
          return NextResponse.json(
            { error: "Invalid slugs parameter. Expected an object." },
            { status: 400 }
          );
        }

        const errors: string[] = [];

        // Iterate over each key-value pair in the slugs object
        Object.keys(slugs).forEach((slug) => {
          const id = slugs[slug];

          if (!id || typeof id !== "string") {
            logger.error(
              `Invalid ID for slug: ${slug}. Request: ${request.method} ${request.url}`
            );
            errors.push(`Invalid ID for slug: ${slug}`);
            return;
          }

          // Check if the slug already exists in data
          if (Object.prototype.hasOwnProperty.call(parsedData, slug)) {
            errors.push(`Slug "${slug}" already exists`);
          } else {
            if (type === "project") {
              const slugParts = slug.split("/");
              let base = "/residential/projects/";
              for (let i = 3; i < slugParts.length; i++) {
                base += slugParts[i] + (slugParts.length - 1 == i ? "" : "/");
                if (!parsedData[base]) {
                  parsedData[base] = id;
                }
              }
            } else {
              parsedData[slug] = id;
              logger.info(
                `Slug "${slug}" added with ID: ${id}. Request: ${request.method} ${request.url}`
              );
            }
            revalidatePath(slug);
            revalidateTag(slug);
          }
        });

        // Handle errors if any slugs were invalid or already existed
        if (errors.length > 0) {
          logger.error(
            `Errors during slug creation: ${errors}. Request: ${request.method} ${request.url}`
          );
          return NextResponse.json(
            { error: errors.join(", ") },
            { status: 400 }
          );
        }

        // Save updated data to Redis
        await redisService.setKey(cacheKey, JSON.stringify(parsedData));
        logger.info(
          `Slugs created successfully and data updated in Redis. Request: ${request.method} ${request.url}`
        );
        type === "project" && revalidateTag("projectSlugs");
        return NextResponse.json(
          { message: "Slugs created successfully" },
          { status: 201 }
        );
      }

      case "update": {
        logger.info(
          `Action: update. Request: ${request.method} ${request.url}`
        );
        if (
          !id ||
          !slugs ||
          typeof slugs !== "object" ||
          Array.isArray(slugs)
        ) {
          logger.error(
            `Missing or invalid parameters for update. Request: ${request.method} ${request.url}`
          );
          return NextResponse.json(
            { error: "Missing or invalid parameters" },
            { status: 400 }
          );
        }

        // Find and delete existing slugs with the same id
        Object.keys(parsedData).forEach((key) => {
          if (type === "project" && parsedData[key].includes(`LT_${id}*`)) {
            logger.info(
              `Deleting existing slug "${key}" for ID: ${id}. Request: ${request.method} ${request.url}`
            );
            delete parsedData[key];
            revalidatePath(key.split("/").slice(0, 6).join("/"));
            revalidatePath(key, "layout");
            revalidateTag(id);
          } else if (
            type === "builder" &&
            id === parsedData[key].split("_")[1]
          ) {
            logger.info(
              `Deleting existing slug "${key}" for ID: ${id}. Request: ${request.method} ${request.url}`
            );
            delete parsedData[key];
            revalidatePath(key);
          }
        });

        // Add new slugs to the data
        for (const slug of Object.keys(slugs)) {
          const newId = slugs[slug];
          if (!newId || typeof newId !== "string") {
            logger.error(
              `Invalid ID for slug: ${slug}. Request: ${request.method} ${request.url}`
            );
            return NextResponse.json(
              { error: `Invalid ID for slug: ${slug}` },
              { status: 400 }
            );
          }
          // Check if the new slug already exists
          if (Object.prototype.hasOwnProperty.call(parsedData, slug)) {
            logger.error(
              `Slug '${slug}' already exists. Request: ${request.method} ${request.url}`
            );
            return NextResponse.json(
              { error: `Slug '${slug}' already exists` },
              { status: 400 }
            );
          }
          // Add the new slug and its corresponding ID
          logger.info(
            `Adding new slug "${slug}" with ID: ${newId}. Request: ${request.method} ${request.url}`
          );
          parsedData[slug] = newId;
        }

        // Save updated data to Redis
        await redisService.setKey(cacheKey, JSON.stringify(parsedData));
        logger.info(
          `Successfully updated slugs file with new data in Redis. Request: ${request.method} ${request.url}`
        );

        let revalidateTagId: string | null = null;
        // Revalidate all paths for the new slugs
        Object.keys(slugs).forEach((slug) => {
          revalidatePath(slug);
          if (!revalidateTagId) {
            if (type === "project") {
              let id = parsedData[slug].split("_")[2].split("*")[0];
              revalidateTagId = id;
              revalidateTag(id);
            } else if (type === "builder") {
              revalidateTagId = slug;
              revalidateTag(slug);
            }
          }
        });
        type === "project" && revalidateTag("projectSlugs");
        return NextResponse.json(
          { message: "Slugs updated successfully" },
          { status: 200 }
        );
      }

      case "delete": {
        logger.info(
          `Action: delete. Request: ${request.method} ${request.url}`
        );
        if (!id) {
          logger.error(
            `Missing id parameter for deletion. Request: ${request.method} ${request.url}`
          );
          return NextResponse.json(
            { error: "Missing id parameter" },
            { status: 400 }
          );
        }

        let deleted = false; // Track whether a deletion occurs
        // Loop over keys and delete the ones that contain the id
        Object.keys(parsedData).forEach((key) => {
          if (type === "project" && parsedData[key].includes(`LT_${id}*`)) {
            logger.info(
              `Deleting slug "${key}" for ID: ${id}. Request: ${request.method} ${request.url}`
            );
            delete parsedData[key];
            if (!deleted) {
              revalidateTag(id);
              revalidatePath(key.split("/").slice(0, 6).join("/"));
              deleted = true;
            }
          } else if (
            type === "builder" &&
            id === parsedData[key].split("_")[1]
          ) {
            logger.info(
              `Deleting slug "${key}" for ID: ${id}. Request: ${request.method} ${request.url}`
            );
            delete parsedData[key];
            if (!deleted) {
              revalidatePath(key);
              deleted = true;
            }
          }
        });

        // If no deletions occurred, return an error
        if (!deleted) {
          logger.error(
            `${type} with id '${id}' does not exist. Request: ${request.method} ${request.url}`
          );
          return NextResponse.json(
            { error: `${type} with id '${id}' does not exist` },
            { status: 404 }
          );
        }

        // Save updated data back to Redis
        await redisService.setKey(cacheKey, JSON.stringify(parsedData));
        logger.info(
          `${type} with ID "${id}" deleted successfully. Request: ${request.method} ${request.url}`
        );

        return NextResponse.json(
          { message: `${type} deleted successfully` },
          { status: 200 }
        );
      }

      default:
        logger.error(
          `Invalid action parameter. Request: ${request.method} ${request.url}`
        );
        return NextResponse.json(
          { error: "Invalid action parameter" },
          { status: 400 }
        );
    }
  } catch (error) {
    logger.error(
      `Error processing POST request: ${error}. Request: ${request.method} ${request.url}`
    );
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    if (!type || (type !== "P" && type !== "B")) {
      logger.error(
        `Invalid type parameter. Request: ${request.method} ${request.url}`
      );
      return NextResponse.json(
        { error: "Invalid type parameter" },
        { status: 400 }
      );
    }

    const mappedType = typeMapping[type as keyof typeof typeMapping];
    const cacheKey = `${SlugsType.STATIC}:slug:${mappedType}`;

    // Get data from Redis cache
    const data = await redisService.getKey(cacheKey);

    if (!data) {
      logger.error(
        `No data found in Redis for type ${mappedType}. Request: ${request.method} ${request.url}`
      );
      return NextResponse.json({ error: "Data not found" }, { status: 404 });
    }

    logger.info(
      `GET request successful. Request: ${request.method} ${request.url}`
    );
    return NextResponse.json(JSON.parse(data), { status: 200 });
  } catch (error) {
    logger.error(
      `Error processing GET request: ${error}. Request: ${request.method} ${request.url}`
    );
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
