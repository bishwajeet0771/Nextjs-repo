/* eslint-disable no-unused-vars */
import axios from "axios";

export const getSearchData = async (page = 0, apiFilterQueryParams: string) => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/searchproj?page=${page}`;
  if (apiFilterQueryParams.includes("listedBy")) {
    url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/prop-search?page=${page}`;
  }
  let queryparams = parseApiFilterQueryParams(apiFilterQueryParams);
  const res = await fetch(`${url}${queryparams ? `&${queryparams}` : ""}`, {
    cache: "no-store",
  });
  return await res.json();
};
export const getListingSearchData = async (
  page = 0,
  apiFilterQueryParams: string
) => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/prop-search?page=${page}`;
  if (apiFilterQueryParams.includes("listedBy=proj")) {
    url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/searchproj?page=${page}`;
    let queryparams = parseApiFilterQueryParams(apiFilterQueryParams);
    const res = await axios.get(
      `${url}${queryparams ? `&${queryparams}` : ""}`
    );
    return res.data;
  }
  let queryparams = parseApiFilterQueryParams(apiFilterQueryParams);

  const res = await axios.get(`${url}${queryparams ? `&${queryparams}` : ""}`);
  return res.data;
};

export const parseApiFilterQueryParams = (
  apiFilterQueryParams: string
): string => {
  console.log({ apiFilterQueryParams });
  // Directly process the input string in a single pass

  const transformedParams = apiFilterQueryParams
    .replace(/bugdetValue/gi, "budget") // Replace keys using hardcoded pattern
    .replace(/budget=(\d+),(\d+)/, "minPrice=$1&maxPrice=$2") // Budget transformation
    .replace(/areaValue=(\d+),(\d+)/, "minArea=$1&maxArea=$2")
    .replace(
      /(localities|builderIds|phaseId)=([^&]+)/g,
      (_, key, value) =>
        `${key}=${value
          .split(",")
          .map((part: any) => part.split("+")[1])
          .filter(Boolean)
          .join(",")}`
    )
    .replace(
      /city=([^\s&]*)(\+(\d+))?/,
      (_, baseCity, __) => `city=${baseCity.split("+")[1] ?? "9"}`
    )
    .replace(/listedBy=All/g, "") // Remove 'listedBy=All'
    .replace(/-/g, "&"); // Replace dashes with ampersands
  let updatedParams = apiFilterQueryParams.includes("cg=")
    ? transformedParams
    : `${transformedParams}&cg=S`;

  return updatedParams.includes("city=")
    ? updatedParams
    : `${updatedParams}&city=9`;
 
};
