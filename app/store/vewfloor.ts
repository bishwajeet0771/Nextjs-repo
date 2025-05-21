import { atom } from "jotai";
import { selectAtom } from "jotai/utils";
import { PropertyUnit } from "../components/project/newFloorPlan/types/floor-plan";
import { UNIT_DATA_KEYS } from "../components/project/newFloorPlan/utils/generateuniqueoptions";

export const currentPhaseAtom = atom(554);
export const propCgIdAtom = atom(35);

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
interface FloorPlanState {
  selectedPropertyType: string;
  selectedView: string;
  selectedBHK: string;
  unitFilters: UnitFilters;
  modalState: {
    isOpen: boolean;
    unit: PropertyUnit | null;
    isPartialUnit: boolean;
  };
  fullScreenModalState: {
    isOpen: boolean;
    unit: PropertyUnit | null;
  };
  rightSideUnit: PropertyUnit | null;
  projectUnits: PropertyUnit[];
}

// Create a combined atom for filters and units
export const filtersAndUnitsAtom = atom((get) => ({
  filters: get(floorPlanStateAtom).unitFilters,
  units: get(projectUnitsAtom),
}));

// Updated selectors using proper selectAtom syntax
export const filteredUnitsSelector = selectAtom(
  filtersAndUnitsAtom,
  (state) => {
    const { filters, units } = state;

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

// Base atoms (these stay the same)
export const floorPlanStateAtom = atom<FloorPlanState>(initialState);
export const projectUnitsAtom = atom<PropertyUnit[]>([]);

// Other atoms remain the same...
export const selectedPropertyTypeAtom = atom(
  (get) => get(floorPlanStateAtom).selectedPropertyType,
  (get, set, value: string) =>
    set(floorPlanStateAtom, {
      ...get(floorPlanStateAtom),
      selectedPropertyType: value,
    })
);
