import { atom, useAtom } from 'jotai';

// Define a generic atom that works with any array of type T
const recentUnitsAtom = atom<any[]>([]);

// Custom hook to manage recent units with generics
export default function useRecentUnits<T extends Record<string, any>>() {
  const [recentUnits, setRecentUnits] = useAtom<T[]>(recentUnitsAtom);
  const setPreviousFilters = (unit: T) => {
    setRecentUnits((prev) => {
      // Check if the new unit already exists in the array
      const isExisting = prev.some((existingUnit) => {
        // Get non-null keys from both units
        const unitKeys = Object.keys(unit).filter(key => unit[key] !== null);
        const existingUnitKeys = Object.keys(existingUnit).filter(key => existingUnit[key] !== null);

        // If they have different number of non-null keys, they're different
        if (unitKeys.length !== existingUnitKeys.length) {
          return false;
        }

        // Compare only non-null values
        return unitKeys.every(key => 
          existingUnit[key] !== null && 
          unit[key] !== null && 
          existingUnit[key] === unit[key]
        );
      });

      if (isExisting) {
        return prev; // Return the same array if the unit already exists
      }

      // Add the new unit to the front of the array, ensuring the length doesn't exceed 5 
      return [unit, ...prev].slice(0, 5);
    });
  };
  

  const resetFilters = () => {
    setRecentUnits([]);
  };

  return {
    recentUnits,
    setPreviousFilers: setPreviousFilters,
    resetFilters
  };
}
