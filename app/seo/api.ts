// // Cache map to store responses for each pageType
// const pageTypeCache = new Map<string, any>();

// const getPagesSlugs = async (
//   pageType: "builder-list" | "project-list" | "case-seo" | "listing-search-seo"
// ) => {
//   try {
//     // Check if response is cached for this pageType
//     if (pageTypeCache.has(pageType)) {
//       return pageTypeCache.get(pageType);
//     }

//     let url;
//     if (pageType === "project-list") {
//       // Read from local.json for project-list
//       const fs = require("fs");
//       const path = require("path");
//       const localJsonPath = path.join(process.cwd(), "static", "local.json");
//       const localData = JSON.parse(fs.readFileSync(localJsonPath, "utf8"));
//       return localData;
//     } else {
//       url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/${pageType}`;
//     }
//     const res = await fetch(url, {
//       method: "POST",
//       cache: "no-store",
//     });
//     const data = await res.json();

//     let result;
//     if (pageType === "listing-search-seo") {
//       result = data.status ? data.urlMap : {};
//     } else if (pageType === "builder-list" || pageType === "case-seo") {
//       result = data;
//     }

//     // Cache the result
//     pageTypeCache.set(pageType, result);
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// };
// function extractID(url: string): string {
//   // Check if the string contains an underscore
//   if (url.includes("_")) {
//     const parts = url.split("_");
//     return parts.pop() || url; // Return the ID or fallback to the original URL part
//   }
//   // If no underscore, return the entire string
//   return url;
// }
// export { getPagesSlugs, extractID };

// Cache map to store responses for each pageType
const pageTypeCache = new Map<string, any>();

const getPagesSlugs = async (
  pageType: "builder-list" | "project-list" | "case-seo" | "listing-search-seo"
) => {
  try {
    // Check if response is cached for this pageType
    if (pageTypeCache.has(pageType)) {
      return pageTypeCache.get(pageType);
    }

    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/${pageType}`;
    const res = await fetch(url, {
      method: "POST",
      cache: "no-store",
    });
    const data = await res.json();

    let result;
    if (pageType === "listing-search-seo") {
      result = data.status ? data.urlMap : {};
    } else if (pageType === "project-list") {
      result = data;
    } else {
      result = data;
    }

    // Cache the result
    pageTypeCache.set(pageType, result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
function extractID(url: string): string {
  // Check if the string contains an underscore
  if (url.includes("_")) {
    const parts = url.split("_");
    return parts.pop() || url; // Return the ID or fallback to the original URL part
  }
  // If no underscore, return the entire string
  return url;
}
export { getPagesSlugs, extractID };
