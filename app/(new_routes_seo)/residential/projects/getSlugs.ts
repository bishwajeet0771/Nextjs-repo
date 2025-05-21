import fs from "fs";
import path from "path";
async function getProjectSlug(pathname: string) {
  const staticDir = path.join(process.cwd(), "static");
  const filePath = path.join(staticDir, "projectSlugs.json");
  console.time("getProjectSlugs");
  try {
    const jsonData = fs.readFileSync(filePath, "utf8");
    const builderJsonData = JSON.parse(jsonData);

    // Return the ID for the given pathname
    return builderJsonData[pathname] || null;
  } catch (error) {
    console.log(error);
  } finally {
    console.timeEnd("getProjectSlugs");
  }
  // Read the JSON file
}

export default getProjectSlug;
