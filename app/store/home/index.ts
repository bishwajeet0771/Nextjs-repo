import { atomWithReducer } from "jotai/utils";
interface SearchState {
  bhk: number[];
  propType: number | null;
  locality: string[];
  city: string | null;
  cg: string;
  bugdetValue: [number, number];
  showFilter: boolean;
}

const initialState: SearchState = {
  bhk: [],
  propType: null,
  locality: [],
  city: null,
  cg: "S",
  bugdetValue: [500000, 600000000],
  showFilter: false,
};

// Define the action types
type Action =
  | { type: "ADD_BHK"; payload: number }
  | { type: "ADD_PROP_TYPE"; payload: number }
  | { type: "ADD_LOCALITY"; payload: string }
  | { type: "SET_CITY"; payload: string }
  | { type: "REMOVE_LOCALITY"; payload: string }
  | { type: "RESET_FILTERS" }
  | { type: "SET_CG"; payload: string }
  | { type: "SET_BUGDET_VALUE"; payload: [number, number] }
  | { type: "SHOW_FILTER"; payload: boolean }
  | {
      type: "REMOVE_CITY";
    };

// Define the reducer function
const searchReducer = (state: SearchState, action: Action): SearchState => {
  switch (action.type) {
    case "ADD_BHK": {
      const newBhk = action.payload;
      // Check if the bhk value already exists
      const bhkExists = state.bhk.includes(newBhk);
      if (bhkExists) {
        // If it exists, remove it
        return {
          ...state,
          bhk: state.bhk.filter((bhk) => bhk !== newBhk),
        };
      } else {
        // If it does not exist, add it
        return {
          ...state,
          bhk: [...state.bhk, newBhk],
        };
      }
    }
    case "ADD_PROP_TYPE":
      if (state.propType === action.payload) {
        return { ...state, propType: null };
      } else return { ...state, propType: action.payload };
    case "ADD_LOCALITY":
      return { ...state, locality: [...state.locality, action.payload] };
    case "SET_CITY":
      return { ...state, city: action.payload };
    case "REMOVE_CITY": {
      return { ...state, city: null };
    }
    case "REMOVE_LOCALITY":
      return {
        ...state,
        locality: state.locality.filter((loc) => loc !== action.payload),
      };
    case "SET_CG":
      return { ...state, cg: action.payload };
    case "SET_BUGDET_VALUE":
      return { ...state, bugdetValue: action.payload };
    case "SHOW_FILTER":
      return { ...state, showFilter: action.payload };
    case "RESET_FILTERS":
      return initialState;
    default:
      // @ts-ignore
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

// Create the atom with reducer
export const homeSearchFiltersAtom = atomWithReducer(
  initialState,
  searchReducer
);
