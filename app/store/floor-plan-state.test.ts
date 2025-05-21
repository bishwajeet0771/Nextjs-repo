import { atom } from "jotai";
import { selectAtom } from "jotai/utils";
import { PropertyUnit } from "../components/project/newFloorPlan/types/floor-plan";
import { UNIT_DATA_KEYS } from "../components/project/newFloorPlan/utils/generateuniqueoptions";

// Define interfaces
interface UnitFilters {
  unitNumber: string;
  bhkName: string;
  towerName: string;
  floor: string;
  facingName: string;
  block: string;
  plotArea: string;
  width: string;
  length: string;
}

interface ModalState {
  isOpen: boolean;
  unit: PropertyUnit | null;
  isPartialUnit: boolean;
}

interface FullScreenModalState {
  isOpen: boolean;
  unit: PropertyUnit | null;
}

interface FloorPlanState {
  selectedPropertyType: string;
  selectedView: string;
  selectedBHK: string;
  unitFilters: UnitFilters;
  modalState: ModalState;
  fullScreenModalState: FullScreenModalState;
  rightSideUnit: PropertyUnit | null;
  projectUnits: PropertyUnit[];
}

// Initial states
const initialUnitFilters: UnitFilters = {
  unitNumber: "",
  bhkName: "",
  towerName: "",
  floor: "",
  facingName: "",
  block: "",
  plotArea: "",
  width: "",
  length: "",
};

const initialState: FloorPlanState = {
  selectedPropertyType: "apartment",
  selectedView: "type",
  selectedBHK: "All",
  unitFilters: initialUnitFilters,
  modalState: {
    isOpen: false,
    unit: null,
    isPartialUnit: false,
  },
  fullScreenModalState: {
    isOpen: false,
    unit: null,
  },
  rightSideUnit: null,
  projectUnits: [],
};

// Atoms for global state
export const floorPlanStateAtom = atom<FloorPlanState>(initialState);

export const projectUnitsAtom = atom<PropertyUnit[]>([]);

export const selectedPropertyTypeAtom = atom(
  (get) => get(floorPlanStateAtom).selectedPropertyType,
  (get, set, value: string) =>
    set(floorPlanStateAtom, {
      ...get(floorPlanStateAtom),
      selectedPropertyType: value,
    })
);

export const modalStateAtom = atom(
  (get) => get(floorPlanStateAtom).modalState,
  (get, set, modalState: ModalState) =>
    set(floorPlanStateAtom, {
      ...get(floorPlanStateAtom),
      modalState,
    })
);

export const fullScreenModalStateAtom = atom(
  (get) => get(floorPlanStateAtom).fullScreenModalState,
  (get, set, fullScreenModalState: FullScreenModalState) =>
    set(floorPlanStateAtom, {
      ...get(floorPlanStateAtom),
      fullScreenModalState,
    })
);

export const unitFiltersAtom = atom(
  (get) => get(floorPlanStateAtom).unitFilters,
  (get, set, unitFilters: UnitFilters) =>
    set(floorPlanStateAtom, {
      ...get(floorPlanStateAtom),
      unitFilters,
    })
);

// Combined atom for filters and units
export const filtersAndUnitsAtom = atom((get) => ({
  filters: get(unitFiltersAtom),
  units: get(projectUnitsAtom),
}));

// Selectors for filtered units
export const filteredUnitsSelector = selectAtom(
  filtersAndUnitsAtom,
  ({ filters, units }) => {
    return units.filter((unit) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;

        if (key === "floor") {
          const unitValue = String(unit[key as keyof PropertyUnit]);
          const filterValue = value === "G" ? "0" : String(value);
          return unitValue === filterValue;
        }

        return String(unit[key as keyof PropertyUnit]) === String(value);
      });
    });
  },
  (a, b) => JSON.stringify(a) === JSON.stringify(b)
);

// Selector for unique options
export const uniqueOptionsSelector = selectAtom(
  filteredUnitsSelector,
  (units) => {
    const options: Record<string, string[]> = {};

    UNIT_DATA_KEYS.forEach((key) => {
      const uniqueValues = new Set<string>();
      units.forEach((unit) => {
        const value = unit[key as keyof PropertyUnit];
        if (value && value !== "null" && value !== "None") {
          let processedValue = String(value);
          if (key === "floor" && processedValue === "0") {
            processedValue = "G";
          } else if (processedValue === "0" && key !== "floor") {
            return;
          }
          uniqueValues.add(processedValue);
        }
      });
      if (uniqueValues.size > 0) {
        options[key] = Array.from(uniqueValues);
      }
    });

    return options;
  },
  (a, b) => JSON.stringify(a) === JSON.stringify(b)
);
