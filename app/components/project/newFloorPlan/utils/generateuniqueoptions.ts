import { PropertyUnit } from "../types/floor-plan";

export const UNIT_DATA_KEYS = [
  "unitNumber",
  "bhkName",
  "towerName",
  "floor",
  "facingName",
  "block",
  "plotArea",
  "width",
  "length",
  "caretarea",
  "superBuildUparea",
  "totalNumberofBathroom",
  "totalNumberOfBalcony",
  "noOfCarParking",
  "parkingType",
  "terraceArea",
  "aptTypeName",
  "gardenArea",
  "parkingArea"
];

export const getUniqueOptionsByKeys = (
  units: PropertyUnit[],
  keys: (keyof PropertyUnit)[],
  selectedFilters: Partial<PropertyUnit>
) => {
  // Return early if no units
  if (!units || units.length === 0) {
    return {
      options: {},
      filteredUnits: [],
      cacheAllBhkOptions: ["All"],
    };
  }

  // Filter units based on selected filters, but only consider non-empty/non-zero filters
  const filteredUnits = units.filter((unit) => {
    return Object.entries(selectedFilters).every(([key, value]) => {
      // Skip filtering if value is empty/zero/null
      if (
        value === null ||
        value === "" ||
        value === 0 ||
        value === undefined
      ) {
        return true;
      }

      // Special handling for floor
      if (key === "floor") {
        const unitValue = String(unit[key as keyof PropertyUnit]);
        const filterValue = value === "G" ? "0" : String(value);
        return unitValue === filterValue;
      }

      return String(unit[key as keyof PropertyUnit]) === String(value);
    });
  });

  // Initialize options map
  const options: Record<keyof PropertyUnit, string[]> = {} as Record<
    keyof PropertyUnit,
    string[]
  >;

  // Get unique values for each key from filtered units
  keys.forEach((key) => {
    const uniqueValues = new Set<string>();
    filteredUnits.forEach((unit) => {
      const value = unit[key];
      if (
        value != null &&
        value !== "null" &&
        value !== "None" &&
        value !== ""
      ) {
        let processedValue = String(value);
        if (key === "floor" && processedValue === "0") {
          processedValue = "G";
        }
        uniqueValues.add(processedValue);
      }
    });
    if (uniqueValues.size > 0) {
      options[key] = Array.from(uniqueValues).sort();
    }
  });

  // Get unique BHK options for cache
  const uniqueBhkNames = Array.from(
    new Set(units.map((unit) => unit.bhkName).filter(Boolean))
  ).sort();

  return {
    options,
    filteredUnits,
    cacheAllBhkOptions: ["All", ...uniqueBhkNames],
  };
};
