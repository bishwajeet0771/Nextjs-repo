interface Params {
  [key: string]: any;
}

const convertToQueryParams = (params: Params): string => {
  const queryParams: string[] = [];

  const paramMappings: { [key: string]: string } = {
    localities: "localities",
    city: "city",
    propTypes: "propType",
    unitTypes: "bhk",
    bathRooms: "bathroom",
    parkings: "parking",
    amenities: "amenities",
    listedBy: "listedBy",
    reraIds: "reraIds",
    minArea: "minArea",
    maxArea: "maxArea",
    minPrice: "minPrice",
    maxPrice: "maxPrice",
    projStatus: "projStatus",
    builderIds: "builderIds",
    facings: "facing",
    furnish: "furnish",
    propStatus: "propStatus",
    pnb: "pnb",
    sortByfield: "sortByfield",
    sortType: "sortType",
    cg: "cg",
    projIdEnc: "projIdEnc",
    lat: "lat",
    lng: "lng",
  };

  for (const key in params) {
    if (
      Object.prototype.hasOwnProperty.call(params, key) &&
      params[key] !== null &&
      params[key] !== undefined
    ) {
      if (Array.isArray(params[key])) {
        // If the value is an array, join its elements with ","
        const value = `${paramMappings[key]}=${params[key].join(",")}`;

        queryParams.push(value);
      } else {
        // Convert the value to crores or lakhs if necessary
        let value = params[key];
        if (key === "minPrice" || key === "maxPrice") {
          value;
        } else if (key === "city") {
          value = params[key].split("+")[1];
        } else if (key === "localities" || key === "builderIds") {
          params[key] = extractNumbersFromString(value);
        }
        // Otherwise, add the key-value pair directly
        queryParams.push(`${paramMappings[key]}=${value}`);
      }
    }
  }

  return queryParams.join("&");
};
function createQueryString(params: Record<string, any>): string {
  const queryStringParts: string[] = [];

  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined) {
      queryStringParts.push(`${key}=${value}`);
    }
  }

  return queryStringParts.join("&");
}
const createRequestParams = (params: Params): Params => {
  const requestParams: Params = {};

  for (const key in params) {
    if (
      Object.prototype.hasOwnProperty.call(params, key) &&
      params[key] !== null &&
      params[key] !== undefined
    ) {
      requestParams[key] = params[key];
    }
  }

  return requestParams;
};
function extractNumbersFromString(str: string): string {
  // Split the string by '+'
  const parts: string[] = str.split(",");
  const values = parts.map((part) => {
    return part.replace(/\D/g, "");
  });

  return values.join(",");
}

export { convertToQueryParams, createRequestParams, createQueryString };
