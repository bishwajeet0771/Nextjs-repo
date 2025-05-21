import path from "path";
import fs from "fs";
// import { cwd } from "process";

type Type = "property" | "project";
const getPageSlugs = async (type: Type) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/home-slugs`,
    {
      method: "POST",
      body: JSON.stringify({ type }),
      cache: "no-cache",
    }
  );
  const data = await res.json();
  return data.data;
};
// Cache Map
const cache = new Map<string, string[]>();
export async function generateHomePageSlugs(slugType: Type): Promise<any> {
  // Check if keys are cached
  let keys = cache.get(slugType);

  if (!keys) {
    const res = await getPageSlugs(slugType);
    // Fetch data and cache the keys
    const staticDir = path.join(process.cwd(), "static");
    const filePath = path.join(staticDir, `${slugType}SlugsHome.json`);
    // Ensure the 'static' directory exists
    if (!fs.existsSync(staticDir)) {
      fs.mkdirSync(staticDir);
    }
    // Convert the data object into JSON
    const jsonContent = JSON.stringify(res, null, 2);
    // Write the JSON data to the file
    fs.writeFileSync(filePath, jsonContent);
    keys = Object.keys(res);
    cache.set(slugType, keys);
  }
  // Map through the sliced keys and return the parameters
  const slugs = keys.map((data) => {
    return extracHomePageApitLocation(data);
  });

  return slugs;
}
interface Location {
  city: string;
  locality?: string; // Locality is optional
}

export function extracHomePageApitLocation(path: string): Location | null {
  // Split the path by '/'
  const segments = path.split("/").filter(Boolean); // Remove empty segments

  if (segments.length === 2) {
    // If there's only one segment, it's a city
    return { city: segments[1] };
  } else if (segments.length > 2) {
    // If there are multiple segments, it's a city and locality
    const citySegment = segments[1]; // Get the city segment
    const localitySegment = segments.slice(2).join("/"); // Join remaining segments as locality

    let res = {
      city: citySegment,
      ...(localitySegment && { locality: localitySegment.replace(/-/g, " ") }),
    };
    return res;
  }
  return null; // Return null if the path is invalid
}

export function getHomePageParamvalues(
  slug: string,
  type: "project" | "property"
) {
  // console.log(slug)
  const staticDir = path.join(process.cwd(), "static");
  const filePath = path.join(staticDir, `${type}SlugsHome.json`);
  const jsonData = fs.readFileSync(filePath, "utf8");
  const builderJsonData = JSON.parse(jsonData);
  // console.log(builderJsonData)
  for (const path in builderJsonData) {
    if (path.startsWith(slug)) {
      if (builderJsonData[path].includes("_")) {
        return builderJsonData[path].split("_")[0];
      }
      return builderJsonData[path];
    }
  }
  return null;
}
export const extractCityName = (name: string) => {
  return name
    .split("-in-")
    .pop()
    ?.replace(/-/g, " ")
    .replace(/\b\w/g, (str) => str.toUpperCase());
};
