/* eslint-disable no-unused-vars */
const SQUARE_FOOT_SUFFIX = " sq.ft";

const bhkMap = new Map([
  ["1 RK", 0],
  ["1 BHK", 1],
  ["1.5 BHK", 2],
  ["2 BHK", 3],
  ["2.5 BHK", 4],
  ["3 BHK", 5],
  ["3 BHK + Servant", 6],
  ["3.5 BHK", 7],
  ["3.5 BHK + Servant", 8],
  ["4 BHK", 9],
  ["4 BHK + Servant", 10],
  ["4.5 BHK", 11],
  ["4.5 BHK + Servant", 12],
  ["5 BHK", 13],
  ["5 BHK + Servant", 14],
  ["5.5 BHK", 15],
  ["5.5 BHK + Servant", 16],
  ["5+ BHK", 17],
  ["6 BHK", 18],
  ["6+ BHK", 19],
]);
const sortUnits = (units: string[]): string[] => {
  return units?.sort((a, b) => (bhkMap.get(a) ?? 0) - (bhkMap.get(b) ?? 0));
};

const parseUnitStrings = (
  unitStrings: string[],
  propertyType?: string
): string[] => {
  const parsedUnits: string[] = [];

  unitStrings?.forEach((unit) => {
    const parts = unit.split("_").map((part) => part.trim());
    const [length, width] = parts.map(parseFloat);
    if (!isNaN(length) && !isNaN(width)) {
      parsedUnits.push(`${length} x ${width}${SQUARE_FOOT_SUFFIX}`);
    } else {
      parsedUnits.push(unit);
    }
  });
  const sortedUnits = sortUnits(parsedUnits).slice(0,3)
 return sortedUnits;
};

export { parseUnitStrings as parseUnits, sortUnits };
