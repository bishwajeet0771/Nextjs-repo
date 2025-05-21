/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import { atomWithReducer } from "jotai/utils";
import { useCallback, useEffect } from "react";

interface FloorPlanState {
  floorplans: any[];
  filteredFloorplans: any[]; // New state for filtered data
  filters: Record<string, string>; // Changed filters to object key value
  selectedFilters: Record<string, string | null>; // Keep track of applied filters
  selectedFloor: any; // New state for selected floor
  loading: boolean;
  error: string | null;
}

const initialState: FloorPlanState = {
  floorplans: [],
  filteredFloorplans: [], // Initialize filtered state
  filters: {}, // Initialize filters as an object
  selectedFilters: {}, // Initialize selected filters
  selectedFloor: null, // Initialize selected floor
  loading: false,
  error: null,
};

type Action =
  | { type: "SET_FLOORPLANS"; payload: any[] }
  | { type: "SET_FILTERED_FLOORPLANS"; payload: any[] }
  | { type: "ADD_FILTER"; payload: { key: string; value: string } }
  | { type: "REMOVE_FILTER"; payload: string }
  | { type: "REMOVE_ALL_FILTERS" }
  | { type: "SET_FILTERS"; payload: Record<string, string> } // Changed payload type to match new filters structure
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_SELECTED_FLOOR"; payload: any }; // New action for setting selected floor

const floorPlanReducer = (
  state: FloorPlanState,
  action: Action
): FloorPlanState => {
  switch (action.type) {
    case "SET_FLOORPLANS":
      return {
        ...state,
        floorplans: action.payload,
        filteredFloorplans: action.payload,
      };
    case "SET_FILTERED_FLOORPLANS":
      return { ...state, filteredFloorplans: action.payload };
    case "ADD_FILTER":
      return {
        ...state,
        selectedFilters: {
          ...state.selectedFilters,
          [action.payload.key]: action.payload.value,
        },
      };
    case "REMOVE_FILTER": {
      const updatedFilters = { ...state.selectedFilters };
      delete updatedFilters[action.payload];
      return {
        ...state,
        selectedFilters: updatedFilters,
      };
    }
    case "REMOVE_ALL_FILTERS":
      return { ...state, selectedFilters: {} };
    case "SET_FILTERS":
      return { ...state, filters: action.payload }; // Changed to match new filters structure
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_SELECTED_FLOOR":
      return { ...state, selectedFloor: action.payload }; // New case for setting selected floor
    default:
      return state;
  }
};
// hello
export const floorPlanStoreAtom = atomWithReducer(
  initialState,
  floorPlanReducer
);
export const useFloorPlanStore = () => {
  const [state, dispatch] = useAtom(floorPlanStoreAtom);

  const setFloorplans = (newFloorplans: any[]) => {
    dispatch({ type: "SET_FLOORPLANS", payload: newFloorplans });
  };

  const addFilter = (key: string, value: string) => {
    dispatch({ type: "ADD_FILTER", payload: { key, value } });
  };

  const removeFilter = (key: string) => {
    dispatch({ type: "REMOVE_FILTER", payload: key });
  };

  const removeAllFilters = () => {
    dispatch({ type: "REMOVE_ALL_FILTERS" });
  };
  const setSelectedFloor = (floor: any) => {
    dispatch({ type: "SET_SELECTED_FLOOR", payload: floor });
  };
  const applyFilters = useCallback(() => {
    const { floorplans, selectedFilters } = state;
    // console.log(selectedFilters);
    const filteredData = floorplans.filter((item: any) => {
      return Object.keys(selectedFilters).every((key) => {
        const filterValue = selectedFilters[key];
        return (
          !filterValue ||
          String(item[key]).toLowerCase() === filterValue.toLowerCase()
        );
      });
    });
    dispatch({ type: "SET_FILTERED_FLOORPLANS", payload: filteredData });
  }, [dispatch, state]);

  const getOptions = (property: string): string[] => {
    const { floorplans, selectedFilters } = state;
    const filteredData = floorplans.filter((item: any) => {
      return Object.keys(selectedFilters).every(
        (key) =>
          !selectedFilters[key] ||
          String(item[key]).toLowerCase() ===
            selectedFilters[key]?.toLowerCase()
      );
    });
    const options = Array.from(
      new Set(
        filteredData.map((item: any) => {
          return String(item[property]);
        })
      )
    );
    return options.sort();
  };

  const processDataWithWorker = (data: any[]) => {
    dispatch({ type: "SET_LOADING", payload: true });
    const worker = new Worker(new URL("./worker.js", window.location.origin));
    worker.onmessage = (e) => {
      const result = e.data;
      setFloorplans(result);
      dispatch({ type: "SET_LOADING", payload: false });
    };
    worker.onerror = (error) => {
      dispatch({ type: "SET_ERROR", payload: error.message });
      dispatch({ type: "SET_LOADING", payload: false });
    };
    worker.postMessage({ data });
  };

  const handleOnChange = (value: string, key: string) => {
    addFilter(key, value);
  };
  useEffect(() => {
    applyFilters();
  }, []);
  return {
    state,
    setFloorplans,
    addFilter,
    removeFilter,
    removeAllFilters,
    getOptions,
    processDataWithWorker,
    handleOnChange,
    setSelectedFloor,
  };
};
