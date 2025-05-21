import path from "path";
import fs from "fs";
// import logger from "@/app/utils/logger";
// import { headers } from "next/headers";

export async function findSeoParams(inputUrl: string) {
  console.time("dynamic");
  const staticDir = path.join(process.cwd(), "static");
  const filePath = path.join(staticDir, "case-seo.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  const builderJsonData = JSON.parse(jsonData);
  for (const path in builderJsonData) {
    if (path == inputUrl) {
      return builderJsonData[path];
    }
  }

  return null;
}
export function extractCaseSeoParams(values: string) {
  const result: any = {};
  let count = 0;

  const parts = values.split("-");

  const inIndex = parts.findIndex((p) => p.toLowerCase() === "in");
  const bengaluruIndex = parts.findIndex(
    (p) => p.toLowerCase() === "bengaluru"
  );

  if (inIndex !== -1 && bengaluruIndex !== -1 && inIndex < bengaluruIndex) {
    // Get locality name between "in" and "bengaluru"
    const localityParts = parts.slice(inIndex + 1, bengaluruIndex);
    const localityName = localityParts.join(" ");
    result.localityName = localityName;
  }

  // Process predefined keywords
  parts.forEach((part) => {
    // Extract numeric and letter parts
    const number = part.replace(/[A-Za-z]/g, "");
    const letter = part.includes("PJ")
      ? "PJ"
      : part.replace(/[0-9]/g, "").toUpperCase();

    const PJ = part.includes("PJ") ? part.split("PJ")[0] : "N/A";

    switch (letter) {
      case "B": // BHK
        result.B = number;
        count++;
        break;
      case "RCG":
      case "R": // Category
        result.CG = "R";
        count++;
        break;
      case "C": // City
        result.C = number;
        count++;
        break;
      case "L": // Locality
        result.L = number;
        count++;
        break;
      case "P": // Property Type
        result.P = number;
        count++;
        break;
      case "PJ":
        console.log({});
        result.PJ = PJ;
        count++;
        break;
    }
  });
  // B CG C L P
  return { ...result, count };
}
