// import { getPagesSlugs } from "@/app/seo/api";
import React from "react";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import ListingSearchPage from "../../searchOldPage/listing/Page/ListingSearchPage";
// import { useHydrate } from "react-query";
// import { searachFilterAtom } from "@/app/store/search";
// import { useHydrateAtoms } from "jotai/utils";
type Props = {
  params: { slug: string };
};
async function getSeoSlugs(pathname: string) {
  const staticDir = path.join(process.cwd(), "static");
  const filePath = path.join(staticDir, "seoSlugs.json");

  console.time("getSeoSlugs"); // Start timing

  try {
    // Read the JSON file asynchronously
    const jsonData = await fs.readFileSync(filePath, "utf-8");
    const builderJsonData = JSON.parse(jsonData);

    return builderJsonData[pathname];
  } catch (error) {
    console.error("Error reading or parsing file:", error);
    return null;
  } finally {
    console.timeEnd("getSeoSlugs"); // End timing and log the duration
  }
}
export default async function Page({ params }: Props) {
  const seoSlug = await getSeoSlugs(params.slug);
  if (!seoSlug) {
    notFound();
  }
  const filters = seoSlug.split("_");
  const serverData = await getSearchData(filters);
  const frontendFilters = mapFiltersToFrontEnd(filters);
  return (
    <ListingSearchPage
      serverData={serverData}
      frontendFilters={frontendFilters}
    />
  );
}
// export const dynamic = "force-dynamic";
const builderSlugsMap = new Map<string, string>([
  ["B", "bhk"], //unitTypes
  ["L", "localities"], //localities
  ["CG", "cg"], //cg
  ["C", "city"], //NOT INCLUDE
  ["P", "propType"], //propTypes
]);

const FrontEndFilters = new Map<string, string>([
  ["B", "unitTypes"],
  ["L", "localities"],
  ["CG", "cg"],
  ["P", "propTypes"],
]);

type QueryParams = {
  [key: string]: string | undefined;
};
function mapFiltersToFrontEnd(filters: string[]) {
  const queryParams: { [key: string]: any } = {};

  filters.forEach((filter) => {
    const match = filter.match(/(\d+)?%?(\w+)/); // Regex to capture numbers and letters
    if (match) {
      const [, value, key] = match;
      const mappedKey = FrontEndFilters.get(key);

      if (mappedKey) {
        if (mappedKey === "unitTypes" || mappedKey === "localities") {
          // Initialize as array if not already
          if (!queryParams[mappedKey]) {
            queryParams[mappedKey] = [];
          }
          // Push the value into the array
          queryParams[mappedKey].push(
            mappedKey === "localities" ? `value` : Number(value)
          );
        } else {
          // Assign the value directly for single value keys
          queryParams[mappedKey] =
            mappedKey === "propTypes" ? Number(value) : value;
        }
      }
    }
  });

  return queryParams;
}
// Function to parse filters into query parameters
const parseFilters = (filters: string[]): QueryParams => {
  const queryParams: QueryParams = {};

  filters.forEach((filter) => {
    const match = filter.match(/(\d+)?%?(\w+)/); // Regex to capture numbers and letters
    if (match) {
      const [, percentage, key] = match;
      const mappedKey = builderSlugsMap.get(key);

      if (mappedKey) {
        queryParams[mappedKey] = percentage || key; // Use the percentage if available, otherwise use the key
      }
    }
  });

  return queryParams;
};

// Function to get search data from the API
const getSearchData = async (filters: string[]): Promise<any> => {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/prop-search?page=0`;
    const queryParams = parseFilters(filters);
    const queryString = new URLSearchParams({
      city: "9", // default city param
      ...queryParams,
    }).toString();
    const url = `${baseUrl}&${queryString}`;

    const res = await fetch(url, {
      next: {
        revalidate: 60,
      },
    });

    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// export async function generateStaticParams() {
//   // const resObject = await getPagesSlugs("case-seo");
//   const res = {
//     "5-bhk-plot-for-buy-in-bengaluru": "683%B_32%P_S%CG_9%C",
//     "3-bhk-with-servant-apartment-in-rainbow-drive": "46%B_35%P_456%L",
//     "3-bhk-villament-for-buy-in-nagasandra": "45%B_34%P_S%CG_419%L",
//     "5-bhk-independent-house/building-in-kpc-layout": "683%B_36%P_366%L",
//     "1-rk-flat-for-sale-in-sadashiva-nagar-bengaluru":
//       "40%B_35%P_S%CG_481%L_9%C",
//     "3-bhk-with-servant-row-house-for-buy-in-cooke-town":
//       "46%B_33%P_S%CG_147%L",
//     "4.5-bhk-with-servant-villa-for-sale-in-ashwath-nagar":
//       "682%B_31%P_S%CG_53%L",
//     "5-bhk-with-servant-for-sale-in-thyagarajanagar": "684%B_S%CG_534%L",
//     "villa-for-buy-in-itc-factory": "31%P_S%CG_266%L",
//     "villament-for-rent-in-hennur-bengaluru": "34%P_R%CG_226%L_9%C",
//     "4-bhk-villa-for-buy-in-peenya-bengaluru": "49%B_31%P_S%CG_447%L_9%C",
//     "4.5-bhk-villament-for-sale-in-sadduguntepalya": "681%B_34%P_S%CG_482%L",
//     "3.5-bhk-apartment-for-rent-in-ramagondanahalli": "47%B_35%P_R%CG_461%L",
//   };
//   // Convert the `res` object into a regular object (not a Map)
//   // const resObject = { ...res };

//   const staticDir = path.join(process.cwd(), "static");
//   const filePath = path.join(staticDir, "seoSlugs.json");

//   // Ensure the 'static' directory exists
//   if (!fs.existsSync(staticDir)) {
//     fs.mkdirSync(staticDir);
//   }

//   // Convert the object to a JSON string
//   const jsonContent = JSON.stringify(res, null, 2);

//   // Write the JSON content to the file
//   fs.writeFileSync(filePath, jsonContent);

//   console.log(`JSON data has been saved to ${filePath}`);

//   // Prepare the slugs for static generation
//   const builderRess = Object.keys(res);
//   const slugs = builderRess.map((data) => ({
//     slug: data.replace(/\//g, ""),
//   }));
//   console.log(slugs);
//   return slugs;
// }
// export const dynamic = "force-dynamic";
