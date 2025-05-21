import { SearchFilter } from "@/app/types/search";

export const initialState: SearchFilter = {
  current: null,
  localities: [],
  propType: null,
  bhk: [],
  bathroom: [],
  parking: [],
  amenities: [],
  listedBy: null,
  reraVerified: [],
  areaValue: [0, 5000],
  bugdetValue: [500000, 600000000],
  builderIds: [],
  city: null,
  facing: [],
  furnish: null,
  propStatus: null,
  projStatus: null,
  pnb: null,
  sortByfield: null,
  sortType: null,
  cg: null,
  projIdEnc: null,
  lat: null,
  lng: null,
  projName: null,
  phaseId: [],
};

export default function parseProjectSearchQueryParams(params: string) {
  if (!params) return initialState;
  const filters: any = {};
  const paramPairs = params.split("-");
  const pairsLength = paramPairs.length;

  for (let i = 0; i < pairsLength; i++) {
    const [key, value] = paramPairs[i].split("=");
    if (!key || !value) continue;
    // Check for special cases first to avoid multiple string operations
    if (key === "areaValue" || key === "bugdetValue") {
      const [min, max] = value.split(",");
      filters[key] = [+min, +max];
      continue;
    }
    if (key === "cg" && value === "R" ) {
      filters.bugdetValue = [0, 1000000]
    }else if (key === "cg" && value === "S" ) {
      filters.bugdetValue = [500000, 600000000]
    }
    const hasComma = value.indexOf(",") !== -1;
    if (
      hasComma ||
      key === "bathroom" ||
      key === "amenities" ||
      key === "parking" ||
      key === "bhk" ||
      key === "builderIds" ||
      key === "facings" ||
      key === "localities" ||
      key === "phaseId"
    ) {
      if (key === "localities" || key === "builderIds" || key === "phaseId") {
        filters[key] = value.split(",").map(String);
      } else {
        filters[key] = value.includes(",")
          ? value.split(",").map(Number)
          : [Number(value)];
      }
    } else {
      // Convert single values based on key type
      if (
        key === "propType" ||
        key === "lat" ||
        key === "lng" ||
        key === "projStatus" ||
        key === "furnish" ||
        key === "pnb"
     
      ) {
        filters[key] = Number(value);
      } else if (key === "bhk") {
        filters[key] = [Number(value)];
        
      }
      else if (key === "page") {
        filters['currentPage'] = Number(value) 
      }
      else {
        filters[key] = value;
      }
    }
  }
  return { ...initialState, ...filters };
}
