import { SearchFilter } from "@/app/types/search";
import { atom } from "jotai";
import { atomWithReducer } from "jotai/utils";
import parseProjectSearchQueryParams from "../utils/parse-project-searchqueryParams";
import { projectprops } from "@/app/data/projectDetails";

export const initialState: SearchFilter = {
  current: null,
  localities: [],
  propType: null,
  bhk: [],
  bathroom: [],
  parking: [],
  amenities: [],
  listedBy: undefined,
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
  cg: undefined,
  projIdEnc: null,
  lat: null,
  lng: null,
  isUsed: null,
  projName: null,
  phaseId: [],
};
let RENT_BUGDET_VALUE = [0, 100000];

type Action =
  | { type: "reset" }
  | { type: "update"; payload: Partial<SearchFilter> }
  | { type: "pushToArray"; payload: { key: keyof SearchFilter; value: any } }
  | {
      type: "removeFromArray";
      payload: { key: keyof SearchFilter; value: any };
    }
  | { type: "updateAreaValue"; payload: { min?: number; max?: number } }
  | { type: "updateBudgetValue"; payload: { min?: number; max?: number } }
  | { type: "clearArray"; payload: keyof SearchFilter }
  | {
      type: "toggleArrayValue";
      payload: { key: keyof SearchFilter; value: any };
    }
  | { type: "SET_FILTERS"; payload: SearchFilter };

const mapReducer = (state: SearchFilter, action: Action): SearchFilter => {
  switch (action.type) {
    case "reset":
      return initialState;
    case "update":
      var newData =
        action.payload.propType === projectprops.plot
          ? { ...action.payload, bhk: [] }
          : // action.payload.bhk !== undefined && action.payload.bhk.length > 0  ? {...action.payload, propType: null} :
            { ...action.payload };

      return {
        ...state,
        ...newData,
      };
    case "pushToArray": {
      const { key, value } = action.payload;
      if (Array.isArray(state[key])) {
        if ((state[key] as any[]).includes(value)) {
          return state;
        }
        return {
          ...state,
          [key]: [...(state[key] as any[]), value],
        };
      }
      return state;
    }
    case "removeFromArray": {
      const { key, value } = action.payload;
      if (Array.isArray(state[key])) {
        return {
          ...state,
          [key]: (state[key] as any[]).filter((item) => item !== value),
        };
      }
      return state;
    }

    case "clearArray": {
      const key = action.payload;
      if (Array.isArray(state[key])) {
        return {
          ...state,
          [key]: [],
        };
      }
      return state;
    }

    case "toggleArrayValue": {
      const { key, value } = action.payload;
      if (Array.isArray(state[key])) {
        const array = state[key] as any[];
        if (!array.includes(value)) {
          return {
            ...state,
            [key]: [...array, value],
          };
        } else {
          return {
            ...state,
            [key]: array.filter((item) => item !== value),
          };
        }
      }
      return state;
    }

    case "updateAreaValue": {
      const { min, max } = action.payload;
      const [currentMin, currentMax] = state.areaValue;
      return {
        ...state,
        areaValue: [
          min !== undefined ? min : currentMin,
          max !== undefined ? max : currentMax,
        ],
      };
    }

    case "updateBudgetValue": {
      const { min, max } = action.payload;
      const [currentMin, currentMax] = state.bugdetValue;
      return {
        ...state,
        bugdetValue: [
          min !== undefined ? min : currentMin,
          max !== undefined ? max : currentMax,
        ],
      };
    }

    case "SET_FILTERS":
      return action.payload;

    default:
      return state;
  }
};
export const ProjSearchAppliedFiltersStore = atom(
  null,
  (
    get,
    set,
    setInQueryParams: any,
    type: "clear" | "add",
    clearType?:
      | "clearAll"
      | "bhk"
      | "area"
      | "budget"
      | "unitType"
      | "listing"
      | "phaseId"
  ) => {
    const appliedFilters = get(projSearchStore);
    let queryString: string | null = "";
    if (type === "add") {
      for (const [key, value] of Object.entries(appliedFilters)) {
        // Skip areaValue and bugdetValue if they match initial values
        if (
          ((key === "areaValue" || key === "bugdetValue") &&
            Array.isArray(value) &&
            value[0] === initialState[key][0] &&
            value[1] === initialState[key][1]) ||
          (key === "bugdetValue" &&
            appliedFilters.cg === "R" &&
            value[0] == RENT_BUGDET_VALUE[0] &&
            value[1] == RENT_BUGDET_VALUE[1])
        ) {
          continue;
        }

        if (Array.isArray(value)) {
          if (value.length > 0) {
            queryString += `${queryString ? "-" : ""}${key}=${value}`;
          }
        } else if (value != null) {
          queryString += `${queryString ? "-" : ""}${key}=${value}`;
        }
      }
    } else if (type === "clear") {
      // const getParams = new URLSearchParams(window.location.search);
      // queryString = getParams.get("sf") ?? "";
      switch (clearType) {
        case "clearAll":
          queryString = "";
          set(projSearchStore, { type: "reset" });
          break;
        case "bhk":
          queryString = queryString.replace(/-bhk=[^&]*/g, "");
          set(projSearchStore, {
            type: "update",
            payload: { bhk: initialState.bhk },
          });
          break;
        case "phaseId":
          queryString = queryString.replace(/-phaseId=[^&]*/g, "");
          set(projSearchStore, {
            type: "update",
            payload: { phaseId: initialState.phaseId },
          });
          break;
        case "area":
          queryString = queryString.replace(/-area=[^&]*/g, "");
          break;
        case "budget":
          queryString = queryString.replace(/-bugdetValue=[^&]*/g, "");
          set(projSearchStore, {
            type: "update",
            payload: { bugdetValue: initialState.bugdetValue },
          });
          break;
        case "unitType":
          queryString = queryString.replace(/-propType=[^&]*/g, "");
          set(projSearchStore, {
            payload: { propType: initialState.propType },
            type: "update",
          });
          break;
        case "listing":
          {
            const getParams = new URLSearchParams(window.location.search);
            let listedBy =
              getParams.get("sf")?.match(/listedBy=[^-\s]+/)?.[0] ?? "";

            let finalKey =
              listedBy !== "" ? listedBy.split("=")[1].split("-")[0] : null;
            if (listedBy) {
              queryString = `listedBy=${finalKey}`;
            }
            set(projSearchStore, {
              payload: { ...initialState, listedBy: finalKey },
              type: "update",
            });
          }
          break;
      }
    }
    setInQueryParams(queryString || null);
    return appliedFilters;
  }
);

export const searchPageMapToggle = atom(false);

export const projSearchStore = atomWithReducer(initialState, mapReducer);

projSearchStore.onMount = (setAtom) => {
  const path = window.location.pathname;
  const searchParams = new URLSearchParams(window.location.search);
  if (path.includes("search") || searchParams.size > 0) {
    setAtom({
      type: "SET_FILTERS",
      payload: parseProjectSearchQueryParams(searchParams.get("sf") || ""),
    });
  }
};

export const diffToProjFromListing = {
  proj: [
    "facings",
    "furnish",
    "propStatus",
    "listedBy",
    "sortByfield",
    "sortType",
  ],
  A: ["current", "reraVerified", "builderIds", "sortByfield", "sortType"],
  I: ["current", "reraVerified", "builderIds", "sortByfield", "sortType"],
  B: ["current", "reraVerified", "builderIds", "sortByfield", "sortType"],
  All: [
    "facings",
    "furnish",
    "propStatus",
    "listedBy",
    "sortByfield",
    "sortType",
  ],
};
