// eslint-disable-next-line import/no-cycle
import { SearchFilterOld } from "@/app/store/search";

export const filtersParserToQueryParams = (data: SearchFilterOld) => {
  const parsedData: any = {};

  parsedData.localities = data.locality;
  parsedData.city = data.current; // Assuming current represents city ID
  parsedData.projStatus = null; // Need to handle project status
  parsedData.propType = data.propTypes;
  parsedData.bhk = data.unitTypes;
  parsedData.minPrice = data.bugdetValue[0];
  parsedData.maxPrice = data.bugdetValue[1];
  parsedData.minArea = data.areaValue[0];
  parsedData.maxArea = data.areaValue[1];
  parsedData.bathroom = data.bathRooms;
  parsedData.parking = data.parkings;
  parsedData.amenities = data.amenities;
  parsedData.postedBy = null; // Need to handle postedBy
  parsedData.builderIds = null; // Need to handle builderIds

  // Construct query parameters
  let queryParams = "";
  for (const key in parsedData) {
    if (parsedData[key] !== null && parsedData[key] !== undefined) {
      if (Array.isArray(parsedData[key]) && parsedData[key].length > 0) {
        // Handle arrays by joining elements with commas
        queryParams += `&${key}=${parsedData[key].join(",")}`;
      } else if (!Array.isArray(parsedData[key])) {
        // Handle other types directly
        queryParams += `&${key}=${parsedData[key]}`;
      }
    }
  }

  return queryParams;
};
export const propertiesToProcess: { [key: string]: string } = {
  localities: "locality",
  city: "current",
  propTypes: "propTypes",
  unitTypes: "unitTypes",
  bathRooms: "bathRooms",
  parkings: "parkings",
  amenities: "amenities",
  listedBy: "listedBy",
  reraVerified: "reraVerified",
  minArea: "areaValue",
  maxArea: "areaValue",
  minPrice: "bugdetValue",
  maxPrice: "bugdetValue",
};

export const filterParser = (data: SearchFilterOld) => {
  const parsedData: any = {};

  // Define the properties to be processed
  const propertiesToProcess: { [key: string]: string } = {
    localities: "locality",
    projStatus: "current",
    propTypes: "propTypes",
    unitTypes: "unitTypes",
    bathRooms: "bathRooms",
    parkings: "parkings",
    amenities: "amenities",
    listedBy: "listedBy",
    reraIds: "reraVerified",
    minArea: "areaValue",
    maxArea: "areaValue",
    minPrice: "bugdetValue",
    maxPrice: "bugdetValue",
    builderIds: "builderIds",
    city: "city",
    facings: "facings",
    furnish: "furnish",
    propStatus: "propStatus",
    pnb: "pnb",
    sortByfield: "sortByfield",
    sortType: "sortType",
    cg: "cg",
    projIdEnc: "projIdEnc",
  };

  // Iterate through each property
  for (const [parsedKey, dataKey] of Object.entries(propertiesToProcess)) {
    // @ts-ignore
    const value = data[dataKey];

    // Check if the value is a default value (null, empty array, or default range)
    const isDefaultValue =
      (Array.isArray(value) && value.length === 0) ||
      (Array.isArray(value) && value[0] === 0 && value[1] === 5000) ||
      (Array.isArray(value) &&
        (value[0] === 500000 || value[0] === 0) &&
        (value[1] === 600000000 || value[1] === 100000)) ||
      value === null;

    // If it's a default value, assign null to the parsed key
    if (isDefaultValue) {
      parsedData[parsedKey] = null;
    } else {
      // Process non-default values
      if (
        parsedKey === "minArea" ||
        parsedKey === "maxArea" ||
        parsedKey === "minPrice" ||
        parsedKey === "maxPrice"
      ) {
        const intValue = parseFloat(value[parsedKey.includes("min") ? 0 : 1]);
        if (!isNaN(intValue)) {
          parsedData[parsedKey] = intValue;
        }
      }

      if (Array.isArray(value) && value.length > 0) {
        if (
          parsedKey !== "minArea" &&
          parsedKey !== "maxArea" &&
          parsedKey !== "minPrice" &&
          parsedKey !== "maxPrice"
        ) {
          // if (parsedKey === "builderIds") {
          //   parsedData[parsedKey] = value
          //     .map((v: string) => v.split("+")[1])
          //     .join(",");
          // } else {
          parsedData[parsedKey] = value.join(",");
          // }
        }
      } else if (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        !Array.isArray(value)
      ) {
        // if (parsedKey === "city") {
        //   console.log(parsedKey);
        //   parsedData[parsedKey] = value.split("+")[1];
        // } else {
        parsedData[parsedKey] = value;
        // }
        // parsedData[parsedKey] = value;
      }
    }
  }

  return parsedData;
};
